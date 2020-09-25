const roomPlanner = require('module.roomPlanner');
const createConstructionSiteForObject = require('function.createConstructionSite');

function createConstructionSite(memoryPath, objectId, range, controllerLevel) {
  const buildStructure = createConstructionSiteForObject.run(objectId,range,controllerLevel,roomName);
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

function getSpawningEnergy() {
  flagMemory.totalEnergyAvailable = room.energyAvailable;
  let spawnsLength = room.spawns.length;
  let extensionsLength = room.extensions.length;

  switch (room.controller.level) {
    case 1:
    if (spawnsLength > 1)
    spawnsLength = 1;
    if (extensionsLength > 0)
    extensionsLength = 0;
    break;
    case 2:
    if (spawnsLength > 1)
    spawnsLength = 1;
    if (extensionsLength > 5)
    extensionsLength = 5;
    break;
    case 3:
    if (spawnsLength > 1)
    spawnsLength = 1;
    if (extensionsLength > 10)
    extensionsLength = 10;
    break;
    case 4:
    if (spawnsLength > 1)
    spawnsLength = 1;
    if (extensionsLength > 20)
    extensionsLength = 20;
    break;
    case 5:
    if (spawnsLength > 1)
    spawnsLength = 1;
    if (extensionsLength > 30)
    extensionsLength = 30;
    break;
    case 6:
    if (spawnsLength > 1)
    spawnsLength = 1;
    if (extensionsLength > 40)
    extensionsLength = 40;
    break;
    case 7:
    if (spawnsLength > 2)
    spawnsLength = 2;
    if (extensionsLength > 50)
    extensionsLength = 50;
    break;
    default:
    break;
  }

  if (room.controller.level == 8)
  flagMemory.totalEnergyCapacity = (spawnsLength * 300) + (extensionsLength * 200);
  else if (room.controller.level == 7)
  flagMemory.totalEnergyCapacity = (spawnsLength * 300) + (extensionsLength * 100);
  else
  flagMemory.totalEnergyCapacity = (spawnsLength * 300) + (extensionsLength * 50);
}

function getTotalRoomEnergy() {
  // EnergyStorage Is Zero At Start //
  let energyStored = 0;

  // Loop Through All Containers And Count Energy In Container If Its Not The Controller Storage //
  room.containers.forEach((container, i) => {
    if (container.id !== flagMemory.controllerStorage || !flagMemory.controllerStorage) {
      energyStored += container.store.getUsedCapacity(RESOURCE_ENERGY);
    }
  });
  // Loop Through All Links And Count Energy In Link If Its Not The Controller Storage //
  room.links.forEach((link, i) => {
    if (flagMemory.links) {
      if (flagMemory.links.linkTo1) {
        if (link.id !== flagMemory.controllerStorage || !flagMemory.controllerStorage) {
          energyStored += link.store.getUsedCapacity(RESOURCE_ENERGY);
        }
      }
    }
  });

  // If There Is A Terminal In Room, Add EnergyCount
  if (room.terminal !== undefined)
  energyStored += room.terminal.store.getUsedCapacity(RESOURCE_ENERGY);

  // If There Is A Storage In Room, Add EnergyCount
  if (room.storage !== undefined)
  energyStored += room.storage.store.getUsedCapacity(RESOURCE_ENERGY);

  // Return EnergyCount
  return energyStored;
}

function getHeadSpawn() {
  // Get HeadSpawn For RCL 6+ //
  if (!flagMemory.roomManager.headSpawn && room.spawns.length > 1 && room.terminal) {
    const spawn = room.terminal.pos.findInRange(room.spawns, 2,
      {filter: {structureType: STRUCTURE_SPAWN
      }});

      if (spawn[0])
      flagMemory.roomManager.headSpawn = spawn[0].id;
    }
    else if (room.spawns.length == 1)
    flagMemory.roomManager.headSpawn = room.spawns[0].id;
}

function hasStructure() {
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

  if (flagMemory.roomManager[`controller.HasStructure`] == false) {
    if (createConstructionSite(`controller.HasStructure`, room.controller.id, 3, 6))
    console.log(`Building a storage for the controller in room: ${room.name}`)
    else {
      if (errorMessage.length > 0)
      console.log(`Can't build a storage for the controller in room: ${room.name} because of ${errorMessage}`)
    }
  }
}

function runPerformanceTracker() {
  if (Game.time % 50 == 0) {
    if (flagMemory.IsMemorySetup) {
      flagMemory.trackers.room.energyStored = getTotalRoomEnergy();

      let totalWallHitPoints = 0;
      let totalWallAmount = 0;
      if (room.walls) {
        room.walls.forEach((wall, i) => {
          if (wall) {
            totalWallHitPoints += wall.hits;
            totalWallAmount++;
          }
        });
      }

      let totalRampartHitPoints = 0;
      let totalRampartAmount = 0;
      if (room.ramparts) {
        room.ramparts.forEach((rampart, i) => {
          if (rampart) {
            totalRampartHitPoints += rampart.hits;
            totalRampartAmount++;
          }
        });
      }


      flagMemory.trackers.room.averageWallHP = totalWallHitPoints / totalWallAmount;
      flagMemory.trackers.room.averageRampartHP = totalRampartHitPoints / totalRampartAmount;
      flagMemory.trackers.room.rclLevel = room.controller.level;
      flagMemory.trackers.room.rclProgress = room.controller.progress;
      flagMemory.trackers.room.rclProgressTotal = room.controller.progressTotal;
    }
  }
}


module.exports = {
  update: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    getSpawningEnergy();
    getHeadSpawn();
    roomPlanner.run();

    flagMemory.controllerLevel = room.controller.level;
    flagMemory.roomIsChecked = true;

    hasStructure();
  },

  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];


    if (flagMemory && flagMemory.roomManager) {
        getSpawningEnergy();
        getHeadSpawn();

        if (flagMemory.roomManager.headSpawn && Game.time % 500 == 0) {
          flagMemory.controllerLevel = room.controller.level;
          flagMemory.roomIsChecked = true;

          hasStructure();
        }

        runPerformanceTracker()
      }
    }
  }
