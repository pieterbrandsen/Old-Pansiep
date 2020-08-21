function getCreepWorkState(creep) {
  // Get Creep State, What The Creep Should Be Doing //
  const workState = getWorkingState.run(creep.room.name, creep.store.getCapacity(), creep.store.getUsedCapacity(), creep.memory.working, creep.memory.role);
  if (workState !== undefined)
  creep.memory.working = workState;
}

module.exports = {
  // Run Roles From Here //
  harvester: function(creep) {
  }
}
