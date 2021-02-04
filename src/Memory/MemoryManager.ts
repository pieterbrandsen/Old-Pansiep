// #region Require('./)
import { MemoryApiAll, MemoryApiEmpire, MemoryApiRoom } from 'Utils/Importer/internals';
import _ from 'lodash';
// #endregion

// #region Class
export class MemoryManager {
  public static runMemoryManager(): void {
    MemoryApiAll.garbageCollection();
    MemoryApiAll.initMainMemory();

    const ownedRooms: Room[] = MemoryApiEmpire.getOwnedRooms();
    _.forEach(ownedRooms, (room: Room): void => {
      MemoryApiRoom.isRoomSetup(room);
      MemoryApiRoom.initRoomMemory(room, 'owned');
      MemoryApiRoom.resetRoomTracking(room);
    });

    // Run all dependent rooms we have visiblity in
    const dependentRooms: Room[] = MemoryApiRoom.getVisibleDependentRooms();
    _.forEach(dependentRooms, (room: Room): void => {
      MemoryApiRoom.isRoomSetup(room);
      MemoryApiRoom.initRoomMemory(room, "remote");
      MemoryApiRoom.resetRoomTracking(room);
    });

    // Set the ticks alive one tick higher
    Memory.stats.ticksAlive++;
  }
}
// #endregion
