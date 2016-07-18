/**
 * Created by 3OW
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UnicornServer   = new Schema({
    userID: String, // only show Servers entered by user
    ServerName: String,
    ServerPath: String
}, { strict: true, timestamps: true });

module.exports = mongoose.model('unicornServer', UnicornServer);