const mongoose = require("mongoose");

const venueSchema = mongoose.Schema({
    venueName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contact: {
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        website: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        zipCode: {
            type: Number,
            required: true,
            min: [10000, "Zip code too short"],
            max: 99999,
        },
        city: {
            type: String,
            required: true
        }
    },
    cost: {
        type: Number,
        required: true
    }
});

venueSchema.methods.getInfo = function () {
    return `Venue: ${this.title} | Cost: ${this.cost}`;
};

module.exports = mongoose.model("Venue", venueSchema);
