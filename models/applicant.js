var mongoose = require("mongoose");
// require('mongoose-money');
var Schema = mongoose.Schema;
// var Money = require('moneyjs');

var applicantSchema = new mongoose.Schema({
						name: {
							type: String,
							validate: [
			          function(name) {
			            return name.length >= 3;
			          },
			          'Username should be longer'
			        ]
						},
						contact: String,
            email: {
              type: String,
              required: [true, 'Why no email?'],
              match: /.+\@.+\..+/
            },
            experience: {
							type: Number,
							required: true,
							min: [0, 'must be >= 0'],
							validate: [
			          function(experience) {
			            return experience >= 0;
			          },
			          'Experience shall be greater than 0.'
			        ]

						},
            education: {
							type: String,
							required: true,
							enum: ['diploma', 'bachelor', 'master', 'phd'],
							default: 'diploma'
						},

            age: {
              type: Number,
              required: true
            },

            gender: {
							type: String,
							required: true,
							enum: ['Male', 'Female'],
							default: 'Male'
						},

            expectedPay: {
							type: Number,
						},

            skills: {
							type: String,
							required: true,
							validate: [
			          function(skills) {
			            return skills.length >= 6;
			          },
			          'Password should be longer'
			        ]
						},
            bioText: {
              type: String,
              required: [true, 'This must be filled'],
							validate: [
			          function(bioText) {
			            return bioText.length >= 5	;
			          },
			          'Biotext should be at least 5 characters'
			        ]
            }
					});

var Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = Applicant;
