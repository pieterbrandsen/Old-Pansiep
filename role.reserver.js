const reserverModule = require('module.reserver');

module.exports = {
  run: function(creep) {
    // Get Flag And Memory Of Target Room //
    const flag = Game.flags[creep.memory.flagName];
    const flagMemory = Memory.flags[flag.name];

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


    // If TargetFlag Is Defined //
    if (flag) {
      // If Creep Is Not In TargetRoom, Travel To Room //
      if (creep.room.name !== flagMemory.targetRoom)
      creep.travelTo(flag);
      // Reserve Room //
      else
      reserverModule.run(creep);
    }
  }
};
