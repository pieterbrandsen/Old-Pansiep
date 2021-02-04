// #region Require('./)
import {
  Config,
  CreepRoleBuild,
  CreepRoleClaim,
  CreepRoleDj,
  CreepRoleHarvest,
  CreepRoleRepair,
  CreepRoleReserve,
  CreepRoleScout,
  CreepRoleTransfer,
  CreepRoleUpgrade,
  CreepRoleWithdraw,
  MemoryApiAll
} from 'Utils/Importer/internals';
// #endregion

// #region Class
export class CreepsHelperRole {
  public static runCreepRoles(creep: Creep, shortRoleName: string): void {
    switch (shortRoleName) {
      case 'pioneer':
        this.pioneer(creep);
        break;
      case 'transferer':
        this.transferer(creep);
        break;
      case 'harvester':
        this.harvester(creep);
        break;
      case 'builder':
        this.builder(creep);
        break;
      case 'repairer':
        this.repairer(creep);
        break;
      case 'upgrader':
        this.upgrader(creep);
        break;
      case 'reserver':
        this.reserver(creep);
        break;
      case 'claimer':
        this.claimer(creep);
        break;
      case 'mineral':
        this.mineral(creep);
        break;
      case 'scout':
        this.scout(creep);
        break;
        case 'dj':
          this.dj(creep);
        break;
      default:
        break;
    }
  }

  private static executeCreep(creep: Creep, job: string): void | string {
    switch (job) {
      case 'build':
        return MemoryApiAll.functionRunnerWithCpu(
          CreepRoleBuild.build, // eslint-disable-line @typescript-eslint/unbound-method
          Config.creepModuleCpuCost[creep.room.name],
          job,
          '+=',
          creep
        ) as string;
      case 'claim':
        return MemoryApiAll.functionRunnerWithCpu(
          CreepRoleClaim.claim, // eslint-disable-line @typescript-eslint/unbound-method
          Config.creepModuleCpuCost[creep.room.name],
          job,
          '+=',
          creep
        ) as string;
      case 'harvest':
        return MemoryApiAll.functionRunnerWithCpu(
          CreepRoleHarvest.source, // eslint-disable-line @typescript-eslint/unbound-method
          Config.creepModuleCpuCost[creep.room.name],
          job,
          '+=',
          creep
        ) as string;
      case 'mineral':
        return MemoryApiAll.functionRunnerWithCpu(
          CreepRoleHarvest.mineral, // eslint-disable-line @typescript-eslint/unbound-method
          Config.creepModuleCpuCost[creep.room.name],
          job,
          '+=',
          creep
        ) as string;
      case 'repair':
        return MemoryApiAll.functionRunnerWithCpu(
          CreepRoleRepair.repair, // eslint-disable-line @typescript-eslint/unbound-method
          Config.creepModuleCpuCost[creep.room.name],
          job,
          '+=',
          creep
        ) as string;
      case 'reserve':
        return MemoryApiAll.functionRunnerWithCpu(
          CreepRoleReserve.reserve, // eslint-disable-line @typescript-eslint/unbound-method
          Config.creepModuleCpuCost[creep.room.name],
          job,
          '+=',
          creep
        ) as string;
      case 'transfer':
          return MemoryApiAll.functionRunnerWithCpu(
          CreepRoleTransfer.transfer, // eslint-disable-line @typescript-eslint/unbound-method
          Config.creepModuleCpuCost[creep.room.name],
          job,
          '+=',
          creep
        ) as string;
      case 'upgrade':
        return MemoryApiAll.functionRunnerWithCpu(
          CreepRoleUpgrade.upgrade, // eslint-disable-line @typescript-eslint/unbound-method
          Config.creepModuleCpuCost[creep.room.name],
          job,
          '+=',
          creep
        ) as string;
      case 'withdraw':
        return MemoryApiAll.functionRunnerWithCpu(
          CreepRoleWithdraw.withdraw, // eslint-disable-line @typescript-eslint/unbound-method
          Config.creepModuleCpuCost[creep.room.name],
          job,
          '+=',
          creep
        ) as string;
      case 'scout':
        return MemoryApiAll.functionRunnerWithCpu(
          CreepRoleScout.scout, // eslint-disable-line @typescript-eslint/unbound-method
          Config.creepModuleCpuCost[creep.room.name],
          job,
          '+=',
          creep
        ) as string;
        case 'dj':
          return MemoryApiAll.functionRunnerWithCpu(
            CreepRoleDj.dj, // eslint-disable-line @typescript-eslint/unbound-method
            Config.creepModuleCpuCost[creep.room.name],
            job,
            '+=',
            creep
          ) as string;
      default:
        break;
    }
  }

  private static HasVisionInTargetRoom(creep: Creep, currentRoom: string, targetRoom: string): boolean {
    // Check if current room is target room, return true if not false
    if (Game.rooms[targetRoom] !== undefined) {
      return true;
    }
    return this.moveToRoom(creep, targetRoom);
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

  public static moveToRoom(creep: Creep, targetRoom: string): boolean {
    // Define the way how the creep is going to this room
    let travelWay = 'unknown';
    const targetRoomFlag = Game.flags[targetRoom];

    if (targetRoomFlag) {
      travelWay = 'flag';
    }
    switch (travelWay) {
      case 'flag':
        creep.moveTo(targetRoomFlag);
        break;
      default:
        creep.moveTo(new RoomPosition(25, 25, targetRoom));
        break;
    }

    // Return true if creep is in targetRoom after moving
    if (creep.room.name === targetRoom) {
      return true;
    }
    return false;
  }

  private static pioneer = (creep: Creep): void => {
    // Get missing parts for the memory
    CreepsHelperRole.getMissingPartsCount(creep);

    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = Memory.rooms[creep.memory.spawnRoom];

    // Check if creep needs to move to another room
    if (!CreepsHelperRole.HasVisionInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    if (!creep.memory.job) {
      creep.memory.job = 'withdraw';
      return;
    }

    // Run the creep
    const result = CreepsHelperRole.executeCreep(creep, creep.memory.job);

    switch (result) {
      case 'full':
        // Delete targetId and miniJob
        delete creep.memory.targetId;
        delete creep.memory.miniJob;
        delete creep.memory.sourceId;
        delete creep.memory.sourceNumber;

        if (!roomMemory.jobs.spawnerEnergyStructures || !roomMemory.commonMemory) {
          return;
        }

        // Switch to one of the jobs that drains energy
        if (roomMemory.jobs.spawnerEnergyStructures.length > 0) {
          creep.memory.job = 'transfer';
        } else if (
          roomMemory.commonMemory.energyStored.capacity > 10000 &&
          roomMemory.commonMemory.energyStored.capacity / 10 > roomMemory.commonMemory.energyStored.usable
        ) {
          creep.memory.job = 'transfer';
        } else if (
          roomMemory.commonMemory.controllerStorage !== undefined &&
          roomMemory.commonMemory.controllerStorage.usable < 1500 &&
          roomMemory.commonMemory.controllerStorage.type === STRUCTURE_CONTAINER
        ) {
          creep.memory.job = 'transfer';
        } else if (roomMemory.jobs.damagedStructures.data.length > 0) {
          creep.memory.job = 'repair';
        } else if (roomMemory.jobs.constructionSites.length > 0) {
          creep.memory.job = 'build';
        } else {
          creep.memory.job = 'upgrade';
        }
        break;
      case 'empty':
        // Delete targetId and sourceId
        delete creep.memory.targetId;
        delete creep.memory.sourceId;
        delete creep.memory.sourceNumber;
        delete creep.memory.miniJob;

        if (!roomMemory.jobs.spawnerEnergyStructures || !roomMemory.commonMemory) {
          return;
        }

        // Switch to one of the roles that gets energy
        // Switch to one of the roles that gets energy
        if (roomMemory.commonMemory.energyStored.usable > 1500) {
          creep.memory.job = 'withdraw';
        } else {
          creep.memory.job = 'harvest';
        }
        break;
      default:
        break;
    }
  };

  private static harvester(creep: Creep) {
    // Get missing parts for the memory
    CreepsHelperRole.getMissingPartsCount(creep);

    // Check if creep needs to move to another room
    if (!CreepsHelperRole.HasVisionInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    if (!creep.memory.job) {
      creep.memory.job = 'harvest';
      return;
    }

    // Run the creep
    const result = CreepsHelperRole.executeCreep(creep, creep.memory.job);

    switch (result) {
      case 'full':
        // Delete targetId
        delete creep.memory.targetId;
        creep.memory.miniJob = 'harvest';

        // Switch to one of the jobs that drains energy
        creep.memory.job = 'transfer';
        break;
      case 'empty':
        // Delete targetId
        delete creep.memory.targetId;

        // Switch to one of the roles that gets energy
        creep.memory.job = 'harvest';
        break;
      default:
        break;
    }
  }

  private static mineral(creep: Creep) {
    // Get missing parts for the memory
    CreepsHelperRole.getMissingPartsCount(creep);

    // Check if creep needs to move to another room
    if (!CreepsHelperRole.HasVisionInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    if (!creep.memory.job) {
      creep.memory.job = 'harvest';
      return;
    }

    // Run the creep
    const result = CreepsHelperRole.executeCreep(creep, creep.memory.job);

    switch (result) {
      case 'full':
        // Delete targetId
        delete creep.memory.targetId;
        creep.memory.miniJob = 'mineral';

        // Switch to one of the jobs that drains energy
        creep.memory.job = 'transfer';
        break;
      case 'empty':
        // Delete targetId
        delete creep.memory.targetId;

        // Switch to one of the roles that gets energy
        creep.memory.job = 'mineral';
        break;
      default:
        break;
    }
  }

  private static transferer(creep: Creep) {
    // Get missing parts for the memory
    CreepsHelperRole.getMissingPartsCount(creep);

    if (!creep.memory.job) {
      creep.memory.job = 'withdraw';
      return;
    }

    // Run the creep
    const result = CreepsHelperRole.executeCreep(creep, creep.memory.job);

    switch (result) {
      case 'full':
        // Delete targetId
        delete creep.memory.targetId;
        delete creep.memory.miniJob;

        // Check if creep needs to move to another room
        if (!CreepsHelperRole.HasVisionInTargetRoom(creep, creep.room.name, creep.memory.spawnRoom)) {
          return;
        }

        // Switch to one of the jobs that drains energy
        creep.memory.job = 'transfer';
        break;
      case 'empty':
        // Delete targetId
        delete creep.memory.targetId;
        delete creep.memory.miniJob;

        // Check if creep needs to move to another room
        if (!CreepsHelperRole.HasVisionInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
          return;
        }

        // Switch to one of the roles that gets energy
        creep.memory.job = 'withdraw';
        break;
      default:
        break;
    }
  }

  private static upgrader(creep: Creep) {
    // Get missing parts for the memory
    CreepsHelperRole.getMissingPartsCount(creep);

    // Check if creep needs to move to another room
    if (!CreepsHelperRole.HasVisionInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    // Create a acces point to the roomMemory //
    const roomMemory = Memory.rooms[creep.memory.spawnRoom];

    if (!creep.memory.job) {
      creep.memory.job = 'withdraw';
      return;
    }

    // Run the creep
    const result = CreepsHelperRole.executeCreep(creep, creep.memory.job);

    switch (result) {
      case 'full':
        // Delete targetId
        delete creep.memory.targetId;
        delete creep.memory.sourceId;

        // Switch to one of the jobs that drains energy
        creep.memory.job = 'upgrade';
        break;
      case 'empty':
        // Delete targetId
        delete creep.memory.targetId;
        delete creep.memory.sourceId;

        if (
          !roomMemory.commonMemory ||
          !roomMemory.commonMemory.controllerStorage ||
          !roomMemory.commonMemory.controllerStorage.id
        ) {
          return;
        }

        // Switch to one of the roles that gets energy
        if (
          roomMemory.commonMemory.energyStored.usable >= 10 * 1000 ||
          (roomMemory.commonMemory.controllerStorage &&
            Game.getObjectById(roomMemory.commonMemory.controllerStorage.id) !== null)
        ) {
          creep.memory.job = 'withdraw';
          creep.memory.miniJob = 'upgrade';
        } else {
          creep.memory.job = 'harvest';
        }
        break;
      default:
        break;
    }
  }

  private static repairer(creep: Creep) {
    // Get missing parts for the memory
    CreepsHelperRole.getMissingPartsCount(creep);

    // Check if creep needs to move to another room
    if (!CreepsHelperRole.HasVisionInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    // Create a acces point to the roomMemory //
    const roomMemory = Memory.rooms[creep.memory.targetRoom];

    if (!creep.memory.job) {
      creep.memory.job = 'withdraw';
      return;
    }

    // Run the creep
    const result = CreepsHelperRole.executeCreep(creep, creep.memory.job);

    switch (result) {
      case 'full':
        // Delete targetId
        delete creep.memory.targetId;
        delete creep.memory.miniJob;
        delete creep.memory.sourceId;

        // Switch to one of the jobs that drains energy
        if (roomMemory.jobs.damagedStructures.data.length > 0) {
          creep.memory.job = 'repair';
        } else if (creep.memory.spawnRoom === creep.memory.targetRoom) {
          creep.memory.job = 'upgrade';
        } else if (!creep.pos.inRangeTo(25, 25, 20)) {
          if (creep.room.controller) {
            creep.moveTo(creep.room.controller);
          } else {
            creep.moveTo(25, 25);
          }
        }
        break;
      case 'empty':
        // Delete targetId
        delete creep.memory.targetId;
        delete creep.memory.miniJob;
        delete creep.memory.sourceId;

        if (!roomMemory.commonMemory) {
          return;
        }

        // Switch to one of the roles that gets energy
        if (roomMemory.commonMemory.energyStored.usable >= 2000) {
          creep.memory.job = 'withdraw';
        } else {
          creep.memory.job = 'harvest';
        }
        break;
      default:
        break;
    }
  }

  private static builder = (creep: Creep) => {
    // Get missing parts for the memory
    CreepsHelperRole.getMissingPartsCount(creep);

    // Check if creep needs to move to another room
    if (!CreepsHelperRole.HasVisionInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    // Create a acces point to the roomMemory //
    const roomMemory = Memory.rooms[creep.memory.targetRoom];

    if (!creep.memory.job) {
      creep.memory.job = 'withdraw';
      return;
    }

    // Run the creep
    const result = CreepsHelperRole.executeCreep(creep, creep.memory.job);

    switch (result) {
      case 'full':
        // Delete targetId
        delete creep.memory.targetId;
        delete creep.memory.sourceId;
        delete creep.memory.miniJob;

        // Switch to one of the jobs that drains energy
        if (roomMemory.jobs.constructionSites.length > 0) {
          creep.memory.job = 'build';
        } else if (creep.memory.spawnRoom === creep.memory.targetRoom) {
          creep.memory.job = 'upgrade';
        } else if (roomMemory.jobs.damagedStructures.data.length > 0) {
          creep.memory.job = 'repair';
        } else {
          creep.suicide();
        }
        break;
      case 'empty':
        // Delete targetId
        delete creep.memory.targetId;
        delete creep.memory.sourceId;
        delete creep.memory.miniJob;

        if (!roomMemory.commonMemory) {
          return;
        }

        // Switch to one of the roles that gets energy
        if (roomMemory.commonMemory.energyStored.usable >= 2000 && !creep.memory.role.includes('LD')) {
          creep.memory.job = 'withdraw';
        } else {
          creep.memory.job = 'harvest';
        }
        break;
      default:
        break;
    }
  };

  private static reserver = (creep: Creep) => {
    // Check if creep needs to move to another room
    if (!CreepsHelperRole.HasVisionInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    if (!creep.memory.job) {
      creep.memory.job = 'reserve';
      return;
    }

    // Run the creep
    CreepsHelperRole.executeCreep(creep, creep.memory.job);
  };

  private static claimer = (creep: Creep) => {
    // Check if creep needs to move to another room
    if (!CreepsHelperRole.HasVisionInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    if (!creep.memory.job) {
      creep.memory.job = 'claim';
      return;
    }

    // Run the creep
    CreepsHelperRole.executeCreep(creep, creep.memory.job);
  };

  private static scout = (creep: Creep) => {
    // Check if creep needs to move to another room
    if (!CreepsHelperRole.HasVisionInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    if (!creep.memory.job) {
      creep.memory.job = 'scout';
      return;
    }

    // Run the creep
    CreepsHelperRole.executeCreep(creep, creep.memory.job);
  };

  private static dj = (creep: Creep) => {
    // Check if creep needs to move to another room
    if (!CreepsHelperRole.HasVisionInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    if (!creep.memory.job) {
      creep.memory.job = 'dj';
      return;
    }

    // Run the creep
    CreepsHelperRole.executeCreep(creep, creep.memory.job);
  };
}
// #endregion
