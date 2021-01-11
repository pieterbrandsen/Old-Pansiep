// #region Require('./)
import { MemoryApiEmpire, MemoryApiRoom, StatsHelper } from 'Utils/Importer/internals';
import _ from 'lodash';
// #endregion

// #region Class
export class StatsManager {
  /**
   * Get all ownedRooms and run the runSpawningForRoom function on the rooms
   * @return {void} Only calls other class member functions
   */
  public static runStatsManager(): void {
    // Get all ownedRooms and run for each room found the runSpawningForRoom function
    const ownedRooms: Room[] = MemoryApiEmpire.getOwnedRooms();
    _.forEach(ownedRooms, (room: Room) => this.runStatsManagerForOwnedRoom(room));

    const dependentRooms: Room[] = MemoryApiRoom.getVisibleDependentRooms();
    _.forEach(dependentRooms, (room: Room): void => this.runStatsManagerForGlobalRoom(room));

    this.runStatsManagerForGlobal();
  }

  private static runStatsManagerForOwnedRoom(room: Room): void {
    StatsHelper.ownedRoom(room);
  }

  private static runStatsManagerForGlobalRoom(room: Room): void {
    StatsHelper.remoteRoom(room);
  }

  private static runStatsManagerForGlobal(): void {
    StatsHelper.global();
  }
}
// #endregion
