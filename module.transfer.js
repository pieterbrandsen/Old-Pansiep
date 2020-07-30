const builderModule = require('module.builder');
const checkMissingMemory = require('module.checkMissingMemory')

module.exports = {
  run: function(creep) {
    const flagMemory = Memory.flags[creep.room.name];

    if (!creep.memory.waitTransferer || Game.time % 20 == 0) {
      creep.memory.waitTransferer = false;
    }
    if (!creep.memory.transferId)
    creep.memory.transferId = "";



    function mainSystem() {
      // If Memory.mainSystem is defined //
      if (Memory.mainSystem) {
        // If Memory.mainSystem is allowed to track cpu return True //
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

    function transferTarget(target) {
      const runTransfer = creep.transfer(target,RESOURCE_ENERGY);
      switch(runTransfer) {
        case OK:
        creep.say("Transfer");
        creep.memory.transferStructure = target.structureType;
        creep.memory.transferId = "";
        case ERR_NOT_OWNER:
        break;
        case ERR_BUSY:
        break;
        case ERR_NOT_ENOUGH_RESOURCES:
        break;
        case ERR_INVALID_TARGET:
        findNewTarget();
        break;
        case ERR_FULL:
        findNewTarget();
        break;
        case ERR_NOT_IN_RANGE:
        creep.travelTo(target);
        break;
        case ERR_INVALID_ARGS:
        break;
        default:
        break;
      }
    }


    function findNewTarget() {
      if (creep.memory.role.includes("harvest")) {
        let sourceObject = Game.getObjectById(creep.memory.sourceId);
        let containerInRange = creep.pos.findClosestByRange(creep.room.containers, {filter: (structure) => {
          return (structure.pos.inRangeTo(sourceObject,2));
        }});
        let linkInRange = creep.pos.findClosestByRange(creep.room.links, {filter: (structure) => {
          return (structure.pos.inRangeTo(sourceObject,2));
        }});


        if (containerInRange !== null)
        creep.memory.transferId = containerInRange.id;
        else if (linkInRange !== null)
        creep.memory.transferId = linkInRange.id;
        else {
          builderModule.run(creep);
          if (creep.memory.role.includes("-0"))
          flagMemory.roomManager[`source-0.HasStructure`] = false;
          if (creep.memory.role.includes("-1"))
          flagMemory.roomManager[`source-1.HasStructure`] = false;
          if (creep.memory.role.includes("-2"))
          flagMemory.roomManager[`source-2.HasStructure`] = false;
          if (creep.memory.role.includes("-3"))
          flagMemory.roomManager[`source-3.HasStructure`] = false;
        }
      }
      else {

        const controllerStorage = Game.getObjectById(flagMemory.controllerStorage);

        if (creep.memory.waitTransferer == false && creep.memory.role == "transferer") {
          let target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType === STRUCTURE_SPAWN
              || s.structureType === STRUCTURE_EXTENSION
              || (s.structureType === STRUCTURE_TOWER && s.store.getUsedCapacity(RESOURCE_ENERGY) < 500 && creep.store.getUsedCapacity(RESOURCE_ENERGY) >= 150) && flagMemory.energyAvailable == flagMemory.energyCapacity
            ) && s.energy < s.energyCapacity
          });

          if (target !== null)
          creep.memory.transferId = target.id;
          else
          creep.memory.waitTransferer = true;
        }
        else {
          if (controllerStorage) {
            if (flagMemory.totalEnergyCapacity !== flagMemory.totalEnergyAvailable && creep.memory.role == "transferer")
            creep.memory.waitTransferer = false;
            else if (controllerStorage.store.getUsedCapacity() < 1000 && (controllerStorage.structureType == STRUCTURE_CONTAINER || creep.room.controller.level < 6) && creep.memory.role == "transferer")
            creep.memory.transferId = controllerStorage.id;
            else {
              if (creep.room.storage)
              creep.memory.transferId = creep.room.storage.id
            }
          }
        }
      }
    }

    if (mainSystem()) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      transferTarget(Game.getObjectById(creep.memory.transferId));

      // Set the average CPU Usage in the memory //

      Memory.cpuTracker["transferCPU.total"] += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      transferTarget(Game.getObjectById(creep.memory.transferId));
    }
  }
};
