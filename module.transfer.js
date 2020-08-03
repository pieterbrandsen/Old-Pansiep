const mainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(creep) {
    // Get The Variables Needed For Module //
    const runMainSystem = mainSystem.run();
    const flagMemory = Memory.flags[creep.room.name];
    const target = Game.getObjectById(creep.memory.transferId);

    // Reset WaitTransferer //
    if (!creep.memory.waitTransferer || Game.time % 20 == 0)
    creep.memory.waitTransferer = false;
    // Define TransfererId //
    if (!creep.memory.transferId)
    creep.memory.transferId = "";


    function transferTarget(target) {
      const runTransfer = creep.transfer(target,RESOURCE_ENERGY);
      switch(runTransfer) {
        case OK:
        // Succesfol Transfer //
        creep.say("Transfer");

        // Enter Structure Type In Memory //
        creep.memory.transferStructure = target.structureType;
        creep.memory.transferId = "";
        case ERR_NOT_OWNER:
        break;
        case ERR_BUSY:
        break;
        case ERR_NOT_ENOUGH_RESOURCES:
        break;
        case ERR_INVALID_TARGET:
        // Find New Target //
        findNewTarget();
        break;
        case ERR_FULL:
        // Find New Target //
        findNewTarget();
        break;
        case ERR_NOT_IN_RANGE:
        // Travel To Target Until In Range //
        creep.travelTo(target);
        break;
        case ERR_INVALID_ARGS:
        break;
        default:
        break;
      }
    }


    function findNewTarget() {
      // If Transferer Is A Harvester //
      if (creep.memory.role.includes("harvest")) {
        // Define SourceStorage And SourceObject //
        let sourceStorageId;
        let sourceObject = Game.getObjectById(creep.memory.sourceId);

        // Loop Through Containers And Links, Search For Storage Object That Is In Range TO SourceObject //
        creep.room.containers.forEach((container, i) => {
          if (container.pos.inRangeTo(sourceObject,2))
          sourceStorageId = container.id;
        });
        creep.room.links.forEach((link, i) => {
          if (link.pos.inRangeTo(sourceObject,2))
          sourceStorageId = link.id;
        });


        // If SouceStorage Is Found //
        if (sourceStorageId !== undefined)
        creep.memory.transferId = sourceStorageId
        else {
          // Go Build New Structure //
          builderModule.run(creep);

          flagMemory.sources.forEach((source, i) => {
            if (creep.memory.role.includes(`-${i}`))
            flagMemory.roomManager[`source-${i}.HasStructure`] = false;
          });
        }
      }
      else {
        // UPDATE THIS //
        const controllerStorage = Game.getObjectById(flagMemory.controllerStorage);

        // UPDATE THIS //
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
        // UPDATE THIS //
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


    if (runMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      transferTarget(target);

      // Set the average CPU Usage in the memory //

      flagMemory.trackers.cpu.transfererModule += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      transferTarget(target);
    }
  }
};
