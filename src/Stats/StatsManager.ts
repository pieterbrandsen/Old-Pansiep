//#region Require('./)
import _ from "lodash";
import { MemoryApi_Empire, StatsHelper } from "Utils/importer/internals";
//#endregion

//#region Class
export class StatsManager {
  /**
   * Get all ownedRooms and run the runSpawningForRoom function on the rooms
   * @returns {void} Only calls other class member functions
   */
  public static runStatsManager(): void {
    // Get all ownedRooms and run for each room found the runSpawningForRoom function
    const ownedRooms: Room[] = MemoryApi_Empire.getOwnedRooms();
    _.forEach(ownedRooms, (room: Room) => this.runStatsManagerForRoom(room));

    this.runStatsManagerForGlobal();
  }

  private static runStatsManagerForRoom(room: Room): void {
    StatsHelper.ownedRoom(room);
  }

  private static runStatsManagerForGlobal(): void {
    StatsHelper.global();
  }
}
//#endregion
