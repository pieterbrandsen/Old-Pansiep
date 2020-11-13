const reserve = (creep) => {
  const result = creep.reserveController(creep.room.controller);
  // Switch based on the results
  switch (result) {
  case ERR_NOT_IN_RANGE:
    // If creep is not in range, move to target
    creep.moveTo(creep.room.controller);
    break;
  default:
    break;
  }
};

module.exports = {
  execute: (creep) => {
    const result = reserve(creep);
    return result;
  },
};
