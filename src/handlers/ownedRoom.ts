//#region Require('./)
import {
  Config,
  GetRandomFreePos,
  FunctionRunnerWithCpu,
  IsMemoryPathDefined,
  OwnedRoomMemory,
  OwnedRoomStats,
  TowerHandler,
  OwnedRoomTimers
} from "../Utils/importer";
//#endregion

//#region Functions()
const ownedRoomHandler = (room: Room & MyRoom): void => {
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
    } else if (Memory.flags[room.name] === undefined) Memory.flags[room.name] = {};
    else OwnedRoomMemory(room);
  } else {
    // Run room visuals for ownedRooms  //
    // FunctionRunnerWithCpu(, IsMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.headModules`), "visuals", room);

    // Run all timers for ownedRooms //
    FunctionRunnerWithCpu(
      OwnedRoomTimers,
      IsMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.headModules`),
      "timers","=",
      room
    );

    // Run all towers for ownedRooms //
    FunctionRunnerWithCpu(
      TowerHandler,
      IsMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.headModules`),
      "towers","=",
      room
    );

    // Run all stats collector for ownedRooms //
    FunctionRunnerWithCpu(
      OwnedRoomStats,
      IsMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.headModules`),
      "stats","=",
      room
    );
  }
};
//#endregion

//#region Export functions
export { ownedRoomHandler as OwnedRoomHandler };
//#endregion
