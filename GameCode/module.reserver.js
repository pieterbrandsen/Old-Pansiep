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

    function reserveRoom() {
      const target = creep.room.controller;
      const runReserveRoom = creep.reserveController(target);

      switch(runReserveRoom) {
        case OK:
          creep.say("Reserving")
          break;
        case ERR_NOT_OWNER:
          break;
        case ERR_BUSY:
          break;
        case ERR_INVALID_TARGET:
          creep.attackController(creep.room.controller);
          break;
        case ERR_NOT_IN_RANGE:
          creep.say("Moving");
          creep.travelTo(target);
          break;
        case ERR_NO_BODYPART:
          creep.suicide();
          break;
        default:
          break;
      }
    }


    if (mainSystem()) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      reserveRoom();

      // Set the average CPU Usage in the memory //

      Memory.cpuTracker["reserverCPU.total"] += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      reserveRoom();
    }
  }
};
