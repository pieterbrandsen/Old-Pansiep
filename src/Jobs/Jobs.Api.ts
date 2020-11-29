//#region Require('./)
import _, { any } from "lodash";
import {} from "Utils/importer/internals";
//#endregion

//#region Class
export class JobsApi {
  public static getClosestJob(position: RoomPos, jobs: JobTemplate[]): JobTemplate | undefined {
    if (jobs.length >= 2) {
      const addAbsDelta = (g: number[]) => (s: number, v: number, i: number) => s + Math.abs(v - g[i]);

      const result: JobTemplate = jobs.reduce((a: JobTemplate, b: JobTemplate) => {
        const aPosArray = [a.pos.x, a.pos.y];
        const bPosArray = [b.pos.x, b.pos.y];
        const creepPosArray = [position.x, position.y];

        return aPosArray.reduce(addAbsDelta(creepPosArray), 0) < bPosArray.reduce(addAbsDelta(creepPosArray), 0)
          ? a
          : b;
      });

      return result;
    } else if (jobs.length === 1) {
      return jobs[0];
    } else {
      return undefined;
    }
  }

  public static getFirstJob(jobs: JobTemplate[]): JobTemplate | undefined {
    return _.first(jobs);
  }

  public static removeJob(jobId: string, jobs: JobTemplate[]): JobTemplate[] {
    const job: JobTemplate | undefined = this.findJob(jobId, jobs);
    if (!job) {
      return jobs;
    } else if (jobs.length > 1) {
      _.remove(jobs, job);
      return jobs;
    } else {
      jobs.shift();
      return jobs;
    }
  }

  public static findJob(jobId: string, jobs: JobTemplate[]): JobTemplate | undefined {
    const job: JobTemplate | undefined = _.find(jobs, { id: jobId });
    return job;
  }
}
//#endregion
