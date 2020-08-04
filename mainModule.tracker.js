const deleteMemory = require("module.deleteMemory");
const checkMissingMemory = require('module.checkMissingMemory');

module.exports = {
  run: function() {
    const mainSystemMemory = Memory.mainSystem;

    function setCPUInMemory(name, inputCPU) {
      const mainDivider = 1 / mainSystemMemory.cpuAvgTicks;
      const secondairDivider = 1 - mainDivider;
      Memory.stats[`cpuTracker.${name}`] = secondairDivider * Memory.stats[`cpuTracker.${name}`] + mainDivider * inputCPU;
    }

    function setCPUInMemoryModules(name, inputCPU) {
      const mainDivider = 1 / mainSystemMemory.cpuAvgTicks;
      const secondairDivider = 1 - mainDivider;
      Memory.stats[`cpuTrackerModules.${name}`] = secondairDivider * Memory.stats[`cpuTrackerModules.${name}`] + mainDivider * inputCPU;
    }

    function setCPUInMemoryRooms(name, inputCPU, room) {
      const mainDivider = 1 / mainSystemMemory.cpuAvgTicks;
      const secondairDivider = 1 - mainDivider;
      Memory.stats[`rooms.${room}.cpuTracker.${name}`] = secondairDivider * Memory.stats[`rooms.${room}.cpuTracker.${name}`] + mainDivider * inputCPU;
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
      function runCPUTracker() {
        const cpuTracker = Memory.cpuTracker;

        Object.keys(cpuTracker).forEach((item, i) => {
          setCPUInMemory(item, cpuTracker[item])
        });

        Memory.stats['cpu.avg50'] = 0.98 * Memory.stats['cpu.avg50'] + 0.02 * Game.cpu.getUsed();
        Memory.stats['cpu.avg1000'] = 0.999 * Memory.stats['cpu.avg1000'] + 0.001 * Game.cpu.getUsed();
        Memory.stats['cpu.bucket'] = Game.cpu.bucket;
        Memory.stats['resources.pixel.total'] = Game.resources.pixel;
      }

      function runRoomCPUTracker(roomName) {
        const cpuTracker = Memory.flags[roomName].trackers.cpu;
        Object.keys(cpuTracker).forEach((item, i) => {
          setCPUInMemoryRooms(item, cpuTracker[item])
        });


        const cpuModuleTracker = Memory.flags[roomName].trackers.cpuModule;
        Object.keys(cpuModuleTracker).forEach((item, i) => {
          setCPUInMemoryModules(item, cpuModuleTracker[item])
        });
      }

      function resetTrackerMemoryInRoom(roomName) {
        const cpuTracker = Memory.flags[roomName].trackers.cpu;
        Object.keys(cpuTracker).forEach((item, i) => {
          cpuTracker[item] = 0;
        });

        const cpuModuleTracker = Memory.flags[roomName].trackers.cpuModule;
        Object.keys(cpuModuleTracker).forEach((item, i) => {
          cpuModuleTracker[item] = 0;
        });
      }
      function resetTrackerMemoryGlobal() {
        const cpuTracker = Memory.cpuTracker;
        Object.keys(cpuTracker).forEach((item, i) => {
          cpuTracker[item] = 0;
        });
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
