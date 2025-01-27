const geoip = require('geoip-lite');
const UAParser = require('ua-parser-js');

class Parser {
  static parseUserAgent(userAgent) {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    
    return {
      browser: result.browser.name,
      os: result.os.name,
      device: result.device.type || 'desktop'
    };
  }

  static parseLocation(ip) {
    const geo = geoip.lookup(ip);
    return geo ? {
      country: geo.country,
      city: geo.city,
      timezone: geo.timezone
    } : null;
  }
}

module.exports = Parser;