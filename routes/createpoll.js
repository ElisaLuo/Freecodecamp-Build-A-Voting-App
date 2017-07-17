const express = require('express');
const router = express.Router();
const Poll = require('../models/polls.model');

router.get('/', function (req, res) {
    if (req.session && req.session.user) {
        res.render('createPoll', {
            authenticated: true,
        });
    } else {
        res.json({ message: 'You must be authorized to access this page' });
    }
});

router.post('/', function (req, res) {
    const keys = Object.keys(req.body);
    const choicesArr = [];
    for(var i=1;i<keys.length;i++){
        choicesArr.push({title: req.body[keys[i]]});
    }

    const newPoll = new Poll({
        title: req.body.title,
        choices: choicesArr,
        createdBy: req.session.user.username || req.session.user
    }).save(function (err, poll) {
        if (err) throw err;
        res.redirect('/mypolls');
    });
});


module.exports = router;