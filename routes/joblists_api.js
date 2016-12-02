var express = require('express')
var router = express.Router()

var Joblist = require('../models/joblist')


// Very important: Public static file main.js -> click on form button -> posted!
router.put ('/joblists/:id/edit', function(req, res) {
  Joblist.findById (req.params.id, function (err, foundJoblist) {
    foundJoblist.expired = true
    foundJoblist.save()
    res.send(foundJoblist)
  })
})
router.get('/test', function(req, res){
  res.send("test");
})

module.exports = router
