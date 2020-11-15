//#region Require('./)
import { Config } from "../../Utils/importer";
//#endregion

//#region Function()
const mineralJob = (creep: Creep): string | undefined => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return full if current creep's storage is full
  if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
    return "full";
  }

  const mineral: Mineral | null = Game.getObjectById(flagMemory.commonMemory.mineral.id);

  // Return if structure is null
  if (mineral === null) return "full";

  const result = creep.harvest(mineral);
  switch (result) {
    case OK:
      // TODO ADD HARVESTED MINERAL AMOUNT
      break;
    case ERR_NOT_IN_RANGE:
      // Move to mineral
      creep.moveTo(mineral);
      break;
    default:
      break;
  }

  // Return
  return;
};

const sourceJob = (creep: Creep): string | undefined => {
  // Make shortcut to memory
  const creepMemory = creep.memory;
  const flagMemory = Memory.flags[creepMemory.targetRoom];

  // Return full if current creep's storage is full
  if (creep.store.getUsedCapacity() === creep.store.getCapacity()) {
    return "full";
  }

  // If creep has no sourceId saved
  if (creepMemory.sourceId === undefined) {
    const closestActiveSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
    if (closestActiveSource !== null) {
      creep.memory.sourceId = closestActiveSource.id;
      delete creep.memory.sourceNumber;
    } else {
      // If no active source available, move to another one and wait there.
      const closestSource = creep.pos.findClosestByRange(FIND_SOURCES);
      if (closestSource !== null && !creep.pos.inRangeTo(closestSource, 3)) {
        creep.moveTo(closestSource);
        return;
      } else return;
    }

    return;
  }

  // Get source from memory
  const source: Source | null = Game.getObjectById(creepMemory.sourceId);

  // Check if source is undefined
  if (source === null) {
    // Remove source from memory and return
    delete creep.memory.sourceId;
    delete creep.memory.sourceNumber;
    return;
  }

  // If not in range, move to source and then return
  if (!creep.pos.inRangeTo(source, 1) || (!creepMemory.onPosition && creepMemory.role.includes("harvester"))) {
    let sourcePos = source.pos;
    const sourceNumber = creepMemory.sourceNumber;

    // If no sourceNumber is found, assign one.
    if (sourceNumber === undefined) {
      // If sourceNumber is in creep's role
      if (
        creep.memory.role.split("-").length > 0 &&
        //@ts-ignore
        !isNaN(creep.memory.role.split("-")[1])
      ) {
        creep.memory.sourceNumber = Number(creep.memory.role.split("-")[1]);
      } else {
        // Else loop until assigned source's id is found
        let i = 0;
        while (i < flagMemory.commonMemory.sources.length) {
          const newSource = flagMemory.commonMemory.sources[i];
          if (newSource.id === source.id) {
            creep.memory.sourceNumber = i;
          }
          i++;
        }
      }
    } else {
      // Check each 10 ticks if there is still space around the source for this creep
      const creepsAroundTargetSource = creep.room.lookForAtArea(
        LOOK_CREEPS,
        source.pos.y - 1,
        source.pos.x - 1,
        source.pos.y + 1,
        source.pos.x + 1,
        true
      ).length;
      const roomPlannerTargetSource = flagMemory.roomPlanner.room.sources[sourceNumber];
      if (roomPlannerTargetSource === undefined) return;

      if (creepsAroundTargetSource < roomPlannerTargetSource.spotsAround || creepMemory.role.includes("harvester")) {
        if (creepMemory.role.includes("harvester")) {
          sourcePos = roomPlannerTargetSource.pos;
        }
      } else {
        let i = 0;
        while (i < flagMemory.commonMemory.sources.length) {
          const newSource = flagMemory.commonMemory.sources[i];
          const roomPlannerNewSource = flagMemory.roomPlanner.room.sources[i];
          if (roomPlannerNewSource !== null) {
            const creepsAroundNewSource = creep.room.lookForAtArea(
              LOOK_CREEPS,
              newSource.pos.y - 1,
              newSource.pos.x - 1,
              newSource.pos.y + 1,
              newSource.pos.x + 1,
              true
            ).length;

            if (newSource.id !== source.id && creepsAroundNewSource < roomPlannerNewSource.spotsAround) {
              creep.memory.sourceId = newSource.id;
              creep.memory.sourceNumber = i;
              return;
            }
          }
          i++;
        }
        if (!creep.pos.inRangeTo(source, 5)) {
          creep.moveTo(source);
          return;
        } else return;
      }
    }

    // Move to source
    if (sourcePos.x !== source.pos.x || sourcePos.y !== source.pos.y) {
      if (creep.pos.inRangeTo(sourcePos.x, sourcePos.y, 0)) {
        creep.memory.onPosition = true;
      } else creep.moveTo(sourcePos.x, sourcePos.y);
    } else {
      if (creep.pos.inRangeTo(sourcePos.x, sourcePos.y, 1)) {
        creep.memory.onPosition = true;
      } else creep.moveTo(sourcePos.x, sourcePos.y);
    }

    return;
  } else {
    const result = creep.harvest(source);
    switch (result) {
      case OK:
        if (creepMemory.role.includes("LD")) {
          Config.income.remoteHarvesting[creep.room.name] += creep.memory.parts.work * 2;
        } else {
          Config.income.ownedHarvesting[creep.room.name] += creep.memory.parts.work * 2;
        }
        break;
      case ERR_NOT_ENOUGH_RESOURCES:
      case ERR_INVALID_TARGET:
        if (creep.memory.role.includes("-")) break;
        delete creep.memory.sourceId;
        delete creep.memory.sourceNumber;
        break;
      default:
        break;
    }
  }

  return;
};

//#region Export functions
export { mineralJob as Mineral, sourceJob as Source };
//#endregion
