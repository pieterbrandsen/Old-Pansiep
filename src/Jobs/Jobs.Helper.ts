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

    room.memory.jobs.energyStorages = [];
    _.forEach(allEnergyStructures, (str: StructureStorage) => {
      const jobSite: JobTemplate = {
        pos: str.pos,
        id: str.id,
        usable: str.store.energy,
        structureType: str.structureType
      };
      room.memory.jobs.energyStorages.push(jobSite);
    });

    room.memory.jobs.energyStorages.sort((a, b) => a.usable! - b.usable!);
  }

  public static getAllContainerEnergyStoragesJobs(room:Room): JobTemplate[] {
    return room.memory.jobs.energyStorages.filter((job: JobTemplate) => job.structureType === STRUCTURE_CONTAINER);
  }
}
//#endregion
