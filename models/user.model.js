const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: { type: String, required: true},
    password: { type: String, required: true}
});

const User = mongoose.model('user', userSchema);
User.find({ "username": { $regex: ".*son.*" } }, (err, user) => {
    if(err){
        console.log("error in user");
    }
    console.log(user);
});

module.exports = User;