module.exports = {
  run: function(creep) {
    let start = Game.cpu.getUsed();

    // Set Working State
    let creepCarryCapacity = creep.store.getCapacity();
    let creepCarryUsedCapacity = creep.store.getUsedCapacity();
    if (creep.memory.working === true && creepCarryUsedCapacity === 0) {
      creep.memory.working = false;
    }
    else if (creep.memory.working === false && creepCarryUsedCapacity == creepCarryCapacity) {
      creep.memory.working = true;
    }


    let flag = Memory.flags[creep.room.name];
    let flag2 = Memory.flags[creep.memory.room];

    if (!flag) {
      creep.room.createFlag(25,25, creep.room.name)
      Memory.flags[creep.room.name] = {}
    }
    if (!creep.memory.containerId) {
      creep.memory.containerId = ""
    }
    if (!creep.memory.constructionId) {
      creep.memory.constructionId = ""
    }

    let enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    if (creep.room.name == creep.memory.targetRoom) {
      if (creep.memory.working === false) {
        if (creep.memory.sourceId !== undefined) {
          let target = Game.getObjectById(creep.memory.sourceId);
          if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
            creep.travelTo(target)
          }
        }
        else {
          console.log("This creep has no source! - " + creep.room.name + " - " + creep.name)
        }
      }

      else if (creep.memory.working === true) {
        if (creep.memory.containerId.length == 0) {
          let container = creep.pos.findClosestByRange(creep.room.containers, {
            filter: (structure) => {
              return (structure.structureType === STRUCTURE_CONTAINER && structure.pos.inRangeTo(Game.getObjectById(creep.memory.sourceId), 5));
            }
          });

          let findConstructionSites = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);


          if (container !== null) {
            creep.memory.containerId = container.id;
          }
          else if (creep.memory.constructionId.length > 0) {
            let target = Game.getObjectById(creep.memory.constructionId);
            if (creep.build(target) === ERR_NOT_IN_RANGE) {
              creep.travelTo(target)
            }
          }
          else if (findConstructionSites !== null) {
            creep.memory.constructionId = findConstructionSites.id;
          }
        }
        else {
          let targetObject = Game.getObjectById(creep.memory.containerId);
          if (targetObject.hits < 225000) {
            if (creep.repair(targetObject) === ERR_NOT_IN_RANGE) {
              creep.travelTo(targetObject)
            }
          }
          if (targetObject.hits >= 225000) {
            if (creep.transfer(targetObject, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              creep.travelTo(targetObject)
            }
          }
        }
      }
    }
    else if (creep.room.name !== creep.memory.targetRoom) {
      let targetRoom = creep.memory.targetRoom;
      if (Game.flags[targetRoom] !== undefined) {
          creep.travelTo((Game.flags[targetRoom]))
      }
      if (Game.flags[targetRoom] === undefined) {
          Game.notify("There is no flag in " + creep.memory.target + "!")
      }
    }

    flag2.rHarvesterCpu += Game.cpu.getUsed() - start
  }
};
