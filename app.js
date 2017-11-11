var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userRoutes = require('./routes/user');

var app = express();
mongoose.connect('mongodb://root:toor@ds051595.mlab.com:51595/theexplorer-backend');
//mongoose.connect('Your URL');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/v1/user', userRoutes);

module.exports = app;
