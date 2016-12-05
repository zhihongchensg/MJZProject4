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
  console.log(req.body.applicant.experience)
  skillSet=req.body.applicant.skills
  skillSet=skillSet.replace(/,/gi, " ")
  console.log('params - ' + req.params.id)
  console.log(skillSet)

      Applicant.find(
          {jobID: req.params.id,
          match:
            {
                  experience: { $gte: req.body.applicant.experience},
                   education: req.body.applicant.education,
                   age: { $lt: req.body.applicant.age},
                   expectedPay: { $gte: req.body.applicant.expectedPay},
            }
        }).exec(function(err,ShortListedApplicants){
          console.log('yoyo' + ShortListedApplicants)

      ShortListedApplicants.find(
          {jobID: req.params.id, $text: {
            $search: skillSet,
            $caseSensitive: false,
            $language: 'en'
          }},
          { score: { $meta: "textScore" } }
      )
      .exec(function(err, results) {
          if(!err){
          console.log('results ' + results)
      }
      })
      res.send('results')
  })

});


  // Joblist.findById(req.params.id).populate({
  //   path: 'applicants'
  //   }).exec(function(err,joblist){
  //     joblist.applicants.find(
  //            {
  //              $text: {
  //              $search: skillSet,
  //              $caseSensitive: false
  //            }}
  //        )
  //        .exec(function(err, results) {
  //          if(!err){
  //            console.log('results ' + results)
  //                }
  //         })
  //         res.send(joblist.applicants);
  //       })
  //   })






// 	Joblist.findById(req.params.id).populate({
//     path: 'applicants',
//     match:
//       {
//             // experience: { $gte: req.body.applicant.experience},
//             //  education: req.body.applicant.education,
//             //  age: { $lt: req.body.applicant.age},
//             //  expectedPay: { $gte: req.body.applicant.expectedPay},
//             skills: { $text: { $search: "html" } }
//       }
//   }).exec(function(err,joblist){
//       console.log($text)
//       console.log(joblist.applicants)
// 			res.send(joblist.applicants);
// 	});
// });


// Joblist.findById(req.params.id).populate({
//   path: 'applicants',
//   match:{experience: { $gte: req.body.applicant.experience},
//            education: req.body.applicant.education,
//            age: { $lt: req.body.applicant.age},
//            expectedPay: { $gte: req.body.applicant.expectedPay},
//           skills:req.body.applicant.skills
//     }
// }).exec(function(err,joblist){
//     console.log(joblist.applicants)
//     res.send(joblist.applicants);
// });






module.exports = router
