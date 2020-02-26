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
            if (creep.room.name === creep.memory.home) {
                // find closest spawn, extension or tower which is not full
                let target2 = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_LINK);
                    }
                });
                let target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    // the second argument for findClosestByPath is an object which takes
                    // a property called filter which can be a function
                    // we use the arrow operator to define it
                    filter: (s) => (s.structureType === STRUCTURE_SPAWN
                        || s.structureType === STRUCTURE_EXTENSION
                        || s.structureType === STRUCTURE_TOWER)
                        && s.energy < s.energyCapacity
                });

                // if we found one
                if (target !== undefined) {
                    // try to transfer energy, if it is not in range
                    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                                fill: 'transparent',
                                stroke: '#008000',
                                lineStyle: 'dashed',
                                strokeWidth: 0.25,
                                opacity: 0.3}})
                    } else if (target2 !== undefined) {
                        if (creep.transfer(target2, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            // move towards the source
                            creep.travelTo(target2, {reusePath: 50,  visualizePathStyle: {
                                    fill: 'transparent',
                                    stroke: '#008000',
                                    lineStyle: 'dashed',
                                    strokeWidth: 0.25,
                                    opacity: 0.3}})
                        }
                    }
                }
            }
            else {
                // find exit to home room
                let target = creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.home));
                // and move to exit
                creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                        fill: 'transparent',
                        stroke: '#008000',
                        lineStyle: 'dashed',
                        strokeWidth: 0.25,
                        opacity: 0.3}});
            }
        }
        // if creep is supposed to harvest energy from source
        else if (creep.memory.working === false) {
            if (creep.room.name === creep.memory.target) {
                let target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
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
                let target = creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.target));
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