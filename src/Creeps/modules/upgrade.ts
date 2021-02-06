// #region Require('./)
import { Config } from 'Utils/Importer/internals';
// #endregion

// #region Class
export class CreepRoleUpgrade {
  public static upgrade(creep: Creep): string | void {
    // Return full if current creep's storage is full
    if (creep.store.getUsedCapacity() === 0) {
      return 'empty';
    }

    if (creep.room.controller === undefined || creep.memory.role.includes('LD')) {
      return 'empty';
    }

    // Run upgradeController function
    const result = creep.upgradeController(creep.room.controller);

    // Switch based on the results of the upgrade function
    switch (result) {
      case OK:
        if (creep.memory.parts) {
          Config.expenses.upgrading[creep.room.name] += creep.memory.parts.work;
        }
        break;
      case ERR_NOT_IN_RANGE:
        // If creep is not in range, move to controller
        creep.moveTo(creep.room.controller);
        break;
      default:
    }
  }
}
// #endregion
