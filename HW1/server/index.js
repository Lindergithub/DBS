const express = require('express')
const app = express()
const mysql = require ('mysql')
const cors = require ('cors')

app.use(cors())
app.use(express.json());
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "ntnu3528",
    database: "VenueRentSystem",
  });

app.post("/createuser", (req, res) => {
  const user_name = req.body.Name;
  const user_gender = req.body.Gender;
  const user_phone = req.body.Phone;
  const user_email = req.body.Email;

  db.query(
    "INSERT INTO user (user_name, user_gender, user_phone, user_email) VALUES (?,?,?,?)",
    [user_name, user_gender, user_phone, user_email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});



app.get("/readuser", (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/showuser", (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.listen(3001, () => {
    console.log("hi there, it's working on port 3001");
});