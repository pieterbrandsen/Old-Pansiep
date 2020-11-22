//#region Require('./)
import _ from "lodash";
import { MemoryApi_Room } from "Utils/importer/internals";
//#endregion

//#region Class
export class RoomHelper_State {
  /**
   * Check if the room inputted is my room
   * @param room The room to check for if it is my room
   * @returns {boolean} True if the room is my room, false otherwise
   */
  public static isMyRoom(room: Room): boolean {
    return room.controller ? room.controller.my : false;
  }

  public static getRoomState(room: Room): string {
    if (room.memory.enemies.creeps.length > 0) {
      return "ATTACK";
    } else {
      return "NORMAL";
    }
  }

  public static isRoomSetup(room: Room): boolean {
    if (!room.memory) {
      MemoryApi_Room.initRoomMemory(room, this.isMyRoom(room));
      return false;
    } else if (!Game.flags[room.name]) {
      room.createFlag(
        room.controller
          ? room.controller.pos
          : (MemoryApi_Room.getRandomFreePos({ x: 0, y: 0, roomName: room.name }) as RoomPosition),
        room.name,
        COLOR_RED,
        COLOR_WHITE
      );
      delete Memory.rooms[room.name];
      MemoryApi_Room.initRoomMemory(room, this.isMyRoom(room));
      return false;
    } else {
      return true;
    }
  }
}
//#endregion
