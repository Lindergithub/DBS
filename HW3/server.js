require('dotenv').config()
const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 8000

const express = require('express')
const mongoose = require('mongoose')
// const Venue = require('./models/venuemodel')
const app = express()
const venueRoute = require('./routes/venueroute')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app .use('/api/venues', venueRoute)

/*
app.get('/', (req, res) => {
    res.send('Hello NODE API')
})


//read all
app.get('/venues', async (req, res) => {
    try {
        const venues = await Venue.find({});
        res.status(200).json(venues);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//read venue by id
app.get('/venues/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const venue = await Venue.findById(id);
        res.status(200).json(venue);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//create 
// {
// "venue_name": "Yin Fung E",
// "venue_address": "No. 555 Binjiang Road",
// "user_name": "ruthlin",
// }



app.post('/venue', async (req, res) => {
    try {
        const venue = await Venue.create(req.body)
        res.status(200).json(venue);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

// update a venue
// {
// "venue_name": "",
// "venue_address": "",
// "user_name": "",
// }

app.put('/venues/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const venue = await Venue.findByIdAndUpdate(id, req.body);
        // we cannot find any venue in database
        if (!venue) {
            return res.status(404).json({ message: `cannot find any venue with ID ${id}` })
        }
        const updatedVenue = await Venue.findById(id);
        res.status(200).json(updatedVenue);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// delete a venue

app.delete('/venues/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const venue = await Venue.findByIdAndDelete(id);
        if (!venue) {
            return res.status(404).json({ message: `cannot find any venue with ID ${id}` })
        }
        res.status(200).json(venue);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
*/
mongoose.set("strictQuery", false)
mongoose.
    connect(MONGO_URL)
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(PORT, () => {
            console.log(`Node API app is running on port ${PORT}`)
        });
    }).catch((error) => {
        console.log(error)
    })