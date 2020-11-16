//#region Require('./)
import { RoomHelper_State } from "Utils/importer/internals";
import _ from "lodash";
//#endregion


//#region Class
export class RoomApi_Main {
  public static getOwnedRooms(): Room[] {
    return _.filter(Game.rooms, currentRoom => RoomHelper_State.isMyRoom(currentRoom));
  }
}
//#endregion

