var Applicant = require('../models/applicant')
var express = require('express')
var router = express.Router()

var Joblist = require('../models/joblist')

router.get('/applicationForms/:id', function(req, res) {
  Joblist.findById(req.params.id, function(err, foundJoblist){
    res.render('applicants/apply', {foundJoblist:foundJoblist})

  })
})

router.post('/applicationForms/:id', function(req, res, next) {
  // console.log('successful posting')
  var newApplicant = new Applicant({
    name: req.body.applicant.name,
    contact: req.body.applicant.contact,
    email: req.body.applicant.email,
    experience: req.body.applicant.experience,
    education: req.body.applicant.education,
    age: req.body.applicant.age,
    gender: req.body.applicant.gender,
    expectedPay: req.body.applicant.expectedPay,
    skills: req.body.applicant.skills,
    bioText: req.body.applicant.bioText,
    jobID: req.params.id
  })
  newApplicant.save(function(err) {

    if (err) {
      throw new Error(err)
      // req.flash('errorMessage', 'You have made a mistake')
      // return res.redirect('back')
      // res.render('applicants/apply', {errors: err});
      // res.status(500).send('error saving applicant'+ err);
    } else{
      Joblist.findById(req.params.id, function(err, foundJoblist){
        // console.log(foundJoblist.applicants)
        foundJoblist.applicants.push(newApplicant._id)
        foundJoblist.save()
      })
    }
    req.flash('successMessage', "You successfully applied!")
    res.redirect('/applicants')
  })
})

// get an applicant's profile
router.get('/:id', function(req, res) {
  Applicant.findById (req.params.id, function (err, applicant) {
    res.render('applicants/profile', {applicant:applicant})
  })
})

module.exports = router
