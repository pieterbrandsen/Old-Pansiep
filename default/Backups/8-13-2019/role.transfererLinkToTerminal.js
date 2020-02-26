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
            if (creep.room.terminal !== undefined && creep.room.terminal.store[RESOURCE_ENERGY] < 100000) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.travelTo(creep.room.terminal)
                }
            }
            /*else if (creep.room.storage !== undefined) {
                if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE && creep.transfer(creep.transfer(creep.room.storage) !== ERR_FULL)) {
                    // move towards it
                    creep.travelTo(creep.room.storage)
                }
            }*/
        }
        else if (creep.memory.working === false) {

            /*if (creep.room.storage.store[RESOURCE_ENERGY] !== 0) {
                if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.storage)
                }
            }*/
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_LINK) && structure.pos.inRangeTo(structure.room.controller, 7);
                }
            });
            if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.travelTo(target)
            }
        }
    }
};