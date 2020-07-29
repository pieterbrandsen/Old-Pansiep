const claimerModule = require('module.claimer');

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

    if (Game.flags["shardUp"])
    creep.travelTo(Game.flags["shardUp"]);
  }
};
