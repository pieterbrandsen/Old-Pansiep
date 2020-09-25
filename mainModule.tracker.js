const deleteMemory = require("module.deleteMemory");
const checkMissingMemory = require('module.checkMissingMemory');
const runMainSystem = require('function.mainSystem');

module.exports = {
  run: function() {
    // Get The Variables Needed For Module //
    const getMainSystem = runMainSystem.run();
    const mainSystemMemory = Memory.mainSystem;

    function setCPUInMemory(name,inputCPU) {
      // Get The Percentage Of What This CPU Tick Is In Avg //
      const mainDivider = 1 / mainSystemMemory.cpuAvgTicks;
      const secondairDivider = 1 - mainDivider;

      // Enter Average In Memory //
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


    function setPerformanceInMemory(name,currentTickPerformance) {
      const mainDivider = 1 / Memory.mainSystem.performanceAvgTicks;
      const secondairDivider = 1 - mainDivider;
      Memory.stats[`performanceTracker.${name}`] = secondairDivider * Memory.stats[`performanceTracker.${name}`] + mainDivider * currentTickPerformance;
    }

    function setPerformanceInMemoryRooms(name,currentTickPerformance,room, noAverage) {
      const mainDivider = 1 / Memory.mainSystem.performanceAvgTicks;
      const secondairDivider = 1 - mainDivider;

      if (!noAverage)
      Memory.stats[`rooms.${room}.performance.${name}`] = secondairDivider * Memory.stats[`rooms.${room}.performance.${name}`] + mainDivider * currentTickPerformance;
      else
      Memory.stats[`rooms.${room}.grafana.${name}`] = currentTickPerformance;
    }
    function setSpawnerPerformanceInMemoryRooms(name,currentTickPerformance,room) {
      const mainDivider = 1 / Memory.mainSystem.performanceAvgTicks;
      const secondairDivider = 1 - mainDivider;

      Memory.stats[`rooms.${room}.spawner.${name}`] = secondairDivider * Memory.stats[`rooms.${room}.spawner.${name}`] + mainDivider * currentTickPerformance;
    }
    function setCreepCPUInMemoryRooms(name,currentTickPerformance,room) {
      const mainDivider = 1 / Memory.mainSystem.performanceAvgTicks;
      const secondairDivider = 1 - mainDivider;

      Memory.stats[`rooms.${room}.cpuTrackerCreeps.${name}`] = secondairDivider * Memory.stats[`rooms.${room}.cpuTrackerCreeps.${name}`] + mainDivider * currentTickPerformance;
    }


    function resetTrackerMemoryInRoom(roomName) {
      // Define Memory ShortCut //
      const cpuTrackerMain = Memory.flags[roomName].trackers.cpu;
      const cpuTrackerModules = Memory.flags[roomName].trackers.cpuModule;
      const performanceTracker = Memory.flags[roomName].trackers.performance;
      const spawnerTracker = Memory.flags[roomName].trackers.spawner;
      const creepCPUTracker = Memory.flags[roomName].trackers.cpuCreeps;


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
      if (performanceTracker) {
        Object.keys(performanceTracker).forEach((item, i) => {
          performanceTracker[item] = 0;
        });
      }
      if (spawnerTracker) {
        Object.keys(spawnerTracker).forEach((item, i) => {
          spawnerTracker[item] = 0;
        });
      }
      if (creepCPUTracker) {
        Object.keys(creepCPUTracker).forEach((item, i) => {
          creepCPUTracker[item] = 0;
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

    function setRoomTrackingInMemory(roomName) {
      if (Memory.flags[roomName].IsMemorySetup) {
        // Define Memory ShortCut //
        const cpuTrackerMain = Memory.flags[roomName].trackers.cpu;
        const cpuTrackerModules = Memory.flags[roomName].trackers.cpuModule;
        const performanceTracker = Memory.flags[roomName].trackers.performance;
        const roomTracker = Memory.flags[roomName].trackers.room;
        const spawnerTracker = Memory.flags[roomName].trackers.spawner;
        const creepCPUTracker = Memory.flags[roomName].trackers.cpuCreeps;
        const creepAmountTracker = Memory.flags[roomName].rolesCount;
        const creepPartsTracker = Memory.flags[roomName].partsAmount;

        // Enter This Tick CPU In Memory //
        Object.keys(cpuTrackerMain).forEach((item, i) => {
          setCPUInMemoryRooms(item,cpuTrackerMain[item],roomName);
        });
        Object.keys(cpuTrackerModules).forEach((item, i) => {
          setModuleCPUInMemoryRooms(item,cpuTrackerModules[item],roomName);
        });
        Object.keys(performanceTracker).forEach((item, i) => {
          setPerformanceInMemoryRooms(item,performanceTracker[item],roomName);
        });
        Object.keys(roomTracker).forEach((item, i) => {
          setPerformanceInMemoryRooms(item,roomTracker[item],roomName, true);
        });
        Object.keys(spawnerTracker).forEach((item, i) => {
          setSpawnerPerformanceInMemoryRooms(item,spawnerTracker[item],roomName);
        });
        Object.keys(creepCPUTracker).forEach((item, i) => {
          setCreepCPUInMemoryRooms(item,creepCPUTracker[item],roomName);
        });
      }
    }

    function runCPUTracker() {
      // Define Memory ShortCut //
      const cpuTracker = Memory.cpuTracker;

      // Enter This Tick CPU In Memory //
      Object.keys(cpuTracker).forEach((item, i) => {
        setCPUInMemory(item,cpuTracker[item]);
      });

      // Global Tracking //
      const mainDivider = 1 / mainSystemMemory.cpuAvgTicks;
      const secondairDivider = 1 - mainDivider;

      // Enter Average In Memory //
      Memory.stats[`cpu.avg${mainSystemMemory.cpuAvgTicks}`] = secondairDivider * Memory.stats[`cpu.avg${mainSystemMemory.cpuAvgTicks}`] + mainDivider * Game.cpu.getUsed();
      Memory.stats['cpu.avg1000'] = 0.999 * Memory.stats['cpu.avg1000'] + 0.001 * Game.cpu.getUsed();
      Memory.stats['cpu.bucket'] = Game.cpu.bucket;
      Memory.stats['gcl.progress'] = Game.gcl.progress;
      Memory.stats['gcl.progressTotal'] = Game.gcl.progressTotal;
      Memory.stats['gcl.level'] = Game.gcl.level;
      Memory.stats['resources.pixel'] = Game.resources.pixel;
      Memory.stats['resources.credits'] = Game.resources.credits;

      Memory.stats['creepsTotal'] = Object.keys(Game.creeps).length;
    }

    // Check If Tracking Is Enabled //
    if (getMainSystem) {
      function runTracker() {
        runCPUTracker();
        resetTrackerMemoryGlobal();
      }

      function runRoomTracker(roomName) {
        setRoomTrackingInMemory(roomName);
        resetTrackerMemoryInRoom(roomName);
      }

      _.forEach(Object.keys(Game.rooms), function (roomName) {
        // Define Variables //
        const controller = Game.rooms[roomName].controller;

        // If Room Is Ours //
        if (controller && controller.my) {
          // Get FlagMemory
          const flagMemory = Memory.flags[roomName];
          // Check If Memory Is Setup, If Not Fill Empty Memory //
          if (flagMemory.IsMemorySetup) {
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
