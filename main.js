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





  _.forEach(Object.keys(Game.rooms), function (roomName) {
    const room = Game.rooms[roomName];
    const controller = Game.rooms[roomName].controller;
    const flag = Memory.flags[roomName]

    if (!Game.flags[roomName]) {
      room.createFlag(25,25, roomName)
      Memory.flags[roomName] = {}
    }
    if (!Memory.flags[roomName]) {
      Memory.flags[roomName] = {}
    }


    if (room.name == "sim") {
      roomPlanner.run()
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

        if (room.controller.lever >= controllerLevel) {
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


        if (!containerInRange && !linkInRange) {
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


      if (!Memory.flags[roomName].sources && Memory.flags[roomName]) {
        Memory.flags[roomName].sources = [];
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

        })
      }

      if (Game.time % 5000 == 0) {
        flag.constructionSitesAmount = room.find(FIND_CONSTRUCTION_SITES).length;
      }

      // if (flag.controllerLevel < room.controller.level) {
      //   roomPlanner.run()
      //   //flag.controllerLevel = room.controller.level;
      // }

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

          if (energyStored > 1000) {
            return true;
          }
        }
        else if (room.terminal !== undefined) {
          energyStored += room.terminal.store.getUsedCapacity(RESOURCE_ENERGY);

          if (room.storage !== undefined) {
            energyStored += room.storage.store.getUsedCapacity(RESOURCE_ENERGY);
          }

          if (energyStored > 5000) {
            return true;
          }
        }
        else if (room.storage !== undefined) {
          energyStored += room.storage.store.getUsedCapacity(RESOURCE_ENERGY);

          if (room.terminal !== undefined) {
            energyStored += room.terminal.store.getUsedCapacity(RESOURCE_ENERGY);
          }
          if (energyStored > 5000) {
            return true;
          }
        }
        else if (linkAmount > 0) {
          room.links.forEach((item, i) => {
            energyStored += room.links[i].store.getUsedCapacity(RESOURCE_ENERGY);
          });

          if (energyStored > 500) {
            return true;
          }
        }
      }


      const spawn = getFirstOpenSpawn();
      function normalCreepsSpawnCreep(spawn,parts,role,roomName) {
        let name = role + "-" + Math.round(Math.random() * 100)
        spawn.spawnCreep(
          parts,
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
      function harvesterSpawnCreep(spawn,parts,role,roomName) {
        if (spawn !== null) {
          let name = role + "-" + Math.round(Math.random() * 100)
          return spawn.spawnCreep(
            parts,
            name,
            {
              memory: {
                role: role,
                working: false,
                spawnRoom: roomName,
              }
            }
          );
        }
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
      let harvester = [WORK,WORK,WORK,CARRY,MOVE]
      let harvesterSo = [WORK,WORK,CARRY,MOVE];
      let transferer = [CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
      let upgrader = [WORK,WORK,CARRY,MOVE];
      let builder = [WORK,CARRY,CARRY,MOVE,MOVE];
      let repairer = [WORK,CARRY,CARRY,MOVE,MOVE];

      if (spawn) {
        if (needsCreeps("transferer", roomName, 5) && roomNeedsTransferer()) {
          normalCreepsSpawnCreep(spawn,transferer,"transferer",roomName);
        }
        else if (flag.sources[0] !== undefined && needsCreeps("harvester-0", roomName, 3)) {
          if (canCreepSpawn(spawn,harvester)) {
            if (needsCreeps("harvester-0", roomName, 3)) {
              harvesterSpawnCreep(spawn,harvester,"harvester-0",roomName);
            }
          }
          else {
            if (needsCreeps("harvester-0", roomName, 3)) {
              harvesterSpawnCreep(spawn,harvesterSo,"harvester-0",roomName);
            }
          }
        }
        else if (flag.sources[1] !== undefined && needsCreeps("harvester-1", roomName, 3)) {
          if (canCreepSpawn(spawn,harvester)) {
            if (needsCreeps("harvester-1", roomName, 3)) {
              harvesterSpawnCreep(spawn,harvester,"harvester-1",roomName);
            }
          }
          else {
            if (needsCreeps("harvester-1", roomName, 3)) {
              harvesterSpawnCreep(spawn,harvesterSo,"harvester-1",roomName);
            }
          }
        }
        else if (needsCreeps("builder", roomName, 10) && flag.constructionSitesAmount > 0) {
          normalCreepsSpawnCreep(spawn,builder,"builder",roomName);
        }
        else if (needsCreeps("upgrader", roomName, 2)) {
          normalCreepsSpawnCreep(spawn,upgrader,"upgrader",roomName);
        }
        else if (needsCreeps("repairer", roomName, 2)) {
          normalCreepsSpawnCreep(spawn,repairer,"repairer",roomName);
        }
      }
    }
  });
};


// function canHarvesterSpawn(source) {
//   const terrain = new Room.Terrain(roomName);
//   const sourcePos = source.pos;
//   let sourcePosX;
//   let sourcePosY;
//   let count = 8;
//
//   sourcePosX = source.pos.x-1;
//   sourcePosY = source.pos.y-1;
//   if (terrain.get(sourcePosX,sourcePosY) == 1)
//     count--;
//
//   sourcePosX = source.pos.x;
//   sourcePosY = source.pos.y-1;
//   if (terrain.get(sourcePosX,sourcePosY) == 1)
//     count--;
//
//   sourcePosX = source.pos.x+1;
//   sourcePosY = source.pos.y-1;
//   if (terrain.get(sourcePosX,sourcePosY) == 1)
//     count--;
//
//   sourcePosX = source.pos.x-1;
//   sourcePosY = source.pos.y;
//   if (terrain.get(sourcePosX,sourcePosY) == 1)
//     count--;
//
//   sourcePosX = source.pos.x+1;
//   sourcePosY = source.pos.y;
//   if (terrain.get(sourcePosX,sourcePosY) == 1)
//     count--;
//
//   sourcePosX = source.pos.x-1;
//   sourcePosY = source.pos.y+1;
//   if (terrain.get(sourcePosX,sourcePosY) == 1)
//     count--;
//
//   sourcePosX = source.pos.x;
//   sourcePosY = source.pos.y+1;
//   if (terrain.get(sourcePosX,sourcePosY) == 1)
//     count--;
//
//   sourcePosX = source.pos.x+1;
//   sourcePosY = source.pos.y+1;
//   if (terrain.get(sourcePosX,sourcePosY) == 1)
//     count--;
//
//   return count;
// }
