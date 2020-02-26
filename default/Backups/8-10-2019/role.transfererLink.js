module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is bringing energy to the controller but has no energy left
        if (creep.memory.working === true && creep.carry.energy === 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            // switch state
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
            let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_LINK) && structure.pos.inRangeTo(structure.room.controller, 5) && (structure.energy >1);
                }
            });
            if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
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