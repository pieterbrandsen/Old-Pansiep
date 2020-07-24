require('prototype.tower');
require('traveler');
require('prototype.Room.structures');

const roomManager = require('module.roomManager');
const checkMissingMemory = require('module.checkMissingMemory');

const getDamagedStructures = require('mainModule.repairStructures');
const runGameTimeTimers = require('mainModule.gameTimeTimers');
const runCreeps = require('mainModule.runCreeps');

const setDataInMemory = require('module.setDataInMemory');


module.exports.loop = function() {
  const shardName = Game.shard.name;
  const mainSystemMemory = Memory.mainSystem;

  if (Game.cpu.bucket == 10000) {
    //Game.notify("getting a pixel!");
    console.log(shardName + " is getting a pixel!");
    Game.cpu.generatePixel();
  }

  if (!Memory.flags)
  Memory.flags = {};
  if (!Memory.stats)
  Memory.stats = {};
  if (!Memory.mainSystem)
  Memory.mainSystem = {};
  if (!Memory.cpuTracker)
  Memory.cpuTracker = {};
  if (!mainSystemMemory.cpuTracker)
  Memory.mainSystem.cpuTracker = true;
  if (!mainSystemMemory.cpuAvgTick)
  Memory.mainSystem.cpuAvgTicks = 100;
  if (!mainSystemMemory.performanceTracker)
  Memory.mainSystem.performanceTracker = true;
  if (!mainSystemMemory.performanceAvgTicks)
  Memory.mainSystem.performanceAvgTicks = 10000;

  if (!Memory.performanceTracker)
  Memory.performanceTracker = {};
  if (!Memory.outpostMemory)
  Memory.outpostMemory = {};


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

  function setPerformanceInMemory(name,currentTickPerformance) {
    const mainDivider = 1 / mainSystemMemory.performanceAvgTicks;
    const secondairDivider = 1 - mainDivider;
    if (currentTickPerformance == undefined)
    Memory.stats[`performanceTracker.${name}`] = secondairDivider * Memory.stats[`performanceTracker.${name}`] + mainDivider * currentTickPerformance;
    else
    Memory.stats[`performanceTracker.${name}`] = secondairDivider * Memory.stats[`performanceTracker.${name}`] + mainDivider * currentTickPerformance;
  }

  function setPerformanceInMemoryRooms(name,currentTickPerformance,room) {
    const mainDivider = 1 / mainSystemMemory.performanceAvgTicks;;
    const secondairDivider = 1 - mainDivider;
    if (currentTickPerformance !== undefined)
    Memory.stats[`rooms.${room}.performanceTracker.${name}`] = secondairDivider * Memory.stats[`rooms.${room}.performanceTracker.${name}`] + mainDivider * currentTickPerformance;
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
    setCPUInMemory("loadMemory",start,Game.cpu.getUsed());
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
    setCPUInMemory("removeDeadCreepsMemory",start,Game.cpu.getUsed());
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
    setCPUInMemory("runCreeps",start,Game.cpu.getUsed());
  }
  else {
    // Run the part without tracking //
    runCreeps.run();
  }





  // CPU Tracker assigments //
  let totalCPUGetFirstOpenSpawn = 0;
  let totalCPUDefendRoom = 0;
  let totalCPUGetCreepAmount = 0;
  let totalCPUGetDamagedStructures = 0;
  let totalCPURunGameTimeTimers = 0;
  let totalCPUCheckMissingMemory = 0;
  let totalCPURunRoomPlanner = 0;
  let totalCPUClaimerCode = 0;
  let totalCPUTracking = 0;
  let totalCPUPerformanceTracking = 0;

  let longDistanceCreepsHasBeenCounted = false;

  _.forEach(Object.keys(Game.rooms), function (roomName) {
    const room = Game.rooms[roomName];
    const controller = Game.rooms[roomName].controller;
    const flagMemory = Memory.flags[roomName];

    if (!Game.flags[roomName]) {
      room.createFlag(25,25, roomName)
      Memory.flags[roomName] = {}
    }
    if (!Memory.flags[roomName])
    Memory.flags[roomName] = {}


    if (controller && controller.my && flagMemory) {
      if (!flagMemory.IsMemorySetup) {
        checkMissingMemory.run(roomName);
      }
      else {
        function claimerCode() {
          if (Game.flags["claim"] !== undefined) {
            if (!Memory.flags["claim"])
            Memory.flags["claim"] = {};
          }
        }



        function defendRoom() {
          if (flagMemory.enemyCount > 0) {
            for (let tower of room.towers) {
              tower.defend();
            }
          }
        }

          function runRoomPlanner() {
            roomManager.run(roomName)
          }

          function runCPUTracker() {
            totalCPUHarvestingModule += Memory.cpuTracker["harvesterCPU.total"];
          }

          function deleteMemory() {
            delete Memory.stats;
            delete Memory.stats['cpuTracker.loadMemory'];
            delete Memory.stats['cpuTracker.removeDeadCreepsMemory'];
            delete Memory.stats['cpuTracker.runCreeps'];
            delete Memory.stats['cpuTracker.getFirstOpenSpawn'];
            delete Memory.stats['cpuTracker.defendRoom'];
            delete Memory.stats['cpuTracker.getDamagedStructures'];
            delete Memory.stats['cpuTracker.runGameTimeTimers'];
            delete Memory.stats['cpuTracker.checkMissingMemory'];
            delete Memory.stats['cpuTracker.runRoomPlanner'];
            delete Memory.stats['cpuTracker.runRoomCPUTracker'];
            delete Memory.stats['cpuTracker.claimerCode'];

            delete Memory.cpuTracker["harvesterCPU.total"];
            delete Memory.cpuTracker["upgraderCPU.total"];
            delete Memory.cpuTracker["transferCPU.total"];
            delete Memory.cpuTracker["withdrawCPU.upgrader"];
            delete Memory.cpuTracker["withdrawCPU.normal"];
            delete Memory.cpuTracker["claimerCPU.total"];
            delete Memory.cpuTracker["builderCPU.total"];
            delete Memory.cpuTracker["repairerCPU.total"];

            delete Memory.stats["rooms." + roomName + '.performanceTracker.energyHarvested'];
            delete Memory.stats["rooms." + roomName + '.performanceTracker.mineralHarvested'];
            delete Memory.stats["rooms." + roomName + '.performanceTracker.upgraderEnergy'];
            delete Memory.stats["rooms." + roomName + '.performanceTracker.harvestedEnergyTransfer'];
            delete Memory.stats["rooms." + roomName + '.performanceTracker.harvestedMineralTransfer'];
            delete Memory.stats["rooms." + roomName + '.performanceTracker.spawnEnergyTransfer'];
            delete Memory.stats["rooms." + roomName + '.performanceTracker.builderEnergy'];
            delete Memory.stats["rooms." + roomName + '.performanceTracker.repairerEnergy'];

            delete Memory.performanceTracker[roomName + ".energyHarvested"];
            delete Memory.performanceTracker[roomName + ".mineralHarvested"];
            delete Memory.performanceTracker[roomName + ".upgraderEnergy"];
            delete Memory.performanceTracker[roomName + ".harvestedEnergyTransfer"];
            delete Memory.performanceTracker[roomName + ".harvestedMineralTransfer"];
            delete Memory.performanceTracker[roomName + ".spawnEnergyTransfer"];
            delete Memory.performanceTracker[roomName + ".builderEnergy"];
            delete Memory.performanceTracker[roomName + ".repairerEnergy"];


            delete Memory.stats['cpu.avg50'];
            delete Memory.stats['cpu.avg1000'];
            delete Memory.stats['cpu.bucket'];
          }

          function runRoomPerformanceTracking() {
            setPerformanceInMemoryRooms("energyHarvested",Memory.performanceTracker[roomName + ".energyHarvested"],roomName);
            setPerformanceInMemoryRooms("mineralHarvested",Memory.performanceTracker[roomName + ".mineralHarvested"],roomName);
            setPerformanceInMemoryRooms("upgraderEnergy",Memory.performanceTracker[roomName + ".upgraderEnergy"],roomName);
            setPerformanceInMemoryRooms("harvestedEnergyTransfer",Memory.performanceTracker[roomName + ".harvestedEnergyTransfer"],roomName);
            setPerformanceInMemoryRooms("harvestedMineralTransfer",Memory.performanceTracker[roomName + ".harvestedMineralTransfer"],roomName);
            setPerformanceInMemoryRooms("spawnEnergyTransfer",Memory.performanceTracker[roomName + ".spawnEnergyTransfer"],roomName);
            setPerformanceInMemoryRooms("builderEnergy",Memory.performanceTracker[roomName + ".builderEnergy"],roomName);
            setPerformanceInMemoryRooms("repairerEnergy",Memory.performanceTracker[roomName + ".repairerEnergy"],roomName);
            Memory.performanceTracker[roomName + ".energyHarvested"] = 0;
            Memory.performanceTracker[roomName + ".mineralHarvested"] = 0;
            Memory.performanceTracker[roomName + ".upgraderEnergy"] = 0;
            Memory.performanceTracker[roomName + ".harvestedEnergyTransfer"] = 0;
            Memory.performanceTracker[roomName + ".harvestedMineralTransfer"] = 0;
            Memory.performanceTracker[roomName + ".spawnEnergyTransfer"] = 0;
            Memory.performanceTracker[roomName + ".builderEnergy"] = 0;
            Memory.performanceTracker[roomName + ".repairerEnergy"] = 0;
          }


          if (mainSystem()) {
            // Get the CPU Usage //
            let start = Game.cpu.getUsed();

            // Run the part //
            defendRoom();

            // Set the average CPU Usage in the memory //
            totalCPUDefendRoom += Game.cpu.getUsed() - start;
          }
          else {
            // Run the part without tracking //
            defendRoom();
          }


          if (mainSystem()) {
            // Get the CPU Usage //
            let start = Game.cpu.getUsed();

            // Run the part //
            getDamagedStructures.run(roomName);

            // Set the average CPU Usage in the memory //
            totalCPUGetDamagedStructures += Game.cpu.getUsed() - start;
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
            totalCPURunGameTimeTimers += Game.cpu.getUsed() - start;
          }
          else {
            // Run the part without tracking //
            runGameTimeTimers.run(roomName);
          }


          if (mainSystem()) {
            // Get the CPU Usage //
            let start = Game.cpu.getUsed();

            // Run the part //
            runRoomPlanner();

            // Set the average CPU Usage in the memory //
            totalCPURunRoomPlanner += Game.cpu.getUsed() - start;
          }
          else {
            // Run the part without tracking //
            runRoomPlanner();
          }


          if (mainSystem()) {
            // Get the CPU Usage //
            let start = Game.cpu.getUsed();

            // Run the part //
            runRoomPerformanceTracking();

            // Set the average CPU Usage in the memory //
            totalCPUPerformanceTracking += Game.cpu.getUsed() - start;
          }
          else {
            // Run the part without tracking //
            runRoomPerformanceTracking();
          }
        }
      }
    });


    function runRoomCPUTracker() {
      if (mainSystem()) {
        setCPUInMemory("getFirstOpenSpawn",totalCPUGetFirstOpenSpawn);
        setCPUInMemory("defendRoom",totalCPUDefendRoom);
        setCPUInMemory("getDamagedStructures",totalCPUGetDamagedStructures);
        setCPUInMemory("runGameTimeTimers",totalCPURunGameTimeTimers);
        setCPUInMemory("checkMissingMemory",totalCPUCheckMissingMemory);
        setCPUInMemory("runRoomPlanner",totalCPURunRoomPlanner);
        setCPUInMemory("claimerCode",totalCPUClaimerCode);
        setCPUInMemory("performanceTracking",totalCPUPerformanceTracking);

        setCPUInMemoryModules("harvestingModule",Memory.cpuTracker["harvesterCPU.total"]);
        setCPUInMemoryModules("upgraderModule",Memory.cpuTracker["upgraderCPU.total"]);
        setCPUInMemoryModules("transferModule",Memory.cpuTracker["transferCPU.total"]);
        setCPUInMemoryModules("withdrawModuleUpgrader",Memory.cpuTracker["withdrawCPU.upgrader"]);
        setCPUInMemoryModules("withdrawModuleNormal",Memory.cpuTracker["withdrawCPU.normal"]);
        setCPUInMemoryModules("claimerModule",Memory.cpuTracker["claimerCPU.total"]);
        setCPUInMemoryModules("builderModule",Memory.cpuTracker["builderCPU.total"]);
        setCPUInMemoryModules("repairerModule",Memory.cpuTracker["repairerCPU.total"]);
        Memory.cpuTracker["harvesterCPU.total"] = 0;
        Memory.cpuTracker["upgraderCPU.total"] = 0;
        Memory.cpuTracker["transferCPU.total"] = 0;
        Memory.cpuTracker["withdrawCPU.upgrader"] = 0;
        Memory.cpuTracker["withdrawCPU.normal"] = 0;
        Memory.cpuTracker["claimerCPU.total"] = 0;
        Memory.cpuTracker["builderCPU.total"] = 0;
        Memory.cpuTracker["repairerCPU.total"] = 0;
      }
      else {
        deleteMemory();
      }
    }




    if (mainSystem()) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runRoomCPUTracker();

      // Set the average CPU Usage in the memory //
      setCPUInMemory("runRoomCPUTracker",totalCPUTracking);
    }
    else {
      // Run the part without tracking //
      runRoomCPUTracker();
    }


    Memory.stats['cpu.avg50'] = 0.98 * Memory.stats['cpu.avg50'] + 0.02 * Game.cpu.getUsed();
    Memory.stats['cpu.avg1000'] = 0.999 * Memory.stats['cpu.avg1000'] + 0.001 * Game.cpu.getUsed();
    Memory.stats['cpu.bucket'] = Game.cpu.bucket;
    Memory.stats['resources.pixel.total'] = Game.resources.pixel;
  };
