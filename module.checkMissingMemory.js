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
        if (!flagMemory.rolesCount) {
          flagMemory.rolesCount = {};
          flagMemory.rolesCount["transferer"] = 0;
          flagMemory.rolesCount["transfererLiTe"] = 0;
          flagMemory.rolesCount["builder"] = 0;
          flagMemory.rolesCount["upgrader"] = 0;
          flagMemory.rolesCount["repairer"] = 0;
          flagMemory.rolesCount["extractor"] = 0;
          flagMemory.rolesCount["claimer"] = 0;
        }

        if (!flagMemory.partsAmount) {
          flagMemory.partsAmount = {};
          flagMemory.partsAmount["transferer-CARRY"] = 0;
          flagMemory.partsAmount["harvester-0-WORK"] = 0;
          flagMemory.partsAmount["harvester-1-WORK"] = 0;
          flagMemory.partsAmount["builder-WORK"] = 0;
          flagMemory.partsAmount["upgrader-WORK"] = 0;
        }
        if (!flagMemory.trackers) {
          flagMemory.trackers = {};


          flagMemory.trackers.other = {};
          let otherTracker = flagMemory.trackers.other;



          flagMemory.trackers.cpu = {};
          let cpuTracker = flagMemory.trackers.cpu;
          // MainModules //
          cpuTracker.runTowers = 0;
          cpuTracker.getDamagedStructures = 0;
          cpuTracker.runGameTimeTimers = 0;
          cpuTracker.checkMissingMemory = 0;
          cpuTracker.runRoomManager = 0;
          cpuTracker.runRoomCPUTracker = 0;

          // Modules //
          cpuTracker.harvestingModule = 0;
          cpuTracker.upgraderModule = 0;
          cpuTracker.transferModule = 0;
          cpuTracker.withdrawModuleUpgrader = 0;
          cpuTracker.withdrawModuleNormal = 0;
          cpuTracker.claimerModule = 0;
          cpuTracker.builderModule = 0;
          cpuTracker.repairerModule = 0;

          // MiniModules //
          cpuTracker.getCreepState = 0;
          cpuTracker.mainSystem = 0;
          

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
