//#region Require('./)
import _ from "lodash";
import { MemoryApi_Room } from "Utils/importer/internals";
//#endregion

//#region Class
export class SpawningApi {
  /**
   * Try to get a spawn in the inputted room
   * If no spawn is found, return null
   * @param room Room to find spawn in
   */
  public static getOpenSpawn(room: Room): any {
    // Get all spawns and filter them on spawns not spawning
    const openSpawns: Structure[] = MemoryApi_Room.getStructuresOfType(
      room,
      STRUCTURE_SPAWN,
      (spawn: StructureSpawn) => !spawn.spawning
    );

    // If the openSpawns array is empty, return null
    if (openSpawns.length === 0) {
      return null;
    }

    // Return the first item out of the OpenSpawns array
    return _.first(openSpawns);
  }
}
//#endregion
