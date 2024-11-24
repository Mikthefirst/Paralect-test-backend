const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    user_id: {
        type: String,
    },
    vacancy_id: {
        type: String,
    },
});


module.exports = connectionSchema;
