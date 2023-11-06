const mongoose    = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        require: true
    }
})

const userSchemas = mongoose.model('userSchemas', user);
module.exports = userSchemas;