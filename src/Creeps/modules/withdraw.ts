// #region Require('./)
import { CreepRoleResourcePicker, JobsApi, JobsHelper } from 'Utils/Importer/internals';
// #endregion

// #region Class
export class CreepRoleWithdraw {
  public static withdraw(creep: Creep): string | void {
    let result: string | void;

    // Make shortcut to memory
    const creepMemory = creep.memory;
    const roomMemory = Memory.rooms[creepMemory.targetRoom];

    switch (creepMemory.miniJob) {
      case 'upgrade':
        result = CreepRoleWithdraw.upgrade(creep);
        break;
      case 'normal':
        result = CreepRoleWithdraw.normal(creep);
        break;
      case 'droppedResource':
        result = CreepRoleResourcePicker.droppedResource(creep);
        break;
      default:
        if (
          creepMemory.role.includes('upgrade') &&
          roomMemory.commonMemory!.controllerStorage &&
          Game.getObjectById(roomMemory.commonMemory!.controllerStorage.id!) !== null
        ) {
          creep.memory.miniJob = 'upgrade';
        } else if (
          roomMemory.commonMemory!.energyStored.usable > 500 &&
          roomMemory.roomType === "owned" &&
          roomMemory.jobs.spawnerEnergyStructures!.length > 0
        ) {
          creep.memory.miniJob = 'normal';
        } else if (roomMemory.jobs.droppedResources.length > 0) {
          creep.memory.miniJob = 'droppedResource';
        } else if (roomMemory.commonMemory!.energyStored.usable > 500) {
          creep.memory.miniJob = 'normal';
        } else {
          return 'empty';
        }
        break;
    }

    // Return result
    return result;
  }

  private static normal(creep: Creep): string | void {
    // Make shortcut to memory
    const creepMemory = creep.memory;
    const roomMemory = Memory.rooms[creepMemory.targetRoom];

    // Return full if current creep's storage is full
    if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
      return 'full';
    }

    // If there is not enough to withdraw from, return empty to get another goal if possible
    if (
      roomMemory.commonMemory!.energyStored.usable <= creep.store.getCapacity() &&
      creep.memory.targetId === undefined
    ) {
      if (creep.room.name !== creepMemory.targetRoom && !creep.pos.inRangeTo(creep.room.controller!, 10)) creep.moveTo(creep.room.controller!);
      return 'empty';
    }

    // If creep memory is missing a targetId, find one
    if (!creep.memory.targetId) {
      let job: JobTemplate;
      if (creepMemory.role === 'transferer' && roomMemory.jobs.spawnerEnergyStructures!.length > 0) {
        job = roomMemory.jobs.energyStorages.sort((a, b) => b.usable! - a.usable!)[0];
      } else if (
        (creepMemory.role === 'transferer' || creepMemory.role === 'pioneer') &&
        roomMemory.jobs.spawnerEnergyStructures!.length === 0
      ) {
        const allContainerStoragesJobs: JobTemplate[] = JobsHelper.getAllContainerEnergyStoragesJobs(creep.room);
        job = allContainerStoragesJobs.sort((a, b) => b.usable! - a.usable!)[0];
        if (allContainerStoragesJobs.length === 0 || Game.getObjectById(job.id) === null) {
          if (creep.pos.inRangeTo(creep.room.storage!, 10)) {
            creep.moveTo(creep.room.controller!);
            return;
          }
          return;
        }
      } else {
        job = roomMemory.jobs.energyStorages.sort((a, b) => b.usable! - a.usable!)[0];
      }

      if (job === undefined) {
        creep.moveTo(creep.room.controller!);
        return;
      }
      roomMemory.jobs.energyStorages.forEach((structureInMem: JobTemplate) => {
        if (structureInMem.id === job.id && structureInMem.usable) {
          if (structureInMem.usable > 0) {
            roomMemory.commonMemory!.energyStored.usable -= creep.store.getFreeCapacity(RESOURCE_ENERGY);
            structureInMem.usable -= creep.store.getFreeCapacity(RESOURCE_ENERGY);
          }
        }
      });

      if (job.usable! > 0) {
        creep.memory.targetId = job.id;
      }
    } else {
      if (creepMemory.targetId === undefined) {
        delete creep.memory.targetId;
        return;
      }

      // Get the saved structure from memory
      const withdrawStructure: AnyStructure | null = Game.getObjectById(creepMemory.targetId);

      if (withdrawStructure === null) {
        delete creep.memory.targetId;
        return;
      }

      // Run the withdraw function
      const result = creep.withdraw(withdrawStructure, RESOURCE_ENERGY);
      // Switch based on the results
      switch (result) {
        case OK:
          break;
        case ERR_NOT_IN_RANGE:
          // If creep is not in range, move to target
          creep.moveTo(withdrawStructure);
          break;
        case ERR_INVALID_TARGET:
        case ERR_NOT_ENOUGH_RESOURCES:
          // Delete targetId
          delete creep.memory.targetId;
          break;
        default:
          break;
      }
    }
  }

  private static upgrade(creep: Creep): string | void {
    // Make shortcut to memory
    const creepMemory: CreepMemory = creep.memory;
    const roomMemory: RoomMemory = Memory.rooms[creepMemory.targetRoom];

    // Return full if current creep's storage is full
    if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
      return 'full';
    }
    if (roomMemory.commonMemory!.controllerStorage === undefined) {
      return 'empty';
    }

    // Get the saved structure from memory
    const withdrawStructure: StructureContainer | StructureLink | null = Game.getObjectById(
      roomMemory.commonMemory!.controllerStorage.id!
    );

    if (withdrawStructure === null) {
      return 'empty';
    }

    // Run the withdraw function
    const result = creep.withdraw(withdrawStructure, RESOURCE_ENERGY);

    // Switch based on the results
    switch (result) {
      case OK:
        break;
      case ERR_NOT_IN_RANGE:
        // If creep is not in range, move to target
        creep.moveTo(withdrawStructure);
        break;
      case ERR_INVALID_TARGET:
      case ERR_NOT_ENOUGH_RESOURCES:
        // Return
        return 'empty';
      default:
        break;
    }
  }
}
// #endregion
