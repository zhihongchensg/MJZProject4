var mongoose = require("mongoose");
var Applicant = require("./applicant");

var joblistSchema = new mongoose.Schema({

						title: {
							type: String,
							required: true
						},

						description: {
							type: String,
							required: true
						},

						// expired: {
							// type: Boolean,
						  // default: false
						// },

						postDate: {
							type: Date,
							default: Date.now
						},

						filled: {
							type: Boolean,
						  default: false
						},

						user_id: {
							type: mongoose.Schema.Types.ObjectId,
							ref: "User"
						},

						applicants: [
							{
								type: mongoose.Schema.Types.ObjectId,
								ref: 'Applicant'
							}
						]

						// applicant: [Applicant]

					});

var Joblist = mongoose.model("Joblist", joblistSchema);

module.exports = Joblist;
