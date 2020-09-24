const runMainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(creep) {
    function reserveRoom() {
      const targetRoom = Game.rooms[creep.memory.targetRoom];
      if (targetRoom) {
        const target = Game.rooms[creep.memory.targetRoom].controller;
        if (target) {
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
            creep.travelTo(target);
              creep.say("Moving");
              break;
            case ERR_NO_BODYPART:
              creep.suicide();
              break;
            default:
              break;
          }
        }
      }
    }

    // Run Module //
    reserveRoom();
  }
};
