var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    service_id: {type: Number},
    service_name: {type: String},
    squarefeet: {type: Number},
    status: {type: String},
    duration: {type: String},
    warranty: {type: String},
    price: {type: Number},
    user_id: {type: Schema.Types.ObjectId, ref: 'User_id'}
});

schema.post('remove', function (form) {
    User.findById(form.user_id, function (err, user) {
        user.Rent_id.pull(form);
        user.save();
    });
});

module.exports = mongoose.model('Rent', schema,'rent');

