const mongoose = require('mongoose');
const Event = mongoose.model('Event');


exports.homePage = (req,res) => {
    res.render('homepage');
}

exports.getEvents = async (req,res) => {
    const events = await Event.find();
    res.render('events', {title: 'Events Page', events})
};
