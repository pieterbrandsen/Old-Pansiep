const transferModule = require('module.transfer');
const withdrawModule = require('module.withdraw');
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

      // If Creep Needs To Withdraw //
      if (creep.memory.working == "withdraw") {
        // If Creep Is In The Target Room //
        if (creep.room.name == flagMemory.targetRoom)
        withdrawModule.run(creep);
        // Else Travel To Room //
        else
        creep.travelTo(flag)
      }

      // If Creep Needs To Transfer //
      else if (creep.memory.working == "transfer") {
        // If Creep Is In The Target Room //
        if (creep.room.name == creep.memory.spawnRoom)
        transferModule.run(creep);
        // Else Travel To Room //
        else
        creep.travelTo(Game.flags[creep.memory.spawnRoom])
      }
    }
  }
};
