const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render("job")
})

const getJobListings = () => {
    const data = fs.readFileSync('./data/jobListings.json');
    return JSON.parse(data);
};

const saveJobListings = (jobs) => {
    fs.writeFileSync('./data/jobListings.json', JSON.stringify(jobs, null, 2));
};

router.post('/create', (req, res) => {
    const { date, location, employer, description, tags, contactDetails } = req.body;
    const jobs = getJobListings();
    const job = { date, location, employer, description, tags, contactDetails };
    jobs.push(job);
    saveJobListings(jobs);
    res.status(201).send('Job listing created');
});




module.exports = router