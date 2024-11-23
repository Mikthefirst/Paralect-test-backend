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

//const User = mongoose.model('User', usersSchema);

module.exports = usersSchema;
