//#region Require('./)
import {
  Config,
  GetRandomFreePos,
  FunctionRunnerWithCpu,
  IsMemoryPathDefined,
  RemoteRoomMemory,
  OwnedRoomStats,
  TowerHandler,
  RemoteRoomTimers,
  RemoteRoomStats
} from "../Utils/importer";
//#endregion

//#region Functions()
const remoteRoomHandler = (room: Room & MyRoom): void => {
  // Return if not enough space in the bucket to run remotes //
  if (Game.cpu.bucket <= Config.rooms.remote.minBucket) return;

  // Acces the flag for the room //
  const flag = Game.flags[room.name];

  // If no flag, make a new one and init the memory //
  if (!flag || Memory.flags[room.name] === undefined || !Memory.flags[room.name].isFilled) {
    if (!flag) {
      room.createFlag(
        room.controller ? room.controller.pos : GetRandomFreePos({ x: 0, y: 0, roomName: room.name }),
        room.name,
        COLOR_RED,
        COLOR_WHITE
      );
      //@ts-ignore
      Memory.flags[room.name] = {};
      //@ts-ignore
    } else if (Memory.flags[room.name] === undefined) Memory.flags[room.name] = {};
    else RemoteRoomTimers(room);
  } else {
    // Run room visuals for remoteRooms  //
    // FunctionRunnerWithCpu(, IsMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.headModules`), "visuals", room);

    // Run all timers for remoteRooms //
    FunctionRunnerWithCpu(
      RemoteRoomTimers,
      IsMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.headModules`),
      "timers","=",
      room
    );

    // Run all stats collector for remoteRooms //
    FunctionRunnerWithCpu(
      RemoteRoomStats,
      IsMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.headModules`),
      "stats", "=",
      room
    );
  }
};
//#endregion

//#region Export functions
export { remoteRoomHandler as RemoteRoomHandler };
//#endregion
