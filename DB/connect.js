require('dotenv').config()
const mongoose = require('mongoose');


const uri = process.env.mongoDBuri;


async function connectMongoose() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB with Mongoose!");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

connectMongoose();
