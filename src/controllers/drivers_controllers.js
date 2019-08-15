const Driver = require('../model/Driver');

module.exports = {

    index(req, res, next) {
        const { lng, lat} = req.query;
        
        Driver.aggregate([{ 
            $geoNear: {
                near: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)]},
                distanceField: "dist.location",
                maxDistance: 200000,
                spherical: true,
            }
        }])
        .then(drivers => res.send(drivers))
        .catch(next);
    },

    create(req, res, next) {
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next);
    },

    edit(req, res, next) {
        const driverId = req.params.id;
        const driverProps = req.body;
        Driver.findByIdAndUpdate({ _id: driverId}, driverProps)
            .then(() => Driver.findById({ _id: driverId }))
            .then(driver => res.send(driver))
            .catch(next);
    },

    delete(req, res, next) {
        const driverId = req.params.id;

        Driver.findByIdAndDelete(driverId)
            .then(driver => res.status(204).send(driver))
            .catch(next);
    }
};