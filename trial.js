if (req.body.applicant.experience1 > req.body.applciant.experience2 || req.body.applicant.age1 > req.body.applicant.age2) {
  res.send({"errors": {"foo": "must be valid range"} })
}

else {
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

}
