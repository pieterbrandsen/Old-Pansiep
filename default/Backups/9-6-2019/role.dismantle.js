module.exports = {
    run: function(creep) {
    if (creep.memory.working === true && creep.carry.energy === 0) {
        // switch state
        creep.memory.working = false;
    }
    // if creep is harvesting energy but is full
    else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
        // switch state
        creep.memory.working = true;
    }

    if (creep.memory.working === false) {
    let dismantle = Game.getObjectById('5c35ff88f4723a4674a27e78');
    let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_WALL});

        if (creep.dismantle(target) === ERR_NOT_IN_RANGE) {
            // move towards the source
            creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                    fill: 'transparent',
                    stroke: '#00ff00',
                    lineStyle: 'dashed',
                    strokeWidth: 0.25,
                    opacity: 0.3}})
            }
        }
    else if (creep.memory.working === true) {
        creep.drop(RESOURCE_ENERGY)
        }
    }
};