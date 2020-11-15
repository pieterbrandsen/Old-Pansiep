//#region Require('./)
import { Config } from "../../Utils/importer";
//#endregion

//#region Function()
const repair = (creep: Creep, data?: any | undefined): string | undefined => {
  if (data === undefined) data = {};
  // Make shortcut to memory
  const creepMemory: CreepMemory = creep.memory;
  const flagMemory: FlagMemory = Memory.flags[creepMemory.targetRoom];

  // Return empty if current creep's storage is empty or no targets left to repair
  if (creep.store.getUsedCapacity() === 0) {
    return "empty";
  }

  // If there are no construction sites left and no target, return full to get another goal if possible
  if (flagMemory.commonMemory.repair.targets.length === 0 && !creepMemory.targetId && !data.id) {
    if (creep.room.controller && !creep.pos.inRangeTo(creep.room.controller, 5)) creep.moveTo(creep.room.controller);
    return "full";
  }

  // Set targetId to saved in memory if no id was passed into using the data object
  const targetId = data.id || creepMemory.targetId;
  // If creep is missing a targetId
  if (targetId === undefined) {
    // Get the fist target from what is saved //
    creep.memory.targetId = flagMemory.commonMemory.repair.targets[0];
  } else {
    // Get the saved structure site from memory
    const repairTarget: AnyStructure | null = Game.getObjectById(targetId);

    if (repairTarget === null) {
      flagMemory.commonMemory.repair.targets.shift();
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
          repairTarget.hits > flagMemory.commonMemory.repair.hitsTarget
        ) {
          // Check if target that's going to be lost is still on the construction list, if so shift it.
          if (flagMemory.commonMemory.repair.targets.indexOf(creep.memory.targetId) === 0) {
            flagMemory.commonMemory.repair.targets.shift();
          }

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
};
//#endregion

//#region Export functions
export { repair as Repair };
//#endregion
