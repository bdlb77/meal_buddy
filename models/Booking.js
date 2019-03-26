const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const BookingSchema = new Schema({
	amount: {
		type: Number,
		required: 'Please supply a number of people',
	},
	event: {
		type: Schema.ObjectId,
		ref: 'Event',
		required: 'Must give an event!',
	},
	booker: {
		type: Schema.ObjectId,
		ref: 'User',
		required: 'You must supply the booker!',
	},
	confirmed: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model('Booking', BookingSchema);
