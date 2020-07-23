const builderModule = require('module.builder');

module.exports = {
  run: function(creep) {
    const flagMemory = Memory.flags[creep.room.name];

    if (!creep.memory.waitTransferer || Game.time % 20 == 0) {
      creep.memory.waitTransferer = false;
    }
    if (!creep.memory.targetId)
    creep.memory.targetId = "";



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
        creep.memory.targetId = "";
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
        creep.memory.targetId = containerInRange.id;
        else if (linkInRange !== null)
        creep.memory.targetId = linkInRange.id;
        else
        builderModule.run(creep);
      }
      else {

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
          else
          creep.memory.waitTransferer = true;
        }
        else
        if (controllerStorage)
        if (controllerStorage.store.getUsedCapacity() < 1500 && (controllerStorage.structureType == STRUCTURE_CONTAINER || creep.room.controller.level < 6))
        creep.memory.targetId = controllerStorage.id;
        else if (flagMemory.totalEnergyCapacity !== flagMemory.totalEnergyAvailable) {
          creep.memory.waitTransferer = false;
        }
        else {
          if (creep.room.storage)
          creep.memory.targetId = creep.room.storage.id
          else if (creep.room.storage)
          creep.memory.targetId = creep.room.storage.id
        }
      }
    }

    if (mainSystem()) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      transferTarget(Game.getObjectById(creep.memory.targetId));

      // Set the average CPU Usage in the memory //

      Memory.cpuTracker["transferCPU.total"] += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      transferTarget(Game.getObjectById(creep.memory.targetId));
    }
  }
};
