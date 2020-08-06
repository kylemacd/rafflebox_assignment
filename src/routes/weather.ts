import mongoose from 'mongoose'
import Weather from '../models/weather'
import moment from 'moment'

const routes = require('express').Router({ mergeParams: true })

routes.get('/', (req, res) => {
  const weathers = Weather.find().sort({ createdAt: 'desc' }).exec(function (err, objs) {
    if (err) { res.status(404).send('Record not found') }
    res.send(objs)
  })
})

routes.get('/:weatherId', (req, res) => {
  const weather = Weather.findById(req.params.weatherId, function (err, obj) {
    if (err) { res.status(404).send('Record not found') }
    res.send(obj)
  })
})

routes.post('/', (req, res) => {
  if (req.body.time) {
    req.body.time = moment(moment().format('YYYY-MM-DD') + ' ' + req.body.time)
  }
  const newWeather = new Weather(req.body)
  newWeather.save(function (err, obj) {
    if (err) { res.send(err) }
    res.status(200).send(obj)
  })
})

routes.delete('/:weatherId', (req, res) => {
  const weather = Weather.deleteOne({ _id: req.params.weatherId }, function (err) {
    if (err) { res.status(404).send('Record not found') }
    res.send('Record Deleted')
  })
})

module.exports = routes
