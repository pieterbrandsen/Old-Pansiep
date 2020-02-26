module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        let tombstone = creep.pos.findClosestByRange(FIND_TOMBSTONES);
        if (creep.memory.working === true && creep.carry.energy === 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full

        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }
        else if (tombstone !== undefined && creep.carry.energy > 1) {
            creep.memory.working = true;
        }



        if (creep.memory.working === false) {
            // find closest constructionSite
            let target = creep.pos.findClosestByRange(FIND_TOMBSTONES && _.sum(tombstone.store) > 200);
            // if one is found
                // try to build, if the constructionSite is not in range
            if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    // move towards the constructionSite
                creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                        fill: 'transparent',
                        stroke: '#FF0000',
                        lineStyle: 'dashed',
                        strokeWidth: 0.25,
                        opacity: 0.3}})
            }
            else creep.travelTo(Game.spawns, {reusePath: 50,  visualizePathStyle: {
                    fill: 'transparent',
                    stroke: '#ff0000',
                    lineStyle: 'dashed',
                    strokeWidth: 0.25,
                    opacity: 0.3}})
        }
        // if creep is supposed to harvest energy from source
        else if (creep.memory.working === true) {
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_LINK) && (structure.energy <1999);
                }
            });
            if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                        fill: 'transparent',
                        stroke: '#00ff00',
                        lineStyle: 'dashed',
                        strokeWidth: 0.25,
                        opacity: 0.3}});
            }
        }
    }
};