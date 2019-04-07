const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const reviewSchema = new Schema({
	author: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: 'You must apply the author',
	},
	event: {
		type: mongoose.Schema.ObjectId,
		ref: 'Event',
		required: 'You must give an Event',
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

reviewSchema.pre('find', autoPopulate);
reviewSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('Review', reviewSchema);
