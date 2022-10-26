const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tourSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  totalDistance: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  daysAmount: {
    type: Number,
    required: true,
    min: 1,
  },
  country: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  startDate: {
    type: Date,
    required: true,
  },
  finishDate: {
    type: Date,
    required: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 50,
  },
  activity: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },
  difficulties: {
    type: Number,
    required: true,
  },
  priceIncluded: {
    type: String,
    required: true,
    trim: true,
    minlength: 50,
  },
  priceExcluded: {
    type: String,
    required: true,
    trim: true,
    minlength: 50,
  },
  tourImg: {
    data: Buffer,
    type: String,
  },
});

module.exports = mongoose.model("Tour", tourSchema);
