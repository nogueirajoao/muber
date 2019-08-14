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
                .send({ email: 'joao@email.com'})
                .end(() => {
                    Driver.countDocuments().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        })
    });
});
