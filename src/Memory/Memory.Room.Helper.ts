//#region Require('./)
import _ from "lodash";
import { ALL_CREEP_ROLES, ALL_STRUCTURE_TYPES, MemoryApi_Room } from "Utils/importer/internals";
//#endregion

//#region Class
export class MemoryHelper_Room {
  public static updateRoomMemory(room: Room, isOwnedRoom: boolean): void {
    this.updateStructures(room);
    this.updateConstructionSites(room);
    this.updateMyCreeps(room);
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

  public static updateConstructionSites(room: Room): void {
    // If we have no vision of the room, return
    if (!room.memory) {
      return;
    }

    room.memory.constructionSites = { data: [], cache: null };

    const allConstructionSitesIds: string[] = room.find(FIND_CONSTRUCTION_SITES).map(c => c.id);

    room.memory.constructionSites.data = allConstructionSitesIds;
    room.memory.constructionSites.cache = Game.time;
  }

  public static updateMyCreeps(room: Room): void {
    // If we have no vision of the room, return
    if (!room.memory) {
      return;
    }

    room.memory.myCreeps = { data: {}, cache: null };

    const allCreeps: Creep[] = room.find(FIND_MY_CREEPS);
    const sortedCreepsIDs: StringMap = {};
    _.forEach(ALL_CREEP_ROLES, (role: string) => {
      sortedCreepsIDs[role] = _.map(
        _.remove(allCreeps, (c: Creep) => c.memory.role === role),
        (c: Creep) => c.memory.role
      );
    });

    room.memory.myCreeps!.data = sortedCreepsIDs;
    room.memory.myCreeps.cache = Game.time;
  }

  public static updateSourceStructures(room: Room): void {
    const roomMemory: RoomMemory = room.memory;
    // Check all source structures
    for (let i = 0; i < roomMemory.roomPlanner.room.sources.length; i++) {
      // Get source
      const source = roomMemory.roomPlanner.room.sources[i];

      // Break if there is still a live structure
      if (Game.getObjectById(source!.id!) === null) {
        // Get all structures at saved pos
        const structureExistResult = MemoryApi_Room.doesStructureExist(room, source.pos!, source.structureType!);

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

  public static updateAllLinksInMemory(room: Room): void {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = Memory.rooms[room.name];

    // Check all links to see if its still there //
    // Check each source for a link
    if (room.controller!.level >= 5) {
      const links: StructureLink[] = MemoryApi_Room.getStructuresOfType(room, STRUCTURE_LINK);
      for (let i = 0; i < roomMemory.commonMemory!.sources.length; i++) {
        // Get the source
        const source: Source | null = Game.getObjectById(roomMemory.commonMemory!.sources[i].id);

        // If source is not null
        if (source !== null) {
          // Find a link
          const sourceLink: StructureLink = source.pos.findInRange(links, 2)[0];

          // If a link is found, set it to the memory
          if (roomMemory.commonMemory!.links !== undefined && sourceLink !== undefined) {
            roomMemory.commonMemory!.links[`source${i}`] = sourceLink.id;
          }
        }
      }

      // Check if there is a link at the headSpawn
      const headSpawn: StructureSpawn | null = MemoryApi_Room.getHeadSpawn(room);
      if (headSpawn !== null) {
        // Find a link
        const spawnLink: StructureLink = headSpawn.pos.findInRange(links, 2)[0];

        // If a link is found, set it to the memory
        if (roomMemory.commonMemory!.links !== undefined && spawnLink !== undefined) {
          roomMemory.commonMemory!.links["head"] = spawnLink.id;
        }
      }

      // Check if there is a link at the controller
      // Find a link
      const controllerLink: StructureLink | undefined = room.controller?.pos.findInRange(links, 2)[0];

      // If a link is found, set it to the memory
      if (roomMemory.commonMemory!.links !== undefined && controllerLink !== undefined) {
        roomMemory.commonMemory!.links["controller"] = controllerLink.id;
      }
    }
  }

  public static updateMineralAmount(room: Room): void {
    const mineral: Mineral = room.find(FIND_MINERALS)[0];
    if (mineral) {
      room.memory.commonMemory!.mineral!.amount! = Math.round(room.find(FIND_MINERALS)[0].mineralAmount);
    } else {
      room.memory.commonMemory!.mineral!.amount! = 0;
    }
  }
}
//#endregion
