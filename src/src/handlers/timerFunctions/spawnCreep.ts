//#region Require('./)
// import { Config, SpawnCreep } from "../../utils/importer";
import { Config, SpawnCreep } from "../../Utils/importer/internals";
//#endregion

//#region Functions()
const runSpawnCreep = (room: Room & MyRoom) => {
  // Create a acces point to the flagMemory //
  const flagMemory: FlagMemory = Memory.flags[room.name];

  const lastRole = SpawnCreep(room, "owned", { roleCount: Config.roleCountByRoomByRole[room.name] });

  // if (lastRole === "end") {
  //   if (flagMemory.remotes.rooms.length > 0) {
  //     let continueLoop = true;
  //     flagMemory.remotes.rooms.forEach(remoteRoomName => {
  //       const remoteRoom = Game.rooms[remoteRoomName];

  //       // TODO doesn't do anything when remoteRoom is null
  //       if (remoteRoom !== null && continueLoop) {
  //         const remoteLastRole = SpawnCreep.execute(
  //           room,
  //           "remote",
  //           { target: remoteRoom.name },
  //           Config.roleCountByRoomByRole[remoteRoom.name]
  //         );
  //         if (remoteLastRole === "end") continueLoop = false;
  //       }
  //     });
  //   }
  // }
};
//#endregion

//#region Export functions
export { runSpawnCreep as RunSpawnCreep };
//#endregion
