const mongoose = require("mongoose");

const vendorSchema = mongoose.Schema({
    vendorName: {
        type: String,
        required: true
    },
    vendorType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contact: {
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        website: {
            type: String,
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

vendorSchema.methods.getInfo = function () {
    return `Vendor: ${this.vendorName} | Type: ${this.vendorType}`;
};

module.exports = mongoose.model("Vendor", vendorSchema);
