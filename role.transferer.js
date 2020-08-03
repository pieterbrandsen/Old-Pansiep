const transferModule = require('module.transfer');
const withdrawModule = require('module.withdraw');

module.exports = {
  run: function(creep) {
    const creepCarryCapacity = creep.store.getCapacity();
    const creepCarryUsedCapacity = creep.store.getUsedCapacity();
    if (creep.memory.working === true && creepCarryUsedCapacity === 0) {
      creep.memory.working = false;
    }
    else if (creep.memory.working === false && creepCarryUsedCapacity == creepCarryCapacity) {
      creep.memory.working = true;
    }

    if (creep.memory.working === false) {
      withdrawModule.run(creep);
    }
    else if (creep.memory.working === true) {
      transferModule.run(creep);
    }

    if (creepCarryCapacity - creep.store.getUsedCapacity() <= 300) {
      Memory.performanceTracker[creep.room.name + ".spawnEnergyTransfer"] += creepCarryUsedCapacity - creep.store.getUsedCapacity();
    }
  }
};
