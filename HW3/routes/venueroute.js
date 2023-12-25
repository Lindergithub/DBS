//routes
const express = require('express')
const router = express.Router()
const Venue = require('../models/venuemodel')
const {readVenues, readVenue, createVenue, updateVenue, deleteVenue} = require('../controllers/venuecontroller')

//read all
router.get('/', readVenues)

//read venue by id
router.get('/:id', readVenue)

//create 
/*
{
"venue_name": "Yin Fung E",
"venue_address": "No. 555 Binjiang Road",
"user_name": "ruthlin",
}
*/
router.post('/', createVenue)

// update a venue
/*
{
"venue_name": "",
"venue_address": "",
"user_name": "",
}
*/
router.put('/:id', updateVenue)

// delete a venue
router.delete('/:id',deleteVenue )

module.exports = router;