/**
    central config file
 **/


var config = {};

// Set the port the APP schould run on
config.port =  '3001';

// Set the DB URI
// example: config.dbURI = "mongodb://<dbuser>:<dbpassword>@<server>:<port>/<dbName>"
config.dbURI = "mongodb://localhost:27017/ubm";


// Enable / Disable Basic auth (API)
config.basicAuth = true;

// Enable Unicorn 1.5 compatibility (basic auth REST notifications not implemented in Unicorn 1.5)
config.unicornExemption = true;

// Set session expiration time
config.sessionLength = 86400000;

module.exports = config;