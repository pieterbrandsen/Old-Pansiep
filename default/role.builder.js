module.exports = {
  run: function(creep) {
    // Set Working State
    if (creep.memory.working === true && _.sum(creep.carry) === 0) {
      creep.memory.working = false;
    }
    else if (creep.memory.working === false && _.sum(creep.carry) === creep.carryCapacity) {
      creep.memory.working = true;
    }

    // Create required Memory if empty
    if (!creep.memory.link) {
      creep.memory.link = {}
    }
    if (!creep.memory.container) {
      creep.memory.container = {}
    }
    if (!creep.memory.targetId) {
      creep.memory.targetId = ""
    }
    if (!creep.memory.mode) {
      creep.memory.mode = ""
    }

    let flag = Game.rooms[creep.room.name];

    if (creep.memory.working === true) {
      // If creep has no target
      if (Game.getObjectById(creep.memory.targetId) == null) {
        // If there is no target
        if (creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES) == null) {
          creep.suicide();
          flag.constructions = room.find(FIND_CONSTRUCTION_SITES);
        }
        // Else get new target
        else {
          creep.memory.targetId = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES).id
        }
      }
      // If creep has target
      if (Game.getObjectById(creep.memory.targetId) !== null) {
        let target = Game.getObjectById(creep.memory.targetId)
        if (creep.build(target) === ERR_NOT_IN_RANGE) {
          creep.travelTo(target)
        }
      }
    }
    else if (creep.memory.working === false) {
      let mode = creep.memory.mode;
      let room = Game.rooms[creep.room.name];

      // If creep has no main pickup goal
      if (_.size(creep.memory.mode) == 0) {
        if (_.size(Game.rooms[creep.room.name].terminal) > 0) {
          creep.memory.mode = "terminal";
        }
        // else if (_.size(Game.rooms[creep.room.name].storage) > 0 && _.size(Game.rooms[creep.room.name].terminal) == 0) {
        //     creep.memory.mode = "storage";
        // }
        else if (_.size(Game.rooms[creep.room.name].links) > 0) {
          creep.memory.mode = "link";
        }
        else if (_.size(Game.rooms[creep.room.name].containers) > 0) {
          creep.memory.mode = "container";
        }
        else {
          creep.memory.mode = "source"
        }
      }
      // If creep has main pickup goal
      if (_.size(creep.memory.mode) > 0) {
        if (mode == "terminal") {
          // Withdraw from terminal
          if (creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)
          }
        }
        else if (mode == "storage") {
          // Withdraw from storage
          if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.storage)
          }
        }
        else if (mode == "link") {
          // Withdraw from link
          let target = Game.getObjectById(creep.memory.link);

          // If creep has no link
          if (_.size(creep.memory.link) == 0) {
            creep.memory.link = creep.pos.findClosestByRange(creep.room.links, {
              filter: (structure) => {
                return (!structure.pos.inRangeTo(creep.room.controller, 5) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100);
              }
            }).id;
          }

          // If creep has link
          if (_.size(creep.memory.link) > 0) {
            // If storage in target is too low
            if (target.store.energy < 100 && creep.room.links.length > 1 && Game.time % 25  == 0) {
              creep.memory.link = creep.pos.findClosestByRange(creep.room.links, {
                filter: (structure) => {
                  return (!structure.pos.inRangeTo(creep.room.link, 5) && !structure.pos.inRangeTo(creep.memory.link,5) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100);
                }
              }).id;
            }

            // If storage in target is enough
            if (target.store.energy > 100) {
              if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.travelTo(target)
              }
            }
          }
        }
        else if (mode == "container") {
          // If mode is container
          let target = Game.getObjectById(creep.memory.container);

          // If creep has no container
          if (_.size(creep.memory.container) == 0) {
            creep.memory.container = creep.pos.findClosestByRange(creep.room.containers, {
              filter: (structure) => {
                return (!structure.pos.inRangeTo(creep.room.controller, 5) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100);
              }
            }).id;
          }

          // If creep has container
          if (_.size(creep.memory.container) > 0) {
            // If storage in target is too low
            if (target.store.energy < 100 && creep.room.containers.length > 1 && Game.time % 25  == 0) {
              creep.memory.container = creep.pos.findClosestByRange(creep.room.containers, {
                filter: (structure) => {
                  return (!structure.pos.inRangeTo(creep.room.controller, 5) && !structure.pos.inRangeTo(creep.memory.container,5) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100);
                }
              }).id;
            }

            // If storage in target is enoughy
            if (target.store.energy > 100) {
              if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.travelTo(target)
              }
            }
          }
        }
        else if (mode == "source") {
          // If all other mode return false

          // If creep has no source
          if (_.size(creep.memory.source) == 0 || Game.time % 250 == 0) {
            creep.memory.source = creep.pos.findClosestByRange(creep.room.sources).id;
          }

          // If creep has source
          else if (_.size(creep.memory.source) > 0) {
            let target = Game.getObjectById(creep.memory.source);
            if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
              creep.travelTo(target)
            }
          }
        }
      }
      // If there are problems, get notified
      else {
        Game.notify("ERR: This room's " + creep.memory.role + " cant Withdraw (" + creep.room.name + ")!")
      }
    }
  }
};
