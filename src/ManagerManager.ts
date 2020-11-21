//#region Require('./)
import { RoomManager, MemoryManager, SpawningManager, MemoryApi_All, MemoryApi_Empire, CreepsManager, StatsManager } from "Utils/importer/internals";
//#endregion

//#region Class
export class ManagerManager {
    /**
     * Run all managers that need to be called by the ManagerManager
     */
    public static runManagerManager(): void {
        // try {
            MemoryApi_All.functionRunnerWithCpu(MemoryApi_Empire.memoryLoader, MemoryApi_All.isMemoryPathDefined("Memory.stats.cpu.headModules"), "loadMemory", "=");
        // } catch (err) {
        //     console.log("There was an error in the memoryLoader function");
        //     console.log("File: Src/ManagerManager.ts");
        //     console.log(`Error: ${err.stack}`);
        // }

        // try {
            // Run the memoryManager
            // This will run all memory related management
            // Like setting up the memory
            MemoryManager.runMemoryManager();
        // } catch (err) {
        //     console.log("There was an error in the runMemoryManager function");
        //     console.log("File: Src/ManagerManager.ts");
        //     console.log(`Error: ${err.stack}`);
        // }

        // try {
            // Run the roomManager
            // This will run all room related management
            // Like the towers and spawningEnergy gathering
            RoomManager.runRoomManager();
        // } catch (err) {
        //     console.log("There was an error in the runRoomManager function");
        //     console.log("File: Src/ManagerManager.ts");
        //     console.log(`Error: ${err.stack}`);
        // }

        // try {
            // Run the spawningManager
            // This will run all spawning related management
            // Like spawning creeps and setting caps for spawning
            SpawningManager.runSpawningManager();
        // } catch (err) {
        //     console.log("There was an error in the runSpawningManager function");
        //     console.log("File: Src/ManagerManager.ts");
        //     console.log(`Error: ${err.stack}`);
        // }

        // try {
            // Run the creepsManager
            // This will run creep related logic
            // Like running creeps and saving cpu of creeps
            CreepsManager.runCreepsManager();
        // } catch (err) {
        //     console.log("There was an error in the runCreepsManager function");
        //     console.log("File: Src/ManagerManager.ts");
        //     console.log(`Error: ${err.stack}`);
        // }

        // try {
            // Run the statsManager
            // This will run all stats saving related logic
            // Like saving source count and cpu usage
            StatsManager.runStatsManager();
        // } catch (err) {
        //     console.log("There was an error in the runStatsManager function");
        //     console.log("File: Src/ManagerManager.ts");
        //     console.log(`Error: ${err.stack}`);
        // }
    }
}
// #endregion
