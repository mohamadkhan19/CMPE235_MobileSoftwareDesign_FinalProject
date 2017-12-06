var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Cart = require('../models/cart');
var Rent = require('../models/rent');

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
        var cart = new Cart({
            service_id: req.body.service_id,
            squarefeet: req.body.squarefeet,
            duration: req.body.duration,
            warranty: req.body.warranty,
            price: req.body.price,
            user_id: user._id
        });
        cart.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.cart_id.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved form details',
                success: 1,
                obj: result
            });
        });
    });
});

// endpoint 'v1/cart/getservices'
router.post('/getservices', function (req, res, next) {
    Cart.find({"user_id":req.body.id})
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

// endpoint 'v1/cart/lease'
router.post('/lease', function (req, res, next) {

    Cart.find({}).then(function(doc) {
        doc.forEach(function(u) {
           console.log(u)
            var rent = new Rent({
                service_id: u.service_id,
            squarefeet: u.squarefeet,
            duration: u.duration,
            warranty: u.warranty,
            price: u.price,
            user_id: u.user_id
            });
            rent.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            
        });
             

        })
    })
    Cart.remove({}, function(err) { 
        console.log('collection removed') 
    });
    return res.status(201).json({
                    title: 'done'
                });


});

module.exports = router;