//#region Require('./)
import _ from "lodash";
import { SpawningApi } from "Utils/importer/internals";
//#endregion

//#region Class
export class SpawningHelper {
  public static spawnNormalCreep(spawnRoom: Room): void {
    const nextCreep = SpawningApi.getNextRoleName(spawnRoom, "owned");
    if (!nextCreep[0]) {
      return;
    }

    const spawns = SpawningApi.getAllOpenSpawn(spawnRoom);
    const memory = SpawningApi.getCreepMemory(spawnRoom, nextCreep[1]);
    if (spawns.length > 0) {
      this.spawnCreep(spawnRoom, _.first(spawns), memory);
    }
  }

  public static spawnRemoteCreep(spawnRoom: Room, targetRoom: Room): void {
    const nextCreep = SpawningApi.getNextRoleName(targetRoom, "remote", targetRoom);
    if (!nextCreep[0]) {
      return;
    }

    const spawns = SpawningApi.getAllOpenSpawn(spawnRoom);
    const memory = SpawningApi.getCreepMemory(targetRoom, nextCreep[1]);
    if (spawns.length > 0) {
      this.spawnCreep(spawnRoom, _.first(spawns), memory);
    }
  }

  private static spawnCreep(spawnRoom: Room, spawn: StructureSpawn, memory: CreepMemory): ScreepsReturnCode {
    return spawn.spawnCreep(SpawningApi.getCreepParts(spawnRoom, memory.role).body, SpawningApi.getCreepName(memory.role), {
      memory,
      directions: SpawningApi.getCreepDirections(memory.role, spawnRoom)
    });
  }
}
//#endregion
