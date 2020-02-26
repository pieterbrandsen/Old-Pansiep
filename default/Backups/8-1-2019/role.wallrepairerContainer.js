module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is trying to repair something but has no energy left
        if (creep.memory.working === true && creep.carry.energy === 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to repair something
        if (creep.memory.working === true) {
            // find all walls in the room
            let walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_WALL
            });
            let ramparts = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_RAMPART
            });


            let target = undefined;
            let rampart = undefined;

            // loop with increasing percentages
            for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
                // find a wall with less than percentage hits
                for (let wall of walls) {
                    if (wall.hits / wall.hitsMax < percentage) {
                        target = wall;
                        break;
                    }
                }

                // if there is one
                if (target !== undefined) {
                    // break the loop
                    break;
                }
                for (let rampart of ramparts) {
                    if (rampart.hits / rampart.hitsMax < percentage) {
                        target = rampart;
                        break;
                    }
                }

                // if there is one
                if (target !== undefined) {
                    // break the loop
                    break;
                }
            }

            // if we find a wall that has to be repaired
            if (target !== undefined) {
                // try to repair it, if not in range
                if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(target);
                }
            }
        }
        else {
            let containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 250);
                }
            });
            let source = creep.pos.findClosestByPath(containers);
            if (source) {
                if(creep.withdraw(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};