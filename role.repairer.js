const withdrawModule = require('module.withdraw');
const repairModule = require('module.repair');
const getWorkingState = require('miniModule.getCreepState');

module.exports = {
  run: function(creep) {
    // Get Creep State, What The Creep Should Be Doing //
    const workState = getWorkingState.run(creep.room.name, creep.store.getCapacity(), creep.store.getUsedCapacity(), creep.memory.working, creep.memory.role);
    if (workState !== undefined)
    creep.memory.working = workState;

    // If Creep Needs To Withdraw //
    if (creep.memory.working == "withdraw")
    withdrawModule.run(creep);
    // If Creep Needs To Transfer //
    else if (creep.memory.working == "transfer")
    repairModule.run(creep);
  }
};
