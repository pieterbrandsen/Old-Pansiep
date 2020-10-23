const repair = (creep, data) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return empty if current creep's storage is empty
  if (creep.store.getUsedCapacity() === 0) return "empty";

  // If there are no construction sites left and no target, return full to get another goal if possible
  if (
    !flagMemory.commonMemory.constructionSites.length === 0 &&
    !creepMemory.targetId &&
    !data.id
  )
    return "full";

  // Set targetId to saved in memory if no id was passed into using the data object
  const targetId = data.id || creepMemory.targetId;

  // If creep is missing a targetId
  if (targetId === undefined) {
    // Get the fist target from what is saved //
    creep.memory.targetId = flagMemory.repair.targets.shift();
  } else {
    // Get the saved structure site from memory
    const repairTarget = Game.getObjectById(targetId);

    // Run the repair function
    const result = creep.build(repairTarget, RESOURCE_ENERGY);

    // Switch based on the results
    switch (result) {
      case OK:
        // If the hits of the repairTarget are high enough, remove structure
        if (
          repairTarget.hits === repairTarget.hitsMax ||
          repairTarget.hits > flagMemory.repair.hitTarget
        ) {
          delete creep.memory.targetId;
        }
        break;
      case ERR_INVALID_TARGET:
        // Delete target from the memory
        delete creep.memory.targetId;
        break;
      case ERR_NOT_IN_RANGE:
        // If creep is not in range, move to target
        creep.moveTo(repairTarget);
        return;
      default:
        break;
    }
  }
};

module.exports = {
  execute: (creep, data) => {
    const result = repair(creep, data);
    return result;
  },
};
