const transferModule = require('module.transfer');

module.exports = {
  run: function(creep) {
    //let mineral = creep.room.find(FIND_MINERALS)[0].mineralType;
    let mineral = RESOURCE_HYDROGEN;

    const creepCarryCapacity = creep.store.getCapacity();
    const creepCarryUsedCapacity = creep.store.getUsedCapacity();
    if (creep.memory.working === true && creepCarryUsedCapacity === 0) {
      creep.memory.working = false;
    }
    else if (creep.memory.working === false && creepCarryUsedCapacity == creepCarryCapacity) {
      creep.memory.working = true;
    }

    if (creep.memory.working === false) {
      let ruins = creep.pos.findClosestByRange(FIND_RUINS, {filter: (ruin) => {
        return (ruin.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
      }});

      if (ruins) {
        if (creep.withdraw(ruins,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.travelTo(ruins)
        }
      }
      else {
        let ruins2 = creep.pos.findClosestByRange(FIND_RUINS, {filter: (ruin) => {
          return (ruin.store.getUsedCapacity(mineral) > 0);
        }});

        if (ruins2) {
          if (creep.withdraw(ruins2,mineral) == ERR_NOT_IN_RANGE) {
            creep.travelTo(ruins2)
          }
        }
      }
    }
    else if (creep.memory.working === true) {
      if (creep.transfer(creep.room.storage,mineral) == ERR_NOT_IN_RANGE) {
        creep.travelTo(creep.room.storage)
      }
      if (creep.transfer(creep.room.storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.travelTo(creep.room.storage)
      }
    }
  }
};
