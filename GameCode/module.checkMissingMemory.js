module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

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


    if (!flagMemory.roomManager) {
      flagMemory.roomManager = {};
    }
    else {
      function checkIfMemoryIsSetup() {
        let mememoryAmountMissing = 0;

        if (!flagMemory.roomManager.sources) {
          flagMemory.roomManager.sources = [];
          mememoryAmountMissing++;
        }
        else {
          const sources = room.find(FIND_SOURCES)
          sources.forEach((item, i) => {
            if (!flagMemory.sources) {
              flagMemory.sources = [];
              mememoryAmountMissing++;
            }
            else {
              flagMemory.sources[i] = {}
              flagMemory.sources[i].id = item.id;
              flagMemory.sources[i].openSpots = getOpenSpotsNearSource(Game.getObjectById(sources[i].id));
              mememoryAmountMissing++;
            }


            if (!flagMemory.roomManager.sources[i]) {
              flagMemory.roomManager.sources[i] = {};
              mememoryAmountMissing++;
            }
            else {
              flagMemory.roomManager.sources[i].HasStructure = false
              mememoryAmountMissing++;
            }
          });
        }

        if (!flagMemory.roomManager.controllerStorage) {
          flagMemory.roomManager.controllerStorage = {}
          mememoryAmountMissing++;
        }
        else {
          flagMemory.roomManager.controllerStorage.HasStructure = false
          mememoryAmountMissing++;
        }


        if (!flagMemory.sources)
        flagMemory.sources = [];
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



        return mememoryAmountMissing
      }

      if (checkIfMemoryIsSetup() == 0) {
        flagMemory.IsMemorySetup = true;
      }
    }
  }
}
