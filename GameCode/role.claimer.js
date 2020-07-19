const claimerModule = require('module.claimer');

module.exports = {
  run: function(creep) {
    const flag = Game.flags["claim"];
    const flagMemory = Memory.flags["claim"];
    if (!Memory.flags["claim"]) {
      Memory.flags["claim"] = {};
    }
    const shardTarget = "shard3"
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
        //if (creep.room.name !== flagMemory.claimRoom) {
        if (creep.room.name !== "E47N5") {
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
