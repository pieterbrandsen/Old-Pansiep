module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is bringing energy to the controller but has no energy left
        if (creep.memory.working === true && creep.carry.energy === 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working === true) {
            // find closest spawn, extension or tower which is not full
            let target2 = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => (s.structureType === STRUCTURE_SPAWN
                    || s.structureType === STRUCTURE_EXTENSION
                    || s.structureType === STRUCTURE_TOWER && s.energy < 500)
                    && s.energy < s.energyCapacity
            });

            // if we found one
            if (target2 !== undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(target2, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.travelTo(target2)
                }
            }
        }
        else if (creep.memory.working === false) {
            let target = creep.room.storage;
            if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.travelTo(target);
            }
        }
    }
};