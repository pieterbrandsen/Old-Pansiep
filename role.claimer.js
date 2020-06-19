const claimerModule = require('module.claimer');

module.exports = {
  run: function(creep) {
    const flag = Game.flags["claim"];
    const flagMemory = Memory.flags["claim"];
    if (flag) {
      if (flagMemory.claimRoom) {
        if (creep.room.name !== flagMemory.claimRoom) {
          creep.travelTo(flag);
        }
        else {
          claimerModule.run(creep);
        }
      }
    }
  }
};
