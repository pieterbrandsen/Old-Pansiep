const repair = (creep, data) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return empty if current creep's storage is empty
  if (creep.store.getUsedCapacity() === 0) return 'empty';

  // If there are no construction sites left and no target, return full to get another goal if possible
  if (!flagMemory.commonMemory.constructionSites.length === 0 && (!creepMemory.targetId && !data.id)) return 'full';

  // Set targetId to saved in memory if no id was passed into using the data object
  const targetId = data.id || creepMemory.targetId;


  if (targetId === undefined) {
    creep.memory.targetId = flagMemory.repair.targets.shift();
  } else {
    const repairTarget = Game.getObjectById(targetId);
    const result = creep.build(repairTarget, RESOURCE_ENERGY);
    switch (result) {
    case OK:
      if (repairTarget.hits === repairTarget.hitsMax || repairTarget.hits > flagMemory.repair.hitTarget) {
        delete creep.memory.targetId;
      }
      break;
    case ERR_INVALID_TARGET:
      delete creep.memory.targetId;
      break;
    case ERR_NOT_IN_RANGE:
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
