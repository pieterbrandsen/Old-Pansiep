const deleteMemory = require("module.deleteMemory");
const checkMissingMemory = require('module.checkMissingMemory');

module.exports = {
  run: function() {
    const mainSystemMemory = Memory.mainSystem;

    function setCPUInMemory(name,startCPU,endCPU) {
      // Get The Percentage Of What This CPU Tick Is In Avg //
      const mainDivider = 1 / mainSystemMemory.cpuAvgTicks;
      const secondairDivider = 1 - mainDivider;

      // If EndCPU Is Included //
      if (endCPU == undefined)
      Memory.stats[`cpuTracker.${name}`] = secondairDivider * Memory.stats[`cpuTracker.${name}`] + mainDivider * startCPU;
      else
      Memory.stats[`cpuTracker.${name}`] = secondairDivider * Memory.stats[`cpuTracker.${name}`] + mainDivider * (endCPU - startCPU);
    }

    function setCPUInMemoryModules(name,startCPU,endCPU) {
      // Get The Percentage Of What This CPU Tick Is In Avg //
      const mainDivider = 1 / mainSystemMemory.cpuAvgTicks;
      const secondairDivider = 1 - mainDivider;

      // If EndCPU Is Included //
      if (endCPU == undefined)
      Memory.stats[`cpuTrackerModules.${name}`] = secondairDivider * Memory.stats[`cpuTrackerModules.${name}`] + mainDivider * startCPU;
      else
      Memory.stats[`cpuTrackerModules.${name}`] = secondairDivider * Memory.stats[`cpuTrackerModules.${name}`] + mainDivider * (endCPU - startCPU);
    }

    function setCPUInMemoryRooms(name,startCPU,endCPU,room) {
      // Get The Percentage Of What This CPU Tick Is In Avg //
      const mainDivider = 1 / mainSystemMemory.cpuAvgTicks;
      const secondairDivider = 1 - mainDivider;

      // If EndCPU Is Included //
      if (endCPU == undefined)
      Memory.stats[`rooms.${room}.cpuTracker.${name}`] = secondairDivider * Memory.stats[`rooms.${room}.cpuTracker.${name}`] + mainDivider * startCPU;
      else
      Memory.stats[`rooms.${room}.cpuTracker.${name}`] = secondairDivider * Memory.stats[`rooms.${room}.cpuTracker.${name}`] + mainDivider * (endCPU - startCPU);
    }


    function mainSystem() {
      // If Memory.mainSystem Is Defined //
      if (Memory.mainSystem) {
        // If CpuTracking Is Enabled
        if (Memory.mainSystem.cpuTracker == true)
        return true;
        else
        return false;
      }
      else
      return false;
    }

    // Check If Tracking Is Enabled //
    if (mainSystem()) {
      function runTracker() {
        runCPUTracker();
        resetTrackerMemoryGlobal();
      }

      function runRoomTracker(roomName) {
        runRoomCPUTracker(roomName);
        resetTrackerMemoryInRoom(roomName);
      }

      function runRoomCPUTracker(roomName) {
        // Define Memory ShortCut //
        const cpuTracker = Memory.flags[roomName].trackers.cpu;

        // Enter This Tick CPU In Memory //
        setCPUInMemory("runTowers",cpuTracker.runTowers);
        setCPUInMemory("getDamagedStructures",cpuTracker.getDamagedStructures);
        setCPUInMemory("runGameTimeTimers",cpuTracker.runGameTimeTimers);
        setCPUInMemory("checkMissingMemory",cpuTracker.checkMissingMemory);
        setCPUInMemory("runRoomManager",cpuTracker.runRoomManager);
      }

      function runCPUTracker() {
        // Define Memory ShortCut //
        const cpuTracker = Memory.cpuTracker;

        // Enter This Tick CPU In Memory //
        setCPUInMemory("loadMemory", cpuTracker.loadMemory);
        setCPUInMemory("removeDeadCreepsMemory", cpuTracker.removeDeadCreepsMemory);
        setCPUInMemory("runCreeps", cpuTracker.runCreeps);
        setCPUInMemory("cpuTracker", cpuTracker.cpuTracker);

        // Global Tracking //
        Memory.stats['cpu.avg50'] = 0.98 * Memory.stats['cpu.avg50'] + 0.02 * Game.cpu.getUsed();
        Memory.stats['cpu.avg1000'] = 0.999 * Memory.stats['cpu.avg1000'] + 0.001 * Game.cpu.getUsed();
        Memory.stats['cpu.bucket'] = Game.cpu.bucket;
        Memory.stats['resources.pixel.total'] = Game.resources.pixel;
      }

      function resetTrackerMemoryInRoom(roomName) {
        // Define Memory ShortCut //
        const cpuTracker = Memory.flags[roomName].trackers.cpu;

        // Reset Memory //
        Object.keys(cpuTracker).forEach((item, i) => {
          cpuTracker[item] = 0;
        });
        // cpuTracker.runTowers = 0;
        // cpuTracker.getDamagedStructures = 0;
        // cpuTracker.runGameTimeTimers = 0;
        // cpuTracker.checkMissingMemory = 0;
        // cpuTracker.runRoomManager = 0;
      }
      function resetTrackerMemoryGlobal() {
        // Define Memory ShortCut //
        const cpuTracker = Memory.cpuTracker;

        // Reset Memory //
        Object.keys(cpuTracker).forEach((item, i) => {
          cpuTracker[item] = 0;
        });
        // cpuTracker.loadMemory = 0;
        // cpuTracker.removeDeadCreepsMemory = 0;
        // cpuTracker.runCreeps = 0;
        // cpuTracker.cpuTracker = 0;
      }


      _.forEach(Object.keys(Game.rooms), function (roomName) {
        // Define Variables //
        const controller = Game.rooms[roomName].controller;

        // If Room Is Ours //
        if (controller && controller.my) {
          // Get FlagMemory
          const flagMemory = Memory.flags[roomName];
          // Check If Memory Is Setup, If Not Fill Empty Memory //
          if (!flagMemory.IsMemorySetup)
          checkMissingMemory.run(roomName);
          else {
            // Run Tracker //
            runRoomTracker(roomName)
          }
        }
      })

      runTracker();
    }
    else {
      if (Game.time % 500 == 0)
      deleteMemory.run();
    }
  }
}
