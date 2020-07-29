const getWorkingState = require('miniModule.getCreepState');

module.exports = {
  run: function(creep) {
    // Get FlagMemory
    const flagMemory = Memory.flags[creep.room.name];
    if (flagMemory) {
      if (flagMemory.links) {
        // Get HeadLink That's In Range To Creep Always //
        const link = Game.getObjectById(flagMemory.links.linkTo1);

        if (Game.time % 10 == 0) {
          // Get Creep State, What The Creep Should Be Doing //
          const workState = getWorkingState.run(creep.room.name, creep.store.getCapacity(), creep.store.getUsedCapacity(), creep.memory.working, creep.memory.role);
          if (workState !== undefined)
          creep.memory.working = workState;
        }

        if (link !== null) {

          // If Creep Needs To Withdraw //
          if (creep.memory.working == "withdraw") {
            // No Comments YET //
            if (link.store.getUsedCapacity(RESOURCE_ENERGY) < 100) {
              // No Comments YET //
              if (creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 25000)
              creep.withdraw(creep.room.storage, RESOURCE_ENERGY)
              // No Comments YET //
              else if (creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 10000)
              creep.withdraw(creep.room.terminal, RESOURCE_ENERGY)
            }
            // No Comments YET //
            else if (link.store.getUsedCapacity(RESOURCE_ENERGY) == 800)
            creep.withdraw(link, RESOURCE_ENERGY);
            // No Comments YET //
            else if (creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 505000)
            creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
            // No Comments YET //
            else if (creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 105000)
            creep.withdraw(creep.room.terminal, RESOURCE_ENERGY);
          }

          // If Creep Needs To Transfer //
          else if (creep.memory.working == "transfer") {
            // No Comments YET //
            if (link.store.getUsedCapacity(RESOURCE_ENERGY) < 100)
            creep.transfer(link, RESOURCE_ENERGY)
            // No Comments YET //
            else if (creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < 100000)
            creep.transfer(creep.room.terminal, RESOURCE_ENERGY)
            // No Comments YET //
            else if (creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) < 500000)
            creep.transfer(creep.room.storage, RESOURCE_ENERGY)
          }
        }

        // if (creepCarryCapacity - creep.store.getUsedCapacity() <= 300) {
        //   Memory.performanceTracker[creep.room.name + ".spawnEnergyTransfer"] += creepCarryUsedCapacity - creep.store.getUsedCapacity();
        // }
      }
    }
  }
};
