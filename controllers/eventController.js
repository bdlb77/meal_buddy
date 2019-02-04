const mongoose = require('mongoose');

exports.homePage =  (req,res) => {
    res.render('homepage');
}

exports.getEvents = (req,res) => {
    res.json(req.body)
};
