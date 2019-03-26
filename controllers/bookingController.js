const mongoose = require('mongoose');
const Booking = mongoose.model('Booking');
const ObjectId = mongoose.Types.ObjectId;

exports.createBooking = async (req, res) => {
	req.body.booker = req.user._id;
	req.body.event = req.params.id;
	const bookings = await Booking.aggregate([
		{
			$match: {
				event: ObjectId(req.body.event),
				booker: ObjectId(req.body.booker),
			},
		},
	]);
	console.log(`Bookings:::::: ${bookings}`);
	if (bookings.length > 0) {
		console.log('suceesss');
		req.flash('error', 'You have already booked this Event!');
		res.redirect('back');
	}
	const newBooking = new Booking(req.body);
	await newBooking.save();
	req.flash('success', `Booked for ${req.body.amount} people`);
	res.redirect('back');
};
