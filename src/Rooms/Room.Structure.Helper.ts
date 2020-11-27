//#region Require('./)
import _ from "lodash";
import { MemoryApi_Room, MemoryApi_All } from "Utils/importer/internals";
//#endregion

//#region Class
export class RoomHelper_Structure {
  public static towerRepairing(room: Room): void {
    if (room.memory.jobs.damagedStructures.data.length === 0) {
      return;
    }

    const structureId: string = _.first(room.memory.jobs.damagedStructures.data).id;
    const structure: Structure | null = Game.getObjectById(structureId);
    const hitsTarget: number = room.memory.jobs.damagedStructures.hitsTarget;

    if (structure && structure.hits < structure.hitsMax && structure.hits < hitsTarget) {
      const towers: Structure[] = MemoryApi_Room.getStructuresOfType(
        room,
        STRUCTURE_TOWER,
        (tower: StructureTower) => tower.store.getUsedCapacity(RESOURCE_ENERGY) > 50
      );

      _.forEach(towers, (tower: StructureTower) => {
        tower.repair(structure);
      });
    } else {
      room.memory.jobs.damagedStructures.data.shift();
    }
  }

  public static towerAttacking(room: Room): void {
    const creepId: string = _.first(room.memory.jobs.enemies.creeps).id;
    const creep: Structure | null = Game.getObjectById(creepId);

    if (creep && creep.hits > 0) {
      const towers: Structure[] = MemoryApi_Room.getStructuresOfType(
        room,
        STRUCTURE_TOWER,
        (tower: StructureTower) => tower.store.getUsedCapacity(RESOURCE_ENERGY) > 50
      );

      _.forEach(towers, (tower: StructureTower) => {
        tower.attack(creep);
      });
    } else {
      room.memory.jobs.enemies.creeps.shift();
    }
  }

  public static towerHealing(room: Room): void {
    const damagedCreepJob: JobTemplate = _.first(room.memory.jobs.damagedCreeps);
    const creep: Creep | null = Game.getObjectById(damagedCreepJob.id);

    if (creep && creep.hits < creep.hitsMax) {
      const towers: Structure[] = MemoryApi_Room.getStructuresOfType(
        room,
        STRUCTURE_TOWER,
        (tower: StructureTower) => tower.store.getUsedCapacity(RESOURCE_ENERGY) > 50
      );

      _.forEach(towers, (tower: StructureTower) => {
        tower.heal(creep);
      });
    } else {
      room.memory.jobs.damagedCreeps.shift();
    }
  }

  public static runLinks(room: Room): void {
    const roomMemory: RoomMemory | undefined = room.memory;

    if (
      roomMemory === undefined ||
      roomMemory.commonMemory.links === undefined ||
      !MemoryApi_All.isMemoryPathDefined(`Memory.rooms.${room.name}.commonMemory.links`)
    ) {
      return;
    }

    // Define all possible sources
    const source0: StructureLink | null = Game.getObjectById(roomMemory.commonMemory.links["source0"]);
    const source1: StructureLink | null = Game.getObjectById(roomMemory.commonMemory.links["source1"]);
    const head: StructureLink | null = Game.getObjectById(roomMemory.commonMemory.links["head"]);
    const controller: StructureLink | null = Game.getObjectById(roomMemory.commonMemory.links["controller"]);

    // Define function to check if there is space in target link
    const sendEnergy = (fromLink: StructureLink, toLink: StructureLink) => {
      // If there is low space in target
      if (toLink.store.getFreeCapacity(RESOURCE_ENERGY) < 5) {
        return;
      }

      // If there is enough energy in the sending link to send to target
      if (fromLink.store.getUsedCapacity(RESOURCE_ENERGY) < 100) {
        return;
      }

      // Send energy from fromLink to targetLink
      fromLink.transferEnergy(toLink);
    };

    if (source0 !== null && head !== null) {
      // Send energy from source0 link to head link
      sendEnergy(source0, head);
    }
    if (source1 !== null && head !== null) {
      // Send energy from source1 link to head link
      sendEnergy(source1, head);
    }
    if (head !== null && controller !== null) {
      // Send energy from head link to controller link
      sendEnergy(head, controller);
    }
  }
}
//#endregion
