//#region Require('./)
import _ from "lodash";
import { MemoryApi_Empire, SpawningApi } from "Utils/importer/internals";
//#endregion

//#region Class
export class SpawningManager {
    /**
     * Get all ownedRooms and run the runSpawningForRoom function on the rooms
     * @returns {void} Only calls other class member functions
     */
    public static runSpawningManager(): void {
        // Get all ownedRooms and run for each room found the runSpawningForRoom function
        const ownedRooms: Room[] = MemoryApi_Empire.getOwnedRooms();
        _.forEach(ownedRooms, (room: Room) => SpawningManager.runSpawningForRoom(room));
    }

    /**
     * Run spawning logic in a room
     * @param room Room to run spawning in
     */
    private static runSpawningForRoom(room: Room): void {
        // Get a open spawn
        const openSpawn: StructureSpawn | null = SpawningApi.getOpenSpawn(room);

        // If no open spawn was found, return null
        if (openSpawn === null) {
            return;
        }
    }
}
//#endregion
