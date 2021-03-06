const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/muber', { useNewUrlParser: true, useFindAndModify: false });
    mongoose.connection.collections.drivers.createIndex({ 'geometry.coordinates': '2dsphere' })
}

app.use(bodyParser.json());

routes(app);

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message })
})

module.exports = app;