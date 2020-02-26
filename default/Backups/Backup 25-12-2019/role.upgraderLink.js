module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is bringing energy to the controller but has no energy left
        if (creep.memory.working === true && creep.carry.energy === 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working === true) {

            // try to upgrade the controller
            if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                // if not in range, move towards the controller
                creep.travelTo(creep.room.controller)
            }
        }
        else if (creep.memory.working === false) {
            // find closest source
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_LINK) && structure.pos.inRangeTo(structure.room.controller, 5);
                }
            });

            // try to harvest energy, if the source is not in range
            if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.travelTo(target)
            }
        }
    }
};