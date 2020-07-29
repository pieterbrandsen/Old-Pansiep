const attackModule = require('module.attack');

module.exports = {
  run: function(creep) {
    // Check If Memory Is Defined That Says If A Creep Can Heal //
    function runHealCreep() {
      if (!creep.memory.canHeal) {
        // If Creep Has Active Heal Parts //
        if (creep.getActiveBodyparts(HEAL) > 0)
        creep.memory.canHeal = true;
        else
        creep.memory.canHeal = false;
      }

      // Check If CanHeal Is Defined //
      if (creep.memory.canHeal)
      // Check If CanHeal Is True //
      if (creep.memory.canHeal == true)
      // Check If Creep Is Not Full Health //
      if (creep.hits < creep.hitsMax)
      // Heal Creep //
      creep.heal(creep);
    }

    // RunHealCreep //
    runHealCreep();

    // If Creep Has Target Room //
    if (creep.memory.targetRoom) {
      // Get Flag Of TargetRoom //
      const targetFlag = Game.flags[creep.memory.targetRoom];

      // If Creep is In Target Room //
      if (creep.room.name == creep.memory.targetRoom)
      attackModule.run(creep);
      // Travel To Flag In The Target Room //
      else
      creep.travelTo(targetFlag)
    }
  }
};
