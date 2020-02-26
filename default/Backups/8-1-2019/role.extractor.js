module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is bringing energy to the controller but has no energy left
        if (creep.memory.working === true && _.sum(creep.carry) === 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working === false && _.sum(creep.carry) === creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }
        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working === true) {
            let structure = Game.getObjectById(creep.memory.deliverContainer);
            if (structure !== undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
                if (creep.transfer(structure, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
        }
        else if (creep.memory.working === false) {
            let source = Game.getObjectById(creep.memory.sourceId);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }
};