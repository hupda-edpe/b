/**
 * the user model
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
    id: String,
    email: String,
    username: String,
    password: String
});