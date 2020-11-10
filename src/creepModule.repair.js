// #region Require
require('./config');
// #endregion

const repair = (creep, data) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return empty if current creep's storage is empty or no targets left to repair
  if (
    creep.store.getUsedCapacity() === 0
  ) {
    return 'empty';
  }

  // If there are no construction sites left and no target, return full to get another goal if possible
  if (
    flagMemory.repair.targets.length === 0 &&
    !creepMemory.targetId &&
    !data.id
  ) {
    if (!creep.pos.inRangeTo(creep.room.controller, 5)) creep.moveTo(creep.room.controller);
    return 'full';
  }

  // Set targetId to saved in memory if no id was passed into using the data object
  const targetId = data.id || creepMemory.targetId;
  // If creep is missing a targetId
  if (targetId === undefined) {
    // Get the fist target from what is saved //
    creep.memory.targetId = flagMemory.repair.targets[0];
  } else {
    // Get the saved structure site from memory
    const repairTarget = Game.getObjectById(targetId);

    // Run the repair function
    const result = creep.repair(repairTarget, RESOURCE_ENERGY);
    // Switch based on the results
    switch (result) {
    case OK:
      config.expenses.repairing[creep.room.name] += creep.memory.parts.work;

      // If the hits of the repairTarget are high enough, remove structure
      if (
        repairTarget.hits === repairTarget.hitsMax ||
          repairTarget.hits > flagMemory.repair.hitTarget
      ) {
        // Check if target that's going to be lost is still on the construction list, if so shift it.
        if (flagMemory.repair.targets.indexOf(creep.memory.targetId) === 0) {
          flagMemory.repair.targets.shift();
        }

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
    const result = repair(creep, (data = {}));
    return result;
  },
};
