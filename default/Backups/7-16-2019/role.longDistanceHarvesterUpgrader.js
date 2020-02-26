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

        // if creep is supposed to complete a constructionSite
        if (creep.memory.working === false) {
            if (creep.room.name === creep.memory.home) {
                let containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER) && !structure.pos.inRangeTo(structure.room.controller, 8) && (structure.store[RESOURCE_ENERGY]>250);
                    }
                });
                let source = creep.pos.findClosestByPath(containers);
                if (source) {
                    if (creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
            }
            else {
                // find exit to home room
                let home = creep.room.findExitTo(creep.memory.home);
                // and move to exit
                creep.moveTo(creep.pos.findClosestByRange(home));
            }
        }
        else if (creep.memory.working === true) {
            if (creep.room.name === creep.memory.target) {
                if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    // if not in range, move towards the controller
                    creep.moveTo(creep.room.controller);
                }
            }
            else {
                // find exit to home room
                let target = creep.room.findExitTo(creep.memory.target);
                // and move to exit
                creep.moveTo(creep.pos.findClosestByRange(target));
            }
        }
    }
};