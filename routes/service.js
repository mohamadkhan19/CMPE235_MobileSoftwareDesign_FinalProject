var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Service = require('../models/service');

// endpoint 'v1/service'
router.get('/', function (req, res, next) {
    Service.find()
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
                obj: formdetails
            });
        });
});

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

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.body.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var service = new Service({
            name: req.body.name,
            photo: req.body.photo,
            status: req.body.status,
            user_id: user._id
        });
        service.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.service_provider_id.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved form details',
                obj: result
            });
        });
    });
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.body.token);
    Service.findById(req.params.id, function (err, form) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!form) {
            return res.status(500).json({
                title: 'No form Found!',
                error: {message: 'form not found'}
            });
        }
        if (form.user_id != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        form.name = req.body.name;
        form.photo = req.body.photo;
        form.status = req.body.status;
        form.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated form details',
                obj: result
            });
        });
    });
});

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.body.token);
    Service.findById(req.params.id, function (err, form) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!form) {
            return res.status(500).json({
                title: 'No form Found!',
                error: {message: 'form not found'}
            });
        }
        if (form.user_id != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        form.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted form details',
                obj: result
            });
        });
    });
});

module.exports = router;