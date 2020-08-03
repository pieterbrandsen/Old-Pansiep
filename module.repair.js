module.exports = {
  run: function(creep) {
    // Find the closest structure that is not max hits and is not a wall or rampart //
    const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART
    });

    if (!creep.memory.repairerWorkCount) {
      creep.memory.repairerWorkCount = creep.getActiveBodyparts(WORK);
    }

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
          creep.say(creep.store.getUsedCapacity() / creep.store.getCapacity() * 100 +"%");
          if (creep.memory.repairerWorkCount) {
            Memory.performanceTracker[creep.room.name + ".repairerEnergy"] += creep.memory.repairerWorkCount;
          }
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
          creep.say("Moving");
          creep.moveTo(target);
          break;
        case ERR_NO_BODYPART:
          break;
        default:
          break;
      }
    }

    function runModule() {
      // If there is a structure that needs repair go repair it //
      if(target !== null) {
        repairTarget();
      }
      else {
        // If there is no structure that needs repairing move to the controller in the room to wait //
        if (!creep.pos.inRangeTo(creep.room.controller,5)) {
          creep.travelTo(creep.room.controller)
        }
      }
    }

    if (mainSystem()) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runModule();

      // Set the average CPU Usage in the memory //

      Memory.cpuTracker["repairerCPU.total"] += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      runModule();
    }
  }
};
