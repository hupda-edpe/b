/**
 * model for eventTypes
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EventType   = new Schema({
    userID: String, // only show EventTypes entered by user
    eventName: String,
    eventXml: String
}, { strict: true, timestamps: true });

module.exports = mongoose.model('eventType', EventType);
