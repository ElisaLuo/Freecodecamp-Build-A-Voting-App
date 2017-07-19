const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: { type: String, required: true, minlength: 3 },
    password: { type: String, required: true, minlength: 6 }
});

const User = mongoose.model('user', userSchema);
User.find({ "username": { $regex: ".*son.*" } }, (err, user) => {
    if(err){
        console.log("error in user");
    }
    console.log(user);
});

module.exports = User;