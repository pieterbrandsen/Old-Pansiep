module.exports = {
  run: function(creep) {
    if (!creep.memory.targetId) {
      creep.memory.targetId = "";
    }

    const target = creep.build(Game.getObjectById(creep.memory.targetId));
    switch(target) {
      case ERR_INVALID_TARGET:
        const findNewTarget = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

        if (!findNewTarget) {
          Memory.flags[creep.room.name].constructionSitesAmount = 0;
          creep.suicide()
        }
        else {
          if (Game.getObjectById(creep.memory.targetId) == null) {
            creep.memory.targetId = findNewTarget.id;
          }
          else {
            if (creep.pos.inRangeTo(Game.getObjectById(creep.memory.targetId),0)) {
              creep.travelTo(creep.room.controller)
            }
            else {
              creep.memory.targetId = findNewTarget.id;
            }
          }
        }
        break;
      case ERR_NOT_IN_RANGE:
        creep.travelTo(Game.getObjectById(creep.memory.targetId));
        break;
      case OK:
        creep.say("Building")
      default:
        break;
    }
  }
};
