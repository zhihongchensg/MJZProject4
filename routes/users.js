var express = require('express')
var router = express.Router()
var passport = require('passport')

var User = require('../models/user')

var userController = require('../controllers/userController')

// route middleware to make sure a user is logged in
function isLoggedIn (req, res, next) {
  // res.send(req.isAuthenticated())
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next()
  // if they aren't redirect them to the home page
  res.redirect('/login')
}

function isNotLoggedIn (req, res, next) {
  if (! req.isAuthenticated())
    return next()
  // if they aren't redirect them to the home page
  res.redirect('/profile')
}

router.get('/', function (req, res) {
  res.render('applicants/index'); // load the index.ejs file
})

// login routes
// GET /login: Make sure user is not logged in 1st
router.get('/login', isNotLoggedIn, userController.getLogin)

// process the login form
router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/login', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}))

// signup routes
router.get('/signup', isNotLoggedIn, userController.getSignup)

// process the signup form
router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile', // redirect to the secure profile section
  failureRedirect: '/signup', // redirect back to the signup page if there is an error
  failureFlash: true // allow flash messages
}))

router.get('/profile', isLoggedIn, function (req, res) {
  res.render('users/profile');
})

router.get('/logout', isLoggedIn, function (req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = router
