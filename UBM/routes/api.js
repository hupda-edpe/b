/**
 * Created by 3OW on 03.07.2016.
 */
var express = require('express');
var jsonQuery = require('json-query');      // json search tool
var Unicorn     = require('../models/unicorn');
var mongoose   = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/ubm'); // connect to our database

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8088/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// on routes that end in /post
// ----------------------------------------------------
router.route('/post/:notificationType?')

// create an Unicorn Notification (POST to http://localhost:8088/api/post)
    .post(function(req, res) {
        var unicorn = new Unicorn();      // create a new instance of the Unicorn model
        unicorn.ubmTimestamp =   Math.floor(Date.now() / 1000); // set the timestamp for the MongoDB document
        var received = JSON.parse(JSON.stringify(req.body)); // parse the received notification to JSON object
        // set the notificationType
        if(req.params.notificationType === undefined) {
            unicorn.notificationType = "generic";
        }
        else {
            unicorn.notificationType = req.params.notificationType;
        }
        for (var propName in received) {   // put received JSON data into our mongo document
            unicorn.set(propName, received[propName]);
        }
        // save the notification and check for errors
        unicorn.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Notification created!' });
        });
    });


// on routes that end in /unicorn/nid/:notification_id
// ----------------------------------------------------
router.route('/delete/:notification_id')

    // delete the notification with this id (accessed at DELETE http://localhost:8088/api/delete/:notification_id)
    .delete(function(req, res) {
        Unicorn.remove({
            _id: req.params.notification_id
        }, function(err, unicorn) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// on routes that end in /unicorn/search?=:key&?=:value
// ----------------------------------------------------
router.route('/search/')
    
// get the notification by a specific value in the json payload (accessed at GET http://localhost:8088/api/search?:key=:value&...)
    .get(function(req, res) {
        Unicorn.find(function(err, notifications) {
            if (err)
                res.send(err);
            notifications = JSON.parse(JSON.stringify(notifications));
            // iterate through the query parameters and search for appropriate notifications
            for (var propName in req.query) {
                if (req.query.hasOwnProperty(propName)) {
                    notifications = jsonQuery('[*'+propName.toString()+'='+req.query[propName].toString()+']', {
                        data: notifications
                    }).value;
                }
            }
            res.json(notifications);
        });
    });
module.exports = router;