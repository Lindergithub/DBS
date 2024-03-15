const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Venue = require('./models/venuemodel')
const uri = "mongodb+srv://ruth23216772:dbshw3password@cluster0.jtfauwy.mongodb.net/VenueRentSystem?retryWrites=true&w=majority";
const cors = require ('cors')
const mysql = require ('mysql')
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send("hiiiiiiiii")
});

app.get('/venues', async (req, res) => {
  try {
    const venues = await Venue.find({});
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
});

mongoose.connect(uri).then(() => {
  console.log('Connect toooooo the Mongodb');
  app.listen(8000, () => {
    console.log('Server started on port 8000');
  });
}).catch((error) => {
  console.log(error)
});

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
