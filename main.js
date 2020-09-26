require('prototype.tower');
require('traveler');
require('prototype.Room.structures');

// Require Modules
const ownedRoomManager = require('module.ownedRoomManager');
const remoteRoomManager = require('module.remoteRoomManager');
const checkMissingMemory = require('module.checkMissingMemory');

// Require Main Modules
const runCreeps = require('mainModule.runCreeps');
const runTracker = require('mainModule.tracker');

// Require Mini Modules
const runMainSystem = require('function.mainSystem');
const countCreepsAndParts = require('function.countCreepsAndParts');
const terminal = require('module.terminal');

module.exports.loop = function() {
  if (!Memory.flags)
  Memory.flags = {};


  // Get the CPU Usage //
  let start = Game.cpu.getUsed();

  // Run the part //
  Memory;

  // Set the average CPU Usage in the memory //
  if (Memory.cpuTracker)
  Memory.cpuTracker.loadMemory += Game.cpu.getUsed() - start;

  const getMainSystem = runMainSystem.run();


  // Make A Variable With Shard Name //
  const shardName = Game.shard.name;
  // Make A Variable With MainSystem Memory //
  const mainSystemMemory = Memory.mainSystem;


  // Every Time The Bucket Reaches It's Limit, Generate A Pixel //
  if (Game.cpu.bucket == 10000 && shardName.includes("shard"))
  Game.cpu.generatePixel();


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
    const controller = Game.rooms[roomName].controller;
    const flagMemory = Memory.flags[roomName];


    if (controller && controller.my && !controller.reservation) {
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
        checkMissingMemory.setup(roomName);
        else {
          // Create Variable For Shortcut of CpuTracker //
          const cpuTracker = flagMemory.trackers.cpu;

          if (getMainSystem) {
            // Get the CPU Usage //
            let start = Game.cpu.getUsed();

            // Run the part //
            ownedRoomManager.run(roomName);

            // Set the average CPU Usage in the memory //
            cpuTracker.runOwnedRoomManager += Game.cpu.getUsed() - start;
          }
          else {
            // Run the part without tracking //
            ownedRoomManager.run(roomName);
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
            checkMissingMemory.setup(roomName);
            else {
              // Create Variable For Shortcut of CpuTracker //
              const cpuTracker = flagMemory.trackers.cpu;
              if (Game.time % 500 == 0 || !flagMemory.roomIsChecked) {
                if (getMainSystem) {
                  // Get the CPU Usage //
                  let start = Game.cpu.getUsed();

                  // Run the part //
                  remoteRoomManager.update(roomName);

                  // Set the average CPU Usage in the memory //
                  cpuTracker.runRemoteRoomManager += Game.cpu.getUsed() - start;
                }
                else {
                  // Run the part without tracking //
                  remoteRoomManager.update(roomName);
                }
              }
            }
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
    runTracker.run();

    // Set the average CPU Usage in the memory //
    cpuTracker.tracker += Game.cpu.getUsed() - start;
  }
  else {
    // Run the part without tracking //
    runTracker.run();
  }
};
