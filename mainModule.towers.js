const mainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(roomName) {
    // Get the variables needed for module //
    const runMainSystem = mainSystem.run();
    const flagMemory = Memory.flags[roomName];
    const room = Game.rooms[roomName];
    const towers = room.towers;

    function runTowers() {
      // If FlagMemory Has Data Of More Then One Enemy //
      if (flagMemory.enemyCount > 0) {
        // Run Defend (Attack) For Each Tower //
        for (let tower of room.towers) {
          tower.defend();
        }
      }
    }


    if (runMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runTowers();

      // Set the average CPU Usage in the memory //
      flagMemory.trackers.cpu.towers += Game.cpu.getUsed() - start;
    }
    else
    // Run the part without tracking //
    runTowers();
  }
}
