const runMainSystem = require('function.mainSystem');
const createRoadsFunction = require('function.createRoads');
const getDamagedStructures = require('function.getDamagedStructures');

const runLabs = require('module.labs');
const roomPlanner = require('module.roomPlanner');
const terminal = require('module.terminal');

const runTowers = require('mainModule.towers');
const runGameTimeTimers = require('mainModule.gameTimeTimers');
const repairStructures = require('mainModule.repairStructures');


function getHeadSpawn(roomName) {
  const room = Game.rooms[roomName];
  const flagMemory = Memory.flags[roomName];

  // Get HeadSpawn For RCL 6+ //
  if (!flagMemory.roomManager.headSpawn && room.spawns.length > 1 && room.terminal) {
    const spawn = room.terminal.pos.findInRange(room.spawns, 2,
      {filter: {structureType: STRUCTURE_SPAWN
      }
    });

    if (spawn[0])
    flagMemory.roomManager.headSpawn = spawn[0].id;
  }
  else if (room.spawns.length == 1)
  flagMemory.roomManager.headSpawn = room.spawns[0].id;
}

const createConstructionSiteForObject = require('function.createConstructionSite');

function createConstructionSite(memoryPath, objectId, range, controllerLevel, roomName) {
  const buildStructure = createConstructionSiteForObject.run(objectId,range,controllerLevel,roomName);
  const flagMemory = Memory.flags[roomName];

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
    const container = source.pos.findInRange(room.containers, 1)[0];
    const link = source.pos.findInRange(room.links, 2)[0];

    if ((container && link == null && flagMemory.sources.length == 2 && flagMemory.controllerLevel >= 7) || (container && link == null && flagMemory.sources.length == 1 && flagMemory.controllerLevel >= 6) || (container == null && link == null)) {
      if (createConstructionSite(`source-${i}.HasStructure`, source.id, 1, 7, roomName))
      console.log(`Building a storage for a source in room: ${room.name}`);
    }
    else if (container) {
      flagMemory.sources[i].structureId = container.id;
      flagMemory.roomManager[`source-${i}.HasStructure`] = true;
    }
    else if (link) {
      flagMemory.sources[i].structureId = link.id;
      flagMemory.roomManager[`source-${i}.HasStructure`] = true;
    }
  });
}

function getControllerStructure(roomName) {
  const room = Game.rooms[roomName];
  const flagMemory = Memory.flags[roomName];

  const container = room.controller.pos.findInRange(room.containers, 1)[0];
  const link = room.controller.pos.findInRange(room.links, 2)[0];


  if ((container && link == null && flagMemory.controllerLevel >= 6) || (container == null && link == null)) {
    if (createConstructionSite(`controller.HasStructure`, room.controller.id, 2, 7, roomName))
    console.log(`Building a storage for the controller in room: ${room.name}`);
  }
  else if (container) {
    flagMemory.controller.structure = container.id;
    flagMemory.roomManager[`controller.HasStructure`] = true;
  }
  else if (link) {
    flagMemory.controller.structure = link.id;
    flagMemory.roomManager[`controller.HasStructure`] = true;
  }
}

function createRoads(roomName) {
  const room = Game.rooms[roomName];
  const flagMemory = Memory.flags[roomName];

  const headSpawn = Game.getObjectById(flagMemory.roomManager.headSpawn);
  flagMemory.sources.forEach((source, i) => {
    const sourceObject = Game.getObjectById(source.id);

    if (headSpawn && sourceObject)
    flagMemory.sources[i].roadPath = createRoadsFunction.run(roomName,headSpawn.pos, sourceObject.pos, flagMemory.sources[i].roadPath);
  });

  const controller = room.controller;
  if (headSpawn && controller)
  flagMemory.controller.roadPath = createRoadsFunction.run(roomName,headSpawn.pos, controller.pos, flagMemory.controller.roadPath);
}


module.exports = {
  update: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    getSourceStructures(roomName);
    getControllerStructure(roomName);
    getHeadSpawn(roomName);
    roomPlanner.run(roomName);
    createRoads(roomName);
    getDamagedStructures.run(roomName);


    flagMemory.controllerLevel = room.controller.level;
    flagMemory.roomIsChecked = true;
  },

  run: function(roomName) {
    const flagMemory = Memory.flags[roomName];
    const getMainSystem = runMainSystem.run();

    // Every 1.000 Ticks Run This //
    if (Game.time % 1000 == 0 || (!flagMemory.roomIsChecked && flagMemory.IsMemorySetup)) {
      // Recheck Room //
      this.update(roomName);
    }

    // Create Variable For Shortcut of CpuTracker //
    if (flagMemory.trackers) {
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
        repairStructures.run(roomName);

        // Set the average CPU Usage in the memory //
        cpuTracker.repairStructures += Game.cpu.getUsed() - start;
      }
      else {
        // Run the part without tracking //
        repairStructures.run(roomName);
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
        terminal.update(roomName);

        // Set the average CPU Usage in the memory //
        cpuTracker.terminal += Game.cpu.getUsed() - start;
      }
      else {
        // Run the part without tracking //
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
  }
};
