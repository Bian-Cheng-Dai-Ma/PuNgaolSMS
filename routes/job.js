const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("job");
});

const getJobListings = () => {
    const data = fs.readFileSync('./data/jobListings.json');
    return JSON.parse(data);
};

const saveJobListings = (jobs) => {
    fs.writeFileSync('./data/jobListings.json', JSON.stringify(jobs, null, 2));
};

router.post('/create', (req, res) => {
    const { position, deadline, location, employer, description, contactDetails } = req.body;
    let { tags } = req.body;

    if (!Array.isArray(tags)) {
        tags = tags ? [tags] : [];
    }

    const jobs = getJobListings();
    const job = {
        position,
        date: new Date().toLocaleDateString(),
        deadline,
        location,
        employer,
        description,
        tags,
        contactDetails
    };

    jobs.push(job);
    saveJobListings(jobs);
    res.redirect('/job')
});

module.exports = router;
