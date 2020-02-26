module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        let tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES);
        if (creep.memory.working === true && creep.carry.energy === 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full

        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }
        else if (tombstone !== undefined && creep.carry.energy > 1) {
            creep.memory.working = true;
        }



        if (creep.memory.working === false) {
            // find closest constructionSite
            let tombstones = creep.pos.findClosestByPath(FIND_TOMBSTONES || FIND_DROPPED_ENERGY);
            // if one is found
        if (tombstones !== undefined) {
                // try to build, if the constructionSite is not in range
            if (creep.withdraw(tombstones, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    // move towards the constructionSite
                    creep.moveTo(tombstones);
                }
            }
        }
        // if creep is supposed to harvest energy from source
        else if (creep.memory.working === true) {
            let containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] <1999);
                }
            });
            let source = creep.pos.findClosestByPath(containers);
            if (source) {
                if(creep.transfer(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};