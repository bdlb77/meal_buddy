const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const Booking = mongoose.model('Booking');
const User = mongoose.model('User');
const ObjectId = mongoose.Types.ObjectId;

exports.createReview = async (req, res) => {
	const booking = await Booking.findOne({ _id: req.params.id });

	const reviewExist = await Review.find(
		{
			author: ObjectId(req.user._id),
			booking: ObjectId(req.params.id),
		},
		{ limit: 1 }
	);
	if (reviewExist.length > 0) {
		req.flash('error', 'You have already created a Review for this booking!');
		return res.redirect('back');
	}
	req.body.author = req.user._id;
	req.body.host = booking.event.author;
	req.body.booking = booking._id;

	const newReview = new Review(req.body);
	await newReview.save(function(err, save) {
		if (err) {
			req.flash('error', err.message);
			return res.redirect('back');
		}
		console.log('success!');
	});
	req.flash('success', 'Review Saved!');
	res.redirect('back');
};
