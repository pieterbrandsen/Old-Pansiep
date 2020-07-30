const harvestModule = require('module.harvestLD');
const transferModule = require('module.transfer');
const getWorkingState = require('miniModule.getCreepState');


module.exports = {
  run: function(creep) {
    // Get Creep State, What The Creep Should Be Doing //
    const workState = getWorkingState.run(creep.room.name, creep.store.getCapacity(), creep.store.getUsedCapacity(), creep.memory.working, creep.memory.role);
    if (workState !== undefined)
    creep.memory.working = workState;

    // If Creep Has A TargetFlag Name //
    if (creep.memory.flagName) {
      // Get Flag And Memory //
      const flag = Game.flags[creep.memory.flagName];
      const flagMemory = Memory.flags[creep.memory.flagName];

      // If Creep Is In The Target Room //
      if (creep.room.name == flagMemory.targetRoom) {
        // If Creep Needs To Harvest //
        if (creep.memory.working == "withdraw")
        harvestModule.run(creep);
        // If Creep Needs To Transfer //
        else if (creep.memory.working == "transfer")
        transferModule.run(creep);
      }
      // Else Travel To Room //
      else
      creep.travelTo(flag);
    }
  }
}
