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
            if (creep.room.name === creep.memory.home) {
                // find closest spawn, extension or tower which is not full
                let structure = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER);
                    }
                });
                let structure2 = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    // the second argument for findClosestByPath is an object which takes
                    // a property called filter which can be a function
                    // we use the arrow operator to define it
                    filter: (s) => (s.structureType === STRUCTURE_SPAWN
                        || s.structureType === STRUCTURE_EXTENSION
                        || s.structureType === STRUCTURE_TOWER)
                        && s.energy < s.energyCapacity
                });

                // if we found one
                if (structure !== undefined) {
                    // try to transfer energy, if it is not in range
                    if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.moveTo(structure);
                    } else if (structure2 !== undefined) {
                        if (creep.transfer(structure2, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            // move towards the source
                            creep.moveTo(structure2);
                        }
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
        // if creep is supposed to harvest energy from source
        else if (creep.memory.working === false) {
            if (creep.room.name === creep.memory.target) {
                let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                // try to harvest energy, if the source is not in range
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(source);
                }
            }
            else {
                // find exit to home room
                let exit = creep.room.findExitTo(creep.memory.target);
                // and move to exit
                creep.moveTo(creep.pos.findClosestByRange(exit));
            }
        }
    }
};