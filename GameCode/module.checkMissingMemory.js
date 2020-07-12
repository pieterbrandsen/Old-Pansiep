module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
    let missingMemoryString = `${roomName} is missing the following memory: `;
    let filledMemoryString = `${roomName} got the following memory: `;
    let roomIsMissingMemory = false;

    function enterValueInMemory(memoryPath, inputValue) {
      flagMemory.roomManager[memoryPath] = inputValue;
      if (flagMemory.roomManager[memoryPath]) {
        missingMemoryString = missingMemoryString.concat(`${memoryPath}, `)
        roomIsMissingMemory = true;
      }
      else {
        filledMemoryString = filledMemoryString.concat(`${memoryPath}, `)
      }
    }


    function getOpenSpotsNearSource(sourceId) {
      const source = Game.getObjectById(sourceId);
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


    if (!flagMemory.roomManager) {
      flagMemory.roomManager = {};
    }
    else {
      function checkIfMemoryIsSetup() {
        if (!flagMemory.sources)
        flagMemory.sources = [];

        room.find(FIND_SOURCES).forEach((item, i) => {
          if (!flagMemory.sources[i]) {
            flagMemory.sources[i] = {}
            flagMemory.sources[i].id = item.id;
            flagMemory.sources[i].openSpots = getOpenSpotsNearSource(item.id);
          }

          enterValueInMemory(`source-${i}.HasStructure`, false)
        })

        enterValueInMemory(`controller.HasStructure`, false)



        if (!flagMemory.links)
        flagMemory.links = {};
        if (!flagMemory.controllerLevel)
        flagMemory.controllerLevel = 0;
        if (!flagMemory.constructionSitesAmount)
        flagMemory.constructionSitesAmount = room.find(FIND_CONSTRUCTION_SITES).length;
        if (!flagMemory.enemyCount)
        flagMemory.enemyCount = 0;
        if (!flagMemory.repairTarget)
        flagMemory.repairTarget = [];
        if (!flagMemory.creepAmount)
        flagMemory.creepAmount = {};


        console.log(missingMemoryString);
        console.log(filledMemoryString);
        console.log()
        return roomIsMissingMemory
      };

      if (!checkIfMemoryIsSetup()) {
        flagMemory.IsMemorySetup = true;
      }
    }
  }
};
