/**
 * Created by 3OW on 03.07.2016.
 */
var express = require('express');
var jsonQuery = require('json-query');      // let us search for matches inside the json payload
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

// on routes that end in /unicorn
// ----------------------------------------------------
router.route('/unicorn')

// create an Unicorn Notification (accessed at POST http://localhost:8088/api/unicorn)
    .post(function(req, res) {
        console.log(req.body);
        var unicorn = new Unicorn();      // create a new instance of the Unicorn model
        var timeStamp = Math.floor(Date.now() / 1000); // get current timestamp
        unicorn.ubmTimestamp =   timeStamp; // set the timestamp for the MongoDB document
        var received = JSON.parse(JSON.stringify(req.body)); // parse the received notification to JSON object
        received.ubmTimestamp= timeStamp;
        unicorn.jsonPayload = received;

        // save the notification and check for errors
        unicorn.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Notification created!' });
        });
    })

    // get all the notifications (accessed at GET http://localhost:8088/api/unicorn)
    .get(function(req, res) {
        Unicorn.find(function(err, unicorn) {
            if (err)
                res.send(err);

            res.json(unicorn);
        });
    });

// on routes that end in /unicorn/nid/:notification_id
// ----------------------------------------------------
router.route('/unicorn/nid/:notification_id')

// get the notification with that id (accessed at GET http://localhost:8088/api/unicorn/nid/:notification_id)
    .get(function(req, res) {
        Unicorn.findById(req.params.notification_id, function(err, notification) {
            if (err)
                res.send(err);
            res.json(notification);
        });
    })

    // delete the notification with this id (accessed at DELETE http://localhost:8088/api/unicorn/nid/:notification_id)
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
router.route('/unicorn/search/')

// get the notification by a specific value in the json payload (accessed at GET http://localhost:8088/api/unicorn/search?=:key&?=:value)
    .get(function(req, res) {
        Unicorn.find(function(err, notifications) {
            if (err)
                res.send(err);
            var first = true;
            // iterate through the query parameters and search for appropriate notifications
            for (var propName in req.query) {
                if (req.query.hasOwnProperty(propName) && first === true) {
                    notifications = jsonQuery('[*]jsonPayload[*'+propName.toString()+'='+req.query[propName].toString()+']', {
                        data: notifications
                    }).value;
                    first = false;
                }
                if (req.query.hasOwnProperty(propName) && first === false) {
                    notifications = jsonQuery('[*'+propName.toString()+'='+req.query[propName].toString()+']', {
                        data: notifications
                    }).value;
                    first = false;
                }
            }
            res.json(notifications);
        });
    })
module.exports = router;