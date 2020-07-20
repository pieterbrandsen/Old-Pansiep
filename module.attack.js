module.exports = {
  run: function(creep) {
    const target = Game.getObjectById("5f13520527dbee983d02ea9b");
    if (creep.dismantle(target) == ERR_NOT_IN_RANGE) {
      creep.travelTo(target);
    }
    // const firstEnemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (creep) => {
    //   return ((creep.getActiveBodyparts(ATTACK) > 0) || (creep.getActiveBodyparts(RANGED_ATTACK) > 0)) }
    // });
    //
    // if (firstEnemy) {
    //   if (creep.getActiveBodyparts(ATTACK) > 0) {
    //     if (!creep.pos.inRangeTo(firstEnemy,1)) {
    //       creep.travelTo(firstEnemy);
    //     }
    //     else {
    //       creep.attack(firstEnemy);
    //     }
    //
    //     if (!creep.pos.inRangeTo(firstEnemy,3)) {
    //       creep.travelTo(firstEnemy);
    //     }
    //     else {
    //       creep.rangedAttack(firstEnemy);
    //     }
    //   }
    //   else if (creep.getActiveBodyparts(RANGED_ATTACK) > 0) {
    //     if (!creep.pos.inRangeTo(firstEnemy,3)) {
    //       creep.travelTo(firstEnemy);
    //     }
    //     else {
    //       creep.rangedAttack(firstEnemy);
    //     }
    //   }
    // }
    // else {
    //   const secondEnemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {filter: (creep) => {
    //     return (creep.getActiveBodyparts(HEAL) > 0)) }
    //   });
    //   if (secondEnemy) {
    //     if (creep.getActiveBodyparts(ATTACK) > 0) {
    //       if (!creep.pos.inRangeTo(secondEnemy,1)) {
    //         creep.travelTo(secondEnemy);
    //       }
    //       else {
    //         creep.attack(secondEnemy);
    //       }
    //
    //       if (!creep.pos.inRangeTo(secondEnemy,3)) {
    //         creep.travelTo(secondEnemy);
    //       }
    //       else {
    //         creep.rangedAttack(firstEnemy);
    //       }
    //     }
    //     else if (creep.getActiveBodyparts(RANGED_ATTACK) > 0) {
    //       if (!creep.pos.inRangeTo(secondEnemy,3)) {
    //         creep.travelTo(secondEnemy);
    //       }
    //       else {
    //         creep.rangedAttack(secondEnemy);
    //       }
    //     }
    //   }
    //   else {
    //     const thirdEnemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if (thirdEnemy) {
    //       if (creep.getActiveBodyparts(ATTACK) > 0) {
    //         if (!creep.pos.inRangeTo(thirdEnemy,1)) {
    //           creep.travelTo(thirdEnemy);
    //         }
    //         else {
    //           creep.attack(thirdEnemy);
    //         }
    //
    //         if (!creep.pos.inRangeTo(thirdEnemy,3)) {
    //           creep.travelTo(thirdEnemy);
    //         }
    //         else {
    //           creep.rangedAttack(thirdEnemy);
    //         }
    //       }
    //       else if (creep.getActiveBodyparts(RANGED_ATTACK) > 0) {
    //         if (!creep.pos.inRangeTo(thirdEnemy,3)) {
    //           creep.travelTo(thirdEnemy);
    //         }
    //         else {
    //           creep.rangedAttack(thirdEnemy);
    //         }
    //       }
    //     }
    //     else {
    //       // Structures
    //     }
    //   }
    // }
  }
}
