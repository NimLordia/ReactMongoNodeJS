const Car = require('../models/car.model');

// Create and Save a new Car
exports.create = (req, res) => {
    // Validate request
    if(!req.body.type) {
        return res.status(400).send({
            message: "Car content can not be empty"
        });
    }

    // Create a Car
    const carObj = new Car({
        type: req.body.type || "Untitled Car", 
        color: req.body.color,
        model: req.body.model

    });

    // Save Note in the database
    carObj.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Car."
        });
    });
};

// Retrieve and return all cars from the database.
exports.findAll = (req, res) => {
    Car.find()
    .then(cars => {
        res.send(cars);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving cars."
        });
    });
};

// Find a single car with a carId
exports.findOne = (req, res) => {
    Car.findById(req.params.carId)
    .then(car => {
        if(!car) {
            return res.status(404).send({
                message: "Car not found with id " + req.params.carId
            });            
        }
        res.send(car);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Car not found with id " + req.params.carId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving car with id " + req.params.carId
        });
    });
};

// Update a car identified by the carId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Car content can not be empty"
        });
    }

    // Find note and update it with the request body
    Car.findByIdAndUpdate(req.params.carId, {
        type: req.body.type || "Untitled Car",
        color: req.body.color,
        model: req.body.model
    }, {new: true})
    .then(car => {
        if(!car) {
            return res.status(404).send({
                message: "Car not found with id " + req.params.carId
            });
        }
        res.send(car);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Car not found with id " + req.params.carId
            });                
        }
        return res.status(500).send({
            message: "Error updating car with id " + req.params.carId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Car.findByIdAndRemove(req.params.carId)
    .then(car => {
        if(!car) {
            return res.status(404).send({
                message: "car not found with id " + req.params.carId
            });
        }
        res.send({message: "car deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "car not found with id " + req.params.carId
            });                
        }
        return res.status(500).send({
            message: "Could not delete car with id " + req.params.carId
        });
    });
};