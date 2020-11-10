// const repair = require('./creepModule.repair');
// #region Require
require('./config');
// #endregion

const build = (creep) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return empty if current creep's storage is empty
  if (creep.store.getUsedCapacity() === 0) return 'empty';

  // If there are no construction sites left and no target, return full to get another goal if possible
  if (
    flagMemory.commonMemory.constructionSites.length === 0 &&
    !creepMemory.targetId
  ) {
    if (!creep.pos.inRangeTo(creep.room.controller, 5)) creep.moveTo(creep.room.controller);
    return 'full';
  }

  // If creep is missing a targetId
  if (creepMemory.targetId === undefined) {
    // Get the fist target from what is saved //
    // This target will get later shifted when its completed
    creep.memory.targetId = flagMemory.commonMemory.constructionSites[0];
  } else {
    // Get the saved construction site from memory
    const constructionSite = Game.getObjectById(creepMemory.targetId);

    // Run the build function
    const result = creep.build(constructionSite, RESOURCE_ENERGY);
    // Switch based on the results
    switch (result) {
    case OK:
      config.expenses.building[creep.room.name] += creep.memory.parts.work * 5;
      break;
    case ERR_INVALID_TARGET:
      // TODO SAVE THE TARGET POS BECAUSE ATM THE CONSTRUCTION IS ALREADY LOST
      // // If the structure is a rampart, heal it until 5K hits
      // if (
      //   constructionSite &&
      //     constructionSite.structureType === STRUCTURE_RAMPART
      // ) {
      //   // Find all structures at last known position
      //   const foundStructures = creep.room.lookForAt(
      //     LOOK_STRUCTURES,
      //     constructionSite.pos.x,
      //     constructionSite.pos.y,
      //   );

      //   // Loop through all structures that are found at last know position and try to find a rampart
      //   let repairStructureId;
      //   foundStructures.forEach((structure) => {
      //     if (structure.structureType === STRUCTURE_RAMPART) {
      //       repairStructureId = structure.id;
      //     }
      //   });

      //   // If a rampart was found, repair that structure
      //   if (repairStructureId) {
      //     repair({id: repairStructureId});
      //     const repairStructure = Game.getObjectById(repairStructureId);
      //     if (repairStructure.hits < 5000) {
      //       return;
      //     }
      //   }
      // }

      // Check if target that's going to be lost is still on the construction list, if so shift it.
      if (
        flagMemory.commonMemory.constructionSites.indexOf(
          creep.memory.targetId,
        ) === 0
      ) {
        flagMemory.commonMemory.constructionSites.shift();
      }
      // Delete target from the memory
      delete creep.memory.targetId;
      return 'full';
    case ERR_NOT_IN_RANGE:
      // If creep is not in range, move to target
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
