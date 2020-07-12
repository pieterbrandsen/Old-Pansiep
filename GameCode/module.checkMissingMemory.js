module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
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
            if (!flagMemory.roomManager.sources[i]) {
              flagMemory.roomManager.sources[i] = {};
              mememoryAmountMissing++;
            }
            else {
              flagMemory.roomManager.sources[0].HasStructure = false
            }
          });
        }

        if (!flagMemory.roomManager.controllerStorage) {
          flagMemory.roomManager.controllerStorage = {}
          mememoryAmountMissing++;
        }
        else {
          flagMemory.roomManager.controllerStorage.HasStructure = false
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
