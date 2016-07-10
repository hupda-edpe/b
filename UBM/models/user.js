/**
 * Created by 3OW on 09.07.2016.
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
    id: String,
    email: String,
    username: String,
    password: String
});