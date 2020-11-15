//#region Require('./)
import {
  Config,
  MemoryLoader,
  FunctionRunnerWithCpu,
  FunctionRunnerWithoutCpu,
  IsMemoryPathDefined,
  GlobalAllRoomsHandler,
  GlobalMemory,
  GlobalStats,
  GlobalCreepsHandler,
  GlobalTimers
} from "../Utils/importer";
//#endregion

//#region Functions()
const globalHandler = () => {
  Config.roleCountByRoomByRole = {};
  Config.cpuUsedByRoomByRole = {};

  FunctionRunnerWithCpu(MemoryLoader, IsMemoryPathDefined("Memory.stats.cpu.headModules"), "loadMemory","=");

  if (!Memory.isFilled) FunctionRunnerWithoutCpu(GlobalMemory);
  else {
    // Creep handler //
    // Handles all creeps and runs their role
    FunctionRunnerWithCpu(GlobalCreepsHandler, IsMemoryPathDefined("Memory.stats.cpu.headModules"), "creeps","=");

    // Rooms handler //
    // Handles ALL global room related code
    FunctionRunnerWithCpu(GlobalAllRoomsHandler, IsMemoryPathDefined("Memory.stats.cpu.headModules"), "rooms","=");

    // Timers handler //
    // Handles all game timers and runs their code
    FunctionRunnerWithCpu(GlobalTimers, IsMemoryPathDefined("Memory.stats.cpu.headModules"), "timers","=");

    // Stats handler //
    // Handles all stats related memory
    FunctionRunnerWithCpu(GlobalStats, IsMemoryPathDefined("Memory.stats.cpu.headModules"), "stats","=");
  }

  // Set the ticks alive one tick higher
  Memory.stats["ticksAlive"]++;
};
// #endregion

//#region Export functions
export { globalHandler as GlobalHandler };
//#endregion
