module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        if (creep.ticksToLive < 50 && creep.memory.working === false) {
            creep.suicide()
        }
        else if (creep.memory.working === true && _.sum(creep.carry) === 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && _.sum(creep.carry) === creep.carryCapacity) {
            creep.memory.working = true;
        }

        let x;
        if (creep.memory.working === false) {
            for (x of RESOURCES_ALL) {
                if (creep.withdraw(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.storage)
                }
                if (creep.withdraw(creep.room.storage, x) === 0) {break}
            }
        }

        else if (creep.memory.working === true) {
            for (x of RESOURCES_ALL) {
                if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
                if (creep.transfer(creep.room.terminal, x) === 0) {break}
            }
        }
    }
};