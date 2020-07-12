module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
    let missingMemoryString = `${roomName} is missing the following memory: `;
    let filledMemoryString = `${roomName} filled the following memory: `;

    function enterValueInMemory(memoryPath, inputValue) {
      flagMemory[`.${memoryPath}` = inputValue;
      if (flagMemory.memoryPath) {
        console.log(true)
      }
      else {
        console.log(false)
      }
    }
    enterValueInMemory('test', true)


    function getOpenSpotsNearSource(source) {
      const terrain = new Room.Terrain(roomName);
      const sourcePos = source.pos;
      let sourcePosX;
      let sourcePosY;
      let count = 8;

      sourcePosX = source.pos.x-1;
      sourcePosY = source.pos.y-1;
      if (terrain.get(sourcePosX,sourcePosY) == 1)
      count--;

      sourcePosX = source.pos.x;
      sourcePosY = source.pos.y-1;
      if (terrain.get(sourcePosX,sourcePosY) == 1)
      count--;

      sourcePosX = source.pos.x+1;
      sourcePosY = source.pos.y-1;
      if (terrain.get(sourcePosX,sourcePosY) == 1)
      count--;

      sourcePosX = source.pos.x-1;
      sourcePosY = source.pos.y;
      if (terrain.get(sourcePosX,sourcePosY) == 1)
      count--;

      sourcePosX = source.pos.x+1;
      sourcePosY = source.pos.y;
      if (terrain.get(sourcePosX,sourcePosY) == 1)
      count--;

      sourcePosX = source.pos.x-1;
      sourcePosY = source.pos.y+1;
      if (terrain.get(sourcePosX,sourcePosY) == 1)
      count--;

      sourcePosX = source.pos.x;
      sourcePosY = source.pos.y+1;
      if (terrain.get(sourcePosX,sourcePosY) == 1)
      count--;

      sourcePosX = source.pos.x+1;
      sourcePosY = source.pos.y+1;
      if (terrain.get(sourcePosX,sourcePosY) == 1)
      count--;

      return count;
    }


    // if (!flagMemory.roomManager) {
    //   flagMemory.roomManager = {};
    // }
    // else {
    //   function checkIfMemoryIsSetup() {
    //     let memoryAmountMissing = 0;
    //
    //     if (!flagMemory.roomManager.sources) {
    //       flagMemory.roomManager.sources = [];
    //       missingMemoryString.concat(".sources, ")
    //       memoryAmountMissing++;
    //     }
    //     else {
    //       if (!flagMemory.sources) {
    //         flagMemory.sources = [];
    //         missingMemoryString.concat(`flagMemory.sources[${i}], `)
    //       }
    //       else {
    //         const sources = room.find(FIND_SOURCES)
    //         sources.forEach((item, i) => {
    //           if (!flagMemory.sources[i]) {
    //             flagMemory.sources[i] = {}
    //             flagMemory.sources[i].id = item.id;
    //             flagMemory.sources[i].openSpots = getOpenSpotsNearSource(Game.getObjectById(sources[i].id));
    //             memoryAmountMissing++;
    //           }
    //
    //
    //           if (!flagMemory.roomManager.sources[i]) {
    //             flagMemory.roomManager.sources[i] = {};
    //             memoryAmountMissing++;
    //           }
    //           else {
    //             if (!flagMemory.roomManager.sources[i].HasStructure) {
    //               memoryAmountMissing++;
    //               flagMemory.roomManager.sources[i].HasStructure = false
    //             }
    //           }
    //         })
    //       }
    //     };
    //
    //
    //     if (!flagMemory.roomManager.controllerStorage) {
    //       flagMemory.roomManager.controllerStorage = {};
    //       memoryAmountMissing++;
    //     }
    //     else {
    //       if (!flagMemory.roomManager.controllerStorage.HasStructure) {
    //         memoryAmountMissing++;
    //         flagMemory.roomManager.controllerStorage.HasStructure = false;
    //       }
    //     }
    //
    //
    //     if (!flagMemory.links)
    //     flagMemory.links = {};
    //     if (!flagMemory.controllerLevel)
    //     flagMemory.controllerLevel = 0;
    //     if (!flagMemory.constructionSitesAmount)
    //     flagMemory.constructionSitesAmount = room.find(FIND_CONSTRUCTION_SITES).length;
    //     if (!flagMemory.enemyCount)
    //     flagMemory.enemyCount = 0;
    //     if (!flagMemory.repairTarget)
    //     flagMemory.repairTarget = [];
    //     if (!flagMemory.creepAmount)
    //     flagMemory.creepAmount = {};
    //
    //     console.log(memoryAmountMissing)
    //     return memoryAmountMissing
    //   }
    //
    //   if (checkIfMemoryIsSetup() == 0) {
    //     flagMemory.IsMemorySetup = true;
    //   }
    // }
  }
}
