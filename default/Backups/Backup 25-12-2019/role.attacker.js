module.exports = {
    run: function(creep) {
        if (creep.room.name !== creep.memory.target) {
            // find exit to target room
            let target = creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.target));
            // move to exit
            creep.travelTo(target, {reusePath: 50,  visualizePathStyle: {
                    fill: 'transparent',
                    stroke: '#008000',
                    lineStyle: 'dashed',
                    strokeWidth: 0.25,
                    opacity: 0.3}})
        }

        else if (creep.room.name === creep.memory.target) {
            let target = Game.getObjectById("5dac8495ccd64b1d3df86f58");
            //let target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            if (creep.attack(target) === ERR_NOT_IN_RANGE) {
                creep.travelTo(target);
            }
        }
    }
};