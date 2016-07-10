/**
    central config file
 **/


var config = {};

// Set the port the APP schould run on
config.port =  '8088';

// Set the DB URI
// example: config.dbURI = "mongodb://<dbuser>:<dbpassword>@<server>:<port>/<dbName>"
config.dbURI = "mongodb://localhost:27017/ubm"




module.exports = config;