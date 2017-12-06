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
                success: 1,
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

// endpoint 'v1/service/add'
router.post('/add', function (req, res, next) {
    var decoded = jwt.decode(req.body.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var service = new Service({
            id: req.body.id,
            photo: req.body.photo,
            type: req.body.type,
            time: req.body.time,
            header: req.body.header,
            status: req.body.status,
            text: req.body.text,
            comments: req.body.comments,
            user_id: user._id
        });
        service.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.vendor_service_id.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved form details',
                success: 1,
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
        form.id = req.body.id;
        form.photo = req.body.photo;
        form.type = req.body.type;
        form.header = req.body.header;
        form.status = req.body.status;
        form.text = req.body.text;
        form.comments = req.body.comments;
        form.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated form details',
                success: 1,
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
                success: 1,
                obj: result
            });
        });
    });
});

// endpoint 'v1/service/getservices'
router.post('/getservices', function (req, res, next) {
    Service.find({"user_id":req.body.id})
        .exec(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                success: 1,
                obj: result
            });
        });
});

module.exports = router;