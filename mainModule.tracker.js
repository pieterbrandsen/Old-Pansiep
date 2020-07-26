const deleteMemory = require("module.deleteMemory");
const checkMissingMemory = require('module.checkMissingMemory');

module.exports = {
  run: function() {
    const mainSystemMemory = Memory.mainSystem;

    function setCPUInMemory(name,startCPU,endCPU) {
      const mainDivider = 1 / mainSystemMemory.cpuAvgTicks;
      const secondairDivider = 1 - mainDivider;
      if (endCPU == undefined)
      Memory.stats[`cpuTracker.${name}`] = secondairDivider * Memory.stats[`cpuTracker.${name}`] + mainDivider * startCPU;
      else
      Memory.stats[`cpuTracker.${name}`] = secondairDivider * Memory.stats[`cpuTracker.${name}`] + mainDivider * (endCPU - startCPU);
    }

    function setCPUInMemoryModules(name,startCPU,endCPU) {
      const mainDivider = 1 / mainSystemMemory.cpuAvgTicks;
      const secondairDivider = 1 - mainDivider;
      if (endCPU == undefined)
      Memory.stats[`cpuTrackerModules.${name}`] = secondairDivider * Memory.stats[`cpuTrackerModules.${name}`] + mainDivider * startCPU;
      else
      Memory.stats[`cpuTrackerModules.${name}`] = secondairDivider * Memory.stats[`cpuTrackerModules.${name}`] + mainDivider * (endCPU - startCPU);
    }

    function setCPUInMemoryRooms(name,startCPU,endCPU,room) {
      const mainDivider = 1 / mainSystemMemory.cpuAvgTicks;
      const secondairDivider = 1 - mainDivider;
      if (endCPU == undefined)
      Memory.stats[`rooms.${room}.cpuTracker.${name}`] = secondairDivider * Memory.stats[`rooms.${room}.cpuTracker.${name}`] + mainDivider * startCPU;
      else
      Memory.stats[`rooms.${room}.cpuTracker.${name}`] = secondairDivider * Memory.stats[`rooms.${room}.cpuTracker.${name}`] + mainDivider * (endCPU - startCPU);
    }


    function mainSystem() {
      if (Memory.mainSystem) {
        if (Memory.mainSystem.cpuTracker == true) {
          return true;
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    }


    if (mainSystem()) {
      function runRoomCPUTracker(roomName) {
        const cpuTracker = Memory.flags[roomName].trackers.cpu;

        setCPUInMemory("runTowers",cpuTracker.runTowers);
        setCPUInMemory("getDamagedStructures",cpuTracker.getDamagedStructures);
        setCPUInMemory("runGameTimeTimers",cpuTracker.runGameTimeTimers);
        setCPUInMemory("checkMissingMemory",cpuTracker.checkMissingMemory);
        setCPUInMemory("runRoomManager",cpuTracker.runRoomManager);

        // setCPUInMemoryModules("harvestingModule",Memory.cpuTracker["harvesterCPU.total"]);
        // setCPUInMemoryModules("upgraderModule",Memory.cpuTracker["upgraderCPU.total"]);
        // setCPUInMemoryModules("transferModule",Memory.cpuTracker["transferCPU.total"]);
        // setCPUInMemoryModules("withdrawModuleUpgrader",Memory.cpuTracker["withdrawCPU.upgrader"]);
        // setCPUInMemoryModules("withdrawModuleNormal",Memory.cpuTracker["withdrawCPU.normal"]);
        // setCPUInMemoryModules("claimerModule",Memory.cpuTracker["claimerCPU.total"]);
        // setCPUInMemoryModules("builderModule",Memory.cpuTracker["builderCPU.total"]);
        // setCPUInMemoryModules("repairerModule",Memory.cpuTracker["repairerCPU.total"]);
        // Memory.cpuTracker["harvesterCPU.total"] = 0;
        // Memory.cpuTracker["upgraderCPU.total"] = 0;
        // Memory.cpuTracker["transferCPU.total"] = 0;
        // Memory.cpuTracker["withdrawCPU.upgrader"] = 0;
        // Memory.cpuTracker["withdrawCPU.normal"] = 0;
        // Memory.cpuTracker["claimerCPU.total"] = 0;
        // Memory.cpuTracker["builderCPU.total"] = 0;
        // Memory.cpuTracker["repairerCPU.total"] = 0;
        // Memory.cpuTracker["harvesterLDCPU.total"] = 0;
        // Memory.cpuTracker["reserverCPU.total"] = 0;
      }

      function resetTrackerMemoryInRoom(roomName) {
        const cpuTracker = Memory.flags[roomName].trackers.cpu;

        cpuTracker.runTowers = 0;
        cpuTracker.getDamagedStructures = 0;
        cpuTracker.runGameTimeTimers = 0;
        cpuTracker.checkMissingMemory = 0;
        cpuTracker.runRoomManager = 0;
      }
      function resetTrackerMemoryGlobal() {
        const cpuTracker = Memory.cpuTracker;

        cpuTracker.loadMemory = 0;
        cpuTracker.removeDeadCreepsMemory = 0;
        cpuTracker.runCreeps = 0;
        cpuTracker.cpuTracker = 0;
      }

      function runCPUTracker() {
        const cpuTracker = Memory.cpuTracker;

        setCPUInMemory("loadMemory", cpuTracker.loadMemory);
        setCPUInMemory("removeDeadCreepsMemory", cpuTracker.removeDeadCreepsMemory);
        setCPUInMemory("runCreeps", cpuTracker.runCreeps);
        setCPUInMemory("cpuTracker", cpuTracker.cpuTracker);

        Memory.stats['cpu.avg50'] = 0.98 * Memory.stats['cpu.avg50'] + 0.02 * Game.cpu.getUsed();
        Memory.stats['cpu.avg1000'] = 0.999 * Memory.stats['cpu.avg1000'] + 0.001 * Game.cpu.getUsed();
        Memory.stats['cpu.bucket'] = Game.cpu.bucket;
        Memory.stats['resources.pixel.total'] = Game.resources.pixel;
      }


      _.forEach(Object.keys(Game.rooms), function (roomName) {
        const controller = Game.rooms[roomName].controller;
        if (controller && controller.my) {
          const flagMemory = Memory.flags[roomName];
          if (!flagMemory.IsMemorySetup) {
            checkMissingMemory.run(roomName);
          }
          else {
            runRoomCPUTracker(roomName);
            resetTrackerMemoryInRoom(roomName);
          }
        }
      })

      runCPUTracker();

      resetTrackerMemoryGlobal();
    }
    else {
      if (Game.time % 500 == 0)
      deleteMemory.run();
    }
  }
}