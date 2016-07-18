var express = require('express');
var router = express.Router();
var Server = require('../models/unicornServer');
var EventType = require('../models/eventType');

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

module.exports = function(passport){

  /* GET login page. */
  router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('index', { message: req.flash('message')});
  });

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true
  }));

  /* GET Registration Page */
  router.get('/signup', function(req, res){
    res.render('register',{message: req.flash('message')});
  });

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash : true
  }));

  /* GET Home Page */
  router.get('/home', isAuthenticated, function(req, res){
    res.render('home', { user: req.user });
  });

  /* GET Unicorn Server */
  router.get('/unicornserver', isAuthenticated, function(req1, res){
    Server.find({userID: req1.user._id}, function(req2, servers){
      res.render('unicornserver', { user: req1.user, server: servers });
    });
  });
  /* Post UnicornServer */
  router.post('/unicornserver', isAuthenticated, function(req, res) {
    new Server({userID : req.user._id, ServerName: req.body.serverName, ServerPath: req.body.serverPath })
      .save(function(err, out) {
        res.redirect('/unicornserver');
      });
  });
  /* Delete UnicornServer */
  router.post('/unicornserver/:serverId', isAuthenticated, function(req, res) {
    Server.remove({
      _id: req.params.serverId
    }, function (err, notification) {
      if (err)
        res.render('/unicornserver', { message: req.flash('something went wrong')});
      res.redirect('/unicornserver')
    });
  });
  /* GET EventTypes */
  router.get('/eventtypes', isAuthenticated, function(req1, res){
    EventType.find({userID: req1.user._id}, function(req2, eventTypes){
      Server.find({userID: req1.user._id}, function(req3, servers) {
        res.render('eventtypes', {user: req1.user, event: eventTypes, server: servers})
      });
    });
  });
  /* Post EventTypes */
  router.post('/eventtypes', isAuthenticated, function(req, res) {
    new EventType({userID : req.user._id, eventName: req.body.eventName, eventXml: req.body.eventXml })
        .save(function(err, out) {
          console.log(req.body.eventXml)
          res.redirect('/eventtypes');
        });
  });
  /* Delete EventTypes */
  router.post('/eventtypes/:eventId', isAuthenticated, function(req, res) {
    EventType.remove({
      _id: req.params.eventId
    }, function (err, notification) {
      if (err)
        res.render('/eventtypes', { message: req.flash('something went wrong')});
      res.redirect('/eventtypes')
    });
  });

  /* Send Event Types to Unicorn */
  router.post('/sendevent', isAuthenticated, function(req, res) {
    // TODO Implement Sending Event
  });
  /* Handle Logout */
  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });


  return router;
}