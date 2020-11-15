// #region Require
import { Config } from "../Utils/importer";
// #endregion

// #region Functions()
const getBaseLayoutType = (room: Room) => {
  // Acces flagMemory
  const flagMemory: FlagMemory = Memory.flags[room.name];

  const doesBunkerFitAtPosition = (terrain: RoomTerrain, position: { x: number; y: number; roomName: string }) => {
    // If terrain is wall, return
    if (terrain.get(position.x, position.y) === TERRAIN_MASK_WALL) return;

    // Get all numbers from top to bottom //
    function range(start: number, end: number): number[] {
      return _.range(end, start);
    }

    // Define all bunker positions from top to bottom
    const bunkerPositions = [
      // Left to right
      {
        top: { x: position.x - 5, y: position.y - 2 },
        bottom: { x: position.x - 5, y: position.y + 1 }
      },
      {
        top: { x: position.x - 4, y: position.y - 3 },
        bottom: { x: position.x - 4, y: position.y + 3 }
      },
      {
        top: { x: position.x - 3, y: position.y - 4 },
        bottom: { x: position.x - 3, y: position.y + 4 }
      },
      {
        top: { x: position.x - 2, y: position.y - 4 },
        bottom: { x: position.x - 2, y: position.y + 5 }
      },
      {
        top: { x: position.x - 1, y: position.y - 5 },
        bottom: { x: position.x - 1, y: position.y + 7 }
      },
      {
        top: { x: position.x - 0, y: position.y - 5 },
        bottom: { x: position.x - 0, y: position.y + 7 }
      },
      {
        top: { x: position.x + 1, y: position.y - 5 },
        bottom: { x: position.x + 1, y: position.y + 7 }
      },
      {
        top: { x: position.x + 2, y: position.y - 5 },
        bottom: { x: position.x + 2, y: position.y + 7 }
      },
      {
        top: { x: position.x + 3, y: position.y - 4 },
        bottom: { x: position.x + 3, y: position.y + 6 }
      },
      {
        top: { x: position.x + 4, y: position.y - 3 },
        bottom: { x: position.x + 4, y: position.y + 5 }
      },
      {
        top: { x: position.x + 5, y: position.y - 1 },
        bottom: { x: position.x + 5, y: position.y + 4 }
      },
      {
        top: { x: position.x + 6, y: position.y - 0 },
        bottom: { x: position.x + 6, y: position.y + 3 }
      },
      {
        top: { x: position.x + 7, y: position.y - 0 },
        bottom: { x: position.x + 7, y: position.y + 2 }
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
          if (posY <= 5 || posY >= 45) wrongTerrainIsNotFound = false;
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
  if (flagMemory.roomPlanner.base === undefined) return;

  // Check if there is already a spawn
  if (
    flagMemory.commonMemory.headSpawnId !== undefined &&
    flagMemory.roomPlanner.base &&
    flagMemory.roomPlanner.base.type === undefined
  ) {
    // Make a base based on current already placed layout
    const headSpawn: StructureSpawn | null = Game.getObjectById(flagMemory.commonMemory.headSpawnId);
    if (headSpawn === null) return;

    // Get middle position of bunker
    const midPos = headSpawn.pos;
    midPos.x += 1;
    midPos.y -= 1;

    if (doesBunkerFitAtPosition(terrain, midPos)) {
      flagMemory.roomPlanner.base.type = "bunker";
    } else flagMemory.roomPlanner.base.type = "generated";
  } else {
    let foundPlaceForBunker = false;
    for (let x = 5; x < 45 && !foundPlaceForBunker; x++) {
      for (let y = 5; y < 45 && !foundPlaceForBunker; y++) {
        if (doesBunkerFitAtPosition(terrain, { x: x, y: y, roomName: room.name })) {
          flagMemory.roomPlanner.base.midPos = { x: x, y: y, roomName: room.name };
        }
        flagMemory.roomPlanner.base.type = "bunker";
        foundPlaceForBunker = true;
      }
    }
  }

  // if (!foundPlaceForBunker) {
  //   let foundPlaceForGenerated = false;
  //   for (let x = 1; x < 49 && !foundPlaceForGenerated; x++) {
  //     for (let y = 1; y < 49 && !foundPlaceForGenerated; y++) {
  //       if (doesGeneratedFitAtPosition(terrain, {x: x, y: y})) {
  //         flagMemory.roomPlanner.base.midPos = {x: x, y: y};
  //         foundPlaceForGenerated = true;
  //         flagMemory.roomPlanner.base.type = 'generated';
  //       }
  //     }
  //   }
  // }
};
// #endregion

// #region getBaseLayoutType function
const getBaseLayoutBasedOnType = (room: Room, layoutType: string) => {
  // Acces flagMemory
  const flagMemory = Memory.flags[room.name];
  let midPos;

  if (flagMemory.commonMemory.headSpawnId) {
    const headSpawn: StructureSpawn | null = Game.getObjectById(flagMemory.commonMemory.headSpawnId);
    if (headSpawn === null) return;

    // Get middle position of bunker
    // midPos = {x: headSpawn.pos.x+1, y: headSpawn.pos.y-1};
    midPos = { x: headSpawn.pos.x, y: headSpawn.pos.y };
  } else if (flagMemory.roomPlanner.base !== undefined && flagMemory.roomPlanner.base.midPos) {
    midPos = flagMemory.roomPlanner.base.midPos;
  }
  if (midPos === undefined) return;

  // * Create bunker array //
  const bunker = [
    [],
    [
      // Spawn
      {
        x: midPos.x - 1,
        y: midPos.y + 1,
        type: STRUCTURE_SPAWN,
        name: `${room.name}-0`
      }
    ],
    [
      // * Controller level 2 //
      // Extensions
      {
        x: midPos.x - 3,
        y: midPos.y + 1,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 3,
        y: midPos.y + 2,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 2,
        y: midPos.y + 2,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 2,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 1,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION
      }
    ],
    [
      // * Controller level 3 //
      // Towers
      {
        x: midPos.x - 0,
        y: midPos.y + 1,
        type: STRUCTURE_TOWER
      },

      // Extensions
      {
        x: midPos.x - 4,
        y: midPos.y + 2,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 4,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 3,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 3,
        y: midPos.y + 4,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 2,
        y: midPos.y + 4,
        type: STRUCTURE_EXTENSION
      }
    ],
    [
      // * Controller level 4 //
      // Storage
      {
        x: midPos.x - 1,
        y: midPos.y + 0,
        type: STRUCTURE_STORAGE
      },

      // Extensions
      {
        x: midPos.x - 2,
        y: midPos.y + 5,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 1,
        y: midPos.y + 4,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 1,
        y: midPos.y + 5,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 0,
        y: midPos.y + 4,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 0,
        y: midPos.y + 5,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 1,
        y: midPos.y + 5,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 1,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 2,
        y: midPos.y + 2,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 2,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 2,
        y: midPos.y + 4,
        type: STRUCTURE_EXTENSION
      }
    ],
    [
      // * Controller level 5 //
      // Tower
      {
        x: midPos.x - 0,
        y: midPos.y - 1,
        type: STRUCTURE_TOWER
      },

      // Extensions
      {
        x: midPos.x + 3,
        y: midPos.y + 1,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 3,
        y: midPos.y + 2,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 3,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 3,
        y: midPos.y + 4,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 4,
        y: midPos.y + 0,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 4,
        y: midPos.y + 1,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 4,
        y: midPos.y + 2,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 4,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 5,
        y: midPos.y + 1,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 5,
        y: midPos.y + 2,
        type: STRUCTURE_EXTENSION
      }
    ],
    [
      // * Controller level 6 //
      // Terminal
      {
        x: midPos.x + 1,
        y: midPos.y + 0,
        type: STRUCTURE_TERMINAL
      },

      // Link
      {
        x: midPos.x + 1,
        y: midPos.y + 1,
        type: STRUCTURE_LINK
      },

      // Extensions
      {
        x: midPos.x + 5,
        y: midPos.y - 1,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 3,
        y: midPos.y - 1,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 4,
        y: midPos.y - 2,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 3,
        y: midPos.y - 2,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 5,
        y: midPos.y + 1,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 5,
        y: midPos.y - 1,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 5,
        y: midPos.y - 2,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 4,
        y: midPos.y - 0,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 4,
        y: midPos.y - 1,
        type: STRUCTURE_EXTENSION
      },

      // Labs
      {
        x: midPos.x - 2,
        y: midPos.y - 2,
        type: STRUCTURE_LAB
      },
      {
        x: midPos.x - 3,
        y: midPos.y - 2,
        type: STRUCTURE_LAB
      },
      {
        x: midPos.x - 3,
        y: midPos.y - 3,
        type: STRUCTURE_LAB
      }
    ],
    [
      // * Controller level 7 //
      // Spawn
      {
        x: midPos.x + 5,
        y: midPos.y - 0,
        type: STRUCTURE_SPAWN,
        name: `${room.name}-1`
      },

      // Tower
      {
        x: midPos.x + 0,
        y: midPos.y - 2,
        type: STRUCTURE_TOWER
      },

      // Extension
      {
        x: midPos.x + 4,
        y: midPos.y - 3,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 3,
        y: midPos.y - 3,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 2,
        y: midPos.y - 3,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 1,
        y: midPos.y - 3,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 3,
        y: midPos.y - 4,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 2,
        y: midPos.y - 4,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 1,
        y: midPos.y - 4,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 0,
        y: midPos.y - 4,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 1,
        y: midPos.y - 5,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x - 0,
        y: midPos.y - 5,
        type: STRUCTURE_EXTENSION
      },

      // Labs
      {
        x: midPos.x - 3,
        y: midPos.y - 1,
        type: STRUCTURE_LAB
      },
      {
        x: midPos.x - 4,
        y: midPos.y - 2,
        type: STRUCTURE_LAB
      },
      {
        x: midPos.x - 4,
        y: midPos.y - 3,
        type: STRUCTURE_LAB
      },

      // Factory
      {
        x: midPos.x + 1,
        y: midPos.y - 1,
        type: STRUCTURE_FACTORY
      }
    ],
    [
      // * Controller level 8 //
      // Extension
      {
        x: midPos.x + 1,
        y: midPos.y - 5,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 2,
        y: midPos.y - 5,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 7,
        y: midPos.y + 1,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 7,
        y: midPos.y + 2,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 6,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 5,
        y: midPos.y + 4,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 4,
        y: midPos.y + 5,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 3,
        y: midPos.y + 6,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 2,
        y: midPos.y + 7,
        type: STRUCTURE_EXTENSION
      },
      {
        x: midPos.x + 1,
        y: midPos.y + 7,
        type: STRUCTURE_EXTENSION
      },

      // Towers
      {
        x: midPos.x + 0,
        y: midPos.y + 2,
        type: STRUCTURE_TOWER
      },
      {
        x: midPos.x + 2,
        y: midPos.y - 0,
        type: STRUCTURE_TOWER
      },
      {
        x: midPos.x - 2,
        y: midPos.y - 0,
        type: STRUCTURE_TOWER
      },

      // Nuker
      {
        x: midPos.x - 1,
        y: midPos.y - 1,
        type: STRUCTURE_NUKER
      },

      // Observer
      {
        x: midPos.x + 0,
        y: midPos.y + 7,
        type: STRUCTURE_OBSERVER
      },

      // Labs
      {
        x: midPos.x - 2,
        y: midPos.y - 3,
        type: STRUCTURE_LAB
      },
      {
        x: midPos.x - 1,
        y: midPos.y - 3,
        type: STRUCTURE_LAB
      },
      {
        x: midPos.x - 3,
        y: midPos.y - 4,
        type: STRUCTURE_LAB
      },
      {
        x: midPos.x - 2,
        y: midPos.y - 4,
        type: STRUCTURE_LAB
      },

      // Spawn
      {
        x: midPos.x - 5,
        y: midPos.y - 0,
        type: STRUCTURE_SPAWN,
        name: `${room.name}-2`
      }
    ]
  ];

  let i = 2;
  let structureObject: { x: number; y: number; type: string; name?: string } | undefined;

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
              createConstructionSite(
                room,
                { x: structureObject.x, y: structureObject.y, roomName: room.name },
                //@ts-ignore
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
};
// #endregion

// #region GetBestFreeSpot
const getBestFreeSpot = (
  room: Room,
  startPos: { x: number; y: number; roomName: string },
  structureType: STRUCTURE_LINK | STRUCTURE_CONTAINER = STRUCTURE_LINK,
  inputRange?: number
): any[] | undefined => {
  const terrain = new Room.Terrain(room.name);
  // Get range based on structure type (container is 1, link is 2)
  if (inputRange === undefined) inputRange = 0;
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
  if (positions.length === 0) return;

  // Check all possible positions and assign the best one (compare to last best one)
  let bestPosition: any = {
    pos: { x: 0, y: 0, roomName: room.name },
    spotsAround: 0
  };
  positions.forEach(position => {
    // Check if current position is not TERRAIN_MASK_WALL //
    if (terrain.get(position.x, position.y) === TERRAIN_MASK_WALL) return;

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
      bestPosition = { pos: position, spotsAround: spotsAround };
    }
  });

  // Check if a bestPosition is found, return bestPosition
  // Else return null
  if (bestPosition.spotsAround > 0) {
    return bestPosition;
  } else return;
};
// #endregion

// #region BuildConstructionSite
const createConstructionSite = (
  room: Room,
  position: { x: number; y: number; roomName: string },
  structureType: STRUCTURE_LINK | STRUCTURE_CONTAINER,
  structureName?: string
) => {
  // Create a construction site based on the inputPosition and inputStructureType
  let constructionSite = room.createConstructionSite(
    position.x,
    position.y,
    //@ts-ignore
    structureType,
    structureName
  );

  const placedConstructionSite = room.lookForAt(LOOK_CONSTRUCTION_SITES, position.x, position.y);
  const foundStructures = room.lookForAt(LOOK_STRUCTURES, position.x, position.y);
  // const flagMemory = Memory.flags[room.name];

  // Switch based on return value of createConstructionSite
  switch (constructionSite) {
    case OK:
      // TODO THIS doesn't WORK BECAUSE THE CONSTRUCTION site is not yet known at time of calling
      // // Push constructor to array
      // if (placedConstructionSite && placedConstructionSite.id) {
      //   flagMemory.commonMemory.constructionSites.push(
      //     placedConstructionSite[0].id);
      // }
      break;
    default:
      if (
        (placedConstructionSite[0] !== undefined &&
          //@ts-ignore
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
};
// #endregion
// #region StructureExist
const structureExist = (
  room: Room,
  pos: { x: number; y: number; roomName: string },
  structureType: STRUCTURE_LINK | STRUCTURE_CONTAINER
): [boolean, string] => {
  const structures = room.lookForAt(LOOK_STRUCTURES, pos.x, pos.y);
  for (const structure of structures) {
    if (structure.structureType === structureType) {
      return [true, structure.id];
    }
  }
  return [false, ""];
};
// #endregion
// #endregion

// #region BasePlanner function
const basePlanner = (room: Room) => {
  // Get roomName and flagMemory
  const roomName = room.name;
  // @ts-ignore
  const flagMemory: FlagMemory = Memory.flags[roomName];

  // Wait until all other construction sites are build
  if (flagMemory.commonMemory.constructionSites.length > 0) return Game.cpu.getUsed();

  if (flagMemory.roomPlanner.base === undefined) return;

  if (!flagMemory.roomPlanner.base.type) getBaseLayoutType(room);
  if (flagMemory.roomPlanner.base.type) {
    getBaseLayoutBasedOnType(room, flagMemory.roomPlanner.base.type);
  }

  return Game.cpu.getUsed();
};
// #endregion

// #region RoomPlanner function
const roomPlanner = (room: Room) => {
  // Create a acces point to the flagMemory //
  const flagMemory: FlagMemory = Memory.flags[room.name];

  if (room.controller === undefined) return;

  // Loop through all sources in the room
  for (let i = 0; i < flagMemory.commonMemory.sources.length; i++) {
    // Default is container
    let structureType: STRUCTURE_LINK | STRUCTURE_CONTAINER = STRUCTURE_CONTAINER;

    // Is 7 (3 links needed) and 6 otherwise (2 links needed)
    if (room.controller.level >= 5 + flagMemory.commonMemory.sources.length) {
      structureType = STRUCTURE_LINK;
    }

    // Check if room already has this source planned
    if (
      flagMemory.roomPlanner.room.sources[i] !== undefined &&
      flagMemory.roomPlanner.room.sources[i].structureType === structureType &&
      Game.getObjectById(flagMemory.roomPlanner.room.sources[i].id) !== null
    ) {
      break;
    }

    const source = flagMemory.commonMemory.sources[i];
    if (
      flagMemory.roomPlanner.room.sources[i] !== undefined &&
      flagMemory.roomPlanner.room.sources[i].structureType !== structureType
    ) {
      const bestSource = flagMemory.roomPlanner.room.sources[i];
      const structureExistResult = structureExist(room, bestSource.pos, structureType);
      if (structureExistResult[0]) {
        const structureObject: StructureLink | StructureContainer | null = Game.getObjectById(structureExistResult[1]);
        if (structureObject !== null) {
          structureObject.destroy();
          flagMemory.roomPlanner.room.sources[i].id = undefined;
        }
      } else {
        const constructionSite = room.lookForAt(LOOK_CONSTRUCTION_SITES, bestSource.pos.x, bestSource.pos.y);
        if (constructionSite.length > 0) {
          break;
        }
      }
    }

    let bestSourcePosition: BestPosition = {};
    const returnBestFreeSpot: any = getBestFreeSpot(room, source.pos, structureType);
    if (returnBestFreeSpot === undefined) break;
    bestSourcePosition.pos = returnBestFreeSpot.pos;
    bestSourcePosition.spotsAround = returnBestFreeSpot.spotsAround;

    // Check if best position is found, otherwise return
    if (bestSourcePosition === undefined) break;

    // Build a structure there //
    const returnConstruction = createConstructionSite(room, returnBestFreeSpot.pos, structureType);
    // Check if structure is successfully constructed
    if (returnConstruction !== OK) break;

    // Set best position to room planner memory for this source
    bestSourcePosition.structureType = structureType;
    bestSourcePosition.spotsAround = room
      .lookForAtArea(LOOK_TERRAIN, source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1, true)
      .filter(t => t.terrain !== "wall").length;
    bestSourcePosition.id = undefined;
    if (bestSourcePosition !== null) {
      flagMemory.roomPlanner.room.sources[i] = bestSourcePosition;
    }

    // // * Handle visual to show target //
    // // If visual is already in memory, return
    // if (
    //   flagMemory.visuals.objects.sources[i] === true ||
    //   !config.rooms.visuals.structures
    // ) {
    //   const sourceVisualString = room.visual.circle(bestSourcePosition.pos, {
    //     fill: 'transparent',
    //     radius: 0.55,
    //     stroke: 'red',
    //   });
    //   if (Object.keys(sourceVisualString).length > 0) {
    //     // Update visual string in flagMemory //
    //     flagMemory.visuals.string = room.visual.export();
    //     flagMemory.visuals.objects.sources[i] = true;
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
    (flagMemory.roomPlanner.room.controller &&
      flagMemory.roomPlanner.room.controller.structureType === structureType &&
      flagMemory.commonMemory.controllerStorage !== undefined &&
      Game.getObjectById(flagMemory.commonMemory.controllerStorage.id) !== null) ||
    (room.controller && !room.controller.my)
  ) {
    return Game.cpu.getUsed();
  }

  const controller = room.controller;
  if (
    flagMemory.roomPlanner.room.controller !== undefined &&
    flagMemory.roomPlanner.room.controller.structureType !== structureType
  ) {
    const bestControllerPosition: any = flagMemory.roomPlanner.room.controller;
    const structureExistResult = structureExist(room, bestControllerPosition.pos, structureType);
    if (structureExistResult[0]) {
      const structureObject: StructureLink | StructureContainer | null = Game.getObjectById(structureExistResult[1]);
      if (structureObject !== null && flagMemory.commonMemory.controllerStorage) {
        structureObject.destroy();
        flagMemory.commonMemory.controllerStorage.id = "";
      }
    } else {
      const constructionSite = room.lookForAt(
        LOOK_CONSTRUCTION_SITES,
        bestControllerPosition.pos.x,
        bestControllerPosition.pos.y
      );
      if (constructionSite.length > 0) {
        return Game.cpu.getUsed();
      }
    }
  }

  const bestControllerPosition: any = getBestFreeSpot(room, controller.pos, structureType, 3);
  // Check if best position is found, otherwise return
  if (bestControllerPosition === undefined) return;

  // Build a structure there //
  //@ts-ignore: FIX LATER
  const returnConstruction = createConstructionSite(room, bestControllerPosition.pos, structureType);

  // Check if structure is successfully constructed
  if (returnConstruction !== OK) return;

  // Set best position to room planner memory for this source
  bestControllerPosition.structureType = structureType;
  if (bestControllerPosition !== null) {
    flagMemory.roomPlanner.room.controller = bestControllerPosition;
  } else return;

  return;
};
// #endregion

//#region Export functions
export { roomPlanner as RoomPlanner, basePlanner as BasePlanner };
//#endregion
