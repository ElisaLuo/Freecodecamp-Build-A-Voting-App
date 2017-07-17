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

router.get('/:pollId', function (req, res) {
    if (req.session && req.session.user) {
        Poll.findById(req.params.pollId, function (err, poll) {
            if (!poll) {
                res.sendStatus(404);
                return;
            }
            if (poll.createdBy === req.session.user.username || poll.createdBy === req.session.user) {
                res.render('eachPoll', {
                    thisPoll: poll,
                    authenticated: true,
                    isUserPoll: true
                });
            }
            else {
                res.render('eachPoll', {
                    thisPoll: poll,
                    authenticated: true,
                    isUserPoll: false
                });
            }
        });
    } else {
        Poll.findById(req.params.pollId, function (err, poll) {
            if (!poll) {
                res.sendStatus(404);
                return;
            }
            res.render('eachPoll', {
                thisPoll: poll,
                authenticated: false,
                isUserPoll: false
            });
        });
    }
});

module.exports = router;