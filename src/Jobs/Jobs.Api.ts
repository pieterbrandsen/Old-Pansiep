//#region Require('./)
import _, { any } from "lodash";
import {} from "Utils/importer/internals";
//#endregion

//#region Class
export class JobsApi {
  public static getClosestJob(position: RoomPos, jobs: JobTemplate[]): JobTemplate {
    const addAbsDelta = (g: number[]) => (s: number, v: number, i: number) => s + Math.abs(v - g[i]);

    const result: JobTemplate = jobs.reduce((a: JobTemplate, b: JobTemplate) => {
      const aPosArray = [a.pos.x, a.pos.y];
      const bPosArray = [b.pos.x, b.pos.y];
      const creepPosArray = [position.x, position.y];

      return aPosArray.reduce(addAbsDelta(creepPosArray), 0) < bPosArray.reduce(addAbsDelta(creepPosArray), 0) ? a : b;
    });

    return result;
  }

  public static getFirstJob(jobs: JobTemplate[]): JobTemplate | undefined {
    return _.first(jobs);
  }
}
//#endregion
