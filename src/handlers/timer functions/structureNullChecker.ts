//#region Require('./)
import { Config } from "../../Utils/importer";
//#endregion

//#region Functions()
const globalRoomStructureNullChecker = (room: Room) => {
  // Create a acces point to the flagMemory //
  const flagMemory: FlagMemory = Memory.flags[room.name];

  // Check all structures at input position
  const structureExist = (pos: RoomPosition, structureType: string) => {
    // Get all structure at input position
    const structures = room.lookForAt(LOOK_STRUCTURES, pos.x, pos.y);

    // Loop through all structures
    for (const structure of structures) {
      // Is the structure type the Structure
      if (structure.structureType === structureType) return [true, structure.id];
    }
    return [false, ""];
  };

  // Check all source structures
  for (let i = 0; i < flagMemory.roomPlanner.room.sources.length; i++) {
    // Get source
    const source = flagMemory.roomPlanner.room.sources[i];

    // Break if there is still a live structure
    if (Game.getObjectById(source.id) === null) {
      // Get all structures at saved pos
      const structureExistResult = structureExist(source.pos, source.structureType);

      // If structure was found
      if (structureExistResult[0]) {
        // Save the id back to memory
        flagMemory.roomPlanner.room.sources[i].id = structureExistResult[1];
      } else {
        // Remove id from memory if its removed
        flagMemory.roomPlanner.room.sources[i].id = undefined;
      }
    }
  }
};

const ownedRoomStructureNullChecker = (room: Room & MyRoom) => {
  // Create a acces point to the flagMemory //
  const flagMemory: FlagMemory = Memory.flags[room.name];

  // If the headSpawn is null
  if (Game.getObjectById(flagMemory.commonMemory.headSpawnId) === null) {
    // Loop for a spawn near the terminal or else get the first spawn known
    flagMemory.commonMemory.headSpawnId = room.terminal
      ? room.terminal.pos.findInRange(room.spawns, 2)[0]
        ? //@ts-ignore
          room.terminal.pos.findInRange(room.spawns, 2)[0].id
        : room.spawns[0].id
      : room.spawns[0].id;
  }
  // If the controller storage is undefined or null
  if (
    flagMemory.commonMemory.controllerStorage === undefined ||
    //@ts-ignore: Id can be undefined
    Game.getObjectById(flagMemory.commonMemory.controllerStorage.id) === null
  ) {
    // If the roomPlanner knows the position
    if (flagMemory.roomPlanner.room.controller && flagMemory.roomPlanner.room.controller.pos) {
      // Create a shortcut to the controller storage position
      const controllerPos = flagMemory.roomPlanner.room.controller.pos;
      // Find all structures at the known controller position
      const foundStructures = room.lookForAt(LOOK_STRUCTURES, controllerPos.x, controllerPos.y);

      // Save the found controller storage
      let controllerStorage: FlagMemory["commonMemory"]["controllerStorage"];

      // Loop through each of the structures found
      foundStructures.forEach(structure => {
        // If the structure is a container or link
        if (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_LINK) {
          // Save everything known of the structure
          controllerStorage = {
            usable: 0,
            type: structure.structureType,
            id: structure.id
          };
        }
      });

      // If the structure was found in the loop, save everything to the flagMemory
      if (flagMemory.commonMemory.controllerStorage !== undefined && controllerStorage) {
        flagMemory.commonMemory.controllerStorage.id = controllerStorage.id;
        flagMemory.commonMemory.controllerStorage.type = controllerStorage.type;
      } else if (flagMemory.commonMemory.controllerStorage !== undefined)
        flagMemory.commonMemory.controllerStorage.usable = 0;
    }
  }

  // Check all links to see if its still there //
  // Check each source for a link
  if (room.links.length >= 2) {
    for (let i = 0; i < flagMemory.commonMemory.sources.length; i++) {
      // Get the source
      const source: Source | null = Game.getObjectById(flagMemory.commonMemory.sources[i].id);

      // If source is not null
      if (source !== null) {
        // Find a link
        const sourceLink = source.pos.findInRange(FIND_MY_STRUCTURES, 2, {
          filter: { structureType: STRUCTURE_LINK }
        })[0];

        // If a link is found, set it to the memory
        if (flagMemory.commonMemory.links !== undefined && sourceLink !== undefined) {
          flagMemory.commonMemory.links[`source${i}`] = sourceLink.id;
        }
      }
    }

    // Check if there is a link at the headSpawn
    const headSpawn: StructureSpawn | null = Game.getObjectById(flagMemory.commonMemory.headSpawnId);
    if (headSpawn !== null) {
      // Find a link
      const spawnLink = headSpawn.pos.findInRange(FIND_MY_STRUCTURES, 2, {
        filter: { structureType: STRUCTURE_LINK }
      })[0];

      // If a link is found, set it to the memory
      if (flagMemory.commonMemory.links !== undefined && spawnLink !== undefined) {
        flagMemory.commonMemory.links["head"] = spawnLink.id;
      }
    }

    // Check if there is a link at the controller
    // Find a link
    const controllerLink = room.controller?.pos.findInRange(FIND_MY_STRUCTURES, 2, {
      filter: { structureType: STRUCTURE_LINK }
    })[0];

    // If a link is found, set it to the memory
    if (flagMemory.commonMemory.links !== undefined && controllerLink !== undefined) {
      flagMemory.commonMemory.links["controller"] = controllerLink.id;
    }
  }

  // Set amount of mineral to the flagMemory
  flagMemory.commonMemory.mineral.amount = room.find(FIND_MINERALS)[0]
    ? Math.round(room.find(FIND_MINERALS)[0].mineralAmount)
    : undefined;
};
//#endregion

//#region Export functions
export {
  globalRoomStructureNullChecker as GlobalRoomStructureNullChecker,
  ownedRoomStructureNullChecker as OwnedRoomStructureNullChecker
};
//#endregion
