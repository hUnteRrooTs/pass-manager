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
let mpassword = ""
const secureKey = "AnwithKML"

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(session({
  secret: "AnwithKML",
  resave: false,
  saveUninitialized: false
}))

const db = new sqlite3.Database("./database/passwords.db", (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.run(`
      CREATE TABLE IF NOT EXISTS users(
      uid INTEGER PRIMARY KEY AUTOINCREMENT,
      fname VARCAHR(20),
      mpassword VARCHAR(50),
      email VARCHAR(30) UNIQUE,
      provider CHECK(provider IN ('local', 'github'))
);
`)

db.run(`
  CREATE TABLE IF NOT EXISTS passwords (
  pid INTEGER PRIMARY KEY AUTOINCREMENT,
  uid INTEGER,
  website TEXT,
  username TEXT,
  password TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`)

const set = (data) => {
  return jwt.sign(data, secureKey)
}
const get = (token) => {
  return jwt.verify(token, secureKey)
}

app.get("/", (req, res) => {
  res.send("Where are are")
})

app.post("/signup", async (req, res) => {

  const info = {
    fname: req.body.fname,
    email: req.body.email,
    password: req.body.psswd
  };

  try {

    db.get(
      `SELECT * FROM users WHERE email=?`,
      [info.email],

      async (err, row) => {

        if (err) {
          return res.status(500).send(err.message);
        }

        if (row) {
          return res.status(409).send("Email already exists");
        }

        const hashedPassword = await bcrypt.hash(info.password, 10);

        db.run(
          `INSERT INTO users (fname, mpassword, email, provider) VALUES (?, ?, ?, ?)`,
          [info.fname, hashedPassword, info.email, 'local'],

          (err) => {

            if (err) {
              return res.status(500).send(err.message);
            }

            res.send("Account created");
          }
        );
      }
    );


  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.post("/login", (req, res) => {
  console.log(" Login Its working")
  const info = {
    email: req.body.email,
    password: req.body.password
  }
  // console.log(info)
  db.get(
    `SELECT * FROM users WHERE email=?`,
    [info.email],

    async (err, row) => {

      if (err) {
        return res.status(500).send(err.message);
      }

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
      const token = set(row)
      // console.log(row)
      // console.log(token)
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
      })
      res.send("Logged In")
    }
  );
})

app.post("/logout", (req, res) => {
  res.clearCookie("token")
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

  let epass = encrypt(info.password, mpassword)
  db.run(
    `INSERT INTO passwords (uid, website, username, password)
     VALUES (?, ?, ?, ?)`,

    [
      info.uid,
      info.website,
      info.username,
      epass
    ],

    (err) => {

      if (err) {
        return res.status(500).send(err.message);
      }

      res.send("Saved");
    }
  );
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

app.get("/vault/:uid", (req, res) => {

  const uid = req.params.uid;

  db.all(
    `SELECT * FROM passwords WHERE uid=? ORDER BY created_at DESC`,
    [uid],

    (err, rows) => {

      if (err) {
        return res.status(500).send(err.message);
      }
      let datas = rows;
      for (let i = 0; i < datas.length; i++) {
        datas[i].password = decrypt(datas[i].password, mpassword)
      }
      console.log(datas)
      res.send(datas);
    }
  );
});

app.put("/vault/:pid", (req, res) => {
  const pid = req.params.pid
  const info = req.body
  const password = encrypt(info.password, mpassword)
  db.run(`UPDATE passwords SET website=?, username=?, password=? WHERE pid=?`, [info.website, info.username, password, pid], (err) => {
    if (err) {
      res.status(500).send(err.message)
    }
    res.send("Updated")
  })
})

app.delete("/vault/:pid", (req, res) => {
  const pid = req.params.pid
  db.run(`DELETE FROM passwords WHERE pid=?`, [pid], (err) => {
    if (err) {
      res.status(500).send(err.message)
    }
    res.send("Deleted")
  })
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
  const code = req.query.code;
  console.log("Came to here")

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
      },
    }
  );

  const primaryEmail =
    emailResponse.data.find(
      (email) => email.primary
    );
  db.get(
    `SELECT * FROM users WHERE email=?`,
    [primaryEmail.email],

    (err, row) => {

      if (err) {
        return res.status(500).send(err.message);
      }

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

        return res.redirect(
          `http://localhost:5173/oauth-success?user=${encoded}`
        );
      }

      // CREATE NEW USER
      db.run(
        `INSERT INTO users
      (fname, mpassword, email, provider)
      VALUES (?, ?, ?, ?)`,
        [
          githubUser.login,
          null,
          primaryEmail.email,
          "github"
        ],

        function (err) {

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
            `http://localhost:5173/oauth-success?user=${encoded}`
          );
        }
      );
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running")
})
