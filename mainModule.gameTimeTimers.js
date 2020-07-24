const spawnCreep = require('mainModule.spawnCreep');
const manageLinks = require('mainModule.links');
const roomManager = require('module.roomManager');

module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];


    if (Game.time % 10 == 0) {
      flagMemory.enemyCount = room.find(FIND_HOSTILE_CREEPS).length;

      spawnCreep.run(roomName);

      manageLinks.run(roomName);
    }



    if (flagMemory.sources) {
      if (Game.time % 5000 == 0 || (!flagMemory.roomManager.headSpawn && room.spawns.length > 0)) {
        console.log(`Memory in ${roomName} is being updated!`)

        if (Game.time % 5000 == 0) {
          const mineral = room.find(FIND_MINERALS)[0];
          if (mineral) {
            flagMemory.mineralAmount = mineral.mineralAmount;
            flagMemory.mineralId = mineral.id;
          }
          else {
            flagMemory.mineralAmount = 0;
            flagMemory.mineralId = "";
          }
          flagMemory.constructionSitesAmount = room.find(FIND_CONSTRUCTION_SITES).length;
        }

        roomManager.run(roomName)
      }
    }
  }
}
