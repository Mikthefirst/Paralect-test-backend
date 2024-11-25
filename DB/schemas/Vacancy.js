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


module.exports = vacancySchema;
