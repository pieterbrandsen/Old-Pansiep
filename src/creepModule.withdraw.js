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
    flagMemory.commonMemory.energyStorages.usable <= 500 &&
    creep.memory.targetId === undefined
  ) {
    return 'empty';
  }

  // If creep memory is missing a targetId, find one
  if (!creep.memory.targetId) {
    const highestEnergyStructure = flagMemory.commonMemory.energyStructures.sort(
      (a, b) => b.usable - a.usable,
    )[0];
    flagMemory.commonMemory.energyStructures.forEach((structure) => {
      if (structure.id === highestEnergyStructure.id) {
        structure.usable -= creep.store.getFreeCapacity(RESOURCE_ENERGY);
        flagMemory.commonMemory.energyStorages.usable -= creep.store.getFreeCapacity(
          RESOURCE_ENERGY,
        );
      }
    });

    if (highestEnergyStructure.usable > 0) {
      creep.memory.targetId = highestEnergyStructure.id;
    }
  } else {
    // Get the saved structure from memory
    const withdrawStructure = Game.getObjectById(creepMemory.targetId);

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
      if (creepMemory.role.includes('upgrade') && Game.getObjectById(flagMemory.commonMemory.controllerStorage.id) !== null && flagMemory.commonMemory.controllerStorage.usable > 0) {
        creep.memory.miniJob = 'upgrade';
      } else {
        creep.memory.miniJob = 'normal';
      }
      break;
    }

    // Return result
    return result;
  },
};
