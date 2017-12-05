var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    id: {type: Number},
    photo: {type: String},
    type: {type: String},
    time: {type: Number},
    header: {type: String},
    status: {type: String},
    text: {type: String},
    comments: {type: Array},
    user_id: {type: Schema.Types.ObjectId, ref: 'User_id'}
});

schema.post('remove', function (form) {
    User.findById(form.user_id, function (err, user) {
        user.service_provider_id.pull(form);
        user.save();
    });
});

module.exports = mongoose.model('Service', schema,'service');

