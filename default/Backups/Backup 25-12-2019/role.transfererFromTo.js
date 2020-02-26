module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        if (creep.ticksToLive < 150 && creep.memory.working === false) {
            creep.suicide()
        }
        else if (creep.memory.working === true && _.sum(creep.carry) === 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && _.sum(creep.carry) === creep.carryCapacity) {
            creep.memory.working = true;
        }

        let x;

        if (creep.memory.working === true) {
            creep.drop(RESOURCE_UTRIUM);
        }

        else if (creep.memory.working === false) {
            if (creep.withdraw(creep.room.terminal, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.terminal)
            }
        }
    }
};