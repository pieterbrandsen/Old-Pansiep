const checkMissingMemory = require('module.checkMissingMemory');

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

    if (container == null) {
      if (createConstructionSite(`source-${i}.HasStructure`, source.id, 1, 7, roomName))
      console.log(`Building a storage for a source in room: ${room.name}`);
    }
    else if (container) {
      flagMemory.sources[i].structureId = container.id;
      flagMemory.roomManager[`source-${i}.HasStructure`] = true;
    }
  });
}

const createRoadsFunction = require('function.createRoads');
function createRoads(roomName) {
  const room = Game.rooms[roomName];
  const flagMemory = Memory.flags[roomName];

  const spawnRoomFlagMemory = Memory.flags[flagMemory.spawnRoom];
  const headSpawn = Game.getObjectById(spawnRoomFlagMemory.roomManager.headSpawn);
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
    const flagMemory = Memory.flags[roomName];

    flagMemory.roomIsChecked = true;
    getSourceStructures(roomName);
    createRoads(roomName);
  },

  setup: function(creepName) {
    const creep = Game.creeps[creepName];
    if (creep) {
      // Define The Flag And Memory Of The TargetRoom //
      const targetFlag = Game.flags[creep.memory.flagName];
      const targetFlagMemory = Memory.flags[creep.memory.flagName];

      // Define TargetRoom And The Room Where The Creep Currently Is In //
      const currentRoomName = creep.room.name;
      const targetRoomName = targetFlagMemory.targetRoom;
      const targetRoom = Game.rooms[targetRoomName];

      // If TargetFlagMemory Is Missing The TargetRoom, Define It Using The TargetRoomName //
      if (!targetFlagMemory.targetRoom) targetFlagMemory.targetRoom = targetRoomName;
      // If TargetFlagMemory Is Missing The SourceAmount, Define It By Counting The Source's That Are In The Target Room //
      if (!targetFlagMemory.sourceAmount) targetFlagMemory.sourceAmount = targetRoom.find(FIND_SOURCES).length;
      // If TargetFlagMemory Has Not Listed Yet In The Memory That It Finished The Work, Return True //
      // Reset Also The Room Flag Memory To Be Sure All The Memory Is In The Room //
      if (!targetFlagMemory.IsMemorySetup) {
        targetFlagMemory.IsMemorySetup = true;
        Memory.flags[targetRoomName] = {};
      }

      if (Memory.flags[targetRoomName]) {
        // If Room's FlagMemory Has Not Listed Yet In The Memory That It Finished The Work, Return True //
        if (!Memory.flags[targetRoomName].IsMemorySetup) checkMissingMemory.setup(targetRoomName);
        if (!Memory.flags[targetRoomName].spawnRoom) Memory.flags[targetRoomName].spawnRoom = creep.memory.spawnRoom;
      }
      else
      Memory.flags[targetRoomName] = {};
    }
  }
}
