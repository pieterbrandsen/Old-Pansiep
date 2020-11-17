//#region Require('./)
import _ from "lodash";
import { RoomHelper_State } from "Utils/importer/internals";
//#endregion

//#region Class
export class MemoryApi_Empire {
    public static getOwnedRooms(): Room[] {
        return _.filter(Game.rooms, currentRoom => RoomHelper_State.isMyRoom(currentRoom));
    }
}
//#endregion
