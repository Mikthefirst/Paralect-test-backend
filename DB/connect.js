require('dotenv').config()
const mongoose = require('mongoose');
const SchemaVacancy = require('./schemas/Vacancy');
const SchemaUser = require('./schemas/User')
const SchemaConnection = require('./schemas/Connect');

const uriVacancy = process.env.mongoDBuri;
const uriUsers = process.env.mongoDBuriUsers;

let VacancyConnection, UserConnection, userVacancyConnect;
let UserModel, VacancyModel, userVacancyModel;

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


async function connectMongooseUsersVacancies() {
    try {
        userVacancyConnect = await mongoose.createConnection(uriUsers, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'connections'
        });
        console.log("Connected connectionBox to MongoDB users with Mongoose!");
    } catch (err) {
        console.error("MongoDB connectionBox connection error:", err);
    }
}

async function initialise() {
    await connectMongooseVacancy();
    await connectMongooseUsers();
    await connectMongooseUsersVacancies();


    VacancyModel = VacancyConnection.model('Vacancy', SchemaVacancy);
    UserModel = UserConnection.model('User', SchemaUser);
    userVacancyModel = userVacancyConnect.model('connections', SchemaConnection);

    module.exports.User = UserModel;
    module.exports.Vacancy = VacancyModel;
    module.exports.Connection = userVacancyModel;
}

initialise();





