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
        if (creep.memory.working === true) {
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.controller)
            }
        }
        else if (creep.memory.working === false) {
            if ((creep.room.links.length > 0 && creep.memory.link.structureType !== "link") || Game.time % 250 == 0) {
                creep.memory.link = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_LINK && structure.pos.inRangeTo(creep.room.controller, 5));
                    }
                });
            }
            if ((creep.room.containers.length > 0 && creep.memory.container.structureType !== "container") || Game.time % 250 == 0) {
                creep.memory.container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER && structure.pos.inRangeTo(creep.room.controller, 5));
                    }
                });
            }

            let link = Game.getObjectById(creep.memory.link.id);
            let container = Game.getObjectById(creep.memory.container.id);
            
            if (creep.room.links.length > 1) {
                if (creep.withdraw(link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(link)
                }
            }
            else if (creep.room.links.length < 2 && creep.room.containers.length > 0) {
                if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(container)
                }
            }
            if (creep.room.links.length < 2 && creep.room.containers.length == 0 && creep.room.terminal !== undefined) {
                if (creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }
            else if (creep.room.links.length < 2 && creep.room.containers.length == 0) {
                let target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target)
                }
            }
            else {Game.notify("ERR: This room's Repairer cant Withdraw (" + creep.room.name + ")!")}
        }
    }
};