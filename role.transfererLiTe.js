// Check The Following Resources //
const resourceList = [
  RESOURCE_ENERGY, RESOURCE_HYDROGEN,
  RESOURCE_OXYGEN, RESOURCE_KEANIUM,
  RESOURCE_LEMERGIUM, RESOURCE_ZYNTHIUM,
  RESOURCE_CATALYST, RESOURCE_HYDROXIDE,
  RESOURCE_ZYNTHIUM_KEANITE, RESOURCE_UTRIUM_LEMERGITE,
  RESOURCE_GHODIUM, RESOURCE_UTRIUM_HYDRIDE,
  RESOURCE_UTRIUM_OXIDE, RESOURCE_KEANIUM_HYDRIDE,
  RESOURCE_KEANIUM_OXIDE, RESOURCE_LEMERGIUM_HYDRIDE,
  RESOURCE_LEMERGIUM_OXIDE, RESOURCE_ZYNTHIUM_HYDRIDE,
  RESOURCE_ZYNTHIUM_OXIDE, RESOURCE_GHODIUM_HYDRIDE,
  RESOURCE_GHODIUM_OXIDE, RESOURCE_UTRIUM_ACID,
  RESOURCE_UTRIUM_ALKALIDE, RESOURCE_KEANIUM_ACID,
  RESOURCE_KEANIUM_ALKALIDE, RESOURCE_LEMERGIUM_ACID,
  RESOURCE_LEMERGIUM_ALKALIDE, RESOURCE_ZYNTHIUM_ACID,
  RESOURCE_ZYNTHIUM_ALKALIDE, RESOURCE_GHODIUM_ACID,
  RESOURCE_GHODIUM_ALKALIDE, RESOURCE_CATALYZED_UTRIUM_ACID,
  RESOURCE_CATALYZED_UTRIUM_ALKALIDE, RESOURCE_CATALYZED_KEANIUM_ACID,
  RESOURCE_CATALYZED_KEANIUM_ALKALIDE, RESOURCE_CATALYZED_LEMERGIUM_ACID,
  RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ACID,
  RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_GHODIUM_ACID,
  RESOURCE_CATALYZED_GHODIUM_ALKALIDE, RESOURCE_UTRIUM,
];

const storageEnergyMin = 10*1000;
const storageEnergyMax = 200*1000;
const terminalEnergyMin = 100*1000;
const terminalEnergyMax = 105*1000;


const storageResourceMin = 10*1000;
const storageResourceMax = 15*1000;
const terminalResourceMin = 4000;
const terminalResourceMax = 5000;

const getWorkingState = require('miniModule.getCreepState');

module.exports = {
  run: function(creep) {
    // Get FlagMemory
    const flagMemory = Memory.flags[creep.room.name];
    if (flagMemory) {
      if (flagMemory.links) {
        // Get HeadLink That's In Range To Creep Always //
        const link = Game.getObjectById(flagMemory.links.linkTo1);

        // Get Creep State, What The Creep Should Be Doing //
        const workState = getWorkingState.run(creep.room.name, creep.store.getCapacity(), creep.store.getUsedCapacity(), creep.memory.working, creep.memory.role);
        if (workState !== undefined)
        creep.memory.working = workState;

        if (link !== null) {

          // If Creep Needs To Withdraw //
          if (creep.memory.working == "withdraw") {
            if (link.store.getUsedCapacity(RESOURCE_ENERGY) < 100) {
              if (creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 25000)
              creep.withdraw(creep.room.storage, RESOURCE_ENERGY)
              else if (creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 10000)
              creep.withdraw(creep.room.terminal, RESOURCE_ENERGY)
            }
            else if (link.store.getUsedCapacity(RESOURCE_ENERGY) > 600)
            creep.withdraw(link, RESOURCE_ENERGY);
            else if (Game.time % 10 == 0) {
              resourceList.forEach((resource, i) => {
                if (resource == RESOURCE_ENERGY) {
                  if (creep.room.terminal.store.getUsedCapacity(resource) > terminalEnergyMax && creep.room.storage.store.getUsedCapacity(resource) < storageEnergyMin)
                  creep.withdraw(creep.room.terminal, resource);
                  else if (creep.room.storage.store.getUsedCapacity(resource) > storageEnergyMax && creep.room.terminal.store.getUsedCapacity(resource) < terminalEnergyMin)
                  creep.withdraw(creep.room.storage, resource);
                }
                else {
                  if (creep.room.terminal.store.getUsedCapacity(resource) > terminalResourceMax && creep.room.storage.store.getUsedCapacity(resource) < storageResourceMin)
                  creep.withdraw(creep.room.terminal, resource);
                  else if (creep.room.storage.store.getUsedCapacity(resource) > storageResourceMax && (creep.room.terminal.store.getUsedCapacity(resource) < terminalResourceMin || (creep.room.terminal.store.getUsedCapacity(resource) < 10*1000 && resource == flagMemory.mineralType)))
                  creep.withdraw(creep.room.storage, resource);
                }
              });
            }
          }

          // If Creep Needs To Transfer //
          else if (creep.memory.working == "transfer") {
            if (link.store.getUsedCapacity(RESOURCE_ENERGY) < 100 && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0)
            creep.transfer(link, RESOURCE_ENERGY)
            else {
              const resource = Object.keys(creep.store)[0];
              if (resource) {
                if (resource == "energy") {
                  if (creep.room.terminal.store.getUsedCapacity(resource) < terminalEnergyMin)
                  creep.transfer(creep.room.terminal, resource);
                  else if (creep.room.storage.store.getUsedCapacity(resource) < storageEnergyMin)
                  creep.transfer(creep.room.storage, resource);
                  else
                  creep.transfer(creep.room.storage, resource);
                }
                else {
                  if (creep.room.terminal.store.getUsedCapacity(resource) < terminalResourceMin  || (creep.room.terminal.store.getUsedCapacity(resource) < 10*1000 && resource == flagMemory.mineralType))
                  creep.transfer(creep.room.terminal, resource);
                  else if (creep.room.storage.store.getUsedCapacity(resource) < storageResourceMin)
                  creep.transfer(creep.room.storage, resource);
                  else
                  creep.transfer(creep.room.storage, resource);
                }
              }
            }
          }
        }
      }
    }
  }
};
