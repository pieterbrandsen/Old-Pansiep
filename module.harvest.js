module.exports = {
  run: function(creep) {
    let target = Game.getObjectById(creep.memory.sourceId);

    if (target == null) {
      let sources = creep.room.find(FIND_SOURCES);
      if (creep.name.includes("0-")) {
        creep.memory.sourceId = sources[0].id;
      }
      else if (creep.name.includes("1-")) {
        creep.memory.sourceId = sources[1].id;
      }
      else if (creep.name.includes("2-")) {
        creep.memory.sourceId = sources[2].id;
      }
      else if (creep.name.includes("2-")) {
        creep.memory.sourceId = sources[3].id;
      }
      else {
        creep.memory.sourceId = creep.pos.findClosestByRange(FIND_SOURCES).id;
      }
    }
    else {
      if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
        creep.travelTo(target)
      }
    }
  }
};
