var express = require('express')
var router = express.Router()
// const usermodel = require('../model/Users');

router.get('index', (req, res) => {
    res.render("index", {email})
})

router.post('/', (req, res, next)=>{
  const email = req.body.email;
  const password = req.body.password;
  let userID = usermodel.getID(email, password);

  let loginResult = usermodel.checkloginDetails(email,password);
  req.session.loggedIn = true;
  req.session.email = usermodel.getEmail(userID);
  if(loginResult){
    res.redirect('/home')
    console.log("Successful Login")
  }
  else{
    res.render('', {error: true});
  }
});

module.exports = router

