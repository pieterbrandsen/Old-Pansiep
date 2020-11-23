//#region Require('./)
import _ from "lodash";
import { ALL_STRUCTURE_TYPES } from "Utils/importer/internals";
//#endregion

//#region Class
export class MemoryHelper_Room {
  public static updateRoomMemory(room: Room, isOwnedRoom: boolean): void {
    this.updateStructures(room);
    if (isOwnedRoom) {
      // All ownedRoom memory updating
    }
  }

  public static updateStructures(room: Room): void {
    // If we have no vision of the room, return
    if (!room.memory) {
      return;
    }

    room.memory.structures = { data: {}, cache: null };

    const allStructures: Structure[] = room.find(FIND_STRUCTURES) as Structure[];
    const sortedStructureIDs: StringMap = {};
    // For each structureType, remove the structures from allStructures and map them to ids in the memory object.
    _.forEach(ALL_STRUCTURE_TYPES, (type: StructureConstant) => {
      sortedStructureIDs[type] = _.map(
        _.remove(allStructures, (struct: Structure) => struct.structureType === type),
        (struct: Structure) => struct.id
      );
    });

    room.memory.structures.data = sortedStructureIDs;
    room.memory.structures.cache = Game.time;
  }
}
//#endregion
