//#region Require('./)
import _ from "lodash";
import { MemoryApi_All, MemoryApi_Empire, MemoryApi_Room } from "Utils/importer/internals";
//#endregion

//#region Class
export class MemoryManager {
  public static runMemoryManager(): void {
    MemoryApi_All.garbageCollection();
    MemoryApi_All.initMainMemory();

    const ownedRooms: Room[] = MemoryApi_Empire.getOwnedRooms();
    _.forEach(ownedRooms, (room: Room): void => {
      const isOwnedRoom: boolean = true;
      MemoryApi_Room.isRoomSetup(room);
      MemoryApi_Room.initRoomMemory(room, isOwnedRoom);
      MemoryApi_Room.resetRoomTracking(room);
    });

    // Run all dependent rooms we have visiblity in
    const dependentRooms: Room[] = MemoryApi_Room.getVisibleDependentRooms();
    _.forEach(dependentRooms, (room: Room): void => {
      const isOwnedRoom: boolean = false;
      MemoryApi_Room.isRoomSetup(room);
      MemoryApi_Room.initRoomMemory(room, isOwnedRoom);
      MemoryApi_Room.resetRoomTracking(room);
    });

    // Set the ticks alive one tick higher
    Memory.stats["ticksAlive"]++;
  }
}
//#endregion
