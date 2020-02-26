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
            if (creep.room.terminal !== undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(creep.room.terminal);
                }
            }
        }
        else if (creep.memory.working === false) {
            let link = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_LINK) && structure.pos.inRangeTo(structure.room.controller, 5) && (structure.energy >1);
                }
            });
            if (link[0] !== undefined) {
                if (creep.withdraw(link[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(link[0]);
                }
            }
        }
    }
};