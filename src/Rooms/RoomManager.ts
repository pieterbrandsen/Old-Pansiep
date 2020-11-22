//#region Require('./)
import _ from "lodash";
import { MemoryApi_Empire, RoomHelper_State, RoomHelper_Structure, TimerManager } from "Utils/importer/internals";
//#endregion

//#region Class
export class RoomManager {
  /**
   * Get all ownedRooms and run the runSingleRoom function on the rooms
   * @returns {void} Only calls other class member functions
   */
  public static runRoomManager(): void {
    // Get all ownedRooms and run for each room found the runSingleRoom function
    const ownedRooms: Room[] = MemoryApi_Empire.getOwnedRooms();
    _.forEach(ownedRooms, (room: Room) => RoomManager.runSingleRoom(room));
  }

  private static runSingleRoom(room: Room): void {
    RoomHelper_State.isRoomSetup(room);
    TimerManager.runTimerForRoom(room);
    const roomState: string = RoomHelper_State.getRoomState(room);

    if (room.controller!.level >= 3) {
      if (roomState === "ATTACK") {
        RoomHelper_Structure.towerAttacking(room);
      } else {
        RoomHelper_Structure.towerRepairing(room);
        RoomHelper_Structure.towerHealing(room);
      }
    }

    if (room.controller!.level >= 5) {
      RoomHelper_Structure.runLinks(room);
    }
  }
}
//#endregion
