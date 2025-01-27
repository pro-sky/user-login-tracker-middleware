const UserActivity = require('../models/mongodb/UserActivity');

class MongoAdapter {
  async saveActivity(data) {
    const activity = new UserActivity(data);
    return await activity.save();
  }

  async getActivities(filters = {}) {
    return await UserActivity.find(filters);
  }
}

module.exports = MongoAdapter;