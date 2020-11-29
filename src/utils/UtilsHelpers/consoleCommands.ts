import _ from "lodash";

export class ConsoleCommands {
  public static init() {
    global.addRemoteRoom = this.addRemoteRoom;
    global.help = this.help;
  }

  public static addRemoteRoom(spawnRoom: string | undefined, remoteRoom: string | undefined): void {
    if (!spawnRoom) {
      console.log("SpawnRoom is not inputted, please try again");
      return;
    } else if (!remoteRoom) {
      console.log("RemoteRoom is not inputted, please try again");
      return;
    }

    try {
      const spawnRoomMemory: RoomMemory = Memory.rooms[spawnRoom];
      spawnRoomMemory.remoteRooms!.push(remoteRoom);
    } catch (err) {
      console.log("There went something wrong adding the remoteRoom to the spawnRoom");
      return;
    }

    console.log("RemoteRoom added successfully to spawnRoom");
    return;
  }

  public static help(): void {
    console.log("All commands:");
    console.log("------------------------------------------------");
    console.log("global.addRemoteRoom(spawnRoom: string, remoteRoom: string)");
    console.log("This command will add a roomName to the spawnRoom remotes list.");
    console.log("End of command list");
  }
}
