import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost/rafflebox_assignment').then((res) => {
  console.log('connected to db');
}).catch((err) => {
  console.log('error connecting to the db');
  console.log(err);
})

app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});