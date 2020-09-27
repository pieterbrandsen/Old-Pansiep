const runMainSystem = require('function.mainSystem');
const builderModule = require('creepModule.build');

function transferTarget(creepName) {
  const creep = Game.creeps[creepName];
  const target = Game.getObjectById(creep.memory.transferId);

  const runTransfer = creep.transfer(target, Object.keys(creep.store)[0]);

  switch(runTransfer) {
    case OK:
    creep.say("Transfer");
    creep.memory.transferStructure = target.structureType;
    case ERR_NOT_OWNER:
    break;
    case ERR_BUSY:
    break;
    case ERR_NOT_ENOUGH_RESOURCES:
    break;
    case ERR_INVALID_TARGET:
    case ERR_FULL:
    findNewTarget(creep.name);
    break;
    case ERR_NOT_IN_RANGE:
    const runTravelTo = creep.travelTo(target, {maxRooms: 1});

    if (runTravelTo == ERR_NO_PATH)
    findNewTarget(creep.name);
    break;
    case ERR_INVALID_ARGS:
    break;
    default:
    break;
  }
}

function findNewTarget(creepName) {
  const creep = Game.creeps[creepName];

  const room = creep.room;
  const flagMemory = Memory.flags[creep.room.name];
  if (creep.memory.role.includes("harvest")) {
    let sourceObject = Game.getObjectById(creep.memory.withdrawId);
    let containerId;
    let linkId;


    const sourceNumber = creep.memory.role.split("-")[1];
    if (flagMemory.sources && Game.getObjectById(flagMemory.sources[sourceNumber].structureId) !== null)
    creep.memory.transferId = flagMemory.sources[sourceNumber].structureId;
    else {
      if (Game.time % 50 == 0)
      flagMemory.constructionSitesAmount = creep.room.find(FIND_CONSTRUCTION_SITES).length;

      if (Memory.flags[creep.memory.targetRoom].constructionSitesAmount > 0)
      builderModule.run(creep);
    }
  }
  else {
    if (creep.memory.role == "transferer") {
      const controllerStructureId = Game.getObjectById(flagMemory.controller.structure);

      if (creep.memory.waitTransferer == false) {
        let target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
          filter: (s) => (s.structureType === STRUCTURE_SPAWN
            || s.structureType === STRUCTURE_EXTENSION
            || (s.structureType === STRUCTURE_TOWER && s.store.getUsedCapacity(RESOURCE_ENERGY) < 500 && creep.store.getUsedCapacity(RESOURCE_ENERGY) >= 150) && flagMemory.energyAvailable == flagMemory.energyCapacity
          ) && s.energy < s.energyCapacity
        });

        if (target !== null)
        creep.memory.transferId = target.id;
        else if (flagMemory.enemyCreepCount == 0)
        creep.memory.waitTransferer = true;
      }
      else {
        if (controllerStructureId) {
          if (flagMemory.totalEnergyCapacity !== flagMemory.totalEnergyAvailable)
          creep.memory.waitTransferer = false;
          else if (controllerStructureId.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && (controllerStructureId.structureType == STRUCTURE_CONTAINER || creep.room.controller.level < 6)) {
            creep.memory.transferId = controllerStructureId.id;
          }
          else {
            if (creep.room.storage && creep.room.controller.level >= 4)
            creep.memory.transferId = creep.room.storage.id
          }
        }
        else {
          if (flagMemory.totalEnergyCapacity !== flagMemory.totalEnergyAvailable)
          creep.memory.waitTransferer = false;
          else if (creep.room.storage && creep.room.controller.level >= 4)
          creep.memory.transferId = creep.room.storage.id;
        }
      }
    }
    else if (creep.room.storage && creep.room.controller.level >= 4)
    creep.memory.transferId = creep.room.storage.id;
  }
};

module.exports = {
  harvester: function(creep) {
    // Get the variables needed for module //
    const flagMemory = Memory.flags[creep.memory.spawnRoom];
    const getMainSystem = runMainSystem.run();
    const target = Game.getObjectById(creep.memory.transferId);

    function runModule() {
      if (target) {
        if (target.hits < 100000)
        creep.repair(target);
        else
        transferTarget(creep.name);
      }
      else
      transferTarget(creep.name);
    }


    if (getMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runModule();

      // Set the average CPU Usage in the memory //

      Memory.flags[creep.memory.spawnRoom].trackers.cpuModule.transferModule += Game.cpu.getUsed() - start;
    }
    else
    // Run the part without tracking //
    runModule();
  },

  run: function(creep) {
    // Get the variables needed for module //
    const flagMemory = Memory.flags[creep.memory.spawnRoom];
    const getMainSystem = runMainSystem.run();

    if (!creep.memory.waitTransferer || Game.time % 20 == 0) creep.memory.waitTransferer = false;

    if (getMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      transferTarget(creep.name);

      // Set the average CPU Usage in the memory //

      Memory.flags[creep.memory.spawnRoom].trackers.cpuModule.transferModule += Game.cpu.getUsed() - start;
    }
    else
    // Run the part without tracking //
    transferTarget(creep.name);
  }
};
