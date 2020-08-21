require('prototype.tower');
require('traveler');
require('prototype.Room.structures');

// Require Modules
const roomManager = require('module.roomManager');
const checkMissingMemory = require('module.checkMissingMemory');
const runLabs = require('module.labs');

// Require Main Modules
const getDamagedStructures = require('mainModule.repairStructures');
const runGameTimeTimers = require('mainModule.gameTimeTimers');
const runCreeps = require('mainModule.runCreeps');
const runTowers = require('mainModule.towers');
const runTracker = require('mainModule.tracker');

// Require Mini Modules
const runMainSystem = require('miniModule.mainSystem');
const countCreepsAndParts = require('miniModule.countCreepsAndParts')
const terminal = require('miniModule.terminal')

module.exports.loop = function() {
  // Get the CPU Usage //
  let start = Game.cpu.getUsed();

  // Run the part //
  Memory;

  // Set the average CPU Usage in the memory //
  Memory.cpuTracker.loadMemory += Game.cpu.getUsed() - start;

  const getMainSystem = runMainSystem.run();


  // Make A Variable With Shard Name //
  const shardName = Game.shard.name;
  // Make A Variable With MainSystem Memory //
  const mainSystemMemory = Memory.mainSystem;


  // Every Time The Bucket Reaches It's Limit, Generate A Pixel //
  if (Game.cpu.bucket == 10000)
  Game.cpu.generatePixel();

  //terminal.setup();

  if (getMainSystem) {
    // Get the CPU Usage //
    let start = Game.cpu.getUsed();

    // Run the part //
    countCreepsAndParts.run();

    // Set the average CPU Usage in the memory //
    Memory.cpuTracker.countCreepsAndParts += Game.cpu.getUsed() - start;
  }
  else {
    // Run the part without tracking //
    countCreepsAndParts.run();
  }


  // Loop Through All Rooms With Vision //
  _.forEach(Object.keys(Game.rooms), function (roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
    const controller = Game.rooms[roomName].controller;


    if (controller && controller.my) {
      // If Room Is Missing Flag For Data Storage, Create One //
      if (!Game.flags[roomName]) {
        room.createFlag(25,25, roomName)
        Memory.flags[roomName] = {}
      }

      // If Room Is Missing Memory In Room, Give It Memory //
      if (!Memory.flags[roomName])
      Memory.flags[roomName] = {};
      else {
        // If FlagMemory Is Not Setup, Run The Function //
        if (!flagMemory.IsMemorySetup)
        checkMissingMemory.run(roomName);
        else {
          // Create Variable For Shortcut of CpuTracker //
          const cpuTracker = flagMemory.trackers.cpu;

          if (getMainSystem) {
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


          if (getMainSystem) {
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


          if (getMainSystem) {
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


          if (getMainSystem) {
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


          if (getMainSystem) {
            // Get the CPU Usage //
            let start = Game.cpu.getUsed();

            // Run the part //
            terminal.update(roomName);

            // Set the average CPU Usage in the memory //
            cpuTracker.terminal += Game.cpu.getUsed() - start;
          }
          else {
            // Run the part without tracking //
            terminal.update(roomName);
          }


          if (getMainSystem) {
            // Get the CPU Usage //
            let start = Game.cpu.getUsed();

            // Run the part //
            runLabs.run(roomName);
            runLabs.update(roomName);

            // Set the average CPU Usage in the memory //
            cpuTracker.labs += Game.cpu.getUsed() - start;
          }
          else {
            // Run the part without tracking //
            runLabs.run(roomName);
            runLabs.update(roomName);
          }
        }
      }
    }
    else if (controller && controller.reservation) {
      if (controller.reservation.username) {
        if (controller.reservation.username == "PandaMaster") {
          // If Room Is Missing Flag For Data Storage, Create One //
          if (!Game.flags[roomName]) {
            room.createFlag(25,25, roomName);
            Memory.flags[roomName] = {};
          }

          // If Room Is Missing Memory In Room, Give It Memory //
          if (!Memory.flags[roomName])
          Memory.flags[roomName] = {};
          else {
            // If FlagMemory Is Not Setup, Run The Function //
            if (!flagMemory.IsMemorySetup)
            checkMissingMemory.run(roomName);
          }
        }
      }
    }
  })


  const cpuTracker = Memory.cpuTracker;

  function removeDeadCreepsMemory() {
    if (Game.time % 5 == 0) {
      // Loop Through Every Creep In Memory And Check If there Is Still Vision On Creep //
      // If This Is Not The Case, Delete Memory For That Creep //
      for (let name in Memory.creeps) {
        if (Game.creeps[name] === undefined) {
          delete Memory.creeps[name];
        }
      }
    }
  }


  if (getMainSystem) {
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


  if (getMainSystem) {
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


  if (getMainSystem) {
    // Get the CPU Usage //
    let start = Game.cpu.getUsed();

    // Run the part //
    terminal.run();

    // Set the average CPU Usage in the memory //
    cpuTracker.terminal += Game.cpu.getUsed() - start;
  }
  else {
    // Run the part without tracking //
    terminal.run();
  }


  if (getMainSystem) {
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
