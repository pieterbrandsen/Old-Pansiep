//#region Require('./)
import _ from "lodash";
import { Config, JobsHelper, SpawningApi } from "Utils/importer/internals";
//#endregion

//#region Class
export class SpawningHelper {
  public static spawnNormalCreep(spawnRoom: Room): ScreepsReturnCode {
    const nextCreep = SpawningApi.getNextRoleName(spawnRoom, "owned");
    if (!nextCreep[0]) {
      return OK;
    }

    const spawns = SpawningApi.getAllOpenSpawn(spawnRoom);
    const memory = SpawningApi.getCreepMemory(spawnRoom, nextCreep[1]);
    if (spawns && spawns.length > 0) {
      const bodyResult = SpawningApi.getCreepParts(spawnRoom, memory.role);
      const spawnResult = this.spawnCreep(spawnRoom, _.first(spawns), memory, bodyResult.body);
      if (spawnResult === OK) {
        Config.expenses.spawnExpenses[spawnRoom.name][memory.role] += bodyResult.bodyCost;
        JobsHelper.updateAllSpawnerEnergyStructuresJobs(spawnRoom);
      }
      return spawnResult;
    } else {
      return ERR_BUSY;
    }
  }

  public static spawnRemoteCreep(spawnRoom: Room, targetRoom: Room, targetRoomName: string): ScreepsReturnCode {
    const nextCreep = SpawningApi.getNextRoleName(targetRoom, "remote", targetRoom);
    if (!nextCreep[0]) {
      return OK;
    }

    const spawns = SpawningApi.getAllOpenSpawn(spawnRoom);
    const memory = SpawningApi.getCreepMemory(spawnRoom, nextCreep[1], targetRoomName);
    if (spawns && spawns.length > 0) {
      const bodyResult = SpawningApi.getCreepParts(spawnRoom, memory.role);
      const spawnResult = this.spawnCreep(spawnRoom, _.first(spawns), memory, bodyResult.body);
      if (spawnResult === OK && Config.expenses.spawnExpenses[targetRoomName]) {
        Config.expenses.spawnExpenses[targetRoomName][memory.role] += bodyResult.bodyCost;
        JobsHelper.updateAllSpawnerEnergyStructuresJobs(spawnRoom);
      }
      return spawnResult;
    } else {
      return ERR_BUSY;
    }
  }

  public static spawnScoreContainerCreep(spawnRoom: Room, targetRoom: Room, targetRoomName: string): ScreepsReturnCode {
    const nextCreep = SpawningApi.getNextRoleName(targetRoom, "score", targetRoom);
    if (!nextCreep[0]) {
      return OK;
    }

    const spawns = SpawningApi.getAllOpenSpawn(spawnRoom);
    const memory = SpawningApi.getCreepMemory(spawnRoom, nextCreep[1], targetRoomName);
    if (spawns && spawns.length > 0) {
      const bodyResult = SpawningApi.getCreepParts(spawnRoom, memory.role);
      const spawnResult = this.spawnCreep(spawnRoom, _.first(spawns), memory, bodyResult.body);
      if (spawnResult === OK && Config.expenses.spawnExpenses[targetRoomName]) {
        Config.expenses.spawnExpenses[targetRoomName][memory.role] += bodyResult.bodyCost;
        JobsHelper.updateAllSpawnerEnergyStructuresJobs(spawnRoom);
      }
      return spawnResult;
    } else {
      return ERR_BUSY;
    }
  }

  private static spawnCreep(
    spawnRoom: Room,
    spawn: StructureSpawn,
    memory: CreepMemory,
    body: BodyPartConstant[]
  ): ScreepsReturnCode {
    return spawn.spawnCreep(body, SpawningApi.getCreepName(memory.role), {
      memory,
      directions: SpawningApi.getCreepDirections(memory.role, spawnRoom)
    });
  }
}
//#endregion
