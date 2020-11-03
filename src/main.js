// #region Require('/...')
const handlers = require('./handlers');

require('./handlers');
require('prototype.Room.structures');
require('traveler');
// #endregion

// #region Game loop
module.exports.loop = () => {
  // Say the time each ... ticks
  if (Game.time % 1000 === 0) {
    console.log(Game.time);
  }

  // Run all handlers
  handlers.global();
};
// #endregion
