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
            let target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            // if one is found
            if (target !== undefined) {
                // try to build, if the constructionSite is not in range
                if (creep.build(target) === ERR_NOT_IN_RANGE) {
                    // move towards the constructionSite
                    creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                            fill: 'transparent',
                            stroke: '#00FF00',
                            lineStyle: 'dashed',
                            strokeWidth: 0.25,
                            opacity: 0.3}})
                }
            }
        }


        // find closest source
        // if creep is supposed to harvest energy from source
        else if (creep.memory.working === false) {
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_LINK);
                }
            });
            if (target !== undefined) {
                if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.travelTo(target)
                }
                else {
                    let target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                    // try to harvest energy, if the source is not in range
                    if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                        // move towards the source
                        creep.travelTo(target)
                    }
                }
            }
        }
    }
};