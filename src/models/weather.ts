import mongoose from 'mongoose'
import { time } from 'console'

const weatherSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true
    },
    temperature: {
      type: Number,
      required: true
    },
    time: {
      type: Date,
      require: true
    }
  },
  { timestamps: true }
)

const Weather = mongoose.model('Weather', weatherSchema)

export default Weather
