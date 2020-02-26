module.exports = {
    run: function(creep) {
    if (creep.memory.working === true && creep.carry.energy === 0) {
        // switch state
        creep.memory.working = false;
    }
    // if creep is harvesting energy but is full
    else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
        // switch state
        creep.memory.working = true;
    }

    if (creep.memory.working === false) {
    let dismantle = Game.getObjectById('5d397e2c7b54a34625aa588e');

        if (creep.dismantle(dismantle) === ERR_NOT_IN_RANGE) {
            // move towards the source
            creep.travelTo(dismantle)
            }
        }
    else if (creep.memory.working === true) {
        creep.drop(RESOURCE_ENERGY)
        }
    }
};