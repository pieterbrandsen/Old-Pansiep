//#region Require('./)
import { Config, OwnedRoomHandler, RemoteRoomHandler, FunctionRunnerWithCpu, IsMemoryPathDefined } from '../Utils/importer';
//#endregion

//#region Functions()
const allRoomsHandler = ():void => {
  // Return if not enough space in the bucket to run rooms //
  if (Game.cpu.bucket <= Config.rooms.minBucket) return;

  // Timers through all rooms with vision in them.
  _.forEach(Object.keys(Game.rooms), (roomName) => {
    const room = Game.rooms[roomName];
    if (!Config.expenses.spawnExpenses[roomName]) Config.expenses.spawnExpenses[roomName] = {};
    Config.allRoles.forEach((role:any) => {
      Config.expenses.spawnExpenses[roomName][role] = 0;
    });

    // Run room handlers //
    if (room.controller && room.controller.my) FunctionRunnerWithCpu(OwnedRoomHandler, IsMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu`),"used",room);
    else if (
      room.controller &&
      room.controller.reservation &&
      room.controller.reservation.username === Config.username
    ) {
      FunctionRunnerWithCpu(RemoteRoomHandler, IsMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu`),"used",room);
    }
  });
};
//#endregion

//#region Export functions
export {allRoomsHandler as GlobalAllRoomsHandler};
//#endregion

