module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working === true && creep.carry.energy === 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }
        if (!creep.memory.link) {
            creep.memory.link = {}
        }
        if (!creep.memory.container) {
            creep.memory.container = {}
        }
        let max = Math.max(creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY), creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY))

        if (creep.memory.working === true) {
            let target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType === STRUCTURE_SPAWN
                    || s.structureType === STRUCTURE_EXTENSION)
                    && s.energy < s.energyCapacity
            });
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.travelTo(target)
            }
        }
        else if (creep.memory.working === false) {
            if ((creep.room.terminal !== undefined && creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 500) || (creep.room.storage !== undefined && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 500)) {
                if (creep.room.terminal !== undefined && creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) == max) {
                    if (creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }
                else if (creep.room.storage !== undefined && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) == max) {
                    if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.storage)
                    }
                }
            }
            else if ((creep.room.terminal === undefined || creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < 500) || (creep.room.storage === undefined || creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) < 500)) {
                if (_.size(creep.memory.link) == 0 || Game.time % 250 == 0) {
                    creep.memory.link = creep.pos.findClosestByRange(creep.room.links);
                }
                if (_.size(creep.memory.container) == 0 || Game.time % 250 == 0) {
                    creep.memory.container = creep.pos.findClosestByRange(creep.room.containers) && !structure.pos.inRangeTo(creep.room.controller, 5);
                }
                
                if (creep.room.links.length >= 2) {
                    let link = Game.getObjectById(creep.memory.link.id);

                    if (creep.withdraw(link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(link)
                    }
                }
                else if (creep.room.links.length < 2 && creep.room.containers.length > 0) {
                    let container = Game.getObjectById(creep.memory.container.id);
                    
                    if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(container)
                    }
                }
                else {Game.notify("ERR: This room's Builder cant Withdraw (" + creep.room.name + ")!")}
            }
        }
    }
};