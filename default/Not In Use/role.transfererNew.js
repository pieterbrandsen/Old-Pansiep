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

    let flag = Memory.flags[creep.room.name];
    function needsCreeps(role, numbers) {
        let numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role === role && c.memory.room === creep.room.name);
        return numberOfCreeps < numbers
    }

    // Create required Memory if empty
    if (!creep.memory.link) {
      creep.memory.link = ""
    }
    if (!creep.memory.container) {
      creep.memory.container = ""
    }
    if (!creep.memory.container2) {
        creep.memory.container2 = ""
    }
    if (!creep.memory.targetId) {
      creep.memory.targetId = ""
    }
    if (!flag.transfererMode) {
      flag.transfererMode = ""
    }


    if (creep.memory.working === true) {
      // If creep has no target
      if (Game.getObjectById(creep.memory.targetId) == null) {
        let target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType === STRUCTURE_SPAWN
                || s.structureType === STRUCTURE_EXTENSION
                || ((s.structureType === STRUCTURE_TOWER && s.energy < 500 && creep.store[RESOURCE_ENERGY] >= 150 && needsCreeps("transferer1",2) ==  false) || (s.structureType === STRUCTURE_TOWER && s.energy < 500 && creep.store[RESOURCE_ENERGY] >= 300))
                && s.energy < s.energyCapacity
        }).id;
        // If there is no target
        if (target == null && flag.upgraderMode == "container") {
          // If creep has no controller container and there is still a container in range to controller
          if (creep.memory.container2.length == 0) {
            let i = 0;
            while (creep.memory.container2.length == 0 && i < 15) {
              creep.memory.container2 = creep.pos.findClosestByRange(creep.room.containers, {
                  filter: (structure) => {
                      return (structure.pos.inRangeTo(creep.room.controller, i));
                  }
              }).id;
              i++;
            }
          }

          // If creep has container in range to controller
          else if (creep.memory.container2.length > 0) {
            let target2 = Game.getObjectById(creep.memory.container2);

            // Check first if enough energy to withdraw
            if (target2.store.getUsedCapacity(RESOURCE_ENERGY) > creepCarryCapacity && target2.store.getUsedCapacity(RESOURCE_ENERGY) < 1000) {
              if (creep.transfer(target2, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(target2)
              }
            }
            else if (target2.store.getUsedCapacity(RESOURCE_ENERGY) > 1000 && creep.room.storage.length == 1) {
              if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.storage)
              }
            }
          }
        }
        else if (target == null && (flag.builderMode == "storage" || flag.repairerMode == "storage")) {
          if (creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) < 50000) {
            if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              creep.travelTo(creep.room.storage)
            }
          }
        }

        // Else get new target
        else {
          creep.memory.targetId = target;
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
      let mode = flag.transfererMode;
      let room = Game.rooms[creep.room.name];

      // If creep has no main pickup goal
      if (flag.transfererMode.length == 0) {
        if (creep.room.terminal.length == 1) {
          flag.transfererMode = "terminal";
        }
        else if (creep.room.storage.length == 1 && creep.room.terminal.length == 0 && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > creepCarryCapacity) {
            flag.transfererMode = "storage";
        }
        else if (Game.rooms[creep.room.name].links.length > 0) {
          flag.transfererMode = "link";
        }
        else if (Game.rooms[creep.room.name].containers.length > 0) {
          flag.transfererMode = "container";
        }
        else {
          flag.transfererMode = "source"
        }
      }
      // If creep has main pickup goal
      if (flag.transfererMode.length > 0) {
        if (mode == "terminal") {
          // Withdraw from terminal and check if enough energy
          if (creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > creepCarryCapacity) {
            if (creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              creep.travelTo(creep.room.terminal)
            }
          }
        }
        else if (mode == "storage") {
          // Withdraw from storage and check if enough energy
          if (creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > creepCarryCapacity) {
            if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              creep.travelTo(creep.room.storage)
            }
          }
        }
        else if (mode == "link") {
          // Withdraw from link
          let target = Game.getObjectById(creep.memory.link);

          // If creep has no link
          if (_.size(creep.memory.link) == 0) {
            creep.memory.link = creep.pos.findClosestByRange(creep.room.links, {
              filter: (structure) => {
                return (!structure.pos.inRangeTo(creep.room.controller, 5);
              }
            }).id;
          }

          // If creep has link
          if (_.size(creep.memory.link) > 0) {
            // If storage in target is too low
            if (target.store.getUsedCapacity(RESOURCE_ENERGY) < creepCarryCapacity && creep.room.links.length > 1 && Game.time % 25  == 0) {
              creep.memory.link = creep.pos.findClosestByRange(creep.room.links, {
                filter: (structure) => {
                  return (!structure.pos.inRangeTo(creep.room.link, 5) && !structure.pos.inRangeTo(creep.memory.link,5) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100);
                }
              }).id;
            }

            // If storage in target is enough and check if enough energy
            if (target.store.getUsedCapacity(RESOURCE_ENERGY) > creepCarryCapacity) {
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
                return (!structure.pos.inRangeTo(creep.room.controller, 5));
              }
            }).id;
          }

          // If creep has container
          if (_.size(creep.memory.container) > 0) {
            // If storage in target is too low
            if (target.store.getUsedCapacity(RESOURCE_ENERGY) < creepCarryCapacity && creep.room.containers.length > 1 && Game.time % 25  == 0) {
              creep.memory.container = creep.pos.findClosestByRange(creep.room.containers, {
                filter: (structure) => {
                  return (!structure.pos.inRangeTo(creep.room.controller, 5) && !structure.pos.inRangeTo(creep.memory.container,5) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100);
                }
              }).id;
            }

            // If storage in target is enough
            if (target.store.getUsedCapacity(RESOURCE_ENERGY) > creepCarryCapacity) {
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
    
    if (creep.memory.role == "transfererSo1" && needsCreeps("transferer1",1) ==  false) {
        creep.suicide();
    }
  }
};
