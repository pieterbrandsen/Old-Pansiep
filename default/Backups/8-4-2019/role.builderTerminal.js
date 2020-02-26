module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working === true && creep.carry.energy === 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }
        /*else if (creep.ticksToLive < 50) {
            // switch state
            creep.memory.working = 1;
        }*/


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
            if (creep.room.terminal !== undefined) {
                // try to transfer energy, if it is not in range
                if (creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(creep.room.terminal);
                }
            }
        }
        else if (creep.memory.working === 1) {
            if (creep.room.terminal !== undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(creep.room.terminal);
                }
            }
        }
    }
};