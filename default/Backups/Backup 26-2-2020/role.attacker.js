module.exports = {
    run: function(creep) {
        //let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        let target = Game.getObjectById("5e0d5237c71f514ecd645bbc");
        if(target) {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else {
            creep.travelTo(creep.room.controller)
        }
    }
};