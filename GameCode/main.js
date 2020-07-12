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

const rolePixelFarmer = require('role.pixelFarmer');
const roleRuinWithdrawer = require('role.ruinWithdrawer');
const roleShardUp = require('role.shardUp');

const roleReserverLD = require('role.reserver');
const roleHarvesterLD = require('role.harvesterLD');
const roleTransfererLD = require('role.transfererLD');

const roomPlanner = require('module.roomPlanner')
const roomManager = require('module.roomManager')
const checkMissingMemory = require('module.checkMissingMemory')

module.exports.loop = function() {
  let shardName = Game.shard.name;
  let shardArray = ["shard0","shard1","shard2","shard3"];
  let mainSystemMemory = Memory.mainSystem;

  if (Game.cpu.bucket == 10000) {
    //Game.notify("Getting a pixel!");
    console.log(shardName + " is Getting a pixel!");
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
        let spawn;
        if (mainSystem()) {
          // Get the CPU Usage //
          let start = Game.cpu.getUsed();

          // Run the part //
          spawn = getFirstOpenSpawn();

          // Set the average CPU Usage in the memory //
          totalCPUGetFirstOpenSpawn += Game.cpu.getUsed() - start;
        }
        else {
          // Run the part without tracking //
          spawn = getFirstOpenSpawn();
        }


        function createSurroundingConstructionSite(id,range,controllerLevel) {
          let object = Game.getObjectById(id);
          let structureType;
          let x = object.pos.x;
          let y = object.pos.y;
          let constructionSiteCanBeBuild = false;
          function createConstruction(structureType,x,y) {
            if (room.createConstructionSite(x,y,structureType) == 0) {
              return true;
            }
            else {
              return false;
            }
          }


          if (room.controller.level >= controllerLevel) {
            structureType = STRUCTURE_LINK;
          }
          else {
            range = 1;
            structureType = STRUCTURE_CONTAINER;
          }

          let containerInRange = object.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
            return (structure.pos.inRangeTo(object,range) && structure.structureType == STRUCTURE_CONTAINER)}
          });
          let linkInRange = object.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
            return (structure.pos.inRangeTo(object,range) && structure.structureType == STRUCTURE_LINK)}
          });
          let constructionSitesInRange = object.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {filter: (structure) => {
            return (structure.pos.inRangeTo(object,range) && (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_LINK))}
          });


          if (constructionSitesInRange == null) {
            if (structureType == STRUCTURE_LINK && containerInRange !== null) {
              containerInRange.destroy();
            }

            if (createConstruction(structureType,x+range,y+range) == true && constructionSiteCanBeBuild == false) {
              room.createConstructionSite(x+range,y+range,structureType)
              constructionSiteCanBeBuild = true
            }
            else if (createConstruction(structureType,x,y+range) == true && constructionSiteCanBeBuild == false) {
              room.createConstructionSite(x+range,y+range,structureType)
              constructionSiteCanBeBuild = true
            }
            else if (createConstruction(structureType,x-range,y+range) == true && constructionSiteCanBeBuild == false) {
              room.createConstructionSite(x+range,y+range,structureType)
              constructionSiteCanBeBuild = true
            }
            else if (createConstruction(structureType,x-range,y) == true && constructionSiteCanBeBuild == false) {
              room.createConstructionSite(x+range,y+range,structureType)
              constructionSiteCanBeBuild = true
            }
            else if (createConstruction(structureType,x-range,y-range) == true && constructionSiteCanBeBuild == false) {
              room.createConstructionSite(x+range,y+range,structureType)
              constructionSiteCanBeBuild = true
            }
            else if (createConstruction(structureType,x,y-range) == true && constructionSiteCanBeBuild == false) {
              room.createConstructionSite(x+range,y+range,structureType)
              constructionSiteCanBeBuild = true
            }
            else if (createConstruction(structureType,x+range,y-range) == true && constructionSiteCanBeBuild == false) {
              room.createConstructionSite(x+range,y+range,structureType)
              constructionSiteCanBeBuild = true
            }
            else if (createConstruction(structureType,x,y-range) == true && constructionSiteCanBeBuild == false) {
              room.createConstructionSite(x+range,y+range,structureType)
              constructionSiteCanBeBuild = true
            }
          }
        };

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

        function getOpenSpotsNearSource(source) {
          const terrain = new Room.Terrain(roomName);
          const sourcePos = source.pos;
          let sourcePosX;
          let sourcePosY;
          let count = 8;

          sourcePosX = source.pos.x-1;
          sourcePosY = source.pos.y-1;
          if (terrain.get(sourcePosX,sourcePosY) == 1)
          count--;

          sourcePosX = source.pos.x;
          sourcePosY = source.pos.y-1;
          if (terrain.get(sourcePosX,sourcePosY) == 1)
          count--;

          sourcePosX = source.pos.x+1;
          sourcePosY = source.pos.y-1;
          if (terrain.get(sourcePosX,sourcePosY) == 1)
          count--;

          sourcePosX = source.pos.x-1;
          sourcePosY = source.pos.y;
          if (terrain.get(sourcePosX,sourcePosY) == 1)
          count--;

          sourcePosX = source.pos.x+1;
          sourcePosY = source.pos.y;
          if (terrain.get(sourcePosX,sourcePosY) == 1)
          count--;

          sourcePosX = source.pos.x-1;
          sourcePosY = source.pos.y+1;
          if (terrain.get(sourcePosX,sourcePosY) == 1)
          count--;

          sourcePosX = source.pos.x;
          sourcePosY = source.pos.y+1;
          if (terrain.get(sourcePosX,sourcePosY) == 1)
          count--;

          sourcePosX = source.pos.x+1;
          sourcePosY = source.pos.y+1;
          if (terrain.get(sourcePosX,sourcePosY) == 1)
          count--;

          return count;
        }

        function defendRoom() {
          if (flagMemory.enemyCount > 0) {
            for (let tower of towers) {
              tower.defend();
            }
          }
        }

        function getFirstOpenSpawn() {
          let freeSpawns = room.find(FIND_MY_SPAWNS, {
            filter: (structure) => {
              return (structure.spawning == null);
            }
          });

          if (freeSpawns.length > 0)
          return freeSpawns[0];
          else return null;
        }

        function roomNeedsTransferer() {
          let containerAmount = room.containers.length;
          let linkAmount = room.links.length;
          let energyStored = 0;

          if (containerAmount > 0) {
            room.containers.forEach((item, i) => {
              if (item.id !== flagMemory.controllerStorage  ) {
                energyStored += item.store.getUsedCapacity(RESOURCE_ENERGY);
              }
            });
          }
          if (room.terminal !== undefined) {
            energyStored += room.terminal.store.getUsedCapacity(RESOURCE_ENERGY);
          }
          if (room.storage !== undefined) {
            energyStored += room.storage.store.getUsedCapacity(RESOURCE_ENERGY);
          }
          if (linkAmount > 0) {
            room.links.forEach((item, i) => {
              if (flagMemory.links) {
                if (flagMemory.links.linkTo1) {
                  if (room.links[i].id == flagMemory.links.linkTo1 && room.terminal) {
                    energyStored += room.links[i].store.getUsedCapacity(RESOURCE_ENERGY);
                  }
                }
              }
            });
          }

          if (energyStored > 1500) {
            return true;
          }
          else return false;
        }

        function spawnCreep(spawn,role,targetRoom,flagName) {
          let name = role + "-" + Math.round(Math.random() * 100);
          if (!targetRoom)
          targetRoom = roomName;
          if (!flagName)
          flagName = roomName;

          let directionsList = [TOP, TOP_RIGHT, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];

          if (room.terminal)
            if (room.controller.level >= 6 && spawn.pos.inRangeTo(room.terminal,2)) {
              if (role.includes("LiTe")) {
                  directionsList = [TOP_RIGHT];
              }
              else {
                directionsList = [BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];
              }
            }


          return spawn.spawnCreep(
            getCreepSize(role),
            name,
            {
              memory: {
                working: false,
                role: role,
                spawnRoom: roomName,
                targetRoom: targetRoom,
                flagName: flagName
              }, directions: directionsList

            }
          )
        }

        function getCreepSize(role) {
          let energyAvailable = flagMemory.totalEnergyAvailable;
          let energyCapacity = flagMemory.totalEnergyCapacity;
          let parts = [];

          if (role == "harvester-0" || role == "harvester-1") {
            const energyCost = 300;
            let partAmount = Math.floor(energyAvailable/energyCost);
            if (energyAvailable <= 300) {
              parts.push(WORK);
              parts.push(WORK);
              parts.push(CARRY);
              parts.push(MOVE);
            }
            else {
              for (let i = 0; i < partAmount && i < 3; i++) {
                parts.push(WORK);
                parts.push(WORK);
                parts.push(CARRY);
                parts.push(MOVE);
              }
            }
          }
          else if (role == "transferer") {
            const energyCost = 100;
            let partAmount = Math.floor(energyAvailable/energyCost);
            if (energyAvailable <= 300) {
              parts.push(CARRY);
              parts.push(CARRY);
              parts.push(CARRY);
              parts.push(MOVE);
              parts.push(MOVE);
              parts.push(MOVE);
            }
            else {
              for (let i = 0; i < partAmount; i++) {
                parts.push(CARRY);
                parts.push(MOVE);
              }
            }
          }
          else if (role == "transfererLiTe") {
            const energyCost = 100;
            let partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < partAmount && i < 10; i++) {
              parts.push(CARRY);
              parts.push(MOVE);
            }
          }
          else if (role == "upgrader") {
            const energyCost = 300;
            let partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < partAmount && i < 5; i++) {
              parts.push(WORK);
              parts.push(WORK);
              parts.push(CARRY);
              parts.push(MOVE);
            }
          }
          else if (role == "builder") {
            const energyCost = 300;
            let partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < partAmount && i < 10; i++) {
              parts.push(WORK);
              parts.push(CARRY);
              parts.push(CARRY);
              parts.push(MOVE);
              parts.push(MOVE);
            }
          }
          else if (role == "repairer") {
            const energyCost = 300;
            let partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < partAmount && i < 10; i++) {
              parts.push(WORK);
              parts.push(CARRY);
              parts.push(CARRY);
              parts.push(MOVE);
              parts.push(MOVE);
            }
          }
          else if (role == "claimer") {
            const energyCost = 650;
            let partAmount = Math.floor(energyAvailable/energyCost);
            parts.push(CLAIM);
            parts.push(MOVE);
            //parts = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,CLAIM];
          }
          else if (role == "builderLD") {
            const energyCost = 300;
            let partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < partAmount && i < 10; i++) {
              parts.push(WORK);
              parts.push(CARRY);
              parts.push(CARRY);
              parts.push(MOVE);
              parts.push(MOVE);
            }
          }
          else if (role == "pixelFarmer") {
            const energyCost = 50;
            parts.push(MOVE);
          }
          else if (role == "ruinWithdrawer") {
            const energyCost = 200;
            let partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < partAmount; i++) {
              parts.push(CARRY);
              parts.push(CARRY);
              parts.push(CARRY);
              parts.push(MOVE);
            }
          }
          else if (role == "reserverLD") {
            const energyCost = 750;
            let partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < 2 && partAmount > 1&& i < partAmount; i++) {
              parts.push(CLAIM);
              parts.push(MOVE);
              parts.push(MOVE);
              parts.push(MOVE);
            }
          }
          else if (role.includes("harvesterLD")) {
            const energyCost = 350;
            let partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < 4; i++) {
              parts.push(CARRY);
              parts.push(WORK);
              parts.push(WORK);
              parts.push(MOVE);
              parts.push(MOVE);
            }
          }
          else if (role == "transfererLD") {
            const energyCost = 100;
            let partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < partAmount && partAmount >= 18 && i < 24; i++) {
              parts.push(CARRY);
              parts.push(MOVE);
            }
          }

          else if (role == "shardUp") { // claimer
            const energyCost = 650;
            let partAmount = Math.floor(energyAvailable/energyCost);
            parts.push(CLAIM);
            parts.push(MOVE);
            //parts = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,CLAIM];
          }
          // else if (role == "shardUp") { // builder
          //   const energyCost = 300;
          //   let partAmount = Math.floor(energyAvailable/energyCost);
          //   for (let i = 0; i < partAmount && i < 10; i++) {
          //     parts.push(WORK);
          //     parts.push(CARRY);
          //     parts.push(CARRY);
          //     parts.push(MOVE);
          //     parts.push(MOVE);
          //   }
          // }


          return parts;
        }

        function getCreepAmount() {
          if (longDistanceCreepsHasBeenCounted == false) {
            for (let name in Game.creeps) {
              let creep = Game.creeps[name];
              let role = creep.memory.role;
              const flagMemory = Memory.flags[creep.memory.spawnRoom];

              if (flagMemory) {
                if (!flagMemory.creepAmount) {
                  flagMemory.creepAmount = {};
                }
                if (role !== undefined && creep.memory.targetRoom == creep.memory.spawnRoom && flagMemory.creepAmount) {
                  if (creep.memory.role == "harvester-0") {
                    flagMemory.creepAmount.harvester0Count++;
                    flagMemory.creepAmount.harvester0WorkCount += creep.getActiveBodyparts(WORK);

                  }
                  if (creep.memory.role == "harvester-1") {
                    flagMemory.creepAmount.harvester1Count++;
                    flagMemory.creepAmount.harvester1WorkCount += creep.getActiveBodyparts(WORK);
                  }
                  if (creep.memory.role == "transferer") {
                    flagMemory.creepAmount.transfererCount++;
                    flagMemory.creepAmount.transfererCarryCount += creep.getActiveBodyparts(CARRY);
                  }
                  if (creep.memory.role == "transfererLiTe") {
                    flagMemory.creepAmount.transfererLiTeCount++;
                  }
                  if (creep.memory.role == "builder") {
                    flagMemory.creepAmount.builderCount++;
                    flagMemory.creepAmount.builderWorkCount += creep.getActiveBodyparts(WORK);
                  }
                  if (creep.memory.role == "upgrader") {
                    flagMemory.creepAmount.upgraderCount++;
                    flagMemory.creepAmount.upgraderWorkCount += creep.getActiveBodyparts(WORK);
                  }
                  if (creep.memory.role == "extractor") {
                    flagMemory.creepAmount.extractorCount++;
                  }
                  if (creep.memory.role == "repairer") {
                    flagMemory.creepAmount.repairerCount++;
                  }
                  if (creep.memory.role == "claimer") {
                    flagMemory.creepAmount.claimerCount++;
                  }
                  if (creep.memory.role == "builderLD") {
                    flagMemory.creepAmount.builderLDCount++;
                  }
                  if (creep.memory.role == "pixelFarmer") {
                    flagMemory.creepAmount.pixelFarmerCount++;
                  }
                  if (creep.memory.role == "ruinWithdrawer") {
                    flagMemory.creepAmount.ruinWithdrawerCount++;
                  }
                }
              }
            }

            for (let name in Game.creeps) {
              let creep = Game.creeps[name];
              let role = creep.memory.role;

              if (creep.memory.flagName && creep.memory.targetRoom !== creep.memory.spawnRoom) {
                const flag = Game.flags[creep.memory.flagName];
                const flagMemory = Memory.flags[flag.name];
                if (flagMemory.targetRoom) {
                  if (role !== undefined && creep.memory.targetRoom == flagMemory.targetRoom) {
                    if (!flagMemory.creepAmount) {
                      flagMemory.creepAmount = {};
                    }
                    else {
                      if (creep.memory.role == "reserverLD") {
                        flagMemory.creepAmount.reserverLD++;
                      }
                      else if (creep.memory.role == "harvesterLD-0") {
                        flagMemory.creepAmount.harvesterLD0++;
                      }
                      else if (creep.memory.role == "harvesterLD-1") {
                        flagMemory.creepAmount.harvesterLD1++;
                      }
                      else if (creep.memory.role == "harvesterLD-2") {
                        flagMemory.creepAmount.harvesterLD2++;
                      }
                      else if (creep.memory.role == "harvesterLD-3") {
                        flagMemory.creepAmount.harvesterLD3++;
                      }
                      else if (creep.memory.role == "transfererLD") {
                        flagMemory.creepAmount.transfererLD++;
                      }
                    }
                  }
                }
              }
            }
          }

          longDistanceCreepsHasBeenCounted = true;
        }

        function spawnManager() {
          getCreepAmount();

          if (canCreepSpawn("transferer")) {
            spawnCreep(spawn,"transferer");
          }
          else if (canCreepSpawn("harvester-0")) {
            spawnCreep(spawn,"harvester-0");
          }
          else if (canCreepSpawn("harvester-1")) {
            spawnCreep(spawn,"harvester-1");
          }
          else if (canCreepSpawn("builder")) {
            spawnCreep(spawn,"builder");
          }
          else if (canCreepSpawn("transfererLiTe")) {
            spawnCreep(Game.getObjectById(flagMemory.roomManager.headSpawn),"transfererLiTe");
          }
          else if (canCreepSpawn("upgrader")) {
            spawnCreep(spawn,"upgrader");
          }
          else if (canCreepSpawn("repairer")) {
            spawnCreep(spawn,"repairer",roomName);
          }
          else if (canCreepSpawn("extractor")) {
            spawnCreep(spawn,"extractor",roomName);
          }
          else if (canCreepSpawn("claimer")) {
            if (roomName == Memory.flags["claim"].spawnRoom) {
              spawnCreep(spawn,"claimer",roomName);
            }
          }
          else if (canCreepSpawn("builderLD")) {
            spawnCreep(spawn,"builderLD",roomName);
          }
          else if (canCreepSpawn("pixelFarmer")) {
            spawnCreep(spawn,"pixelFarmer",roomName);
          }
          else if (canCreepSpawn("ruinWithdrawer")) {
            spawnCreep(spawn,"ruinWithdrawer",roomName);
          }
          else if (canCreepSpawn("shardUp")) {
            spawnCreep(spawn,"shardUp",roomName);
          }
          else {
            if (room.controller.level >= 7) {
              getRemotes();
            }
          }

          if (flagMemory.creepAmount !== undefined) {
            //console.log(flagMemory.creepAmount.harvester0Count + roomName)
            flagMemory.creepAmount.harvester0Count = 0;
            flagMemory.creepAmount.harvester0WorkCount = 0;
            flagMemory.creepAmount.harvester1Count = 0;
            flagMemory.creepAmount.harvester1WorkCount = 0;
            flagMemory.creepAmount.transfererCount = 0;
            flagMemory.creepAmount.transfererCarryCount = 0;
            flagMemory.creepAmount.transfererLiTeCount = 0;
            flagMemory.creepAmount.builderCount = 0;
            flagMemory.creepAmount.builderWorkCount = 0;
            flagMemory.creepAmount.upgraderCount = 0;
            flagMemory.creepAmount.upgraderWorkCount = 0;
            flagMemory.creepAmount.repairerCount = 0;
            flagMemory.creepAmount.extractorCount = 0;
            flagMemory.creepAmount.claimerCount = 0;
            flagMemory.creepAmount.builderLDCount = 0;
            flagMemory.creepAmount.builderWorkCount = 0;
            flagMemory.creepAmount.pixelFarmerCount = 0;
            flagMemory.creepAmount.ruinWithdrawerCount = 0;
          }
        }

        function canCreepSpawn(role) {
          let result = false;

          if (flagMemory.creepAmount + roomName) {
            switch(role) {
              case "transferer":
              if (flagMemory.creepAmount.transfererCarryCount < (flagMemory.sources.length * 15 + 10) && roomNeedsTransferer()) {
                if (flagMemory.creepAmount.transfererCount < 6) {
                  result = true;
                }
              }
              break;
              case "transfererLiTe":
              if (flagMemory.creepAmount.transfererLiTeCount < 1 && flagMemory.links.linkTo1 && room.storage && room.terminal) {
                if (Game.getObjectById(flagMemory.roomManager.headSpawn) !== null) {
                  if (flagMemory.links.linkTo2.length > 0) {
                    result = true;
                  }
                }
              }
              break;
              case "harvester-0":
              if (flagMemory.creepAmount.harvester0WorkCount < 6) {
                if (flagMemory.sources[0] !== undefined) {
                  if (flagMemory.sources[0].openSpots > flagMemory.creepAmount.harvester0Count) {
                    result = true;
                  }
                }
              }
              break;
              case "harvester-1":
              if (flagMemory.creepAmount.harvester1WorkCount < 6) {
                if (flagMemory.sources[1] !== undefined) {
                  if (flagMemory.sources[1].openSpots > flagMemory.creepAmount.harvester1Count) {
                    result = true;
                  }
                }
              }
              break;
              case "builder":
              if (flagMemory.creepAmount.builderCount < 5 && flagMemory.constructionSitesAmount > 0) {
                if (flagMemory.creepAmount.builderWorkCount < (flagMemory.creepAmount.harvester0WorkCount + flagMemory.creepAmount.harvester0WorkCount) /2) {
                  result = true;
                }
              }
              break;
              case "upgrader":
              if (roomName !== "E42N2"&& flagMemory.creepAmount.upgraderWorkCount < (flagMemory.creepAmount.harvester0WorkCount + flagMemory.creepAmount.harvester0WorkCount) /2 && flagMemory.constructionSitesAmount == 0 && !Game.flags["builderLD"+roomName]) {
                if (flagMemory.creepAmount.upgraderCount < 4) {
                  result = true;
                }
              }
              break;
              case "repairer":
              if (flagMemory.creepAmount.repairerCount < 2 && room.towers.length == 0) {
                result = true;
              }
              break;
              case "extractor":
              if (flagMemory.creepAmount.extractorCount < 1 && flagMemory.mineralAmount > 0 && room.controller.level >= 6) {
                result = true;
              }
              break;
              case "claimer":
              if (flagMemory.creepAmount.claimerCount < 1 && Game.flags["claim"]) {
                result = true;
              }
              break;
              case "builderLD":
              if (flagMemory.creepAmount.builderLDCount < 4 && Game.flags["builderLD" + roomName]) {
                result = true;
              }
              break;
              case "pixelFarmer":
              if (Game.time % 200 == 0 && roomName == "E42N2") {
                result = true;
              }
              break;
              case "ruinWithdrawer":
              // if (flagMemory.creepAmount.ruinWithdrawerCount < 1 && room.storage) {
              //   result = true;
              // }
              break;
              case "shardUp":
              let onOff = "on";
              if (roomName == "E42N2" && Game.flags["testtest"] !== undefined) {
                result = true;
              }
              break;
            }
          }


          return result
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

        function checkIfRemoteMemoryIsSetup(flag) {
          if (!Memory.flags[flag.name]) {
            Memory.flags[flag.name] = {};
          }
          else {
            const flagMemory = Memory.flags[flag.name];
            if (flagMemory.targetRoom) {
              if (flagMemory.sourceAmount) {
                return true;
              }
              else {
                console.log(`The flag in ${flagMemory.targetRoom} is missing the sourceAmount`)
              }
            }
            else {
              console.log(`The flag ${flag.name} is missing the targetRoom`)
            }
          }
        }

        function canRemoteCreepSpawn(flagMemory,role) {
          let result = false;
          if (flagMemory.creepAmount) {
            switch(role) {
              case "transferer":
              if (flagMemory.creepAmount.transfererCarryCount < 40 && roomNeedsTransferer()) {
                if (flagMemory.creepAmount.transfererCount < 6) {
                  result = true;
                }
              }
              break;
              case "reserverLD":
              if (flagMemory.creepAmount.reserverLD < 1) {
                if (!flagMemory.reserveTicksLeft || flagMemory.reserveTicksLeft < 2000) {
                  result = true;
                }
              }
              break;
              case "harvesterLD-0":
              if (flagMemory.sourceAmount > 0) {
                if (flagMemory.creepAmount.harvesterLD0 < 1) {
                  result = true;
                }
              }
              break;
              case "harvesterLD-1":
              if (flagMemory.sourceAmount > 1) {
                if (flagMemory.creepAmount.harvesterLD1 < 1) {
                  result = true;
                }
              }
              break;
              case "harvesterLD-2":
              if (flagMemory.sourceAmount > 2) {
                if (flagMemory.creepAmount.harvesterLD2 < 1) {
                  result = true;
                }
              }
              break;
              case "harvesterLD-3":
              if (flagMemory.sourceAmount > 3) {
                if (flagMemory.creepAmount.harvesterLD3 < 1) {
                  result = true;
                }
              }
              break;
              case "transfererLD":
              if (flagMemory.sourceAmount > 0) {
                if (flagMemory.creepAmount.transfererLD < flagMemory.sourceAmount) {
                  result = true;
                }
              }
              break;
              default:
              break;
            }
            return result;
          }
          else {
            if (!flagMemory.creepAmount)
            flagMemory.creepAmount = {};

            flagMemory.creepAmount.reserverLD = 0;
            flagMemory.creepAmount.harvesterLD0 = 0;
            flagMemory.creepAmount.harvesterLD1 = 0;
            flagMemory.creepAmount.harvesterLD2 = 0;
            flagMemory.creepAmount.harvesterLD3 = 0;
            flagMemory.creepAmount.transfererLD = 0;
          }
        }

        function getRemotes() {
          for (let i = 0;i < 10;i++) {
            const flag = Game.flags["remote-"+ i+"-"+roomName];
            if (flag) {
              if (checkIfRemoteMemoryIsSetup(flag)) {
                const flagMemory = Memory.flags[flag.name];


                if (Game.time % 10 == 0) {
                  if (Game.rooms[flagMemory.targetRoom].controller.reservation) {
                    flagMemory.reserveTicksLeft = Game.rooms[flagMemory.targetRoom].controller.reservation.ticksToEnd;
                  }
                }

                if (canRemoteCreepSpawn(flagMemory,"transferer")) {
                  spawnCreep(spawn,"transferer");
                }
                else if (canRemoteCreepSpawn(flagMemory,"transfererLD")) {
                  spawnCreep(spawn,"transfererLD",flagMemory.targetRoom,flag.name);
                }
                else if (canRemoteCreepSpawn(flagMemory,"reserverLD")) {
                  spawnCreep(spawn,"reserverLD",flagMemory.targetRoom,flag.name);
                }
                else if (canRemoteCreepSpawn(flagMemory,"harvesterLD-0")) {
                  spawnCreep(spawn,"harvesterLD-0",flagMemory.targetRoom,flag.name);
                }
                else if (canRemoteCreepSpawn(flagMemory,"harvesterLD-1")) {
                  spawnCreep(spawn,"harvesterLD-1",flagMemory.targetRoom,flag.name);
                }
                else if (canRemoteCreepSpawn(flagMemory,"harvesterLD-2")) {
                  spawnCreep(spawn,"harvesterLD-2",flagMemory.targetRoom,flag.name);
                }
                else if (canRemoteCreepSpawn(flagMemory,"harvesterLD-3")) {
                  spawnCreep(spawn,"harvesterLD-3",flagMemory.targetRoom,flag.name);
                }
                else if (canRemoteCreepSpawn(flagMemory,"transfererLD")) {
                  spawnCreep(spawn,"transfererLD",flagMemory.targetRoom,flag.name);
                }
                flagMemory.creepAmount.reserverLD = 0;
                flagMemory.creepAmount.harvesterLD0 = 0;
                flagMemory.creepAmount.harvesterLD1 = 0;
                flagMemory.creepAmount.harvesterLD2 = 0;
                flagMemory.creepAmount.harvesterLD3 = 0;
                flagMemory.creepAmount.transfererLD = 0;
              }
            }
          }
        }

        function runGameTimeTimers() {
          if (Game.time % 10 == 0) {
            flagMemory.enemyCount = room.find(FIND_HOSTILE_CREEPS).length;
            getSpawningEnergy();

            if (spawn) {
              spawnManager();
            }


            if (flagMemory.links) {
              if (flagMemory.links.linkTo1 && flagMemory.links.linkTo2) {
                let linkTo1 = Game.getObjectById(flagMemory.links.linkTo1);
                let linkTo2 = Game.getObjectById(flagMemory.links.linkTo2);
                linkTo1.transferEnergy(linkTo2)
              }

              if (flagMemory.links.linkFrom1 && flagMemory.links.linkTo1) {
                let linkFrom1 = Game.getObjectById(flagMemory.links.linkFrom1);
                let linkTo1 = Game.getObjectById(flagMemory.links.linkTo1);
                linkFrom1.transferEnergy(linkTo1)
              }

              if (flagMemory.links.linkFrom2 && flagMemory.links.linkTo1) {
                let linkFrom2 = Game.getObjectById(flagMemory.links.linkFrom2);
                let linkTo1 = Game.getObjectById(flagMemory.links.linkTo1);
                linkFrom2.transferEnergy(linkTo1)
              }
            }
          }



          if (Game.time % 1000 == 0) {
            if (room.controller.level >= 6 && Object.keys(flagMemory.links).length < 4 && room.links.length > 0) {
              function findLinkInRange(object,range) {
                if (object !== undefined) {
                  return object.pos.findInRange(room.links, range,
                    {filter: {structureType: STRUCTURE_LINK}})[0];
                  }
                }


                if (room.controller.level >= 6 && (!flagMemory.links.linkTo1 || !flagMemory.links.linkTo2)) {
                  if (findLinkInRange(Game.getObjectById(flagMemory.roomManager.headSpawn),3) !== null && !flagMemory.links.linkTo1) {
                    flagMemory.links.linkTo1 = findLinkInRange(Game.getObjectById(flagMemory.roomManager.headSpawn),3).id
                  }
                  if (findLinkInRange(room.controller,3) !== null && !flagMemory.links.linkTo2) {
                    flagMemory.links.linkTo2 = findLinkInRange(room.controller,3).id
                  }
                }

                if (flagMemory.sources[0] && room.controller.level >= 7 && (!flagMemory.links.linkTo1 || !flagMemory.links.linkFrom1)) {
                  let source0 = Game.getObjectById(flagMemory.sources[0].id);
                  if (findLinkInRange(Game.getObjectById(flagMemory.roomManager.headSpawn),3) !== null && !flagMemory.links.linkTo1) {
                    flagMemory.links.linkTo1 = findLinkInRange(Game.getObjectById(flagMemory.roomManager.headSpawn),3).id
                  }
                  if (findLinkInRange(room.controller,3) !== null && !flagMemory.links.linkFrom1 && source0 !== undefined) {
                    flagMemory.links.linkFrom1 = findLinkInRange(source0,3).id
                  }
                }

                if (flagMemory.sources[1] && room.controller.level >= 7 && (!flagMemory.links.linkTo1 || !flagMemory.links.linkFrom2)) {
                  let source1 = Game.getObjectById(flagMemory.sources[1].id);
                  if (findLinkInRange(Game.getObjectById(flagMemory.roomManager.headSpawn),3) !== null && !flagMemory.links.linkTo1) {
                    flagMemory.links.linkTo1 = findLinkInRange(Game.getObjectById(flagMemory.roomManager.headSpawn),3).id
                  }

                  if (findLinkInRange(room.controller,3) !== null && !flagMemory.links.linkFrom2 && source1 !== null) {
                    flagMemory.links.linkFrom2 = findLinkInRange(source1,3).id
                  }
                }
              }
            }


            if (flagMemory.sources) {
              if (Game.time % 5000 == 0 || flagMemory.sources.length == 0) {
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


                flagMemory.controllerLevel = room.controller.level;
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

          function runRoomPlanner() {
            // if (flagMemory.controllerLevel < room.controller.level) {
            //   roomPlanner.run()
            // }
            if (roomName == "E43N3") {
              if (Game.time % 10 == 0) {
                roomManager.run(roomName)
              }
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
