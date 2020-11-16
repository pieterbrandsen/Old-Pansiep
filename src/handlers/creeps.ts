//#region Require('./)
import { Config, IsMemoryPathDefined, FunctionRunnerWithCpu, RunCreepRoles } from "../Utils/importer/internals";
//#endregion

// #region Functions()
const creepsHandler = () => {
  Config.creepModuleCpuCost = {};
  Config.roleCountByRoomByRole = {};

  Config.expenses.building = {};
  Config.expenses.repairing = {};
  Config.expenses.upgrading = {};
  Config.income.ownedHarvesting = {};
  Config.income.remoteHarvesting = {};
  _.forEach(Object.keys(Game.rooms), roomName => {
    const room = Game.rooms[roomName];

    // Reset all creepModules
    Config.creepModuleCpuCost[room.name] = {};
    Config.allCreepModules.forEach(module => {
      Config.creepModuleCpuCost[room.name][module] = 0;
    });

    // Reset all role related memory
    Config.roleCountByRoomByRole[roomName] = {};
    Config.cpuUsedByRoomByRole[roomName] = {};
    Config.allRoles.forEach(role => {
      Config.roleCountByRoomByRole[roomName][role] = 0;
      Config.cpuUsedByRoomByRole[roomName][role] = 0;
    });

    // Reset all expense/income tracking for this room
    Config.expenses.building[roomName] = 0;
    Config.expenses.repairing[roomName] = 0;
    Config.expenses.upgrading[roomName] = 0;
    Config.income.ownedHarvesting[roomName] = 0;
    Config.income.remoteHarvesting[roomName] = 0;
  });

  // Loop through each creep known in the memory
  _.forEach(Object.keys(Memory.creeps), creepName => {
    // Acces Creep object
    const creep: Creep = Game.creeps[creepName];

    // Check if creep is dead (undefined)
    if (creep === undefined) {
      delete Memory.creeps[creepName];
    } else {
      // Else execute creep
      creepHandler(creep);
    }
  });
};

const creepHandler = (creep: Creep): void => {
  // Get the creepMemory
  const creepMemory: CreepMemory = Memory.creeps[creep.name];
  // Get the flagMemory for the targetRoom of the creep
  const flagMemory: FlagMemory = Memory.flags[creepMemory.targetRoom];
  // Get the roleName without what is after the "-"
  const creepRoleName: string = creepMemory.role.split("-")[0];

  // If there is no role name, return
  if (!creepRoleName) return;

  // If the target flagMemory is defined but not correctly setup, return
  if (flagMemory && !flagMemory.isFilled) return;

  // Run the role
  FunctionRunnerWithCpu(
    roleHandler,
    // Hope it works....
    Config.cpuUsedByRoomByRole[creep.room.name],
    creepMemory.role,"+=",
    creep,
    creepRoleName
  );

  // Handle the counting
  Config.roleCountByRoomByRole[creep.room.name][creepMemory.role]++;
};

const roleHandler = (creep: Creep, roleName: string): void => {
  // Remove the reference to the long distance part
  const shortRoleName: string = roleName.replace("LD", "");

  // Run the role with the shorter role name and the liveCreep object
  RunCreepRoles(creep, shortRoleName);
};
// #endregion

//#region Export functions
export { creepsHandler as GlobalCreepsHandler };
//#endregion
