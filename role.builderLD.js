const withdrawModule = require('module.withdraw');
const builderModule = require('module.builder');
const getWorkingState = require('miniModule.getCreepState');

module.exports = {
  run: function(creep) {
    // Get Creep State, What The Creep Should Be Doing //
    const workState = getWorkingState.run(creep.room.name, creep.store.getCapacity(), creep.store.getUsedCapacity(), creep.memory.working, creep.memory.role);
    if (workState !== undefined)
    creep.memory.working = workState;

    // Get Flag Of TargetRoom //
    let targetRoom = Game.flags["builderLD" + creep.memory.spawnRoom];

    // Check If There Is Vision In Room //
    if (targetRoom.room) {
      // If Creep Is In Target Room //
      if (creep.room.name == targetRoom.room.name) {
        // If Creep Needs To Withdraw //
        if (creep.memory.working == "withdraw")
        withdrawModule.run(creep);
        // If Creep Needs To Transfer //
        else if (creep.memory.working == "transfer")
        builderModule.run(creep);
      }
      else
      creep.travelTo(targetRoom)
    }
    else
    creep.travelTo(targetRoom)
  }
};
