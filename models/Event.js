const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const slug = require('slugs');

const eventSchema = new Schema({
  title: {
      type: String,
      trim: true,
      required: "You must add an event name!"
  },
  description:{
      type: String,
      trim: true,
  },
  slug: String,
  created: {
      type: Date,
      default: Date.now
  },
  date: {
      type: Date,
      min: Date.now
      required: "Please enter a valid event Date!",
  },
  minCapacity:{
      type: Number,
      required: "Please enter a correct min capacity for your event!"
  },
  maxCapacity: {
      type: Number,
      required: "Please enter a correct max capacity for your event!"
  },
  price: Number,
  location: {
    type: String,
    default: 'Point',
    coordinates: [{
        type: Number,
        required: "You must supply coords!"
    }],
    address: {
        type: String,
        required: "Please enter a valid address!"
    },
  },
  photo: String,
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    required: "You must supply an author!",
  },
  available: Boolean,

  // attendees: [User], you can do through virtuals
})

module.exports = mongoose.model('Event', eventSchema);