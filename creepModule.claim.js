module.exports = {
  run: function(creep) {
    function claimRoom() {
      const targetRoom = Game.flags["claim"].room;

      if (targetRoom) {
        const target = targetRoom.controller;
        const runClaimController = creep.claimController(target);

        switch(runClaimController) {
          case OK:
          creep.say("Claimed");
          creep.room.createFlag(25,25,`builderLD${creep.memory.spawnRoom}`);
          Game.flags["claim"].remove();
          break;
          case ERR_NOT_OWNER:
          break;
          case ERR_BUSY:
          break;
          case ERR_INVALID_TARGET:
          if (creep.room.controller.owner !== 'PandaMaster') {
            creep.attackController(creep.room.controller);
            creep.travelTo(target);
          }
          break;
          case ERR_FULL:
          break;
          case ERR_NOT_IN_RANGE:
          creep.say("Moving");
          creep.travelTo(target);
          break;
          case ERR_NO_BODYPART:
          break;
          case ERR_GCL_NOT_ENOUGH:
          Game.notify("GCL IS NOT HIGH ENOUGH FOR CLAIMING");
          break;
          default:
          break;
        }
      }
      else
      creep.travelTo(Game.flags["claim"]);
    }

    // Run Claimer Module //
    claimRoom();
  }
};
