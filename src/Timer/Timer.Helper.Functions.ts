//#region Require('./)
import { Config, MemoryApi_All, MemoryApi_Room } from "Utils/importer/internals";
//#endregion

//#region Class
export class TimerHelper_Functions {
  public static globalRoomStructureNullChecker(room: Room) {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = Memory.rooms[room.name];

    // Check all structures at input position
    const structureExist = (pos: RoomPos, structureType: string): [boolean, string] => {
      // Get all structure at input position
      const structures = room.lookForAt(LOOK_STRUCTURES, pos.x, pos.y);

      // Loop through all structures
      for (const structure of structures) {
        // Is the structure type the Structure
        if (structure.structureType === structureType) {
          return [true, structure.id];
        }
      }
      return [false, ""];
    };

    // Check all source structures
    for (let i = 0; i < roomMemory.roomPlanner.room.sources.length; i++) {
      // Get source
      const source = roomMemory.roomPlanner.room.sources[i];

      // Break if there is still a live structure
      if (Game.getObjectById(source!.id!) === null) {
        // Get all structures at saved pos
        const structureExistResult = structureExist(source.pos!, source.structureType!);

        // If structure was found
        if (structureExistResult[0]) {
          // Save the id back to memory
          roomMemory.roomPlanner.room.sources[i].id = structureExistResult[1];
        } else {
          // Remove id from memory if its removed
          roomMemory.roomPlanner.room.sources[i].id = undefined;
        }
      }
    }
  }

  public static ownedRoomStructureNullChecker(room: Room) {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = Memory.rooms[room.name];

    // Check all links to see if its still there //
    // Check each source for a link
    if (room.controller!.level >= 5) {
      for (let i = 0; i < roomMemory.commonMemory.sources.length; i++) {
        // Get the source
        const source: Source | null = Game.getObjectById(roomMemory.commonMemory.sources[i].id);

        // If source is not null
        if (source !== null) {
          // Find a link
          const sourceLink = source.pos.findInRange(FIND_MY_STRUCTURES, 2, {
            filter: { structureType: STRUCTURE_LINK }
          })[0];

          // If a link is found, set it to the memory
          if (roomMemory.commonMemory.links !== undefined && sourceLink !== undefined) {
            roomMemory.commonMemory.links[`source${i}`] = sourceLink.id;
          }
        }
      }

      // Check if there is a link at the headSpawn
      const headSpawn: StructureSpawn | null = MemoryApi_Room.getHeadSpawn(room);
      if (headSpawn !== null) {
        // Find a link
        const spawnLink = headSpawn.pos.findInRange(FIND_MY_STRUCTURES, 2, {
          filter: { structureType: STRUCTURE_LINK }
        })[0];

        // If a link is found, set it to the memory
        if (roomMemory.commonMemory.links !== undefined && spawnLink !== undefined) {
          roomMemory.commonMemory.links["head"] = spawnLink.id;
        }
      }

      // Check if there is a link at the controller
      // Find a link
      const controllerLink = room.controller?.pos.findInRange(FIND_MY_STRUCTURES, 2, {
        filter: { structureType: STRUCTURE_LINK }
      })[0];

      // If a link is found, set it to the memory
      if (roomMemory.commonMemory.links !== undefined && controllerLink !== undefined) {
        roomMemory.commonMemory.links["controller"] = controllerLink.id;
      }
    }

    // Set amount of mineral to the roomMemory
    // @ts-ignore
    roomMemory.commonMemory.mineral.amount = room.find(FIND_MINERALS)[0]
      ? Math.round(room.find(FIND_MINERALS)[0].mineralAmount)
      : undefined;
  }
}
//#endregion
