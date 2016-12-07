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
          age: { $lte: req.body.applicant.age},
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
      age: { $lte: req.body.applicant.age},
      expectedPay: { $lte: req.body.applicant.expectedPay},
    }, function(err, ShortListedApplicants){
      res.send(ShortListedApplicants)
    })

  }

});




  // userFilterInput=req.body.applicant
  // for (var key in userFilterInput) {
  //   if (userFilterInput[key] === "")
  //     userFilterInput[key]=0
  //   }

      // Applicant.find(
      //     {
      //       jobID: req.params.id,
      //       experience: { $gte: req.body.applicant.experience},
      //       education: req.body.applicant.education,
      //       age: { $gte: req.body.applicant.age},
      //       expectedPay: { $gte: req.body.applicant.expectedPay},
      //     }
      //   )
      //   .exec(function(err,ShortListedApplicants){
      //     console.log(ShortListedApplicants)
      //     firstShortList = []
      //     for (var i = 0; i < ShortListedApplicants.length; i++) {
      //       console.log(ShortListedApplicants[i]._id)
      //       firstShortList.push(ShortListedApplicants[i]._id)
      //     }
      //     console.log('this is crazy')
      //     console.log(firstShortList)
      //
      //     Applicant.find(
      //         {
      //           _id:'58460d92401f4d15903a878c',
          //       $text: {
          //         $search: userFilterInput.skills,
          //         $caseSensitive: false,
          //         $language: 'en'
          //       }},
          //       { score: { $meta: "textScore" }
          //     }
          // )
          //   // .where("_id").in([firstShortList])
          //   .sort( { score: { $meta: "textScore" }
      //    } )
      //       .exec(function(err,ShortListedApplicants){
      //         if(!err){
      //           console.log('finally... here...')
      //           console.log(ShortListedApplicants) }
      //       })
      //
      //     res.send(ShortListedApplicants)
      // })





// this is working
        //   Applicant.find(
        //       {
        //         jobID: req.params.id,
        //         $text: {
        //           $search: skillSet,
        //           $caseSensitive: false,
        //           $language: 'en'
        //       }},
        //       { score: { $meta: "textScore" } }
        //   )
        //   .exec(function(err, results) {
        //       if(!err){
        //       console.log('results ' + results)
        //   }
        // })


// this is working
      // Applicant.find(
      //     {jobID: req.params.id, $text: {
      //       $search: skillSet,
      //       $caseSensitive: false,
      //       $language: 'en'
      //     }},
      //     { score: { $meta: "textScore" } }
      // )
      // .exec(function(err, results) {
      //     if(!err){
      //     console.log('results ' + results)
      // }
      // })







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
