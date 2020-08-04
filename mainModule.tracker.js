const deleteMemory = require("module.deleteMemory");
const checkMissingMemory = require('module.checkMissingMemory');
const runMainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function() {
    // Get The Variables Needed For Module //
    const getMainSystem = runMainSystem.run();
    const mainSystemMemory = Memory.mainSystem;
    let test = 0;

    function setCPUInMemory(name,inputCPU) {
      // Get The Percentage Of What This CPU Tick Is In Avg //
      const mainDivider = 1 / mainSystemMemory.cpuAvgTicks;
      const secondairDivider = 1 - mainDivider;

      // Enter Average In Memory //
      //console.log(inputCPU)
      Memory.stats[`cpuTracker.${name}`] = secondairDivider * Memory.stats[`cpuTracker.${name}`] + mainDivider * inputCPU;
    }

    function setCPUInMemoryModules(name,inputCPU) {
      // Get The Percentage Of What This CPU Tick Is In Avg //
      const mainDivider = 1 / mainSystemMemory.cpuAvgTicks;
      const secondairDivider = 1 - mainDivider;

      // Enter Average In Memory //
      Memory.stats[`cpuTrackerModules.${name}`] = secondairDivider * Memory.stats[`cpuTrackerModules.${name}`] + mainDivider * inputCPU;
    }

    function setCPUInMemoryRooms(name,inputCPU,room) {
      // Get The Percentage Of What This CPU Tick Is In Avg //
      const mainDivider = 1 / mainSystemMemory.cpuAvgTicks;
      const secondairDivider = 1 - mainDivider;

      // Enter Average In Memory //
      Memory.stats[`rooms.${room}.cpuTracker.${name}`] = secondairDivider * Memory.stats[`rooms.${room}.cpuTracker.${name}`] + mainDivider * inputCPU;
    }

    function setModuleCPUInMemoryRooms(name,inputCPU,room) {
      // Get The Percentage Of What This CPU Tick Is In Avg //
      const mainDivider = 1 / mainSystemMemory.cpuAvgTicks;
      const secondairDivider = 1 - mainDivider;

      // Enter Average In Memory //
      Memory.stats[`rooms.${room}.cpuTrackerModules.${name}`] = secondairDivider * Memory.stats[`rooms.${room}.cpuTrackerModules.${name}`] + mainDivider * inputCPU;
    }



    function resetTrackerMemoryInRoom(roomName) {
      // Define Memory ShortCut //
      const cpuTrackerMain = Memory.flags[roomName].trackers.cpu;
      const cpuTrackerModules = Memory.flags[roomName].trackers.cpuModule;


      // Reset Memory //
      if (cpuTrackerMain) {
        Object.keys(cpuTrackerMain).forEach((item, i) => {
          cpuTrackerMain[item] = 0;
        });
      }
      if (cpuTrackerModules) {
        Object.keys(cpuTrackerModules).forEach((item, i) => {
          cpuTrackerModules[item] = 0;
        });
      }
    }
    function resetTrackerMemoryGlobal() {
      // Define Memory ShortCut //
      const cpuTracker = Memory.cpuTracker;

      // Reset Memory //
      if (cpuTracker) {
        Object.keys(cpuTracker).forEach((item, i) => {
          cpuTracker[item] = 0;
        });
      }
    }

    // Check If Tracking Is Enabled //
    if (getMainSystem) {
      function runTracker() {
        runCPUTracker();
        resetTrackerMemoryGlobal();
      }

      function runRoomTracker(roomName) {
        runRoomCPUTracker(roomName);
        resetTrackerMemoryInRoom(roomName);
        roomPerformance(roomName);
      }

      function runRoomCPUTracker(roomName) {
        // Define Memory ShortCut //
        const cpuTrackerMain = Memory.flags[roomName].trackers.cpu;
        const cpuTrackerModules = Memory.flags[roomName].trackers.cpuModule;

        // Enter This Tick CPU In Memory //
        Object.keys(cpuTrackerMain).forEach((item, i) => {
          setCPUInMemoryRooms(item,cpuTrackerMain[item],roomName);
        });
        Object.keys(cpuTrackerModules).forEach((item, i) => {
          setModuleCPUInMemoryRooms(item,cpuTrackerModules[item],roomName);
        });
      }

      function roomPerformance(roomName) {
        const performanceTracker = Memory.flags[roomName].trackers.performance;
        Object.keys(performanceTracker).forEach((item, i) => {
          Memory.stats[`rooms.${roomName}.performanceTracker.${item}`] = performanceTracker[item];
        });

      }

      function runCPUTracker() {
        // Define Memory ShortCut //
        const cpuTracker = Memory.cpuTracker;

        // Enter This Tick CPU In Memory //
        Object.keys(cpuTracker).forEach((item, i) => {
          setCPUInMemory(item,cpuTracker[item]);
        });

        // Global Tracking //
        Memory.stats['cpu.avg50'] = 0.98 * Memory.stats['cpu.avg50'] + 0.02 * Game.cpu.getUsed();
        Memory.stats['cpu.avg1000'] = 0.999 * Memory.stats['cpu.avg1000'] + 0.001 * Game.cpu.getUsed();
        Memory.stats['cpu.bucket'] = Game.cpu.bucket;
        Memory.stats['resources.pixel.total'] = Game.resources.pixel;
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
      if (Game.time % 500 == 0) {
        console.log("All Tracker Memory Is Being Reset.")
        resetTrackerMemoryGlobal();

        const statsTracker = Memory.stats;
        if (statsTracker) {
          Object.keys(statsTracker).forEach((item, i) => {
            statsTracker[item] = 0;
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
              // Reset Tracker //
              resetTrackerMemoryInRoom(roomName);
            }
          }
        })
      }
    }
  }
}
