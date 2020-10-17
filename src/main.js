const handlers = require('./handlers');

require('./handlers');

module.exports.loop = function() {
  handlers.global();
};
