var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Vehicle = require('./app/models/vehicle');

// configure app for bodyParser
// grab data from the body of POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set up a port for server to listen to
var listenPort = process.env.PORT || 3000;

//connect to DB
mongoose.connect('mongodb://localhost:27017/codealong',{ useNewUrlParser: true , useUnifiedTopology: true } );

// API Routes
var router = express.Router();

// routes will all be prefixed with /api
app.use('/api', router);

// use middleware for validations
router.use(function(req, res, next){
  console.log('FYI .... there is some tasks going down ...');
  next();
});

// test route
router.get('/', function (req, res) {
  res.json({message: 'Welcome to our API.'});
});

router.route('/vehicles')
  .post(function (req, res){
    var vehicle  = new Vehicle();
    vehicle.make = req.body.make;
    vehicle.model = req.body.model;
    vehicle.color = req.body.color;

    vehicle.save(function(err) {
      if (err){
        res.send(err);
      }
      res.json({message: 'Vehicle was successfully manufactured.'})
    });
  })
  .get(function (req, res){
    Vehicle.find(function (err, vehicles){
      if (err){
        res.send(err);
      }
      res.json(vehicles);
    });
  });

router.route('/vehicle/:vehicle_id')
  .get(function (req, res){
  Vehicle.findById(req.params.vehicle_id ,function (err, vehicle){
    if (err){
      res.send(err);
    }
    res.json(vehicle);
  });
});

router.route('/vehicle/make/:make')
  .get(function (req, res){
    Vehicle.find({make: req.params.make}, function (err, vehicle){
      if (err){
        res.send(err);
      }
      res.json(vehicle);
    });
  });

router.route('/vehicle/model/:model')
  .get(function (req, res){
    Vehicle.find({model: req.params.model}, function (err, vehicle){
      if (err){
        res.send(err);
      }
      res.json(vehicle);
    });
  });

router.route('/vehicle/color/:color')
  .get(function (req, res){
    Vehicle.find({color: req.params.color}, function (err, vehicle){
      if (err){
        res.send(err);
      }
      res.json(vehicle);
    });
  });

// FIRE UP SERVER
app.listen(listenPort);

// print message to console
console.log('Server is listening to port ' + listenPort);






