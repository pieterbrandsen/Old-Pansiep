const upgradeJob = (creep) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return full if current creep's storage is full
  if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
    return 'full';
  }

  // Get the saved structure from memory
  const withdrawStructure = Game.getObjectById(flagMemory.commonMemory.controllerStorage.id);

  // Run the withdraw function
  const result = creep.withdraw(withdrawStructure, RESOURCE_ENERGY);

  // Switch based on the results
  switch (result) {
  case OK:
    break;
  case ERR_NOT_IN_RANGE:
    // If creep is not in range, move to target
    creep.moveTo(withdrawStructure);
    break;
  case ERR_INVALID_TARGET:
  case ERR_NOT_ENOUGH_RESOURCES:
    // Return
    return 'empty';
  default:
    break;
  }
};

const normalJob = (creep) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return full if current creep's storage is full
  if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
    return 'full';
  }

  // If there is not enough to withdraw from, return empty to get another goal if possible
  if (
    flagMemory.commonMemory.energyStored.usable <= 500 &&
    creep.memory.targetId === undefined
  ) {
    return 'empty';
  }

  // If creep memory is missing a targetId, find one
  if (!creep.memory.targetId) {
    const highestEnergyStructure = flagMemory.commonMemory.energyStructures.sort(
      (a, b) => b.usable - a.usable,
    )[0];
    const highestSourceStructure = flagMemory.commonMemory.energyStructures.filter((s) => s.usable <= 2000).sort(
      (a, b) => b.usable - a.usable,
    )[0];

    let structure;
    if (creepMemory.role === 'transferer' && flagMemory.commonMemory.spawnEnergyStructures.length > 0) {
      structure = highestEnergyStructure;
    } else if ((creepMemory.role === 'transferer'||creepMemory.role === 'pioneer') && flagMemory.commonMemory.spawnEnergyStructures.length === 0) {
      const structureObj = Game.getObjectById(highestSourceStructure.id);
      if (structureObj.structureType === STRUCTURE_STORAGE || structureObj.structureType === STRUCTURE_TERMINAL) return;
      structure = highestSourceStructure;
    } else {
      structure = highestEnergyStructure;
    }

    if (structure === undefined) return;
    flagMemory.commonMemory.energyStructures.forEach((structureInMem) => {
      if (structureInMem.id === structure.id) {
        structureInMem.usable -= creep.store.getFreeCapacity(RESOURCE_ENERGY);
        flagMemory.commonMemory.energyStored.usable -= creep.store.getFreeCapacity(
          RESOURCE_ENERGY,
        );
      }
    });

    if (structure.usable > 0) {
      creep.memory.targetId = structure.id;
    }
  } else {
    // Get the saved structure from memory
    const withdrawStructure = Game.getObjectById(creepMemory.targetId);

    // Run the withdraw function
    const result = creep.withdraw(withdrawStructure, RESOURCE_ENERGY);

    // Switch based on the results
    switch (result) {
    case OK:
      return 'full';
    case ERR_NOT_IN_RANGE:
      // If creep is not in range, move to target
      creep.moveTo(withdrawStructure);
      break;
    case ERR_INVALID_TARGET:
    case ERR_NOT_ENOUGH_RESOURCES:
      // Delete targetId
      delete creep.memory.targetId;
      break;
    default:
      break;
    }
  }
};

module.exports = {
  execute: (creep) => {
    let result;

    // Make shortcut to memory
    const creepMemory = creep.memory;
    const flagMemory = Memory.flags[creepMemory.targetRoom];

    switch (creepMemory.miniJob) {
    case 'upgrade':
      result = upgradeJob(creep);
      break;
    case 'normal':
      result = normalJob(creep);
      break;
    default:
      if (creepMemory.role.includes('upgrade') && Game.getObjectById(flagMemory.commonMemory.controllerStorage.id) !== null && flagMemory.commonMemory.controllerStorage.usable > 250) {
        creep.memory.miniJob = 'upgrade';
      } else if (flagMemory.commonMemory.energyStored.usable > 500) {
        creep.memory.miniJob = 'normal';
      } else return 'empty';
      break;
    }

    // Return result
    return result;
  },
};
