// #region Require('./)
import { JobsApi, MemoryApiAll, MemoryApiRoom } from 'Utils/Importer/internals';
import _ from 'lodash';
// #endregion

// #region Class
export class RoomHelperStructure {
  public static towerRepairing(room: Room): void {
    if (room.memory.jobs.damagedStructures.data.length === 0) {
      return;
    }

    const { hitsTarget } = room.memory.jobs.damagedStructures;

    const towers: Structure[] = MemoryApiRoom.getStructuresOfType(
      room,
      STRUCTURE_TOWER,
      (tower: StructureTower) => tower.store.getUsedCapacity(RESOURCE_ENERGY) > 50
    );

    _.forEach(towers, (tower: StructureTower) => {
      const job: JobTemplate | undefined = JobsApi.getClosestJob(tower.pos, room.memory.jobs.damagedStructures.data);
      if (job) {
        const structure: Structure | null = Game.getObjectById(job.id);
        if (structure && structure.hits > 0 && structure.hits < hitsTarget) {
          tower.repair(structure);
        } else {
          room.memory.jobs.damagedStructures.data = JobsApi.removeJob(job.id, room.memory.jobs.damagedStructures.data);
        }
      }
    });
  }

  public static towerAttacking(room: Room): void {
    const towers: Structure[] = MemoryApiRoom.getStructuresOfType(
      room,
      STRUCTURE_TOWER,
      (tower: StructureTower) => tower.store.getUsedCapacity(RESOURCE_ENERGY) > 50
    );

    _.forEach(towers, (tower: StructureTower) => {
      const job: JobTemplate | undefined = JobsApi.getClosestJob(tower.pos, room.memory.jobs.enemies.creeps);
      if (job) {
        const creep: Creep | null = Game.getObjectById(job.id);
        if (creep && creep.hits > 0) {
          tower.attack(creep);
        } else {
          room.memory.jobs.enemies.creeps = JobsApi.removeJob(job.id, room.memory.jobs.enemies.creeps);
        }
      }
    });
  }

  public static towerHealing(room: Room): void {
    const damagedCreepJob: JobTemplate | undefined = _.first(room.memory.jobs.damagedCreeps);
    if (!damagedCreepJob) {
      return;
    }

    const towers: Structure[] = MemoryApiRoom.getStructuresOfType(
      room,
      STRUCTURE_TOWER,
      (tower: StructureTower) => tower.store.getUsedCapacity(RESOURCE_ENERGY) > 50
    );

    _.forEach(towers, (tower: StructureTower) => {
      const job: JobTemplate | undefined = JobsApi.getClosestJob(tower.pos, room.memory.jobs.damagedCreeps);
      if (job) {
        const creep: Creep | null = Game.getObjectById(job.id);
        if (creep && creep.hits < creep.hitsMax) {
          tower.heal(creep);
        } else {
          room.memory.jobs.damagedCreeps = JobsApi.removeJob(job.id, room.memory.jobs.damagedCreeps);
        }
      }
    });
  }

  public static runLinks(room: Room): void {
    const roomMemory: RoomMemory = room.memory;

    if (
      roomMemory.commonMemory === undefined ||
      roomMemory.commonMemory.links === undefined ||
      !MemoryApiAll.isMemoryPathDefined(`Memory.rooms.${room.name}.commonMemory.links`)
    ) {
      return;
    }

    // Define all possible sources
    const source0: StructureLink | null = Game.getObjectById(roomMemory.commonMemory.links.source0);
    const source1: StructureLink | null = Game.getObjectById(roomMemory.commonMemory.links.source1);
    const head: StructureLink | null = Game.getObjectById(roomMemory.commonMemory.links.head);
    const controller: StructureLink | null = Game.getObjectById(roomMemory.commonMemory.links.controller);

    // Define function to check if there is space in target link
    const sendEnergy = (fromLink: StructureLink, toLink: StructureLink) => {
      // If there is low space in target
      if (toLink.store.getFreeCapacity(RESOURCE_ENERGY) < 5) {
        return;
      }

      // If there is enough energy in the sending link to send to target
      if (fromLink.store.getUsedCapacity(RESOURCE_ENERGY) < 10) {
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
    else if (controller == null && room.controller !== undefined && room.controller.level >= 6) {
      const links: Structure[] = MemoryApiRoom.getStructuresOfType(
        room,
        STRUCTURE_LINK,
        (link: StructureLink) => link.pos.inRangeTo(room.controller!, 3)
      );

      if (links.length > 0) {
        room.memory.commonMemory!.links!.controller = links[0].id;
      }
    }
  }
}
// #endregion
