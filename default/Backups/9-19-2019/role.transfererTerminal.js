module.exports = {
    run: function(creep) {
        if (creep.ticksToLive < 50 && creep.carry.energy === 0) {
            creep.suicide()
        }
        else if (creep.ticksToLive < 50 && creep.carry.energy > 0) {
            if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.terminal)}
        }
        else if (creep.memory.working === true && _.sum(creep.carry) === 0 && creep.ticksToLive > 50) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && _.sum(creep.carry) === creep.carryCapacity && creep.ticksToLive > 50) {
            creep.memory.working = true;
        }
        // if creep is supposed to transfer energy to the controller
        if (creep.memory.working === true) {
            let target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => (s.structureType === STRUCTURE_SPAWN
                    || s.structureType === STRUCTURE_EXTENSION
                    || s.structureType === STRUCTURE_LAB && s.energy < 1000
                    || s.structureType === STRUCTURE_TOWER && s.energy < 500)
                    && s.energy < s.energyCapacity
            });
            // try to transfer energy, if it is not in range
            if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                // move towards it
                creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                        fill: 'transparent',
                        stroke: '#00ff00',
                        lineStyle: 'dashed',
                        strokeWidth: 0.25,
                        opacity: 0.3}})
            }
        }
        else if (creep.memory.working === false) {
            if (creep.room.terminal !== undefined) {
                // try to transfer energy, if it is not in range
                if (creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.travelTo(creep.room.terminal, {reusePath: 50,  visualizePathStyle: {
                            fill: 'transparent',
                            stroke: '#FF0000',
                            lineStyle: 'dashed',
                            strokeWidth: 0.25,
                            opacity: 0.3}})
                }
            }
        }
    }
};