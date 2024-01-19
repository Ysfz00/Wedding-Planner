const mongoose = require("mongoose");
const Contact = require("./models/contact");
const User = require("./models/user"); 


const seedData = async () => {
    try {
        await mongoose.connect("mongodb+srv://s0579282:hgLKwrCavRkboojX@weddingapp.al8c8xa.mongodb.net/wedding_db", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to database.");

        const contacts = [
            {
                name: "Jon Wexler",
                email: "jon@jonwexler.com"
            },
            {
                name: "Chef Eggplant",
                email: "eggplant@recipeapp.com"
            },
            {
                name: "Professor Souffle",
                email: "souffle@recipeapp.com"
            }
        ];

        // Delete existing contacts
        await Contact.deleteMany();
        console.log("Contact data is empty!");

        // Create new contacts
        const createPromises = contacts.map(contact => Contact.create(contact));
        await Promise.all(createPromises);

        console.log("Created new contacts");

 
        const users = [
            {
                name: { first: "Jon", last: "Wexler" },
                email: "jon@jonwexler.com",
                zipCode: 12345,
                password: "jon123"
            },
            {
                name: { first: "Chef", last: "Eggplant" },
                email: "eggplant@recipeapp.com",
                zipCode: 12345,
                password: "chef123"
            },
            {
                name: { first: "Professor", last: "Souffle" },
                email: "souffle@recipeapp.com",
                zipCode: 12345,
                password: "prof123"
            }
        ];

        await User.deleteMany();
        console.log("User data is empty!");

        const registerPromises = users.map(user =>
            User.register(
                { name: user.name, email: user.email, zipCode: user.zipCode },
                user.password
            )
        );
        const usersResult = await Promise.all(registerPromises);

        console.log("Registered new users:");
        console.log(JSON.stringify(usersResult));
    } catch (error) {
        console.log(`ERROR: ${error}`);
    } finally {
        mongoose.connection.close();
    }
};

seedData();
