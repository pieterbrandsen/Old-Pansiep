//#region Require('./)
import { Config } from "Utils/importer/internals";
//#endregion

//#region Class
export class CreepRole_Build {
  public static build(creep: Creep): string | void {
    // Make shortcut to memory
    const creepMemory: CreepMemory = creep.memory;
    const roomMemory: RoomMemory = Memory.rooms[creepMemory.targetRoom];

    // Return empty if current creep's storage is empty
    if (creep.store.getUsedCapacity() === 0) {
      return "empty";
    }

    // If there are no construction sites left and no target, return full to get another goal if possible
    if (roomMemory.constructionSites.data.length === 0 && !creepMemory.targetId) {
      if (creep.room.controller && !creep.pos.inRangeTo(creep.room.controller, 5)) {
        creep.moveTo(creep.room.controller);
      }
      return "full";
    }

    // If creep is missing a targetId
    if (creepMemory.targetId === undefined) {
      // Get the fist target from what is saved //
      // This target will get later shifted when its completed
      if (roomMemory.jobs.constructionSites[0]) {
        creep.memory.targetId = roomMemory.jobs.constructionSites[0].id;
      }
    } else {
      // Get the saved construction site from memory
      const constructionSite: ConstructionSite | null = Game.getObjectById(creepMemory.targetId);

      // If construction site doesn't exist, remove it
      if (constructionSite === null) {
        roomMemory.jobs.constructionSites.shift();
        return "empty";
      }

      // Run the build function
      const result = creep.build(constructionSite);
      // Switch based on the results
      switch (result) {
        case OK:
          Config.expenses.building[creep.room.name] += creep.memory.parts.work * 5;
          break;
        case ERR_INVALID_TARGET:
          // Check if target that's going to be lost is still on the construction list, if so shift it.
          roomMemory.jobs.constructionSites.shift();
          // Delete target from the memory
          delete creep.memory.targetId;
          return "full";
        case ERR_NOT_IN_RANGE:
          // If creep is not in range, move to target
          creep.moveTo(constructionSite);
          return;
        default:
          break;
      }
    }
  }
}

//#endregion
