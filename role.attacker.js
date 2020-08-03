const attackModule = require('module.attack');

module.exports = {
  run: function(creep) {
    const creepCarryCapacity = creep.store.getCapacity();
    const creepCarryUsedCapacity = creep.store.getUsedCapacity();

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

    if (creep.memory.targetRoom) {
      const flag = Game.flags[creep.memory.targetRoom];

      if (creep.room.name == creep.memory.targetRoom) {
        attackModule.run(creep);
      }
      else {
        creep.travelTo(flag)
      }
    }
  }
};
