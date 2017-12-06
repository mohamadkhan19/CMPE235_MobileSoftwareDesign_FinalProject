var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Schedule = require('../models/schedule');
var User = require('../models/user');

router.use('/', function (req, res, next) {
    jwt.verify(req.body.token, 'thisisaveryhiglysecuremessage1234567890!@#$%^&*()', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

// endpoint 'v1/schedule/'
router.get('/', function (req, res, next) {
    Schedule.find()
        .populate('user', 'firstName')
        .exec(function (err, formdetails) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                success: 1,
                obj: formdetails
            });
        });
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.body.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var schedule = new Schedule({
            name: req.body.name,
            address: req.body.address,
            zipcode: req.body.zipcode,
            phone: req.body.phone,
            date: req.body.date,
            time: req.body.time,
            user_id: user._id
        });
        schedule.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.Schedule_id.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved form details',
                success: 1,
                obj: result
            });
        });
    });
});

module.exports = router;