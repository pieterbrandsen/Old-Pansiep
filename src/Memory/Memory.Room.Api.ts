//#region Require('./)
import { Config } from "Utils/importer/internals";
//#endregion

//#region Class
export class MemoryApi_Room {
    public static initRoomMemory(room: Room, isOwnedRoom: boolean): void {
        if (Memory.rooms[room.name]) {
            return;
        }

        if (isOwnedRoom) {
            room.memory = {
                enemies: {
                    parts: Config.allCreepModules,
                    creeps: []
                }
            };
        }
    }
}
//#endregion
