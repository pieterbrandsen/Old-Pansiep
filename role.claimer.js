const claimerModule = require('module.claimer');

module.exports = {
  run: function(creep) {
    const flag = Game.flags["claim"];
    const flagMemory = Memory.flags["claim"];
    const shardTarget = "shard3"

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
      if (flag) {
        if (creep.room.name !== flagMemory.claimRoom) {
          creep.travelTo(flag);
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
