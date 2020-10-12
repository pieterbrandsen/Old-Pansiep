const runMainSystem = require('function.mainSystem');

module.exports = {
  run: function(roomName) {
    const getMainSystem = runMainSystem.run();
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    function repairStructures() {
      // If There Are No Hostile Creeps In ROom And There Is Memory //
      if (flagMemory.enemyCreepCount == 0) {
        // If Room Has Towers //
        if (room.towers.length > 0) {
          // Input Variables //
          const towers = room.towers;

          // If There Is Still Something To Repair //
          if (flagMemory.repair.targets.length > 0 && flagMemory.trackers.room.energyStored > 25*1000) {
            for (let tower of towers) {
              // Get First Target Out Of Array //
              let target = Game.getObjectById(flagMemory.repair.targets[0]);
              // If Target Is Not Null //
              // If Target Is Still Under The RepairAmount And Is Not Full Health //
              if (target !== null && target.hits < target.hitsMax && target.hits < flagMemory.repair.hitsTarget) {
                // Repair Structure //
                if (tower.repair(target) == 0)
                flagMemory.trackers.performance.repairerEnergy += 10
              }
              else
              // Remove Target From Memory //
              flagMemory.repair.targets.shift();
            }
          }
        }
      }
    }

    repairStructures();
  }
}
