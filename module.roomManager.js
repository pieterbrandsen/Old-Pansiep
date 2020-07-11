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
          flagMemory.roomManager.sources = {};
          mememoryAmountMissing++;
        }
        else {
          const sources = room.find(FIND_SOURCES)
          sources.forEach((item, i) => {
            if (!flagMemory.roomManager.sources[i]) {
              flagMemory.roomManager.sources[i] = {};
              mememoryAmountMissing++;
            }
          });
        }

        if (!flagMemory.roomManager.controllerStorage) {
          flagMemory.roomManager.controllerStorage = {}
          mememoryAmountMissing++;
        }
        else {

        }


        return mememoryAmountMissing
      }

      if (checkIfMemoryIsSetup() == 0) {
        return true;
      }
    }
  }
}
