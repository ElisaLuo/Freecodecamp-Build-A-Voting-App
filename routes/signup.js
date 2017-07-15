const express = require('express');
const router = express.Router();
const User = require("../models/user.model");

router.get('/', function (req, res) {
    if (req.session && req.session.user) {
        res.status(401).send('You are already logged in');
    } else {
        res.render('signup', { authenticated: false, error: false });
    }
});

router.post('/', function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if(err){
            console.log("error in creating user");
        }
        if (!user) {
            const newMember = new User({
                username: req.body.username,
                password: req.body.password
            }).save(function (err, user) {
                if(err){
                    console.log("creation of new user failed");
                }
                res.redirect('/');
            });
        } else {
            res.render('signup', {
                error: true,
                errorMessage: 'This username already exists',
                authenticated: false
            });
        }
    });

});


module.exports = router;