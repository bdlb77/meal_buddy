const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
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
});


module.exports = mongoose.model('User', userSchema);
