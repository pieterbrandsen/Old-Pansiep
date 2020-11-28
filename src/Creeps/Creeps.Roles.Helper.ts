//#region Require('./)
import {
  Config,
  MemoryApi_All,
  CreepRole_Build,
  CreepRole_Withdraw,
  CreepRole_Upgrade,
  CreepRole_Claim,
  CreepRole_Harvest,
  CreepRole_Repair,
  CreepRole_Reserve,
  CreepRole_Transfer
} from "Utils/importer/internals";
//#endregion

//#region Class
export class CreepsHelper_Role {
  public static runCreepRoles(creep: Creep, shortRoleName: string) {
    switch (shortRoleName) {
      case "pioneer":
        this.pioneer(creep);
        break;
      case "transferer":
        this.transferer(creep);
        break;
      case "harvester":
        this.harvester(creep);
        break;
      case "builder":
        this.builder(creep);
        break;
      case "repairer":
        this.repairer(creep);
        break;
      case "upgrader":
        this.upgrader(creep);
        break;
      case "reserver":
        this.reserver(creep);
        break;
      case "claimer":
        this.claimer(creep);
        break;
      case "mineral":
        this.mineral(creep);
        break;
      default:
        break;
    }
  }

  private static executeCreep(creep: Creep, job: string): void | string {
    switch (job) {
      case "build":
        return MemoryApi_All.functionRunnerWithCpu(
          CreepRole_Build.build,
          Config.creepModuleCpuCost[creep.room.name],
          job,
          "+=",
          creep
        );
      case "claim":
        return MemoryApi_All.functionRunnerWithCpu(
          CreepRole_Claim.claim,
          Config.creepModuleCpuCost[creep.room.name],
          job,
          "+=",
          creep
        );
      case "harvest":
        return MemoryApi_All.functionRunnerWithCpu(
          CreepRole_Harvest.source,
          Config.creepModuleCpuCost[creep.room.name],
          job,
          "+=",
          creep
        );
      case "mineral":
        return MemoryApi_All.functionRunnerWithCpu(
          CreepRole_Harvest.mineral,
          Config.creepModuleCpuCost[creep.room.name],
          job,
          "+=",
          creep
        );
      case "repair":
        return MemoryApi_All.functionRunnerWithCpu(
          CreepRole_Repair.repair,
          Config.creepModuleCpuCost[creep.room.name],
          job,
          "+=",
          creep
        );
      case "reserve":
        return MemoryApi_All.functionRunnerWithCpu(
          CreepRole_Reserve.reserve,
          Config.creepModuleCpuCost[creep.room.name],
          job,
          "+=",
          creep
        );
      case "transfer":
        return MemoryApi_All.functionRunnerWithCpu(
          CreepRole_Transfer.transfer,
          Config.creepModuleCpuCost[creep.room.name],
          job,
          "+=",
          creep
        );
      case "upgrade":
        return MemoryApi_All.functionRunnerWithCpu(
          CreepRole_Upgrade.upgrade,
          Config.creepModuleCpuCost[creep.room.name],
          job,
          "+=",
          creep
        );
      case "withdraw":
        return MemoryApi_All.functionRunnerWithCpu(
          CreepRole_Withdraw.withdraw,
          Config.creepModuleCpuCost[creep.room.name],
          job,
          "+=",
          creep
        );
      default:
        break;
    }
  }

  private static isInTargetRoom(creep: Creep, currentRoom: string, targetRoom: string): boolean {
    // Check if current room is target room, return true if not false
    if (currentRoom === targetRoom) {
      return true;
    } else {
      return this.moveToRoom(creep, targetRoom);
    }
  }

  private static getMissingPartsCount(creep: Creep): void {
    // Assign the known creep parts currently active to the creep's memory
    if (!creep.memory.parts) {
      creep.memory.parts = {
        work: creep.getActiveBodyparts(WORK),
        carry: creep.getActiveBodyparts(CARRY)
      };
    }
  }

  private static moveToRoom(creep: Creep, targetRoom: string): boolean {
    // Define the way how the creep is going to this room
    let travelWay = "unknown";
    const targetRoomFlag = Game.flags[targetRoom];

    if (targetRoomFlag) {
      travelWay = "flag";
    }
    switch (travelWay) {
      case "flag":
        creep.moveTo(targetRoomFlag);
        break;
      default:
        creep.moveTo(new RoomPosition(25, 25, targetRoom));
        break;
    }

    // Return true if creep is in targetRoom after moving
    if (creep.room.name === targetRoom) {
      return true;
    } else {
      return false;
    }
  }

  private static pioneer = (creep: Creep): void => {
    // Get missing parts for the memory
    CreepsHelper_Role.getMissingPartsCount(creep);

    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = Memory.rooms[creep.memory.spawnRoom];

    // Check if creep needs to move to another room
    if (!CreepsHelper_Role.isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    if (!creep.memory.job) {
      creep.memory.job = "withdraw";
      return;
    }

    // Run the creep
    const result = CreepsHelper_Role.executeCreep(creep, creep.memory.job);

    switch (result) {
      case "full":
        // Delete targetId and miniJob
        delete creep.memory.targetId;
        delete creep.memory.miniJob;
        delete creep.memory.sourceId;
        delete creep.memory.sourceNumber;

        // Switch to one of the jobs that drains energy
        if (roomMemory.jobs.spawnerEnergyStructures!.length > 0) {
          creep.memory.job = "transfer";
        } else if (
          roomMemory.commonMemory!.energyStored.capacity > 10000 &&
          roomMemory.commonMemory!.energyStored.capacity / 10 > roomMemory.commonMemory!.energyStored.usable
        ) {
          creep.memory.job = "transfer";
        } else if (
          roomMemory.commonMemory!.controllerStorage !== undefined &&
          roomMemory.commonMemory!.controllerStorage.usable < 1500 &&
          roomMemory.commonMemory!.controllerStorage.type === STRUCTURE_CONTAINER
        ) {
          creep.memory.job = "transfer";
        } else if (roomMemory.jobs.damagedStructures.data.length > 0) {
          creep.memory.job = "repair";
        } else if (roomMemory.constructionSites.data.length > 0) {
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
        if (roomMemory.commonMemory!.energyStored.usable > 1500) {
          creep.memory.job = "withdraw";
        } else {
          creep.memory.job = "harvest";
        }
        break;
      default:
        break;
    }
  };

  private static harvester(creep: Creep) {
    // Get missing parts for the memory
    CreepsHelper_Role.getMissingPartsCount(creep);

    // Check if creep needs to move to another room
    if (!CreepsHelper_Role.isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    if (!creep.memory.job) {
      creep.memory.job = "harvest";
      return;
    }

    // Run the creep
    const result = CreepsHelper_Role.executeCreep(creep, creep.memory.job);

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
  }

  private static mineral(creep: Creep) {
    // Get missing parts for the memory
    CreepsHelper_Role.getMissingPartsCount(creep);

    // Check if creep needs to move to another room
    if (!CreepsHelper_Role.isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    if (!creep.memory.job) {
      creep.memory.job = "harvest";
      return;
    }

    // Run the creep
    const result = CreepsHelper_Role.executeCreep(creep, creep.memory.job);

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
  }

  private static transferer(creep: Creep) {
    // Get missing parts for the memory
    CreepsHelper_Role.getMissingPartsCount(creep);

    if (!creep.memory.job) {
      creep.memory.job = "withdraw";
      return;
    }

    // Run the creep
    const result = CreepsHelper_Role.executeCreep(creep, creep.memory.job);

    switch (result) {
      case "full":
        // Delete targetId
        delete creep.memory.targetId;
        delete creep.memory.miniJob;

        // Check if creep needs to move to another room
        if (!CreepsHelper_Role.isInTargetRoom(creep, creep.room.name, creep.memory.spawnRoom)) {
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
        if (!CreepsHelper_Role.isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
          return;
        }

        // Switch to one of the roles that gets energy
        creep.memory.job = "withdraw";
        break;
      default:
        break;
    }
  }

  private static upgrader(creep: Creep) {
    // Get missing parts for the memory
    CreepsHelper_Role.getMissingPartsCount(creep);

    // Check if creep needs to move to another room
    if (!CreepsHelper_Role.isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    // Create a acces point to the roomMemory //
    const roomMemory = Memory.rooms[creep.memory.spawnRoom];

    if (!creep.memory.job) {
      creep.memory.job = "withdraw";
      return;
    }

    // Run the creep
    const result = CreepsHelper_Role.executeCreep(creep, creep.memory.job);

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
          roomMemory.commonMemory!.energyStored.usable >= 10 * 1000 ||
          (roomMemory.commonMemory!.controllerStorage &&
            roomMemory.commonMemory!.controllerStorage.usable >= 250 &&
            Game.getObjectById(roomMemory.commonMemory!.controllerStorage.id!) !== null)
        ) {
          creep.memory.job = "withdraw";
        } else {
          creep.memory.job = "harvest";
        }
        break;
      default:
        break;
    }
  }

  private static repairer(creep: Creep) {
    // Get missing parts for the memory
    CreepsHelper_Role.getMissingPartsCount(creep);

    // Check if creep needs to move to another room
    if (!CreepsHelper_Role.isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    // Create a acces point to the roomMemory //
    const roomMemory = Memory.rooms[creep.memory.spawnRoom];

    if (!creep.memory.job) {
      creep.memory.job = "withdraw";
      return;
    }

    // Run the creep
    const result = CreepsHelper_Role.executeCreep(creep, creep.memory.job);

    switch (result) {
      case "full":
        // Delete targetId
        delete creep.memory.targetId;
        delete creep.memory.miniJob;

        // Switch to one of the jobs that drains energy
        if (roomMemory.jobs.damagedStructures.data.length > 0) {
          creep.memory.job = "repair";
        } else {
          creep.memory.job = "upgrade";
        }
        break;
      case "empty":
        // Delete targetId
        delete creep.memory.targetId;
        delete creep.memory.miniJob;

        // Switch to one of the roles that gets energy
        if (roomMemory.commonMemory!.energyStored.usable >= 2000) {
          creep.memory.job = "withdraw";
        } else {
          creep.memory.job = "harvest";
        }
        break;
      default:
        break;
    }
  }

  private static builder = (creep: Creep) => {
    // Get missing parts for the memory
    CreepsHelper_Role.getMissingPartsCount(creep);

    // Check if creep needs to move to another room
    if (!CreepsHelper_Role.isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    // Create a acces point to the roomMemory //
    const roomMemory = Memory.rooms[creep.memory.spawnRoom];

    if (!creep.memory.job) {
      creep.memory.job = "withdraw";
      return;
    }

    // Run the creep
    const result = CreepsHelper_Role.executeCreep(creep, creep.memory.job);

    switch (result) {
      case "full":
        // Delete targetId
        delete creep.memory.targetId;
        delete creep.memory.miniJob;

        // Switch to one of the jobs that drains energy
        if (roomMemory.constructionSites.data.length > 0) {
          creep.memory.job = "build";
        } else {
          creep.memory.job = "upgrade";
        }
        break;
      case "empty":
        // Delete targetId
        delete creep.memory.targetId;
        delete creep.memory.miniJob;

        // Switch to one of the roles that gets energy
        if (roomMemory.commonMemory!.energyStored.usable >= 2000) {
          creep.memory.job = "withdraw";
        } else {
          creep.memory.job = "harvest";
        }
        break;
      default:
        break;
    }
  };

  private static reserver = (creep: Creep) => {
    // Get missing parts for the memory
    CreepsHelper_Role.getMissingPartsCount(creep);

    // Check if creep needs to move to another room
    if (!CreepsHelper_Role.isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    if (!creep.memory.job) {
      creep.memory.job = "reserve";
      return;
    }

    // Run the creep
    CreepsHelper_Role.executeCreep(creep, creep.memory.job);
  };

  private static claimer = (creep: Creep) => {
    // Get missing parts for the memory
    CreepsHelper_Role.getMissingPartsCount(creep);

    // Check if creep needs to move to another room
    if (!CreepsHelper_Role.isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    if (!creep.memory.job) {
      creep.memory.job = "claim";
      return;
    }

    // Run the creep
    CreepsHelper_Role.executeCreep(creep, creep.memory.job);
  };
}
//#endregion
