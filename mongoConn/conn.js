const mongoose = require('mongoose')
// aMcsthamqCxqgNKN
const Conn = () => {
    let conn = mongoose.connect('mongodb+srv://adityawebiwork:GxfIk2GMzOl8IP2R@cluster0.dosetvs.mongodb.net/')
    if (conn) {
        console.log('mongoose connected');
    } else {
        console.log('not connected');
    }
}

module.exports = Conn;