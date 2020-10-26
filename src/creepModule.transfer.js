const transfer = (creep) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return empty if current creep's storage is empty
  if (creep.store.getUsedCapacity() === 0) return 'empty';

  // If there is no structures left to transfer to, return full to get another goal if possible
  if (
    flagMemory.commonMemory.spawnEnergyStructures.length === 0 &&
    !creepMemory.targetId
  ) {
    // If there is no need of energy in the upgrader structure or in the main storage
    if (
      (flagMemory.commonMemory.energyStorages.capacity > 10000 &&
        flagMemory.commonMemory.energyStorages.capacity / 10 >
          flagMemory.commonMemory.energyStorages.usable) ||
      flagMemory.commonMemory.energyStorages.capacity <= 10000
    ) {
      // If the controller structure is full enough (75%)
      if (
        (flagMemory.commonMemory.controllerStorage.usable > 1500 &&
          flagMemory.commonMemory.controllerStorage.structureType ===
            STRUCTURE_CONTAINER) ||
        flagMemory.commonMemory.controllerStorage.id === undefined
      ) {
        return 'full';
      }
    }
  }

  // If the creep is a harvester, run this part
  if (creepMemory.role.includes('harvest')) {
    // If creep memory is missing a targetId, find one
    if (!creepMemory.targetId) {
      // Set the storage pos as found in memory
      const storagePos =
        (flagMemory.roomPlanner.room.sources[creepMemory.sourceNumber]) ? ((flagMemory.roomPlanner.room.sources[creepMemory.sourceNumber]).pos) : (null);
      if (storagePos === null) return;

      // Find all structures that are at the storagePos
      const foundStructures = creep.room.lookForAt(
        LOOK_STRUCTURES,
        storagePos.x,
        storagePos.y,
      );

      // Loop through all structures that are found at storagePos and try to find a container or link
      let sourceStructure;
      foundStructures.forEach((structure) => {
        if (
          structure.structureType === STRUCTURE_CONTAINER ||
          structure.structureType === STRUCTURE_LINK
        ) {
          sourceStructure = {type: structure.structureType, id: structure.id};
        }
      });

      // If a source structure was found, set the target Id to that structure
      if (sourceStructure) creep.memory.targetId = sourceStructure.id;
      else delete flagMemory.roomPlanner.room.sources[creep.memory.sourceNumber];
    } else {
      // Get the saved structure from memory
      const transferStructure = Game.getObjectById(creepMemory.targetId);

      // Run the transfer function
      const result = creep.transfer(transferStructure, RESOURCE_ENERGY);

      // Switch based on the results
      switch (result) {
      case ERR_NOT_IN_RANGE:
        // If creep is not in range, move to target
        creep.moveTo(transferStructure);
        break;
      case ERR_INVALID_TARGET:
        // Delete targetId
        delete creep.memory.targetId;
        delete flagMemory.roomPlanner.room.sources[creep.memory.sourceNumber];
        break;
      default:
        break;
      }
    }
  } else {
    // If creep is not a harvester

    // If there is a need of energy in the spawning structures
    if (flagMemory.commonMemory.spawnEnergyStructures.length > 0) {
      // If creep is missing targetId
      if (creepMemory.targetId === undefined) {
        // Find and shift the first energy structure in the spawner array
        creep.memory.targetId = flagMemory.commonMemory.spawnEnergyStructures.shift();
      } else {
        // Get the saved structure from memory
        const transferStructure = Game.getObjectById(creepMemory.targetId);

        // Run the transfer function
        const result = creep.transfer(transferStructure, RESOURCE_ENERGY);

        // Switch based on the results
        switch (result) {
        case OK:
          if (transferStructure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            flagMemory.commonMemory.spawnEnergyStructures.push(transferStructure.id);
          }
          break;
        case ERR_INVALID_TARGET:
        case ERR_FULL:
          // Delete targetId
          delete creep.memory.targetId;
          return;
        case ERR_NOT_IN_RANGE:
          // If creep is not in range, move to target
          creep.moveTo(transferStructure);
          return;
        default:
          break;
        }
      }
    } else if (
      flagMemory.commonMemory.capacity > 10000 &&
      flagMemory.commonMemory.capacity / 10 < flagMemory.commonMemory.usable
    ) {
      // If room is in need of more energy in the storage/terminal
      if (creepMemory.targetId === undefined) {
        // If there is enough space in storage
        if (
          creep.room.storage &&
          creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) < 400 * 1000
        ) {
          creepMemory.targetId = creep.room.storage.id;
          // If there is enough space in terminal
        } else if (
          creep.room.terminal &&
          creep.room.terminal.getUsedCapacity(RESOURCE_ENERGY) < 100 * 1000
        ) {
          creepMemory.targetId = creep.room.terminal.id;
        }
      } else {
        // Get the saved structure from memory
        const transferStructure = Game.getObjectById(creepMemory.targetId);

        // Run the transfer function
        const result = creep.transfer(transferStructure, RESOURCE_ENERGY);

        // Switch based on the results
        switch (result) {
        case OK:
        case ERR_INVALID_TARGET:
        case ERR_FULL:
          // Delete targetId
          delete creep.memory.targetId;
          return;
        case ERR_NOT_IN_RANGE:
          // If creep is not in range, move to target
          creep.moveTo(transferStructure);
          return;
        default:
          break;
        }
      }
    } else if (
      flagMemory.commonMemory.controllerStorage.usable > 1500 &&
      flagMemory.commonMemory.controllerStorage.structureType ===
        STRUCTURE_CONTAINER
    ) {
      // If controller storage has an energy need

      // Get the saved structure from memory
      const transferStructure = Game.getObjectById(creepMemory.targetId);

      // Run the transfer function
      const result = creep.transfer(transferStructure, RESOURCE_ENERGY);

      // Switch based on the results
      switch (result) {
      case OK:
      case ERR_INVALID_TARGET:
      case ERR_FULL:
        // Delete targetId
        delete creep.memory.targetId;
        if (result === ERR_INVALID_TARGET) {
          flagMemory.commonMemory.controllerStorage.id = undefined;
        }
        break;
      case ERR_NOT_IN_RANGE:
        // If creep is not in range, move to target
        creep.moveTo(transferStructure);
        return;
      default:
        break;
      }
    }
  }
};

module.exports = {
  execute: (creep) => {
    const result = transfer(creep);
    return result;
  },
};
