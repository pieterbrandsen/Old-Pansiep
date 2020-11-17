//#region Require('./)
import _ from "lodash";
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
}
//#endregion
