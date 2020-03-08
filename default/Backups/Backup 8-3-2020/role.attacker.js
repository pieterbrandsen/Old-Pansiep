module.exports = {
    run: function(creep) {
        let flag = Game.rooms[creep.room.name];
        //let target = Game.getObjectById("5e0d5237c71f514ecd645bbc");
        if(_.size(flag.enemy) > 0) {
            let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else {
          if (creep.pos.inRangeTo(creep.room.controller,2) == true)
            creep.travelTo(creep.room.controller)
        }
    }
};
