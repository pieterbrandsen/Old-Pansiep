//#region Require('/...')
const handlers = require('./handlers');

require('./handlers');
require('prototype.Room.structures');
require('traveler');
//#endregion

//#region Game loop
module.exports.loop = () => {
  handlers.global();
};
//#endregion
