const runMainSystem = require('function.mainSystem');

module.exports = {
  run: function(creep) {
    // Get the variables needed for module //
    const getMainSystem = runMainSystem.run();
    const flagMemory = Memory.flags[creep.memory.targetRoom];
    const target = Game.getObjectById(creep.memory.sourceId);

    if (!creep.memory.workCount)
    creep.memory.workCount = creep.getActiveBodyparts(WORK);


    function findNewSourceInRoom() {
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
        else {
          const activeSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
          if (activeSource !== null)
          creep.memory.sourceId = activeSource.id;
        }
      }
    }

    function harvestSource() {
      const runHarvest = creep.harvest(target);

      switch(runHarvest) {
        case OK:
        creep.say(`${target.energy} left`);
        if (creep.memory.role.includes("harvester-"))
        flagMemory.trackers.performance.harvesterEnergy += (creep.memory.workCount * 2);
        else if (creep.memory.role.includes("harvesterLD-"))
        Memory.flags[creep.memory.spawnRoom].trackers.performance.harvesterLDEnergy += (creep.memory.workCount * 2);
        break;
        case ERR_NOT_OWNER:
        break;
        case ERR_BUSY:
        break;
        case ERR_NOT_FOUND:
        creep.room.createConstructionSite(target.pos,STRUCTURE_EXTRACTOR);
        break;
        case ERR_NOT_ENOUGH_RESOURCES:
        if (creep.memory.role == "extractor") {
          console.log(`The mineral is empty in room ${creep.room.name}.`);
          flagMemory.mineralAmount = 0;
          creep.suicide();
        }
        else if (!creep.pos.inRangeTo(target,1))
        creep.moveTo(target);
        else
        creep.say("0 left");
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
      const targetRoom = Game.rooms[creep.memory.targetRoom];
      if (targetRoom) {
        // Find source if creep has no source in the memory defined //
        if (target == null)
        findNewSourceInRoom()
        else
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

      Memory.flags[creep.memory.spawnRoom].trackers.cpuModule.harvestModule += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      runModule();
    }
  }
};
