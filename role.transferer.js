const transferModule = require('module.transfer');
const withdrawModule = require('module.withdraw');
const getWorkingState = require('miniModule.getCreepState');

module.exports = {
  run: function(creep) {
    if (Game.time % 10 == 0) {
      // Get Creep State, What The Creep Should Be Doing //
      const workState = getWorkingState.run(creep.room.name, creep.store.getCapacity(), creep.store.getUsedCapacity(), creep.memory.working, creep.memory.role);
      if (workState !== undefined)
      creep.memory.working = workState;
    }

    // If Creep Needs To Withdraw //
    if (creep.memory.working == "withdraw")
    withdrawModule.run(creep);
    // If Creep Needs To Transfer //
    else if (creep.memory.working == "transfer")
    transferModule.run(creep);

    // if (creepCarryCapacity - creep.store.getUsedCapacity() <= 300) {
    //   Memory.performanceTracker[creep.room.name + ".spawnEnergyTransfer"] += creepCarryUsedCapacity - creep.store.getUsedCapacity();
    // }
  }
};
