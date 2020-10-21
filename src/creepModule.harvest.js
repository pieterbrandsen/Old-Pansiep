const harvest = (creep) => {
  // TODO MAKE IT SO THAT PIONEER CHECKS FOR ANOTHER SOURCE IF CREEPS IN RANGE TO SOURCE == MAX CREEPS THERE
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return full if current storage is full
  if (creep.store.getUsedCapacity() === creep.store.getCapacity()) return 'full';

  // If creep has no sourceId saved
  if (!creepMemory.sourceId) {
    const closestSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    if (closestSource !== null) creep.memory.sourceId = closestSource.id;
    else return;
  }

  // Get source from memory
  const source = Game.getObjectById(creepMemory.sourceId);

  // Check if source is undefined
  if (source === null) {
    // Remove source from memory and return
    delete creep.memory.sourceId;
    return;
  }

  // If not in range, move to source and then return
  if (!creep.pos.inRangeTo(source, 1)) {
    let sourcePos = source.pos;
    if (creep.memory.role.split('-').length > 0 && !isNaN(creep.memory.role.split('-')[1])) {
      const sourceNumber = creep.memory.role.split('-')[1];

      if (!creep.room.lookForAt(LOOK_CREEPS, flagMemory.roomPlanner.room.sources[sourceNumber].pos)[0]) {
        sourcePos = flagMemory.roomPlanner.room.sources[sourceNumber].pos;
      }
    }

    // Move to source
    creep.moveTo(sourcePos.x, sourcePos.y);
    return;
  } else {
    const result = creep.harvest(source);
    switch (result) {
    case OK:
      return;
    case ERR_NOT_ENOUGH_RESOURCES:
    case ERR_INVALID_TARGET:
      if (creep.memory.role.includes('-')) break;
      delete creep.memory.sourceId;
      break;
    default:
      break;
    }
  }
};

module.exports = {
  execute: (creep) => {
    const result = harvest(creep);
    return result;
  },
};
