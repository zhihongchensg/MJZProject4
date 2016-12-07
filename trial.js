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
<p><%if (applicant.education ==1) {%> Diploma <%}%></p>
<p><%if (applicant.education ==2) {%> Bachelor<%}%></p>
<p><%if (applicant.education ==3) {%> Master<%}%></p>
<p><%if (applicant.education ==4) {%> Phd<%}%></p>
