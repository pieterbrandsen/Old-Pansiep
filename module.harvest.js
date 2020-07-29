const mainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(creep) {
    // Get The Variables Needed For Module //
    const runMainSystem = mainSystem.run();
    const flagMemory = Memory.flags[creep.room.name];
    const target = Game.getObjectById(creep.memory.sourceId);


    function findNewSourceInRoom() {
      // If Creep Is Missing A Source, Find One //
      creep.room.find(FIND_SOURCES).forEach((source, i) => {
        if (creep.memory.role.includes(`-${i}`))
        creep.memory.sourceId = flagMemory.sources[i].id;
      });
    }

    function harvestSource() {
      switch(creep.harvest(target)) {
        case OK:
        // Say Remaining Energy Percentage Left //
        creep.say(`${Math.round(creep.store.getUsedCapacity() / creep.store.getCapacity() * 100)}%`);
          break;
        case ERR_NOT_OWNER:
          break;
        case ERR_BUSY:
          break;
        case ERR_NOT_FOUND:
          break;
        case ERR_NOT_ENOUGH_RESOURCES:
          break;
        case ERR_INVALID_TARGET:
          break;
        case ERR_NOT_IN_RANGE:
          // Travel To Target Until In Range //
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
      // If Creep Is Missing Target, Find A Target //
      if (target == null)
      findNewSourceInRoom()
      else
      // Else Harvest Source //
      harvestSource();
    }


    if (runMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runModule();

      // Set the average CPU Usage in the memory //

      flagMemory.trackers.cpu.harvestingModule += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      runModule();
    }
  }
};
