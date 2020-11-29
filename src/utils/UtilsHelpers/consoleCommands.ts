import _ from "lodash";

export class ConsoleCommands {
  public static init() {
    global.addRemoteRoom = this.addRemoteRoom;
  }

  public static addRemoteRoom = (spawnRoom: string | undefined, remoteRoom: string | undefined): void => {
    if (!spawnRoom) {
      console.log("SpawnRoom is not inputted, please try again");
      return;
    }
    else if (!remoteRoom) {
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
  };
}
