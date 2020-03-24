module.exports = {
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
        if (creep.memory.working === true) {
            if (creep.transfer(creep.room.storage, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.storage)}

            if (creep.transfer(creep.room.storage, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.storage)}

            if (creep.transfer(creep.room.storage, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.storage)}

            if (creep.transfer(creep.room.storage, RESOURCE_KEANIUM) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.storage)}

            if (creep.transfer(creep.room.storage, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.storage)}

            if (creep.transfer(creep.room.storage, RESOURCE_ZYNTHIUM) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.storage)}

            if (creep.transfer(creep.room.storage, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.storage)}
        }
        else if (creep.memory.working === false) {
            let target = creep.pos.findClosestByRange(FIND_MINERALS)
            let target2 = target.mineralAmount;
            if (target2 > 0) {
                if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target)
                }
            }
            else {
                creep.suicide();
            }
        }
    }
};