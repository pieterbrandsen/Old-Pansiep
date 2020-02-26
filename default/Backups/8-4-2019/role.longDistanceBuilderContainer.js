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
        if (creep.memory.working === true) {
            if (creep.room.name === creep.memory.target) {
                // find closest constructionSite
                let constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                // if one is found
                if (constructionSite !== undefined) {
                    // try to build, if the constructionSite is not in range
                    if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
                        // move towards the constructionSite
                        creep.moveTo(constructionSite);
                    }
                }
            }
            else {
                // find exit to target room
                let exit = creep.room.findExitTo(creep.memory.target);
                // move to exit
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
        // if creep is supposed to harvest energy from source
        else if (creep.memory.working === false) {
            if (creep.room.name === creep.memory.home) {
                let containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY]>250);
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
    }
};