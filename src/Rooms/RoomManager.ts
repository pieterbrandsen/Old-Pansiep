//#region Require('./)
import _ from "lodash";
import { MemoryApi_Empire } from "Utils/importer/internals";
//#endregion

//#region Class
export class RoomManager {
    /**
     * Get all ownedRooms and run the runSingleRoom function on the rooms
     * @returns {void} Only calls other class member functions
     */
    public static runRoomManager(): void {
        // Get all ownedRooms and run for each room found the runSingleRoom function
        const ownedRooms: Room[] = MemoryApi_Empire.getOwnedRooms();
        _.forEach(ownedRooms, (room: Room) => RoomManager.runSingleRoom(room));
    }

    private static runSingleRoom(room: Room): void {}
}
//#endregion
