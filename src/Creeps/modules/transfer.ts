// #region Require('./)
import { JobsApi } from 'Utils/Importer/internals';
import _ from 'lodash';
// #endregion

// #region Class
export class CreepRoleTransfer {
  public static transfer(creep: Creep): void | string {
    let result;

    // Make shortcut to memory
    const creepMemory = creep.memory;
    const roomMemory = Memory.rooms[creepMemory.spawnRoom];

    switch (creep.memory.miniJob) {
      case 'harvest':
        result = CreepRoleTransfer.harvest(creep);
        break;
      case 'spawner':
        result = CreepRoleTransfer.spawner(creep);
        break;
      case 'storage':
        result = CreepRoleTransfer.storage(creep);
        break;
      case 'controller':
        result = CreepRoleTransfer.controller(creep);
        break;
      case 'mineral':
        result = CreepRoleTransfer.mineral(creep);
        break;
      case 'droppedResource':
        result = CreepRoleTransfer.droppedResource(creep);
        break;
      default:
        // If creep is a mineral harvester, only transfer to storage
        if (creepMemory.role === 'mineral') {
          creep.memory.miniJob = 'mineral';
          break;
        } else if (creepMemory.role.includes('LD')) {
          creep.memory.miniJob = 'storage';
          break;
        }

        if (creep.store.energy === 0 && creep.store.getUsedCapacity() > 0) {
          creep.memory.miniJob = 'droppedResource';
        }

        if (roomMemory.jobs.spawnerEnergyStructures!.length > 0) {
          creep.memory.miniJob = 'spawner';
          break;
        } else if (
          roomMemory.commonMemory!.energyStored.capacity > 10000 &&
          roomMemory.commonMemory!.energyStored.capacity / 10 > roomMemory.commonMemory!.energyStored.usable
        ) {
          creep.memory.miniJob = 'storage';
          break;
        } else if (
          roomMemory.commonMemory!.controllerStorage &&
          roomMemory.commonMemory!.controllerStorage.usable < 1500 &&
          roomMemory.commonMemory!.controllerStorage.type === STRUCTURE_CONTAINER &&
          Game.getObjectById(roomMemory.commonMemory!.controllerStorage.id!) !== null
        ) {
          creep.memory.miniJob = 'controller';
          break;
        } else if (
          roomMemory.commonMemory!.energyStored.capacity > 10000 &&
          roomMemory.commonMemory!.energyStored.capacity / 2 > roomMemory.commonMemory!.energyStored.usable
        ) {
          creep.memory.miniJob = 'storage';
        }

        // Return full if no condition hit
        return 'full';
    }

    // Return result
    return result;
  }

  private static droppedResource(creep: Creep): void | string {
    // Return empty if current creep's storage is empty
    if (creep.store.getUsedCapacity() === 0) {
      return 'empty';
    }

    // Get the storage and resource
    const target: StructureStorage | undefined = creep.room.storage;
    const resource: ResourceConstant | undefined = _.first(Object.values(creep.store)) as ResourceConstant;

    // Return empty if transferStructure is null
    if (target === undefined || resource === undefined) {
      return 'empty';
    }
    // Run the transfer function
    const result: ScreepsReturnCode = creep.transfer(target, resource);

    // Switch based on the results
    switch (result) {
      case ERR_NOT_IN_RANGE:
        // If creep is not in range, move to target
        creep.moveTo(target);
        break;
      default:
        break;
    }
  }

  private static mineral(creep: Creep): void | string {
    // Make shortcut to memory
    const creepMemory: CreepMemory = creep.memory;
    const roomMemory: RoomMemory = Memory.rooms[creepMemory.targetRoom];

    // Return empty if current creep's storage is empty
    if (creep.store.getUsedCapacity() === 0) {
      return 'empty';
    }

    // Get the storage
    const target: StructureStorage | undefined = creep.room.storage;

    // Return empty if transferStructure is null
    if (
      target === undefined ||
      !roomMemory.commonMemory ||
      !roomMemory.commonMemory.mineral ||
      !roomMemory.commonMemory.mineral.type
    ) {
      return 'empty';
    }
    // Run the transfer function
    const result = creep.transfer(target, roomMemory.commonMemory.mineral.type as ResourceConstant);

    // Switch based on the results
    switch (result) {
      case ERR_NOT_IN_RANGE:
        // If creep is not in range, move to target
        creep.moveTo(target);
        break;
      default:
        break;
    }
  }

  private static harvest(creep: Creep): void | string {
    // Make shortcut to memory
    const creepMemory: CreepMemory = creep.memory;
    const roomMemory: RoomMemory = Memory.rooms[creepMemory.targetRoom];

    // Return empty if current creep's storage is empty
    if (creep.store.getUsedCapacity() === 0) {
      return 'empty';
    }

    // If creep memory is missing a targetId, find one
    if (!creepMemory.targetId) {
      // Set the storage pos as found in memory
      const storagePos = roomMemory.roomPlanner!.room.sources[creepMemory.sourceNumber!]
        ? roomMemory.roomPlanner!.room.sources[creepMemory.sourceNumber!].pos
        : null;
      if (storagePos === null) {
        return;
      }

      // Find all structures that are at the storagePos
      const foundStructures: any[] = creep.room.lookForAt(LOOK_STRUCTURES, storagePos!.x, storagePos!.y);

      // Loop through all structures that are found at storagePos and try to find a container or link
      let sourceStructure: { type: StructureConstant; id: string } | undefined;
      foundStructures.forEach((structure: StructureLink | StructureContainer) => {
        if (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_LINK) {
          sourceStructure = {
            type: structure.structureType,
            id: structure.id
          };
        }
      });

      // If a source structure was found, set the target Id to that structure
      if (sourceStructure) {
        creep.memory.targetId = sourceStructure.id;
      }
    } else {
      // Get the saved structure from memory
      const transferStructure: Structure | null = Game.getObjectById(creepMemory.targetId);

      // Return empty if transferStructure is null
      if (transferStructure === null) {
        return 'empty';
      }

      // Run the transfer function
      const result = creep.transfer(transferStructure, RESOURCE_ENERGY);

      // Switch based on the results
      switch (result) {
        case ERR_NOT_IN_RANGE:
          // If creep is not in range, move to target
          creep.moveTo(transferStructure);
          break;
        case ERR_INVALID_TARGET:
          // Delete targetId
          delete creep.memory.targetId;
          roomMemory.roomPlanner!.room.sources[creep.memory.sourceNumber!].id = '';
          break;
        default:
          break;
      }
    }
  }

  private static spawner(creep: Creep): void | string {
    // Make shortcut to memory
    const creepMemory: CreepMemory = creep.memory;
    const roomMemory: RoomMemory = Memory.rooms[creepMemory.targetRoom];

    // Return empty if current creep's storage is empty
    if (creep.store.getUsedCapacity() === 0) {
      return 'empty';
    }

    // If Target is already full of energy
    if (
      creepMemory.targetId &&
      Game.getObjectById(creepMemory.targetId) !== null &&
      (Game.getObjectById(creepMemory.targetId) as StructureStorage).store.getFreeCapacity(RESOURCE_ENERGY) === 0
    ) {
      return 'full';
    }

    if (roomMemory.jobs.spawnerEnergyStructures!.length === 0 && !creepMemory.targetId) {
      return 'empty';
    }

    // If creep is missing targetId
    if (creepMemory.targetId === undefined) {
      // Find and shift the first energy structure in the spawner array
      const getEnergyInCreep = creep.store.getUsedCapacity(RESOURCE_ENERGY);

      const job: JobTemplate | undefined = JobsApi.getClosestJob(creep.pos, roomMemory.jobs.spawnerEnergyStructures!);
      if (job && job.needed! <= 0) {
        roomMemory.jobs.spawnerEnergyStructures = JobsApi.removeJob(job.id, roomMemory.jobs.spawnerEnergyStructures!);
        delete creep.memory.targetId;
        return;
      }

      // Get first id from array, shift only if creep can fill the whole target.
      if (job && job.needed! <= getEnergyInCreep) {
        creep.memory.targetId = job.id;
        roomMemory.jobs.spawnerEnergyStructures = JobsApi.removeJob(job.id, roomMemory.jobs.spawnerEnergyStructures!);
      } else if (job && job.needed) {
        creep.memory.targetId = job.id;
        job.needed -= getEnergyInCreep;
      }
    } else {
      // Get the saved structure from memory
      const transferStructure: StructureExtension | StructureSpawn | null = Game.getObjectById(creepMemory.targetId);

      // Return empty if transferStructure is null
      if (transferStructure === null) {
        return 'empty';
      }

      // Run the transfer function
      const result = creep.transfer(transferStructure, RESOURCE_ENERGY);

      // Switch based on the results
      switch (result) {
        case OK:
        case ERR_INVALID_TARGET:
        case ERR_FULL:
          case ERR_NO_PATH:
          // Delete targetId
          roomMemory.jobs.spawnerEnergyStructures = JobsApi.removeJob(
            creep.memory.targetId!,
            roomMemory.jobs.spawnerEnergyStructures!
          );
          delete creep.memory.targetId;
          break;
        case ERR_NOT_IN_RANGE:
          // If creep is not in range, move to target
          creep.moveTo(transferStructure);
          break;
        default:
          break;
      }
    }
  }

  private static storage(creep: Creep): void | string {
    // Make shortcut to memory
    const creepMemory: CreepMemory = creep.memory;
    const spawnRoom: Room = Game.rooms[creepMemory.spawnRoom];
    const roomMemory: RoomMemory = Memory.rooms[creepMemory.spawnRoom];

    // Return empty if current creep's storage is empty
    if (creep.store.getUsedCapacity() === 0 || spawnRoom === undefined) {
      return 'empty';
    }

    // If there is enough energy in storage
    if (
      roomMemory.commonMemory!.energyStored.capacity > 10000 &&
      roomMemory.commonMemory!.energyStored.capacity / 2 < roomMemory.commonMemory!.energyStored.usable
    ) {
      return 'empty';
    }

    // If room is in need of more energy in the storage/terminal
    if (creepMemory.targetId === undefined) {
      // If there is enough space in storage
      if (spawnRoom.storage && spawnRoom.storage.store.getUsedCapacity(RESOURCE_ENERGY) < 400 * 1000) {
        creepMemory.targetId = spawnRoom.storage.id;
        // If there is enough space in terminal
      } else if (spawnRoom.terminal && spawnRoom.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < 100 * 1000) {
        creepMemory.targetId = spawnRoom.terminal.id;
      }
    } else {
      // Get the saved structure from memory
      const transferStructure: AnyStructure | null = Game.getObjectById(creepMemory.targetId);

      // Return empty if transferStructure is null
      if (transferStructure === null) {
        return 'empty';
      }

      // Run the transfer function
      const result = creep.transfer(transferStructure, RESOURCE_ENERGY);

      // Switch based on the results
      switch (result) {
        case OK:
        case ERR_INVALID_TARGET:
        case ERR_FULL:
          // Delete targetId
          delete creep.memory.targetId;
          return;
        case ERR_NOT_IN_RANGE:
          // If creep is not in range, move to target
          creep.moveTo(transferStructure);
          break;
        default:
          break;
      }
    }
  }

  private static controller(creep: Creep): void | string {
    // Make shortcut to memory
    const creepMemory: CreepMemory = creep.memory;
    const roomMemory: RoomMemory = Memory.rooms[creepMemory.targetRoom];

    // Return empty if current creep's storage is empty
    if (creep.store.getUsedCapacity() === 0) {
      return 'empty';
    }

    // Return if controller object is undefined
    if (roomMemory.commonMemory!.controllerStorage === undefined) {
      return 'empty';
    }

    // If controller structure has enough energy
    if (
      (roomMemory.commonMemory!.controllerStorage.usable > 1750 ||
        roomMemory.commonMemory!.controllerStorage.type !== STRUCTURE_CONTAINER) &&
      !creep.memory.targetId
    ) {
      return 'empty';
    }

    // Get the saved structure from memory
    const transferStructure: AnyStructure | null = Game.getObjectById(roomMemory.commonMemory!.controllerStorage.id!);

    // Return empty if transferStructure is null
    if (transferStructure === null) {
      return 'empty';
    }

    // Run the transfer function
    const result = creep.transfer(transferStructure, RESOURCE_ENERGY);

    // Switch based on the results
    switch (result) {
      case OK:
      case ERR_INVALID_TARGET:
      case ERR_FULL:
        // Delete targetId
        delete creep.memory.targetId;
        if (result === ERR_INVALID_TARGET) {
          roomMemory.commonMemory!.controllerStorage.id! = '';
        }
        break;
      case ERR_NOT_IN_RANGE:
        // If creep is not in range, move to target
        creep.moveTo(transferStructure);
        break;
      default:
        break;
    }
  }
}
// #endregion
