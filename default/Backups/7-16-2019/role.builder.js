module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working === true && creep.carry.energy === 0) {
            // switch state
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }
        // if creep is harvesting energy but is full


        // if creep is supposed to complete a constructionSite
        if (creep.memory.working === true) {
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


        // find closest source
        // if creep is supposed to harvest energy from source
        else if (creep.memory.working === false) {
            let container = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER)&& (structure.store[RESOURCE_ENERGY]>250);
                }
            });
            if (container.length !== undefined) {
                let container1 = creep.pos.findClosestByPath(container);
                if (creep.withdraw(container1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(container1)
                }
                else {
                    let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                    // try to harvest energy, if the source is not in range
                    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                        // move towards the source
                        creep.moveTo(source);
                    }
                }
            }
        }
    }
};