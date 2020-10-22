const withdraw = (creep) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return empty if current creep's storage is empty
  if (creep.store.getUsedCapacity() === 0) return 'empty';

  // If there are no construction sites left and no target, return full to get another goal if possible
  if (!flagMemory.commonMemory.constructionSites.length == 0 && !creepMemory.targetId) return 'full';

  if (creepMemory.targetId === undefined) {
    creep.memory.targetId = flagMemory.commonMemory.spawnEnergyStructures;
  } else {
    const constructionSite = Game.getObjectById(creepMemory.targetId);
    const result = creep.build(constructionSite, RESOURCE_ENERGY);
    switch (result) {
    case ERR_INVALID_TARGET:
      // TODO LOOK AT POSITION AND CHECK IF ITS A RAMPART, IF YES SHOOT UNTIL 5K HP
      // TODO AFTER THAT SHIFT THE STRUCTURE
    case ERR_NOT_IN_RANGE:
      creep.moveTo(constructionSite);
      return;
    default:
      break;
    }
  }
};

module.exports = {
  execute: (creep) => {
    const result = withdraw(creep);
    return result;
  },
};
