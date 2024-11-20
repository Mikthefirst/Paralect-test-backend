const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vacancySchema = new Schema({
    Company: {
        type: String,
    },
    Position: {
        type: String,
    },
    SalaryRange: {
        type: String,
    },
    ApplicationStatus: {
        type: String,
    },
    Note: {
        type: String,
    }
});

const Vacancy = mongoose.model('Vacancy', vacancySchema);

module.exports = Vacancy;
