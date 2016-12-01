var mongoose = require("mongoose");

var joblistSchema = new mongoose.Schema({

						title: {
							type: String,
							required: true
						},

						description: {
							type: String,
							required: true
						},

						expired: {
							type: boolean,
						  default: false
						},

						postDate: {
							type: Date,
							default: Date.now
						},

						filled: {
							type: boolean,
						  default: false
						},

						user_id: {
							type: mongoose.Schema.Types.ObjectId,
							ref: "User"
						},

						applicant_id: {
							type: mongoose.Schema.Types.ObjectId,
							ref: "Applicant"
						}
					});

var Joblist = mongoose.model("Joblist", joblistSchema);

module.exports = Joblist;
