// #region Require('./)
import { Config, JobsApi } fromUtils/Importer/internalsls';
// #endregion

// #region Class
export class CreepRole_Build {
  public static build(creep: Creep): string | void {
    // Make shortcut to memory
    const creepMemory: CreepMemory = creep.memory;
    const roomMemory: RoomMemory = Memory.rooms[creepMemory.targetRoom];

    // Return empty if current creep's storage is empty
    if (creep.store.getUsedCapacity() === 0) {
      return 'empty';
    }

    // If there are no construction sites left and no target, return full to get another goal if possible
    if (roomMemory.jobs.constructionSites.length === 0 && !creepMemory.targetId) {
      if (creep.room.controller && !creep.pos.inRangeTo(creep.room.controller, 5)) {
        creep.moveTo(creep.room.controller);
      }
      return 'full';
    }

    // If creep is missing a targetId
    if (creepMemory.targetId === undefined) {
      // Get the fist target from what is saved //
      // This target will get later shifted when its completed
      const job: JobTemplate | undefined = JobsApi.getClosestJob(creep.pos, roomMemory.jobs.constructionSites);
      if (job) {
        creep.memory.targetId = job.id;
      }
    } else {
      // Get the saved construction site from memory
      const constructionSite: ConstructionSite | null = Game.getObjectById(creepMemory.targetId);

      // If construction site doesn't exist, remove it
      if (constructionSite === null) {
        roomMemory.jobs.constructionSites = JobsApi.removeJob(
          creep.memory.targetId!,
          roomMemory.jobs.constructionSites
        );
        delete creep.memory.targetId;
        return 'empty';
      }

      // Run the build function
      const result = creep.build(constructionSite);
      // Switch based on the results
      switch (result) {
        case OK:
          Config.expenses.building[creep.room.name] += creep.memory.parts!.work * 5;
          break;
        case ERR_INVALID_TARGET:
          roomMemory.jobs.constructionSites = JobsApi.removeJob(
            creep.memory.targetId!,
            roomMemory.jobs.constructionSites
          );
          delete creep.memory.targetId;
          return 'full';
        case ERR_NOT_IN_RANGE:
          // If creep is not in range, move to target
          creep.moveTo(constructionSite);

        default:
          break;
      }
    }
  }
}

// #endregion
