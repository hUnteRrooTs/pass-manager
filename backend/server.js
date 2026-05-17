const express = require("express")
const cors = require("cors")
const sqlite3 = require("sqlite3").verbose()
const app = express()

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
      CREATE TABLE IF NOT EXISTS USERS(
      FNAME VARCAHR(20),
      MPASSWORD VARCHAR(50),
      EMAIL VARCHAR(30),
      UID INT PRIMARY KEY
);
`)
app.get("/", (req, res) => {
  res.send("Where are are")
})

app.post("/signup", (req, res) => {
  console.log("Its working")
  const info = {
    fname: req.body.fname,
    email: req.body.email,
    password: req.body.psswd
  }
  console.log(info)
  res.send("OK")
})

app.listen(3000, () => {
  console.log("Server is running")
})
