const mongoose = require('mongoose');

const { Schema } = mongoose;
const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  body: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 150,
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

module.exports = mongoose.model('Comment', commentSchema);
