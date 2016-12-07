var express = require('express')
var router = express.Router()

var Joblist = require('../models/joblist')
var Applicant = require('../models/applicant')

// Very important: Public static file main.js -> click on form button -> posted!
router.put ('/joblists/:id/edit', function(req, res) {
  Joblist.findById (req.params.id, function (err, foundJoblist) {
    foundJoblist.filled = true
    foundJoblist.save()
    res.send(foundJoblist)
  })
  .sort('-postDate')

})
router.get('/test', function(req, res){
  res.send("test");
})

router.put('/applicants/:id/searching', function(req,res){
  // console.log('params - ' + req.params.id)
  // console.log('skillset - ' + skillSet)
  skillSet=req.body.applicant.skills
  skillSet=skillSet.replace(/,/gi, " ")
  console.log (typeof(skillSet))
  console.log(skillSet)
  console.log(req.body.applicant)

  if (skillSet !== "") {
    Applicant.find(
        {
          jobID: req.params.id,
          experience: { $gte: req.body.applicant.experience1, $lte: req.body.applicant.experience2},
          education: { $gte: req.body.applicant.education},
          age: { $gte: req.body.applicant.age1, $lte: req.body.applicant.age2},
          expectedPay: { $lte: req.body.applicant.expectedPay},
          $text: {
            $search: skillSet,
            $caseSensitive: false,
            $language: 'en'
          }},
          { score: { $meta: "textScore" } }
      )
      .sort( { score: { $meta: "textScore" } }
      )
      .exec(function(err,ShortListedApplicants){
        // if(!err){  console.log(ShortListedApplicants) }
        res.send(ShortListedApplicants)
    })
  }
  else {
    Applicant.find({
      jobID: req.params.id,
      experience: { $gte: req.body.applicant.experience1, $lte: req.body.applicant.experience2},
      education: { $gte: req.body.applicant.education},
      age: { $gte: req.body.applicant.age1, $lte: req.body.applicant.age2},
      expectedPay: { $lte: req.body.applicant.expectedPay},
    }, function(err, ShortListedApplicants){
      res.send(ShortListedApplicants)
    })

  }

});


module.exports = router
