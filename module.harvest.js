module.exports = {
  run: function(creep) {
    // Get the variables needed for module //
    const flagMemory = Memory.flags[creep.room.name];
    const target = Game.getObjectById(creep.memory.sourceId);

    if (!creep.memory.harvesterWorkCount) {
      creep.memory.harvesterWorkCount = creep.getActiveBodyparts(WORK);
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

    function findNewSourceInRoom() {
      // Get the energy sources in the room //
      const sources = creep.room.find(FIND_SOURCES);

      // If there are sources found get the source that matches the name else get the nearest source //
      if (sources.length > 0) {
        roleName = creep.memory.role;
        if (roleName.includes("-0"))
        creep.memory.sourceId = flagMemory.sources[0].id;
        else if (roleName.includes("-1"))
        creep.memory.sourceId = flagMemory.sources[1].id;
        else {
          if (creep.memory.role.includes("extractor")) {
            if (flagMemory.mineralId)
            creep.memory.sourceId = flagMemory.mineralId;
          }
          else {
            creep.memory.sourceId = creep.pos.findClosestByRange(FIND_SOURCES).id;
          }
        }
      }
    }

    function harvestSource() {
      const runHarvest = creep.harvest(target);

      switch(runHarvest) {
        case OK:
          creep.say(creep.store.getUsedCapacity() / creep.store.getCapacity() * 100 +"%")
          if (creep.memory.harvesterWorkCount && creep.memory.role.includes("harvester")) {
            Memory.performanceTracker[creep.room.name + ".energyHarvested"] += creep.memory.harvesterWorkCount * 2;
          }
          else if (creep.memory.harvesterWorkCount && creep.memory.role.includes("extractor")) {
            Memory.performanceTracker[creep.room.name + ".mineralHarvested"] += creep.memory.harvesterWorkCount;
          }
          break;
        case ERR_NOT_OWNER:
          break;
        case ERR_BUSY:
          break;
        case ERR_NOT_FOUND:
          creep.room.createConstructionSite(target.pos,STRUCTURE_EXTRACTOR);
          break;
        case ERR_NOT_ENOUGH_RESOURCES:
          if (target.mineralAmount) {
            if (target.mineralAmount == 0) {
              console.log(`The mineral is empty in room ${creep.room.name}.`);
              flagMemory.mineralAmount = 0;
              creep.suicide();
            }
          }
          break;
        case ERR_INVALID_TARGET:
          break;
        case ERR_NOT_IN_RANGE:
          creep.say("Moving");
          creep.travelTo(target);
          break;
        case ERR_TIRED:
          break;
        case ERR_NO_BODYPART:
          break;
        default:
          break;
      }
    }

    function runModule() {
      // Find source if creep has no source in the memory defined //
      if (target == null) {
        findNewSourceInRoom()
      }
      else {
        // Else go harvest the defined source //
        harvestSource();
      }
    }


    if (mainSystem()) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runModule();

      // Set the average CPU Usage in the memory //

      Memory.cpuTracker["harvesterCPU.total"] += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      runModule();
    }
  }
};
