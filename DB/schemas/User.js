const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    file: {
        type: Buffer,
    },
});


module.exports = usersSchema;
