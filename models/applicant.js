var mongoose = require("mongoose");

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
							type: String,
							required: true
						},
            education: {
							type: String,
							required: true
						},
            yearBorn: {
              type: Number,
              required: [true, 'Must be a YYYY!']
            },
            gender: {type: String, enum: ["Male", "Female"]},
            expectedPay: { type: Currency},
            skills: {
							type: String,
							required: true
						},
            bioText: {
              type: String,
              required: true
            }
					});

var Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = Applicant;
