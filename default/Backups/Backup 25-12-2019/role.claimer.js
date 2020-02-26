module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if in target room
        if (creep.room.name !== creep.memory.target) {
            // find exit to target room
            let target = creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.target));
            // move to exit
            creep.travelTo(target/*,allowHostile === true*/)
            console.log(creep.room.name)

        }
        else {
            // try to claim controller
            let target = creep.room.controller
            if (creep.claimController(target) === ERR_NOT_IN_RANGE) {
                // move towards the controller
                creep.travelTo(target)
            }
        }
    }
};