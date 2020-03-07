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
    if (!flag.upgraderMode) {
      flag.upgraderMode = ""
    }


    if (creep.memory.working === false) {
      // Go upgrade controller
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
          creep.travelTo(creep.room.controller)
      }
    }
    else if (creep.memory.working === true) {
      let mode = flag.upgraderMode;
      let room = Game.rooms[creep.room.name];

      // If creep has no main pickup goal
      if (flag.upgraderMode.length == 0) {
        if (Game.rooms[creep.room.name].links.length > 0) {
          flag.upgraderMode = "link";
        }
        else if (Game.rooms[creep.room.name].containers.length > 0) {
          flag.upgraderMode = "container";
        }
        else {
          flag.upgraderMode = "source"
        }
      }
      // If creep has main pickup goal
      if (flag.upgraderMode.length > 0) {
        if (mode == "link") {
          // Withdraw from link
          let target = Game.getObjectById(creep.memory.link);

          // If creep has no link
          if (creep.memory.link.length == 0) {
            let i = 0;
            while (creep.memory.link.length == 0 && i < 15) {
              creep.memory.link = creep.pos.findClosestByRange(creep.room.links, {
                  filter: (structure) => {
                      return (structure.pos.inRangeTo(creep.room.controller, i));
                  }
              }).id;
              i++;
            }
          }

          // If creep has link
          if (creep.memory.link.length > 0) {
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
          if (creep.memory.container.length == 0) {
            let i = 0;
            while (creep.memory.container.length == 0 && i < 15) {
              creep.memory.container = creep.pos.findClosestByRange(creep.room.containers, {
                  filter: (structure) => {
                      return (structure.pos.inRangeTo(creep.room.controller, i));
                  }
              }).id;
              i++;
            }
          }

          // If creep has container
          if (creep.memory.container.length > 0) {
            // If storage in target is enough and check if enough energy
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
  }
};
