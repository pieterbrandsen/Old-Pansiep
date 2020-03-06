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
        if (!creep.memory.container2) {
            creep.memory.container2 = {}
        }
        if (creep.memory.working === true) {
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART
            });
            if (target !== undefined) {
                if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target)
                }
            }
            else {creep.memory.working = false}
        }
        else if (creep.memory.working === false) {
            if (_.size(creep.memory.link) == 0|| Game.time % 250 == 0) {
                creep.memory.link = creep.pos.findClosestByRange(creep.room.links, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_LINK && structure.pos.inRangeTo(creep.room.controller, 5));
                    }
                });
            }
            if (_.size(creep.memory.container) == 0|| Game.time % 250 == 0) {
                creep.memory.container = creep.pos.findClosestByRange(creep.room.containers, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER && structure.pos.inRangeTo(creep.room.controller, 5) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 500);
                    }
                });
            }
            if (_.size(creep.memory.container2) == 0|| Game.time % 250 == 0) {
                creep.memory.container2 = creep.pos.findClosestByRange(creep.room.containers, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 500);
                    }
                });
            }

            if (creep.room.links.length > 2) {
                let link = Game.getObjectById(creep.memory.link.id);

                if (creep.withdraw(link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(link)
                }
            }
            else if (creep.room.links.length <= 2 && _.size(creep.memory.container) > 0) {
                let container = Game.getObjectById(creep.memory.container.id);

                if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(container)
                }
            }
            else if (creep.room.links.length <= 2 && _.size(creep.memory.container) == 0 && creep.room.terminal !== undefined) {
                if (creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }
            else if (creep.room.links.length < 2 && _.size(creep.memory.container) == 0 && _.size(creep.memory.container2) > 0) {
                let container = Game.getObjectById(creep.memory.container2.id);

                if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(container)
                }
            }
            else if (creep.room.links.length < 2 && _.size(creep.memory.container2) == 0) {
                let target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target)
                }
            }
            else {Game.notify("ERR: This room's Repairer cant Withdraw (" + creep.room.name + ")!")}
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
    if (!flag.repairerMode) {
      flag.repairerMode = ""
    }


    if (creep.memory.working === false) {
      // If creep has no target
      if (Game.getObjectById(creep.memory.targetId) == null) {
        // If there is no target
        creep.memory.targetId = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART
        }).id;
      }

      // If creep has target
      else if (Game.getObjectById(creep.memory.targetId) !== null) {
        let target = Game.getObjectById(creep.memory.targetId)
        if (creep.repair(target) === ERR_NOT_IN_RANGE) {
            creep.travelTo(target)
        }
      }
      else {creep.memory.working = false}
    }
    else if (creep.memory.working === true) {
      let mode = flag.repairerMode;
      let room = Game.rooms[creep.room.name];

      // If creep has no main pickup goal
      if (flag.repairerMode.length == 0) {
        if (Game.rooms[creep.room.name].links.length > 0) {
          flag.repairerMode = "link";
        }
        else if (Game.rooms[creep.room.name].containers.length > 0) {
          flag.repairerMode = "container";
        }
        else {
          flag.repairerMode = "source"
        }
      }
      // If creep has main pickup goal
      if (flag.repairerMode.length > 0) {
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
            if (target.store.energy > creepCarryCapacity) {
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
            if (target.store.energy > creepCarryCapacity) {
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
