import {} from 'Utils/Importer/internals';

export class CreepRoleDj {
  public static dj(creep: Creep):string | void {
    if (creep.room.storage == null || creep.room.terminal == null) return;
        const link: StructureLink | null = Game.getObjectById(creep.room.memory!.commonMemory!.links!.head);

        const storageUsable = creep.room.storage.store.energy;
        const terminalUsable = creep.room.terminal.store.energy;

        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
          creep.say("CapT")
          if (storageUsable < 500 * 1000) {
            creep.transfer(creep.room.storage, RESOURCE_ENERGY);
          }
          else if (terminalUsable < 100 * 1000) {
            creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
          }
          else if (link && link.store.energy < 450-creep.store.getCapacity()) {
            creep.transfer(link, RESOURCE_ENERGY);
          }

          return;
        }

        if (link && link.store.energy > 450) {
          creep.say("WLink");
          creep.withdraw(link, RESOURCE_ENERGY);
          if (storageUsable < 500 * 1000) {
            creep.transfer(creep.room.storage, RESOURCE_ENERGY);
          }
          else if (terminalUsable < 100 * 1000) {
            creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
          }
        }
        else if (link && link.store.energy < 50) {
          creep.say("TLink");
          if (storageUsable > 50 * 1000) {
          creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
          creep.transfer(link, RESOURCE_ENERGY);
          }
          else if (terminalUsable > 10 * 1000) {
            creep.withdraw(creep.room.terminal, RESOURCE_ENERGY);
            creep.transfer(link, RESOURCE_ENERGY);
          }
        }
        else if (terminalUsable < 25 * 1000 && storageUsable > 5000) {
          creep.say("WStorage");
          creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
          creep.transfer(creep.room.terminal, RESOURCE_ENERGY);
        }
        else if (terminalUsable > 100*1000 && storageUsable < 500*1000) {
          creep.say("WTerminal");
          creep.withdraw(creep.room.terminal, RESOURCE_ENERGY);
          creep.transfer(creep.room.storage, RESOURCE_ENERGY);
        }
  }
}