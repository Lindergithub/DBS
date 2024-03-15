// my index.js 
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
  const user_name = req.body.sendtobackname;
  const user_gender = req.body.sendtobackgender;
  const user_phone = req.body.sendtobackphone;
  const user_email = req.body.sendtobackemail;

  db.query(
    "INSERT INTO user (user_name, user_gender, user_phone, user_email) VALUES (?,?,?,?)",
    [user_name, user_gender, user_phone, user_email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
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

app.put("/update", (req,res) => {
  const user_id =req.body.Id;
  const user_name = req.body.sendtobackname;
  db.query("UPDATE user SET user_name = ? WHERE user_id = ?",
  [user_name, user_id], 
  (err,result) => {
    if (err){
      console.log(err)
    } else {
      res.send(result)
    }
  });
});

app.delete("/delete/:userId", (req, res) => {
  const Id = req.params.userId;
  db.query("DELETE FROM user WHERE user_id = ?", Id, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result);
    }
  });
});

app.listen(2020, () => {
    console.log("hi there, it's working on port 2020");
});