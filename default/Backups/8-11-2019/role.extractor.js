module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is bringing energy to the controller but has no energy left
        if (creep.ticksToLive < 250) {
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
            let target = creep.room.terminal
            if (target !== undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(target, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                            fill: 'transparent',
                            stroke: '#00ff00',
                            lineStyle: 'dashed',
                            strokeWidth: 0.25,
                            opacity: 0.3}})
                }
                if (creep.transfer(target, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                            fill: 'transparent',
                            stroke: '#00ff00',
                            lineStyle: 'dashed',
                            strokeWidth: 0.25,
                            opacity: 0.3}})
                }
                if (creep.transfer(target, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                            fill: 'transparent',
                            stroke: '#00ff00',
                            lineStyle: 'dashed',
                            strokeWidth: 0.25,
                            opacity: 0.3}})
                }
            }
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