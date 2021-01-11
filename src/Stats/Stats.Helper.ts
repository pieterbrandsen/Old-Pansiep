// #region Require('./)
import { ALL_CREEP_ROLES, Config, MemoryApiAll } from 'Utils/Importer/internals';
// #endregion

// #region Functions()
export class StatsHelper {
  public static global = (): void => {
    // Define stats memory link
    const statsMemory: Stats = Memory.stats;

    // Set all gcl related memory
    const gclMemory = statsMemory.gcl;
    if (typeof gclMemory === 'object') {
      gclMemory.level = Game.gcl.level;
      gclMemory.progress = Game.gcl.progress;
      gclMemory.progressTotal = Game.gcl.progressTotal;
    }

    // Set all cpu related memory
    const cpuMemory = statsMemory.cpu;
    if (typeof cpuMemory === 'object') {
      cpuMemory.bucket = Game.cpu.bucket;
      cpuMemory.limit = Game.cpu.limit;
      cpuMemory.used = MemoryApiAll.memoryAverager(cpuMemory.used, Game.cpu.getUsed());
    }

    // Set all commonMemory related memory
    const commonMemory = statsMemory.common;
    if (typeof commonMemory === 'object') {
      commonMemory.energyEachTickPerSource = 10;
    }
  };

  public static globalRoom = (room: Room): void => {
    // Define stats memory link
    const statsMemory = Memory.stats;

    if (typeof statsMemory.rooms === 'object') {
      // Get room stats from memory
      const roomStats = statsMemory.rooms[room.name];
      // Create a acces point to the roomMemory //
      const roomMemory: RoomMemory = room.memory;

      if (!roomMemory) {
        return;
      }

      // Set all commonMemory related memory
      const commonMemory = roomStats.commonMemory;
      if (typeof commonMemory === 'object') {
        commonMemory.constructionSitesCount = (roomMemory.constructionSites.data as string[]).length;

        _.forEach(ALL_CREEP_ROLES, (role: string) => {
          commonMemory.creepCountByRole[role] = MemoryApiAll.memoryAverager(
            commonMemory.creepCountByRole[role],
            (room.memory.myCreeps.data as { [key: string]: string })[role].length
          );
        });
      }

      // Set all performance related memory
      const performanceMemory = roomStats.performance;
      if (typeof performanceMemory === 'object') {
        _.forEach(ALL_CREEP_ROLES, (role: string) => {
          performanceMemory.expenses.spawnExpenses[role] = MemoryApiAll.memoryAverager(
            performanceMemory.expenses.spawnExpenses[role],
            Config.expenses.spawnExpenses[room.name][role]
          );
        });

        performanceMemory.expenses.building = MemoryApiAll.memoryAverager(
          performanceMemory.expenses.building,
          Config.expenses.building[room.name]
        );
        performanceMemory.expenses.repairing = MemoryApiAll.memoryAverager(
          performanceMemory.expenses.repairing,
          Config.expenses.repairing[room.name]
        );
        performanceMemory.expenses.upgrading = MemoryApiAll.memoryAverager(
          performanceMemory.expenses.upgrading,
          Config.expenses.upgrading[room.name]
        );
        performanceMemory.income.ownedHarvesting = MemoryApiAll.memoryAverager(
          performanceMemory.income.ownedHarvesting,
          Config.income.ownedHarvesting[room.name]
        );
        performanceMemory.income.remoteHarvesting = MemoryApiAll.memoryAverager(
          performanceMemory.income.remoteHarvesting,
          Config.income.remoteHarvesting[room.name]
        );
      }

      // Set all energy stored related memory
      const energyMemory = roomStats.energyStored;
      if (typeof energyMemory === 'object' && roomMemory.commonMemory) {
        energyMemory.capacity = roomMemory.commonMemory.energyStored.capacity;
        energyMemory.total = roomMemory.commonMemory.energyStored.usable;
      }

      // Set all cpu related memory
      const cpuMemory = roomStats.cpu;
      if (typeof cpuMemory === 'object') {
        _.forEach(ALL_CREEP_ROLES, (role: string) => {
          cpuMemory.headModules.creeps[role] = MemoryApiAll.memoryAverager(
            cpuMemory.headModules.creeps[role],
            Config.cpuUsedByRoomByRole[room.name][role]
          );
        });

        _.forEach(ALL_CREEP_ROLES, (role: string) => {
          cpuMemory.creepModules[role] = MemoryApiAll.memoryAverager(
            cpuMemory.creepModules[role],
            Config.creepModuleCpuCost[room.name][role]
          );
        });
      }
    }
  };

  public static ownedRoom(room: Room): void {
    StatsHelper.globalRoom(room);

    // Define stats memory link
    const statsMemory = Memory.stats;

    if (typeof statsMemory.rooms === 'object') {
      // Get room stats from memory
      const roomStats = statsMemory.rooms[room.name];
      // Create a acces point to the roomMemory //
      const roomMemory: RoomMemory = room.memory;

      // Set all spawner energy related memory
      const spawnerEnergy = roomStats.spawnerEnergy;
      if (typeof spawnerEnergy === 'object') {
        spawnerEnergy.available = room.energyAvailable;
        spawnerEnergy.capacityAvailable = room.energyCapacityAvailable;
      }

      // Set all controller related memory
      const controller = roomStats.controller;
      if (typeof controller === 'object' && room.controller) {
        controller.level = room.controller.level;
        controller.progress = room.controller.progress;
        controller.progressTotal = room.controller.progressTotal;
      }

      // Set all commonMemory related memory
      const { commonMemory } = roomStats;
      if (typeof commonMemory === 'object') {
        const ownedCommonMemory = roomStats.commonMemory.owned;
        if (typeof ownedCommonMemory === 'object' && roomMemory.commonMemory) {
          ownedCommonMemory.sourceCount = roomMemory.commonMemory.sources.length;
        }
      }

      // Set all energy stored related memory
      const energyMemory = roomStats.energyStored;
      if (typeof energyMemory === 'object') {
        energyMemory.storage = room.storage ? room.storage.store.getUsedCapacity(RESOURCE_ENERGY) : -1;
        energyMemory.terminal = room.terminal ? room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) : -1;
      }
    }
  }

  public static remoteRoom(room: Room): void {
    StatsHelper.globalRoom(room);

    // Define stats memory link
    const statsMemory = Memory.stats;

    if (typeof statsMemory.rooms === 'object') {
      // Get room stats from memory
      const roomStats = statsMemory.rooms[room.name];
      // Create a acces point to the roomMemory //
      const roomMemory: RoomMemory = room.memory;

      // Set all commonMemory related memory
      const { commonMemory } = roomStats;
      if (typeof commonMemory === 'object') {
        const remoteCommonMemory = roomStats.commonMemory.remote;
        if (typeof remoteCommonMemory === 'object' && roomMemory.commonMemory) {
          remoteCommonMemory.sourceCount = roomMemory.commonMemory.sources.length;
        }
      }
    }
  }
}
