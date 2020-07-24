module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
    const towers = room.towers;

    if (flagMemory.enemyCount == 0 && flagMemory.repairTarget) {
      if (room.towers.length > 0) {
        let repairAmount = 100 * 1000;
        if (room.terminal) {
          let repairAmount = 1 * 1000 * 1000 // 1 Million
        }

        if (flagMemory.repairTarget.length == 0 && Game.time % 1000 == 0) {
          let repairTarget = flagMemory.repairTarget;
          let targetRepair = room.find(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.hits < repairAmount
          });

          if (targetRepair.length > 0) {
            for (let i = 0; targetRepair.length > i; i++) {
              flagMemory.repairTarget[i] = targetRepair[i].id
            }
          }
        }


        if (flagMemory.repairTarget.length > 0) {
          for (let tower of towers) {
            let target = Game.getObjectById(flagMemory.repairTarget[0]);
            if (target !== null) {
              if (target.hits < target.hitsMax && target.hits < repairAmount) {
                Memory.performanceTracker[roomName + ".repairerEnergy"] += 10;
                tower.repair(target);
              }
              else {
                flagMemory.repairTarget.shift();
              }
            }
            else {
              flagMemory.repairTarget.shift();
            }
          }
        }
      }
    }
  }
}
