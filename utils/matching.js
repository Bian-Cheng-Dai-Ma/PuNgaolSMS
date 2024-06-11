const User = require('../models/User');
const jobListing = require('../models/jobListing');
const sendSMS = require('./sms');

const matchAndNotify = async () => {
    const users = await User.find();
    const jobs = await JobListing.find();

    users.forEach(user => {
        const suitableJobs = jobs.filter(job => 
            job.tags.some(tag => user.skills.include(tag))
        );
        suitableJobs.forEach(job => {
            const message = `Job Opportunity: ${job.description} at ${job.location}. Contact: ${job.contactDetails}`;
            sendSMS(user.phoneNumber, message);
        });
    });
};

module.exports = matchAndNotify;