module.exports = {
    run: function(creep) {
        if (creep.room.name !== creep.memory.target) {
            let target = creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.target));
            creep.travelTo(target)
            console.log(creep.room.name)

        }
        else {
            let target = creep.room.controller
            if (creep.claimController(target) === ERR_NOT_IN_RANGE) {
                creep.travelTo(target)
            }
        }
    }
};