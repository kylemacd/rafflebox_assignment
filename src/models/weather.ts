import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    temperature: {
        type: Number,
        required: true
    }
  },
  { timestamps: true }
);
 
const Weather = mongoose.model('Weather', weatherSchema);
 
export default Weather;