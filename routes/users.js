var express = require('express')
var router = express.Router()
var passport = require('passport')

var User = require('../models/user')
var Joblist = require('../models/joblist')
var Applicant = require('../models/applicant')

var Applicant = require('../models/applicant')

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
  if (!req.isAuthenticated())
    return next()
  // if they aren't redirect them to the home page
  res.redirect('/profile')
}

router.get('/', function (req, res) {
  // res.render('applicants/index'); // load the index.ejs file
  Joblist.find({
    filled: false
  }, function (err, joblist) {
    res.render('applicants/index', {
      joblist: joblist
    })
  })
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
  Joblist.find({
    user_id: req.user.id
  })
    .sort('-postDate')

    // why need to populate applicants????
    .populate('applicants')
    .exec(function (err, joblists) {
      res.render('users/profile', {
        user: req.user,
        joblists: joblists
      })
    })
  })

router.get('/logout', isLoggedIn, function (req, res) {
  req.logout()
  res.redirect('/')
})

router.get('/recruiterProfile', isLoggedIn, function (req, res) {
  res.render('users/recruiterProfile')
})

router.put('/recruiterProfile', isLoggedIn, function (req, res) {
  console.log(req.user.local.email)

  // User.update(
  //   {'local.email': req.user.local.email},
  //   {
  //     'local.name': req.body.user.name,
  //     'local.password':req.body.user.password
  //   },
  //   function (err, doc) {
  //     if (err) return handleError(err);
  //   }
  // )

  var currentUser = User.findOne({email: req.user.local.email}, function(err, doc){
    console.log(currentUser.name)
    console.log(currentUser.email)
    currentUser.name = req.body.user.name
    currentUser.email = req.body.user.email
    currentUser.password = req.body.user.password
  })

  currentUser.save()
  // function(err){
  //   console.log('done')
  //   })

  res.send('done')
})

// =============all below is for operations ==========================


router.get('/joblists/:id', function(req, res) {
  Joblist.findById (req.params.id, function (err, foundJoblist) {
    console.log(foundJoblist)
    res.render('users/showJobDescript', {foundJoblist : foundJoblist}
  )})
})

// Getting a new joblist form
router.get('/newJoblist', isLoggedIn, function (req, res) {
  res.render('joblists/new')
})
// my adding of a joblist from joblist form
router.post('/newJoblist', function (req, res) {
  var newJoblist = new Joblist({
    title: req.body.joblist.title,
    description: req.body.joblist.description,
    user_id: req.user.id
  })

  newJoblist.save(function (err) {
    if (err) throw new Error(err)
  })

  res.redirect('/profile')
})

// From a joblist, go to its applicants list
router.get('/:id/applicants', function(req,res){
	Joblist.findById(req.params.id).populate('applicants').exec(function(err,joblist){
			res.render("users/applicants", {joblist:joblist});
	});
});

module.exports = router
