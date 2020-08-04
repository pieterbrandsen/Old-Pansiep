const runMainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(creep) {
    // Get the variables needed for module //
    const getMainSystem = runMainSystem.run();
    const flagMemory = Memory.flags[creep.room.name];
    const target = Game.getObjectById(creep.memory.sourceId);


    function findNewSourceInRoom() {
      // Get the energy sources in the room //
      const sources = creep.room.find(FIND_SOURCES);

      // If there are sources found get the source that matches the name else get the nearest source //
      if (creep.memory.role.includes("harvester")) {
        flagMemory.sources.forEach((source, i) => {
          if (creep.memory.role.includes(`-${i}`))
          creep.memory.sourceId = flagMemory.sources[i].id;
        });
      }
      else {
        if (creep.memory.role == "extractor") {
          if (flagMemory.mineralId)
          creep.memory.sourceId = flagMemory.mineralId;
        }
        else
        creep.memory.sourceId = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE).id;
      }
    }

    function harvestSource() {
      const runHarvest = creep.harvest(target);

      switch(runHarvest) {
        case OK:
        creep.say(`${Math.round(creep.store.getUsedCapacity() / creep.store.getCapacity()) * 100}%`);
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
        // Travel To Target //
          creep.travelTo(target);
          creep.say("Moving");
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


    if (getMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runModule();

      // Set the average CPU Usage in the memory //

      flagMemory.trackers.cpuModule.harvestModule += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      runModule();
    }
  }
};
