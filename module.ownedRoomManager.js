const runMainSystem = require('function.mainSystem');

const runLabs = require('module.labs');
const roomPlanner = require('module.roomPlanner');
const terminal = require('module.terminal');

const runTowers = require('mainModule.towers');
const runGameTimeTimers = require('mainModule.gameTimeTimers');
const getDamagedStructures = require('mainModule.repairStructures');


function getTotalRoomEnergy(roomName) {
  const room = Game.rooms[roomName];
  const flagMemory = Memory.flags[roomName];

  // EnergyStorage Is Zero At Start //
  let energyStored = 0;

  // Loop Through All Containers And Count Energy In Container If Its Not The Controller Storage //
  room.containers.forEach((container, i) => {
    if (container.id !== flagMemory.controllerStructureId || !flagMemory.controllerStructureId) {
      energyStored += container.store.getUsedCapacity(RESOURCE_ENERGY);
    }
  });
  // Loop Through All Links And Count Energy In Link If Its Not The Controller Storage //
  room.links.forEach((link, i) => {
    if (flagMemory.links) {
      if (flagMemory.links.linkTo1) {
        if (link.id !== flagMemory.controllerStructureId || !flagMemory.controllerStructureId) {
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

function getHeadSpawn(roomName) {
  const room = Game.rooms[roomName];
  const flagMemory = Memory.flags[roomName];

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

const createConstructionSiteForObject = require('function.createConstructionSite');


function createConstructionSite(memoryPath, objectId, range, controllerLevel, roomName) {
  const buildStructure = createConstructionSiteForObject.run(objectId,range,controllerLevel,roomName);

  if (buildStructure[0]) {
    flagMemory.roomManager[memoryPath] = true;
    flagMemory.constructionSitesAmount++;
  }
  else if (buildStructure[1])
  flagMemory.roomManager[memoryPath] = true;
  else
  flagMemory.roomManager[memoryPath] = false;
}

function getSourceStructures(roomName) {
  const room = Game.rooms[roomName];
  const flagMemory = Memory.flags[roomName];

  room.find(FIND_SOURCES).forEach((source, i) => {
    const container = source.pos.findInRange(room.containers, 1);
    const link = source.pos.findInRange(room.links, 2);

    if ((container !== null && link == null && flagMemory.sources.length == 2 && flagMemory.controllerLevel >= 7) || (container !== null && link == null && flagMemory.sources.length == 1 && flagMemory.controllerLevel >= 6) || (container == null && link == null)) {
      if (createConstructionSite(`source-${i}.HasStructure`, source.id, 2, 7))
      console.log(`Building a storage for a source in room: ${room.name}`);
    }
    else if (container !== null) {
      flagMemory.sources[i].structureId = container.id;
      flagMemory.roomManager[`source-${i}.HasStructure`] = true;
    }
    else if (link !== null) {
      flagMemory.sources[i].structureId = link.id;
      flagMemory.roomManager[`source-${i}.HasStructure`] = true;
    }
  });
}

function getControllerStructure(roomName) {
  const room = Game.rooms[roomName];
  const flagMemory = Memory.flags[roomName];

  const container = room.controller.pos.findInRange(room.containers, 1);
  const link = room.controller.pos.findInRange(room.links, 2);


  if ((container !== null && link == null && flagMemory.controllerLevel >= 6) || (container == null && link == null)) {
    if (createConstructionSite(`controller.HasStructure`, source.id, 2, 7))
    console.log(`Building a storage for the controller in room: ${room.name}`);
  }
  else if (container !== null) {
    flagMemory.controllerStructureId = container.id;
    flagMemory.roomManager[`controller.HasStructure`] = true;
  }
  else if (link !== null) {
    flagMemory.controllerStructureId = link.id;
    flagMemory.roomManager[`controller.HasStructure`] = true;
  }
}


module.exports = {
  update: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    getSourceStructures(roomName);
    getControllerStructure(roomName);
    getHeadSpawn(roomName);
    roomPlanner.run(roomName);

    flagMemory.controllerLevel = room.controller.level;
    flagMemory.roomIsChecked = true;
  },

  run: function(roomName) {
    const flagMemory = Memory.flags[roomName];
    const getMainSystem = runMainSystem.run();

    // Every 1.000 Ticks Run This //
    if (Game.time % 1000 == 0 || !flagMemory.roomIsChecked) {
      // Recheck Room //
      this.update(roomName);
    }

    // Create Variable For Shortcut of CpuTracker //
    const cpuTracker = flagMemory.trackers.cpu;

    if (getMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runTowers.run(roomName);

      // Set the average CPU Usage in the memory //
      cpuTracker.runTowers += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      runTowers.run(roomName);
    }


    if (getMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      getDamagedStructures.run(roomName);

      // Set the average CPU Usage in the memory //
      cpuTracker.getDamagedStructures += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      getDamagedStructures.run(roomName);
    }


    if (getMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runGameTimeTimers.run(roomName);

      // Set the average CPU Usage in the memory //
      cpuTracker.runGameTimeTimers += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      runGameTimeTimers.run(roomName);
    }

    if (getMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      terminal.run(roomName);
      terminal.update(roomName);

      // Set the average CPU Usage in the memory //
      cpuTracker.terminal += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      terminal.run(roomName);
      terminal.update(roomName);
    }

    if (getMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runLabs.run(roomName);
      runLabs.update(roomName);

      // Set the average CPU Usage in the memory //
      cpuTracker.labs += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      runLabs.run(roomName);
      runLabs.update(roomName);
    }
  }
};
