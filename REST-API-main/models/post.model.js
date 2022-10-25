const mongoose = require('mongoose');

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    commentIds: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    }],
    isActive:
      {
        type: Boolean,
        default:
          true,
      },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    versionKey: false,
    timestamps:
      true,
  },
);
module.exports = mongoose.model('Post', PostSchema);
