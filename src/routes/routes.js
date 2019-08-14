const DriverController = require('../controllers/drivers_controllers');

module.exports = (app) => {

    app.get('/api', DriverController.greeting);

    app.post('/api/drivers', DriverController.create);

};