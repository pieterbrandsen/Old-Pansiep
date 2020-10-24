const withdraw = (creep) => {
  // Return full if current creep's storage is full
  if (creep.store.getUsedCapacity() === 0) return 'empty';

  // Run upgradeController function
  const result = creep.upgradeController(creep.room.controller);

  // Switch based on the results of the upgrade function
  switch (result) {
  case ERR_NOT_IN_RANGE:
    // If creep is not in range, move to controller
    creep.moveTo(creep.room.controller);
    return;
  default:
    return;
  }
};

module.exports = {
  execute: (creep) => {
    const result = withdraw(creep);
    return result;
  },
};
