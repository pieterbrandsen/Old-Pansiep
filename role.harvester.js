const harvestModule = require('module.harvest');
const transferModule = require('module.transfer');
const getWorkingState = require('miniModule.getCreepState');

const creepBooster = require('module.creepBooster');


module.exports = {
  run: function(creep) {
    const flagMemory = Memory.flags[creep.memory.spawnRoom];

    // Get Creep State, What The Creep Should Be Doing //
    const workState = getWorkingState.run(creep.room.name, creep.store.getCapacity(), creep.store.getUsedCapacity(), creep.memory.working, creep.memory.role);
    if (workState !== undefined)
    creep.memory.working = workState;

    if (creep.memory.canBoost !== undefined && creep.memory.canBoost == false) {
      // If Creep Needs To Harvest //
      if (creep.memory.working == "withdraw")
      harvestModule.run(creep);
      // If Creep Needs To Transfer //
      else if (creep.memory.working == "transfer")
      transferModule.run(creep);
    }
    else {
      if (!creep.memory.canBoost)
      creepBooster.check(creep,["work", "carry", "move"],[1,1,1]);
      else
      creepBooster.boost(creep)
    }
  }
}
