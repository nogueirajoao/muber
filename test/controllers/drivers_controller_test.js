const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');
const app = require('../../src/app');

describe('Drivers Controller', () => {
    it('Post to /api/drivers create a new driver', (done) => {
        Driver.countDocuments().then(count => {
            request(app)
                .post('/api/drivers')
                .send({ email: 'teste@email.com'})
                .end(() => {
                    Driver.countDocuments().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        })
    });

    it('Put to /api/drivers/id edits a driver', (done) => {
        const driver = new Driver({ email: "edit@edit.com", driving: false });

        driver.save().then(() => {
            request(app)
                .put(`/api/drivers/${driver._id}`)
                .send({ email: "ete@edit.com", driving: true })
                .end(() => {
                    Driver.findById(driver._id)
                    .then(result => {
                        assert(result.driving === true);
                        assert(result.email === 'ete@edit.com');
                        done();
                    });
                });
        });

    });

    it('Delete to /api/drivers/id delete a driver', (done) => {
        const driver = new Driver({ email: "edit@edit.com", driving: false });

        driver.save().then(() => {
            request(app)
                .delete(`/api/drivers/${driver._id}`)
                .end(() => {
                    Driver.findById(driver._id)
                    .then(result => {
                        assert(result === null);
                        done();
                    });
                });
        });

    });

    it('GET /api/drivers find drivers in a location', (done) => {
        const seatleDriver = new Driver({
            email: 'seatle@driver.com',
            geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628]}
        });

        const miamiDriver = new Driver({
            email: 'miami@driver.com',
            geometry: { type: 'Point', coordinates: [-80.253, 25.791]}
        });

        Promise.all([ seatleDriver.save(), miamiDriver.save()])
            .then(() => {
                request(app)
                    .get('/api/drivers?lng=-81&lat=25')
                    .end((err, response) => {
                        assert(response.body[0].email === 'miami@driver.com');
                        done();
                    })
            })
    });
});
