module.exports = {
  run: function(creep) {
    if (creep.memory.working === true && _.sum(creep.carry) === 0) {
      creep.memory.working = false;
    }
    else if (creep.memory.working === false && _.sum(creep.carry) === creep.carryCapacity) {
      creep.memory.working = true;
    }


    if (!flag) {
      creep.room.createFlag(25,25, creep.room.name)
      Memory.flags[creep.room.name] = {}
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
        if (creep.memory.constructionId.length == 0) {
          let findConstructionSites = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

          if (findConstructionSites !== null) {
            creep.memory.constructionId = findConstructionSites.id;
          }
        }
        else {
          let target = Game.getObjectById(creep.memory.constructionId);
          if (creep.build(target) === ERR_NOT_IN_RANGE) {
            creep.travelTo(target)
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
  }
};
