//#region Require('./)
import _ from "lodash";
import { MemoryApi_All, Config, OldRoomPlanner, TimerHelper_Functions } from "Utils/importer/internals";
//#endregion

//#region Class
export class TimerManager {
  /**
   * Run spawning logic in a room
   * @param room Room to run spawning in
   */
  public static runTimerForRoom(room: Room, forceUpdate?: boolean): void {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = Memory.rooms[room.name];

    // Run RoomPlanner if the ExecuteEachTicks returns true;
    if (MemoryApi_All.executeEachTicks(Config.rooms.loops.roomPlanner.room) || forceUpdate) {
      MemoryApi_All.functionRunnerWithCpu(
        OldRoomPlanner.roomPlanner,
        MemoryApi_All.isMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.smallModules`),
        "roomPlanner",
        "=",
        room
      );
    } else if (MemoryApi_All.isMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.smallModules`) !== undefined) {
      MemoryApi_All.memoryAverager(Memory.stats.rooms[room.name].cpu.smallModules["roomPlanner"], 0);
    }

    // Run GetHostileCreeps if the ExecuteEachTicks returns true;
    if (MemoryApi_All.executeEachTicks(Config.rooms.loops.getHostileCreeps) || forceUpdate) {
      MemoryApi_All.functionRunnerWithCpu(
        TimerHelper_Functions.getHostileCreeps,
        MemoryApi_All.isMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.smallModules`),
        "getHostileCreeps",
        "=",
        room
      );
    } else if (MemoryApi_All.isMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.smallModules`) !== undefined) {
      Memory.stats.rooms[room.name].cpu.smallModules["getHostileCreeps"] = 0;
    }

    // Run GlobalRoomStructureNullChecker if the ExecuteEachTicks returns true;
    if (MemoryApi_All.executeEachTicks(Config.rooms.loops.structureNullChecker) || forceUpdate) {
      MemoryApi_All.functionRunnerWithCpu(
        TimerHelper_Functions.globalRoomStructureNullChecker,
        MemoryApi_All.isMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.smallModules`),
        "globalRoomStructureNullChecker",
        "=",
        room
      );
    } else if (MemoryApi_All.isMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.smallModules`) !== undefined) {
      MemoryApi_All.memoryAverager(Memory.stats.rooms[room.name].cpu.smallModules["globalRoomStructureNullChecker"], 0);
    }

    // Run BasePlanner if the ExecuteEachTicks returns true;
    if (MemoryApi_All.executeEachTicks(Config.rooms.loops.roomPlanner.base) || forceUpdate) {
      MemoryApi_All.functionRunnerWithCpu(
        OldRoomPlanner.basePlanner,
        MemoryApi_All.isMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.smallModules`),
        "basePlanner",
        "=",
        room
      );
    } else if (MemoryApi_All.isMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.smallModules`) !== undefined) {
      MemoryApi_All.memoryAverager(Memory.stats.rooms[room.name].cpu.smallModules["basePlanner"], 0);
    }

    // Run GetSpawnEnergyStructures if the ExecuteEachTicks returns true;
    if (MemoryApi_All.executeEachTicks(Config.rooms.loops.getSpawnEnergyStructures) || forceUpdate) {
      MemoryApi_All.functionRunnerWithCpu(
        TimerHelper_Functions.getSpawnEnergyStructures,
        MemoryApi_All.isMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.smallModules`),
        "getSpawnEnergyStructures",
        "=",
        room
      );
    } else if (MemoryApi_All.isMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.smallModules`) !== undefined) {
      MemoryApi_All.memoryAverager(Memory.stats.rooms[room.name].cpu.smallModules["getSpawnEnergyStructures"], 0);
    }

    // Run OwnedRoomStructureNullChecker if the ExecuteEachTicks returns true;
    if (MemoryApi_All.executeEachTicks(Config.rooms.loops.structureNullChecker) || forceUpdate) {
      MemoryApi_All.functionRunnerWithCpu(
        TimerHelper_Functions.ownedRoomStructureNullChecker,
        MemoryApi_All.isMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.smallModules`),
        "ownedRoomStructureNullChecker",
        "=",
        room
      );
    } else if (MemoryApi_All.isMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.smallModules`) !== undefined) {
      MemoryApi_All.memoryAverager(Memory.stats.rooms[room.name].cpu.smallModules["ownedRoomStructureNullChecker"], 0);
    }
  }
}
//#endregion
