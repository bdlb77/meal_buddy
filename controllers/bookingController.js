const mongoose = require('mongoose');
const Booking = mongoose.model('Booking');

exports.createBooking = async (req, res) => {
	req.body.author = req.user._id;
	req.body.event = req.params.id;
	const newBooking = new Booking(req.body);
	await newBooking.save();
	req.flash('success', `Booked for ${req.body.amount} people`);
	req.redirect('back');
};
