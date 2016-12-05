var mongoose = require("mongoose");
require('mongoose-money');
var Schema = mongoose.Schema;
var Money = require('moneyjs');

var applicantSchema = new mongoose.Schema({
						name: {
							type: String,
							required: true
						},
						contact: String,
            email: {
              type: String,
              required: [true, 'Why no email?'],
              match: /.+\@.+\..+/
            },
            experience: {
							type: Number,
							required: true
						},
            education: {
							type: String,
							required: true
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

            expectedPay: { type: Number},

            skills: {
							type: String,
							required: true
						},
            bioText: {
              type: String,
              required: true,
            }
					});

var Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = Applicant;
