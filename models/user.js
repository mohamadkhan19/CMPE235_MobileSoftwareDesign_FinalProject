var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    form_id: [{type: Schema.Types.ObjectId, ref: 'Form_id'}],
    service_provider_id: [{type: Schema.Types.ObjectId, ref: 'Service_provider_id'}],
    service_user_id: [{type: Schema.Types.ObjectId, ref: 'Service_user_id'}],
    rent_id: [{type: Schema.Types.ObjectId, ref: 'Rent_id'}],
    vendor_service_id:[{type: Schema.Types.ObjectId, ref: 'Vendor_service_id'}]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema, 'users');
