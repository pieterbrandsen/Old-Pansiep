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
            // find closest spawn, extension or tower which is not full
            /*let structure2 = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_TERMINAL);
                }
            });*/
            /*let structure2 = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_TERMINAL);
                }
            });*/
            let structure2 = Game.getObjectById(creep.memory.deliverTerminal);
            let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => (s.structureType === STRUCTURE_SPAWN
                    || s.structureType === STRUCTURE_EXTENSION
                    || s.structureType === STRUCTURE_TOWER && s.energy < 500)
                    && s.energy < s.energyCapacity
            });
            let spawn = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return (s.structureType === STRUCTURE_SPAWN) && s.energy === s.energyCapacity
                }
            });
            let spawn2 = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => {
                    return (s.structureType === STRUCTURE_EXTENSION) && s.energy === s.energyCapacity
                }
            });
            let link = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_LINK && structure.pos.inRangeTo(structure.room.controller, 5) && structure.energy > 600);
                }
            });
            let link2 = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_LINK) && structure.pos.inRangeTo(structure.room.controller, 5) && (structure.energy<300);
                }
            });
            // if we found one
            /*if (link2 !== undefined) {
            // try to transfer energy, if it is not in range
                if (creep.transfer(link2, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(link2);
                }
            }*/
            if (structure !== undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure);
                }
            }
            /*else if (structure2 !== undefined && link !== undefined && spawn !== undefined && spawn2 !== undefined) {
                if (creep.transfer(structure2, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(structure2);
                }
            }*/
        }
        else if (creep.memory.working === false) {
            let link = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_LINK) && structure.pos.inRangeTo(structure.room.controller, 5) && (structure.energy >1);
                }
            });
            let terminal = Game.getObjectById(creep.memory.deliverTerminal);
            let link2 = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_LINK) && structure.pos.inRangeTo(structure.room.controller, 5) && (structure.energy<300);
                }
            });
            let link1 = creep.pos.findClosestByPath(link);
            if (link1 !== undefined) {
                if (creep.withdraw(link1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(link1);
                }
            }
        }
    }
};