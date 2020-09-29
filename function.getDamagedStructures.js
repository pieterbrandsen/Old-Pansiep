const runMainSystem = require('function.mainSystem');

module.exports = {
  getHitsTarget: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    if (room && !room.controller.reservation) {
      const currentHitsTarget = flagMemory.repair.hitsTarget;

      if (room.walls && room.ramparts) {
        if (room.walls.length > 0 || room.ramparts.length > 0) {
          if (currentHitsTarget < 1 * 1000 * 1000)
          return 1 * 1000 * 1000;
          else {
            const lowerHitsTarget = currentHitsTarget * 0.95;
            const findLowerRamparts = room.find(room.ramparts, {
              filter: (s) => s.hits < s.hitsMax && s.hits < lowerHitsTarget
            });
            const findLowerWalls = room.find(room.walls, {
              filter: (s) => s.hits < s.hitsMax && s.hits < lowerHitsTarget
            });

            if (findLowerRamparts.length == 0 && findLowerWalls.length == 0)
            return lowerHitsTarget;
            else if (flagMemory.trackers.room.energyStored > 50*1000)
            return currentHitsTarget * 1.1;
          }
        }
      }
      else return currentHitsTarget;
    }
    else return 250*1000;
  },

  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
    const getMainSystem = runMainSystem.run();
    const hitsTarget = this.getHitsTarget(roomName);

    function runModule() {
      if (flagMemory.repair) {
        flagMemory.repair.hitsTarget = hitsTarget;

        flagMemory.repair.targets = room.find(FIND_STRUCTURES, {
          filter: (s) => s.hits < s.hitsMax && s.hits < hitsTarget
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
