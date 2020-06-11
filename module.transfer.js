const builderModule = require('module.builder');

module.exports = {
  run: function(creep) {
    if (creep.memory.role.includes("harvest")) {
      let target = Game.getObjectById(creep.memory.targetId);

      if (target !== null) {
        if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.travelTo(target)
        }
      }
      else {
        let sourceObject = Game.getObjectById(creep.memory.sourceId);
          let containerInRange = creep.pos.findClosestByRange(creep.room.containers, {filter: (structure) => {
              return (structure.pos.inRangeTo(sourceObject,2));
            }
          });
          let linkInRange = creep.pos.findClosestByRange(creep.room.links, {filter: (structure) => {
              return (structure.pos.inRangeTo(sourceObject,2));
            }
          });

        if (containerInRange !== null) {
          creep.memory.targetId = containerInRange.id;
        }
        else if (linkInRange !== null) {
          creep.memory.targetId = linkInRange.id;
        }
        else {
          builderModule.run(creep);
        }
      }
    }
    else {
      let target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
          filter: (s) => (s.structureType === STRUCTURE_SPAWN
              || s.structureType === STRUCTURE_EXTENSION
              || (s.structureType === STRUCTURE_TOWER && s.store.getUsedCapacity(RESOURCE_ENERGY) < 500 && creep.store.getUsedCapacity(RESOURCE_ENERGY) >= 150))
              && s.energy < s.energyCapacity
      });

      if (target) {
        if (creep.transfer(target,RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.travelTo(target)
        }
      }
      else {
        let target2 = creep.room.controller.pos.findClosestByRange(creep.room.containers, {filter: (structure) => {
          return (structure.pos.inRangeTo(creep.room.controller,3))}
        });

        if (target2) {
          if (creep.transfer(target2,RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.travelTo(target2)
          }
        }
      }
    }
  }
};
