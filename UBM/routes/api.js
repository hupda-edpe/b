/**
 * Created by 3OW on 03.07.2016.
 */
var config = require('../config');
var express = require('express');
var jsonQuery = require('json-query');      // json search tool
var Notification     = require('../models/notifications');


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

// create an Unicorn Notification (POST to http://localhost:8088/api/post/:notificationType?)
    .post(function(req, res) {
        var notification = new Notification();      // create a new instance of the Unicorn model
        //notification.ubmTimestamp =   Math.floor(Date.now() / 1000); // set the timestamp for the MongoDB document
        var received = JSON.parse(JSON.stringify(req.body)); // parse the received notification to JSON object
        // set the notificationType
        if(req.params.notificationType === undefined) {
            notification.notificationType = "generic";
        }
        else {
            notification.notificationType = req.params.notificationType;
        }
        for (var propName in received) {   // put received JSON data into our mongo document
            notification.set(propName, received[propName]);
        }
        // save the notification and check for errors
        notification.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Notification created!' });
        });
    });


// on routes that end in /api/delete/:notification_id
// ----------------------------------------------------
router.route('/delete/:notification_id')

    // delete the notification with this id (accessed at DELETE http://localhost:8088/api/delete/:notification_id)
    .delete(function(req, res) {
        Notification.remove({
            _id: req.params.notification_id
        }, function(err, notification) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// on routes that end in /api/search?=:key&?=:value
// ----------------------------------------------------
router.route('/search/')

// get the notification by a specific value in the json payload (accessed at GET http://localhost:8088/api/search?:key=:value&...)
    .get(function(req, res) {
        Notification.find(function(err, notifications) {
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