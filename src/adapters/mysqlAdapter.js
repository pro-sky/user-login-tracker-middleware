const mysql = require('mysql2/promise');

class MySQLAdapter {
  constructor(connection) {
    this.connection = connection;
  }

  async initialize() {
    await this.connection.execute(`
      CREATE TABLE IF NOT EXISTS user_activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId VARCHAR(255),
        email VARCHAR(255),
        ipAddress VARCHAR(45),
        userAgent TEXT,
        browser VARCHAR(100),
        os VARCHAR(100),
        device VARCHAR(100),
        country VARCHAR(100),
        city VARCHAR(100),
        timezone VARCHAR(100),
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        action VARCHAR(100),
        path VARCHAR(255),
        meta JSON
      )
    `);
  }

  async saveActivity(data) {
    const [result] = await this.connection.execute(
      'INSERT INTO user_activities SET ?',
      data
    );
    return result;
  }

  async getActivities(filters = {}) {
    const conditions = Object.entries(filters)
      .map(([key, value]) => `${key} = ?`)
      .join(' AND ');
    const query = conditions 
      ? `SELECT * FROM user_activities WHERE ${conditions}`
      : 'SELECT * FROM user_activities';
    const [rows] = await this.connection.execute(query, Object.values(filters));
    return rows;
  }
}

module.exports = MySQLAdapter;