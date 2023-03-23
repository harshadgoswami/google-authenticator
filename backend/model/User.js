const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    secret: {
        type: String
    },

    tempSecret: {
        type: String
    }
}, {
    collection: 'users'
});

module.exports = mongoose.model('User',User);