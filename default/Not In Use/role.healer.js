module.exports = {
    run: function(creep) {
        if (creep.room.name !== creep.memory.target) {
            let target = creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.target));
            creep.travelTo(target)
        }

        else if (creep.room.name === creep.memory.target) {
            const target = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax;
                }
            });
            if (target) {
                if(creep.heal(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
};