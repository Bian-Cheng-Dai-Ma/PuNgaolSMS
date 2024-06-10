const express = require('express')
const router = express.Router()
const fs = require('fs');

router.get('/', function(req, res, next) {
    let email = req.session.email;
    let loggedIn = req.session.loggedIn;
    if(!loggedIn){
      res.redirect('/');
    }
    else{
      res.render("home", {email});
    }
  });

module.exports = router