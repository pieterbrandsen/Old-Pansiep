require('prototype.tower');
require('traveler');
require('prototype.Room.structures');

const roleHarvester = require('role.harvester');
const roleTransferer = require('role.transferer');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleBuilderLD = require('role.builderLD');
const roleRepairer = require('role.repairer');
const roleClaimer = require('role.claimer');


const roomPlanner = require('module.roomPlanner')

module.exports.loop = function() {
  let shardName = Game.shard.name;
  let shardArray = ["shard0","shard1","shard2","shard3"];
  let mainSystemMemory = Memory.mainSystem;

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
    if (Game.time % 50 == 0) {
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

      if (role !== undefined) {
        if (creep.memory.role.includes("harvester")) {
          roleHarvester.run(creep);
        }
        if (creep.memory.role.includes("transferer")) {
          roleTransferer.run(creep);
        }
        if (creep.memory.role.includes("builder")) {
          roleBuilder.run(creep);
        }
        if (creep.memory.role.includes("upgrader")) {
          roleUpgrader.run(creep);
        }
        if (creep.memory.role.includes("repairer")) {
          roleRepairer.run(creep);
        }
        if (creep.memory.role.includes("claimer")) {
          roleClaimer.run(creep);
        }
        if (creep.memory.role.includes("builderLD")) {
          roleBuilderLD.run(creep);
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


    if (controller && controller.my) {
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


      let harvester0Count  = 0;
      let harvester0WorkCount = 0;
      let harvester1Count  = 0;
      let harvester1WorkCount = 0;
      let transfererCount = 0;
      let transfererCarryCount = 0;
      let builderCount = 0;
      let upgraderCount = 0;
      let upgraderWorkCount = 0;
      let repairerCount = 0;
      let claimerCount = 0;

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


        if (((!containerInRange && structureType == STRUCTURE_CONTAINER) || (!linkInRange && structureType == STRUCTURE_LINK)) && constructionSitesInRange == null) {
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
            energyStored += room.containers[i].store.getUsedCapacity(RESOURCE_ENERGY);
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
            energyStored += room.links[i].store.getUsedCapacity(RESOURCE_ENERGY);
          });
        }

        if (energyStored > 1500) {
          return true;
        }
      }

      function spawnCreep(spawn,role) {
        let name = role + "-" + Math.round(Math.random() * 100)
        return spawn.spawnCreep(
          getCreepSize(role),
          name,
          {
            memory: {
              working: false,
              role: role,
              spawnRoom: roomName,
            }
          }
        )
      }

      function canCreepSpawn(spawn,parts) {
        let spawning = spawn.spawnCreep(
          parts,
          "noName",
          {dryRun: true}
        )
        return spawning !== ERR_NOT_ENOUGH_ENERGY;
      }

      function getCreepSize(role) {
        let energyAvailable = flagMemory.totalEnergyAvailable;
        let energyCapacity = flagMemory.totalEnergyCapacity;
        let parts = [];

        if (role.includes("harvester")) {
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
        else if (role.includes("transferer")) {
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
            for (let i = 0; i < partAmount && i < 10; i++) {
                parts.push(CARRY);
                parts.push(MOVE);
            }
          }
        }
        else if (role.includes("upgrader")) {
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
        else if (role = "repairer") {
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

        return parts;
      }

      function getCreepAmount(role) {
        for (let name in Game.creeps) {
          let creep = Game.creeps[name];
          let role = creep.memory.role


          if (role !== undefined && creep.memory.spawnRoom == room.name) {
            if (creep.memory.role == "harvester-0") {
              harvester0Count++;
              harvester0WorkCount += creep.getActiveBodyparts(WORK);
            }
            if (creep.memory.role == "harvester-1") {
              harvester1Count++;
              harvester1WorkCount += creep.getActiveBodyparts(WORK);
            }
            if (creep.memory.role == "transferer") {
              transfererCount++;
              transfererCarryCount += creep.getActiveBodyparts(CARRY);
            }
            if (creep.memory.role == "builder") {
              builderCount++;
            }
            if (creep.memory.role == "upgrader") {
              upgraderCount++;
              upgraderWorkCount += creep.getActiveBodyparts(WORK);
            }
            if (creep.memory.role == "repairer") {
              repairerCount++;
            }
            if (creep.memory.role == "claimer") {
              claimerCount++;
            }
            if (creep.memory.role == "builderLD") {
              builderLDCount++;
            }
          }
        }
      }

      function spawnManager() {
        getCreepAmount();
        const roleArray = ["transferer","harvester-0","harvester-1","builder","upgrader","repairer","claimer"]

        for (let i = 0; i < roleArray.length; i++) {
          if (roleArray[i] == "transferer") {
            if (roomNeedsTransferer()) {
              if (room.links.length < 4) {
                let neededTransfererCount = transfererCarryCount;
                if (transfererCarryCount < 40) {
                  spawnCreep(spawn,"transferer");
                  i = 10;
                }
              }
            }
          }
          else if (roleArray[i] == "harvester-0") {
            if (flagMemory.sources[0] !== undefined) {
              if (harvester0WorkCount <= 6) {
                if (flagMemory.sources[0].openSpots > harvester0Count) {
                  spawnCreep(spawn,"harvester-0");
                  i = 10;
                }
              }
            }
          }
          else if (roleArray[i] == "harvester-1") {
            if (flagMemory.sources[1] !== undefined) {
              if (harvester1WorkCount <= 6) {
                if (flagMemory.sources[1].openSpots > harvester1Count) {
                  spawnCreep(spawn,"harvester-1");
                  i = 10;
                }
              }
            }
          }
          else if (roleArray[i] == "builder") {
            if (builderCount < 3) {
              if (flagMemory.constructionSitesAmount > 0) {
                spawnCreep(spawn,"builder");
                i = 10;
              }
            }
          }
          else if (roleArray[i] == "upgrader") {
            if (upgraderWorkCount < 15 && upgraderCount < 4 && flagMemory.constructionSitesAmount == 0) {
              spawnCreep(spawn,"upgrader");
              i = 10;
            }
          }
          else if (roleArray[i] == "repairer") {
            if (repairerCount < 2) {
              if (room.towers.length == 0) {
                spawnCreep(spawn,getCreepSize("repairer"),"repairer",roomName);
                i = 10;
              }
            }
          }
          else if (roleArray[i] == "claimer") {
            if (claimerCount < 1 && Game.flags["claim"]) {
              if (roomName == Memory.flags["claim"].spawnRoom) {
                spawnCreep(spawn,getCreepSize("claimer"),"claimer",roomName);
                i = 10;
              }
            }
          }
          else if (roleArray[i] == "builderLD") {
            if (builderLDCount <3 && Game.flags["builderLD" + roomName]) {
              spawnCreep(spawn,"builderLD");
              i = 10;
            }
          }
        }
      }

      function getDamagedStructures() {
        if (flagMemory.enemyCount == 0 && flagMemory.repairTarget) {
          let repairAmount = 1 * 1000 * 1000 // 1 Million
          if (flagMemory.repairTarget.length == 0 && Game.time % 10000 == 0) {
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

          if (spawn) {
            spawnManager();
          }


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



        if (Game.time % 1000 == 0) {
          if (room.controller.level >= 6 && Object.keys(flagMemory.links).length < 4 && room.links.length > 0) {
            function findLinkInRange(object,range) {
              if (object !== undefined) {
                return object.pos.findInRange(room.links, range,
                  {filter: {structureType: STRUCTURE_LINK}})[0];
              }
            }
            if (room.controller.level >= 6 && (!flagMemory.links.linkTo1 || !flagMemory.links.linkTo2)) {
              if (findLinkInRange(Game.spawns[roomName+"-1"],3) !== null && !flagMemory.links.linkTo1) {
                flagMemory.links.linkTo1 = findLinkInRange(Game.spawns[roomName+ "-1"],3).id
              }
              if (findLinkInRange(room.controller,3) !== null && !flagMemory.links.linkTo2) {
                flagMemory.links.linkTo2 = findLinkInRange(room.controller,3).id
              }
            }

            if (flagMemory.sources[0] && room.controller.level >= 7 && (!flagMemory.links.linkTo1 || !flagMemory.links.linkFrom1)) {
              let source0 = Game.getObjectById(flagMemory.sources[0].id);
              if (findLinkInRange(Game.spawns[roomName+"-1"],3) !== null && !flagMemory.links.linkTo1) {
                flagMemory.links.linkTo1 = findLinkInRange(Game.spawns[roomName+ "-1"],3).id
              }
              if (findLinkInRange(room.controller,3) !== null && !flagMemory.links.linkFrom1 && source0 !== undefined) {
                flagMemory.links.linkFrom1 = findLinkInRange(source0,3).id
              }
            }

            if (flagMemory.sources[1] && room.controller.level >= 7 && (!flagMemory.links.linkTo1 || !flagMemory.links.linkFrom2)) {
              let source1 = Game.getObjectById(flagMemory.sources[1].id);
              if (findLinkInRange(Game.spawns[roomName+"-1"],3) !== null && !flagMemory.links.linkTo1) {
                flagMemory.links.linkTo1 = findLinkInRange(Game.spawns[roomName+ "-1"],3).id
              }

              if (findLinkInRange(room.controller,3) !== null && !flagMemory.links.linkFrom2 && source1 !== null) {
                flagMemory.links.linkFrom2 = findLinkInRange(source1,3).id
              }
            }
          }
        }



        if (Game.time % 5000 == 0 || flagMemory.sources.length == 0) {
          const sources = room.find(FIND_SOURCES);
          sources.forEach((item, i) => {
            flagMemory.sources[i] = {}
            flagMemory.sources[i].id = sources[i].id;
            createSurroundingConstructionSite(flagMemory.sources[i].id,2,7);
            flagMemory.sources[i].openSpots = getOpenSpotsNearSource(Game.getObjectById(sources[i].id));
          });

          flagMemory.constructionSitesAmount = room.find(FIND_CONSTRUCTION_SITES).length;
          createSurroundingConstructionSite(room.controller.id,3,6);
        }
      }

      function checkMissingMemory() {
        if (!flagMemory.sources)
          flagMemory.sources = [];
        if (!flagMemory.links)
          flagMemory.links = {};
        if (!flagMemory.controllerLevel)
          flagMemory.controllerLevel = room.controller.level;
        if (!flagMemory.constructionSitesAmount)
          flagMemory.constructionSitesAmount = room.find(FIND_CONSTRUCTION_SITES).length;
        if (!flagMemory.enemyCount)
          flagMemory.enemyCount = 0;
        if (!flagMemory.repairTarget)
          flagMemory.repairTarget = [];

        if (!flagMemory.harvesterCPU)
          flagMemory.harvesterCPU = {};
      }

      function runRoomPlanner() {
        if (flagMemory.controllerLevel < room.controller.level) {
          roomPlanner.run()
          flagMemory.controllerLevel = room.controller.level;
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

        delete Memory.stats['cpu.avg50'];
        delete Memory.stats['cpu.avg1000'];
        delete Memory.stats['cpu.bucket'];
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


      if (mainSystem()) {
        // Get the CPU Usage //
        let start = Game.cpu.getUsed();

        // Run the part //
        checkMissingMemory();

        // Set the average CPU Usage in the memory //
        totalCPUCheckMissingMemory += Game.cpu.getUsed() - start;
      }
      else {
        // Run the part without tracking //
        checkMissingMemory();
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
        claimerCode();

        // Set the average CPU Usage in the memory //
        totalCPUClaimerCode += Game.cpu.getUsed() - start;
      }
      else {
        // Run the part without tracking //
        claimerCode();
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

      setCPUInMemoryModules("harvestingModule",Memory.cpuTracker["harvesterCPU.total"]);
      setCPUInMemoryModules("upgraderModule",Memory.cpuTracker["upgraderCPU.total"]);
      setCPUInMemoryModules("transferModule",Memory.cpuTracker["transferCPU.total"]);
      setCPUInMemoryModules("withdrawModuleUpgrader",Memory.cpuTracker["withdrawCPU.upgrader"]);
      setCPUInMemoryModules("withdrawModuleNormal",Memory.cpuTracker["withdrawCPU.normal"]);
      Memory.cpuTracker["harvesterCPU.total"] = 0;
      Memory.cpuTracker["upgraderCPU.total"] = 0;
      Memory.cpuTracker["transferCPU.total"] = 0;
      Memory.cpuTracker["withdrawCPU.upgrader"] = 0;
      Memory.cpuTracker["withdrawCPU.normal"] = 0;
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
    Memory.stats['cpuTracker.runRoomCPUTracker.avg50'] = 0.98 * Memory.stats['cpuTracker.runRoomCPUTracker.avg50'] + 0.02 * (Game.cpu.getUsed() - start);
  }
  else {
    // Run the part without tracking //
    runRoomCPUTracker();
  }



    Memory.stats['cpu.avg50'] = 0.98 * Memory.stats['cpu.avg50'] + 0.02 * Game.cpu.getUsed();
    Memory.stats['cpu.avg1000'] = 0.999 * Memory.stats['cpu.avg1000'] + 0.001 * Game.cpu.getUsed();
    Memory.stats['cpu.bucket'] = Game.cpu.bucket;
};
