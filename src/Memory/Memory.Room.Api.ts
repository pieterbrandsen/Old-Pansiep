//#region Require('./)
import _ from "lodash";
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
    };

    /**
     * Get all structures based on a type and filter
     * @param room Room to check in
     * @param type A structure type
     * @param filterFunction A function to filter with
     */
    public static getStructuresOfType(room:Room, type: StructureConstant, filterFunction?: (object:any) => boolean): Structure[] {
        // Find all structures with the structureType inputted
        let structures: Structure[] = room.find(FIND_STRUCTURES, {
            filter: {
                structureType: type
            }
        });

        // If a filter function was provided, use it to filter based on the function
        if (filterFunction !== undefined) {
            structures = _.filter(structures, filterFunction);
        }

        // Return all found structures after the possible filter
        return structures;
    }
}
//#endregion
