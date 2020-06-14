require('traveler');
require('prototype.Room.structures');

const roleHarvester = require('role.harvester');
const roleTransferer = require('role.transferer');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRepairer = require('role.repairer');


const roomPlanner = require('module.roomPlanner')

module.exports.loop = function() {
  if (!Memory.flags)
  Memory.flags = {};
  if (!Memory.stats)
  Memory.stats = {};

  if (Game.time % 50 == 0) {
    for (let name in Memory.creeps) {
      if (Game.creeps[name] === undefined) {
        delete Memory.creeps[name];
      }
    }
  }



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
    }
  }





  _.forEach(Object.keys(Game.rooms), function (roomName) {
    const room = Game.rooms[roomName];
    const controller = Game.rooms[roomName].controller;
    const flag = Memory.flags[roomName];

    if (!Game.flags[roomName]) {
      room.createFlag(25,25, roomName)
      Memory.flags[roomName] = {}
    }
    if (!Memory.flags[roomName]) {
      Memory.flags[roomName] = {}
    }



    if (controller && controller.my) {
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


      let towers = room.towers;

      if (_.size(flag.enemy) > 0) {
        for (let tower of towers) {
          tower.defend();
        }
      }

      if (_.size(flag.enemy) == 0) {
        let repairTarget = flag.repairTarget;

        if (!flag.repairTarget) {
          flag.repairTarget = [];
        }

        if (flag.repairTarget !== undefined) {
          let repairAmount = 7 * 1000 * 1000 // 8 Million

          if (flag.repairTarget.length == 0 && Game.time % 10000 == 0) {
            let targetRepair = room.find(FIND_STRUCTURES, {
              filter: (s) => s.hits < s.hitsMax && s.hits < repairAmount
            });

            if (targetRepair.length > 0) {
              for (let i = 0; targetRepair.length > i; i++) {
                flag.repairTarget[i] = targetRepair[i].id
              }
            }
          }


          if (flag.repairTarget.length > 0) {
            for (let tower of towers) {
              let target = Game.getObjectById(flag.repairTarget[0]);

              if (target !== null) {
                if (target.hits < target.hitsMax && target.hits < repairAmount) {
                  tower.repair(target);
                }
                else {
                  flag.repairTarget.shift();
                }
              }
              else {
                flag.repairTarget.shift();
              }
            }
          }
        }
      }


      if (Game.time % 10 == 0) {
        flag.totalEnergyAvailable = room.energyAvailable;
        let spawns = room.spawns.length;
        let extensions = room.extensions.length;

        if (controller.level == 1) {
          if (room.spawns.length > 0) {
            if (spawns > 1)
              spawns = 1;

            flag.totalEnergyCapacity = (spawns * 300);
            }
        }
        if (controller.level == 2) {
          if (room.spawns.length > 0) {
            if (spawns > 1)
              spawns = 1;
            if (extensions > 5)
              extensions = 5;

            flag.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
            }
        }
        else if (controller.level == 3) {
          if (room.spawns.length > 0) {
            if (spawns > 1)
              spawns = 1;
            if (extensions > 10) {
              extensions = 10;
            }

            flag.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
            }
        }
        else if (controller.level == 4) {
          if (room.spawns.length > 0) {
            if (spawns > 1)
              spawns = 1;
            if (extensions > 20)
              extensions = 20;

            flag.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
            }
        }
        else if (controller.level == 5) {
          if (room.spawns.length > 0) {
            if (spawns > 1)
              spawns = 1;
            if (extensions > 30)
              extensions = 30;

            flag.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
            }
        }
        else if (controller.level == 6) {
          if (room.spawns.length > 0) {
            if (spawns > 1)
              spawns = 1;
            if (extensions > 40)
              extensions = 40;

            flag.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
            }
        }
        else if (controller.level == 7) {
          if (room.spawns.length > 0) {
            if (spawns > 2)
              spawns = 2;
            if (extensions > 50)
              extensions = 50;

            flag.totalEnergyCapacity = (spawns * 300) + (extensions * 100);
            }
        }
        else if (controller.level == 8) {
          flag.totalEnergyCapacity = (spawns * 300) + (extensions * 200);
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


      if (!Memory.flags[roomName].sources && Memory.flags[roomName]) {
        Memory.flags[roomName].sources = [];
      }
      if (!Memory.flags[roomName].links && Memory.flags[roomName]) {
        Memory.flags[roomName].links = {};
      }
      if (!Memory.flags[roomName].controllerLevel && Memory.flags[roomName]) {
        Memory.flags[roomName].controllerLevel = room.controller.level;
      }
      if (!Memory.flags[roomName].constructionSitesAmount && Memory.flags[roomName]) {
        Memory.flags[roomName].constructionSitesAmount = room.find(FIND_CONSTRUCTION_SITES).length;
      }


      if (Memory.flags[roomName].sources.length == 0 || Game.time % 5000 == 0) {
        const sources = room.find(FIND_SOURCES);
        // needs to stop looking if there is already a container or link in range!
        sources.forEach((item, i) => {
          flag.sources[i] = {}
          flag.sources[i].id = sources[i].id;

          createSurroundingConstructionSite(flag.sources[i].id,2,7);

          flag.sources[i].openSpots = getOpenSpotsNearSource(Game.getObjectById(sources[i].id));
        })
      }

      if (Game.time % 5000 == 0) {
        flag.constructionSitesAmount = room.find(FIND_CONSTRUCTION_SITES).length;
        createSurroundingConstructionSite(room.controller.id,3,6);
      }


      let linkMemory = Memory.flags[roomName].links;
      if (Game.time % 1000 == 0) {
        if (room.controller.level >= 6 && Object.keys(Memory.flags[roomName].links).length < 4 && room.links.length > 0) {
          function findLinkInRange(object,range) {
            if (object !== undefined) {
              return object.pos.findInRange(room.links, range,
                {filter: {structureType: STRUCTURE_LINK}})[0];
            }
          }
          if (room.controller.level >= 6 && (!linkMemory.linkTo1 || !linkMemory.linkTo2)) {
            if (findLinkInRange(Game.spawns[roomName+"-1"],3) !== null && !linkMemory.linkTo1) {
              linkMemory.linkTo1 = findLinkInRange(Game.spawns[roomName+ "-1"],3).id
            }
            if (findLinkInRange(room.controller,3) !== null && !linkMemory.linkTo2) {
              linkMemory.linkTo2 = findLinkInRange(room.controller,3).id
            }
          }

          if (flag.sources[0] && room.controller.level >= 7 && (!linkMemory.linkTo1 || !linkMemory.linkFrom1)) {
            let source0 = Game.getObjectById(flag.sources[0].id);
            if (findLinkInRange(Game.spawns[roomName+"-1"],3) !== null && !linkMemory.linkTo1) {
              linkMemory.linkTo1 = findLinkInRange(Game.spawns[roomName+ "-1"],3).id
            }
            if (findLinkInRange(room.controller,3) !== null && !linkMemory.linkFrom1 && source0 !== undefined) {
              linkMemory.linkFrom1 = findLinkInRange(source0,3).id
            }
          }

          if (flag.sources[1] && room.controller.level >= 7 && (!linkMemory.linkTo1 || !linkMemory.linkFrom2)) {
            let source1 = Game.getObjectById(flag.sources[1].id);
            if (findLinkInRange(Game.spawns[roomName+"-1"],3) !== null && !linkMemory.linkTo1) {
              linkMemory.linkTo1 = findLinkInRange(Game.spawns[roomName+ "-1"],3).id
            }

            if (findLinkInRange(room.controller,3) !== null && !linkMemory.linkFrom2 && source1 !== null) {
              linkMemory.linkFrom2 = findLinkInRange(source1,3).id
            }
          }
        }
      }

      if (Game.time % 10 == 0) {
        if (linkMemory.linkTo1 && linkMemory.linkTo2) {
          let linkTo1 = Game.getObjectById(linkMemory.linkTo1);
          let linkTo2 = Game.getObjectById(linkMemory.linkTo2);
          linkTo1.transferEnergy(linkTo2)
        }

        if (linkMemory.linkFrom1 && linkMemory.linkTo1) {
          let linkFrom1 = Game.getObjectById(linkMemory.linkFrom1);
          let linkTo1 = Game.getObjectById(linkMemory.linkTo1);
          linkFrom1.transferEnergy(linkTo1)
        }

        if (linkMemory.linkFrom2 && linkMemory.linkTo1) {
          let linkFrom2 = Game.getObjectById(linkMemory.linkFrom2);
          let linkTo1 = Game.getObjectById(linkMemory.linkTo1);
          linkFrom2.transferEnergy(linkTo1)
        }
      }


      if (flag.controllerLevel < room.controller.level) {
        roomPlanner.run()
        flag.controllerLevel = room.controller.level;
      }

      function needsCreeps(role, roomName, numbers) {
        let numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role === role && c.memory.spawnRoom === roomName);
        return numberOfCreeps < numbers
      }

      function getFirstOpenSpawn() {
        let freeSpawns = room.find(FIND_MY_SPAWNS, {
          filter: (structure) => {
            return (structure.spawning == null);
          }
        });

        if (freeSpawns.length > 0) {
          return freeSpawns[0];
        }
        return null;
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


      const spawn = getFirstOpenSpawn();
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
        );
      }

      function canCreepSpawn(spawn,parts) {
        let parts2 = (parts.toString()).split(",");
        let spawning = spawn.spawnCreep(
          parts2,
          "name",
          {dryRun: true}
        )

        return spawning !== ERR_NOT_ENOUGH_ENERGY;
      }



      function getCreepSize(role) {
        let energyAvailable = flag.totalEnergyAvailable;
        let energyCapacity = flag.totalEnergyCapacity;
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
        else if (role.includes("builder")) {
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
        else if (role.includes("repairer")) {
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
      function getCreepAmount(role) {
        for (let name in Game.creeps) {
          let creep = Game.creeps[name];
          let role = creep.memory.role


          if (role !== undefined && creep.memory.spawnRoom == room.name) {
            if (creep.memory.role.includes("harvester-0")) {
              harvester0Count++;
              harvester0WorkCount += creep.getActiveBodyparts(WORK);
            }
            if (creep.memory.role.includes("harvester-1")) {
              harvester1Count++;
              harvester1WorkCount += creep.getActiveBodyparts(WORK);
            }
            if (creep.memory.role.includes("transferer")) {
              transfererCount++;
              transfererCarryCount += creep.getActiveBodyparts(CARRY);
            }
            if (creep.memory.role.includes("builder")) {
              builderCount++;
            }
            if (creep.memory.role.includes("upgrader")) {
              upgraderCount++;
              upgraderWorkCount += creep.getActiveBodyparts(WORK);
            }
            if (creep.memory.role.includes("repairer")) {
              repairerCount++;
            }
          }
        }
      }
      getCreepAmount()


      function spawnManager() {
        const roleArray = ["transferer","harvester-0","harvester-1","builder","upgrader","repairer"]

        for (let i = 0; i < roleArray.length; i++) {
          if (roleArray[i] == "transferer") {
            if (roomNeedsTransferer()) {
              if (room.links.length < 4) {
                const neededTransfererCount = 5;
                if (transfererCount < neededTransfererCount) {
                  spawnCreep(spawn,"transferer");
                  i = 10;
                }
              }
            }
          }
          else if (roleArray[i] == "harvester-0") {
            if (flag.sources[0] !== undefined) {
              if (harvester0WorkCount <= 6) {
                if (flag.sources[0].openSpots > harvester0Count) {
                  spawnCreep(spawn,"harvester-0");
                  i = 10;
                }
              }
            }
          }
          else if (roleArray[i] == "harvester-1") {
            if (flag.sources[1] !== undefined) {
              if (harvester1WorkCount <= 6) {
                if (flag.sources[1].openSpots > harvester1Count) {
                  spawnCreep(spawn,"harvester-1");
                  i = 10;
                }
              }
            }
          }
          else if (roleArray[i] == "builder") {
            if (builderCount < 3) {
              if (flag.constructionSitesAmount > 0) {
                spawnCreep(spawn,"builder");
                i = 10;
              }
            }
          }
          else if (roleArray[i] == "upgrader") {
            if (upgraderWorkCount < 15 && upgraderCount < 4) {
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
        }
      }



      if (Game.time % 5 == 0) {
        if (spawn) {
          spawnManager()
        }
      }
    }
  });
};
