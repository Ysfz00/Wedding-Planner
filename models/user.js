const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
	name: {
		first: {
			type: String,
			trim: true,
		},
		last: {
			type: String,
			trim: true,
		},
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true,
	},
	zipCode: {
		type: Number,
		required: true,
		min: [10000, "Zip code too short"],
		max: [99999, "Zip code too long"],
	}
});

userSchema.plugin(passportLocalMongoose, {
	usernameField: "email"
  
 });
 
userSchema.virtual("fullName").get(function () {
	return `${this.name.first} ${this.name.last}`;
});

module.exports = mongoose.model("User", userSchema);
