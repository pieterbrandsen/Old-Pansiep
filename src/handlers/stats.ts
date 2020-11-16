//#region Require('./)
import { Config, MemoryAverager } from "../Utils/importer/internals";
//#endregion

//#region Functions()
const globalStats = (): void => {
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
    cpuMemory.used = MemoryAverager(cpuMemory.used, Game.cpu.getUsed());
  }

  // Set all commonMemory related memory
  const commonMemory = statsMemory["common"];
  if (typeof commonMemory === "object") {
    commonMemory.energyEachTickPerSource = 10;
  }
};

const globalRoomStats = (room: Room): void => {
  // Define stats memory link
  const statsMemory = Memory.stats;

  if (typeof statsMemory.rooms === "object") {
    // Get room stats from memory
    const roomStats = statsMemory.rooms[room.name];
    // Create a acces point to the flagMemory //
    const flagMemory: FlagMemory = Memory.flags[room.name];

    // Set all commonMemory related memory
    const commonMemory = roomStats["commonMemory"];
    if (typeof commonMemory === "object") {
      commonMemory.constructionSitesCount = flagMemory.commonMemory.constructionSites.length;
      if (!commonMemory.creepCountByRole) commonMemory.creepCountByRole = {};
      // eslint-disable-next-line guard-for-in
      for (const role in Config.roleCountByRoomByRole[room.name]) {
        commonMemory.creepCountByRole[role] = MemoryAverager(
          commonMemory.creepCountByRole[role],
          Config.roleCountByRoomByRole[room.name][role]
        );
      }
      commonMemory.sourceCount = flagMemory.commonMemory.sources.length;
    }

    // Set all performance related memory
    const performanceMemory = roomStats["performance"];
    if (typeof performanceMemory === "object") {
      if (!performanceMemory.expenses.spawnExpenses) performanceMemory.expenses.spawnExpenses = {};
      for (const role in Config.expenses.spawnExpenses[room.name]) {
        performanceMemory.expenses.spawnExpenses[role] = MemoryAverager(
          performanceMemory.expenses.spawnExpenses[role],
          Config.expenses.spawnExpenses[room.name][role]
        );
      }

      performanceMemory.expenses.building = MemoryAverager(
        performanceMemory.expenses.building,
        Config.expenses.building[room.name]
      );
      performanceMemory.expenses.repairing = MemoryAverager(
        performanceMemory.expenses.repairing,
        Config.expenses.repairing[room.name]
      );
      performanceMemory.expenses.upgrading = MemoryAverager(
        performanceMemory.expenses.upgrading,
        Config.expenses.upgrading[room.name]
      );
      performanceMemory.income.ownedHarvesting = MemoryAverager(
        performanceMemory.income.ownedHarvesting,
        Config.income.ownedHarvesting[room.name]
      );
      performanceMemory.income.remoteHarvesting = MemoryAverager(
        performanceMemory.income.remoteHarvesting,
        Config.income.remoteHarvesting[room.name]
      );
    }

    // Set all energy stored related memory
    const energyMemory = roomStats["energyStored"];
    if (typeof energyMemory === "object") {
      energyMemory.storage = room.storage ? room.storage.store.getUsedCapacity(RESOURCE_ENERGY) : 0;
      energyMemory.terminal = room.terminal ? room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) : 0;
      energyMemory.capacity = flagMemory.commonMemory.energyStored.capacity;
      energyMemory.total = flagMemory.commonMemory.energyStored.usable;
    }

    // Set all cpu related memory
    const cpuMemory = roomStats["cpu"];
    if (typeof cpuMemory === "object") {
      for (const role in Config.cpuUsedByRoomByRole[room.name]) {
        cpuMemory.headModules["creeps"][role] = MemoryAverager(
          cpuMemory.headModules["creeps"][role],
          Config.cpuUsedByRoomByRole[room.name][role]
        );
      }
      for (const role in Config.creepModuleCpuCost[room.name]) {
        cpuMemory.creepModules[role] = MemoryAverager(
          cpuMemory.headModules[role],
          Config.creepModuleCpuCost[room.name][role]
        );
      }
    }
  }
};

const ownedRoomStats = (room: Room) => {
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

  globalRoomStats(room);
};

const remoteRoomStats = (room: Room) => {globalRoomStats(room)};
//#endregion

//#region Export functions
export {
  globalStats as GlobalStats,
  globalRoomStats as GlobalRoomStats,
  ownedRoomStats as OwnedRoomStats,
  remoteRoomStats as RemoteRoomStats
};
//#endregion
