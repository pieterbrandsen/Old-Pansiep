// #region Require('./)
import _ from 'lodash';
import { MemoryApi_Room } fromUtils/Importer/internalsls';
// #endregion

// #region Class
export class RoomHelper_State {
  /**
   * Check if the room inputted is my room
   * @param room The room to check for if it is my room
   * @return {boolean} True if the room is my room, false otherwise
   */
  public static isMyRoom(room: Room): boolean {
    return room.controller ? room.controller.my : false;
  }

  public static getRoomState(room: Room): string {
    if (room.memory.jobs.enemies.creeps.length > 0) {
      return 'ATTACK';
    }
    return 'NORMAL';
  }
}
// #endregion
