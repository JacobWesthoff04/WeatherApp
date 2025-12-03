const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./db.js');

//Route modules
const weatherRoutes = require('./routes/weather.js');
const authRoutes = require('./routes/auth.js');

require('dotenv').config(); //Load environment vars from .env file

connectDB(); //Connect to mongoDB

const app = express();
const PORT = process.env.PORT || 3000; //Default to port 3000 if not set in env

app.use(express.static('public')) //Load static frontend (built from frontend repo)

app.use(bodyParser.json()); //Enable body-parser middleware

app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

app.use(weatherRoutes); //route for /api/curweather
app.use(authRoutes); //routes for /api/auth and /api/register

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html')); //If no routes match, return the static frontend
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));