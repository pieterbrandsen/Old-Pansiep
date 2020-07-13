const createConstructionSiteForObject = require('function.createConstructionSite');

module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    function createConstructionSite(memoryPath, objectId, range, controllerLevel) {
      if (!createConstructionSiteForObject.run(objectId,range,controllerLevel,roomName)) {
        flagMemory.roomManager[memoryPath] = true;
      }
      else
        flagMemory.roomManager[memoryPath] = false;
    }

    room.find(FIND_SOURCES).forEach((source, i) => {
      if (flagMemory.roomManager[`source-${i}.HasStructure`] == false) {
        if (createConstructionSite(`source-${i}.HasStructure`, source.id, 2, 7)) {
          console.log("Building a storage for a source in room: " + room.name)
        }
      }
    });

    if (flagMemory.roomManager[`controller.HasStructure`] == false) {
      if (createConstructionSite(`controller.HasStructure`, room.controller.id, 3, 6)) {
        console.log("Building a storage for the controller in room: " + room.name)
      }
    }
  }
}
