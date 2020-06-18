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

    function claimRoom() {
      const target = creep.room.controller;
      const runClaimController = creep.claimController(target);
      switch(runClaimController) {
        case OK:
          creep.say("Claimed");
          creep.room.createFlag("builderLD"+creep.memory.spawnRoom);
          creep.suicide();
          break;
        case ERR_NOT_OWNER:
          break;
        case ERR_BUSY:
          break;
        case ERR_INVALID_TARGET:
          break;
        case ERR_FULL:
          break;
        case ERR_NOT_IN_RANGE:
          creep.say("Moving");
          creep.moveTo(target);
          break;
        case ERR_NO_BODYPART:
          break;
        case ERR_GCL_NOT_ENOUGH:
          break;
        default:
          break;
      }
    }


    if (mainSystem()) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      claimRoom();

      // Set the average CPU Usage in the memory //

      Memory.cpuTracker["claimerCPU.total"] += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      claimRoom();
    }
  }
};
