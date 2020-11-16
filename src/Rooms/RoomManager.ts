//#region Require('./)
import _ from "lodash";
import { MemoryApi_Empire } from "Utils/importer/internals";
//#endregion

//#region Class
export class RoomManager {
    public static runRoomManager(): void {
        const ownedRooms: Room[] = MemoryApi_Empire.getOwnedRooms();
        _.forEach(ownedRooms, (room: Room) => RoomManager.runSingleRoom(room));
    }

    private static runSingleRoom(room: Room): void {}
}
//#endregion
