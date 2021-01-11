// #region Require('./)
import { MemoryApiAll, MemoryApiEmpire, SPAWN_CREEP_TIMER, SpawningHelper } from 'Utils/Importer/internals';
import _ from 'lodash';
// #endregion

// #region Class
export class SpawningManager {
  /**
   * Get all ownedRooms and run the runSpawningForRoom function on the rooms
   * @return {void} Only calls other class member functions
   */
  public static runSpawningManager(): void {
    // Get all ownedRooms and run for each room found the runSpawningForRoom function
    const ownedRooms: Room[] = MemoryApiEmpire.getOwnedRooms();
    _.forEach(ownedRooms, (room: Room) => {
      // Run SpawnCreep if the ExecuteEachTicks returns true;
      if (MemoryApiAll.executeEachTicks(SPAWN_CREEP_TIMER)) {
        MemoryApiAll.functionRunnerWithCpu(
          SpawningManager.runSpawningForRoom, // eslint-disable-line @typescript-eslint/unbound-method
          MemoryApiAll.isMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.smallModules`),
          'spawnCreep',
          '=',
          room
        );
      } else if (MemoryApiAll.isMemoryPathDefined(`Memory.stats.rooms.${room.name}.cpu.smallModules`) !== undefined) {
        MemoryApiAll.memoryAverager(Memory.stats.rooms[room.name].cpu.smallModules.spawnCreep, 0);
      }
    });
  }

  /**
   * Run spawning logic in a room
   * @param room Room to run spawning in
   */
  private static runSpawningForRoom(room: Room): void {
    const spawnReturn: ScreepsReturnCode = SpawningHelper.spawnNormalCreep(room);
    if (spawnReturn !== OK) {
      return;
    }

    if (room.storage) {
      if (room.energyAvailable >= 1000) {
        const remoteRoomsArray = room.memory.remoteRooms;
        if (remoteRoomsArray !== undefined) {
          _.forEach(remoteRoomsArray, (roomName: string) => {
            const remoteRoom: Room = Game.rooms[roomName];
            const remoteSpawnReturn = SpawningHelper.spawnRemoteCreep(room, remoteRoom, roomName);
            if (remoteSpawnReturn !== OK) {
              return;
            }
          });
        }
      }
    }
  }
}
// #endregion
