module.exports = {
  run: function(creep) {
    // Get the variables needed for module //
    const flagMemory = Memory.flags[creep.room.name];
    // const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
    //   return (structure.structureType == STRUCTURE_RAMPART);
    // }});
    const target = Game.getObjectById(creep.memory.sourceId);


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
      if (creep.memory.role.includes("harvesterLD")) {
        const sources = creep.room.find(FIND_SOURCES);
        if (creep.name.includes("0-")) {
          creep.memory.sourceId = sources[0].id;
        }
        else if (creep.name.includes("1-")) {
          creep.memory.sourceId = sources[1].id;
        }
        else if (creep.name.includes("2-")) {
          creep.memory.sourceId = sources[2].id;
        }
        else if (creep.name.includes("3-")) {
          creep.memory.sourceId = sources[3].id;
        }
      }
      else {
        if (Game.time % 10 == 0) {
          // Get the energy sources in the room //
          const sources = creep.room.find(FIND_SOURCES_ACTIVE);

          // If there are sources found get the source that matches the name else get the nearest source //
          if (sources.length > 0) {
            creep.memory.sourceId = creep.pos.findClosestByRange(FIND_SOURCES).id;
          }
        }
      }
    }

    function harvestSource() {
      const runHarvest = creep.dismantle(target);

      switch(runHarvest) {
        case OK:
          creep.say(creep.store.getUsedCapacity() / creep.store.getCapacity() * 100 +"%");
          if (creep.memory.harvesterWorkCount && creep.memory.role.includes("harvester")) {
            Memory.performanceTracker[creep.room.name + ".energyHarvested"] += creep.memory.harvesterWorkCount * 2;
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
          findNewSourceInRoom();
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

      flagMemory.trackers.cpuModule.harvestModuleLD += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      runModule();
    }
  }
};
