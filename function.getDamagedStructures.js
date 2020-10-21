const runMainSystem = require('function.mainSystem');

module.exports = {
  getHitsTarget: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
    let currentHitsTarget = flagMemory.repair.hitsTarget;

    if (room && !room.controller.reservation) {
      if (room.walls || room.ramparts) {
        if (currentHitsTarget < 1 * 1000 * 1000)
        currentHitsTarget = 1 * 1000 * 1000;
        else {
          const lowerHitsTarget = currentHitsTarget * 0.95;
          let findLowerRamparts = 0;
          let findLowerWalls = 0;


          if (room.ramparts && room.ramparts.length > 0) {
            findLowerRamparts = room.find(room.ramparts, {
              filter: (s) => s.hits < s.hitsMax && s.hits < lowerHitsTarget
            });
          }

          if (room.walls && room.walls.length > 0) {
            findLowerWalls = room.find(room.walls, {
              filter: (s) => s.hits < s.hitsMax && s.hits < lowerHitsTarget
            });
          }

          if (findLowerRamparts.length == 0 && findLowerWalls.length == 0)
          currentHitsTarget = lowerHitsTarget;
          else if (flagMemory.trackers.room.energyStored > 75*1000)
          currentHitsTarget *= 1.1;
        }
      }
    }
    else currentHitsTarget = 1*1000*1000;
    currentHitsTarget = 1*1000*1000
    return currentHitsTarget
  },

  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
    const getMainSystem = runMainSystem.run();
    const hitsTarget = this.getHitsTarget(roomName);
    function runModule() {
      if (flagMemory.repair && flagMemory.repair.targets.length == 0) {
        flagMemory.repair.hitsTarget = hitsTarget;
        targets = room.find(FIND_STRUCTURES, {
          filter: (s) => s.hits < s.hitsMax && s.hits < hitsTarget
        });

        targets.forEach((target, i) => {
          if (target.id)
          flagMemory.repair.targets.push(target.id);
        });

      }
    }


    if (getMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runModule();

      // Set the average CPU Usage in the memory //
      flagMemory.trackers.cpu.getDamagedStructures += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      runModule();
    }
  }
}
