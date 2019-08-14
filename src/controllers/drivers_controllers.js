const Driver = require('../model/Driver');

module.exports = {

    greeting(req, res) {
        res.send({ hi: 'There'});
    },

    create(req, res, next) {
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next);

    }
};