// #region Require('./)
import _ from 'lodash';
import {
  ALL_CREEP_MODULES,
  ALL_CREEP_ROLES,
  CONST_CACHE_TTL,
  CREEPS_CACHE_TTL,
  Config,
  DROPPED_RESOURCES_CACHE_TTL,
  MemoryApi_All,
  MemoryApi_Empire,
  MemoryHelper,
  MemoryHelper_Room,
  SCORE_CONTAINER_CACHE_TTL,
  STRUCT_CACHE_TTL
} from 'Utils/Importer/internals';
// #endregion

// #region Class
export class MemoryApi_Room {
  public static initRoomMemory(room: Room, roomType: string): void {
    if (room.memory.isSetup) {
      return;
    }

    Memory.stats.rooms[room.name] = {
      commonMemory: {},
      performance: { expenses: {}, income: {} },
      energyStored: {},
      spawnerEnergy: {},
      controller: {},
      cpu: {
        headModules: { creeps: {} },
        smallModules: {},
        creepModules: {},
        used: 0
      }
    };

    if (roomType === 'owned') {
      room.memory = {
        roomType: 'owned',
        commonMemory: {
          sourceCount: 0,
          mineral: { id: '', type: '', amount: 0 },
          sources: [],
          controllerLevel: 0,
          headSpawnId: '',
          energyStored: { usable: 0, capacity: 0 },
          controllerStorage: { usable: 0, id: undefined, type: undefined },
          links: {
            source0: '',
            source1: '',
            controller: '',
            head: ''
          }
        },
        roomPlanner: {
          room: { sources: [] },
          base: {
            type: undefined,
            midPos: { x: 0, y: 0, roomName: room.name }
          }
        },

        jobs: {
          constructionSites: [],
          energyStorages: [],
          damagedStructures: { data: [], hitsTarget: 250 * 1000 },
          damagedCreeps: [],
          spawnerEnergyStructures: [],
          enemies: {
            parts: {
              WORK: 0,
              ATTACK: 0,
              RANGED_ATTACK: 0,
              TOUGH: 0,
              HEAL: 0
            },
            creeps: []
          },
          droppedResources: []
        },
        remoteRooms: [],
        scoreContainerRooms: [],

        structures: { data: null, cache: null },
        constructionSites: { data: null, cache: null },
        myCreeps: { data: null, cache: null },
        droppedResources: { data: null, cache: null }
      };
    } else if (roomType === 'remote') {
      room.memory = {
        roomName: room.name,
        roomType: 'remote',
        commonMemory: {
          sources: [],
          sourceCount: 0,
          energyStored: { usable: 0, capacity: 0 },
          reserve: { TTL: 0, username: '' }
        },
        roomPlanner: {
          room: { sources: [] }
        },

        jobs: {
          constructionSites: [],
          energyStorages: [],
          damagedStructures: { data: [], hitsTarget: 250 * 1000 },
          damagedCreeps: [],
          enemies: {
            parts: {
              WORK: 0,
              ATTACK: 0,
              RANGED_ATTACK: 0,
              TOUGH: 0,
              HEAL: 0
            },
            creeps: []
          },
          droppedResources: []
        },
        structures: { data: null, cache: null },
        constructionSites: { data: null, cache: null },
        myCreeps: { data: null, cache: null },
        droppedResources: { data: null, cache: null }
      };
    } else if (roomType === 'score') {
      room.memory = {
        roomName: room.name,
        roomType: 'score',
        jobs: {
          constructionSites: [],
          energyStorages: [],
          damagedStructures: { data: [], hitsTarget: 250 * 1000 },
          damagedCreeps: [],
          enemies: {
            parts: {
              WORK: 0,
              ATTACK: 0,
              RANGED_ATTACK: 0,
              TOUGH: 0,
              HEAL: 0
            },
            creeps: []
          },
          droppedResources: []
        },
        structures: { data: null, cache: null },
        constructionSites: { data: null, cache: null },
        myCreeps: { data: null, cache: null },
        droppedResources: { data: null, cache: null },
        scoreContainers: { data: null, cache: null }
      };
    } else {
      return;
    }

    // Get objects to fill memory
    this.resetRoomMemory(room, roomType, true);
    MemoryHelper_Room.updateRoomMemory(room, roomType);

    room.memory.isSetup = true;
  }

  public static getStructures(room: Room, filterFunction?: (object: any) => boolean): Structure[] {
    // If we have no vision of the room, return an empty array
    if (!room.memory) {
      return [];
    }

    if (room.memory.structures === undefined || room.memory.structures.cache < Game.time - STRUCT_CACHE_TTL) {
      MemoryHelper_Room.updateStructures(room);
    }

    const structureIDs: string[] = [];
    // Flatten the object into an array of IDs
    for (const type in room.memory.structures.data) {
      const IDs = room.memory.structures.data[type];
      for (const singleID of IDs) {
        if (singleID) {
          structureIDs.push(singleID);
        }
      }
    }

    let structures: Structure[] = MemoryHelper.getOnlyObjectsFromIDs<Structure<StructureConstant>>(structureIDs);

    if (filterFunction !== undefined) {
      structures = _.filter(structures, filterFunction);
    }

    return structures;
  }

  /**
   * Get all structures based on a type and filter
   * @param room Room to check in
   * @param type A structure type
   * @param filterFunction A function to filter with
   */
  public static getStructuresOfType<T extends Structure>(
    room: Room,
    type: StructureConstant,
    filterFunction?: (object: any) => boolean
  ): T[] {
    // If we have no vision of the room, return an empty array
    if (!room.memory) {
      return [];
    }

    if (
      room.memory.structures === undefined ||
      room.memory.structures.data === null ||
      room.memory.structures.data[type] === undefined ||
      room.memory.structures.cache < Game.time - STRUCT_CACHE_TTL
    ) {
      MemoryHelper_Room.updateStructures(room);
    }

    const structureIDs: string[] = room.memory.structures.data[type];

    let structures: T[] = MemoryHelper.getOnlyObjectsFromIDs<T>(structureIDs);

    if (filterFunction !== undefined) {
      structures = _.filter(structures, filterFunction);
    }

    return structures;
  }

  public static getRandomFreePos(startPos: RoomPos): RoomPos {
    // Get the terrain of the Room //
    const terrain: RoomTerrain = Game.map.getRoomTerrain(startPos.roomName);
    const distance = 0;
    let x: number;
    let y: number;

    // Loop until a random non-wall position is found
    do {
      x = startPos.x + Math.floor(Math.random() * (distance * 2 + 1)) - distance;
      y = startPos.y + Math.floor(Math.random() * (distance * 2 + 1)) - distance;
    } while ((x + y) % 2 !== (startPos.x + startPos.y) % 2 || terrain.get(x, y) === TERRAIN_MASK_WALL);
    return new RoomPosition(x, y, startPos.roomName);
  }

  public static resetRoomTracking(room: Room): void {
    // Reset all creepModules
    Config.creepModuleCpuCost[room.name] = {};
    ALL_CREEP_MODULES.forEach(module => {
      Config.creepModuleCpuCost[room.name][module] = 0;
    });

    // Reset all role related memory
    Config.cpuUsedByRoomByRole[room.name] = {};
    ALL_CREEP_ROLES.forEach(role => {
      Config.cpuUsedByRoomByRole[room.name][role] = 0;
    });

    // Reset all expense/income tracking for this room
    Config.expenses.building[room.name] = 0;
    Config.expenses.repairing[room.name] = 0;
    Config.expenses.upgrading[room.name] = 0;
    Config.income.ownedHarvesting[room.name] = 0;
    Config.income.remoteHarvesting[room.name] = 0;

    Config.expenses.spawnExpenses[room.name] = {};
    ALL_CREEP_ROLES.forEach((role: string) => {
      Config.expenses.spawnExpenses[room.name][role] = 0;
    });
  }

  public static resetStatsMemory(roomName: string): void {
    Memory.stats.rooms[roomName] = {
      commonMemory: { creepCountByRole: {}, owned: {}, remote: {} },
      performance: { expenses: {}, income: {} },
      energyStored: {},
      spawnerEnergy: {},
      controller: {},
      cpu: {
        headModules: { creeps: {} },
        smallModules: {},
        creepModules: {},
        used: 0
      }
    };
  }

  public static resetRoomMemory(room: Room, roomType: string, forceUpdate?: boolean): void {
    // Acces the roomMemory of this room
    const roomMemory: RoomMemory = room.memory;

    // Set the sources array to a empty array
    const sources: { id: string; pos: RoomPos }[] = [];

    // Loop through each source and push the id and pos to the empty source array
    room.find(FIND_SOURCES).forEach(source => {
      sources.push({ id: source.id, pos: source.pos });
    });

    // Reset this room in the stats memory
    this.resetStatsMemory(room.name);

    // Set all commonMemory for a owned and remote room
    roomMemory.commonMemory! = {
      // Set the source length
      sourceCount: sources.length,
      // Set the id and pos of all sources to the memory of the room
      sources,
      // Set the energyStored to a 0 for both of the keys
      energyStored: { usable: 0, capacity: 0 }
    };

    if (roomType === 'owned') {
      roomMemory.commonMemory.mineral! = {
        // Get the id, type and amount from the mineral in this room
        id: room.find(FIND_MINERALS)[0] ? room.find(FIND_MINERALS)[0].id : '',
        type: room.find(FIND_MINERALS)[0] ? room.find(FIND_MINERALS)[0].mineralType : '',
        amount: room.find(FIND_MINERALS)[0] ? Math.round(room.find(FIND_MINERALS)[0].mineralAmount) : 0
      };
    }

    // Set the roomPlanner object to the template
    roomMemory.roomPlanner = { room: { sources: [] } };

    if (roomType === 'owned') {
      this.resetOwnedRoomMemory(room, forceUpdate);
    }
  }

  private static resetOwnedRoomMemory(room: Room, forceUpdate?: boolean): void {
    // Acces the roomMemory of this room
    const roomMemory: RoomMemory = room.memory;

    // Set the spawnerEnergy key to a empty object
    Memory.stats.rooms[room.name].spawnerEnergy = {};
    // Set the controller key to a empty object
    Memory.stats.rooms[room.name].controller = {};

    // Set the roomPlanner base key to a empty object
    roomMemory.roomPlanner!.base = {
      type: undefined,
      midPos: { x: 0, y: 0, roomName: room.name }
    };

    // Set the controller level to current controller level
    roomMemory.commonMemory!.controllerLevel = room.controller ? room.controller.level : undefined;

    // Set and get the headSpawnId
    roomMemory.commonMemory!.headSpawnId = this.getHeadSpawn(room) !== null ? this.getHeadSpawn(room)!.id : '';
    // Create a empty array for storing spawnEnergyStructures
    roomMemory.jobs.spawnerEnergyStructures = [];
    // Set the storage in the controller storage to 0
    roomMemory.commonMemory!.controllerStorage = {
      usable: 0,
      type: undefined,
      id: undefined
    };
    // Set all links to undefined
    roomMemory.commonMemory!.links = {
      source0: '',
      source1: '',
      head: '',
      controller: ''
    };
  }

  public static getUpgraderStructure(room: Room): StructureLink | StructureContainer | null {
    if (!room.controller) {
      return null;
    }
    let upgraderStructure: StructureLink | StructureContainer | null = null;
    if (room.memory.commonMemory?.controllerStorage) {
      upgraderStructure = Game.getObjectById(room.memory.commonMemory.controllerStorage.id!);
    }

    if (upgraderStructure !== null) {
      room.memory.commonMemory!.controllerStorage!.usable = upgraderStructure.store.energy;
      return upgraderStructure;
    }
    const upgraderStructureLink: StructureLink[] = this.getStructuresOfType(
      room,
      STRUCTURE_LINK,
      (str: StructureLink) => str.pos.inRangeTo(room.controller!, 3)
    );
    if (upgraderStructureLink.length > 0) {
      upgraderStructure = upgraderStructureLink[0];
      room.memory.commonMemory!.controllerStorage = {
        id: upgraderStructure.id,
        type: upgraderStructure.structureType,
        usable: upgraderStructure.store.getUsedCapacity(RESOURCE_ENERGY)
      };
    } else {
      const upgraderStructureContainer: StructureContainer[] = this.getStructuresOfType(
        room,
        STRUCTURE_CONTAINER,
        (str: StructureContainer) => str.pos.inRangeTo(room.controller!, 3)
      );
      if (upgraderStructureContainer.length > 0) {
        upgraderStructure = upgraderStructureContainer[0];
        room.memory.commonMemory!.controllerStorage = {
          id: upgraderStructure.id,
          type: upgraderStructure.structureType,
          usable: upgraderStructure.store.getUsedCapacity(RESOURCE_ENERGY)
        };
      } else {
        room.memory.commonMemory!.controllerStorage = {
          id: undefined,
          type: undefined,
          usable: 0
        };
      }
    }

    return upgraderStructure;
  }

  public static getAllConstructionSites(
    room: Room,
    filterFunction?: (object: Structure) => boolean
  ): ConstructionSite[] {
    {
      // If we have no vision of the room, return an empty array
      if (!room.memory) {
        return [];
      }

      if (
        room.memory.constructionSites === undefined ||
        room.memory.constructionSites.data === null ||
        room.memory.constructionSites.cache < Game.time - CONST_CACHE_TTL
      ) {
        MemoryHelper_Room.updateConstructionSites(room);
      }

      const structureIDs: string[] = room.memory.constructionSites.data;

      let structures: ConstructionSite[] = MemoryHelper.getOnlyObjectsFromIDs<ConstructionSite>(structureIDs);

      if (filterFunction !== undefined) {
        structures = _.filter(structures, filterFunction);
      }

      return structures;
    }
  }

  public static isRoomSetup(room: Room): boolean {
    if (!Game.flags[room.name]) {
      room.createFlag(
        room.controller
          ? room.controller.pos
          : (MemoryApi_Room.getRandomFreePos({
              x: 0,
              y: 0,
              roomName: room.name
            }) as RoomPosition),
        room.name,
        COLOR_RED,
        COLOR_WHITE
      );
      delete Memory.rooms[room.name];
      return false;
    }
    return true;
  }

  public static getMyCreeps(room: Room, filterFunction?: (object: Creep) => boolean): Creep[] {
    // If we have no vision of the room, return an empty array
    if (!room.memory) {
      return [];
    }

    if (
      room.memory.myCreeps === undefined ||
      room.memory.myCreeps.data === null ||
      room.memory.myCreeps.cache < Game.time - CREEPS_CACHE_TTL
    ) {
      MemoryHelper_Room.updateMyCreeps(room);
    }

    const creepsIDs: string[] = [];
    // Flatten the object into an array of IDs
    for (const type in room.memory.myCreeps.data) {
      const IDs = room.memory.myCreeps.data[type];
      for (const singleID of IDs) {
        if (singleID) {
          creepsIDs.push(singleID);
        }
      }
    }

    let creeps: Creep[] = MemoryHelper.getOnlyObjectsFromIDs<Creep>(creepsIDs);

    if (filterFunction !== undefined) {
      creeps = _.filter(creeps, filterFunction);
    }

    return creeps;
  }

  public static getMyCreepsOfType(room: Room, type: string, filterFunction?: (object: any) => boolean): Creep[] {
    // If we have no vision of the room, return an empty array
    if (!room.memory) {
      return [];
    }

    if (
      room.memory.myCreeps === undefined ||
      room.memory.myCreeps.data === null ||
      room.memory.myCreeps.data[type] === undefined ||
      room.memory.myCreeps.cache < Game.time - CREEPS_CACHE_TTL
    ) {
      MemoryHelper_Room.updateMyCreeps(room);
    }

    const creepIds: string[] = room.memory.myCreeps.data[type];

    let creeps: Creep[] = MemoryHelper.getOnlyObjectsFromIDs(creepIds);

    if (filterFunction !== undefined) {
      creeps = _.filter(creeps, filterFunction);
    }

    return creeps;
  }

  public static getHeadSpawn(room: Room): StructureSpawn | null {
    if (Game.getObjectById(room.memory.commonMemory!.headSpawnId!) === null) {
      const updateHeadSpawnInMem = (spawn: StructureSpawn) => {
        room.memory.commonMemory!.headSpawnId! = spawn.id;
      };

      // Get all spawns and filter them on spawns not spawning
      const spawns: StructureSpawn[] = MemoryApi_Room.getStructuresOfType(room, STRUCTURE_SPAWN);
      const headSpawn: StructureSpawn[] | null = room.terminal! ? room.terminal!.pos.findInRange(spawns, 2) : null;
      if (headSpawn !== null && headSpawn[0]) {
        updateHeadSpawnInMem(headSpawn[0]);
        return headSpawn[0];
      }
      if (spawns.length === 1) {
        updateHeadSpawnInMem(spawns[0]);
        return spawns[0];
      }
      return null;
    }
    return Game.getObjectById(room.memory.commonMemory!.headSpawnId!);
  }

  public static doesStructureExist(room: Room, pos: RoomPos, structureType: string): [boolean, string] {
    // Get all structure at input position
    const structures = room.lookForAt(LOOK_STRUCTURES, pos.x, pos.y);

    // Loop through all structures
    for (const structure of structures) {
      // Is the structure type the Structure
      if (structure.structureType === structureType) {
        return [true, structure.id];
      }
    }
    return [false, ''];
  }

  public static getRemoteRooms(
    room: Room,
    filterFunction?: (object: RoomMemory) => boolean,
    targetRoom?: string
  ): string[] {
    if (Memory.rooms[room.name] === undefined || Memory.rooms[room.name]!.remoteRooms === undefined) {
      return [];
    }

    let remoteRooms: string[] = room.memory.remoteRooms!;

    // TargetRoom parameter provided
    if (targetRoom !== undefined) {
      remoteRooms = _.filter(remoteRooms, (roomName: string) => roomName === targetRoom);
    }

    if (filterFunction !== undefined) {
      // No target room provided, just return them all
      remoteRooms = _.filter(remoteRooms, filterFunction);
    }

    return remoteRooms;
  }

  public static getScoreContainerRooms(
    room: Room,
    filterFunction?: (object: RoomMemory) => boolean,
    targetRoom?: string
  ) {
    if (Memory.rooms[room.name] === undefined || Memory.rooms[room.name]!.remoteRooms === undefined) {
      return [];
    }

    let scoreContainerRooms: string[] = room.memory.scoreContainerRooms!;

    // TargetRoom parameter provided
    if (targetRoom !== undefined) {
      scoreContainerRooms = _.filter(scoreContainerRooms, (roomName: string) => roomName === targetRoom);
    }

    if (filterFunction !== undefined) {
      // No target room provided, just return them all
      scoreContainerRooms = _.filter(scoreContainerRooms, filterFunction);
    }

    return scoreContainerRooms;
  }

  public static getVisibleDependentRooms(): Room[] {
    const ownedRooms: Room[] = MemoryApi_Empire.getOwnedRooms();
    const roomNames: string[] = [];
    _.forEach(ownedRooms, (room: Room) => {
      // Collect the room names for dependent rooms
      _.forEach(MemoryApi_Room.getRemoteRooms(room), (roomName: string) => roomNames.push(roomName));
      _.forEach(MemoryApi_Room.getScoreContainerRooms(room), (roomName: string) => roomNames.push(roomName));
    });

    // Return all visible rooms which appear in roomNames array
    return _.filter(Game.rooms, (room: Room) => roomNames.includes(room.name));
  }

  public static getDroppedResources(room: Room, filterFunction?: (object: any) => boolean): Resource[] {
    // If we have no vision of the room, return an empty array
    if (!room.memory) {
      return [];
    }

    if (
      room.memory.droppedResources === undefined ||
      room.memory.droppedResources.cache < Game.time - DROPPED_RESOURCES_CACHE_TTL
    ) {
      MemoryHelper_Room.updateDroppedResources(room);
    }

    const resourceIDs: string[] = room.memory.droppedResources.data;

    let resources: Resource[] = MemoryHelper.getOnlyObjectsFromIDs<Resource<ResourceConstant>>(resourceIDs);

    if (filterFunction !== undefined) {
      resources = _.filter(resources, filterFunction);
    }

    return resources;
  }

  public static getRoomType(room: Room): string {
    return room.memory.roomType!;
  }

  public static checkIfScoreContainerRoomIsFinished(room: Room, spawnRoom: Room): void {
    const scoreContainerJobs = room.memory.jobs.scoreContainers!;
    if (scoreContainerJobs.length === 0 && MemoryApi_All.executeEachTicks(10)) {
      const index = spawnRoom.memory.scoreContainerRooms!.indexOf(room.name);
      if (index > -1) {
        spawnRoom.memory.scoreContainerRooms!.splice(index, 1);
      }
    }
  }

  public static getSpawnRoomOfDependentRoom(room: Room): Room | null {
    const ownedRooms: Room[] = MemoryApi_Empire.getOwnedRooms();
    let spawnRoom: Room | null = null;
    _.forEach(ownedRooms, (r: Room): void | Room => {
      const indexRemote: number = r.memory.remoteRooms!.indexOf(room.name);
      const indexScoreContainer: number = r.memory.scoreContainerRooms!.indexOf(room.name);
      if (indexRemote > -1 || indexScoreContainer > -1) {
        spawnRoom = r;
      }
    });

    return spawnRoom;
  }

  public static getScoreContainers(room: Room, filterFunction?: (object: any) => boolean): any[] {
    // If we have no vision of the room, return an empty array
    if (!room.memory) {
      return [];
    }

    if (
      room.memory.scoreContainers === undefined ||
      room.memory.scoreContainers.cache < Game.time - SCORE_CONTAINER_CACHE_TTL
    ) {
      MemoryHelper_Room.updateScoreContainers(room);
    }

    const scoreContainersIDs: string[] = room.memory.droppedResources.data;

    let scoreContainers: any[] = MemoryHelper.getOnlyObjectsFromIDs<any>(scoreContainersIDs);

    if (filterFunction !== undefined) {
      scoreContainers = _.filter(scoreContainers, filterFunction);
    }

    return scoreContainers;
  }
}
// #endregion
