module.exports = {
  run: function(creep) {
    let start = Game.cpu.getUsed();

    let flag = Memory.flags[creep.room.name];
    let flag2 = Memory.flags[creep.memory.room];

    if (!flag) {
      creep.room.createFlag(25,25, creep.room.name)
      Memory.flags[creep.room.name] = {}
    }

    let enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    if (creep.room.name == creep.memory.targetRoom) {
      if (creep.pos.inRangeTo(creep.room.controller,1) == false) {
        creep.travelTo(creep.room.controller)
      }
      else {
        if (creep.room.controller.reservation == undefined) {
          creep.reserveController(creep.room.controller)
        }
        else {
          if (creep.room.controller.reservation.ticksToEnd < 4900) {
            creep.reserveController(creep.room.controller)
          }
        }
      }
    }
    else if (creep.room.name !== creep.memory.targetRoom) {
      let targetRoom = creep.memory.targetRoom;
      if (Game.flags[targetRoom] !== undefined) {
          creep.travelTo((Game.flags[targetRoom]))
      }
      if (Game.flags[targetRoom] === undefined) {
          Game.notify("There is no flag in " + creep.memory.target + "!")
      }
    }

    flag2.rReserverCpu += Game.cpu.getUsed() - start
  }
};
