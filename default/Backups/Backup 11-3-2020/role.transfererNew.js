module.exports = {
    run: function(creep) {
      console.log(creep.room.name)
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
        if (!creep.memory.targetId) {
            creep.memory.targetId = ""
        }
        if (!creep.memory.mode) {
            creep.memory.mode = ""
        }
        let flag = Game.rooms[creep.room.name];

        if (creep.memory.working === true) {
            if (Game.getObjectById(creep.memory.targetId) == null) {
              if (creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES) == null) {
                creep.suicide();
              }
              else {
                creep.memory.targetId = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES).id
              }
            }
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
                else {creep.memory.mode = "source"}
            }

            if (_.size(creep.memory.mode) > 0) {
                if (mode == "terminal") {
                    if (creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }
                else if (mode == "storage") {
                    if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.storage)
                    }
                }
                else if (mode == "link") {
                  if (_.size(creep.memory.link) == 0) {
                    creep.memory.link = creep.pos.findClosestByRange(creep.room.links, {
                      filter: (structure) => {
                        return (!structure.pos.inRangeTo(creep.room.controller, 5));
                      }
                    }).id;
                  }

                  let target = Game.getObjectById(creep.memory.link);
                  if (_.size(creep.memory.container) > 0) {
                    if (target.store.energy < 100 && creep.room.links.length > 1 && Game.time % 25  == 0) {
                      creep.memory.link = creep.pos.findClosestByRange(creep.room.links, {
                        filter: (structure) => {
                          return (!structure.pos.inRangeTo(creep.room.link, 5) && !structure.pos.inRangeTo(creep.memory.link,5) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                        }
                      }).id;
                    }
                    if (target.store.energy > 100) {
                      if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(target)
                      }
                    }
                  }
                }
                else if (mode == "container") {
                  if (_.size(creep.memory.container) == 0) {
                    creep.memory.container = creep.pos.findClosestByRange(creep.room.containers, {
                      filter: (structure) => {
                        return (!structure.pos.inRangeTo(creep.room.controller, 5));
                      }
                    }).id;
                  }

                  let target = Game.getObjectById(creep.memory.container);
                  if (_.size(creep.memory.container) > 0) {
                    let start1 = Game.cpu.getUsed()

                    if (target.store.energy < 100 && creep.room.containers.length > 1 && Game.time % 25  == 0) {
                      creep.memory.container = creep.pos.findClosestByRange(creep.room.containers, {
                        filter: (structure) => {
                          return (!structure.pos.inRangeTo(creep.room.controller, 5) && !structure.pos.inRangeTo(creep.memory.container,5) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
                        }
                      }).id;
                    }
                    Memory.stats['cpu.avg.test1'] = Game.cpu.getUsed() - start1;

                    let start2 = Game.cpu.getUsed()

                    if (target.store.energy > 100) {
                      if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(target)
                      }
                    }
                    Memory.stats['cpu.avg.test2'] = Game.cpu.getUsed() - start2;

                  }
                }
                else if (mode == "source") {
                    if (_.size(creep.memory.source) == 0 || Game.time % 250 == 0) {
                        creep.memory.source = creep.pos.findClosestByRange(creep.room.sources).id;
                    }
                    else if (_.size(creep.memory.source) > 0) {
                        let target = Game.getObjectById(creep.memory.source);
                        if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(target)
                        }
                    }
                }
            }
            else {Game.notify("ERR: This room's Builder cant Withdraw (" + creep.room.name + ")!")}
        }
        Memory.stats['cpu.avg10.test1'] = 0.9 * Memory.stats['cpu.avg10.test1'] + 0.1 * Memory.stats['cpu.avg.test1'];
        Memory.stats['cpu.avg100.test1'] = 0.99 * Memory.stats['cpu.avg100.test1'] + 0.01 * Memory.stats['cpu.avg.test1'];
        Memory.stats['cpu.avg1000.test1'] = 0.999 * Memory.stats['cpu.avg1000.test1'] + 0.001 * Memory.stats['cpu.avg.test1'];

        Memory.stats['cpu.avg10.test2'] = 0.9 * Memory.stats['cpu.avg10.test2'] + 0.1 * Memory.stats['cpu.avg.test2'];
        Memory.stats['cpu.avg100.test2'] = 0.99 * Memory.stats['cpu.avg100.test2'] + 0.01 * Memory.stats['cpu.avg.test2'];
        Memory.stats['cpu.avg1000.test2'] = 0.999 * Memory.stats['cpu.avg1000.test2'] + 0.001 * Memory.stats['cpu.avg.test2'];
    }
};
