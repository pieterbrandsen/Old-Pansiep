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
      }
      else if (buildStructure[1]) {
        flagMemory.roomManager[memoryPath] = true;
      }
      else
        flagMemory.roomManager[memoryPath] = false;
    }

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
}
