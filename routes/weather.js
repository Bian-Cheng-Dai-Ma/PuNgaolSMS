const express = require('express')
const fs = require('fs');
const sendSMS = require('../utils/sms');
const router = express.Router()

router.get('/', (req, res) => {
    res.render("weather")
});

router.post('/notify', (req, res) => {
    const weatherMessage = req.body.weatherMessage;
    
    // Read users from JSON file
    const users = JSON.parse(fs.readFileSync('./data/users.json'));

    // Send SMS to all users
    users.forEach(user => {
        sendSMS(user.phoneNumber, weatherMessage);
    });

    // Redirect back to the weather alert page or send a success response
    res.redirect('/weather');
});

module.exports = router