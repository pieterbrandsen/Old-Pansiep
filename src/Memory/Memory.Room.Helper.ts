// #region Require('./)
import {
  ALL_CREEP_ROLES,
  ALL_STRUCTURE_TYPES,
  JobsHelper,
  MemoryApiRoom,
  OldRoomPlanner
} from 'Utils/Importer/internals';
import _ from 'lodash';
// #endregion

// #region Class
export class MemoryHelperRoom {
  public static updateRoomMemory(room: Room, roomType: string): void {
    this.updateStructures(room);
    this.updateConstructionSites(room);
    this.updateMyCreeps(room);

    if (roomType === 'owned') {
      JobsHelper.updateAllSpawnerEnergyStructuresJobs(room);
      OldRoomPlanner.basePlanner(room);
    }
    if (roomType === 'owned' || roomType === 'remote') {
      OldRoomPlanner.roomPlanner(room);
      MemoryHelperRoom.updateSourceStructures(room);
      JobsHelper.updateAllEnergyStoragesJobs(room);
    }

    JobsHelper.updateAllHostileCreepsJobs(room);
    JobsHelper.updateAllDamagedCreepsJobs(room);
    JobsHelper.updateAllConstructionSitesJobs(room);
    JobsHelper.updateAllDamagedStructuresJobs(room);
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

    const allCreeps: Creep[] = _.filter(Game.creeps, creep => creep.memory.targetRoom === room.name);
    const sortedCreepsIDs: StringMap = {};
    _.forEach(ALL_CREEP_ROLES, (role: string) => {
      sortedCreepsIDs[role] = _.map(
        _.remove(allCreeps, (c: Creep) => c.memory.role === role),
        (c: Creep) => c.id
      );
    });

    room.memory.myCreeps.data = sortedCreepsIDs;
    room.memory.myCreeps.cache = Game.time;
  }

  public static updateSourceStructures(room: Room): void {
    const roomMemory: RoomMemory = room.memory;
    // Check all source structures

    if (!roomMemory.roomPlanner) {
      return;
    }

    for (const source of roomMemory.roomPlanner.room.sources) {
      // Break if there is still a live structure
      if (source.pos && source.id && Game.getObjectById(source.id) === null && source.structureType) {
        // Get all structures at saved pos
        const structureExistResult = MemoryApiRoom.doesStructureExist(room, source.pos, source.structureType);

        // If structure was found
        if (structureExistResult[0]) {
          // Save the id back to memory
          source.id = structureExistResult[1];
        } else {
          // Remove id from memory if its removed
          source.id = undefined;
        }
      }
    }
  }

  public static updateAllLinksInMemory(room: Room): void {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = Memory.rooms[room.name];

    // Check all links to see if its still there //
    // Check each source for a link
    if (room.controller && room.controller.level >= 5 && roomMemory.commonMemory) {
      const links: StructureLink[] = MemoryApiRoom.getStructuresOfType(room, STRUCTURE_LINK);
      for (let i = 0; i < roomMemory.commonMemory.sources.length; i++) {
        // Get the source
        const source: Source | null = Game.getObjectById(roomMemory.commonMemory.sources[i].id);

        // If source is not null
        if (source !== null) {
          // Find a link
          const sourceLink: StructureLink = source.pos.findInRange(links, 2)[0];

          // If a link is found, set it to the memory
          if (roomMemory.commonMemory.links !== undefined && sourceLink !== undefined) {
            roomMemory.commonMemory.links[`source${i}`] = sourceLink.id;
          }
        }
      }

      // Check if there is a link at the headSpawn
      const headSpawn: StructureSpawn | null = MemoryApiRoom.getHeadSpawn(room);
      if (headSpawn !== null) {
        // Find a link
        const spawnLink: StructureLink = headSpawn.pos.findInRange(links, 2)[0];

        // If a link is found, set it to the memory
        if (roomMemory.commonMemory.links !== undefined && spawnLink !== undefined) {
          roomMemory.commonMemory.links.head = spawnLink.id;
        }
      }

      // Check if there is a link at the controller
      // Find a link
      const controllerLink: StructureLink | undefined = room.controller?.pos.findInRange(links, 2)[0];

      // If a link is found, set it to the memory
      if (roomMemory.commonMemory.links !== undefined && controllerLink !== undefined) {
        roomMemory.commonMemory.links.controller = controllerLink.id;
      }
    }
  }

  public static updateMineralAmount(room: Room): void {
    const mineral: Mineral = room.find(FIND_MINERALS)[0];
    if (room.memory.commonMemory && room.memory.commonMemory.mineral) {
      if (mineral) {
        room.memory.commonMemory.mineral.amount = Math.round(room.find(FIND_MINERALS)[0].mineralAmount);
      } else {
        room.memory.commonMemory.mineral.amount = 0;
      }
    }
  }

  public static updateDroppedResources(room: Room): void {
    // If we have no vision of the room, return
    if (!room.memory) {
      return;
    }

    room.memory.droppedResources = { data: [], cache: null };

    const allDroppedResourceIds: string[] = room.find(FIND_DROPPED_RESOURCES).map(c => c.id);

    room.memory.droppedResources.data = allDroppedResourceIds;
    room.memory.droppedResources.cache = Game.time;
  }
}
// #endregion
