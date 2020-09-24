module.exports = {
  run: function(creep) {
    const targetRoom = Game.rooms[creep.memory.targetRoom];

    if (!creep.memory.targetId)
    creep.memory.targetId = "";

    if (creep.room.name == creep.memory.targetRoom) {
      const firstEnemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (creep) => {
        return ((creep.getActiveBodyparts(ATTACK) > 0) || (creep.getActiveBodyparts(RANGED_ATTACK) > 0))
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
      if (firstEnemy)
      attackCreep(firstEnemy.id);
      else {
        const secondEnemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (creep) => {
          return (creep.getActiveBodyparts(HEAL) > 0)
        }});
        if (secondEnemy)
        attackCreep(secondEnemy.id);
        else {
          const thirdEnemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
          if (thirdEnemy)
          attackCreep(thirdEnemy.id);
          else {
            const hostileInvader = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {filter: {structureType: STRUCTURE_INVADER_CORE}});
            if (hostileInvader !== null)
            attackCreep(hostileInvader.id);
            else {
              if (!creep.pos.inRangeTo(creep.room.controller,5))
              creep.moveTo(creep.room.controller);
            }
            // else {
            //   const target = Game.getObjectById(creep.memory.targetId);
            //   if (target !== null) {
            //     if(creep.attack(target) == ERR_NOT_IN_RANGE)
            //     creep.travelTo(target);
            //   }
            //   else {
            //     const rampart = creep.pos.findClosestByRange(creep.room.ramparts);
            //     const wall = creep.pos.findClosestByRange(creep.room.walls);
            //
            //     if (rampart !== null)
            //     creep.memory.targetId = rampart.id;
            //     else if (wall !== null)
            //     creep.memory.targetId = wall.id;
            //     else if (!creep.pos.inRangeTo(Game.flags[creep.memory.targetRoom],2))
            //     creep.moveTo(Game.flags[creep.memory.targetRoom])
            //   }
            // }
          }
        }
      }
    }
    else
    creep.travelTo(Game.flags[creep.memory.targetRoom]);
  }
};
