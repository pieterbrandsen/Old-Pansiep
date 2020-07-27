require('prototype.tower');
require('traveler');
require('prototype.Room.structures');

// Require Modules
const roomManager = require('module.roomManager');
const checkMissingMemory = require('module.checkMissingMemory');

// Require Main Modules
const getDamagedStructures = require('mainModule.repairStructures');
const runGameTimeTimers = require('mainModule.gameTimeTimers');
const runCreeps = require('mainModule.runCreeps');
const runTowers = require('mainModule.towers');
const runTracker = require('mainModule.tracker');


module.exports.loop = function() {
  // Make A Variable With Shard Name //
  const shardName = Game.shard.name;
  // Make A Variable With MainSystem Memory //
  const mainSystemMemory = Memory.mainSystem;

  // Every Time The Bucket Reaches It's Limit, Generate A Pixel //
  // if (Game.cpu.bucket == 10000) {
  //   Game.cpu.generatePixel();
  // }

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


  // Loop Through All Rooms With Vision //
  _.forEach(Object.keys(Game.rooms), function (roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
    const controller = Game.rooms[roomName].controller;

    // Check if Controller Is Mine
    if (controller && controller.my) {
      // if Room Is Missing Flag For Data Storage, Create One //
      if (!Game.flags[roomName]) {
        room.createFlag(25,25, roomName)
        Memory.flags[roomName] = {}
      }

      // If Room Is Missing Memory In Room, Give It Memory //
      if (!Memory.flags[roomName])
      Memory.flags[roomName] = {}
      else {
        // If FlagMemory Is Not Setup, Run The Function //
        if (!flagMemory.IsMemorySetup) {
          checkMissingMemory.run(roomName);
        }
        else {
          // Create Variable For Shortcut of CpuTracker //
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

  function removeDeadCreepsMemory() {
    if (Game.time % 10 == 0) {
      // Loop Through Every Creep In Memory And Check If there Is Still Vision On Creep //
      // If This Is Not The Case, Delete Memory For That Creep //
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
    runTracker.run();

    // Set the average CPU Usage in the memory //
    cpuTracker.tracker += Game.cpu.getUsed() - start;
  }
  else {
    // Run the part without tracking //
    runTracker.run();
  }
};
