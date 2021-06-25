const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    userName: String,
    email: String,
    password: String, 
    FlappyScore: String, 
    SnakeScore: String, 
    SapperScore: String
});

module.exports = mongoose.model('User', User);


