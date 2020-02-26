module.exports = {
    run: function(creep) {
        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }
        
        if (creep.memory.working === true) {
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER) && structure.pos.inRangeTo(creep.room.controller, 10);
                }
            });
            let target2 = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType === STRUCTURE_SPAWN
                    || s.structureType === STRUCTURE_EXTENSION)
                    && s.energy < s.energyCapacity
            });

            if (target2 !== undefined) {
                if (creep.transfer(target2, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target2)
                }
                else if (target !== undefined) {
                    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(target)
                    }
                }
            }
        }

        else if (creep.memory.working === false) {
            let target = Game.getObjectById(creep.memory.sourceId);
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