// #region Require('./)
import _ from 'lodash';
import { MemoryApi_All, MemoryApi_Empire, MemoryApi_Room } from 'Utils/importer/internals';
// #endregion

// #region Class
export cUtils/Importer/internals
  public static runMemoryManager(): void {
    MemoryApi_All.garbageCollection();
    MemoryApi_All.initMainMemory();

    const ownedRooms: Room[] = MemoryApi_Empire.getOwnedRooms();
    _.forEach(ownedRooms, (room: Room): void => {
      MemoryApi_Room.isRoomSetup(room);
      MemoryApi_Room.initRoomMemory(room, 'owned');
      MemoryApi_Room.resetRoomTracking(room);
    });

    // Run all dependent rooms we have visiblity in
    const dependentRooms: Room[] = MemoryApi_Room.getVisibleDependentRooms();
    _.forEach(dependentRooms, (room: Room): void => {
      const roomType: string = MemoryApi_Room.getRoomType(room);
      MemoryApi_Room.isRoomSetup(room);
      MemoryApi_Room.initRoomMemory(room, roomType);
      MemoryApi_Room.resetRoomTracking(room);
    });

    // Set the ticks alive one tick higher
    Memory.stats.ticksAlive++;
  }
}
// #endregion
