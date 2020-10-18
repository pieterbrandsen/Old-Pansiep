const handlers = require('./handlers');

require('./handlers');
require('prototype.tower');
require('traveler');

module.exports.loop = () => {
  handlers.global();
};
