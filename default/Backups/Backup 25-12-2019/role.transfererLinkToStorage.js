module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        if (creep.ticksToLive < 50 && creep.carry.energy === 0) {
            creep.suicide()
        } else if (creep.ticksToLive < 50 && creep.carry.energy !== 0) {
            if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.terminal)
            }
        } else if (creep.memory.working === true && _.sum(creep.carry) === 0 && creep.ticksToLive > 50) {
            creep.memory.working = false;
        } else if (creep.memory.working === false && _.sum(creep.carry) === creep.carryCapacity && creep.ticksToLive > 50) {
            creep.memory.working = true;
        }
        let room = creep.room.name;
        if (creep.memory.working === true) {

            if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.storage)
            }
        } else if (creep.memory.working === false) {
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_LINK);
                }
            });
            if (creep.room.storage.store[RESOURCE_ENERGY] < 500000) { //100000) {
                if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target)
                }
            }
        }
    }
};