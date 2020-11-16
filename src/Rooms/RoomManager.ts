//#region Require('./)
import { RoomApi_Main } from "Utils/importer/internals";
//#endregion

//#region Class
export class RoomManager {
    public static runRoomManager(): void {
        const ownedRooms: Room[] = RoomApi_Main.getOwnedRooms();
        _.forEach(ownedRooms, (room: Room) => RoomManager.runSingleRoom(room));
    }

    private static runSingleRoom(room: Room): void {
    }
}
//#endregion
