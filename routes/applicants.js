var Applicant = require('../models/applicant')
var express = require('express')
var router = express.Router()

var Joblist = require('../models/joblist')

// router.get('/', function (req, res) {
//   // res.render('applicants/index'); // load the index.ejs file
//   Joblist.find({
//     expired: false
//   }, function (err, joblist) {
//     res.render('applicants/index', {
//       joblist: joblist
//     })
//   })
// })

router.get('/applicationForms', function(req, res) {
  res.render('applicants/apply')
})

router.post('/applicationForms', function(req, res) {
  // console.log('successful posting')
  var newApplicant = new Applicant({
    name: req.body.applicant.name,
    contact: req.body.applicant.contact,
    email: req.body.applicant.email,
    experience: req.body.applicant.experience,
    education: req.body.applicant.education,
    yearBorn: req.body.applicant.yearBorn,
    gender: req.body.applicant.gender,
    expectedPay: req.body.applicant.expectedPay,
    skills: req.body.applicant.skills,
    bioText: req.body.applicant.bioText
  })
  newApplicant.save(function(err) {
    if (err) throw new Error(err)
  })
  res.redirect('/')
})

module.exports = router
