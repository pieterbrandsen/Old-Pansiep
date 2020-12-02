//#region Require('./)
import _ from "lodash";
import { Config, CreepRole_ResourcePicker, JobsHelper } from "Utils/importer/internals";
//#endregion

//#region Class
export class CreepRole_Withdraw {
  public static withdraw(creep: Creep): string | undefined {
    let result: string | undefined;

    // Make shortcut to memory
    const creepMemory = creep.memory;
    const roomMemory = Memory.rooms[creepMemory.targetRoom];

    switch (creepMemory.miniJob) {
      case "upgrade":
        result = CreepRole_Withdraw.upgrade(creep);
        break;
      case "normal":
        result = CreepRole_Withdraw.normal(creep);
        break;
        case "droppedResource": 
        result = CreepRole_ResourcePicker.droppedResource(creep);
        break;
      default:
        if (
          roomMemory.commonMemory!.controllerStorage &&
          creepMemory.role.includes("upgrade") &&
          Game.getObjectById(roomMemory.commonMemory!.controllerStorage.id!) !== null &&
          roomMemory.commonMemory!.controllerStorage.usable > 250
        ) {
          creep.memory.miniJob = "upgrade";
        } else if (
          roomMemory.commonMemory!.energyStored.usable > 500 &&
          roomMemory.jobs.spawnerEnergyStructures!.length > 0
        ) {
          creep.memory.miniJob = "normal";
        } else if (roomMemory.jobs.droppedResources.length > 0) {
          creep.memory.miniJob = "droppedResource";
        } else if (
          roomMemory.commonMemory!.energyStored.usable > 500
        ) {
          creep.memory.miniJob = "normal";
        } else {
          return "empty";
        }
        break;
    }

    // Return result
    return result;
  }

  private static normal(creep: Creep): string | undefined {
    // Make shortcut to memory
    const creepMemory = creep.memory;
    const roomMemory = Memory.rooms[creepMemory.targetRoom];

    // Return full if current creep's storage is full
    if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
      return "full";
    }

    // If there is not enough to withdraw from, return empty to get another goal if possible
    if (
      roomMemory.commonMemory!.energyStored.usable <= creep.store.getCapacity() &&
      creep.memory.targetId === undefined
    ) {
      return "empty";
    }

    // If creep memory is missing a targetId, find one
    if (!creep.memory.targetId) {
      let job: JobTemplate;
      if (creepMemory.role === "transferer" && roomMemory.jobs.spawnerEnergyStructures!.length > 0) {
        job = roomMemory.jobs.energyStorages.sort((a, b) => b.usable! - a.usable!)[0];
      } else if (
        (creepMemory.role === "transferer" || creepMemory.role === "pioneer") &&
        roomMemory.jobs.spawnerEnergyStructures!.length === 0
      ) {
        const allContainerStoragesJobs: JobTemplate[] = JobsHelper.getAllContainerEnergyStoragesJobs(creep.room);
        job = allContainerStoragesJobs.sort((a, b) => b.usable! - a.usable!)[0];
        if (allContainerStoragesJobs.length === 0 || Game.getObjectById(job.id) === null) {
          if (creep.pos.inRangeTo(creep.room.storage!, 10)) {
            creep.moveTo(creep.room.controller!);
            return;
          } else {
            return;
          }
        }
      } else {
        job = roomMemory.jobs.energyStorages.sort((a, b) => b.usable! - a.usable!)[0];
      }

      if (job === undefined) {
        return;
      }
      roomMemory.jobs.energyStorages.forEach((structureInMem: any) => {
        if (structureInMem.id === job.id) {
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

    return;
  }

  private static upgrade(creep: Creep): string | undefined {
    // Make shortcut to memory
    const creepMemory: CreepMemory = creep.memory;
    const roomMemory: RoomMemory = Memory.rooms[creepMemory.targetRoom];

    // Return full if current creep's storage is full
    if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
      return "full";
    }
    if (roomMemory.commonMemory!.controllerStorage === undefined) {
      return "empty";
    }

    // Get the saved structure from memory
    const withdrawStructure: StructureContainer | StructureLink | null = Game.getObjectById(
      roomMemory.commonMemory!.controllerStorage.id!
    );

    if (withdrawStructure === null) {
      return "empty";
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
        return "empty";
      default:
        break;
    }
    return;
  }
}
//#endregion
