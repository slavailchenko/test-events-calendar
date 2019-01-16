const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({

  email: { 
    type: String, 
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    required: true
  },
  events: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Event', 
    default: [] 
  }]
  },
  {
    timestamps: true,
    versionKey: false
  });

module.exports = mongoose.model('User', UserSchema);