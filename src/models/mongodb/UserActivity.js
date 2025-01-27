const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
  userId: String,
  email: String,
  ipAddress: String,
  userAgent: String,
  browser: String,
  os: String,
  device: String,
  location: {
    country: String,
    city: String,
    timezone: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  action: String,
  path: String,
  meta: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('UserActivity', userActivitySchema);