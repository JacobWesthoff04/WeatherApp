console.log("Starting Connection")
const mongoose = require('mongoose');
try {
    mongoose.connect("mongodb://127.0.0.1:27017/weatherUsers");
    console.log("Connection Established")
} catch(error) {
    console.log(`Error (${error}) has occured in db.js`);
}
module.exports = mongoose;