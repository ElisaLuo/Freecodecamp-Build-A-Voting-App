const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Sets user schema
const pollSchema = new Schema({
    title: { type: String, unique: true, required: true },
    choices: [
        {
            title: { type: String, required: true },
            count: { type: Number, default: 0 }
        }
    ],
    //votedIp should not be unique, since if a voter votes for two polls, an error would occur
    votedIp: [ { type: String, unique: false }],
    createdAt: {type:Date, default:Date.now()},
    createdBy: String
});

const Poll = mongoose.model('polls', pollSchema);

module.exports = Poll;
