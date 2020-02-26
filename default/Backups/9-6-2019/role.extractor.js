module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is bringing energy to the controller but has no energy left
        if (creep.ticksToLive < 150 && creep.memory.working === false) {
            creep.suicide()
        }
        else if (creep.memory.working === true && _.sum(creep.carry) === 0) {
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
            // try to harvest energy, if the source is not in range
            if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                        fill: 'transparent',
                        stroke: '#FF0000',
                        lineStyle: 'dashed',
                        strokeWidth: 0.25,
                        opacity: 0.3}})
            }
        }
    }
};