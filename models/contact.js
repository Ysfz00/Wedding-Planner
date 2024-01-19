const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
    // Adding validators
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    }
});

contactSchema.methods.getInfo = function() {
    return `Name: ${this.name} Email: ${this.email}`;
};

// https://stackoverflow.com/questions/75586474/mongoose-stopped-accepting-callbacks-for-some-of-its-functions
// should be checked
contactSchema.methods.findContactName = function() {
    return this.model("Contact")
    .findOne({name: this.name})
    .exec();
};

module.exports = mongoose.model("Contact", contactSchema);