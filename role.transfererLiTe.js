module.exports = {
  run: function(creep) {
    const flagMemory = Memory.flags[creep.room.name];
    if (flagMemory) {
      if (flagMemory.links) {
        const link = Game.getObjectById(flagMemory.links.linkTo1);
        const creepCarryCapacity = creep.store.getCapacity();
        const creepCarryUsedCapacity = creep.store.getUsedCapacity();
        if (creep.memory.working === true && creepCarryUsedCapacity === 0) {
          creep.memory.working = false;
        }
        else if (creep.memory.working === false && creepCarryUsedCapacity == creepCarryCapacity) {
          creep.memory.working = true;
        }




        if (link !== null) {
          if (creep.memory.working === false) {
            if (link.store.getUsedCapacity(RESOURCE_ENERGY) < 100) {
              if (creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 25000)
                creep.withdraw(creep.room.storage, RESOURCE_ENERGY)
              else if (creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 10000)
                creep.withdraw(creep.room.terminal, RESOURCE_ENERGY)
            }
            else if (link.store.getUsedCapacity(RESOURCE_ENERGY) == 800)
              creep.withdraw(link, RESOURCE_ENERGY);
            else if (creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 505000) {
              creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
            }
            else if (creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 105000)
              creep.withdraw(creep.room.terminal, RESOURCE_ENERGY);
          }
          else if (creep.memory.working === true) {
            if (link.store.getUsedCapacity(RESOURCE_ENERGY) < 100) {
              creep.transfer(link, RESOURCE_ENERGY)
            }
            else if (creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < 100000)
              creep.transfer(creep.room.terminal, RESOURCE_ENERGY)
            else if (creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) < 500000)
              creep.transfer(creep.room.storage, RESOURCE_ENERGY)
          }
        }

        if (creepCarryCapacity - creep.store.getUsedCapacity() <= 300) {
          Memory.performanceTracker[creep.room.name + ".spawnEnergyTransfer"] += creepCarryUsedCapacity - creep.store.getUsedCapacity();
        }
      }
    }
  }
};
