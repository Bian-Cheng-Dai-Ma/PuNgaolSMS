require('dotenv').config();
const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMS = (to, message) => {
    client.messages.create({
        body: message,
        to,
        from: +447361586260,
    });
};

module.exports = sendSMS;