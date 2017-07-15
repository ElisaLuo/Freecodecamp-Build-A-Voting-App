const express = require('express');
const router = express.Router();
const Poll = require('../models/polls.model');

router.get('/', function (req, res) {
    if (req.session && req.session.user) {
        Poll.find({}, function (err, polls) {
            res.render('polls', {
                authenticated: true,
                allPolls: polls
            });
        });
    } else {
        Poll.find({}, function (err, polls) {

            res.render('polls', {
                authenticated: false,
                allPolls: polls
            });
        });
    }
});



module.exports = router;