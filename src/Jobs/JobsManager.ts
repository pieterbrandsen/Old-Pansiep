//#region Require('./)
import _ from "lodash";
import { MemoryApi_Empire } from "Utils/importer/internals";
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
    // Empty
  }
}
//#endregion
