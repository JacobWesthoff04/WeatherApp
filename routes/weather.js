const express = require('express');

const router = express.Router();

router.get('/api/curweather', async (req, res) => {
    try {
        const { zip } = req.query;
        
        if (!zip) {
            return res.status(400).send('Zip code is required');
        }

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${process.env.WEATHER_API_KEY}&units=imperial`;

        const fetchResponse = await fetch(weatherUrl);
        if (!fetchResponse.ok) {
            throw new Error(`Error fetching weather data: ${fetchResponse.status}`);
        }

        const weatherData = await fetchResponse.json();
        res.status(200).json(weatherData);
    } catch (error) {
        console.error('Error in /api/curweather:', error.message);
        res.status(400).send('Unable to fetch weather data');
    }
});

module.exports = router;
