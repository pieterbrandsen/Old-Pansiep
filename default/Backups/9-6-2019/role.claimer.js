module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if in target room
        if (creep.room.name !== creep.memory.target) {
            // find exit to target room
            let target = creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.target));
            // move to exit
            creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                    fill: 'transparent',
                    stroke: '#00FF00',
                    lineStyle: 'dashed',
                    strokeWidth: 0.25,
                    opacity: 0.3}})

        }
        else {
            // try to claim controller
            let target = creep.room.controller
            if (creep.claimController(target) === ERR_NOT_IN_RANGE) {
                // move towards the controller
                creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                        fill: 'transparent',
                        stroke: '#00FF00',
                        lineStyle: 'dashed',
                        strokeWidth: 0.25,
                        opacity: 0.3}})
            }
        }
    }
};