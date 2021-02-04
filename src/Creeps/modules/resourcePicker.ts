// #region Require('./)
import { JobsApi } from 'Utils/Importer/internals';
// #endregion

// #region Class
export class CreepRoleResourcePicker {
  public static droppedResource(creep: Creep): string | void {
    // Make shortcut to memory
    const creepMemory: CreepMemory = creep.memory;
    const roomMemory: RoomMemory = Memory.rooms[creepMemory.targetRoom];

    if (roomMemory.jobs.droppedResources.length === 0) {
      return 'empty';
    }

    // Return full if current creep's storage is full
    if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
      return 'full';
    }

    if (!creepMemory.targetId) {
      const job: JobTemplate | undefined = JobsApi.getClosestJob(creep.pos, roomMemory.jobs.droppedResources);

      if (job === undefined) {
        return 'empty';
      } else if (job.usable && job.usable > 0) {
        const usableResource: Resource | null = Game.getObjectById(job.id);
        if (usableResource && usableResource.amount > 0) {
          creep.memory.targetId = job.id;
          creep.memory.resourceType = job.resourceType;

          roomMemory.jobs.droppedResources.forEach((structureInMem: JobTemplate) => {
            if (structureInMem.id === job.id) {
              if (structureInMem.usable && structureInMem.usable > 0) {
                structureInMem.usable -= creep.store.getFreeCapacity();
              }
            }
          });
        } else {
          JobsApi.removeJob(job.id, roomMemory.jobs.droppedResources);
        }
      } else {
        JobsApi.removeJob(job.id, roomMemory.jobs.droppedResources);
      }
    } else {
      // Get the saved structure from memory
      const resource: Resource | null = Game.getObjectById(creepMemory.targetId);

      // Return empty if withdrawStructure is null
      if (resource === null || resource.amount === 0) {
        JobsApi.removeJob(creepMemory.targetId, roomMemory.jobs.droppedResources);
        return 'empty';
      }

      // Run the pickUp function
      const result = creep.pickup(resource);

      // Switch based on the results
      switch (result) {
        case OK:
        case ERR_INVALID_TARGET:
        case ERR_FULL:
          if (creep.memory.targetId) roomMemory.jobs.droppedResources = JobsApi.removeJob(creep.memory.targetId, roomMemory.jobs.droppedResources);
          delete creep.memory.targetId;
          break;
        case ERR_NOT_IN_RANGE:
          // If creep is not in range, move to target
          creep.moveTo(resource);
          break;
        default:
          break;
      }
    }
  }
}
// #endregion
