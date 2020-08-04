const getAccesPoints = require('function.getAccesPoints');

module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
    const mainSystemMemory = Memory.mainSystem;

    let missingMemoryString = `${roomName} is missing the following memory: `;
    let filledMemoryString = `${roomName} got the following memory: `;
    let roomIsMissingMemory = false;

    if (!Memory.flags)
    Memory.flags = {};
    if (!Memory.stats)
    Memory.stats = {};
    if (!Memory.cpuTracker) {
      Memory.cpuTracker = {};
      Memory.cpuTracker.loadMemory = 0;
      Memory.cpuTracker.removeDeadCreepsMemory = 0;
      Memory.cpuTracker.runCreeps = 0;
      Memory.cpuTracker.cpuTracker = 0;
    }
    if (!Memory.mainSystem) {
      Memory.mainSystem = {};
      Memory.mainSystem.cpuTracker = true;
      Memory.mainSystem.cpuAvgTicks = 100;
      Memory.mainSystem.performanceTracker = true;
      Memory.mainSystem.performanceAvgTicks = 10000;
    }
    if (!Memory.performanceTracker)
    Memory.performanceTracker = {};
    if (!Memory.outpostMemory)
    Memory.outpostMemory = {};

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
            flagMemory.sources[i].openSpots = getAccesPoints.run(item.pos.x,item.pos.y, roomName)[0]
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
        if (!flagMemory.trackers) {
          flagMemory.trackers = {};


          flagMemory.trackers.other = {};
          let otherTracker = flagMemory.trackers.other;



          flagMemory.trackers.cpu = {};

          flagMemory.trackers.cpuModule = {};

          flagMemory.trackers.performance = {};
          const performanceTracker = flagMemory.trackers.performance;
        }


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
