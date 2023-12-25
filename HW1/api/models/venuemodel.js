const mongoose = require('mongoose')
const venueSchema = new mongoose.Schema(
    {
        
        venue_name: {
            type: String,
            required: [true, "Please enter a product name"]
        },
        venue_address: {
            type: String,
            required: true,
        },
        user_name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)
const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;