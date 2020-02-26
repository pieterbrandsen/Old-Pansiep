module.exports = {
    run: function(creep) {
        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
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
        let target = creep.memory.target;
        let target2 = creep.memory.room;
        let enemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);

        if (Game.rooms[creep.memory.target] !== undefined) {
            if (creep.memory.working === false) {
                if (creep.room.name === creep.memory.target && enemy == null) {
                    if (_.size(creep.memory.container) == 0 || Game.time % 250 == 0) {
                        creep.memory.container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 1000);
                            }
                        });
                    }
                    if (_.size(creep.memory.container) > 0) {
                        let target = Game.getObjectById(creep.memory.container.id);
                        if(creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(target)
                        }
                    }
                }
                else if (creep.room.name !== creep.memory.target || enemy !== null) {
                    if (Game.flags[target] !== undefined) {
                        creep.travelTo((Game.flags[target]))
                    }
                    if (Game.flags[target] === undefined) {
                        Game.notify("There is no flag in " + creep.memory.target + "!")
                    }
                }
            }
            if (creep.memory.working === true) {
                if (creep.room.name === creep.memory.room) {
                    if (_.size(creep.memory.link) == 0 || Game.time % 250 == 0) {
                        creep.memory.link = creep.pos.findClosestByRange(creep.room.links, {
                            filter: (structure) => {
                                return (structure.structureType === STRUCTURE_LINK && !structure.pos.inRangeTo(creep.room.controller, 5));
                            }
                        });
                    }
                    if (_.size(creep.memory.container2) == 0 || Game.time % 250 == 0) {
                        creep.memory.container = creep.pos.findClosestByRange(creep.room.containers2, {
                            filter: (structure) => {
                                return (structure.structureType === STRUCTURE_CONTAINER && !structure.pos.inRangeTo(creep.room.controller, 5));
                            }
                        });
                    }

                    if (creep.room.storage !== undefined && creep.room.storage.store.getFreeCapacity() > 0) {
                        if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (creep.room.terminal !== undefined && creep.room.terminal.store.getFreeCapacity() > 0) {
                        if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    else if (creep.room.links.length > 2 && _.size(creep.memory.link) > 0) {
                        let link = Game.getObjectById(creep.memory.link.id);
                        if (creep.transfer(link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(link)
                        }
                    }
                    else if (creep.room.links.length < 2 && creep.room.containers.length > 0 && _.size(creep.memory.container2) > 0) {
                        let container = Game.getObjectById(creep.memory.container2.id);
        
                        if (creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(container)
                        }
                    }
                }
                else if (creep.room.name !== creep.memory.room) {
                    if (Game.flags[target2] !== undefined) {
                        creep.travelTo((Game.flags[target2]))
                    }
                    else if (Game.flags[target2] === undefined) {
                        Game.notify("There is no flag in " + creep.memory.room + "!")
                    }
                }
            }
        }
    }
};