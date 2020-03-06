module.exports = {
    run: function(creep) {
        if (creep.memory.working === true && _.sum(creep.carry) === 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && _.sum(creep.carry) === creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (!creep.memory.link) {
            creep.memory.link = {}
        }
        if (!creep.memory.container) {
            creep.memory.container = {}
        }

        if (creep.memory.working === false) {
            if (creep.memory.sourceId !== undefined) {
                let target = Game.getObjectById(creep.memory.sourceId);
                if (target.energy > 0) {
                    if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(target)
                    }
                }
            }
            else {console.log("This creep has no source! - " + creep.room.name + " - " + creep.name)}
        }
        else if (creep.memory.working === true) {
            if ((_.size(creep.memory.link) == 0 || _.size(creep.memory.link) == null) || Game.time % 250 == 0) {
                creep.memory.link = creep.pos.findClosestByRange(creep.room.links, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_LINK);
                    }
                });
            }
            if ((_.size(creep.memory.container) == 0 || _.size(creep.memory.container) == null) || Game.time % 250 == 0) {
                creep.memory.container = creep.pos.findClosestByRange(creep.room.containers, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER);
                    }
                });
            }

            if (creep.room.links.length > 2 && _.size(creep.memory.link) > 0) {
                let link = Game.getObjectById(creep.memory.link.id);
                if (creep.transfer(link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(link)
                }
            }
            else if (creep.room.links.length < 2 && creep.room.containers.length > 0 && _.size(creep.memory.container) > 0) {
                let container = Game.getObjectById(creep.memory.container.id);

                if (creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(container)
                }
            }
            else if (creep.room.links.length < 2 && creep.room.containers.length == 0 && creep.room.terminal !== undefined) {
                if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }
            else {
                let target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType === STRUCTURE_SPAWN
                        || s.structureType === STRUCTURE_EXTENSION
                        || s.structureType === STRUCTURE_TOWER && s.energy < 500 && creep.store[RESOURCE_ENERGY] >= 150)
                        && s.energy < s.energyCapacity
                });
                if (target !== null) {
                    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(target)
                    }
                }
            }
        }

        function needsCreeps(role, numbers) {
            let numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role === role && c.memory.room === creep.room.name);
            return numberOfCreeps < numbers
        }
        if (creep.memory.role == "harvesterSo1" && needsCreeps("harvester1",1) ==  false) {
            creep.suicide();
        }
        if (creep.memory.role == "harvesterSo2" && needsCreeps("harvester2",1) ==  false) {
            creep.suicide();
        }
    }
};

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


    if (creep.memory.working === false) {
      // If creep has no target

      if (creep.memory.sourceId !== undefined) {
          let target = Game.getObjectById(creep.memory.sourceId);
          if (target.energy > 0) {
              if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(target)
              }
          }
      }
      else {console.log("This creep has no source! - " + creep.room.name + " - " + creep.name)}
      if (creep.memory.sourceId == null) {
        // Assign sourceId
        if (creep.memory.role.includes("1") == true) {
          creep.memory.sourceId = flag.sources[0];
        }
        else if (creep.memory.role.includes("2") == true) {
          creep.memory.sourceId = flag.sources[1];
        }
      }
      // If creep has target
      if (creep.memory.sourceId !== null) {
        let target = Game.getObjectById(creep.memory.sourceId);
        if (target.energy > 0) {
            if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                creep.travelTo(target)
            }
        }
      }
    }
    else if (creep.memory.working === true) {
      let mode = flag.transfererMode;
      let room = Game.rooms[creep.room.name];

      // If creep has no main pickup goal
      if (flag.transfererMode.length == 0) {
        if (Game.rooms[creep.room.name].links.length > 0) {
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
        if (mode == "link") {
          // If mode is link
          let target = Game.getObjectById(creep.memory.link);

          // If creep has no link
          if (creep.memory.link.length == 0) {
          }

          // If creep has link
          if (creep.memory.link.length > 0) {
          }
        }
        else if (mode == "container") {
          // If mode is container
          let target = Game.getObjectById(creep.memory.container);

          // If creep has no container
          if (creep.memory.container.length == 0) {

          }

          // If creep has container
          if (creep.memory.container.length > 0) {

          }
        }
        else if (mode == "source") {

        }
      }
      // If there are problems, get notified
      else {
        Game.notify("ERR: This room's " + creep.memory.role + " cant Withdraw (" + creep.room.name + ")!")
      }
    }
    function needsCreeps(role, numbers) {
        let numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role === role && c.memory.room === creep.room.name);
        return numberOfCreeps < numbers
    }
    if (creep.memory.role == "harvesterSo1" && needsCreeps("harvester1",1) ==  false) {
        creep.suicide();
    }
    if (creep.memory.role == "harvesterSo2" && needsCreeps("harvester2",1) ==  false) {
        creep.suicide();
    }
  }
};
