// #region Require('/...')
const handlers = require('./handlers');

require('./handlers');
require('prototype.Room.structures');
require('traveler');
// #endregion

// #region Game loop
module.exports.loop = () => {
  // // * RESET ALL MEMORY
  // Object.keys(Memory).forEach((key) => {
  //   delete Memory[key];
  // });

  // Run all handlers
  handlers.global();
};
// #endregion
