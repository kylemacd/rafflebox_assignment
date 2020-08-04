import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8000;
const weatherRoutes = require('./src/routes/weather');

mongoose.connect('mongodb://localhost/rafflebox_assignment').then((res) => {
  console.log('connected to db');
}).catch((err) => {
  console.log('error connecting to the db');
  console.log(err);
})

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/api', (req, res) => res.send('Express + TypeScript Server'));
app.use('/api/weather', weatherRoutes)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});