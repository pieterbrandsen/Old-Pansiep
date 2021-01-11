// #region Require('./)
import { Config, RoomHelperState } from 'Utils/Importer/internals';
import _ from 'lodash';
// #endregion

// #region Class
export class MemoryApiEmpire {
  public static getOwnedRooms(): Room[] {
    return _.filter(Game.rooms, currentRoom => RoomHelperState.isMyRoom(currentRoom));
  }

  public static memoryLoader(): void {
    Memory; // eslint-disable-line @typescript-eslint/no-unused-expressions
  }

  public static resetMainTracking(): void {
    Config.cpuUsedByRoomByRole = {};

    Config.creepModuleCpuCost = {};

    Config.expenses.building = {};
    Config.expenses.repairing = {};
    Config.expenses.upgrading = {};
    Config.income.ownedHarvesting = {};
    Config.income.remoteHarvesting = {};
  }
}
// #endregion
