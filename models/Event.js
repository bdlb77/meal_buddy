const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const slug = require('slugs');

const eventSchema = new Schema(
	{
		title: {
			type: String,
			trim: true,
			required: 'You must add an event name!',
		},
		description: {
			type: String,
			trim: true,
		},
		slug: {
			type: String,
		},
		created: {
			type: Date,
			default: Date.now,
		},
		date: {
			type: Date,
			min: Date.now,
			required: 'Please enter a valid event Date!',
		},
		minCapacity: {
			type: Number,
			required: 'Please enter a correct min capacity for your event!',
		},
		maxCapacity: {
			type: Number,
			required: 'Please enter a correct max capacity for your event!',
		},
		price: Number,
		location: {
			type: {
				type: String,
				default: 'Point',
			},
			coordinates: [
				{
					type: Number,
					required: 'You must supply coords!',
				},
			],
			address: {
				type: String,
				required: 'Please enter a valid address!',
			},
		},
		photo: String,
		author: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: 'You must supply an author!',
		},
		available: Boolean,
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);
eventSchema.pre('save', async function(next) {
	// 1. return if name is not modified.
	if (!this.isModified('title')) return next();
	// 2. set slug properly
	this.slug = slug(this.title);
	// 3. handle slugs to be unique
	// - regex to find slugs with matching name.
	const slugRegex = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
	const eventsWithSlug = await this.constructor.find({ slug: slugRegex });
	// - increment number.
	if (eventsWithSlug.length) {
		this.slug = `${this.slug}-${eventsWIthSlug.length + 1}`;
	}
	// 4. continue on
	next();
});

eventSchema.virtual('bookings', {
	ref: 'Booking', // what model is linked?
	localField: '_id', //what field on model
	foreignField: 'event', //which field on Booking?
});

function autoPopulate(next) {
	this.populate('author');
	next();
}

eventSchema.statics.attending = function(eventId) {
	return this.aggregate([
		{
			$match: { _id: eventId },
		},
		{
			$lookup: {
				from: 'bookings',
				localField: '_id',
				foreignField: 'event',
				as: 'bookings',
			},
		},
		{ $unwind: '$bookings' },
		{
			$group: {
				_id: null,
				sum: { $sum: '$bookings.amount' },
			},
		},
		{
			$project: { _id: 0, sum: 1 },
		},
	]);
};

eventSchema.pre('find', autoPopulate);
eventSchema.pre('findOne', autoPopulate);

module.exports = mongoose.model('Event', eventSchema);
