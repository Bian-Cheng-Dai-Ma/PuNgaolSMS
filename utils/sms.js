//Get Details
require('dotenv').config();
const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

//Send Message
const sendSMS = (to, message) => {
    client.messages.create({
        body: message,
        to,
        from: +447361586260
    }).then(message => {
        console.log(`Message sent to ${to}: ${message.sid}`);
    }).catch(error => {
        console.error(`Failed to send message to ${to}: ${error.message}`);
    });
};

module.exports = sendSMS;