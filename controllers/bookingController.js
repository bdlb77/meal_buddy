const mongoose = require('mongoose');
const Booking = mongoose.model('Booking');
const Event = mongoose.model('Event');
const ObjectId = mongoose.Types.ObjectId;

exports.createBooking = async (req, res) => {
	req.body.booker = req.user._id;
	req.body.event = req.params.id;
	const amount = req.body.amount;
	const bookings = await Booking.aggregate([
		{
			$match: {
				event: ObjectId(req.body.event),
				booker: ObjectId(req.body.booker),
			},
		},
	]);
	if (bookings.length > 0) {
		req.flash('error', 'You have already booked this Event!');
		res.redirect('back');
	}
	const event = Event.find({ _id: req.body.event });
	const spotsOpen = event.maxCapacity - event.minCapacity;

	if (spotsOpen == 0) {
		req.flash('error', 'There are no more spots available');
		res.redirect('back');
	} else if (amount > spotsOpen) {
		req.flash('error', 'Not enough spots open!');
		res.redirect('back');
	}
	const newBooking = new Booking(req.body);
	await newBooking.save();
	req.flash('success', `Booked for ${req.body.amount} people`);
	res.redirect('back');
};
