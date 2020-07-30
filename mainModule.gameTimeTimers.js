const spawnCreep = require('mainModule.spawnCreep');
const manageLinks = require('mainModule.links');
const roomManager = require('module.roomManager');
const mainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(roomName) {
    // Get the variables needed for module //
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
    const runMainSystem = mainSystem.run();


    function runGameTimeTimers() {
      // Every 10 Ticks Run This //
      if (Game.time % 10 == 0) {
        // Get The Hostile Creep Amount And Log The Amount In The FlagMemory Of That Room //
        flagMemory.enemyCount = room.find(FIND_HOSTILE_CREEPS).length;

        // Run Spawning Code //
        spawnCreep.run(roomName);

        // Run The LinkManager //
        manageLinks.run(roomName);

        // Run The RoomManager //
        roomManager.run(roomName)
      }


      // If Sources Is Defined //
      if (flagMemory.sources) {
        // Check Each 5000 ticks Or Memory Is Being Reset //
        if (Game.time % 5000 == 0 || (!flagMemory.roomManager.headSpawn && room.spawns.length > 0)) {
          console.log(`Memory in ${roomName} is being updated!`)

          // Each 5000 Ticks, Run This //
          if (Game.time % 5000 == 0) {
            // Get The Mineral Of The Room //
            const mineral = room.find(FIND_MINERALS)[0];
            if (mineral) {
              // Save The MineralAmount And Id //
              flagMemory.mineralAmount = mineral.mineralAmount;
              flagMemory.mineralId = mineral.id;
            }
            else {
              // Set It At Undefined So Code Doesn't Break But Is Empty //
              flagMemory.mineralAmount = 0;
              flagMemory.mineralId = "";
            }

            // Get The ConstructionSiteAmount //
            flagMemory.constructionSitesAmount = room.find(FIND_CONSTRUCTION_SITES).length;
          }
        }
      }
    }

    if (runMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runLinks();

      // Set the average CPU Usage in the memory //
      flagMemory.trackers.cpu.links += Game.cpu.getUsed() - start;
    }
    else
    // Run the part without tracking //
    runLinks();
  }
}
