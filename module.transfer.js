const runMainSystem = require('miniModule.mainSystem');
const builderModule = require('module.build');

module.exports = {
  run: function(creep) {
    // Get the variables needed for module //
    const flagMemory = Memory.flags[creep.memory.spawnRoom];
    const getMainSystem = runMainSystem.run();

    if (!creep.memory.waitTransferer || Game.time % 20 == 0)
    creep.memory.waitTransferer = false;
    if (!creep.memory.targetId)
    creep.memory.targetId = "";


    function transferTarget() {
      const target = Game.getObjectById(creep.memory.targetId);

      let runTransfer = creep.transfer(target, Object.keys(creep.store)[0])

      if (creep.memory.role.includes("harvesterLD") && target) {
        if (target.hits < 200000) {
          creep.repair(target);
          runTransfer = "";
        }
      }

      switch(runTransfer) {
        case OK:
        creep.say("Transfer");
        creep.memory.transferStructure = target.structureType;
        if (!creep.memory.role.includes("harvest"))
        creep.memory.targetId = "";
        case ERR_NOT_OWNER:
        break;
        case ERR_BUSY:
        break;
        case ERR_NOT_ENOUGH_RESOURCES:
        break;
        case ERR_INVALID_TARGET:
        case ERR_FULL:
        findNewTarget();
        break;
        case ERR_NOT_IN_RANGE:
        creep.moveTo(target);
        break;
        case ERR_INVALID_ARGS:
        break;
        default:
        break;
      }
    }


    function findNewTarget() {
      if (creep.memory.role.includes("harvest")) {
        if (Game.getObjectById(creep.memory.targetId) == null || Memory.flags[creep.memory.targetRoom].constructionSitesAmount > 0) {
          let sourceObject = Game.getObjectById(creep.memory.sourceId);
          let containerId;
          let linkId;

          Game.rooms[creep.memory.targetRoom].containers.forEach((container, i) => {
            if (container && sourceObject) {
              if (container.pos.inRangeTo(sourceObject,2))
              containerId = container.id;
            }
          });

          Game.rooms[creep.memory.targetRoom].links.forEach((link, i) => {
            if (link && sourceObject) {
              if (link.pos.inRangeTo(sourceObject,2))
              linkId = link.id;
            }
          });

          if (containerId)
          creep.memory.targetId = containerId;
          else if (linkId)
          creep.memory.targetId = linkId;
          else {
            if (Memory.flags[creep.memory.targetRoom].constructionSitesAmount > 0)
            builderModule.run(creep);
            else if (creep.memory.role.includes("harvesterLD")) {
              if (creep.pos.inRangeTo(sourceObject, 1)) {
                creep.room.createConstructionSite(creep.pos,STRUCTURE_CONTAINER);
                Memory.flags[creep.memory.targetRoom].constructionSitesAmount = 1;
              }
              else
              creep.moveTo(sourceObject);
            }
          }
        }
      }
      else {
        if (creep.memory.role == "transferer") {
          const controllerStorage = Game.getObjectById(flagMemory.controllerStorage);

          if (creep.memory.waitTransferer == false) {
            let target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
              filter: (s) => (s.structureType === STRUCTURE_SPAWN
                || s.structureType === STRUCTURE_EXTENSION
                || (s.structureType === STRUCTURE_TOWER && s.store.getUsedCapacity(RESOURCE_ENERGY) < 500 && creep.store.getUsedCapacity(RESOURCE_ENERGY) >= 150) && flagMemory.energyAvailable == flagMemory.energyCapacity
              ) && s.energy < s.energyCapacity
            });

            if (target !== null)
            creep.memory.targetId = target.id;
            else if (flagMemory.enemyCreepCount == 0)
            creep.memory.waitTransferer = true;
          }
          else {
            if (controllerStorage) {
              if (flagMemory.totalEnergyCapacity !== flagMemory.totalEnergyAvailable)
              creep.memory.waitTransferer = false;
              else if (controllerStorage.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && (controllerStorage.structureType == STRUCTURE_CONTAINER || creep.room.controller.level < 6)) {
                creep.memory.targetId = controllerStorage.id;
              }
              else {
                if (creep.room.storage && creep.room.controller.level >= 4)
                creep.memory.targetId = creep.room.storage.id
              }
            }
            else {
              if (flagMemory.totalEnergyCapacity !== flagMemory.totalEnergyAvailable)
              creep.memory.waitTransferer = false;
              else if (creep.room.storage && creep.room.controller.level >= 4)
              creep.memory.targetId = creep.room.storage.id;
            }
          }
        }
        else if (creep.room.storage && creep.room.controller.level >= 4)
        creep.memory.targetId = creep.room.storage.id;
      }
    }

    if (getMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      transferTarget();

      // Set the average CPU Usage in the memory //

      Memory.flags[creep.memory.spawnRoom].trackers.cpuModule.transferModule += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      transferTarget();
    }
  }
};
