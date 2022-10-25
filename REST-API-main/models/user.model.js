const mongoose = require('mongoose');

const { Schema } = mongoose;

const UsersSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('User', UsersSchema);
