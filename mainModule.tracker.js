const deleteMemory = require("module.deleteMemory");
const checkMissingMemory = require('module.checkMissingMemory');
const mainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function() {
    // Get the variables needed for module //
    const mainSystemMemory = Memory.mainSystem;
    const runMainSystem = mainSystem.run();

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

    function setCPUInMemoryRooms(name,cpuUsage,roomName) {
      // Get The Percentage Of What This CPU Tick Is In Avg //
      const mainDivider = 1 / mainSystemMemory.cpuAvgTicks;
      const secondairDivider = 1 - mainDivider;

      Memory.stats[`rooms.${roomName}.cpuTracker.${name}`] = secondairDivider * Memory.stats[`rooms.${roomName}.cpuTracker.${name}`] + mainDivider * cpuUsage;
    }


    // Check If Tracking Is Enabled //
    if (runMainSystem) {
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

        // MainModules //
        setCPUInMemoryRooms("runTowers",cpuTracker.runTowers, roomName);
        setCPUInMemoryRooms("getDamagedStructures",cpuTracker.getDamagedStructures, roomName);
        setCPUInMemoryRooms("runGameTimeTimers",cpuTracker.runGameTimeTimers, roomName);
        setCPUInMemoryRooms("checkMissingMemory",cpuTracker.checkMissingMemory, roomName);
        setCPUInMemoryRooms("runRoomManager",cpuTracker.runRoomManager, roomName);

        // Modules //
        setCPUInMemoryRooms("builderModule",cpuTracker.builderModule, roomName);
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
      }
      function resetTrackerMemoryGlobal() {
        // Define Memory ShortCut //
        const cpuTracker = Memory.cpuTracker;

        // Reset Memory //
        Object.keys(cpuTracker).forEach((item, i) => {
          cpuTracker[item] = 0;
        });
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
      });

      runTracker();
    }
    else {
      if (Game.time % 500 == 0)
      deleteMemory.run();
    }
  }
}
