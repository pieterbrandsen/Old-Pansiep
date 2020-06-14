const builderModule = require('module.builder');

module.exports = {
  run: function(creep) {
    if (creep.memory.role.includes("harvest")) {
      const target = creep.transfer(Game.getObjectById(creep.memory.targetId),RESOURCE_ENERGY);
      switch(target) {
        case ERR_NOT_IN_RANGE:
          creep.travelTo(Game.getObjectById(creep.memory.targetId));
          break;
        case ERR_INVALID_TARGET:
          let sourceObject = Game.getObjectById(creep.memory.sourceId);
          let containerInRange = creep.pos.findClosestByRange(creep.room.containers, {filter: (structure) => {
              return (structure.pos.inRangeTo(sourceObject,2) && structure);
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
          break;
        case OK:
          creep.say("Transfer")
        default:
          break;
        }
    }
    else {
      const flag = Memory.flags[creep.room.name]
      let target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
          filter: (s) => (s.structureType === STRUCTURE_SPAWN
              || s.structureType === STRUCTURE_EXTENSION
              || (s.structureType === STRUCTURE_TOWER && s.store.getUsedCapacity(RESOURCE_ENERGY) < 500 && creep.store.getUsedCapacity(RESOURCE_ENERGY) >= 150) && flag.energyAvailable == flag.energyCapacity)
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

        if (target2 !== null) {
          if (target2.store.getUsedCapacity(RESOURCE_ENERGY) < target2.store.getCapacity()) {
            if (creep.transfer(target2,RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              creep.travelTo(target2)
            }
          }
          else {
            if (!creep.pos.inRangeTo(creep.room.controller,3)) {
              creep.travelTo(creep.room.controller)
            }
            else {
              creep.say("Waiting")
            }
          }
        }
        else {
          if (!creep.pos.inRangeTo(creep.room.controller,3)) {
            creep.travelTo(creep.room.controller)
          }
          else {
            creep.say("Waiting")
          }
        }
      }
    }
  }
};
