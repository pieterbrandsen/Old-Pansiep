module.exports = {
  run: function(creep) {
    // Get The Variables Needed For Module //

    function reserveRoom() {
      const targetController = creep.room.controller;
      const runReserveRoom = creep.reserveController(target);

      switch(runReserveRoom) {
        case OK:
        // Say "Reserving"
          creep.say("Reserving")
          break;
        case ERR_NOT_OWNER:
          break;
        case ERR_BUSY:
          break;
        case ERR_INVALID_TARGET:
        // If Target Can't Be Claimed, Try Attacking It Until Its Claimable //
          creep.attackController(creep.room.controller);
          break;
        case ERR_NOT_IN_RANGE:
          // Travel To Target Until In Range //
          creep.travelTo(targetController);
          creep.say("Moving");
          break;
        case ERR_NO_BODYPART:
          creep.suicide();
          break;
        default:
          break;
      }
    }

    reserveRoom();
  }
};
