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
}
//#endregion
