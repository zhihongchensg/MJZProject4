// Only connect to model only.
var User = require('../models/user')

function getSignup (req, res) {
  res.render('users/signup', {
    message: req.flash('signupMessage'),
    errors: req.flash('errorMessage')
  })
}

function getLogin (req, res) {
  res.render('users/login', {
    messages: req.flash('loginMessage')
  })
}


module.exports = {
  getSignup: getSignup,
  getLogin: getLogin
}
