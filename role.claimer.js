const claimerModule = require('module.claimer');

module.exports = {
  run: function(creep) {
    const flag = Game.flags["claim"];
    if (flag) {
      if (creep.room.name !== flag) {
        creep.travelTo(flag);
      }
      else {
        claimerModule.run(creep);
      }
    }
  }
};
