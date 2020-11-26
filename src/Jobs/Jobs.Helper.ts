//#region Require('./)
import _ from "lodash";
import { MemoryApi_Room } from "Utils/importer/internals";
//#endregion

//#region Class
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
    const controllerStorage: StructureContainer | StructureLink | null | string = MemoryApi_Room.getUpgraderStructure(
      room
    );
    if (controllerStorage === null) {
      (controllerStorage as any) = { id: "" };
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
    let energyUsable: number = 0;
    let energyCapacity: number = 0;

    room.memory.jobs.energyStorages = [];
    _.forEach(allEnergyStructures, (str: StructureStorage) => {
      const jobStr: JobTemplate = {
        pos: str.pos,
        id: str.id,
        usable: str.store.energy,
        structureType: str.structureType
      };

      if (jobStr.id === room.memory.commonMemory.controllerStorage?.id) {
        room.memory.commonMemory.controllerStorage.usable = jobStr.usable!;
      } else {
        room.memory.jobs.energyStorages.push(jobStr);
      }

      // Add the total energy available and capacity
      energyUsable += str.store.getUsedCapacity(RESOURCE_ENERGY);
      energyCapacity += str.store.getCapacity(RESOURCE_ENERGY);
    });

    room.memory.commonMemory.energyStored = { usable: energyUsable, capacity: energyCapacity };
  }

  public static getAllContainerEnergyStoragesJobs(room: Room): JobTemplate[] {
    return room.memory.jobs.energyStorages.filter((job: JobTemplate) => job.structureType === STRUCTURE_CONTAINER);
  }

  public static updateAllDamagedStructuresJobs(room: Room): void {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = Memory.rooms[room.name];

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

  public static updateAllSpawnerEnergyStructures(room: Room): void {
    const allSpawnerEnergyStructures: Structure[] = MemoryApi_Room.getStructures(
      room,
      (s: StructureExtension | StructureSpawn | StructureLab) =>
        (s.structureType === STRUCTURE_EXTENSION ||
          s.structureType === STRUCTURE_SPAWN ||
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
}
//#endregion
