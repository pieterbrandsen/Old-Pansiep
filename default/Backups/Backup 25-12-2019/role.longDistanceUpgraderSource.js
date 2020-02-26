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

        // if creep is supposed to complete a constructionSite
        if (creep.memory.working === true) {
            if (creep.room.name === creep.memory.target) {
                if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    // if not in range, move towards the controller
                    creep.travelTo(creep.room.controller, {reusePath: 50,  visualizePathStyle: {
                            fill: 'transparent',
                            stroke: '#00ff00',
                            lineStyle: 'dashed',
                            strokeWidth: 0.25,
                            opacity: 0.3}})
                }
            }
            else {
                // find exit to target room
                let target = creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.target));
                // move to exit
                creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                        fill: 'transparent',
                        stroke: '#008000',
                        lineStyle: 'dashed',
                        strokeWidth: 0.25,
                        opacity: 0.3}})
            }
        }
        // if creep is supposed to harvest energy from source
        else if (creep.memory.working === false) {
            if (creep.room.name === creep.memory.target) {
                let target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                // try to harvest energy, if the source is not in range
                if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                            fill: 'transparent',
                            stroke: '#880000',
                            lineStyle: 'dashed',
                            strokeWidth: 0.25,
                            opacity: 0.3}})
                }
            }
            else {
                // find exit to home room
                let target = creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.target));
                // and move to exit
                creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                        fill: 'transparent',
                        stroke: '#880000',
                        lineStyle: 'dashed',
                        strokeWidth: 0.25,
                        opacity: 0.3}})
            }
        }
    }
};