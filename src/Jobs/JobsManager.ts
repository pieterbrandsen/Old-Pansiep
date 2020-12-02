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
  SPAWNER_ENERGY_STRUCTURES_JOBS_CACHE_TTL,
  HOSTILE_CREEPS_JOBS_CACHE_TTL,
  MemoryApi_Room,
  DROPPED_RESOURCE_JOBS_CACHE_TTL,
  SCORE_CONTAINERS_JOBS_CACHE_TTL
} from "Utils/importer/internals";
//#endregion

//#region Class
export class JobsManager {
  public static runJobsManager(): void {
    const ownedRooms: Room[] = MemoryApi_Empire.getOwnedRooms();
    _.forEach(ownedRooms, (room: Room): void => {
      this.runJobsForRoom(room, "owned");
    });

    // Run all dependent rooms we have visiblity in
    const dependentRooms: Room[] = MemoryApi_Room.getVisibleDependentRooms();
    _.forEach(dependentRooms, (room: Room): void => {
      const roomType: string = MemoryApi_Room.getRoomType(room);
      this.runJobsForRoom(room, roomType);
    });
  }

  private static runJobsForRoom(room: Room, roomType: string): void {
    if (roomType === "owned" && MemoryApi_All.executeEachTicks(SPAWNER_ENERGY_STRUCTURES_JOBS_CACHE_TTL)) {
      JobsHelper.updateAllSpawnerEnergyStructuresJobs(room);
    }

    if ((roomType === "owned" || roomType === "remote") && MemoryApi_All.executeEachTicks(ENERGY_STORAGES_JOBS_CACHE_TTL)) {
      JobsHelper.updateAllEnergyStoragesJobs(room);
    }

    if (MemoryApi_All.executeEachTicks(HOSTILE_CREEPS_JOBS_CACHE_TTL)) {
      JobsHelper.updateAllHostileCreepsJobs(room);
    }

    if (MemoryApi_All.executeEachTicks(DAMAGED_CREEPS_JOBS_CACHE_TTL)) {
      JobsHelper.updateAllDamagedCreepsJobs(room);
    }

    if (MemoryApi_All.executeEachTicks(CONST_JOBS_CACHE_TTL)) {
      JobsHelper.updateAllConstructionSitesJobs(room);
    }

    if (MemoryApi_All.executeEachTicks(DAMAGED_STRUCTURES_JOBS_CACHE_TTL)) {
      JobsHelper.updateAllDamagedStructuresJobs(room);
    }

    if (MemoryApi_All.executeEachTicks(DROPPED_RESOURCE_JOBS_CACHE_TTL)) {
      JobsHelper.updateAllDroppedResourcesJobs(room);
    }

    if (Game.shard.name ==="shardSeason") {
      if (MemoryApi_All.executeEachTicks(SCORE_CONTAINERS_JOBS_CACHE_TTL)) {
        JobsHelper.updateScoreContainersJobs(room);
      }
    }
  }
}
//#endregion
