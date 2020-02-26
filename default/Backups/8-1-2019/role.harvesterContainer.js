module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is bringing energy to the spawn or an extension but has no energy left
        if (creep.memory.working === true && creep.carry.energy === 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }
        // if creep is supposed to transfer energy to a structure
        else if (creep.memory.working === true) {
            let containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER);
                }
            });
            let source = creep.pos.findClosestByPath(containers);
            if (source) {
                if(creep.transfer(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }

        // if creep is supposed to harvest energy from source
        else if (creep.memory.working === false) {
            // find closest source
            let source = Game.getObjectById(creep.memory.sourceId);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
    }
};