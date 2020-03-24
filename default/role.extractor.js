module.exports = {
    run: function(creep) {
      let start = Game.cpu.getUsed();
      let flag = Memory.flags[creep.room.name];


      // Set Working State
      let creepCarryCapacity = creep.store.getCapacity();
      let creepCarryUsedCapacity = creep.store.getUsedCapacity();
      if (creep.ticksToLive < 150 && creep.memory.working == false) {
        flag.mineral = creep.room.find(FIND_MINERALS);
        creep.suicide()
      }
      else if (creep.memory.working === true && creepCarryUsedCapacity === 0) {
        creep.memory.working = false;
      }
      else if (creep.memory.working === false && creepCarryUsedCapacity == creepCarryCapacity) {
        creep.memory.working = true;
      }


      if (creep.memory.working === true) {
        let mineralType = flag.mineral[0].mineralType;

        if (creep.transfer(creep.room.storage, mineralType) === ERR_NOT_IN_RANGE) {
          creep.travelTo(creep.room.storage)
        }
      }
      else if (creep.memory.working === false) {
        let target = Game.getObjectById(flag.mineral[0].id)
        const status = creep.harvest(target)
        switch (status) {
          case OK:
            break;
          case ERR_NOT_IN_RANGE:
            creep.travelTo(target);
            break;
          case ERR_NOT_ENOUGH_RESOURCES:
            flag.mineral = creep.room.find(FIND_MINERALS);
            creep.suicide()
            break;
          default:
            break;
        }


      }
      flag.extractorCpu += Game.cpu.getUsed() - start
    }
};
