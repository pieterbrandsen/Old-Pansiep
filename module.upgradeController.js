const builderModule = require('module.builder');
const runMainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(creep) {
    // Get the variables needed for module //
    const getMainSystem = runMainSystem.run();
    const flagMemory = Memory.flags[creep.room.name];

    function upgradeController() {
      // If there is a controller in current room check if creep can upgrade //
      if(creep.room.controller) {
        const runUpgrade = creep.upgradeController(creep.room.controller);

        switch(runUpgrade) {
          case OK:
            creep.say(creep.store.getUsedCapacity() / creep.store.getCapacity() * 100 +"%");
            if (creep.memory.upgraderWorkCount) {
              Memory.performanceTracker[creep.room.name + ".upgraderEnergy"] += creep.memory.upgraderWorkCount;
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
            creep.travelTo(creep.room.controller);
            break;
          case ERR_NO_BODYPART:
            break;
          default:
            break;
        }
      }
    }

    function runModule() {
      // If creep has no target, go build //
      if (!flagMemory.controllerStorage) {
        let containerInRange = creep.room.controller.pos.findInRange(creep.room.containers, 3,
          {filter: {structureType: STRUCTURE_CONTAINER}
        })[0];
        let linkInRange = creep.room.controller.pos.findInRange(creep.room.links, 3,
          {filter: {structureType: STRUCTURE_LINK}
        })[0];
        
        if (containerInRange)
        flagMemory.controllerStorage = containerInRange.id;
        else if (linkInRange)
        flagMemory.controllerStorage = linkInRange.id;
        else
        builderModule.run(creep);
      }
      else {
        // Upgrade controller //
        upgradeController();
      }
    }


    if (getMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runModule();

      // Set the average CPU Usage in the memory //

      flagMemory.trackers.cpuModule.upgraderModule += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      runModule();
    }
  }
};
