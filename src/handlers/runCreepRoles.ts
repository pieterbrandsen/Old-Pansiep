//#region Require('./)
import { Config, Build, Claim, Source, Mineral, Repair, Reserve, Transfer, Upgrade, Withdraw } from "../Utils/importer";
//#endregion

const executeCreep = (creep: Creep, job: string):void|string => {
  switch (job) {
    case "build":
      return Build(creep);
    case "claim":
        return Claim(creep);
    case "harvest":
      return Source(creep);
    case "mineral":
      return Mineral(creep);
    case "repair":
      return Repair(creep);
    case "reserve":
      return Reserve(creep);
    case "transfer":
      return Transfer(creep);
    case "upgrade":
      return Upgrade(creep);
    case "withdraw":
      return Withdraw(creep);
    default:
      break;
  }
};

// #region Functions()
const isInTargetRoom = (creep: Creep & MyCreep, currentRoom: string, targetRoom: string): boolean => {
  // Check if current room is target room, return true if not false
  if (currentRoom === targetRoom) return true;
  else return moveToRoom(creep, targetRoom);
};

const getMissingPartsCount = (creep: Creep): void => {
  // Assign the known creep parts currently active to the creep's memory
  if (!creep.memory.parts) {
    creep.memory.parts = {
      work: creep.getActiveBodyparts(WORK),
      carry: creep.getActiveBodyparts(CARRY)
    };
  }
};

const moveToRoom = (creep: Creep & MyCreep, targetRoom: string): boolean => {
  // Define the way how the creep is going to this room
  let travelWay = "unknown";
  const targetRoomFlag = Game.flags[targetRoom];

  if (targetRoomFlag) travelWay = "flag";
  switch (travelWay) {
    case "flag":
      creep.travelTo(targetRoomFlag);
      break;
    default:
      creep.travelTo(new RoomPosition(25, 25, targetRoom));
      break;
  }

  // Return true if creep is in targetRoom after moving
  if (creep.room.name === targetRoom) {
    return true;
  } else return false;
};

const pioneer = (creep: Creep & MyCreep) => {
  // Get missing parts for the memory
  getMissingPartsCount(creep);
  
  // Create a acces point to the flagMemory //
  const flagMemory: FlagMemory = Memory.flags[creep.memory.spawnRoom];
  
  // Check if creep needs to move to another room
  if (!isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) return;
  
  if (creep.memory.job === undefined) {
    creep.memory.job = "withdraw";
    return;
  }
  
  // Run the creep
  const result = executeCreep(creep, creep.memory.job);

  switch (result) {
    case "full":
      // Delete targetId and miniJob
      delete creep.memory.targetId;
      delete creep.memory.miniJob;
      delete creep.memory.sourceId;
      delete creep.memory.sourceNumber;

      // Switch to one of the jobs that drains energy
      if (flagMemory.commonMemory.spawnEnergyStructures.length > 0) {
        creep.memory.job = "transfer";
      } else if (
        flagMemory.commonMemory.energyStored.capacity > 10000 &&
        flagMemory.commonMemory.energyStored.capacity / 10 > flagMemory.commonMemory.energyStored.usable
      ) {
        creep.memory.job = "transfer";
      } else if (
        flagMemory.commonMemory.controllerStorage !== undefined &&
        flagMemory.commonMemory.controllerStorage.usable < 1500 &&
        flagMemory.commonMemory.controllerStorage.type === STRUCTURE_CONTAINER
      ) {
        creep.memory.job = "transfer";
      } else if (flagMemory.commonMemory.repair.targets.length > 0) {
        creep.memory.job = "repair";
      } else if (flagMemory.commonMemory.constructionSites.length > 0) {
        creep.memory.job = "build";
      } else {
        creep.memory.job = "upgrade";
      }
      break;
    case "empty":
      // Delete targetId and sourceId
      delete creep.memory.targetId;
      delete creep.memory.sourceId;
      delete creep.memory.sourceNumber;
      delete creep.memory.miniJob;

      // Switch to one of the roles that gets energy
      if (flagMemory.commonMemory.energyStored.usable > 1500) {
        creep.memory.job = "withdraw";
      } else {
        creep.memory.job = "harvest";
      }
      break;
    default:
      break;
  }
};

const harvester = (creep: Creep & MyCreep) => {
  // Get missing parts for the memory
  getMissingPartsCount(creep);

  // Check if creep needs to move to another room
  if (!isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) return;

  if (creep.memory.job === undefined) {
    creep.memory.job = "harvest";
    return;
  }

  // Run the creep
  const result = executeCreep(creep, creep.memory.job);

  switch (result) {
    case "full":
      // Delete targetId
      delete creep.memory.targetId;
      creep.memory.miniJob = "harvest";

      // Switch to one of the jobs that drains energy
      creep.memory.job = "transfer";
      break;
    case "empty":
      // Delete targetId
      delete creep.memory.targetId;

      // Switch to one of the roles that gets energy
      creep.memory.job = "harvest";
      break;
    default:
      break;
  }
};

const mineral = (creep: Creep & MyCreep) => {
  // Get missing parts for the memory
  getMissingPartsCount(creep);

  // Check if creep needs to move to another room
  if (!isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) return;

  if (creep.memory.job === undefined) {
    creep.memory.job = "harvest";
    return;
  }

  // Run the creep
  const result = executeCreep(creep, creep.memory.job);

  switch (result) {
    case "full":
      // Delete targetId
      delete creep.memory.targetId;
      creep.memory.miniJob = "mineral";

      // Switch to one of the jobs that drains energy
      creep.memory.job = "transfer";
      break;
    case "empty":
      // Delete targetId
      delete creep.memory.targetId;

      // Switch to one of the roles that gets energy
      creep.memory.job = "mineral";
      break;
    default:
      break;
  }
};

const transferer = (creep: Creep & MyCreep) => {
  // Get missing parts for the memory
  getMissingPartsCount(creep);

  if (creep.memory.job === undefined) {
    creep.memory.job = "withdraw";
    return;
  }

  // Run the creep
  const result = executeCreep(creep, creep.memory.job);

  switch (result) {
    case "full":
      // Delete targetId
      delete creep.memory.targetId;
      delete creep.memory.miniJob;

      // Check if creep needs to move to another room
      if (!isInTargetRoom(creep, creep.room.name, creep.memory.spawnRoom)) {
        return;
      }

      // Switch to one of the jobs that drains energy
      creep.memory.job = "transfer";
      break;
    case "empty":
      // Delete targetId
      delete creep.memory.targetId;
      delete creep.memory.miniJob;

      // Check if creep needs to move to another room
      if (!isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
        return;
      }

      // Switch to one of the roles that gets energy
      creep.memory.job = "withdraw";
      break;
    default:
      break;
  }
};

const upgrader = (creep: Creep & MyCreep) => {
  // Get missing parts for the memory
  getMissingPartsCount(creep);

  // Check if creep needs to move to another room
  if (!isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) return;

  // Create a acces point to the flagMemory //
  const flagMemory = Memory.flags[creep.memory.spawnRoom];

  if (creep.memory.job === undefined) {
    creep.memory.job = "withdraw";
    return;
  }

  // Run the creep
  const result = executeCreep(creep, creep.memory.job);

  switch (result) {
    case "full":
      // Delete targetId
      delete creep.memory.targetId;

      // Switch to one of the jobs that drains energy
      creep.memory.job = "upgrade";
      break;
    case "empty":
      // Delete targetId
      delete creep.memory.targetId;

      // Switch to one of the roles that gets energy
      if (
        flagMemory.commonMemory.energyStored.usable >= 10 * 1000 ||
        (flagMemory.commonMemory.controllerStorage &&
          flagMemory.commonMemory.controllerStorage.usable >= 250 &&
          Game.getObjectById(flagMemory.commonMemory.controllerStorage.id) !== null)
      ) {
        creep.memory.job = "withdraw";
      } else {
        creep.memory.job = "harvest";
      }
      break;
    default:
      break;
  }
};

const repairer = (creep: Creep & MyCreep) => {
  // Get missing parts for the memory
  getMissingPartsCount(creep);

  // Check if creep needs to move to another room
  if (!isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) return;

  // Create a acces point to the flagMemory //
  const flagMemory = Memory.flags[creep.memory.spawnRoom];

  if (creep.memory.job === undefined) {
    creep.memory.job = "withdraw";
    return;
  }

  // Run the creep
  const result = executeCreep(creep, creep.memory.job);

  switch (result) {
    case "full":
      // Delete targetId
      delete creep.memory.targetId;
      delete creep.memory.miniJob;

      // Switch to one of the jobs that drains energy
      if (flagMemory.commonMemory.repair.targets.length > 0) creep.memory.job = "repair";
      else creep.memory.job = "upgrade";
      break;
    case "empty":
      // Delete targetId
      delete creep.memory.targetId;
      delete creep.memory.miniJob;

      // Switch to one of the roles that gets energy
      if (flagMemory.commonMemory.energyStored.usable >= 2000) {
        creep.memory.job = "withdraw";
      } else {
        creep.memory.job = "harvest";
      }
      break;
    default:
      break;
  }
};

const builder = (creep: Creep & MyCreep) => {
  // Get missing parts for the memory
  getMissingPartsCount(creep);

  // Check if creep needs to move to another room
  if (!isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) return;

  // Create a acces point to the flagMemory //
  const flagMemory = Memory.flags[creep.memory.spawnRoom];

  if (creep.memory.job === undefined) {
    creep.memory.job = "withdraw";
    return;
  }

  // Run the creep
  const result = executeCreep(creep, creep.memory.job);

  switch (result) {
    case "full":
      // Delete targetId
      delete creep.memory.targetId;
      delete creep.memory.miniJob;

      // Switch to one of the jobs that drains energy
      if (flagMemory.commonMemory.constructionSites.length > 0) creep.memory.job = "build";
      else creep.memory.job = "upgrade";
      break;
    case "empty":
      // Delete targetId
      delete creep.memory.targetId;
      delete creep.memory.miniJob;

      // Switch to one of the roles that gets energy
      if (flagMemory.commonMemory.energyStored.usable >= 2000) {
        creep.memory.job = "withdraw";
      } else {
        creep.memory.job = "harvest";
      }
      break;
    default:
      break;
  }
};

const reserver = (creep: Creep & MyCreep) => {
  // Get missing parts for the memory
  getMissingPartsCount(creep);

  // Check if creep needs to move to another room
  if (!isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) return;

  if (creep.memory.job === undefined) {
    creep.memory.job = "reserve";
    return;
  }

  // Run the creep
  executeCreep(creep, creep.memory.job);
};

const claimer = (creep: Creep & MyCreep) => {
  // Get missing parts for the memory
  getMissingPartsCount(creep);

  // Check if creep needs to move to another room
  if (!isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) return;

  if (creep.memory.job === undefined) {
    creep.memory.job = "claim";
    return;
  }

  // Run the creep
  executeCreep(creep, creep.memory.job);
};

const runCreepRoles = (creep: Creep, roleName: string) => {
  switch (roleName) {
    case "pioneer":
      pioneer(creep);
      break;
    case "transferer":
      transferer(creep);
      break;
    case "harvester":
      harvester(creep);
      break;
    case "builder":
      builder(creep);
      break;
    case "repairer":
      repairer(creep);
      break;
    case "upgrader":
      upgrader(creep);
      break;
    case "reserver":
      reserver(creep);
      break;
    case "claimer":
      claimer(creep);
      break;
    case "mineral":
      mineral(creep);
      break;
    default:
      break;
  }
};
//#endregion

//#region Export functions
export { runCreepRoles as RunCreepRoles };
//#endregion
