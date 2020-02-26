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
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER);
                }
            });
            if (target !== null) {
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target)
                }
            }
            else if (target === null) {
                let target2 = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType === STRUCTURE_SPAWN
                        || s.structureType === STRUCTURE_EXTENSION
                        || s.structureType === STRUCTURE_TOWER && s.energy < 500)
                        && s.energy < s.energyCapacity
                });
        
                if (creep.transfer(target2, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target2)
                }
                // let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                //     filter: (structure) => {
                //         return (structure.structureType === STRUCTURE_LINK );
                //     }
                // });
                // if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                //     creep.travelTo(target)
                // }
            }
        }

        // if creep is supposed to harvest energy from source
        else if (creep.memory.working === false) {
            // find closest source
            let target = Game.getObjectById(creep.memory.sourceId);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.travelTo(target)
            }
        }
    }
};