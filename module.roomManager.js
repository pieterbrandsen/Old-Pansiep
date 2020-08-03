const roomPlanner = require('module.roomPlanner');
const createConstructionSiteForObject = require('function.createConstructionSite');
const mainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(roomName) {
    // Get The Variables Needed For Module //
    const runMainSystem = mainSystem.run();
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
    let errorMessage = "";

    function runRoomManager() {
      function getSpawningEnergy() {
        const totalEnergyCapacity = 0;
        let spawnsAmount = room.spawns.length;
        let extensionsAmount = room.extensions.length;
        flagMemory.totalEnergyAvailable = room.energyAvailable;

        // Check For Controller Level If Spawn Or Extension Amount Is Higher Then Allowed //
        switch (room.controller.level) {
          case 1:
          if (spawnsAmount > 1)
          spawnsAmount = 1;
          if (extensionsAmount > 0)
          extensionsAmount = 0;
          break;
          case 2:
          if (spawnsAmount > 1)
          spawnsAmount = 1;
          if (extensionsAmount > 5)
          extensionsAmount = 5;
          break;
          case 3:
          if (spawnsAmount > 1)
          spawnsAmount = 1;
          if (extensionsAmount > 10)
          extensionsAmount = 10;
          break;
          case 4:
          if (spawnsAmount > 1)
          spawnsAmount = 1;
          if (extensionsAmount > 20)
          extensionsAmount = 20;
          break;
          case 5:
          if (spawnsAmount > 1)
          spawnsAmount = 1;
          if (extensionsAmount > 30)
          extensionsAmount = 30;
          break;
          case 6:
          if (spawnsAmount > 1)
          spawnsAmount = 1;
          if (extensionsAmount > 40)
          extensionsAmount = 40;
          break;
          case 7:
          if (spawnsAmount > 2)
          spawnsAmount = 2;
          if (extensionsAmount > 50)
          extensionsAmount = 50;
          break;
          default:
        }

        // Calculate TotalEnergyCapacity //
        // If ControllerLevel Is 7 Or 8, Get The Right Extension Size Amount //
        switch (room.controller.level) {
          case 7:
          flagMemory.totalEnergyCapacity = (spawnsAmount * 300) + (extensionsAmount * 100);
          break;
          case 8:
          flagMemory.totalEnergyCapacity = (spawnsAmount * 300) + (extensionsAmount * 200);
          break;
          default:
          flagMemory.totalEnergyCapacity = (spawnsAmount * 300) + (extensionsAmount * 50);
          break;
        }
      }

      function createConstructionSite(memoryPath, objectId, range, controllerLevel) {
        const buildStructure = createConstructionSiteForObject.run(objectId,range,controllerLevel,roomName);
        if (!buildStructure[0])
        errorMessage = buildStructure[2];
        if (buildStructure[0]) {
          flagMemory.roomManager[memoryPath] = true;
          flagMemory.constructionSitesAmount++;
        }
        else if (buildStructure[1])
        flagMemory.roomManager[memoryPath] = true;
        else
        flagMemory.roomManager[memoryPath] = false;
      }

      // If FlagMemory Is Defined, Run This Part //
      if (flagMemory) {
        // Get Total Construction Sites In Room //
        flagMemory.constructionSitesAmount = room.find(FIND_CONSTRUCTION_SITES).length;

        // Get Energy In Room //
        if (Game.time % 10 == 0)
        getSpawningEnergy();

        // If RoomManager Is Defined //
        if (flagMemory.roomManager) {

          // If Timer Is 0, Run Code //
          if (Game.time % 500 == 0) {
            // Run Room Planner //
            roomPlanner.run();

            // Check For Each Source If It Is Missing A Structure, Try To Build One //
            room.find(FIND_SOURCES).forEach((source, i) => {
              if (flagMemory.roomManager[`source-${i}.HasStructure`] == false) {
                if (createConstructionSite(`source-${i}.HasStructure`, source.id, 2, 7))
                console.log(`Building a storage for a source in room: ${room.name}`);
                else {
                  if (errorMessage.length > 0)
                  console.log(`Can't build a storage for a source in room: ${room.name} because of ${errorMessage}`)
                }
              }
            });

            // Check Controller If It Is Missing A Structure, Try To Build One //
            if (flagMemory.roomManager[`controller.HasStructure`] == false) {
              if (createConstructionSite(`controller.HasStructure`, room.controller.id, 3, 6))
              console.log(`Building a storage for the controller in room: ${room.name}`)
              else {
                if (errorMessage.length > 0)
                console.log(`Can't build a storage for the controller in room: ${room.name} because of ${errorMessage}`)
              }
            }
          }
          else {
            // Get HeadSpawn By Getting The Closest Spawn To Terminal Or Else Get Only Spawn //
            if (room.spawns.length > 1) {
              if (room.terminal && room.controller.level >= 6) {
                const spawn = room.terminal.pos.findInRange(room.spawns, 2,
                  {filter: {structureType: STRUCTURE_SPAWN
                  }
                })[0];

                if (spawn)
                flagMemory.roomManager.headSpawn = spawn.id;
              }
            }
            else {
              if (room.spawns.length == 1)
              flagMemory.roomManager.headSpawn = room.spawns[0].id;
            }
          }
        }
      }
    }

    if (runMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runRoomManager();

      // Set the average CPU Usage in the memory //
      flagMemory.trackers.cpu.roomManager += Game.cpu.getUsed() - start;
    }
    else
    // Run the part without tracking //
    runRoomManager();
  }
}
