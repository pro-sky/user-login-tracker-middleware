const createUserActivityModel = require('../models/mongodb/UserActivity');

class MongoAdapter {
  constructor(mongoose) {
    this.mongoose = mongoose;
    this.UserActivity = createUserActivityModel(mongoose);
  }

  async saveActivity(data) {
    try {
      // Check connection state
      if (this.mongoose.connection.readyState !== 1) {
        throw new Error('MongoDB not connected');
      }

      console.log(data)
      const activity = new this.UserActivity(data);
    //   console.log('Activity saved:', activity);
      await activity.save();
      return activity;
    } catch (error) {
      console.error('Save activity error:', error);
      throw error;
    }
  }

  async getActivities(filters = {}) {
    try {
      return await UserActivity.find(filters);
    } catch (error) {
      console.error('Get activities error:', error);
      throw error;
    }
  }
}

module.exports = MongoAdapter;