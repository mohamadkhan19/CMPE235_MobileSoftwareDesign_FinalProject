var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    name: {type: String},
    address: {type: String},
    zipcode: {type: String},
    phone: {type: String},
    date: {type: String},
    time: {type: String},
    user_id: {type: Schema.Types.ObjectId, ref: 'User_id'}
});

schema.post('remove', function (form) {
    User.findById(form.user_id, function (err, user) {
        user.Schedule_id.pull(form);
        user.save();
    });
});

module.exports = mongoose.model('Schedule', schema,'schedule');

