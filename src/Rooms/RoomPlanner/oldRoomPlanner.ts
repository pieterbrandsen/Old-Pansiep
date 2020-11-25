//#region Require('./)
import _ from "lodash";
import { object } from "lodash";
import { BunkerLayoutConst } from "Utils/importer/internals";
//#endregion

//#region Class
export class OldRoomPlanner {
  public static roomPlanner(room: Room): void {
    // Create a acces point to the roomMemory //
    const roomMemory: RoomMemory = Memory.rooms[room.name];

    if (room.controller === undefined) {
      return;
    }

    // Loop through all sources in the room
    for (let i = 0; i < roomMemory.commonMemory.sources.length; i++) {
      // Default is container
      let structureType: STRUCTURE_LINK | STRUCTURE_CONTAINER = STRUCTURE_CONTAINER;

      // Is 7 (3 links needed) and 6 otherwise (2 links needed)
      if (room.controller.level >= 5 + roomMemory.commonMemory.sources.length) {
        structureType = STRUCTURE_LINK;
      }

      // Check if room already has this source planned
      if (
        roomMemory.roomPlanner.room.sources[i] !== undefined &&
        roomMemory.roomPlanner.room.sources[i].structureType === structureType &&
        Game.getObjectById(roomMemory.roomPlanner.room.sources[i]!.id!) !== null
      ) {
        break;
      }

      const source = roomMemory.commonMemory.sources[i];
      if (
        roomMemory.roomPlanner.room.sources[i] !== undefined &&
        roomMemory.roomPlanner.room.sources[i].structureType !== structureType
      ) {
        const bestSource = roomMemory.roomPlanner.room.sources[i];
        const structureExistResult = OldRoomPlanner.structureExist(room, bestSource.pos!, structureType);
        if (structureExistResult[0]) {
          const structureObject: StructureLink | StructureContainer | null = Game.getObjectById(
            structureExistResult[1]
          );
          if (structureObject !== null) {
            structureObject.destroy();
            roomMemory.roomPlanner.room.sources[i].id = undefined;
          }
        } else {
          const constructionSite = room.lookForAt(LOOK_CONSTRUCTION_SITES, bestSource.pos!.x, bestSource.pos!.y);
          if (constructionSite.length > 0) {
            break;
          }
        }
      }

      const bestSourcePosition: BestPosition = {};
      const returnBestFreeSpot: any = OldRoomPlanner.getBestFreeSpot(room, source.pos, structureType);
      if (returnBestFreeSpot === undefined) {
        break;
      }

      bestSourcePosition.pos = returnBestFreeSpot.pos;
      bestSourcePosition.spotsAround = returnBestFreeSpot.spotsAround;

      // Check if best position is found, otherwise return
      if (bestSourcePosition === undefined) {
        break;
      }

      // Build a structure there //
      const returnConstruction = OldRoomPlanner.createConstructionSite(room, returnBestFreeSpot.pos, structureType);
      // Check if structure is successfully constructed
      if (returnConstruction !== OK) {
        break;
      }

      // Set best position to room planner memory for this source
      bestSourcePosition.structureType = structureType;
      bestSourcePosition.spotsAround = room
        .lookForAtArea(LOOK_TERRAIN, source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1, true)
        .filter(t => t.terrain !== "wall").length;
      bestSourcePosition.id = undefined;
      if (bestSourcePosition !== null) {
        roomMemory.roomPlanner.room.sources[i] = bestSourcePosition;
      }

      // // * Handle visual to show target //
      // // If visual is already in memory, return
      // if (
      //   roomMemory.visuals.objects.sources[i] === true ||
      //   !config.rooms.visuals.structures
      // ) {
      //   const sourceVisualString = room.visual.circle(bestSourcePosition.pos, {
      //     fill: 'transparent',
      //     radius: 0.55,
      //     stroke: 'red',
      //   });
      //   if (Object.keys(sourceVisualString).length > 0) {
      //     // Update visual string in roomMemory //
      //     roomMemory.visuals.string = room.visual.export();
      //     roomMemory.visuals.objects.sources[i] = true;
      //   }
      // }
    }
    // #endregion

    // #region Controller structure
    // Add new room data of the controller //
    // Default is container
    let structureType: STRUCTURE_LINK | STRUCTURE_CONTAINER = STRUCTURE_CONTAINER;

    // Is 7 (3 links needed) and 6 otherwise (2 links needed)
    if (room.controller.level >= 6) {
      structureType = STRUCTURE_LINK;
    }

    // Check if room already has the controller planned
    if (
      (roomMemory.roomPlanner.room.controller &&
        roomMemory.roomPlanner.room.controller.structureType === structureType &&
        roomMemory.commonMemory.controllerStorage !== undefined &&
        Game.getObjectById(roomMemory.commonMemory.controllerStorage.id!) !== null) ||
      (room.controller && !room.controller.my)
    ) {
      return;
    }

    const controller = room.controller;
    if (
      roomMemory.roomPlanner.room.controller !== undefined &&
      roomMemory.roomPlanner.room.controller.structureType !== structureType
    ) {
      const bestControllerPosition: any = roomMemory.roomPlanner.room.controller;
      const structureExistResult = OldRoomPlanner.structureExist(room, bestControllerPosition.pos, structureType);
      if (structureExistResult[0]) {
        const structureObject: StructureLink | StructureContainer | null = Game.getObjectById(structureExistResult[1]);
        if (structureObject !== null && roomMemory.commonMemory.controllerStorage) {
          structureObject.destroy();
          roomMemory.commonMemory.controllerStorage.id! = "";
        }
      } else {
        const constructionSite = room.lookForAt(
          LOOK_CONSTRUCTION_SITES,
          bestControllerPosition.pos.x,
          bestControllerPosition.pos.y
        );
        if (constructionSite.length > 0) {
          return;
        }
      }
    }

    const bestControllerPosition: any = OldRoomPlanner.getBestFreeSpot(room, controller.pos, structureType, 3);
    // Check if best position is found, otherwise return
    if (bestControllerPosition === undefined) {
      return;
    }

    // Build a structure there //
    // @ts-ignore: FIX LATER
    const returnConstruction = OldRoomPlanner.createConstructionSite(room, bestControllerPosition.pos, structureType);

    // Check if structure is successfully constructed
    if (returnConstruction !== OK) {
      return;
    }

    // Set best position to room planner memory for this source
    bestControllerPosition.structureType = structureType;
    if (bestControllerPosition !== null) {
      roomMemory.roomPlanner.room.controller = bestControllerPosition;
    } else {
      return;
    }
  }

  public static basePlanner(room: Room): void {
    // Get roomName and roomMemory
    const roomName = room.name;
    const roomMemory: RoomMemory = Memory.rooms[roomName];

    // Wait until all other construction sites are build
    if (roomMemory.constructionSites.data?.length > 0) {
      return;
    }

    if (roomMemory.roomPlanner.base === undefined) {
      return;
    }

    if (!roomMemory.roomPlanner.base.type) {
      OldRoomPlanner.getBaseLayoutType(room);
    }
    if (roomMemory.roomPlanner.base.type) {
      OldRoomPlanner.getBaseLayoutBasedOnType(room, roomMemory.roomPlanner.base.type);
    }
  }

  private static getBaseLayoutType(room: Room) {
    // Acces roomMemory
    const roomMemory: RoomMemory = Memory.rooms[room.name];

    const doesBunkerFitAtPosition = (terrain: RoomTerrain, position: { x: number; y: number; roomName: string }) => {
      // If terrain is wall, return
      if (terrain.get(position.x, position.y) === TERRAIN_MASK_WALL) {
        return;
      }

      // Get all numbers from top to bottom //
      function range(start: number, end: number): number[] {
        return _.range(end, start);
      }

      // Define all bunker positions from top to bottom
      const bunkerPositions = [
        // Left to right
        {
          top: { x: position.x - 5, y: position.y - 3 },
          bottom: { x: position.x - 5, y: position.y + 2 }
        },
        {
          top: { x: position.x - 4, y: position.y - 4 },
          bottom: { x: position.x - 4, y: position.y + 4 }
        },
        {
          top: { x: position.x - 3, y: position.y - 5 },
          bottom: { x: position.x - 3, y: position.y + 5 }
        },
        {
          top: { x: position.x - 2, y: position.y - 5 },
          bottom: { x: position.x - 2, y: position.y + 6 }
        },
        {
          top: { x: position.x - 1, y: position.y - 6 },
          bottom: { x: position.x - 1, y: position.y + 8 }
        },
        {
          top: { x: position.x - 0, y: position.y - 6 },
          bottom: { x: position.x - 0, y: position.y + 8 }
        },
        {
          top: { x: position.x + 1, y: position.y - 6 },
          bottom: { x: position.x + 1, y: position.y + 8 }
        },
        {
          top: { x: position.x + 2, y: position.y - 6 },
          bottom: { x: position.x + 2, y: position.y + 8 }
        },
        {
          top: { x: position.x + 3, y: position.y - 5 },
          bottom: { x: position.x + 3, y: position.y + 7 }
        },
        {
          top: { x: position.x + 4, y: position.y - 4 },
          bottom: { x: position.x + 4, y: position.y + 6 }
        },
        {
          top: { x: position.x + 5, y: position.y - 2 },
          bottom: { x: position.x + 5, y: position.y + 5 }
        },
        {
          top: { x: position.x + 6, y: position.y - 1 },
          bottom: { x: position.x + 6, y: position.y + 4 }
        },
        {
          top: { x: position.x + 7, y: position.y - 1 },
          bottom: { x: position.x + 7, y: position.y + 3 }
        }
      ];

      // Stop loop when position is not good //
      let wrongTerrainIsNotFound = true;
      for (let i = 0; i < bunkerPositions.length && wrongTerrainIsNotFound; i++) {
        const currentColumnPosition = bunkerPositions[i];

        const topToBottomArray = range(currentColumnPosition.top.y, currentColumnPosition.bottom.y);
        for (const i in topToBottomArray) {
          if (Object.prototype.hasOwnProperty.call(topToBottomArray, i)) {
            const posY = topToBottomArray[i];
            if (terrain.get(currentColumnPosition.top.x, posY) === TERRAIN_MASK_WALL) {
              wrongTerrainIsNotFound = false;
            }
            if (currentColumnPosition.top.x <= 5 || currentColumnPosition.top.x >= 45) {
              wrongTerrainIsNotFound = false;
            }
            if (posY <= 5 || posY >= 45) {
              wrongTerrainIsNotFound = false;
            }
          }
        }
      }

      // If no bad terrain is found, return true //
      return wrongTerrainIsNotFound;
    };

    // const doesGeneratedFitAtPosition = (terrain, position) => {
    //   // If terrain is wall, return
    //   if (terrain.get(position.x, position.y) === TERRAIN_MASK_WALL) return;

    //   // Get all numbers from top to bottom //
    //   function range(start, end) {
    //     return Array(end - start + 1).fill().map((_, idx) => start + idx);
    //   }

    //   // Define all bunker positions from top to bottom
    //   const staticGeneratedPositions = [
    //     // Left to right
    //   ];

    //   // TODO MAKE AUTOMATIC BASE BUILDING

    //   // Stop loop when position is not good //
    //   let wrongTerrainIsNotFound = true;
    //   for (let i = 0; i < staticGeneratedPositions.length && wrongTerrainIsNotFound; i++) {
    //     const currentColumnPosition = staticGeneratedPositions[i];

    //     const topToBottomArray = range(currentColumnPosition.top.y, currentColumnPosition.bottom.y);
    //     for (const i in topToBottomArray) {
    //       if (Object.prototype.hasOwnProperty.call(topToBottomArray, i)) {
    //         const posY = topToBottomArray[i];
    //         if (terrain.get(currentColumnPosition.top.x, posY) === TERRAIN_MASK_WALL) wrongTerrainIsNotFound = false;
    //         if (currentColumnPosition.top.x <= 5 || currentColumnPosition.top.x >= 45) wrongTerrainIsNotFound = false;
    //         if (posY <= 5 || posY >= 45) wrongTerrainIsNotFound = false;
    //       }
    //     }
    //   }

    //   // If no bad terrain is found, return true //
    //   return wrongTerrainIsNotFound;
    // };

    // Define terrain
    const terrain = new Room.Terrain(room.name);

    // Return if roomPlanner base is undefined
    if (roomMemory.roomPlanner.base === undefined) {
      return;
    }

    // Check if there is already a spawn
    if (
      roomMemory.commonMemory.headSpawnId !== undefined &&
      roomMemory.roomPlanner.base &&
      roomMemory.roomPlanner.base.type === undefined
    ) {
      // Make a base based on current already placed layout
      const headSpawn: StructureSpawn | null = Game.getObjectById(roomMemory.commonMemory.headSpawnId);
      if (headSpawn === null) {
        return;
      }

      // Get middle position of bunker
      const midPos: any = { x: headSpawn.pos.x, y: headSpawn.pos.y };
      midPos.x += 1;
      midPos.y -= 1;

      if (doesBunkerFitAtPosition(terrain, midPos)) {
        roomMemory.roomPlanner.base.type = "bunker";
      } else {
        roomMemory.roomPlanner.base.type = "generated";
      }
    } else {
      let foundPlaceForBunker = false;
      for (let x = 5; x < 45 && !foundPlaceForBunker; x++) {
        for (let y = 5; y < 45 && !foundPlaceForBunker; y++) {
          if (doesBunkerFitAtPosition(terrain, { x, y, roomName: room.name })) {
            roomMemory.roomPlanner.base.midPos = { x, y, roomName: room.name };
          }
          roomMemory.roomPlanner.base.type = "bunker";
          foundPlaceForBunker = true;
        }
      }
    }

    // if (!foundPlaceForBunker) {
    //   let foundPlaceForGenerated = false;
    //   for (let x = 1; x < 49 && !foundPlaceForGenerated; x++) {
    //     for (let y = 1; y < 49 && !foundPlaceForGenerated; y++) {
    //       if (doesGeneratedFitAtPosition(terrain, {x: x, y: y})) {
    //         roomMemory.roomPlanner.base.midPos = {x: x, y: y};
    //         foundPlaceForGenerated = true;
    //         roomMemory.roomPlanner.base.type = 'generated';
    //       }
    //     }
    //   }
    // }
  }

  private static getBaseLayoutBasedOnType(room: Room, layoutType: string) {
    // Acces roomMemory
    const roomMemory = Memory.rooms[room.name];
    let midPos: any = {};

    if (roomMemory.commonMemory.headSpawnId) {
      const headSpawn: StructureSpawn | null = Game.getObjectById(roomMemory.commonMemory.headSpawnId);
      if (headSpawn === null) {
        return;
      }

      // Get middle position of bunker
      midPos = { x: headSpawn.pos.x, y: headSpawn.pos.y };
      midPos.x += 1;
      midPos.y -= 1;
    } else if (roomMemory.roomPlanner.base !== undefined && roomMemory.roomPlanner.base.midPos) {
      midPos = roomMemory.roomPlanner.base.midPos;
    }

    if (midPos === undefined) {
      return;
    }

    let i = 2;
    let structureObject: { x: number; y: number; type: string; name?: string } | undefined;

    const bunker = BunkerLayoutConst.getBunkerLayout(midPos, room.name);

    if (room.controller !== undefined) {
      switch (layoutType) {
        case "generated":
          // #region Generated layout

          break;
        // #endregion
        case "bunker":
          // #region Bunker layout
          // * Bunker layout //
          // Build everything from the controller level and all below //
          while (i <= room.controller.level) {
            // Loop through all bunker structures for this level //
            for (let y = 0; y < bunker[i].length; y++) {
              // Get structureObject
              structureObject = undefined;
              structureObject = bunker[i][y];
              if (structureObject !== null) {
                // Create the construction site
                OldRoomPlanner.createConstructionSite(
                  room,
                  { x: structureObject!.x, y: structureObject!.y, roomName: room.name },
                  // @ts-ignore
                  structureObject.type,
                  structureObject.name ? structureObject.name.replace("{ roomName }", room.name) : undefined
                );
              }
            }
            // Add a controller level after execution
            i++;
          }
          break;
        // #endregion
        default:
          break;
      }
    }
  }

  private static getBestFreeSpot(
    room: Room,
    startPos: { x: number; y: number; roomName: string },
    structureType: STRUCTURE_LINK | STRUCTURE_CONTAINER = STRUCTURE_LINK,
    inputRange?: number
  ): any[] | void {
    const terrain = new Room.Terrain(room.name);
    // Get range based on structure type (container is 1, link is 2)
    if (inputRange === undefined) {
      inputRange = 0;
    }
    const range = inputRange > 0 ? inputRange : structureType === STRUCTURE_LINK ? 2 : 1;

    // getAllPositions function
    // Returns a position array based on inputPosition and inputRange
    const getAllPositions = (inputPosition: { x: number; y: number; roomName: string }, inputRange: number) => {
      // Get all possible positionsArray //
      const positionsArray = [];
      for (let i = 1; i <= inputRange; i++) {
        // Add all corners of the inputPosition + inputRange //
        // Top left
        positionsArray.push({
          x: inputPosition.x - inputRange,
          y: inputPosition.y + inputRange,
          roomName: inputPosition.roomName
        });
        // Top right
        positionsArray.push({
          x: inputPosition.x + inputRange,
          y: inputPosition.y + inputRange,
          roomName: inputPosition.roomName
        });

        // Bottom left
        positionsArray.push({
          x: inputPosition.x - inputRange,
          y: inputPosition.y - inputRange,
          roomName: inputPosition.roomName
        });
        // Bottom right
        positionsArray.push({
          x: inputPosition.x + inputRange,
          y: inputPosition.y - inputRange,
          roomName: inputPosition.roomName
        });

        // Add all other positionsArray then corners
        if (i === 1) {
          // Add only 2's in this case
          //    1 2 3
          // 1 ╟─┼─┼─╫ 1
          // 2 ╟─┼─┼─╫ 2
          // 3 ╟─┼─┼─╫ 3
          //    1 2 3

          // Top
          positionsArray.push({
            x: inputPosition.x,
            y: inputPosition.y + inputRange,
            roomName: inputPosition.roomName
          });
          // Right
          positionsArray.push({
            x: inputPosition.x + inputRange,
            y: inputPosition.y,
            roomName: inputPosition.roomName
          });
          // Bottom
          positionsArray.push({
            x: inputPosition.x,
            y: inputPosition.y - inputRange,
            roomName: inputPosition.roomName
          });
          // Left
          positionsArray.push({
            x: inputPosition.x - inputRange,
            y: inputPosition.y,
            roomName: inputPosition.roomName
          });
        } else if (i <= inputRange - 1) {
          // Add all numbers expect 2's
          //    1 2 3
          // 1 ╟─┼─┼─╫ 1
          // 2 ╟─┼─┼─╫ 2
          // 3 ╟─┼─┼─╫ 3
          //    1 2 3

          // Top left
          positionsArray.push({
            x: inputPosition.x - i,
            y: inputPosition.y + 2,
            roomName: inputPosition.roomName
          });
          // Top right
          positionsArray.push({
            x: inputPosition.x + i,
            y: inputPosition.y + 2,
            roomName: inputPosition.roomName
          });

          // Right top
          positionsArray.push({
            x: inputPosition.x + 2,
            y: inputPosition.y + i,
            roomName: inputPosition.roomName
          });
          // Right bottom
          positionsArray.push({
            x: inputPosition.x + 2,
            y: inputPosition.y - i,
            roomName: inputPosition.roomName
          });

          // Bottom left
          positionsArray.push({
            x: inputPosition.x - i,
            y: inputPosition.y - 2,
            roomName: inputPosition.roomName
          });
          // Bottom right
          positionsArray.push({
            x: inputPosition.x + i,
            y: inputPosition.y - 2,
            roomName: inputPosition.roomName
          });

          // Left top
          positionsArray.push({
            x: inputPosition.x - 2,
            y: inputPosition.y + i,
            roomName: inputPosition.roomName
          });
          // Left bottom
          positionsArray.push({
            x: inputPosition.x - 2,
            y: inputPosition.y - i,
            roomName: inputPosition.roomName
          });
        }
      }

      return positionsArray;
    };

    // Get all possible positions based on inputPosition
    const positions = getAllPositions(startPos, range);

    // Return if positions is empty //
    if (positions.length === 0) {
      return;
    }

    // Check all possible positions and assign the best one (compare to last best one)
    let bestPosition: any = {
      pos: { x: 0, y: 0, roomName: room.name },
      spotsAround: 0
    };
    positions.forEach(position => {
      // Check if current position is not TERRAIN_MASK_WALL //
      if (terrain.get(position.x, position.y) === TERRAIN_MASK_WALL) {
        return;
      }

      // Get all positions in 1 range of inputPosition
      const loopPositions = getAllPositions(position, 1);

      // Set the spotsAround to zero
      let spotsAround = 0;

      loopPositions.forEach(loopPosition => {
        if (terrain.get(loopPosition.x, loopPosition.y) !== TERRAIN_MASK_WALL) {
          spotsAround++;
        }
      });

      // If current position is better then current saved bestPosition, overwrite bestPosition
      if (spotsAround > bestPosition.spotsAround) {
        bestPosition = { pos: position, spotsAround };
      }
    });

    // Check if a bestPosition is found, return bestPosition
    // Else return null
    if (bestPosition.spotsAround > 0) {
      return bestPosition;
    } else {
      return;
    }
  }

  private static createConstructionSite(
    room: Room,
    position: { x: number; y: number; roomName: string },
    structureType: STRUCTURE_LINK | STRUCTURE_CONTAINER,
    structureName?: string
  ) {
    // Create a construction site based on the inputPosition and inputStructureType
    let constructionSite = room.createConstructionSite(
      position.x,
      position.y,
      // @ts-ignore
      structureType,
      structureName
    );

    const placedConstructionSite = room.lookForAt(LOOK_CONSTRUCTION_SITES, position.x, position.y);
    const foundStructures = room.lookForAt(LOOK_STRUCTURES, position.x, position.y);
    // const roomMemory = Memory.rooms[room.name];

    // Switch based on return value of createConstructionSite
    switch (constructionSite) {
      case OK:
        // TODO THIS doesn't WORK BECAUSE THE CONSTRUCTION site is not yet known at time of calling
        // // Push constructor to array
        // if (placedConstructionSite && placedConstructionSite.id) {
        //   roomMemory.constructionSites.data.push(
        //     placedConstructionSite[0].id);
        // }
        break;
      default:
        if (
          (placedConstructionSite[0] !== undefined &&
            // @ts-ignore
            placedConstructionSite[0].structureType === structureType) ||
          foundStructures[0] !== undefined
        ) {
          // Target structureType was found so set construction site to OK (good)
          constructionSite = OK;
        }
        break;
    }

    // Return value of createConstructionSite
    return constructionSite;
  }

  private static structureExist(
    room: Room,
    pos: { x: number; y: number; roomName: string },
    structureType: STRUCTURE_LINK | STRUCTURE_CONTAINER
  ): [boolean, string] {
    const structures = room.lookForAt(LOOK_STRUCTURES, pos.x, pos.y);
    for (const structure of structures) {
      if (structure.structureType === structureType) {
        return [true, structure.id];
      }
    }
    return [false, ""];
  }
}
//#endregion
