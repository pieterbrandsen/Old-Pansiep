const claimerModule = require('module.claimer');

module.exports = {
  run: function(creep) {
    const flag = Game.flags["claim"];
    const flagMemory = Memory.flags["claim"];
    if (!Memory.flags["claim"]) {
      Memory.flags["claim"] = {};
    }
    if (!creep.memory.flagTarget) {
      creep.memory.flagTarget = 1;
    }
    //const shardTarget = "shard3";
    const shardTarget = Game.shard.name;
    if (Game.time % 25 == 0)
    console.log(Game.shard.name + " - " + creep.room.name)

    if (!creep.memory.canHeal) {
      if (creep.getActiveBodyparts(HEAL) > 0) {
        creep.memory.canHeal = true;
      }
      else {
        creep.memory.canHeal = false;
      }
    }

    if (creep.memory.canHeal == true) {
      if (creep.hits < creep.hitsMax) {
        creep.heal(creep);
      }
    }
    if (Game.shard.name == shardTarget) {
      if (flag && flagMemory) {
        if (creep.room.name !== flagMemory.claimRoom) {
          //creep.travelTo(flag);
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
        else {
          claimerModule.run(creep);
        }
      }
    }
    else {
      creep.travelTo(Game.flags["shardUp"]);
    }
  }
};
