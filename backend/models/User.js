const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  balance: {
    type: Number,
    default: 0.00
  },
  notifications: [
    {
      message: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);