module.exports = {
  run: function(creep) {
    const target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART
    });
    if(target !== null) {
        if(creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.travelTo(target);
        }
    }
    else {
      if (!creep.pos.inRangeTo(creep.room.controller,5)) {
        creep.travelTo(creep.room.controller)
      }
      else {
        creep.say("Waiting")
      }
    }
  }
};
