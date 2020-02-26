module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if in target room
        if (creep.room.name !== creep.memory.target) {
            // find exit to target room
            let target = creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.target));
            // move to exit
            creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                    fill: 'transparent',
                    stroke: '#008000',
                    lineStyle: 'dashed',
                    strokeWidth: 0.25,
                    opacity: 0.3}})
        }
        else {
            // try to claim controller
            if (creep.room.name === creep.memory.target) {
                if (creep.reserveController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    // move towards the controller
                    creep.travelTo(creep.room.controller, {reusePath: 50,  visualizePathStyle: {
                            fill: 'transparent',
                            stroke: '#008000',
                            lineStyle: 'dashed',
                            strokeWidth: 0.25,
                            opacity: 0.3}})
                }
            }
        }
    }
};