module.exports = {
    run: function(creep) {
        let flag = Game.rooms[creep.room.name];
        let target = Game.getObjectById("5c90cb10a029337f970e4d6b");


        if (creep.room.name == creep.memory.targetRoom) {
          if (creep.attack(target) == ERR_NOT_IN_RANGE) {
            creep.travelTo(target);
          }
        }
        else {
          let targetRoom = creep.memory.targetRoom;
          if (Game.flags[targetRoom] !== undefined) {
              creep.travelTo(Game.flags[targetRoom])
          }
          if (Game.flags[targetRoom] === undefined) {
              Game.notify("There is no flag in " + creep.memory.targetRoom + "!")
          }
        }
        // if(_.size(flag.enemy) > 0) {
        //     let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        //
        //     if(creep.attack(target) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(target);
        //     }
        // }
        // else {
        //   if (creep.pos.inRangeTo(creep.room.controller,2) == true)
        //     creep.travelTo(creep.room.controller)
        // }
    }
};
