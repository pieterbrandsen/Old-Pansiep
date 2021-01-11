// #region Require('./)
import { Config, JobsApi } from 'Utils/Importer/internals';
// #endregion

// #region Class
export class CreepRoleRepair {
  // #endregion
  public static repair(creep: Creep): string | void {
    // Make shortcut to memory
    const creepMemory: CreepMemory = creep.memory;
    const roomMemory: RoomMemory = Memory.rooms[creepMemory.targetRoom];
    const targetRoom: Room = Game.rooms[creepMemory.targetRoom];

    // Return empty if current creep's storage is empty or no targets left to repair
    if (creep.store.getUsedCapacity() === 0) {
      return 'empty';
    }

    // If there are no construction sites left and no target, return full to get another goal if possible
    if (roomMemory.jobs.damagedStructures.data.length === 0 && !creepMemory.targetId) {
      if (targetRoom.controller && !creep.pos.inRangeTo(targetRoom.controller, 5)) {
        creep.moveTo(targetRoom.controller);
      }
      return 'full';
    }

    // Set targetId to saved in memory if no id was passed into using the data object
    const targetId = creepMemory.targetId;
    // If creep is missing a targetId
    if (targetId === undefined) {
      // Get the fist target from what is saved //
      const job: JobTemplate | undefined = JobsApi.getClosestJob(creep.pos, roomMemory.jobs.damagedStructures.data);
      if (job) {
        creep.memory.targetId = job.id;
      }
    } else {
      // Get the saved structure site from memory
      const repairTarget: AnyStructure | null = Game.getObjectById(targetId);

      if (!creep.memory.targetId) {
        delete creep.memory.targetId;
        return 'empty';
      }

      if (repairTarget === null) {
        roomMemory.jobs.damagedStructures.data = JobsApi.removeJob(
          creep.memory.targetId,
          roomMemory.jobs.constructionSites
        );
        delete creep.memory.targetId;
        return 'empty';
      }

      // Run the repair function
      const result = creep.repair(repairTarget);

      // Switch based on the results
      switch (result) {
        case OK:
          Config.expenses.repairing[creep.room.name] += creep.memory.parts ? creep.memory.parts.work : 0;

          // If the hits of the repairTarget are high enough, remove structure
          if (
            repairTarget.hits === repairTarget.hitsMax ||
            repairTarget.hits > roomMemory.jobs.damagedStructures.hitsTarget
          ) {
            roomMemory.jobs.damagedStructures.data = JobsApi.removeJob(
              creep.memory.targetId,
              roomMemory.jobs.constructionSites
            );
            delete creep.memory.targetId;
          }
          break;
        case ERR_INVALID_TARGET:
          // Delete target from the memory
          roomMemory.jobs.damagedStructures.data = JobsApi.removeJob(
            creep.memory.targetId,
            roomMemory.jobs.constructionSites
          );
          delete creep.memory.targetId;
          break;
        case ERR_NOT_IN_RANGE:
          // If creep is not in range, move to target
          creep.moveTo(repairTarget);
          break;
        default:
          break;
      }
    }
  }
}
// #endregion
