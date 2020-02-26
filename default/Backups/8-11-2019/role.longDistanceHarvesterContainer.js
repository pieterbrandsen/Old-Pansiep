const traveler = require('traveler');


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
                // find closest spawn, extension or tower which is not full
                let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER);
                    }
                });
                let target2 = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART
                });
                if (target2 !== null && creep.repair(target2) !== ERR_NOT_IN_RANGE) {
                    // try to repair it, if it is out of range
                    if (creep.repair(target2) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        // move to exit
                        creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                                fill: 'transparent',
                                stroke: '#008000',
                                lineStyle: 'dashed',
                                strokeWidth: 0.25,
                                opacity: 0.3}})
                    }
                }
                else if (target !== undefined) {
                    // try to transfer energy, if it is not in range
                    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                                fill: 'transparent',
                                stroke: '#008000',
                                lineStyle: 'dashed',
                                strokeWidth: 0.25,
                                opacity: 0.3}})

                    }
                }
            }
            else {
                // find exit to home room
                let target = creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.target));
                // and move to exit
                creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                        fill: 'transparent',
                        stroke: '#00FF00',
                        lineStyle: 'dashed',
                        strokeWidth: 0.25,
                        opacity: 0.3}})
            }
        }
        else if (creep.memory.working === false) {
            if (creep.room.name === creep.memory.target) {
                let target = Game.getObjectById(creep.memory.sourceId);
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
                        stroke: '#FF0000',
                        lineStyle: 'dashed',
                        strokeWidth: 0.25,
                        opacity: 0.3}})
            }
       }
    }
};