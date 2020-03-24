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
    if (!creep.memory.targetId) {
      creep.memory.targetId = ""
    }
    if (!creep.memory.targetId) {
      creep.memory.targetId = ""
    }
    if (!creep.memory.targetId2) {
        creep.memory.targetId2 = ""
    }
    if (!creep.memory.targetId) {
      creep.memory.targetId = ""
    }
    if (!creep.memory.source) {
      creep.memory.source = ""
    }
    if (flag == undefined) {
      creep.room.createFlag(25,25, creep.room.name)
    }
    if (!flag.upgraderMode) {
      flag.upgraderMode = ""
    }
    if (!flag.upgraderTargetId) {
      flag.upgraderTargetId = ""
    }


    if (creep.pos.inRangeTo(creep.room.controller,1) || (flag.upgraderTargetId.length > 0 || creep.memory.source.length > 0)) {
      if (creep.memory.working === true) {
        // Go upgrade controller
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
          creep.travelTo(creep.room.controller)
        }
      }
      else if (creep.memory.working == false) {
        let mode = flag.upgraderMode;
        let room = Game.rooms[creep.room.name];

        // If creep has no main pickup goal
        if (flag.upgraderMode.length == 0 || flag.upgraderTargetId.length == 0) {
          let container;
          let link;

          for (let i = 0;i < 5;i++) {
            let findContainer = creep.room.controller.pos.findClosestByRange(creep.room.containers, {
                filter: (structure) => {
                    return (structure.pos.inRangeTo(creep.room.controller, i));
                }
            });
            let findLink = creep.room.controller.pos.findClosestByRange(creep.room.links, {
                filter: (structure) => {
                    return (structure.pos.inRangeTo(creep.room.controller, i));
                }
            });

            if (findContainer !== null) {
              container = findContainer.id;
            }
            if (findLink !== null) {
              link = findLink.id;
            }
          }

          if (creep.room.links.length > 0 && link !== null) {
            flag.upgraderMode = "object";
            flag.upgraderMode2 = "link";
            flag.upgraderTargetId = link;
          }
          else if (creep.room.containers.length > 0 && container !== null) {
            flag.upgraderMode = "object";
            flag.upgraderMode2 = "container";
            flag.upgraderTargetId = container;

          }
          else {
            flag.upgraderMode2 = "source";
            flag.upgraderMode = "source"
          }
        }
        // If creep has main pickup goal
        if (flag.upgraderMode.length > 0) {
          if (mode == "object") {
            let target = Game.getObjectById(flag.upgraderTargetId)

            //Go transfer
            if (target !== null) {
              if (target.store.getUsedCapacity(RESOURCE_ENERGY) > creepCarryCapacity) {
                if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                  creep.travelTo(target)
                }
              }
              else if (creep.pos.inRangeTo(creep.room.controller,5) == false) {
                creep.travelTo(target)
              }
          	}
            else {
              mode = "";
            }
          }
          else if (mode == "source") {
            // If all other mode return false

            // If creep has no source
            if (creep.memory.source.length == 0 || Game.time % 250 == 0) {
              creep.memory.source = creep.pos.findClosestByRange(FIND_SOURCES).id;
            }

            // If creep has source
            else if (creep.memory.source.length > 0) {
              let target = Game.getObjectById(creep.memory.source);
              if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                creep.travelTo(target)
              }
            }
          }
          // If there are problems, get notified
          else {
            Game.notify("ERR: This room's " + creep.memory.role + " cant Withdraw (" + creep.room.name + ")!")
          }
        }
      }
    }
    else {
      creep.travelTo(creep.room.controller)
    }
  }
};
