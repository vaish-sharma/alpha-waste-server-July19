const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var paymentRequestStatusEnum = ['PENDING', 'COMPLETED'];
var paymentRequestSchema = new Schema({
	order: {
		type: mongoose.ObjectId,
		required: true,
	},
	status: {
		type: paymentRequestStatusEnum,
		required: true,
	},
});

paymentRequestSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('PaymentRequest', paymentRequestSchema);
