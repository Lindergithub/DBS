const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Venue = require('./models/venuemodel')

const uri = "mongodb+srv://ruth23216772:dbshw3password@cluster0.jtfauwy.mongodb.net/VenueRentSystem?retryWrites=true&w=majority";
app.use(express.json())
app.get('/', (req, res) => {
  res.send("hiiiiiiiii")
});
mongoose.connect(uri).then(() => {
  console.log('Connect toooooo the Mongodb');
  app.listen(8000, () => {
    console.log('Server started on port 8000');
  });
}).catch((error) => {
  console.log(error)
});


app.post('/read', async(req, res) => {
  try {
      const venue = await Venue.create(req.body)
      res.status(200).json(venue);
      
  } catch (error) {
      console.log(error.message);
      res.status(500).json({message: error.message})
  }
})
// async function connect() {
//   try {
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected toooooo MongoDB');
//   } catch (error) {
//     console.error(error);
//   }
// }


// // 連接到 MongoDB
// connect();

// // 讀取 MongoDB 中的資料
// app.get('/venues', async (req, res) => {
//   try {
//     const venues = await Venue.find({});
//     res.json(venues);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error fetching venues from database');
//   }
// });
// 在後端程式碼中

// Create a new Venue
// app.post("/createVenue", async (req, res) => {
//     const venueData = req.body;
//     try {
//       const newVenue = await Venue.create(venueData);
//       console.log("Venue Created with ID: " + newVenue._id);
//       res.status(200).send("Venue created successfully");
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Error creating Venue, why?");
//     }
//   });
// app.post("/createVenue", (req, res) => {
//   const venueData = req.body;
//   Venue.create(venueData)
//     .then((newVenue) => {
//       console.log("Venue Created with ID: " + newVenue._id);
//       res.status(200).send("Venue created successfully");
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Error creating Venue");
//     });
//   });

