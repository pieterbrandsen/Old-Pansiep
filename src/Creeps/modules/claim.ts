// #region Require('./)
import {} from 'Utils/Importer/internals';
// #endregion

// #region Class
export class CreepRoleClaim {
  // #region Functions()
  public static claim(creep: Creep): string | void {
    // Make shortcut to memory
    const creepMemory: CreepMemory = creep.memory;

    // If there is no controller in target room
    if (creep.room.controller === undefined) {
      return;
    }

    // Run claim controller
    const result = creep.claimController(creep.room.controller);

    // Switch based on the results
    switch (result) {
      case OK:
        // Delete flag and memory
        Game.flags.claim.remove();
        delete Memory.rooms.claim;

        // Create a builderLD flag and give it memory
        creep.room.createFlag(creep.pos, `builderLD${creepMemory.spawnRoom}`);
        // eslint-disable-line
        Memory.rooms[`builderLD${creepMemory.spawnRoom}`].spawnRoom = creepMemory.spawnRoom;
        Memory.rooms[`builderLD${creepMemory.spawnRoom}`].room = creep.room.name;
        break;
      case ERR_NOT_IN_RANGE:
        // If creep is not in range, move to target
        creep.moveTo(creep.room.controller);
        break;
      default:
        break;
    }
  }
}
// #endregion
