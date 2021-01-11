// #region Require('./)
import {} from 'Utils/Importer/internals';
// #endregion

// #region Class
export class CreepRoleScout {
  public static scout(creep: Creep): void {
    const spawnRoom: Room = Game.rooms[creep.memory.spawnRoom];
    const targetRoom: Room = Game.rooms[creep.memory.targetRoom];
    const targetRoomName: string = creep.memory.targetRoom;

    // const isRoomTypeRight = (oldType: string, newType: string): void => {
    //   if (oldType !== newType) {
    //     Game.flags[targetRoomName].remove();
    //   }
    // };

    if (targetRoom.memory.roomType) {
      if (spawnRoom.memory.remoteRooms && spawnRoom.memory.remoteRooms.includes(targetRoomName)) {
        targetRoom.memory.roomType = 'remote';
      } else {
        targetRoom.memory.roomType = 'none';
      }
    } else if (spawnRoom.memory.remoteRooms && spawnRoom.memory.remoteRooms.includes(targetRoomName)) {
      targetRoom.memory.roomType = 'remote';
    } else {
      targetRoom.memory.roomType = 'none';
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
// #endregion
