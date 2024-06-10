const ACCOUNT_SID = "DAFADFA";
const AUTH_TOKEN = "DAJFK;AJDF";

const twilio = require('twilio');
const client = new twilio('ACCOUNT_SID', 'AUTH_TOKEN');

const sendSMS = (to, message) => {
    client.messages.create({
        body: message,
        to,
        //from: //Waiting for approval,
    });
};

module.exports = sendSMS;