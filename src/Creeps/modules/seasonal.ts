//#region Require('./)
import { JobsApi } from "Utils/importer/internals";
//#endregion

//#region Class
export class CreepRole_Seasonal {
  public static scoreWithdrawer(creep: Creep): string | undefined {
    // Make shortcut to memory
    const creepMemory: CreepMemory = creep.memory;
    const roomMemory: RoomMemory = Memory.rooms[creepMemory.targetRoom];

    if (roomMemory.jobs.scoreContainers!.length === 0) {
      return "empty";
    }

    // Return full if current creep's storage is full
    if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
      return "full";
    }

    if (!creepMemory.targetId) {
      const job: JobTemplate | undefined = JobsApi.getClosestJob(creep.pos, roomMemory.jobs.scoreContainers!);

      if (job === undefined) {
        return "empty";
      } else if (job.usable! > 0) {
        const usableResource: Resource | null = Game.getObjectById(job.id);
        if (usableResource && usableResource.amount > 0) {
          creep.memory.targetId = job.id;
          creep.memory.resourceType = job.resourceType;

          roomMemory.jobs.scoreContainers!.forEach((structureInMem: any) => {
            if (structureInMem.id === job.id) {
              if (structureInMem.usable > 0) {
                structureInMem.usable -= creep.store.getFreeCapacity();
              }
            }
          });
        } else {
          JobsApi.removeJob(job.id, roomMemory.jobs.scoreContainers!);
        }
      } else {
        JobsApi.removeJob(job.id, roomMemory.jobs.scoreContainers!);
      }
    } else {
      // Get the saved structure from memory
      const scoreContainer: any = Game.getObjectById(creepMemory.targetId);

      // Return empty if withdrawStructure is null
      if (scoreContainer === null) {
        JobsApi.removeJob(creepMemory.targetId, roomMemory.jobs.scoreContainers!);
        return "empty";
      }

      // Run the withdraw function
      // @ts-ignore
      const result = creep.withdraw(scoreContainer, RESOURCE_SCORE);

      // Switch based on the results
      switch (result) {
        case OK:
        case ERR_INVALID_TARGET:
        case ERR_FULL:
          roomMemory.jobs.scoreContainers = JobsApi.removeJob(creep.memory.targetId!, roomMemory.jobs.scoreContainers!);
          delete creep.memory.targetId;
          break;
        case ERR_NOT_IN_RANGE:
          // If creep is not in range, move to target
          creep.moveTo(scoreContainer);
          break;
        default:
          break;
      }
    }

    return;
  }
}
//#endregion
