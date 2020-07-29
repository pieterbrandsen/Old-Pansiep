const withdrawModule = require('module.withdraw');
const builderModule = require('module.builder');
const getWorkingState = require('miniModule.getCreepState');

module.exports = {
  run: function(creep) {
    if (Game.time % 10 == 0) {
      // Get Creep State, What The Creep Should Be Doing //
      const workState = getWorkingState.run(creep.room.name, creep.store.getCapacity(), creep.store.getUsedCapacity(), creep.memory.working, creep.memory.role);
      if (workState !== undefined)
      creep.memory.working = workState;
    }

    // If Creep Needs To Harvest //
    if (creep.memory.working == "withdraw")
    withdrawModule.run(creep);
    // If Creep Needs To Transfer //
    else if (creep.memory.working == "transfer")
    builderModule.run(creep);
  }
};
