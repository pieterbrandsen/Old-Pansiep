module.exports = {
  run: function(creep) {

    // Set Working State
    let creepCarryCapacity = creep.store.getCapacity();
    let creepCarryUsedCapacity = creep.store.getUsedCapacity();
    if (creep.memory.working === true && creepCarryUsedCapacity === 0) {
      creep.memory.working = false;
    }
    else if (creep.memory.working === false && creepCarryUsedCapacity == creepCarryCapacity) {
      creep.memory.working = true;
    }


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

    if (creep.memory.working === false) {
      if (creep.room.name == creep.memory.targetRoom) {
        if (creep.memory.containerId.length == 0 || Game.time % 100 == 0) {
          let container = creep.pos.findClosestByRange(creep.room.containers, {
            filter: (structure) => {
              return (!structure.pos.inRangeTo(creep.room.controller,5) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > target.store.getUsedCapacity(RESOURCE_ENERGY));
            }
          });

          if (container !== null) {
            creep.memory.containerId = container.id
          }
        }
        else {
          let targetObject = Game.getObjectById(creep.memory.containerId);
          if (targetObject.store.getUsedCapacity(RESOURCE_ENERGY) > 1000) {
            if (creep.withdraw(targetObject, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.travelTo(targetObject)
            }
          }
        }
      }
      else {
        let targetRoom = creep.memory.targetRoom;
        if (Game.flags[targetRoom] !== undefined) {
            creep.travelTo((Game.flags[targetRoom]))
        }
        if (Game.flags[targetRoom] === undefined) {
            Game.notify("There is no flag in " + creep.memory.target + "!")
        }
      }
    }

    else if (creep.memory.working === true) {
      if (creep.room.name == creep.memory.room) {
        if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.travelTo(creep.room.storage)
        }
      }
      else {
        let targetRoom = creep.memory.room;
        if (Game.flags[targetRoom] !== undefined) {
            creep.travelTo((Game.flags[targetRoom]))
        }
        if (Game.flags[targetRoom] === undefined) {
            Game.notify("There is no flag in " + creep.memory.target + "!")
        }
      }
    }
  }
};
