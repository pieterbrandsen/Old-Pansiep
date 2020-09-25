const spawnCreep = require('mainModule.spawnCreep');
const manageLinks = require('mainModule.links');
const roomManager = require('module.roomManager');

module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    // Every 10 Ticks Run This //
    if (Game.time % 10 == 0 && flagMemory.IsMemorySetup) {
      // Run Spawning Code //
      spawnCreep.run(roomName);

      // Run The LinkManager //
      manageLinks.run(roomName);

      // Run The RoomManager //
      roomManager.run(roomName);
    }


    // If Sources Is Defined //
    if (flagMemory.sources) {
      // Check Each 5000 ticks Or Memory Is Being Reset //
      if (Game.time % 5000 == 0 || (!flagMemory.roomManager.headSpawn && room.spawns.length > 0)) {
        console.log(`Memory in ${roomName} is being updated!`)

        // Get The Mineral Of The Room //
        const mineral = room.find(FIND_MINERALS)[0];
        if (mineral) {
          // Save The MineralAmount And Id //
          flagMemory.mineralAmount = mineral.mineralAmount;
        }
        else {
          // Set It At Undefined So Code Doesn't Break But Is Empty //
          flagMemory.mineralAmount = 0;
        }

        // Get The ConstructionSiteAmount //
        flagMemory.constructionSitesAmount = room.find(FIND_CONSTRUCTION_SITES).length;
      }
    }

    // Every 1.000 Ticks Run This //
    if (Game.time % 1000 == 0) {
      // Recheck Room //
      roomManager.update();
    }
  }
}
