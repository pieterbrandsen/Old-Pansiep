const claimerModule = require('module.claimer');

module.exports = {
  run: function(creep) {
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

    if (Game.flags["shardUp"]) {
      creep.travelTo(Game.flags["shardUp"]);
    }
  }
};
