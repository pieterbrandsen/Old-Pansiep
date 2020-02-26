module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }
        
        if (creep.memory.working === true) {
            let target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType === STRUCTURE_SPAWN
                    || s.structureType === STRUCTURE_EXTENSION)
                    && s.energy < s.energyCapacity
            });

            if (target !== undefined) {
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target)
                }
            }
        }

        else if (creep.memory.working === false) {
            let target = Game.getObjectById(creep.memory.sourceId);
            if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                creep.travelTo(target)
            }
        }
    }
};