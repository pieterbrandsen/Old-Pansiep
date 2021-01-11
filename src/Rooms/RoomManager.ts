// #region Require('./)
import {
  BASE_PLANNER_TIMER,
  MemoryApiAll,
  MemoryApiEmpire,
  MemoryApiRoom,
  MemoryHelperRoom,
  OldRoomPlanner,
  ROOM_PLANNER_TIMER,
  RUN_LINKS_TIMER,
  RoomHelperState,
  RoomHelperStructure,
  UPDATE_LINKS_TIMER,
  UPDATE_MINERAL_AMOUNT_TIMER,
  UPDATE_SOURCE_STRUCTURES_TIMER
} from 'Utils/Importer/internals';
import _ from 'lodash';
// #endregion

// #region Class
export class RoomManager {
  /**
   * Get all ownedRooms and run the runSingleRoom function on the rooms
   * @return {void} Only calls other class member functions
   */
  public static runRoomManager(): void {
    // Get all ownedRooms and run for each room found the runSingleRoom function
    const ownedRooms: Room[] = MemoryApiEmpire.getOwnedRooms();
    _.forEach(ownedRooms, (room: Room) => this.runSingleRoom(room));

    // Run all dependent rooms we have visiblity in
    const dependentRooms: Room[] = MemoryApiRoom.getVisibleDependentRooms();
    _.forEach(dependentRooms, (room: Room) => {
      this.runSingleDependentRoom(room);
    });
  }

  private static runSingleRoom(room: Room): void {
    const cpuStart: number = MemoryApiAll.preCpuGetter();
    const roomState: string = RoomHelperState.getRoomState(room);

    if (room.controller && room.controller.level >= 3) {
      if (roomState === 'ATTACK') {
        RoomHelperStructure.towerAttacking(room);
      } else {
        RoomHelperStructure.towerRepairing(room);
        RoomHelperStructure.towerHealing(room);
      }
    }

    if (MemoryApiAll.executeEachTicks(ROOM_PLANNER_TIMER)) {
      OldRoomPlanner.roomPlanner(room);
    }
    if (MemoryApiAll.executeEachTicks(BASE_PLANNER_TIMER)) {
      OldRoomPlanner.basePlanner(room);
    }

    if (MemoryApiAll.executeEachTicks(UPDATE_SOURCE_STRUCTURES_TIMER)) {
      MemoryHelperRoom.updateSourceStructures(room);
    }
    if (MemoryApiAll.executeEachTicks(UPDATE_MINERAL_AMOUNT_TIMER)) {
      MemoryHelperRoom.updateMineralAmount(room);
    }

    if (room.controller && room.controller.level >= 5) {
      if (MemoryApiAll.executeEachTicks(UPDATE_LINKS_TIMER)) {
        MemoryHelperRoom.updateAllLinksInMemory(room);
      }

      if (MemoryApiAll.executeEachTicks(RUN_LINKS_TIMER)) {
        RoomHelperStructure.runLinks(room);
      }
    }

    const cpuEnd: number = MemoryApiAll.endCpuGetter();
    Memory.stats.rooms[room.name].cpu.used = cpuEnd - cpuStart;
  }

  private static runSingleDependentRoom(room: Room): void {
    const roomType: string = MemoryApiRoom.getRoomType(room);

    if (roomType === 'remote') {
      if (MemoryApiAll.executeEachTicks(ROOM_PLANNER_TIMER)) {
        OldRoomPlanner.roomPlanner(room);
      }

      if (MemoryApiAll.executeEachTicks(UPDATE_SOURCE_STRUCTURES_TIMER)) {
        MemoryHelperRoom.updateSourceStructures(room);
      }
    }
  }
}
// #endregion
