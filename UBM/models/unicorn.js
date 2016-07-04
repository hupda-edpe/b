/**
 * Created by 3OW on 01.07.2016.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UnicornSchema   = new Schema({
    ubmTimestamp: Number,
    notificationType: String
}, { strict: false });

module.exports = mongoose.model('unicorn', UnicornSchema);