//#region Require('./)
import { RoomManager, MemoryManager } from "Utils/importer/internals";
//#endregion

//#region Class
export class ManagerManager {
    /**
     * Run all managers that need to be called by the ManagerManager
     */
    public static runManagerManager(): void {
        try {
            // Run the memoryManager
            // This will run all memory related management
            // Like setting up the memory
            MemoryManager.runMemoryManager();
        } catch (err) {
            console.log("There was an error in the runMemoryManager function");
            console.log("File: Src/ManagerManager.ts");
            console.log(`Error: ${err}`);
        }

        try {
            // Run the roomManager
            // This will run all room related management
            // Like the towers and spawningEnergy gathering
            RoomManager.runRoomManager();
        } catch (err) {
            console.log("There was an error in the runRoomManager function");
            console.log("File: Src/ManagerManager.ts");
            console.log(`Error: ${err}`);
        }
    }
}
// #endregion
