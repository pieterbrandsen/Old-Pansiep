const runMainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(roomName) {
    const getMainSystem = runMainSystem.run();
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    function repairStructures() {
      // If There Are No Hostile Creeps In ROom And There Is Memory //
      if (flagMemory.enemyCreepCount == 0 && flagMemory.repairTarget) {
        // If Room Has Towers //
        if (room.towers.length > 0) {
          // Input Variables //
          const towers = room.towers;
          let repairAmount = flagMemory.repairTargetAmount;
          //let repairAmount = 250*1000;


          // If There Is Nothing To Repair And Its Time To Check Again //
          if (flagMemory.repairTarget.length == 0 && Game.time % 1000 == 0 && flagMemory.totalEnergyAvailable > flagMemory.totalEnergyCapacity / 2) {
            let repairTarget = flagMemory.repairTarget;
            // Loop Through All Structures That Are Under The RepairAmount //
            let targetRepair = room.find(FIND_STRUCTURES, {
              filter: (s) => s.hits < s.hitsMax && s.hits < repairAmount
            });

            // If There Are Strucutres Found //
            if (targetRepair.length > 0) {
              if (flagMemory.targetRepair > 100*1000)
              flagMemory.repairTargetAmount = flagMemory.repairTargetAmount - 100*1000;
              // Enter Each Structure In Memory //
              for (let i = 0; targetRepair.length > i; i++) {
                flagMemory.repairTarget[i] = targetRepair[i].id
              }
            }
            else if (flagMemory.repairTargetAmount < 5 * 100 * 1000)
            flagMemory.repairTargetAmount = flagMemory.repairTargetAmount + 200*1000;
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
                  if (tower.repair(target) == 0)
                  flagMemory.trackers.performance.repairerEnergy += 10
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

    if (getMainSystem && Memory.flags[roomName].trackers.room.energyStored > 250000) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      repairStructures();

      // Set the average CPU Usage in the memory //
      if (Memory.flags[roomName].IsMemorySetup)
      Memory.flags[roomName].trackers.cpuModule.repairModule += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      repairStructures();
    }
  }
}
