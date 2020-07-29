module.exports = {
  run: function(creep) {
    const firstEnemyId = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (creep) => {
      return ((creep.getActiveBodyparts(ATTACK) > 0) || (creep.getActiveBodyparts(RANGED_ATTACK) > 0)).id
    }});

    function attackCreep(targetId) {
      // Get Target By Id //
      const targetCreep = Game.getObjectById(targetId);

      // Check if Creep Is Melee //
      if (creep.getActiveBodyparts(ATTACK) > 0) {
        // If Creep Is Not In Range Of TargetCreep, Travel To It //
        if (!creep.pos.inRangeTo(targetCreep,1))
        creep.travelTo(targetCreep);
        // Else If In Range, Attack TargetCreep //
        else
        creep.attack(targetCreep);

        // If Creep Is Not In Range Of TargetCreep, Travel To It //
        if (!creep.pos.inRangeTo(targetCreep,3))
        creep.travelTo(targetCreep);
        // Else If In Range, Attack TargetCreep //
        else
        creep.rangedAttack(targetCreep);
      }

      // Check if Creep Is Ranged //
      if (creep.getActiveBodyparts(RANGED_ATTACK) > 0) {
        // If Creep Is Not In Range Of TargetCreep, Travel To It //
        if (!creep.pos.inRangeTo(targetCreep,3))
        creep.travelTo(targetCreep);
        // Else If In Range, Attack TargetCreep //
        else
        creep.rangedAttack(targetCreep);
      }
    }

    // Search For Enemy With Attack Or Ranged Attack Parts //
    if (firstEnemyId !== undefined)
    attackCreep(firstEnemyId);
    else {
      const secondEnemyId = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (creep) => {
        return (creep.getActiveBodyparts(HEAL) > 0).id
      }});

      if (secondEnemyId !== undefined)
      attackCreep(secondEnemyId)
      else {
        const thirdEnemyId = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS).id;
        if (thirdEnemyId)
        attackCreep(thirdEnemyId)
        else {
          // Structure Finding Part //
        }
      }
    }
  }
};
