module.exports = (app) => {
    const car = require('../controllers/car.controller');

    // Create a new car
    app.post('/car', car.create);

    // Retrieve all car
    app.get('/car', car.findAll);

    // Retrieve a single Note with noteId
    app.get('/car/:noteId', car.findOne);

    // Update a Note with noteId
    app.put('/car/:noteId', car.update);

    // Delete a Note with noteId
    app.delete('/car/:noteId', car.delete);
}