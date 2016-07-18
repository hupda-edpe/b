/**
 * Created by 3OW
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RestNotification   = new Schema({
    userID: String, // only show Notifications entered by user
    notificationName: String,
    queryString: String,
    notificationPath: String,
    serverName: String,
    serverPath: String
}, { strict: true, timestamps: true });

module.exports = mongoose.model('restNotification', RestNotification);
