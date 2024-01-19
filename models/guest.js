const mongoose = require("mongoose");

const guestSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    guestCategory: {
        type: String,
        enum: ['Adult', 'Kid', 'Baby'],  // Enum to limit category to these values
        required: true
    },
    confirmed: {
        type: String,
        enum: ['Confirmed', 'Not confirmed'], // Enum to limit confirmed to these values
        required: true
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    }    
});

module.exports = mongoose.model("Guest", guestSchema);
