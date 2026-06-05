require("dotenv").config();
const express = require("express")
const cors = require("cors")
const sqlite3 = require("sqlite3").verbose()
const app = express()
const bcrypt = require("bcrypt");
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");
const session = require("express-session");
const axios = require("axios")
const pgSession = require("connect-pg-simple")(session)
const { sendMail } = require("./gmail");
const pool = require("./database");
const secureKey = process.env.SECRETKEY_JWT
const port = process.env.PORT || 4000

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.set("trust proxy", 1)
app.use(session({
  store: new pgSession({
    conString: process.env.DATABASE_URL,
    tableName: 'session'
  }),
  secret: process.env.SECRETKEY_JWT,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  }
}))

const starter = async () => {
  try {
    console.log("Creating users")
    await pool.query(`
CREATE TABLE IF NOT EXISTS users(
uid SERIAL PRIMARY KEY,
fname VARCHAR(20),
mpassword VARCHAR(255),
email VARCHAR(255) UNIQUE,
provider VARCHAR(20) CHECK(provider IN ('local', 'github'))
);
`)
    console.log("users created")
    console.log("Creating passwords")
    await pool.query(`
CREATE TABLE IF NOT EXISTS passwords (
pid SERIAL PRIMARY KEY,
uid INTEGER REFERENCES users(uid) ON DELETE CASCADE,
website TEXT,
username TEXT,
password TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`)

    console.log("passwords created")
    console.log("Creating otp")
    await pool.query(`
CREATE TABLE IF NOT EXISTS otp(
email VARCHAR(255) PRIMARY KEY,
code CHAR(6) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`)
    console.log("otp created")
    const result = await pool.query(
      "SELECT current_user, current_database()"
    );
    console.log(result.rows[0]);

  }
  catch (err) {
    console.log(err)
  }
}

starter()

const set = (data) => {
  return jwt.sign(data, secureKey)
}
const get = (token) => {
  try {
    return jwt.verify(token, secureKey);
  } catch (error) {
    // Token is expired, invalid, or malformed
    console.error("JWT Verification failed:", error.message);
    return null;
  }
}

app.get("/", (req, res) => {
  res.send("Where are are")
})

app.post("/signup", async (req, res) => {
  try {
    console.log("In Signup page");

    const info = {
      fname: req.body.fname,
      email: req.body.email,
      password: req.body.psswd,
      code: req.body.code
    };

    const rows = await pool.query(`SELECT code FROM otp WHERE email=$1`, [info.email])
    const row = rows.rows[0]
    if (!row) {
      return res.status(400).send("OTP not found");
    }

    if (String(row.code) !== String(info.code)) {
      return res.status(401).send("Invalid Verification Code");
    }

    const users = await pool.query(`SELECT * FROM users WHERE email=$1`, [info.email])
    if (users.rows.length > 0) {
      return res.status(409).send("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(info.password, 10);

    await pool.query(
      `INSERT INTO users (fname, mpassword, email, provider) VALUES ($1, $2, $3, $4)`,
      [info.fname, hashedPassword, info.email, "local"])
    await pool.query(
      `DELETE FROM otp WHERE email = $1`,
      [info.email]
    );
    res.status(201).json({
      ok: true,
      message: "Account created"
    });
  } catch (err) {
    console.log(err)
    return res.status(500).send(err.message)
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log(" Login Its working")
    const info = {
      email: req.body.email,
      password: req.body.password
    }
    // console.log(info)
    const result = await pool.query(
      `SELECT * FROM users WHERE email=$1`,
      [info.email])
    const row = result.rows[0]
    if (!row) {
      return res.status(401).send("Invalid credentials");
    }
    const match = await bcrypt.compare(
      info.password,
      row.mpassword
    );

    if (!match) {
      return res.status(401).send("Invalid credentials");
    }
    const token = set({
      uid: row.uid,
      fname: row.fname,
      email: row.email
    })
    // // console.log(row)
    // // console.log(token)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    req.session.mpassword = info.password
    console.log("MasterKEy /Login: ", req.session.mpassword)
    console.log(req.session)
    res.send("Logged In")
  }
  catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

app.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  })
  res.send("Logged Out")
})

const encrypt = (data, mKey) => {
  const iv = crypto.randomBytes(16)
  const key = crypto.createHash("sha256").update(mKey).digest()
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    key,
    iv
  )
  let encrypted = cipher.update(
    data,
    "utf8",
    "hex"
  )
  encrypted += cipher.final("hex")
  return iv.toString("hex") + ":" + encrypted
}

app.post("/vault", async (req, res) => {

  const info = {
    uid: req.body.uid,
    website: req.body.website,
    username: req.body.username,
    password: req.body.password,
  };
  const mpassword = req.session.mpassword
  console.log(`MAsterkey: ${req.session}`)
  let epass = encrypt(info.password, mpassword)
  await pool.query(
    `INSERT INTO passwords (uid, website, username, password)
     VALUES ($1, $2, $3, $4)`,

    [
      info.uid,
      info.website,
      info.username,
      epass
    ])
  res.send("Saved");

});

const decrypt = (text, mKey) => {
  try {

    const parts = text.split(":");
    const iv = Buffer.from(parts[0], "hex")
    const key = crypto.createHash("sha256").update(mKey).digest()
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      key,
      iv
    )
    let decrypted = decipher.update(
      parts[1],
      "hex",
      "utf8"
    )
    decrypted += decipher.final("utf8")
    return decrypted
  } catch (err) {
    console.log(err)
    return null
  }
}

app.get("/vault/", async (req, res) => {
  const token = req.cookies.token
  const mpassword = req.session.mpassword
  const data = get(token);

  console.log(`MAsterkey /vault: ${req.session.mpassword}`)
  if (!data) {
    return res.status(401).send("Unauthorized");
  }

  const uid = data.uid;
  // console.log("from /vault/")
  // console.log(get(token).uid)
  const result = await pool.query(
    `SELECT * FROM passwords WHERE uid=$1 ORDER BY created_at DESC`,
    [uid])

  let datas = result.rows;
  for (let i = 0; i < datas.length; i++) {
    datas[i].password = decrypt(datas[i].password, mpassword)
  }
  console.log(datas)
  res.send(datas);
});

app.put("/vault/:pid", async (req, res) => {
  const pid = req.params.pid
  const info = req.body
  const mpassword = req.session.mpassword
  const password = encrypt(info.password, mpassword)
  await pool.query(`UPDATE passwords SET website=$1, username=$2, password=$3 WHERE pid=$4`, [info.website, info.username, password, pid])
  res.send("Updated")
})

app.delete("/vault/:pid", async (req, res) => {
  try {
    const pid = req.params.pid
    await pool.query(`DELETE FROM passwords WHERE pid=$1`, [pid])
    res.send("Deleted")
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.post("/getuid", (req, res) => {
  console.log("From GetUID")
  const data = jwt.verify(req.cookies.token, secureKey)
  console.log(data)
  res.send(data)
})

app.get("/auth/github", (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user:email`)
})

app.get("/auth/github/callback", async (req, res) => {
  try {
    const code = req.query.code;

    const tokenResponse = await axios.post(
      `https://github.com/login/oauth/access_token`,
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );
    const accessToken = tokenResponse.data.access_token;
    const userResponse = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": "Pass-Manager-Vaultify"
        },
      }
    );

    const githubUser = userResponse.data;
    const token = jwt.sign(
      {
        id: githubUser.id,
        username: githubUser.login,
      },
      secureKey
    );
    const emailResponse = await axios.get(
      "https://api.github.com/user/emails",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": "Pass-Manager-Vaultify"
        },
      }
    );

    const primaryEmail =
      emailResponse.data.find(
        (email) => email.primary
      );
    const row = await pool.query(
      `SELECT * FROM users WHERE email=$1`,
      [primaryEmail.email])
    // USER ALREADY EXISTS
    if (row) {

      const user = {
        uid: row.uid,
        fname: row.fname,
        email: row.email
      };

      const encoded =
        encodeURIComponent(
          JSON.stringify(user)
        );

      res.cookie("token", token, {
        httpOnly: true,     // Prevents client-side JS from reading the cookie (XSS protection)
        secure: true, // True in production (requires HTTPS)
        sameSite: "none",    // Protects against CSRF
      });

      return res.redirect(
        `${process.env.FRONTEND_URL}/oauth-success?user=${encoded}`
      );
    }

    // CREATE NEW USER
    await pool.query(
      `INSERT INTO users
      (fname, mpassword, email, provider)
      VALUES ($1, $2, $3, $4)`,
      [
        githubUser.login,
        null,
        primaryEmail.email,
        "github"
      ])
  }
  catch (err) {

    if (err) {
      return res.status(500).send(err.message);
    }

    const user = {
      uid: this.lastID,
      fname: githubUser.login,
      email: primaryEmail.email
    };

    const encoded =
      encodeURIComponent(
        JSON.stringify(user)
      );

    res.redirect(
      `${process.env.FRONTEND_URL}/oauth-success?user=${encoded}`
    );
  }
});

app.post("/send-code", async (req, res) => {
  const code =
    Math.floor(
      100000 + Math.random() * 900000
    );
  try {

    await sendMail(req.body.email, "Verify Your Vaultify Account", `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2>Welcome to Vaultify</h2>

      <p>Thank you for creating a Vaultify account.</p>

      <p>Your verification code is:</p>

      <h1 style="letter-spacing: 4px;">${code}</h1>

      <p>This code will expire in 10 minutes.</p>

      <p>If you did not request this verification, you can safely ignore this email.</p>

      <br>
      <p>— Vaultify Security Team</p>
    </div>
  `)
    await pool.query(`
INSERT INTO otp(email, code)
VALUES($1, $2)
ON CONFLICT(email)
DO UPDATE SET
code = EXCLUDED.code,
created_at = CURRENT_TIMESTAMP
`, [req.body.email, code])
    res.send({ status: "Account Created Successfull" });
  } catch (err) {
    console.log("FULL ERROR:");
    console.dir(err, { depth: null });
    return res.sendStatus(500)
  }
});


app.listen(port, "0.0.0.0", () => {
  console.log("Server is running")
})
