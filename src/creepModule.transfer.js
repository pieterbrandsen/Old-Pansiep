

const mineralJob = (creep) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return empty if current creep's storage is empty
  if (creep.store.getUsedCapacity() === 0) return 'empty';

  // Get the storage
  const target = creep.room.storage;

  // Run the transfer function
  const result = creep.transfer(target, flagMemory.commonMemory.mineral.type);

  // Switch based on the results
  switch (result) {
  case ERR_NOT_IN_RANGE:
    // If creep is not in range, move to target
    creep.moveTo(target);
    break;
  default:
    break;
  }
};

const harvestJob = (creep) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return empty if current creep's storage is empty
  if (creep.store.getUsedCapacity() === 0) return 'empty';

  // If creep memory is missing a targetId, find one
  if (!creepMemory.targetId) {
    // Set the storage pos as found in memory
    const storagePos = flagMemory.roomPlanner.room.sources[
      creepMemory.sourceNumber
    ] ?
      flagMemory.roomPlanner.room.sources[creepMemory.sourceNumber].pos :
      null;
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
};

const spawnerJob = (creep) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return empty if current creep's storage is empty
  if (creep.store.getUsedCapacity() === 0) return 'empty';

  // If Target is already full of energy
  if (
    creepMemory.targetId &&
    Game.getObjectById(creepMemory.targetId) !== null &&
    Game.getObjectById(creepMemory.targetId).store.getFreeCapacity(
      RESOURCE_ENERGY,
    ) === 0
  ) {
    return 'full';
  }

  if (
    flagMemory.commonMemory.spawnEnergyStructures.length === 0 &&
    !creepMemory.targetId
  ) {
    return 'empty';
  }

  // If creep is missing targetId
  if (creepMemory.targetId === undefined) {
    // Find and shift the first energy structure in the spawner array
    const getCapacityCreep = creep.store.getUsedCapacity(RESOURCE_ENERGY);

    // If current spawnEnergyStructure needs less then zero energy, shift it.
    if (flagMemory.commonMemory.spawnEnergyStructures[0].needed < 0) {
      flagMemory.commonMemory.spawnEnergyStructures.shift();
      return;
    }

    // Get first id from array, shift only if creep can fill the whole target.
    if (
      flagMemory.commonMemory.spawnEnergyStructures[0].needed <
      getCapacityCreep
    ) {
      creep.memory.targetId = flagMemory.commonMemory.spawnEnergyStructures.shift().id;
    } else {
      creep.memory.targetId =
        flagMemory.commonMemory.spawnEnergyStructures[0].id;
      flagMemory.commonMemory.spawnEnergyStructures[0].needed -= getCapacityCreep;
    }
  } else {
    // Get the saved structure from memory
    const transferStructure = Game.getObjectById(creepMemory.targetId);

    // Run the transfer function
    const result = creep.transfer(transferStructure, RESOURCE_ENERGY);

    // Switch based on the results
    switch (result) {
    case OK:
      if (transferStructure.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        flagMemory.commonMemory.spawnEnergyStructures.push({
          id: transferStructure.id,
          needed: transferStructure.store.getFreeCapacity(RESOURCE_ENERGY),
        });
      }
      break;
    case ERR_INVALID_TARGET:
    case ERR_FULL:
      // Delete targetId
      creep.say(true);
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
};

const storageJob = (creep) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return empty if current creep's storage is empty
  if (creep.store.getUsedCapacity() === 0) return 'empty';

  // If there is enough energy in storage
  if (
    flagMemory.commonMemory.energyStored.capacity > 10000 &&
    flagMemory.commonMemory.energyStored.capacity / 10 < flagMemory.commonMemory.energyStored.usable &&
    !creep.memory.targetId
  ) {
    return 'empty';
  }

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
};

const controllerJob = (creep) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return empty if current creep's storage is empty
  if (creep.store.getUsedCapacity() === 0) return 'empty';

  // If controller structure has enough energy
  if (
    (flagMemory.commonMemory.controllerStorage.usable > 2000 ||
      flagMemory.commonMemory.controllerStorage.type !==
        STRUCTURE_CONTAINER) &&
    !creep.memory.targetId
  ) {
    return 'empty';
  }


  // Get the saved structure from memory
  const transferStructure = Game.getObjectById(
    flagMemory.commonMemory.controllerStorage.id,
  );

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
};

module.exports = {
  execute: (creep) => {
    let result;

    // Make shortcut to memory
    const creepMemory = creep.memory;
    const flagMemory = Memory.flags[creepMemory.targetRoom];

    switch (creep.memory.miniJob) {
    case 'harvest':
      result = harvestJob(creep);
      break;
    case 'spawner':
      result = spawnerJob(creep);
      break;
    case 'storage':
      result = storageJob(creep);
      break;
    case 'controller':
      result = controllerJob(creep);
      break;
    case 'mineral':
      result = mineralJob(creep);
      break;
    default:
    // If creep is a mineral harvester, only transfer to storage
      if (creepMemory.role === 'mineral') {
        creep.memory.miniJob = 'mineral';
        break;
      }

      if (flagMemory.commonMemory.spawnEnergyStructures.length > 0) {
        creep.memory.miniJob = 'spawner';
        break;
      } else if (
        flagMemory.commonMemory.controllerStorage.usable < 1500 &&
          flagMemory.commonMemory.controllerStorage.type === STRUCTURE_CONTAINER && Game.getObjectById(flagMemory.commonMemory.controllerStorage.id) !== null
      ) {
        creep.memory.miniJob = 'controller';
        break;
      } else if (
        flagMemory.commonMemory.energyStored.capacity > 10000 &&
        flagMemory.commonMemory.energyStored.capacity / 10 > flagMemory.commonMemory.energyStored.usable
      ) {
        creep.memory.miniJob = 'storage';
        break;
      }

      // Return full if no condition hit
      return 'full';
    }

    // Return result
    return result;
  },
};
