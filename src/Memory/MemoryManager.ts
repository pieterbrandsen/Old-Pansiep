//#region Require('./)
import _ from "lodash";
import { MemoryApi_All, MemoryApi_Empire, MemoryApi_Room } from "Utils/importer/internals";
//#endregion

//#region Class
export class MemoryManager {
    public static runMemoryManager(): void {
        MemoryApi_All.garbageCollection();
        this.initMainMemory();

        const ownedRooms: Room[] = MemoryApi_Empire.getOwnedRooms();
        _.forEach(ownedRooms, (room: Room): void => {
            const isOwnedRoom: boolean = true;
            MemoryApi_Room.initRoomMemory(room, isOwnedRoom);
        });
    }

    private static initMainMemory(): void {
        if (!Memory.rooms) {
            Memory.rooms = {};
        }

        if (!Memory.flags) {
            Memory.flags = {};
        }

        if (!Memory.creeps) {
            Memory.creeps = {};
        }
    }
}
//#endregion
