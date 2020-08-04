const claimerModule = require('module.claimer');

module.exports = {
  run: function(creep) {
    // Get Flag And Memory //
    const flag = Game.flags["claim"];
    const flagMemory = Memory.flags["claim"];

    // If Memory Of Flag Is Not Defined, Define Memory //
    if (!Memory.flags["claim"]) {
      Memory.flags["claim"] = {};
      Memory.flags["claim"].spawnRoom = "";
    }

    if (Game.time % 25 == 0)
    console.log(`Claimer: ${creep.name} is in ${Game.shard.name}.${creep.room.name}.`)

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


    if (flag && flagMemory) {
      if (!flag.room)
      creep.travelTo(flag);
      else
      claimerModule.run(creep);
    }
  }
};
