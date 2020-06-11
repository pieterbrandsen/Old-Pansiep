const builderModule = require('module.builder');

module.exports = {
  run: function(creep) {
    const target = creep.memory.targetId;

    if (!target) {
      builderModule.run(creep);
    }
    else {
      if(creep.room.controller) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.controller);
        }
      }
    }
  }
};
