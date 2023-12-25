const Venue = require('../models/venuemodel')

const readVenues = async (req, res) => {
    try {
        const venues = await Venue.find({});
        res.status(200).json(venues);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const readVenue = async (req, res) => {
    try {
        const { id } = req.params;
        const venue = await Venue.findById(id);
        res.status(200).json(venue);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const createVenue = async (req, res) => {
    try {
        const venue = await Venue.create(req.body)
        res.status(200).json(venue);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
}
const updateVenue = async (req, res) => {
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
}
const deleteVenue = async (req, res) => {
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
}
module.exports = {
    readVenues,
    readVenue,
    createVenue,
    updateVenue,
    deleteVenue
}