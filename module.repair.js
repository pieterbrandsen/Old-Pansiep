const runMainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(creep) {
    const getMainSystem = runMainSystem.run();
    const flagMemory = Memory.flags[creep.room.name];

    // Find the closest structure that is not max hits and is not a wall or rampart //
    const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART
    });

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

    function repairTarget() {
      const runRepair = creep.repair(target);
      switch(runRepair) {
        case OK:
          creep.say(`${Math.round(creep.store.getUsedCapacity() / creep.store.getCapacity()) * 100}%`);
          break;
        case ERR_NOT_OWNER:
          break;
        case ERR_BUSY:
          break;
        case ERR_NOT_ENOUGH_RESOURCES:
          break;
        case ERR_INVALID_TARGET:
          break;
        case ERR_NOT_IN_RANGE:
        // Travel To Target //
        creep.travelTo(target);
          creep.say("Moving");
          break;
        case ERR_NO_BODYPART:
          break;
        default:
          break;
      }
    }

    function runModule() {
      // If there is a structure that needs repair go repair it //
      if(target !== null)
      repairTarget();
    }

    if (getMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runModule();

      // Set the average CPU Usage in the memory //

      flagMemory.trackers.cpuModule.repairModule += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      runModule();
    }
  }
};
