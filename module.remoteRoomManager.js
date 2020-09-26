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
    const link = source.pos.findInRange(room.links, 2)[0];

    if ((container && link == null && flagMemory.sources.length == 2 && flagMemory.controllerLevel >= 7) || (container && link == null && flagMemory.sources.length == 1 && flagMemory.controllerLevel >= 6) || (container == null && link == null)) {
      if (createConstructionSite(`source-${i}.HasStructure`, source.id, 2, 7, roomName))
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


module.exports = {
  update: function(roomName) {
    const flagMemory = Memory.flags[roomName];

    flagMemory.roomIsChecked = true;
    getSourceStructures(roomName);
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
      }
      else
      Memory.flags[targetRoomName] = {};
    }
  }
}
