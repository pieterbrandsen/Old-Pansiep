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
        flagMemory.commonMemory.energyStorages.capacity / 10 > flagMemory.commonMemory.energyStorages.usable) || flagMemory.commonMemory.energyStorages.capacity <= 10000
    ) {
      // If the controller structure is full enough (75%)
      if (
        (flagMemory.commonMemory.controllerStorage.usable > 1500 &&
        flagMemory.commonMemory.controllerStorage.structureType ===
          STRUCTURE_CONTAINER) || flagMemory.commonMemory.controllerStorage.id === undefined
      ) {
        return 'full';
      }
    }
  }

  if (creep.memory.role.includes('harvest')) {
    if (!creep.memory.targetId) {
      const storagePos = flagMemory.roomPlanner.room.sources[creepMemory.sourceNumber].pos;
      const foundStructures = creep.room.lookForAt(LOOK_STRUCTURES, storagePos.x, storagePos.y);

      let sourceStructure;
      foundStructures.forEach((structure) => {
        if (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_LINK) {
          sourceStructure = {type: structure.structureType, id: structure.id};
        }
      });

      if (sourceStructure) creep.memory.targetId = sourceStructure.id;
    } else {
      const transferStructure = Game.getObjectById(creepMemory.targetId);
      const result = creep.transfer(transferStructure, RESOURCE_ENERGY);
      switch (result) {
      case ERR_NOT_IN_RANGE:
        creep.moveTo(transferStructure);
        break;
      default:
        break;
      }
    }
    return;
  } else {
    if (flagMemory.commonMemory.spawnEnergyStructures.length > 0) {
      if (creepMemory.targetId === undefined) {
        creep.memory.targetId = flagMemory.commonMemory.spawnEnergyStructures.shift();
      } else {
        const transferStructure = Game.getObjectById(creepMemory.targetId);
        const result = creep.transfer(transferStructure, RESOURCE_ENERGY);
        switch (result) {
        case OK:
        case ERR_INVALID_TARGET:
        case ERR_FULL:
          delete creep.memory.targetId;
          return;
        case ERR_NOT_IN_RANGE:
          creep.moveTo(transferStructure);
          return;
        default:
          break;
        }
      }
    } else if (flagMemory.commonMemory.capacity > 10000 &&
    flagMemory.commonMemory.capacity / 10 < flagMemory.commonMemory.usable) {
      if (creepMemory.targetId === undefined) {
        if (creep.room.storage && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) < 400*1000) {
          creepMemory.targetId = creep.room.storage.id;
        } else if (creep.room.terminal && creep.room.terminal.getUsedCapacity(RESOURCE_ENERGY) < 100*1000) {
          creepMemory.targetId = creep.room.terminal.id;
        }
      } else {
        const transferStructure = Game.getObjectById(creepMemory.targetId);
        const result = creep.transfer(transferStructure, RESOURCE_ENERGY);
        switch (result) {
        case OK:
        case ERR_INVALID_TARGET:
        case ERR_FULL:
          delete creep.memory.targetId;
          return;
        case ERR_NOT_IN_RANGE:
          console.log(creep.moveTo(transferStructure), 'travel');
          return;
        default:
          break;
        }
      }
    } else if (flagMemory.commonMemory.controllerStorage.usable > 1500 &&
    flagMemory.commonMemory.controllerStorage.structureType ===
      STRUCTURE_CONTAINER) {
      const transferStructure = Game.getObjectById(flagMemory.commonMemory.controllerStorage.id);
      const result = creep.transfer(transferStructure, RESOURCE_ENERGY);
      switch (result) {
      case OK:
      case ERR_INVALID_TARGET:
      case ERR_FULL:
        delete creep.memory.targetId;
        return;
      case ERR_NOT_IN_RANGE:
        creep.moveTo(transferStructure);
        return;
      default:
        break;
      }
    } else {
      delete creep.memory.targetId;
    }
  }
};

module.exports = {
  execute: (creep) => {
    const result = transfer(creep);
    return result;
  },
};
