const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Booking = mongoose.model('Booking');

mongoose.Promise = global.Promise;

const reviewSchema = new Schema(
	{
		author: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: 'You must apply the author',
			unique: false,
		},
		booking: {
			type: mongoose.Schema.ObjectId,
			ref: 'Booking',
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
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);
// reviewSchema.index({
// 	host: 1,
// 	booking: 1,
// });

// make sure review date of Booking has already happened.
reviewSchema.pre('save', async function(next) {
	const now = new Date(Date.now());
	const booking = await Booking.findOne({ _id: this.booking._id });
	if (booking.event.date > Date.now()) {
		next(new Error('Please attend the event first!'));
	} else {
		next();
	}
});
function autoPopulate(next) {
	this.populate('author');
	next();
}
reviewSchema.pre('find', autoPopulate);
reviewSchema.pre('findOne', autoPopulate);
module.exports = mongoose.model('Review', reviewSchema);
