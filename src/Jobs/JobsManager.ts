//#region Require('./)
import _ from "lodash";
import {
  MemoryApi_All,
  MemoryApi_Empire,
  CONST_JOBS_CACHE_TTL,
  JobsHelper,
  ENERGY_STORAGES_JOBS_CACHE_TTL,
  DAMAGED_STRUCTURES_JOBS_CACHE_TTL,
  DAMAGED_CREEPS_JOBS_CACHE_TTL,
  SPAWNER_ENERGY_STRUCTURES_JOBS_CACHE_TTL
} from "Utils/importer/internals";
//#endregion

//#region Class
export class JobsManager {
  public static runJobsManager(): void {
    const ownedRooms: Room[] = MemoryApi_Empire.getOwnedRooms();
    _.forEach(ownedRooms, (room: Room): void => {
      const isOwnedRoom: boolean = true;
      this.runJobsForRoom(room, isOwnedRoom);
    });
  }

  private static runJobsForRoom(room: Room, isOwnedRoom: boolean): void {
    if (isOwnedRoom) {
      if (MemoryApi_All.executeEachTicks(CONST_JOBS_CACHE_TTL)) {
        JobsHelper.updateAllConstructionSitesJobs(room);
      }

      if (MemoryApi_All.executeEachTicks(DAMAGED_STRUCTURES_JOBS_CACHE_TTL)) {
        JobsHelper.updateAllDamagedStructuresJobs(room);
      }

      if (MemoryApi_All.executeEachTicks(DAMAGED_CREEPS_JOBS_CACHE_TTL)) {
        JobsHelper.updateAllDamagedCreepsJobs(room);
      }
    }

    if (MemoryApi_All.executeEachTicks(ENERGY_STORAGES_JOBS_CACHE_TTL)) {
      JobsHelper.updateAllEnergyStoragesJobs(room);
    }

    if (MemoryApi_All.executeEachTicks(SPAWNER_ENERGY_STRUCTURES_JOBS_CACHE_TTL)) {
      JobsHelper.updateAllSpawnerEnergyStructures(room);
    }
  }
}
//#endregion
