//#region Require('./)
import _ from "lodash";
import { Config, MemoryApi_All, CreepsHelper_Role } from "Utils/importer/internals";
//#endregion

//#region Class
export class CreepsManager {
  public static runCreepsManager = () => {
    // Loop through each creep known in the memory
    _.forEach(Object.keys(Memory.creeps), creepName => {
      // Acces Creep object
      const creep: Creep = Game.creeps[creepName];

      // Check if creep is dead (undefined)
      if (creep === undefined) {
        delete Memory.creeps[creepName];
      } else {
        // Else execute creep
        CreepsManager.creepHandler(creep);
      }
    });
  };

  private static creepHandler(creep: Creep): void {
    // Get the creepMemory
    const creepMemory: CreepMemory = Memory.creeps[creep.name];

    // Get the roleName without what is after the "-"
    const creepRoleName: string = creepMemory.role.split("-")[0];

    // If there is no role name, return
    if (!creepRoleName) {
      return;
    }

    // Run the role
    MemoryApi_All.functionRunnerWithCpu(
      this.roleHandler,
      // Hope it works....
      Config.cpuUsedByRoomByRole[creep.room.name],
      creepMemory.role,
      "+=",
      creep,
      creepRoleName
    );
  }

  private static roleHandler(creep: Creep, roleName: string): void {
    // Remove the reference to the long distance part
    const shortRoleName: string = roleName.replace("LD", "");

    // Run the role with the shorter role name and the liveCreep object
    CreepsHelper_Role.runCreepRoles(creep, shortRoleName);
  }
}
//#endregion
