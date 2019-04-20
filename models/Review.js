const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Booking = mongoose.model('Booking');

mongoose.Promise = global.Promise;

const reviewSchema = new Schema({
	author: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: 'You must apply the author',
	},
	booking: {
		type: mongoose.Schema.ObjectId,
		ref: 'Booking',
		unique: true,
		required: 'You must give an Event',
	},
	host: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: 'Please review the correct Host.',
	},
	comment: {
		type: String,
		required: 'Please leave a Comment!',
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: 'You must leave a review!',
	},
	created: {
		type: Date,
		default: Date.now,
	},
});
function autoPopulate(next) {
	this.populate('author');
	next();
}
reviewSchema.index({
	host: 1,
	booking: 1,
});

// make sure review date of Booking has already happened.
// reviewSchema.pre('save', async function(next) {
// 	const now = new Date(Date.now());
// 	const booking = await Booking.find({ _id: this.booking._id });
// 	if (now < booking.event.date) {
// 		// next(new Error('Please attend your event first!'));
// 		return;
// 	}

// 	next();
// });
reviewSchema.pre('find', autoPopulate);
reviewSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('Review', reviewSchema);
