const mainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(roomName) {
    // Get the variables needed for module //
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
    const runMainSystem = mainSystem.run();

    function repairStructures() {
      // If There Are No Hostile Creeps In ROom And There Is Memory //
      if (flagMemory.enemyCount == 0 && flagMemory.repairTarget) {
        // If Room Has Towers //
        if (room.towers.length > 0) {
          // Input Variables //
          const towers = room.towers;
          let repairAmount = 100 * 1000; // 100K

          // If Room Has Terminal, RepairAmount Is 1M
          if (room.terminal) {
            repairAmount = 1 * 1000 * 1000 // 1M
          }

          // If There Is Nothing To Repair And Its Time To Check Again //
          if (flagMemory.repairTarget.length == 0 && Game.time % 1000 == 0) {
            let repairTarget = flagMemory.repairTarget;
            // Loop Through All Structures That Are Under The RepairAmount //
            let targetRepair = room.find(FIND_STRUCTURES, {
              filter: (s) => s.hits < s.hitsMax && s.hits < repairAmount
            });

            // If There Are Strucutres Found //
            if (targetRepair.length > 0) {
              // Enter Each Structure In Memory //
              for (let i = 0; targetRepair.length > i; i++) {
                flagMemory.repairTarget[i] = targetRepair[i].id
              }
            }
          }


          // If There Is Still Something To Repair //
          if (flagMemory.repairTarget.length > 0) {
            for (let tower of towers) {
              // Get First Target Out Of Array //
              let target = Game.getObjectById(flagMemory.repairTarget[0]);
              // If Target Is Not Null //
              if (target !== null) {
                // If Target Is Still Under The RepairAmount And Is Not Full Health //
                if (target.hits < target.hitsMax && target.hits < repairAmount) {
                  // Repair Structure //
                  Memory.performanceTracker[roomName + ".repairerEnergy"] += 10;
                  tower.repair(target);
                }
                else {
                  // Remove Target From Memory //
                  flagMemory.repairTarget.shift();
                }
              }
              else {
                // Remove Target From Memory //
                flagMemory.repairTarget.shift();
              }
            }
          }
        }
      }
    }

    if (runMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      repairStructures();

      // Set the average CPU Usage in the memory //
      flagMemory.trackers.cpu.repairStructures += Game.cpu.getUsed() - start;
    }
    else
    // Run the part without tracking //
    repairStructures();
  }
}
