const withdraw = (creep) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return full if current creep's storage is full
  if (creep.store.getUsedCapacity() === creep.store.getCapacity()) return 'full';

  // If there is not enough to withdraw from, return empty to get another goal if possible
  if (flagMemory.commonMemory.energyStorages.usable <= 1500) return 'empty';
};

module.exports = {
  execute: (creep) => {
    const result = withdraw(creep);
    return result;
  },
};
