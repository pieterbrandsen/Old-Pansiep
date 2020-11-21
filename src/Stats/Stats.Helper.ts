//#region Require('./)
import { Config, MemoryApi_All } from "../Utils/importer/internals";
//#endregion

//#region Functions()
export class StatsHelper {
  public static global = (): void => {
    // Define stats memory link
    const statsMemory = Memory.stats;

    // Set all gcl related memory
    const gclMemory = statsMemory["gcl"];
    if (typeof gclMemory === "object") {
      gclMemory.level = Game.gcl.level;
      gclMemory.progress = Game.gcl.progress;
      gclMemory.progressTotal = Game.gcl.progressTotal;
    }

    // Set all cpu related memory
    const cpuMemory = statsMemory["cpu"];
    if (typeof cpuMemory === "object") {
      cpuMemory.bucket = Game.cpu.bucket;
      cpuMemory.limit = Game.cpu.limit;
      cpuMemory.used = MemoryApi_All.memoryAverager(cpuMemory.used, Game.cpu.getUsed());
    }

    // Set all commonMemory related memory
    const commonMemory = statsMemory["common"];
    if (typeof commonMemory === "object") {
      commonMemory.energyEachTickPerSource = 10;
    }
  };

  public static globalRoom = (room: Room): void => {
    // Define stats memory link
    const statsMemory = Memory.stats;

    if (typeof statsMemory.rooms === "object") {
      // Get room stats from memory
      const roomStats = statsMemory.rooms[room.name];
      // Create a acces point to the roomMemory //
      const roomMemory: RoomMemory = room.memory;

      // Set all commonMemory related memory
      const commonMemory = roomStats["commonMemory"];
      if (typeof commonMemory === "object") {
        commonMemory.constructionSitesCount = roomMemory.commonMemory.constructionSites.length;
        if (!commonMemory.creepCountByRole) { commonMemory.creepCountByRole = {}; }
        // eslint-disable-next-line guard-for-in
        for (const role in Config.roleCountByRoomByRole[room.name]) {
          commonMemory.creepCountByRole[role] = MemoryApi_All.memoryAverager(
            commonMemory.creepCountByRole[role],
            Config.roleCountByRoomByRole[room.name][role]
          );
        }
        commonMemory.sourceCount = roomMemory.commonMemory.sources.length;
      }

      // Set all performance related memory
      const performanceMemory = roomStats["performance"];
      if (typeof performanceMemory === "object") {
        if (!performanceMemory.expenses.spawnExpenses) { performanceMemory.expenses.spawnExpenses = {}; }
        for (const role in Config.expenses.spawnExpenses[room.name]) {
          performanceMemory.expenses.spawnExpenses[role] = MemoryApi_All.memoryAverager(
            performanceMemory.expenses.spawnExpenses[role],
            Config.expenses.spawnExpenses[room.name][role]
          );
        }

        performanceMemory.expenses.building = MemoryApi_All.memoryAverager(
          performanceMemory.expenses.building,
          Config.expenses.building[room.name]
        );
        performanceMemory.expenses.repairing = MemoryApi_All.memoryAverager(
          performanceMemory.expenses.repairing,
          Config.expenses.repairing[room.name]
        );
        performanceMemory.expenses.upgrading = MemoryApi_All.memoryAverager(
          performanceMemory.expenses.upgrading,
          Config.expenses.upgrading[room.name]
        );
        performanceMemory.income.ownedHarvesting = MemoryApi_All.memoryAverager(
          performanceMemory.income.ownedHarvesting,
          Config.income.ownedHarvesting[room.name]
        );
        performanceMemory.income.remoteHarvesting = MemoryApi_All.memoryAverager(
          performanceMemory.income.remoteHarvesting,
          Config.income.remoteHarvesting[room.name]
        );
      }

      // Set all energy stored related memory
      const energyMemory = roomStats["energyStored"];
      if (typeof energyMemory === "object") {
        energyMemory.storage = room.storage ? room.storage.store.getUsedCapacity(RESOURCE_ENERGY) : 0;
        energyMemory.terminal = room.terminal ? room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) : 0;
        energyMemory.capacity = roomMemory.commonMemory.energyStored.capacity;
        energyMemory.total = roomMemory.commonMemory.energyStored.usable;
      }

      // Set all cpu related memory
      const cpuMemory = roomStats["cpu"];
      if (typeof cpuMemory === "object") {
        for (const role in Config.cpuUsedByRoomByRole[room.name]) {
          cpuMemory.headModules["creeps"][role] = MemoryApi_All.memoryAverager(
            cpuMemory.headModules["creeps"][role],
            Config.cpuUsedByRoomByRole[room.name][role]
          );
        }
        for (const role in Config.creepModuleCpuCost[room.name]) {
          cpuMemory.creepModules[role] = MemoryApi_All.memoryAverager(
            cpuMemory.creepModules[role],
            Config.creepModuleCpuCost[room.name][role]
          );
        }
      }
    }
  };

  public static ownedRoom = (room: Room) => {
    StatsHelper.globalRoom(room);
    
    // Define stats memory link
    const statsMemory = Memory.stats;

    if (typeof statsMemory.rooms === "object") {
      // Get room stats from memory
      const roomStats = statsMemory.rooms[room.name];

      // Set all spawner energy related memory
      const spawnerEnergy = roomStats["spawnerEnergy"];
      if (typeof spawnerEnergy === "object") {
        spawnerEnergy.available = room.energyAvailable;
        spawnerEnergy.capacityAvailable = room.energyCapacityAvailable;
      }

      // Set all controller related memory
      const controller = roomStats["controller"];
      if (typeof controller === "object") {
        controller.level = room.controller?.level;
        controller.progress = room.controller?.progress;
        controller.progressTotal = room.controller?.progressTotal;
      }
    }
  };
}
