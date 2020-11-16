//#region Require('./)
import _ from "lodash";
//#endregion

//#region Class
export class RoomHelper_State {
    public static isMyRoom(room: Room): boolean {
        return room.controller ? room.controller.my : false;
    }
}
//#endregion
