const express = require("express")
const cors = require("cors")
const sqlite3 = require("sqlite3").verbose()
const app = express()
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cors())

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
      email VARCHAR(30) UNIQUE
);
`)
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
          `INSERT INTO users (fname, mpassword, email) VALUES (?, ?, ?)`,
          [info.fname, hashedPassword, info.email],

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
  console.log(info)
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

      res.send(row);
    }
  );
})

app.listen(3000, () => {
  console.log("Server is running")
})
