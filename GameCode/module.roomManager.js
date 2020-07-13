const createConstructionSite = require('function.createConstructionSite')

module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    function createConstructionSite(memoryPath, objectId, range, controllerLevel) {
      if (createConstructionSite.run(objectId,range,controllerLevel,roomName)) {
        flagMemory.roomManager[memoryPath] = true;
      }
      else
        flagMemory.roomManager[memoryPath] = false;
    }

    room.find(FIND_SOURCES).forEach((source, i) => {
      if (flagMemory.roomManager.sources[i].HasStructure == false) {
        if (createConstructionSite(`source-${i}.HasStructure`, item.id,2, 7))
          flagMemory.roomManager.sources[i].HasStructure = true
          console.log("Building a storage for a source in room: " + room.name)
        }
        else {
          console.log("Failed to build a storage for a source in room: " + room.name)
        }
      }
    });

    if (flagMemory.roomManager.controllerStorage.HasStructure == false) {
      if (createConstructionSite(`source-${i}.HasStructure`, room.controller.id, 3, 6))
        flagMemory.roomManager.controllerStorage.HasStructure = true;
        console.log("Building a storage for the controller in room: " + room.name)
      }
      else {
        console.log("Failed to build a storage for the controller in room: " + room.name)
      }
    }
  }
}
