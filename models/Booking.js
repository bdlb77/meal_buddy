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
	bookee: {
		type: Schema.ObjectId,
		ref: 'User',
		required: 'You must supply the bookee!',
	},
	confirmed: {
		type: boolean,
		default: false,
	},
});

module.exports = module.model('Booking', BookingSchema);
