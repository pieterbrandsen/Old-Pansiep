require('prototype.tower');
require('traveler');
require('prototype.Room.structures');

const roleHarvester = require('role.harvester');
const roleTransferer = require('role.transferer');
const roleTransfererLiTe = require('role.transfererLiTe');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleBuilderLD = require('role.builderLD');
const roleRepairer = require('role.repairer');
const roleExtractor = require('role.extractor');
const roleClaimer = require('role.claimer');
const roleAttacker = require('role.attacker');

const rolePixelFarmer = require('role.pixelFarmer');
const roleRuinWithdrawer = require('role.ruinWithdrawer');
const roleShardUp = require('role.shardUp');

const roleReserverLD = require('role.reserver');
const roleHarvesterLD = require('role.harvesterLD');
const roleTransfererLD = require('role.transfererLD');

const roomPlanner = require('module.roomPlanner');
const roomManager = require('module.roomManager');
const checkMissingMemory = require('module.checkMissingMemory');
const spawnCreep = require('mainModule.spawnCreep');
const manageLinks = require('mainModule.links');


module.exports.loop = function() {
  let shardName = Game.shard.name;
  let shardArray = ["shard0","shard1","shard2","shard3"];
  let mainSystemMemory = Memory.mainSystem;

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
  if (!mainSystem.cpuTracker)
  Memory.mainSystem.cpuTracker = true;
  if (!mainSystem.cpuAvgTick)
  Memory.mainSystem.cpuAvgTicks = 50;

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
    const mainDivider = 1 / 50;
    const secondairDivider = 1 - mainDivider;
    if (endCPU == undefined)
    Memory.stats['cpuTracker.' + name] = secondairDivider * Memory.stats['cpuTracker.' + name] + mainDivider * startCPU;
    else
    Memory.stats['cpuTracker.' + name] = secondairDivider * Memory.stats['cpuTracker.' + name] + mainDivider * (endCPU - startCPU);
  }

  function setPerformanceInMemory(name,currentTickPerformance) {
    const mainDivider = 1 / 10000;
    const secondairDivider = 1 - mainDivider;
    if (currentTickPerformance == undefined)
    Memory.stats['performanceTracker.' + name] = secondairDivider * Memory.stats['performanceTracker.' + name] + mainDivider * currentTickPerformance;
    else
    Memory.stats['performanceTracker.' + name] = secondairDivider * Memory.stats['performanceTracker.' + name] + mainDivider * currentTickPerformance;
  }

  function setPerformanceInMemoryRooms(name,currentTickPerformance,room) {
    const mainDivider = 1 / 10000;
    const secondairDivider = 1 - mainDivider;
    if (currentTickPerformance !== undefined)
    Memory.stats["rooms." + room + '.performanceTracker.' + name] = secondairDivider * Memory.stats["rooms." + room + '.performanceTracker.' + name] + mainDivider * currentTickPerformance;
  }

  function setCPUInMemoryModules(name,startCPU,endCPU) {
    const mainDivider = 1 / 50;
    const secondairDivider = 1 - mainDivider;
    if (endCPU == undefined)
    Memory.stats['cpuTrackerModules.' + name] = secondairDivider * Memory.stats['cpuTrackerModules.' + name] + mainDivider * startCPU;
    else
    Memory.stats['cpuTrackerModules.' + name] = secondairDivider * Memory.stats['cpuTrackerModules.' + name] + mainDivider * (endCPU - startCPU);
  }

  function setCPUInMemoryRooms(name,startCPU,endCPU,room) {
    const mainDivider = 1 / 50;
    const secondairDivider = 1 - mainDivider;
    if (endCPU == undefined)
    Memory.stats["rooms." + room + '.cpuTracker.' + name] = secondairDivider * Memory.stats["rooms." + room + '.cpuTracker' + name] + mainDivider * startCPU;
    else
    Memory.stats["rooms." + room + '.cpuTracker.' + name] = secondairDivider * Memory.stats["rooms." + room + '.cpuTracker' + name] + mainDivider * (endCPU - startCPU);
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


  function runCreeps() {
    for (let name in Game.creeps) {
      let creep = Game.creeps[name];
      let role = creep.memory.role

      if (role) {
        if (creep.memory.role == "harvester-0" || creep.memory.role == "harvester-1") {
          roleHarvester.run(creep);
        }
        else if (creep.memory.role == "transferer") {
          roleTransferer.run(creep);
        }
        else if (creep.memory.role == "builder") {
          roleBuilder.run(creep);
        }
        else if (creep.memory.role == "transfererLiTe") {
          roleTransfererLiTe.run(creep);
        }
        else if (creep.memory.role == "upgrader") {
          roleUpgrader.run(creep);
        }
        else if (creep.memory.role == "repairer") {
          roleRepairer.run(creep);
        }
        else if (creep.memory.role == "extractor") {
          roleExtractor.run(creep);
        }
        else if (creep.memory.role == "claimer") {
          roleClaimer.run(creep);
        }
        else if (creep.memory.role == "attacker") {
          roleAttacker.run(creep);
        }
        else if (creep.memory.role == "builderLD") {
          roleBuilderLD.run(creep);
        }
        else if (creep.memory.role == "pixelFarmer") {
          rolePixelFarmer.run(creep);
        }
        else if (creep.memory.role == "ruinWithdrawer") {
          roleRuinWithdrawer.run(creep);
        }
        else if (creep.memory.role == "reserverLD") {
          roleReserverLD.run(creep);
        }
        else if (creep.memory.role.includes("harvesterLD")) {
          roleHarvesterLD.run(creep);
        }
        else if (creep.memory.role == "transfererLD") {
          roleTransfererLD.run(creep);
        }
        else if (creep.memory.role == "shardUp") {
          roleShardUp.run(creep);
        }
      }
      else {
        if (shardName == "shard0") {
          if (creep.getActiveBodyparts(CLAIM) > 0) {
            creep.memory.role = "claimer";
          }
          else if (creep.getActiveBodyparts(WORK) > 0) {
            creep.memory.working = false;
            creep.memory.spawnRoom = "E43N3";
            creep.memory.role = "builderLD";
          }
          else {
            creep.memory.role  = "pixelFarmer";
          }
        }
        else {
          if (creep.getActiveBodyparts(WORK) > 0 || creep.getActiveBodyparts(CLAIM) > 0)
          creep.memory.role = "shardUp";
          else
          creep.memory.role  = "pixelFarmer";
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
    runCreeps();

    // Set the average CPU Usage in the memory //
    setCPUInMemory("runCreeps",start,Game.cpu.getUsed());
  }
  else {
    // Run the part without tracking //
    runCreeps();
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
        let towers = room.towers;

        function getSpawningEnergy() {
          flagMemory.totalEnergyAvailable = room.energyAvailable;
          let spawns = room.spawns.length;
          let extensions = room.extensions.length;

          if (controller.level == 1) {
            if (room.spawns.length > 0) {
              if (spawns > 1)
              spawns = 1;

              flagMemory.totalEnergyCapacity = (spawns * 300);
            }
          }
          if (controller.level == 2) {
            if (room.spawns.length > 0) {
              if (spawns > 1)
              spawns = 1;
              if (extensions > 5)
              extensions = 5;

              flagMemory.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
            }
          }
          else if (controller.level == 3) {
            if (room.spawns.length > 0) {
              if (spawns > 1)
              spawns = 1;
              if (extensions > 10) {
                extensions = 10;
              }

              flagMemory.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
            }
          }
          else if (controller.level == 4) {
            if (room.spawns.length > 0) {
              if (spawns > 1)
              spawns = 1;
              if (extensions > 20)
              extensions = 20;

              flagMemory.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
            }
          }
          else if (controller.level == 5) {
            if (room.spawns.length > 0) {
              if (spawns > 1)
              spawns = 1;
              if (extensions > 30)
              extensions = 30;

              flagMemory.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
            }
          }
          else if (controller.level == 6) {
            if (room.spawns.length > 0) {
              if (spawns > 1)
              spawns = 1;
              if (extensions > 40)
              extensions = 40;

              flagMemory.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
            }
          }
          else if (controller.level == 7) {
            if (room.spawns.length > 0) {
              if (spawns > 2)
              spawns = 2;
              if (extensions > 50)
              extensions = 50;

              flagMemory.totalEnergyCapacity = (spawns * 300) + (extensions * 100);
            }
          }
          else if (controller.level == 8) {
            flagMemory.totalEnergyCapacity = (spawns * 300) + (extensions * 200);
          }
        }

        function claimerCode() {
          if (Game.flags["claim"] !== undefined) {
            if (!Memory.flags["claim"])
            Memory.flags["claim"] = {};
          }
        }



        function defendRoom() {
          if (flagMemory.enemyCount > 0) {
            for (let tower of towers) {
              tower.defend();
            }
          }
        }



        function getDamagedStructures() {
          if (flagMemory.enemyCount == 0 && flagMemory.repairTarget) {
            let repairAmount = 100 * 1000;
            if (room.terminal) {
              let repairAmount = 1 * 1000 * 1000 // 1 Million
            }

            if (flagMemory.repairTarget.length == 0 && Game.time % 1000 == 0) {
              let repairTarget = flagMemory.repairTarget;
              let targetRepair = room.find(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.hits < repairAmount
              });

              if (targetRepair.length > 0) {
                for (let i = 0; targetRepair.length > i; i++) {
                  flagMemory.repairTarget[i] = targetRepair[i].id
                }
              }
            }


            if (flagMemory.repairTarget.length > 0) {
              for (let tower of towers) {
                let target = Game.getObjectById(flagMemory.repairTarget[0]);
                if (target !== null) {
                  if (target.hits < target.hitsMax && target.hits < repairAmount) {
                    Memory.performanceTracker[roomName + ".repairerEnergy"] += 10;
                    tower.repair(target);
                  }
                  else {
                    flagMemory.repairTarget.shift();
                  }
                }
                else {
                  flagMemory.repairTarget.shift();
                }
              }
            }
          }
        }





        function runGameTimeTimers() {
          if (Game.time % 10 == 0) {
            flagMemory.enemyCount = room.find(FIND_HOSTILE_CREEPS).length;

            getSpawningEnergy();

            spawnCreep.run(roomName);

            manageLinks.run(roomName);
          }



          if (flagMemory.sources) {
            if (Game.time % 5000 == 0 || (!flagMemory.roomManager.headSpawn && room.spawns.length > 0)) {
              console.log(`Memory in ${roomName} is being updated!`)
              if (!flagMemory.roomManager.headSpawn) {
                if (room.spawns.length > 1) {
                  if (room.terminal && room.controller.level >= 6) {
                    const spawn = room.terminal.pos.findInRange(room.spawns, 2,
                      {filter: {structureType: STRUCTURE_SPAWN}})[0];

                      if (spawn)
                      flagMemory.roomManager.headSpawn = spawn.id;
                    }
                  }
                  else {
                    if (room.spawns.length == 1) {
                      flagMemory.roomManager.headSpawn = room.spawns[0].id;
                    }
                  }
                }

                if (Game.time % 5000 == 0) {
                  const mineral = room.find(FIND_MINERALS)[0];
                  if (mineral) {
                    flagMemory.mineralAmount = mineral.mineralAmount;
                    flagMemory.mineralId = mineral.id;
                  }
                  else {
                    flagMemory.mineralAmount = 0;
                    flagMemory.mineralId = "";
                  }
                  flagMemory.constructionSitesAmount = room.find(FIND_CONSTRUCTION_SITES).length;
                  roomPlanner.run()
                }
              }
            }
          }

          function runRoomPlanner() {
            if (flagMemory.controllerLevel < room.controller.level) {
              if (flagMemory.roomManager.headSpawn) {
                roomManager.run(roomName)
              }
              roomPlanner.run()
              flagMemory.controllerLevel = room.controller.level;
            }
            if (Game.time % 500 == 0) {
              roomManager.run(roomName)
            }
          }

          function runCPUTracker() {
            totalCPUHarvestingModule += Memory.cpuTracker["harvesterCPU.total"];
          }

          function deleteMemory() {
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
            getDamagedStructures();

            // Set the average CPU Usage in the memory //
            totalCPUGetDamagedStructures += Game.cpu.getUsed() - start;
          }
          else {
            // Run the part without tracking //
            getDamagedStructures();
          }


          if (mainSystem()) {
            // Get the CPU Usage //
            let start = Game.cpu.getUsed();

            // Run the part //
            runGameTimeTimers();

            // Set the average CPU Usage in the memory //
            totalCPURunGameTimeTimers += Game.cpu.getUsed() - start;
          }
          else {
            // Run the part without tracking //
            runGameTimeTimers();
          }


          // if (mainSystem()) {
          //   // Get the CPU Usage //
          //   let start = Game.cpu.getUsed();
          //
          //   // Run the part //
          //   checkMissingMemory();
          //
          //   // Set the average CPU Usage in the memory //
          //   totalCPUCheckMissingMemory += Game.cpu.getUsed() - start;
          // }
          // else {
          //   // Run the part without tracking //
          //   checkMissingMemory();
          // }


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
            claimerCode();

            // Set the average CPU Usage in the memory //
            totalCPUClaimerCode += Game.cpu.getUsed() - start;
          }
          else {
            // Run the part without tracking //
            claimerCode();
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
