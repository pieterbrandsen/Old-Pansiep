// #region Require('./)
import {
  ConsoleCommands,
  CreepsManager,
  JobsManager,
  MemoryApiAll,
  MemoryApiEmpire,
  MemoryManager,
  RoomManager,
  SpawningManager,
  StatsManager
} from 'Utils/Importer/internals';
// #endregion

// #region Class
export class ManagerManager {
  /**
   * Run all managers that need to be called by the ManagerManager
   */
  public static runManagerManager(): void {
    if (MemoryApiAll.executeEachTicks(1000)) {
      ConsoleCommands.init();
    }

    // Load memory and save cpu before another function does this
    MemoryApiAll.functionRunnerWithCpu(
      MemoryApiEmpire.memoryLoader, // eslint-disable-line
      MemoryApiAll.isMemoryPathDefined('Memory.stats.cpu.headModules'),
      'loadMemory',
      '='
    );

    // Run the memoryManager
    // This will run all memory related management
    // Like setting up the memory
    MemoryManager.runMemoryManager();

    // Run the roomManager
    // This will run all room related management
    // Like the towers and spawningEnergy gathering
    RoomManager.runRoomManager();

    // Run the creepsManager
    // This will run creep related logic
    // Like running creeps and saving cpu of creeps
    CreepsManager.runCreepsManager();

    // Run the spawningManager
    // This will run all spawning related management
    // Like spawning creeps and setting caps for spawning
    SpawningManager.runSpawningManager();

    // Run the statsManager
    // This will run all stats saving related logic
    // Like saving source count and cpu usage
    StatsManager.runStatsManager();

    // Run the JobsManager
    // This will get all the jobs every ... ticks
    // Like construction sites, damagedStructures and energyStructures
    JobsManager.runJobsManager();
  }
}
// #endregion
