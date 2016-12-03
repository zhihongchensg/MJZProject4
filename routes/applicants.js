var Applicant = require('../models/applicant')
var express = require('express')
var router = express.Router()

var Joblist = require('../models/joblist')

// router.get('/', function (req, res) {
  // res.render('applicants/index'); // load the index.ejs file
//   Joblist.find({
//     expired: false
//   }, function (err, joblist) {
//     res.render('applicants/index', {
//       joblist: joblist
//     })
//   })
// })

router.get('/applicationForms/:id', function(req, res) {
  Joblist.findById(req.params.id, function(err, foundJoblist){
    res.render('applicants/apply', {foundJoblist:foundJoblist})

  })
})

router.post('/applicationForms/:id', function(req, res) {
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
    // console.log(newApplicant.gender)
    Joblist.findById(req.params.id, function(err, foundJoblist){
      // console.log(foundJoblist.applicants)
      foundJoblist.applicants.push(newApplicant._id)
      foundJoblist.save()
    })
  })
  res.redirect('/')
})

module.exports = router
