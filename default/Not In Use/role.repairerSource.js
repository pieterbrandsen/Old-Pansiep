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