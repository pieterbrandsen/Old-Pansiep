// #region Require('./)
import {} from 'Utils/Importer/internals';
// #endregion

// #region Class
export class CreepRole_Reserve {
  public static reserve(creep: Creep) {
    const targetRoom = Game.rooms[creep.memory.targetRoom];
    if (targetRoom.controller === undefined) {
      return;
    }
    const result = creep.reserveController(targetRoom.controller);
    // Switch based on the results
    switch (result) {
      case ERR_NOT_IN_RANGE:
        // If creep is not in range, move to target
        creep.moveTo(targetRoom.controller);
        break;
      default:
        break;
    }
  }
}
// #endregion
