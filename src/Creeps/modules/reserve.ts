//#region Require('./)
import {} from "Utils/importer/internals";
//#endregion

//#region Class
export class CreepRole_Reserve {
  public static reserve(creep: Creep) {
    if (creep.room.controller === undefined) {
      return;
    }
    const result = creep.reserveController(creep.room.controller);
    // Switch based on the results
    switch (result) {
      case ERR_NOT_IN_RANGE:
        // If creep is not in range, move to target
        creep.moveTo(creep.room.controller);
        break;
      default:
        break;
    }
  }
}
//#endregion
