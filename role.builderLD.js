const withdrawModule = require('module.withdraw');
const builderModule = require('module.builder');

module.exports = {
  run: function(creep) {
    let creepCarryCapacity = creep.store.getCapacity();
    let creepCarryUsedCapacity = creep.store.getUsedCapacity();
    if (creep.memory.working === true && creepCarryUsedCapacity === 0) {
      creep.memory.working = false;
    }
    else if (creep.memory.working === false && creepCarryUsedCapacity == creepCarryCapacity) {
      creep.memory.working = true;
    }

    if (!creep.memory.flagTarget) {
      creep.memory.flagTarget = 1;
    }

    let flag = Game.flags["builderLD" + creep.memory.spawnRoom];
    if (flag) {
      if (flag.room) {
        if (creep.room.name == flag.room.name) {
          if (creep.memory.working === false) {
            withdrawModule.run(creep);
          }
          else if (creep.memory.working === true) {
            builderModule.run(creep);
          }
        }
        else {
          creep.travelTo(flag)
        }
      }
      else {
        // creep.travelTo(flag)
        if (!Game.flags[creep.memory.flagTarget].room)
        creep.travelTo(Game.flags[creep.memory.flagTarget])
        else {
          if (creep.pos.getRangeTo(Game.flags[creep.memory.flagTarget]) == 1) {
            creep.travelTo(Game.flags[creep.memory.flagTarget])
            creep.memory.flagTarget++;
          }
          else {
            creep.travelTo(Game.flags[creep.memory.flagTarget])
          }
        }
      }
    }
    else {
      creep.suicide();
    }
  }
};
