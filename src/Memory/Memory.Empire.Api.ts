// #region Require('./)
import _ from 'lodash';
import { Config, RoomHelper_State } fromUtils/Importer/internalsls';
// #endregion

// #region Class
export class MemoryApi_Empire {
  public static getOwnedRooms(): Room[] {
    return _.filter(Game.rooms, currentRoom => RoomHelper_State.isMyRoom(currentRoom));
  }

  public static memoryLoader(): void {
    // tslint:disable-next-line: no-unused-expression
    Memory;
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
