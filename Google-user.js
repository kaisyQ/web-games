const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const GoogleUser = new Schema({
    googleUserName: String, 
    FlappyScore: String, 
    SnakeScore: String, 
    SapperScore: String
});

module.exports = mongoose.model('GoogleUser', GoogleUser);