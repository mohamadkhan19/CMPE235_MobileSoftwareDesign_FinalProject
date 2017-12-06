var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userRoutes = require('./routes/user');
var serviceProviderRoutes = require('./routes/serviceprovider');
var serviceRoutes = require('./routes/service');
var rentRoutes = require('./routes/rent');
var cartRoutes = require('./routes/cart');

var app = express();
mongoose.connect(process.env.MONGODB_URI);
//mongoose.connect('Your URL');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/v1/user', userRoutes);
app.use('/v1/serviceprovider', serviceProviderRoutes);
app.use('/v1/service', serviceRoutes);
app.use('/v1/rent', rentRoutes);
app.use('/v1/cart', cartRoutes);

module.exports = app;
