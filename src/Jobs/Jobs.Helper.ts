// #region Require('./)
import _ from 'lodash';
import { Config, MemoryApi_Room } fromUtils/Importer/internalsls';
// #endregion

// #region Class
export class JobsHelper {
  public static updateAllConstructionSitesJobs(room: Room): void {
    const allConstructionSites: ConstructionSite[] = MemoryApi_Room.getAllConstructionSites(room);

    room.memory.jobs.constructionSites = [];
    _.forEach(allConstructionSites, (site: ConstructionSite) => {
      const jobSite: JobTemplate = {
        pos: site.pos,
        id: site.id,
        needed: site.progressTotal - site.progress
      };
      room.memory.jobs.constructionSites.push(jobSite);
    });
  }

  public static updateAllEnergyStoragesJobs(room: Room): void {
    let controllerStorage: any = MemoryApi_Room.getUpgraderStructure(room);
    if (controllerStorage === null) {
      controllerStorage = { id: '' };
    }
    const allEnergyStructures: Structure[] = MemoryApi_Room.getStructures(
      room,
      (s: AnyStructure) =>
        (s.structureType === STRUCTURE_CONTAINER ||
          s.structureType === STRUCTURE_STORAGE ||
          s.structureType === STRUCTURE_TERMINAL) &&
        s.store.energy > -1 &&
        // @ts-ignore, storage is not null because when it's null, it gets reassigned to a empty object with a empty string
        s.id !== controllerStorage.id
    );

    // Set energyUsable and energyCapacity to zero
    let energyUsable = 0;
    let energyCapacity = 0;

    room.memory.jobs.energyStorages = [];
    _.forEach(allEnergyStructures, (str: StructureStorage) => {
      const jobStr: JobTemplate = {
        pos: str.pos,
        id: str.id,
        usable: str.store.energy,
        structureType: str.structureType
      };

      if (jobStr.id === room.memory.commonMemory!.controllerStorage?.id) {
        room.memory.commonMemory!.controllerStorage.usable = jobStr.usable!;
      } else {
        room.memory.jobs.energyStorages.push(jobStr);

        // Add the total energy available and capacity
        energyUsable += str.store.getUsedCapacity(RESOURCE_ENERGY);
        energyCapacity += str.store.getCapacity(RESOURCE_ENERGY);
      }
    });

    room.memory.commonMemory!.energyStored = {
      usable: energyUsable,
      capacity: energyCapacity
    };
  }

  public static getAllContainerEnergyStoragesJobs(room: Room): JobTemplate[] {
    return room.memory.jobs.energyStorages.filter((job: JobTemplate) => job.structureType === STRUCTURE_CONTAINER);
  }

  public static updateAllDamagedStructuresJobs(room: Room): void {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = room.memory;

    const allDamagedStructures = MemoryApi_Room.getStructures(
      room,
      (s: Structure) =>
        s.hits < s.hitsMax &&
        s.hits <
          (roomMemory.jobs.damagedStructures.hitsTarget ? roomMemory.jobs.damagedStructures.hitsTarget : 250 * 1000)
    );

    roomMemory.jobs.damagedStructures.data = [];
    _.forEach(allDamagedStructures, (str: Structure) => {
      const jobStr: JobTemplate = {
        pos: str.pos,
        id: str.id,
        needed: (str.hitsMax - str.hits) / 100
      };
      roomMemory.jobs.damagedStructures.data.push(jobStr);
    });
  }

  public static updateAllDamagedCreepsJobs(room: Room): void {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = Memory.rooms[room.name];

    const allDamagedCreepsInRoom = MemoryApi_Room.getMyCreeps(
      room,
      (c: Creep) => c.room.name === room.name && c.hits < c.hitsMax
    );

    roomMemory.jobs.damagedCreeps = [];
    _.forEach(allDamagedCreepsInRoom, (c: Creep) => {
      const creepJob: JobTemplate = {
        pos: c.pos,
        id: c.id
      };
      roomMemory.jobs.damagedCreeps.push(creepJob);
    });
  }

  public static updateAllSpawnerEnergyStructuresJobs(room: Room): void {
    const allSpawnerEnergyStructures: Structure[] = MemoryApi_Room.getStructures(
      room,
      (s: StructureExtension | StructureSpawn | StructureLab | StructureTower) =>
        (s.structureType === STRUCTURE_EXTENSION ||
          s.structureType === STRUCTURE_SPAWN ||
          s.structureType === STRUCTURE_TOWER ||
          s.structureType === STRUCTURE_LAB) &&
        // @ts-ignore: Function is defined
        s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
    );

    room.memory.jobs.spawnerEnergyStructures = [];
    _.forEach(allSpawnerEnergyStructures, (str: StructureStorage) => {
      const jobStr: JobTemplate = {
        pos: str.pos,
        id: str.id,
        needed: str.store.getFreeCapacity(RESOURCE_ENERGY),
        structureType: str.structureType
      };

      room.memory.jobs.spawnerEnergyStructures!.push(jobStr);
    });
  }

  public static updateAllHostileCreepsJobs(room: Room): void {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = Memory.rooms[room.name];

    // Reset the memory for enemies
    roomMemory.jobs.enemies = {
      parts: {
        WORK: 0,
        ATTACK: 0,
        RANGED_ATTACK: 0,
        TOUGH: 0,
        HEAL: 0
      },
      creeps: []
    };

    const allHostileCreeps: Creep[] = room.find(FIND_HOSTILE_CREEPS);

    // Loop through each hostile creep found
    for (let i = 0; i < allHostileCreeps.length; i++) {
      const creep: Creep = allHostileCreeps[i];
      // Check if current owner is on whitelist. If so break
      if (Config.whitelist.indexOf(creep.owner.username) >= 0) {
        break;
      }

      // Create variables for creep part counts
      let netToughCount = 0;
      let netAttackCount = 0;
      let netRangedAttackCount = 0;
      let netHealCount = 0;

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
            case 'tough':
              netToughCount += 1;
              break;
            case 'attack':
              netAttackCount += 1;
              break;
            case 'ranged_attack':
              netRangedAttackCount += 1;
              break;
            case 'heal':
              netHealCount += 1;
              break;
            default:
              break;
          }
        }
      });

      // Add all found parts to total memory
      roomMemory.jobs.enemies.parts.ATTACK += netAttackCount;
      roomMemory.jobs.enemies.parts.RANGED_ATTACK += netRangedAttackCount;
      roomMemory.jobs.enemies.parts.HEAL += netHealCount;
      roomMemory.jobs.enemies.parts.TOUGH += netToughCount;

      // Add job to memory
      roomMemory.jobs.enemies.creeps.push({
        pos: creep.pos,
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

  public static updateAllDroppedResourcesJobs(room: Room): void {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = room.memory;

    const droppedResources = MemoryApi_Room.getDroppedResources(room);

    roomMemory.jobs.droppedResources = [];
    _.forEach(droppedResources, (resource: Resource) => {
      const job: JobTemplate = {
        pos: resource.pos,
        id: resource.id,
        usable: resource.amount,
        resourceType: resource.resourceType
      };
      roomMemory.jobs.droppedResources.push(job);
    });
  }

  public static updateScoreContainersJobs(room: Room): void {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = room.memory;

    const scoreContainers = MemoryApi_Room.getScoreContainerRooms(room);

    roomMemory.jobs.scoreContainers = [];
    _.forEach(scoreContainers, (container: any) => {
      const job: JobTemplate = {
        pos: container.pos,
        id: container.id,
        // @ts-ignore
        usable: container.store[RESOURCE_SCORE]
      };

      if (container.ticksToDecay > 300) {
        roomMemory.jobs.scoreContainers!.push(job);
      }
    });
  }
}
// #endregion
