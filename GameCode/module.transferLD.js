const builderModule = require('module.builder');

module.exports = {
  run: function(creep) {
    const flagMemory = Memory.flags[creep.room.name];


    function mainSystem() {
      // If Memory.mainSystem is defined //
      if (Memory.mainSystem) {
        // If Memory.mainSystem is allowed to track cpu return True //
        if (Memory.mainSystem.cpuTracker == true) {
          return true;
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    }

    function transferTarget() {
      const energy = creep.store.getUsedCapacity(RESOURCE_ENERGY);
      const target = creep.transfer(Game.getObjectById(creep.memory.targetId),RESOURCE_ENERGY);
      switch(target) {
        case OK:
        creep.say("Transfer");
        creep.memory.targetId = "";
        case ERR_NOT_OWNER:
        break;
        case ERR_BUSY:
        break;
        case ERR_NOT_ENOUGH_RESOURCES:
        break;
        case ERR_INVALID_TARGET:
        findNewTarget();
        break;
        case ERR_FULL:
        findNewTarget();
        break;
        case ERR_NOT_IN_RANGE:
        creep.travelTo(Game.getObjectById(creep.memory.targetId));
        break;
        case ERR_INVALID_ARGS:
        break;
        default:
        break;
      }
    }


    function findNewTarget() {
      if (creep.room.storage)
      creep.memory.targetId = creep.room.storage.id;
    }

    if (mainSystem()) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      transferTarget();

      // Set the average CPU Usage in the memory //

      Memory.cpuTracker["transferCPU.total"] += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      transferTarget();
    }
  }
};
