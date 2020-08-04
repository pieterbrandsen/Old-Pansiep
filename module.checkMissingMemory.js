const getAccesPoints = require('function.getAccesPoints');
const runMainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(roomName) {
    function checkMissingMemory() {
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
            // Define All Role's //
            flagMemory.rolesCount = {};
            flagMemory.rolesCount["harvester-0"] = 0;
            flagMemory.rolesCount["harvester-1"] = 0;
            flagMemory.rolesCount["transferer"] = 0;
            flagMemory.rolesCount["transfererLiTe"] = 0;
            flagMemory.rolesCount["builder"] = 0;
            flagMemory.rolesCount["upgrader"] = 0;
            flagMemory.rolesCount["repairer"] = 0;
            flagMemory.rolesCount["extractor"] = 0;
            flagMemory.rolesCount["claimer"] = 0;
            flagMemory.rolesCount["attacker"] = 0;
            flagMemory.rolesCount["builderLD"] = 0;
            flagMemory.rolesCount["ruinWithdrawer"] = 0;
            flagMemory.rolesCount["reserverLD"] = 0;
            flagMemory.rolesCount["harvesterLD-0"] = 0;
            flagMemory.rolesCount["harvesterLD-1"] = 0;
            flagMemory.rolesCount["harvesterLD-2"] = 0;
            flagMemory.rolesCount["harvesterLD-3"] = 0;
            flagMemory.rolesCount["transfererLD"] = 0;
          }
          if (!flagMemory.partsAmount) {
            // Define ALl Important Roles With Their Parts //
            flagMemory.partsAmount = {};
            flagMemory.partsAmount["harvester-0-WORK"] = 0;
            flagMemory.partsAmount["harvester-1-WORK"] = 0;
            flagMemory.partsAmount["transferer-CARRY"] = 0;
            flagMemory.partsAmount["transfererLiTe-CARRY"] = 0;
            flagMemory.partsAmount["builder-WORK"] = 0;
            flagMemory.partsAmount["upgrader-WORK"] = 0;
            flagMemory.partsAmount["repairer-WORK"] = 0;
            flagMemory.partsAmount["extractor-WORK"] = 0;
            flagMemory.partsAmount["claimer-CLAIM"] = 0;
            flagMemory.partsAmount["attacker-RANGED_ATTACK"] = 0;
            flagMemory.partsAmount["builderLD-WORK"] = 0;
            flagMemory.partsAmount["ruinWithdrawer-CARRY"] = 0;
            flagMemory.partsAmount["reserverLD-CLAIM"] = 0;
            flagMemory.partsAmount["harvesterLD-0-WORK"] = 0;
            flagMemory.partsAmount["harvesterLD-1-WORK"] = 0;
            flagMemory.partsAmount["harvesterLD-2-WORK"] = 0;
            flagMemory.partsAmount["harvesterLD-3-WORK"] = 0;
            flagMemory.partsAmount["harvesterLD-2"] = 0;
            flagMemory.partsAmount["transfererLD-CARRY"] = 0;
          }
          if (!flagMemory.trackers) {
            flagMemory.trackers = {};


            flagMemory.trackers.other = {};
            let otherTracker = flagMemory.trackers.other;



            flagMemory.trackers.cpu = {};
            let cpuTracker = flagMemory.trackers.cpu;
            cpuTracker.runTowers = 0;
            cpuTracker.getDamagedStructures = 0;
            cpuTracker.runGameTimeTimers = 0;
            cpuTracker.checkMissingMemory = 0;
            cpuTracker.runRoomManager = 0;
            cpuTracker.runRoomCPUTracker = 0;

            flagMemory.trackers.cpuModule = {};
            let cpuTrackerModule = flagMemory.trackers.cpuModule;
            cpuTrackerModule.harvestingModule = 0;
            cpuTrackerModule.upgraderModule = 0;
            cpuTrackerModule.transferModule = 0;
            cpuTrackerModule.withdrawModuleUpgrader = 0;
            cpuTrackerModule.withdrawModuleNormal = 0;
            cpuTrackerModule.claimerModule = 0;
            cpuTrackerModule.builderModule = 0;
            cpuTrackerModule.repairerModule = 0;

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

    // Run Module //
    checkMissingMemory();
  }
};
