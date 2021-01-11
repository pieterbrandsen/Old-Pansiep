// #region Require('./)
import {
  CONST_JOBS_CACHE_TTL,
  DAMAGED_CREEPS_JOBS_CACHE_TTL,
  DAMAGED_STRUCTURES_JOBS_CACHE_TTL,
  DROPPED_RESOURCE_JOBS_CACHE_TTL,
  ENERGY_STORAGES_JOBS_CACHE_TTL,
  HOSTILE_CREEPS_JOBS_CACHE_TTL,
  JobsHelper,
  MemoryApiAll,
  MemoryApiEmpire,
  MemoryApiRoom,
  SPAWNER_ENERGY_STRUCTURES_JOBS_CACHE_TTL
} from 'Utils/Importer/internals';
import _ from 'lodash';
// #endregion

// #region Class
export class JobsManager {
  public static runJobsManager(): void {
    const ownedRooms: Room[] = MemoryApiEmpire.getOwnedRooms();
    _.forEach(ownedRooms, (room: Room): void => {
      this.runJobsForRoom(room, 'owned');
    });

    // Run all dependent rooms we have visiblity in
    const dependentRooms: Room[] = MemoryApiRoom.getVisibleDependentRooms();
    _.forEach(dependentRooms, (room: Room): void => {
      const roomType: string = MemoryApiRoom.getRoomType(room);
      this.runJobsForRoom(room, roomType);
    });
  }

  private static runJobsForRoom(room: Room, roomType: string): void {
    if (roomType === 'owned' && MemoryApiAll.executeEachTicks(SPAWNER_ENERGY_STRUCTURES_JOBS_CACHE_TTL)) {
      JobsHelper.updateAllSpawnerEnergyStructuresJobs(room);
    }

    if (
      (roomType === 'owned' || roomType === 'remote') &&
      MemoryApiAll.executeEachTicks(ENERGY_STORAGES_JOBS_CACHE_TTL)
    ) {
      JobsHelper.updateAllEnergyStoragesJobs(room);
    }

    if (MemoryApiAll.executeEachTicks(HOSTILE_CREEPS_JOBS_CACHE_TTL)) {
      JobsHelper.updateAllHostileCreepsJobs(room);
    }

    if (MemoryApiAll.executeEachTicks(DAMAGED_CREEPS_JOBS_CACHE_TTL)) {
      JobsHelper.updateAllDamagedCreepsJobs(room);
    }

    if (MemoryApiAll.executeEachTicks(CONST_JOBS_CACHE_TTL)) {
      JobsHelper.updateAllConstructionSitesJobs(room);
    }

    if (MemoryApiAll.executeEachTicks(DAMAGED_STRUCTURES_JOBS_CACHE_TTL)) {
      JobsHelper.updateAllDamagedStructuresJobs(room);
    }

    if (MemoryApiAll.executeEachTicks(DROPPED_RESOURCE_JOBS_CACHE_TTL)) {
      JobsHelper.updateAllDroppedResourcesJobs(room);
    }
  }
}
// #endregion
