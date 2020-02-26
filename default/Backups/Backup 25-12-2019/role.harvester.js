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
        let max = Math.max(creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY), creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY))
        if (creep.memory.working === false) {
            if (creep.memory.sourceId !== undefined) {
                let target = Game.getObjectById(creep.memory.sourceId);
                if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target)
                }
            }
            else {console.log("This creep has no source! - " + creep.room.name + " - " + creep.name)}
        }
        else if (creep.memory.working === true) {
            if ((creep.room.links.length > 0 && creep.memory.link.structureType !== "link") || Game.time % 250 == 0) {
                creep.memory.link = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_LINK && structure.pos.inRangeTo(Game.getObjectById(creep.memory.sourceId), 5));
                    }
                });
            }
            if ((creep.room.containers.length > 0 && creep.memory.container.structureType !== "container") || Game.time % 250 == 0) {
                creep.memory.container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER && structure.pos.inRangeTo(Game.getObjectById(creep.memory.sourceId), 5));
                    }
                });
            }

            if (creep.room.links.length > 2) {
                let link = Game.getObjectById(creep.memory.link.id);

                if (creep.transfer(link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(link)
                }
            }
            else if (creep.room.links.length < 2 && creep.room.containers.length > 0) {
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
            else if (creep.room.links.length < 2 && creep.room.containers.length == 0 && creep.room.terminal === undefined) {
                let target2 = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType === STRUCTURE_SPAWN
                        || s.structureType === STRUCTURE_EXTENSION)
                        && s.energy < s.energyCapacity
                });
    
                if (target2 !== undefined) {
                    if (creep.transfer(target2, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(target2)
                    }
                }
            }
            else {Game.notify("ERR: This room's Harvester cant Transfer (" + creep.room.name + ")!")}
        }
    }
};