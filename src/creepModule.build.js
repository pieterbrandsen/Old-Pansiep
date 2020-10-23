const repair = require('./creepModule.repair');

const build = (creep) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return empty if current creep's storage is empty
  if (creep.store.getUsedCapacity() === 0) return 'empty';

  // If there are no construction sites left and no target, return full to get another goal if possible
  if (!flagMemory.commonMemory.constructionSites.length === 0 && !creepMemory.targetId) return 'full';

  if (creepMemory.targetId === undefined) {
    creep.memory.targetId = flagMemory.commonMemory.spawnEnergyStructures;
  } else {
    const constructionSite = Game.getObjectById(creepMemory.targetId);
    const result = creep.build(constructionSite, RESOURCE_ENERGY);
    switch (result) {
    case ERR_INVALID_TARGET:
      if (constructionSite.structureType === STRUCTURE_RAMPART) {
        const foundStructures = creep.room.lookForAt(LOOK_STRUCTURES, constructionSite.pos.x, constructionSite.pos.y);

        let repairStructureId;
        foundStructures.forEach((structure) => {
          if (structure.structureType === STRUCTURE_RAMPART) {
            repairStructureId = structure.id;
          }
        });

        if (repairStructureId) {
          repair({id: repairStructureId});
          const repairStructure = Game.getObjectById(repairStructureId);
          if (repairStructure.hits < 5000) {
            return;
          }
        }
      }

      delete creep.memory.targetId;
      return;
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
    const result = build(creep);
    return result;
  },
};
