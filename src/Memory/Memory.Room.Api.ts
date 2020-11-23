//#region Require('./)
import _ from "lodash";
import { Config, MemoryApi_All, TimerManager, MemoryHelper_Room, MemoryHelper, STRUCT_CACHE_TTL } from "Utils/importer/internals";
//#endregion

//#region Class
export class MemoryApi_Room {
  public static initRoomMemory(room: Room, isOwnedRoom: boolean): void {
    if (Memory.rooms[room.name]) {
      return;
    }

    Memory.stats.rooms[room.name] = {
      commonMemory: {},
      performance: { expenses: {}, income: {} },
      energyStored: {},
      spawnerEnergy: {},
      controller: {},
      cpu: { headModules: { creeps: {} }, smallModules: {}, creepModules: {} }
    };

    if (isOwnedRoom) {
      room.memory = {
        commonMemory: {
          sourceCount: 0,
          mineral: { id: "", type: "", amount: 0 },
          sources: [],
          constructionSites: [],
          energyStructures: [],
          repair: { targets: [], hitsTarget: 250 * 1000 },
          controllerLevel: 0,
          headSpawnId: "",
          spawnEnergyStructures: [],
          energyStored: { usable: 0, capacity: 0 },
          controllerStorage: { usable: 0, id: "", type: "" },
          links: { source0: "", source1: "", controller: "", head: "" }
        },
        roomPlanner: {
          room: { sources: [] },
          base: { type: undefined, midPos: { x: 0, y: 0, roomName: room.name } }
        },
        enemies: {
          parts: { WORK: 0, ATTACK: 0, RANGED_ATTACK: 0, TOUGH: 0, HEAL: 0 },
          creeps: []
        },
        damagedCreeps: [],
        remotes: { totalSourceCount: 0, rooms: [] },
        structures: {data: null, cache: null}
      };
    }

    // Get objects to fill memory
    this.resetRoomMemory(room, true, isOwnedRoom);
    MemoryHelper_Room.updateRoomMemory(room, isOwnedRoom);
  }

  public static getStructures<T extends Structure>(
    room: Room,
    type: StructureConstant,
    filterFunction?: (object: T) => boolean,
    forceUpdate?: boolean
): T[] {
    // If we have no vision of the room, return an empty array
    if (!room.memory) {
        return [];
    }

    if (
        forceUpdate ||
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

  /**
   * Get all structures based on a type and filter
   * @param room Room to check in
   * @param type A structure type
   * @param filterFunction A function to filter with
   */
  public static getStructuresOfType(
    room: Room,
    type: StructureConstant,
    filterFunction?: (object: any) => boolean,
    forceUpdate?: boolean
  ): Structure[] {
        // If we have no vision of the room, return an empty array
        if (!room.memory) {
          return [];
      }
  
      if (
          forceUpdate ||
          room.memory.structures === undefined ||
          room.memory.structures.data === null ||
          room.memory.structures.data[type] === undefined ||
          room.memory.structures.cache < Game.time - STRUCT_CACHE_TTL
      ) {
          MemoryHelper_Room.updateStructures(room);
      }

      const structureIDs: string[] = room.memory.structures.data[type];

      let structures: Structure[] = MemoryHelper.getOnlyObjectsFromIDs<Structure>(structureIDs);

      if (filterFunction !== undefined) {
          structures = _.filter(structures, filterFunction);
      }

      return structures;
  }

  public static getRandomFreePos(startPos: RoomPos): RoomPos {
    // Get the terrain of the Room //
    const terrain: RoomTerrain = Game.map.getRoomTerrain(startPos.roomName);
    const distance: number = 0;
    let x: number;
    let y: number;

    // Loop until a random non-wall position is found
    do {
      x = startPos.x + Math.floor(Math.random() * (distance * 2 + 1)) - distance;
      y = startPos.y + Math.floor(Math.random() * (distance * 2 + 1)) - distance;
    } while ((x + y) % 2 !== (startPos.x + startPos.y) % 2 || terrain.get(x, y) === TERRAIN_MASK_WALL);
    return new RoomPosition(x, y, startPos.roomName);
  }

  public static updateConstructionSites(room: Room): void {
    room.memory.commonMemory.constructionSites = room.find(FIND_CONSTRUCTION_SITES).map(c => c.id);
  }

  public static resetRoomTracking(room: Room): void {
    // Reset all creepModules
    Config.creepModuleCpuCost[room.name] = {};
    Config.allCreepModules.forEach(module => {
      Config.creepModuleCpuCost[room.name][module] = 0;
    });

    // Reset all role related memory
    Config.roleCountByRoomByRole[room.name] = {};
    Config.cpuUsedByRoomByRole[room.name] = {};
    Config.allRoles.forEach(role => {
      Config.roleCountByRoomByRole[room.name][role] = 0;
      Config.cpuUsedByRoomByRole[room.name][role] = 0;
    });

    // Reset all expense/income tracking for this room
    Config.expenses.building[room.name] = 0;
    Config.expenses.repairing[room.name] = 0;
    Config.expenses.upgrading[room.name] = 0;
    Config.income.ownedHarvesting[room.name] = 0;
    Config.income.remoteHarvesting[room.name] = 0;

    Config.expenses.spawnExpenses[room.name] = {};
    Config.allRoles.forEach((role: string) => {
      Config.expenses.spawnExpenses[room.name][role] = 0;
    });
  }

  public static resetRoomMemory(room: Room, forceUpdate?: boolean, isOwnedRoom: boolean = false): void {
    if (isOwnedRoom) {
      this.resetOwnedRoomMemory(room, forceUpdate);
    }

    // Acces the roomMemory of this room
    const roomMemory: RoomMemory = room.memory;

    // Set the sources array to a empty array
    const sources: Array<{ id: string; pos: RoomPos }> = [];

    // Loop through each source and push the id and pos to the empty source array
    room.find(FIND_SOURCES).forEach(source => {
      sources.push({ id: source.id, pos: source.pos });
    });

    // Reset this room in the stats memory
    Memory.stats.rooms[room.name] = {
      commonMemory: {},
      performance: { expenses: {}, income: {} },
      energyStored: {},
      spawnerEnergy: {},
      controller: {},
      cpu: { headModules: { creeps: {} }, smallModules: {}, creepModules: {} }
    };

    // Set all commonMemory for a owned and remote room
    roomMemory.commonMemory = {
      // Set the source length
      sourceCount: sources.length,
      // Get the id, type and amount from the mineral in this room
      mineral: {
        id: room.find(FIND_MINERALS)[0] ? room.find(FIND_MINERALS)[0].id : "",
        type: room.find(FIND_MINERALS)[0] ? room.find(FIND_MINERALS)[0].mineralType : "",
        amount: room.find(FIND_MINERALS)[0] ? Math.round(room.find(FIND_MINERALS)[0].mineralAmount) : 0
      },
      // Set the id and pos of all sources to the memory of the room
      sources,
      // Create a empty array for storing constructionSites
      constructionSites: [],
      // Create a empty array for storing energyStructures
      energyStructures: [],
      // Set the repair object
      // Create a empty array for storing targets to repair
      // Set the hitsTarget to a default of 250K
      repair: {
        targets: [],
        hitsTarget: 250 * 1000
      },
      // Set the energyStored to a 0 for both of the keys
      energyStored: { usable: 0, capacity: 0 }
    };

    // Set the roomPlanner object to the template
    roomMemory.roomPlanner = { room: { sources: [] } };

    // Set the enemies object to the template
    roomMemory.enemies = {
      parts: { ATTACK: 0, RANGED_ATTACK: 0, TOUGH: 0, HEAL: 0 },
      creeps: []
    };

    // Sets the damagedCreeps object to a empty array
    roomMemory.damagedCreeps = [];
  }

  private static resetOwnedRoomMemory(room: Room, forceUpdate?: boolean): void {
    // Acces the roomMemory of this room
    const roomMemory: RoomMemory = room.memory;

    // Set the spawnerEnergy key to a empty object
    Memory.stats.rooms[room.name].spawnerEnergy = {};
    // Set the controller key to a empty object
    Memory.stats.rooms[room.name].controller = {};

    // Set the roomPlanner base key to a empty object
    roomMemory.roomPlanner.base = { type: undefined, midPos: { x: 0, y: 0, roomName: room.name } };

    // Set the controller level to current controller level
    roomMemory.commonMemory.controllerLevel = room.controller ? room.controller.level : undefined;

    // Set and get the headSpawnId
    const spawns = MemoryApi_Room.getStructuresOfType(room, STRUCTURE_SPAWN);
    roomMemory.commonMemory.headSpawnId = room.terminal
      ? room.terminal.pos.findInRange(spawns, 2)[0]
        ? // @ts-ignore: Id DOES exist on the result
          room.terminal.pos.findInRange(room.spawns, 2)[0].id
        : spawns[0].id
      : spawns[0]
      ? spawns[0].id
      : room.find(FIND_STRUCTURES, {
          filter: s => s.structureType === STRUCTURE_SPAWN
        }).length > 0
      ? room.find(FIND_STRUCTURES, {
          filter: s => s.structureType === STRUCTURE_SPAWN
        })[0].id
      : undefined;
    // Create a empty array for storing spawnEnergyStructures
    roomMemory.commonMemory.spawnEnergyStructures = [];
    // Set the storage in the controller storage to 0
    roomMemory.commonMemory.controllerStorage = { usable: 0, type: "", id: "" };
    // Set all links to undefined
    roomMemory.commonMemory.links = {
      source0: "",
      source1: "",
      head: "",
      controller: ""
    };
    // Set the remotes object to default template
    // roomMemory.remotes = { totalSourceCount: 0, rooms: [] };

    // Run all timers for this room
    TimerManager.runTimerForRoom(room, forceUpdate);
  }
}
//#endregion
