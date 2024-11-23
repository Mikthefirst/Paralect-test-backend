require('dotenv').config()
const mongoose = require('mongoose');
const SchemaVacancy = require('./schemas/Vacancy');
const SchemaUser = require('./schemas/User')

const uriVacancy = process.env.mongoDBuri;
const uriUsers = process.env.mongoDBuriUsers;

let VacancyConnection, UserConnection;
let UserModel, VacancyModel;

async function connectMongooseVacancy() {
    try {
        VacancyConnection = await mongoose.createConnection(uriVacancy, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'vacancyBox'
        });
        console.log("Connected vacancyBox to MongoDB vacancy with Mongoose!");
    } catch (err) {
        console.error("MongoDB vacancyBox connection error:", err);
    }
}

async function connectMongooseUsers() {
    try {
        UserConnection = await mongoose.createConnection(uriUsers, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'userBox'
        });
        console.log("Connected UserBox to MongoDB users with Mongoose!");
    } catch (err) {
        console.error("MongoDB UserBox connection error:", err);
    }
}

async function initialise() {
    await connectMongooseVacancy();
    await connectMongooseUsers();

    // VacancyConnection = mongoose.model('Vacancy', SchemaVacancy);
    //UserConnection = mongoose.model('User', SchemaUser);

    VacancyModel = VacancyConnection.model('Vacancy', SchemaVacancy);
    UserModel = UserConnection.model('User', SchemaUser);

    //console.log('Vacancy connection:', VacancyConnection)
    console.log('Vacancy model:', VacancyModel)
    module.exports.User = UserModel;
    module.exports.Vacancy = VacancyModel;
}

initialise();





