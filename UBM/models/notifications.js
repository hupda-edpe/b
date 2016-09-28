/**
 * a model for notifications (returned by Unicorn)
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UnicornSchema   = new Schema({
    notificationType: String
}, { strict: false, timestamps: true });

module.exports = mongoose.model('notification', UnicornSchema);