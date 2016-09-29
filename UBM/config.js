/**
    central config file
 **/


var config = {};

// et the port the APP schould run on
config.port =  '3001';

// et the DB URI
// example: config.dbURI = "mongodb://<dbuser>:<dbpassword>@<server>:<port>/<dbName>"
config.dbURI = "mongodb://localhost:27017/ubm";


// enable / disable Basic auth (API) (true or false)
config.basicAuth = true;

// enable Unicorn 1.5 compatibility (basic auth REST notifications not implemented in Unicorn 1.5)
config.unicornExemption = true;

// set session expiration time
config.sessionLength = 86400000;

module.exports = config;