module.exports = {
  run: function(creep) {
    const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    if(target) {
        if(creep.build(target) == ERR_NOT_IN_RANGE) {
            creep.travelTo(target);
        }
    }
    else {
      Memory.flags[creep.room.name].constructionSitesAmount = 0;
      creep.suicide()
    }
  }
};
