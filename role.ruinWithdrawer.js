const transferModule = require('module.transfer');
const getWorkingState = require('miniModule.getCreepState');

module.exports = {
  run: function(creep) {
    // Get MineralType //
    let mineralType = creep.room.find(FIND_MINERALS)[0].mineralType;

    if (Game.time % 10 == 0) {
      // Get Creep State, What The Creep Should Be Doing //
      const workState = getWorkingState.run(creep.room.name, creep.store.getCapacity(), creep.store.getUsedCapacity(), creep.memory.working, creep.memory.role);
      if (workState !== undefined)
      creep.memory.working = workState;
    }

    if (creep.memory.working == "withdraw") {
      // Find Energy Ruins //
      let ruins = creep.pos.findClosestByRange(FIND_RUINS, {filter: (ruin) => {
        return (ruin.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
      }});

      // If Ruins Is Defined, Withdraw Energy From It //
      if (ruins) {
        if (creep.withdraw(ruins,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        creep.travelTo(ruins)
      }
      else {
        // Find MineralType Ruins //
        let ruins2 = creep.pos.findClosestByRange(FIND_RUINS, {filter: (ruin) => {
          return (ruin.store.getUsedCapacity(mineralType) > 0);
        }});

        // If Ruins2 Is Defined, Withdraw MineralType From It //
        if (ruins2)
        if (creep.withdraw(ruins2,mineralType) == ERR_NOT_IN_RANGE)
        creep.travelTo(ruins2)
      }
    }
    else if (creep.memory.working == "transfer") {
      // Transfer MineralType Or Energy To Storage //
      if (creep.transfer(creep.room.storage,mineralType) == ERR_NOT_IN_RANGE)
      creep.travelTo(creep.room.storage)
      if (creep.transfer(creep.room.storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
      creep.travelTo(creep.room.storage)
    }
  }
};
