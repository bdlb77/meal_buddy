const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			lowercase: true,
			trim: true,
			validate: [validator.isEmail, 'Invalid email address'],
			require: 'Please supply an email',
		},
		name: {
			type: String,
			required: 'Please supply a name!',
			trim: true,
		},
		resetPasswordToken: String,
		resetPasswordExpires: Date,
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);
userSchema.virtual('gravatar').get(function() {
	const hash = md5(this.email);
	return `https://gravatar.com/avatar/${hash}?size=150`;
});
userSchema.virtual('bookings', {
	ref: 'Booking', // what model is linked?
	localField: '_id', //what field on model
	foreignField: 'booker', //which field on Booking?
});
userSchema.virtual('reviews', {
	ref: 'Review',
	localField: '_id',
	foreignField: 'host',
});

function autoPopulate(next) {
	this.populate('reviews');
	next();
}

userSchema.pre('find', autoPopulate);
userSchema.pre('findOne', autoPopulate);

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
