const builderModule = require('module.build');
const runMainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(creep) {
    // Get the variables needed for module //
    const getMainSystem = runMainSystem.run();
    const flagMemory = Memory.flags[creep.room.name];

    if (!creep.memory.workCount)
    creep.memory.workCount = creep.getActiveBodyparts(WORK);

    function upgradeController() {
      // If there is a controller in current room check if creep can upgrade //
      if(creep.room.controller) {
        const runUpgrade = creep.upgradeController(creep.room.controller);

        switch(runUpgrade) {
          case OK:
            creep.say(creep.store.getUsedCapacity() / creep.store.getCapacity() * 100 +"%");
            Memory.flags[creep.memory.spawnRoom].trackers.performance.upgraderEnergy += creep.memory.workCount;
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
      // Upgrade controller //
      upgradeController();
    }


    if (getMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runModule();

      // Set the average CPU Usage in the memory //

      Memory.flags[creep.memory.spawnRoom].trackers.cpuModule.upgradeModule += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      runModule();
    }
  }
};
