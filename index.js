const Parser = require('./src/utils/parser');
const MongoAdapter = require('./src/adapters/mongoAdapter');
const MySQLAdapter = require('./src/adapters/mysqlAdapter');

class UserTracker {
  constructor(options = {}) {
    this.adapter = this._initializeAdapter(options);
    this.parser = Parser;
  }

  _initializeAdapter(options) {
    if (options.mongodb) {
      return new MongoAdapter(options.mongoose);
    } else if (options.mysql) {
      return new MySQLAdapter(options.mysql);
    }
    throw new Error('No database adapter specified');
  }

  middleware() {
    return async (req, res, next) => {
      try {
        const ip = req.ip || req.connection.remoteAddress;
        const userAgent = req.headers['user-agent'];
        
        const deviceInfo = this.parser.parseUserAgent(userAgent);
        const locationInfo = this.parser.parseLocation(ip);
        console.log('REQUEST USER:::::', req)
        const activityData = {
          userId: req.user?.id,
          email: req.user?.email,
          ipAddress: ip,
          userAgent,
          ...deviceInfo,
          ...locationInfo,
          path: req.path,
          action: req.method,
          meta: {
            query: req.query,
            body: req.body,
            headers: req.headers
          }
        };
        console.log("adapter", this.adapter)
        await this.adapter.saveActivity(activityData);
        next();
      } catch (error) {
        console.error('User tracking error:', error);
        next(); // Continue even if tracking fails
      }
    };
  }

  async getActivities(filters = {}) {
    return await this.adapter.getActivities(filters);
  }
}

module.exports = UserTracker;