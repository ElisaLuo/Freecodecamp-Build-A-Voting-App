const express = require('express');
const router = express.Router();
const Poll = require('../models/polls.model');
const checkIp = require('../checkIp');

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

//Gets poll, checks if user is logged in and if user is the creator
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

router.delete('/:pollId', function (req, res) {
    Poll.findByIdAndRemove(req.params.pollId, function (err, poll) {
        res.json({ message: 'Poll Deleted' });
    });
});

//Checks if this user ip has voted
router.put('/:pollId', function (req, res) {
    checkIp(req.params.pollId, req.headers['x-forwarded-for'])
        .then(function (originalIp) {
            if (originalIp) {
                submitVote(req.body.choice, res, req.headers['x-forwarded-for']);
            } else {
                res.json({ message: 'This ip has already voted' });
            }
        })
        .catch(function (err) { console.log(err) });
});

router.post('/:pollId', function (req, res) {
    if (req.session && req.session.user) {
        checkIp(req.params.pollId, req.headers['x-forwarded-for'])
            .then(function (originalIp) {
                if (originalIp) {
                    Poll.findByIdAndUpdate(
                        req.params.pollId,
                        { $push: { choices: { title: req.body.custom } } },
                        { new: true },
                        function (err, poll) {
                            if (err) throw err;
                            submitVote(req.body.custom, res, req.headers['x-forwarded-for']);
                        });

                } else {
                    res.json({ message: 'You have already voted!' });
                }
            });
    } else {
        res.status(401).send('You must be a member to view this page.');
    }
});

var url = window.location.href;
function submitVote(field, res, ip) {
    Poll.findOneAndUpdate(
        { choices: { $elemMatch: { title: field } } },
        { $inc: { 'choices.$.count': 1 }, $addToSet: { 'votedIp': url + ip }},//votedIp is equals to field + ip because the ip has to be unique to the poll
        { new: true },
        function (err, poll) {
            if (err) throw err;
            res.json({ updated: poll });
        }
    )
}

module.exports = router;
