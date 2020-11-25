//#region Require('./)
import { Config } from "Utils/importer/internals";
//#endregion

//#region Class
export class CreepRole_Repair {
  //#endregion
  public static repair(creep: Creep, data?: any | undefined): string | undefined {
    if (data === undefined) {
      data = {};
    }
    // Make shortcut to memory
    const creepMemory: CreepMemory = creep.memory;
    const roomMemory: RoomMemory = Memory.rooms[creepMemory.targetRoom];

    // Return empty if current creep's storage is empty or no targets left to repair
    if (creep.store.getUsedCapacity() === 0) {
      return "empty";
    }

    // If there are no construction sites left and no target, return full to get another goal if possible
    if (roomMemory.jobs.damagedStructures.data.length === 0 && !creepMemory.targetId && !data.id) {
      if (creep.room.controller && !creep.pos.inRangeTo(creep.room.controller, 5)) {
        creep.moveTo(creep.room.controller);
      }
      return "full";
    }

    // Set targetId to saved in memory if no id was passed into using the data object
    const targetId = data.id || creepMemory.targetId;
    // If creep is missing a targetId
    if (targetId === undefined) {
      // Get the fist target from what is saved //
      creep.memory.targetId = roomMemory.jobs.damagedStructures.data[0].id;
    } else {
      // Get the saved structure site from memory
      const repairTarget: AnyStructure | null = Game.getObjectById(targetId);

      if (repairTarget === null) {
        roomMemory.jobs.damagedStructures.data.shift();
        return "empty";
      }

      // Run the repair function
      const result = creep.repair(repairTarget);

      // Switch based on the results
      switch (result) {
        case OK:
          Config.expenses.repairing[creep.room.name] += creep.memory.parts.work;

          // If the hits of the repairTarget are high enough, remove structure
          if (
            repairTarget.hits === repairTarget.hitsMax ||
            repairTarget.hits > roomMemory.jobs.damagedStructures.hitsTarget
          ) {
            roomMemory.jobs.damagedStructures.data.shift();

            delete creep.memory.targetId;
          }
          break;
        case ERR_INVALID_TARGET:
          // Delete target from the memory
          delete creep.memory.targetId;
          break;
        case ERR_NOT_IN_RANGE:
          // If creep is not in range, move to target
          creep.moveTo(repairTarget);
          return;
        default:
          break;
      }
    }

    return;
  }
}
//#endregion
