const builderModule = require('module.builder');

module.exports = {
  run: function(creep) {
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

    function upgradeController() {
      // If there is a controller in current room check if creep can upgrade //
      if(creep.room.controller) {
        const runUpgrade = creep.upgradeController(creep.room.controller);

        switch(runUpgrade) {
          case OK:
            creep.say(creep.store.getUsedCapacity() / creep.store.getCapacity() * 100 +"%")
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
            creep.moveTo(creep.room.controller);
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
      if (!creep.memory.targetId) {
        builderModule.run(creep);
      }
      else {
        // Upgrade controller //
        upgradeController();
      }
    }


    if (mainSystem()) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runModule();

      // Set the average CPU Usage in the memory //

      Memory.cpuTracker["upgraderCPU.total"] += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      runModule();
    }
  }
};
