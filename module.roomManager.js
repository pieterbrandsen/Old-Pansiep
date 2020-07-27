const roomPlanner = require('module.roomPlanner');
const createConstructionSiteForObject = require('function.createConstructionSite');

module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
    let errorMessage = "";

    function createConstructionSite(memoryPath, objectId, range, controllerLevel) {
      const buildStructure = createConstructionSiteForObject.run(objectId,range,controllerLevel,roomName);
      if (!buildStructure[0])
      errorMessage = buildStructure[2];
      if (buildStructure[0]) {
        flagMemory.roomManager[memoryPath] = true;
        flagMemory.constructionSitesAmount++;
      }
      else if (buildStructure[1]) {
        flagMemory.roomManager[memoryPath] = true;
      }
      else
      flagMemory.roomManager[memoryPath] = false;
    }

    function getSpawningEnergy() {
      flagMemory.totalEnergyAvailable = room.energyAvailable;
      let spawns = room.spawns.length;
      let extensions = room.extensions.length;

      if (room.controller.level == 1) {
        if (room.spawns.length > 0) {
          if (spawns > 1)
          spawns = 1;

          flagMemory.totalEnergyCapacity = (spawns * 300);
        }
      }
      if (room.controller.level == 2) {
        if (room.spawns.length > 0) {
          if (spawns > 1)
          spawns = 1;
          if (extensions > 5)
          extensions = 5;

          flagMemory.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
        }
      }
      else if (room.controller.level == 3) {
        if (room.spawns.length > 0) {
          if (spawns > 1)
          spawns = 1;
          if (extensions > 10) {
            extensions = 10;
          }

          flagMemory.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
        }
      }
      else if (room.controller.level == 4) {
        if (room.spawns.length > 0) {
          if (spawns > 1)
          spawns = 1;
          if (extensions > 20)
          extensions = 20;

          flagMemory.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
        }
      }
      else if (room.controller.level == 5) {
        if (room.spawns.length > 0) {
          if (spawns > 1)
          spawns = 1;
          if (extensions > 30)
          extensions = 30;

          flagMemory.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
        }
      }
      else if (room.controller.level == 6) {
        if (room.spawns.length > 0) {
          if (spawns > 1)
          spawns = 1;
          if (extensions > 40)
          extensions = 40;

          flagMemory.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
        }
      }
      else if (room.controller.level == 7) {
        if (room.spawns.length > 0) {
          if (spawns > 2)
          spawns = 2;
          if (extensions > 50)
          extensions = 50;

          flagMemory.totalEnergyCapacity = (spawns * 300) + (extensions * 100);
        }
      }
      else if (room.controller.level == 8) {
        flagMemory.totalEnergyCapacity = (spawns * 300) + (extensions * 200);
      }
    }

    if (flagMemory) {
      if (flagMemory.roomManager) {
        if (Game.time % 10 == 0)
        getSpawningEnergy();

        if (Game.time % 500 == 0) {
          roomPlanner.run();

          room.find(FIND_SOURCES).forEach((source, i) => {
            if (flagMemory.roomManager[`source-${i}.HasStructure`] == false) {
              if (createConstructionSite(`source-${i}.HasStructure`, source.id, 2, 7))
              console.log(`Building a storage for a source in room: ${room.name}`);
              else {
                if (errorMessage.length > 0) {
                  console.log(`Can't build a storage for a source in room: ${room.name} because of ${errorMessage}`)
                }
              }
            }
          });

          if (flagMemory.roomManager[`controller.HasStructure`] == false) {
            if (createConstructionSite(`controller.HasStructure`, room.controller.id, 3, 6)) {
              console.log(`Building a storage for the controller in room: ${room.name}`)
            }
            else {
              if (errorMessage.length > 0) {
                console.log(`Can't build a storage for the controller in room: ${room.name} because of ${errorMessage}`)
              }
            }
          }
        }
        else {
          if (room.spawns.length > 1) {
            if (room.terminal && room.controller.level >= 6) {
              const spawn = room.terminal.pos.findInRange(room.spawns, 2,
                {filter: {structureType: STRUCTURE_SPAWN
                }})[0];

                if (spawn)
                flagMemory.roomManager.headSpawn = spawn.id;
              }
            }
            else {
              if (room.spawns.length == 1) {
                flagMemory.roomManager.headSpawn = room.spawns[0].id;
              }
            }
          }
        }
      }
    }
  }
