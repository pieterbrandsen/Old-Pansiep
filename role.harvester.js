const harvestModule = require('module.harvest');
const transferModule = require('module.transfer');


module.exports = {
  run: function(creep) {

    // Set Working State
    let creepCarryCapacity = creep.store.getCapacity();
    let creepCarryUsedCapacity = creep.store.getUsedCapacity();
    if (creep.memory.working === true && creepCarryUsedCapacity === 0) {
      creep.memory.working = false;
    }
    else if (creep.memory.working === false && creepCarryUsedCapacity == creepCarryCapacity) {
      creep.memory.working = true;
    }

    if (creep.memory.working === false) {
      harvestModule.run(creep);
    }

    if (creep.memory.working === true) {
      transferModule.run(creep);
    }
  }
}
