const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render("register")
})

const getUsers = () => {
    const data = fs.readFileSync('./data/users.json');
    return JSON.parse(data);
}

const saveUsers = (users) => {
    fs.writeFileSync('./data/usrs.json', JSON.stringify(users, null, 2));
};

router.post('/register', (rea, res) => {
    const {name, phoneNumber, language, skills, disability} = req.body;
    const users = getUsers();
    const user = {name, phoneNumber, language, skills, disability};
    users.push(user);
    saveUsers(users);
    res.status(201).send('User Registered');
})



module.exports = router