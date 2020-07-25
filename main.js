require('prototype.tower');
require('traveler');
require('prototype.Room.structures');

const roomManager = require('module.roomManager');
const checkMissingMemory = require('module.checkMissingMemory');

const getDamagedStructures = require('mainModule.repairStructures');
const runGameTimeTimers = require('mainModule.gameTimeTimers');
const runCreeps = require('mainModule.runCreeps');
const runTowers = require('mainModule.towers');

const runCpuTracker = require('module.cpuTracker');


module.exports.loop = function() {
  const shardName = Game.shard.name;
  const mainSystemMemory = Memory.mainSystem;

  if (Game.cpu.bucket == 10000) {
    Game.cpu.generatePixel();
  }

  if (!Memory.flags)
  Memory.flags = {};
  if (!Memory.stats)
  Memory.stats = {};
  if (!Memory.mainSystem)
  Memory.mainSystem = {};
  if (!Memory.cpuTracker) {
    Memory.cpuTracker = {};
    const cpuTracker = Memory.cpuTracker;
    cpuTracker.loadMemory = 0;
    cpuTracker.removeDeadCreepsMemory = 0;
    cpuTracker.runCreeps = 0;
    cpuTracker.cpuTracker = 0;
  }
  if (mainSystemMemory.cpuTracker)
  Memory.mainSystem.cpuTracker = true;
  if (!mainSystemMemory.cpuAvgTick)
  Memory.mainSystem.cpuAvgTicks = 100;
  if (mainSystemMemory.performanceTracker)
  Memory.mainSystem.performanceTracker = true;
  if (!mainSystemMemory.performanceAvgTicks)
  Memory.mainSystem.performanceAvgTicks = 10000;

  if (!Memory.performanceTracker)
  Memory.performanceTracker = {};
  if (!Memory.outpostMemory)
  Memory.outpostMemory = {};

  // function setPerformanceInMemory(name,currentTickPerformance) {
  //     const mainDivider = 1 / mainSystemMemory.performanceAvgTicks;
  //     const secondairDivider = 1 - mainDivider;
  //     if (currentTickPerformance == undefined)
  //     Memory.stats[`performanceTracker.${name}`] = secondairDivider * Memory.stats[`performanceTracker.${name}`] + mainDivider * currentTickPerformance;
  //     else
  //     Memory.stats[`performanceTracker.${name}`] = secondairDivider * Memory.stats[`performanceTracker.${name}`] + mainDivider * currentTickPerformance;
  //   }
  //
  //   function setPerformanceInMemoryRooms(name,currentTickPerformance,room) {
  //     const mainDivider = 1 / mainSystemMemory.performanceAvgTicks;;
  //     const secondairDivider = 1 - mainDivider;
  //     if (currentTickPerformance !== undefined)
  //     Memory.stats[`rooms.${room}.performanceTracker.${name}`] = secondairDivider * Memory.stats[`rooms.${room}.performanceTracker.${name}`] + mainDivider * currentTickPerformance;
  //   }

  _.forEach(Object.keys(Game.rooms), function (roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
    const controller = Game.rooms[roomName].controller;


    if (controller && controller.my) {
      if (!Game.flags[roomName]) {
        room.createFlag(25,25, roomName)
        Memory.flags[roomName] = {}
      }
      if (!Memory.flags[roomName])
      Memory.flags[roomName] = {}
      else {
        if (!flagMemory.IsMemorySetup) {
          checkMissingMemory.run(roomName);
        }
        else {
          const cpuTracker = flagMemory.trackers.cpu;

          if (mainSystem()) {
            // Get the CPU Usage //
            let start = Game.cpu.getUsed();

            // Run the part //
            runTowers.run(roomName);

            // Set the average CPU Usage in the memory //
            cpuTracker.runTowers += Game.cpu.getUsed() - start;
          }
          else {
            // Run the part without tracking //
            runTowers.run(roomName);
          }


          if (mainSystem()) {
            // Get the CPU Usage //
            let start = Game.cpu.getUsed();

            // Run the part //
            getDamagedStructures.run(roomName);

            // Set the average CPU Usage in the memory //
            cpuTracker.getDamagedStructures += Game.cpu.getUsed() - start;
          }
          else {
            // Run the part without tracking //
            getDamagedStructures.run(roomName);
          }


          if (mainSystem()) {
            // Get the CPU Usage //
            let start = Game.cpu.getUsed();

            // Run the part //
            runGameTimeTimers.run(roomName);

            // Set the average CPU Usage in the memory //
            cpuTracker.runGameTimeTimers += Game.cpu.getUsed() - start;
          }
          else {
            // Run the part without tracking //
            runGameTimeTimers.run(roomName);
          }


          if (mainSystem()) {
            // Get the CPU Usage //
            let start = Game.cpu.getUsed();

            // Run the part //
            roomManager.run(roomName);

            // Set the average CPU Usage in the memory //
            cpuTracker.runRoomManager += Game.cpu.getUsed() - start;
          }
          else {
            // Run the part without tracking //
            roomManager.run(roomName);
          }
        }
      }
    }
  })


  const cpuTracker = Memory.cpuTracker;

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


  function removeDeadCreepsMemory() {
    if (Game.time % 10 == 0) {
      for (let name in Memory.creeps) {
        if (Game.creeps[name] === undefined) {
          delete Memory.creeps[name];
        }
      }
    }
  }

  if (mainSystem()) {
    // Get the CPU Usage //
    let start = Game.cpu.getUsed();

    // Run the part //
    Memory;

    // Set the average CPU Usage in the memory //
    cpuTracker.memoryLoad += Game.cpu.getUsed() - start;
  }
  else {
    // Run the part without tracking //
    Memory;
  }


  if (mainSystem()) {
    // Get the CPU Usage //
    let start = Game.cpu.getUsed();

    // Run the part //
    removeDeadCreepsMemory();

    // Set the average CPU Usage in the memory //
    cpuTracker.removeDeadCreepsMemory += Game.cpu.getUsed() - start;
  }
  else {
    // Run the part without tracking //
    removeDeadCreepsMemory();
  }


  if (mainSystem()) {
    // Get the CPU Usage //
    let start = Game.cpu.getUsed();

    // Run the part //
    runCreeps.run();

    // Set the average CPU Usage in the memory //
    cpuTracker.runCreeps += Game.cpu.getUsed() - start;
  }
  else {
    // Run the part without tracking //
    runCreeps.run();
  }


  if (mainSystem()) {
    // Get the CPU Usage //
    let start = Game.cpu.getUsed();

    // Run the part //
    runCpuTracker.run();

    // Set the average CPU Usage in the memory //
    cpuTracker.cpuTracker += Game.cpu.getUsed() - start;
  }
  else {
    // Run the part without tracking //
    runCpuTracker.run();
  }
};
