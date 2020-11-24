//#region Require('./)
import { Config, MemoryApi_All, MemoryApi_Room } from "Utils/importer/internals";
//#endregion

//#region Class
export class TimerHelper_Functions {
  public static getConstructionSites(room: Room) {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = Memory.rooms[room.name];

    // Get all constructionSites and map them based on the id
    roomMemory.constructionSites.data = room.find(FIND_CONSTRUCTION_SITES).map(c => c.id);
  }

  public static getDamagedCreeps(room: Room) {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = Memory.rooms[room.name];

    // Find all creeps that are damaged and are mine
    roomMemory.damagedCreeps = room
      .find(FIND_MY_CREEPS, {
        filter: c => c.hits < c.hitsMax
      })
      .map(c => c.id);
  }

  public static getDamagedStructures(room: Room) {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = Memory.rooms[room.name];

    // Get all structures that are under max hits and under hitsTarget
    roomMemory.commonMemory.repair.targets = room
      .find(FIND_STRUCTURES, {
        filter: s =>
          s.hits < s.hitsMax &&
          s.hits < (roomMemory.commonMemory.repair.hitsTarget ? roomMemory.commonMemory.repair.hitsTarget : 250 * 1000)
      })
      .map(c => c.id);
  }

  public static getHostileCreeps(room: Room) {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = Memory.rooms[room.name];

    // Reset the memory for enemies
    roomMemory.enemies = {
      parts: { WORK: 0, ATTACK: 0, RANGED_ATTACK: 0, TOUGH: 0, HEAL: 0 },
      creeps: []
    };

    const allHostileCreeps: Creep[] | any = room.find(FIND_HOSTILE_CREEPS);

    // Loop through each hostile creep found
    for (let i = 0; i < allHostileCreeps.length; i++) {
      const creep: Creep = allHostileCreeps[i];
      // Check if current owner is on whitelist. If so break
      if (Config.whitelist.indexOf(creep.owner.username) >= 0) {
        break;
      }

      // Create variables for creep part counts
      let netToughCount: number = 0;
      let netAttackCount: number = 0;
      let netRangedAttackCount: number = 0;
      let netHealCount: number = 0;

      // Loop though all the parts in the body to check for boost.
      creep.body.forEach(part => {
        // If the part is boosted
        if (part.boost !== undefined) {
          switch (part.boost) {
            case RESOURCE_UTRIUM_HYDRIDE:
              netAttackCount += 2;
              break;
            case RESOURCE_KEANIUM_OXIDE:
              netRangedAttackCount += 2;
              break;
            case RESOURCE_LEMERGIUM_OXIDE:
              netHealCount += 2;
              break;
            // case RESOURCE_GHODIUM_OXIDE:
            // netToughCount+=2;
            // break;
            case RESOURCE_UTRIUM_ACID:
              netAttackCount += 3;
              break;
            case RESOURCE_KEANIUM_ALKALIDE:
              netRangedAttackCount += 3;
              break;
            case RESOURCE_LEMERGIUM_ALKALIDE:
              netHealCount += 3;
              break;
            // case RESOURCE_GHODIUM_ALKALIDE:
            // netToughCount+=3;
            // break;
            case RESOURCE_CATALYZED_UTRIUM_ACID:
              netAttackCount += 4;
              break;
            case RESOURCE_CATALYZED_KEANIUM_ACID:
              netRangedAttackCount += 4;
              break;
            case RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE:
              netHealCount += 4;
              break;
            // case RESOURCE_CATALYZED_GHODIUM_ALKALIDE:
            //   netToughCount += 4;
            //   break;
            default:
              break;
          }
        } else {
          // Else switch between the parts that needs to be saved
          switch (part.type) {
            case "tough":
              netToughCount += 1;
              break;
            case "attack":
              netAttackCount += 1;
              break;
            case "ranged_attack":
              netRangedAttackCount += 1;
              break;
            case "heal":
              netHealCount += 1;
              break;
            default:
              break;
          }
        }
      });

      // Add all found parts to total memory
      roomMemory.enemies.parts.ATTACK += netAttackCount;
      roomMemory.enemies.parts.RANGED_ATTACK += netRangedAttackCount;
      roomMemory.enemies.parts.HEAL += netHealCount;
      roomMemory.enemies.parts.TOUGH += netToughCount;

      // Add creep parts and id to array
      roomMemory.enemies.creeps.push({
        id: creep.id,
        parts: {
          ATTACK: netAttackCount,
          RANGED_ATTACK: netRangedAttackCount,
          TOUGH: netToughCount,
          HEAL: netHealCount
        }
      });
    }
  }

  public static getSpawnEnergyStructures(room: Room) {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = Memory.rooms[room.name];

    // Find all spawner structures and map them to the id and energy space
    roomMemory.commonMemory.spawnEnergyStructures = room
      .find(FIND_MY_STRUCTURES, {
        filter: s =>
          // @ts-ignore
          [STRUCTURE_LAB, STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER].indexOf(s.structureType) !== -1 &&
          // @ts-ignore
          s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      })
      .map(s => ({
        id: s.id,
        // @ts-ignore
        needed: s.store.getFreeCapacity(RESOURCE_ENERGY)
      }));
  }

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

    // If the headSpawn is null
    if (Game.getObjectById(roomMemory.commonMemory.headSpawnId!) === null) {
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
    }
    // If the controller storage is undefined or null
    if (
      roomMemory.commonMemory.controllerStorage === undefined ||
      Game.getObjectById(roomMemory.commonMemory.controllerStorage.id!) === null
    ) {
      // If the roomPlanner knows the position
      if (roomMemory.roomPlanner.room.controller && roomMemory.roomPlanner.room.controller.pos) {
        // Create a shortcut to the controller storage position
        const controllerPos = roomMemory.roomPlanner.room.controller.pos;
        // Find all structures at the known controller position
        const foundStructures = room.lookForAt(LOOK_STRUCTURES, controllerPos.x, controllerPos.y);

        // Save the found controller storage
        let controllerStorage: any;

        // Loop through each of the structures found
        foundStructures.forEach(structure => {
          // If the structure is a container or link
          if (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_LINK) {
            // Save everything known of the structure
            controllerStorage = {
              usable: 0,
              type: structure.structureType,
              id: structure.id
            };
          }
        });

        // If the structure was found in the loop, save everything to the roomMemory
        if (roomMemory.commonMemory.controllerStorage !== undefined && controllerStorage) {
          roomMemory.commonMemory.controllerStorage.id! = controllerStorage.id;
          roomMemory.commonMemory.controllerStorage.type = controllerStorage.type;
        } else if (roomMemory.commonMemory.controllerStorage !== undefined) {
          roomMemory.commonMemory.controllerStorage.usable = 0;
        }
      }
    }

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
      const headSpawn: StructureSpawn | null = Game.getObjectById(roomMemory.commonMemory.headSpawnId!);
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

  public static getAllEnergyStructures(room: Room): void {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = Memory.rooms[room.name];

    const isStructureTheControllerStructure = (id: string): boolean => {
      // Check if the memory path is completely defined
      if (MemoryApi_All.isMemoryPathDefined(`Memory.rooms.${room.name}.commonMemory.controllerStorage.id!`)) {
        // @ts-ignore: Above is checked if the path is defined
        // If the known controller storage id is the id inputted
        if (room.memory.commonMemory.controllerStorage.id! === id) {
          return true;
        }
      }

      // If not yet returned, return false
      return false;
    };

    // Reset energyStructures array
    roomMemory.commonMemory.energyStructures = [];

    // Set energyUsable and energyCapacity to zero
    let energyUsable: number = 0;
    let energyCapacity: number = 0;

    // Loop through all containers
    (MemoryApi_Room.getStructuresOfType(room, STRUCTURE_CONTAINER) as StructureContainer[]).forEach((storageStructure: StructureContainer) => {
      if (!isStructureTheControllerStructure(storageStructure.id)) {
        // Add the total energy available and capacity
        energyUsable += storageStructure.store.getUsedCapacity(RESOURCE_ENERGY);
        energyCapacity += storageStructure.store.getCapacity(RESOURCE_ENERGY);

        // Push energy available and id to energyStructures array
        roomMemory.commonMemory.energyStructures.push({
          id: storageStructure.id,
          usable: storageStructure.store.getUsedCapacity(RESOURCE_ENERGY)
        });
        // Else if if this structure is the controller structure
      } else if (isStructureTheControllerStructure(storageStructure.id)) {
        // @ts-ignore: Above is checked if the path is defined
        // Set the amount of energy in the controller storage to its memoryTarget
        roomMemory.commonMemory.controllerStorage.usable = storageStructure.store.getUsedCapacity(RESOURCE_ENERGY);
      }
    });

    // If the controller level is high enough for the storage and the storage is defined
    if (room.controller!.level >= 4 && room.storage) {
      // Add the total energy available and capacity
      energyUsable += room.storage.store.getUsedCapacity(RESOURCE_ENERGY);
      energyCapacity += room.storage.store.getCapacity(RESOURCE_ENERGY);

      // Push energy available and id to energyStructures array
      roomMemory.commonMemory.energyStructures.push({
        id: room.storage.id,
        usable: room.storage.store.getUsedCapacity(RESOURCE_ENERGY)
      });
    }

    // If the controller level is high enough for the terminal and the storage is terminal
    if (room.controller!.level >= 6 && room.terminal) {
      // Add the total energy available and capacity
      energyUsable += room.terminal.store.getUsedCapacity(RESOURCE_ENERGY);
      energyCapacity += room.terminal.store.getCapacity(RESOURCE_ENERGY);

      // Push energy available and id to energyStructures array
      roomMemory.commonMemory.energyStructures.push({
        id: room.terminal.id,
        usable: room.terminal.store.getUsedCapacity(RESOURCE_ENERGY)
      });
    }
    roomMemory.commonMemory.energyStored.usable = energyUsable;
    roomMemory.commonMemory.energyStored.capacity = energyCapacity;
  }
}
//#endregion
