//#region Require('./)
import {} from "Utils/importer/internals";
//#endregion

//#region Class
export class CreepRole_Scout {
  public static scout(creep: Creep) {
    if (!creep.pos.inRangeTo(25,25,15)) {
      if (creep.room.controller) {
        creep.moveTo(creep.room.controller);
      }
      else {
        creep.moveTo(25,25);
      }
    } 
  }
}
//#endregion
