const transferModuleLD = require('module.transferLD');
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

    if (creep.memory.flagName) {
      const flag = Game.flags[creep.memory.flagName];
      const flagMemory = Memory.flags[flag.name];

      if (creep.memory.working === false) {
        if (creep.room.name == flagMemory.targetRoom) {
          withdrawModule.run(creep);
        }
        else {
          creep.travelTo(flag)
        }
      }
      else if (creep.memory.working === true) {
        if (creep.room.name == creep.memory.spawnRoom) {
          transferModuleLD.run(creep);
        }
        else {
          creep.travelTo(Game.flags[creep.memory.spawnRoom])
        }
      }
    }


    Memory.performanceTracker[creep.room.name + ".remoteProfit"] += creepCarryUsedCapacity - creep.store.getUsedCapacity();
  }
};
