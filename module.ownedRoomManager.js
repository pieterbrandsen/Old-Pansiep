const roomPlanner = require('module.roomPlanner');
const createConstructionSiteForObject = require('function.createConstructionSite');

function createConstructionSite(memoryPath, objectId, range, controllerLevel, room, flagMemory) {
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

function getTotalRoomEnergy(room, flagMemory) {
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

function getHeadSpawn(room, flagMemory) {
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

function hasStructures(room, flagMemory) {
  room.find(FIND_SOURCES).forEach((source, i) => {
    if (flagMemory.roomManager[`source-${i}.HasStructure`] == false) {
      if (createConstructionSite(`source-${i}.HasStructure`, source.id, 2, 7))
      console.log(`Building a storage for a source in room: ${room.name}`);
    }
  });

  if (flagMemory.roomManager[`controller.HasStructure`] == false) {
    if (createConstructionSite(`controller.HasStructure`, room.controller.id, 3, 6))
    console.log(`Building a storage for the controller in room: ${room.name}`)
  }
}


module.exports = {
  update: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    getHeadSpawn(room, flagMemory);
    roomPlanner.run(roomName);

    flagMemory.controllerLevel = room.controller.level;
    flagMemory.roomIsChecked = true;

    hasStructures(room, flagMemory);
  }
};
