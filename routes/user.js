var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.get('/', function (req, res, next) {
    User.find()
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

// route "v1/user/register"
router.post('/register', function (req, res, next) {
    var user = new User({
        name: req.body.name,
        type: req.body.type,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            success: 1,
            obj: result
        });
    });
});

// route "v1/user/login"
router.post('/login', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                message: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                message: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: user}, 'thisisaveryhiglysecuremessage1234567890!@#$%^&*()', {expiresIn: 300});
        res.status(200).json({
            message: 'Successfully logged in',
            success: 1,
            token: token,
            obj : user
        });
    });
});

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.body.token);
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(500).json({
                message: 'No user Found!',
                error: {message: 'user not found'}
            });
        }
        if (user._id != decoded.user._id) {
            return res.status(401).json({
                message: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        user.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    message: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted user',
                obj: result
            });
        });
    });
});

// endpoint 'v1/user/count'
router.get('/count', function (req, res, next) {
    User.aggregate({"$group":{_id:"$type", count:{$sum:1}}})
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

// endpoint 'v1/user/customers'
router.get('/customers', function (req, res, next) {
    User.find({type:"Customer"})
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
