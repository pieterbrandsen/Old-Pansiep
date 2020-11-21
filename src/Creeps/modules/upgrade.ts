//#region Require('./)
import { Config } from "Utils/importer/internals";
//#endregion

//#region Class
export class CreepRole_Upgrade {
  public static upgrade(creep: Creep): string | undefined {
    // Return full if current creep's storage is full
    if (creep.store.getUsedCapacity() === 0) {
      return "empty";
    }

    if (creep.room.controller === undefined) {
      return;
    }

    // Run upgradeController function
    const result = creep.upgradeController(creep.room.controller);

    // Switch based on the results of the upgrade function
    switch (result) {
      case OK:
        Config.expenses.upgrading[creep.room.name] += creep.memory.parts.work * 2;
        break;
      case ERR_NOT_IN_RANGE:
        // If creep is not in range, move to controller
        creep.moveTo(creep.room.controller);
        return;
      default:
        return;
    }

    return;
  }
}
//#endregion
