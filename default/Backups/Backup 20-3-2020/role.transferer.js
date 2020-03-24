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
    if (!creep.memory.targetId2) {
      creep.memory.targetId2 = ""
    }
    if (!creep.memory.transfererMode) {
      creep.memory.transfererMode = ""
    }

    if (!flag) {
      creep.room.createFlag(25,25, creep.room.name)
    }
    else if (!flag.transfererMode2) {
      flag.transfererMode2 = ""
    }
    else if (!flag.upgraderMode2) {
      flag.upgraderMode2 = ""
    }
    if (!Memory.flags[creep.room.name]) {
        Memory.flags[creep.room.name] = {}
    }


    let role = creep.memory.transfererMode;
    if (creep.memory.working == true) {
      // If creep has no target
      let target = Game.getObjectById(creep.memory.targetId);
      if (Game.getObjectById(creep.memory.targetId) == null && Game.time % 5 == 0) {
        let target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType === STRUCTURE_SPAWN
                || s.structureType === STRUCTURE_EXTENSION
                || ((s.structureType === STRUCTURE_TOWER && s.store.getUsedCapacity(RESOURCE_ENERGY) < 500 && creep.store.getUsedCapacity(RESOURCE_ENERGY) >= 150 && needsCreeps("transferer1",2) ==  false) || (s.structureType == STRUCTURE_TOWER && s.store.getUsedCapacity(RESOURCE_ENERGY) < 500 && creep.store.getUsedCapacity(RESOURCE_ENERGY) >= 300)))
                && s.energy < s.energyCapacity
        });

        // If there is no target

        if (target == null && flag.upgraderMode2 == "container") {
          // If creep has no controller container and there is still a container in range to controller
          if (creep.memory.container2.length == 0) {
            for (let i = 0;creep.memory.container2.length == 0 && i < 5;i++) {
              let container = creep.room.controller.pos.findClosestByRange(creep.room.containers, {
                  filter: (structure) => {
                      return (structure.pos.inRangeTo(creep.room.controller, i));
                  }
              });

              if (container !== null) {
                creep.memory.container2 = container.id
              }
            }
          }

          // If creep has container in range to controller
          else if (creep.memory.container2.length > 0) {
            let target2 = Game.getObjectById(creep.memory.container2);

            // Check first if enough energy to withdraw
            if (target2.store.getUsedCapacity(RESOURCE_ENERGY) < 1500) {
              if (creep.transfer(target2, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(target2)
              }
            }
            else if (target2.store.getUsedCapacity(RESOURCE_ENERGY) > 1500 && creep.room.storage !== undefined && role !== "storage" && role !== "terminal") {
              if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.storage)
              }
            }
          }
        }
        else if (target == null && (flag.builderMode == "storage" || flag.repairerMode == "storage")) {
          if (creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) < 50000) {
            if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
              creep.travelTo(creep.room.storage)
            }
          }
        }

        // Else get new target
        else if (target !== null) {
          creep.memory.targetId = target.id;
        }
        else if (Game.time % 10 == 0) {
          if (creepCarryCapacity > creepCarryUsedCapacity) {
            creep.memory.working = false;
          }
        }
      }
      // If creep has target
      if (Game.getObjectById(creep.memory.targetId) !== null) {
        let target = Game.getObjectById(creep.memory.targetId)

        if (target.structureType == STRUCTURE_TOWER && target.store.getUsedCapacity(RESOURCE_ENERGY) > 800) {
          creep.memory.targetId = "";
        }
        else if (target.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
          if (creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.travelTo(target)
          }
        }
        else {
          creep.memory.targetId = "";
        }
      }
    }

    else if (creep.memory.working == false) {
      let mode = creep.memory.transfererMode;
      let room = Game.rooms[creep.room.name];

      // If creep has no main pickup goal
      if (creep.memory.transfererMode.length == 0) {
        let container = creep.pos.findClosestByRange(creep.room.containers, {
          filter: (structure) => {
            return (!structure.pos.inRangeTo(creep.room.controller,5));
          }
        });

        if (creep.room.terminal !== undefined) {
          creep.memory.transfererMode = "terminal";
        }
        else if (creep.room.storage !== undefined && creep.room.terminal == undefined && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 10000) {
            creep.memory.transfererMode = "storage";
        }
        else if (container !== null) {
          creep.memory.targetId2 = container.id;
          creep.memory.transfererMode = "object";
        }
      }
      // If creep has main pickup goal
      if (creep.memory.transfererMode.length > 0) {
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
          else {
            creep.memory.transfererMode = "";
          }
        }
        if (mode == "object") {
          let target = Game.getObjectById(creep.memory.targetId2)

          //Go transfer
          if (target !== null) {
            if (target.store.getUsedCapacity(RESOURCE_ENERGY) > creepCarryCapacity) {
              if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.travelTo(target)
              }
            }
            else if (target.store.getUsedCapacity(RESOURCE_ENERGY) < creepCarryCapacity && Game.time % 10 == 0) {
              if (target.structureType == STRUCTURE_CONTAINER) {
                let container = creep.pos.findClosestByRange(creep.room.containers, {
                  filter: (structure) => {
                    return (!structure.pos.inRangeTo(creep.room.controller,5) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > target.store.getUsedCapacity(RESOURCE_ENERGY));
                  }
                });

                if (container !== null) {
                  creep.memory.targetId2 = container.id
                }
              }
            }
          }
          else {
            creep.memory.transfererMode = "";
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

    flag.transfererCpu += Game.cpu.getUsed() - start
  }
};
