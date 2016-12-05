var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var bcrypt = require('bcrypt-nodejs')

var userSchema = new mongoose.Schema({
  local: {
    name: {
    type: String,
    trim: true,
    unique: true,
    required: true
    },
    email: {
      type: String,
      required: [true, 'Why no email?'],
      match: /.+\@.+\..+/
    },
    password: {
       type: String,
       validate: [
         function(password) {
           return password.length >= 6;
         },
         'Password should be longer'
       ]
     },
  }
})

userSchema.pre('save', function (next) {
  // this refers to the user-instance that is created from the model.
  var user = this
  bcrypt.genSalt(5,function (err, salt) {
  // bcrypt.genSalt(function (err, salt) {
    if (err) return next(err)

  bcrypt.hash(user.local.password, salt, null,function (err, hash) {
    // bcrypt.hash(user.local.password, salt, function (err, hash) {
      if (err) return next(err)

      user.local.password = hash
      next()
    })
  })
})

userSchema.methods.auth = function (givenPassword, callback) {
  console.log('given password is ' + givenPassword)
  console.log('saved password is ' + this.local.password)
  var hashedPassword = this.local.password

  bcrypt.compare(givenPassword, hashedPassword, function (err, isMatch) {
    callback(err, isMatch)
  })
}

var User = mongoose.model('User', userSchema)

module.exports = User
