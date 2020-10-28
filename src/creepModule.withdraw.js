const upgradeJob = (creep) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return full if current creep's storage is full
  if (creep.store.getUsedCapacity() === creep.store.getCapacity())
    return "full";

  // If there is not enough to withdraw from, return empty to get another goal if possible
  if (
    flagMemory.commonMemory.controllerStorage.usable === 0 &&
    creep.memory.targetId === undefined
  )
    return "empty";

  // If creep memory is missing a targetId, find one
  if (!creep.memory.targetId) {
    // Set the storage pos as found in memory
    if (!flagMemory.roomPlanner.room.controller) return;
    const storagePos = flagMemory.roomPlanner.room.controller.pos;

    // Find all structures that are at the storagePos
    const foundStructures = creep.room.lookForAt(
      LOOK_STRUCTURES,
      storagePos.x,
      storagePos.y
    );

    // Loop through all structures that are found at storagePos and try to find a container or link
    let controllerStructure;
    foundStructures.forEach((structure) => {
      if (
        structure.structureType === STRUCTURE_CONTAINER ||
        structure.structureType === STRUCTURE_LINK
      ) {
        controllerStructure = {
          type: structure.structureType,
          id: structure.id,
        };
      }
    });

    // If a source structure was found, set the target Id to that structure
    if (controllerStructure) creep.memory.targetId = controllerStructure.id;
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
        // Delete targetId
        delete creep.memory.targetId;
        break;
      default:
        break;
    }
  }
};

const normalJob = (creep) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return full if current creep's storage is full
  if (creep.store.getUsedCapacity() === creep.store.getCapacity())
    return "full";

  // If there is not enough to withdraw from, return empty to get another goal if possible
  if (
    flagMemory.commonMemory.energyStorages.usable <= 500 &&
    creep.memory.targetId === undefined
  )
    return "empty";

  // If creep memory is missing a targetId, find one
  if (!creep.memory.targetId) {
    const highestEnergyStructure = flagMemory.commonMemory.energyStructures.sort(
      (a, b) => b.usable - a.usable
    )[0];
    flagMemory.commonMemory.energyStructures.forEach((structure) => {
      if (structure.id === highestEnergyStructure.id) {
        structure.usable -= creep.store.getFreeCapacity(RESOURCE_ENERGY);
        flagMemory.commonMemory.energyStorages.usable -= creep.store.getFreeCapacity(
          RESOURCE_ENERGY
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

    switch (creepMemory.miniJob) {
      case "upgrade":
        result = upgradeJob(creep);
        break;
      case "normal":
        result = normalJob(creep);
        break;
      default:
        if (creepMemory.role.includes("upgrade")) {
          creep.memory.miniJob = "upgrade";
        } else {
          creep.memory.miniJob = "normal";
        }
        break;
    }

    // Return result
    return result;
  },
};
