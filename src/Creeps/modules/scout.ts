//#region Require('./)
import { Config } from "Utils/importer/internals";
//#endregion

//#region Class
export class CreepRole_Scout {
  public static scout(creep: Creep) {
    const spawnRoom: Room = Game.rooms[creep.memory.spawnRoom];
    const targetRoom: Room = Game.rooms[creep.memory.targetRoom];
    const targetRoomName: string = creep.memory.targetRoom;

    const isRoomTypeRight = (oldType: string, newType: string): void => {
      if (oldType === newType) {
        return;
      } else {
        Game.flags[targetRoomName].remove();
      }
    };
    if (targetRoom.memory.roomType) {
      if (spawnRoom.memory.scoreContainerRooms!.includes(targetRoomName)) {
        isRoomTypeRight(targetRoom.memory.roomType, "score");
      } else if (spawnRoom.memory.remoteRooms!.includes(targetRoomName)) {
        targetRoom.memory.roomType = "remote";
      } else {
        targetRoom.memory.roomType = "none";
      }
    } else {
      if (spawnRoom.memory.scoreContainerRooms!.includes(targetRoomName)) {
        targetRoom.memory.roomType = "score";
      } else if (spawnRoom.memory.remoteRooms!.includes(targetRoomName)) {
        targetRoom.memory.roomType = "remote";
      } else {
        targetRoom.memory.roomType = "none";
      }
    }

    if (!creep.pos.inRangeTo(25, 25, 20)) {
      if (creep.room.controller) {
        creep.moveTo(creep.room.controller);
      } else {
        creep.moveTo(25, 25);
      }
    }
  }
}
//#endregion
