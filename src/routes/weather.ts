import mongoose from 'mongoose';
import Weather from '../models/weather';

const routes = require('express').Router({ mergeParams: true });

routes.get('/', (req, res) => {
    var weathers = Weather.find( ).sort( {createdAt: 'desc'} ).exec(function(err, objs) { 
        if (err)
            res.status(404).send('Record not found');
        res.send(objs);
    });
});

routes.get('/:weatherId', (req, res) => {
    var weather = Weather.findById(req.params.weatherId, function(err, obj) {
        if (err)
            res.status(404).send('Record not found');
        res.send(obj);
    });
});

routes.post('/', (req, res) => {
    var newWeather = new Weather(req.body.weather);
    newWeather.save(function(err, obj) {
        if (err)
            res.send(err);

        res.json({ message: 'weather created!', data: obj });
    });
});

routes.patch('/:weatherId', (req, res) => {
    var weather = Weather.updateOne({_id: req.params.weatherId}, req.body.weather, {upsert: true}, function(err, obj) {
        if (err)
            res.status(404).send('Record not found');
        res.send(obj);
    });
});

routes.delete('/:weatherId', (req, res) => {
    var weather = Weather.deleteOne({ _id: req.params.weatherId }, function (err) {
        if (err)
            res.status(404).send('Record not found');
        res.send('Record Deleted');
    });
});

module.exports = routes;