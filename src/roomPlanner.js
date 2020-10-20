// #region Require
require('./config');
// #endregion

// #region Functions
// #region getBaseLayoutType function
const getBaseLayoutType = (room) => {
  // Acces flagMemory
  const flagMemory = Memory.flags[room.name];


  const doesBunkerFitAtPosition = (terrain, position) => {
    // If terrain is wall, return
    if (terrain.get(position.x, position.y) === TERRAIN_MASK_WALL) return;

    // Get all numbers from top to bottom //
    function range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx);
    }

    // Define all bunker positions from top to bottom
    const bunkerPositions = [
      // Left to right
      {top: {x: position.x-5, y: position.y-2}, bottom: {x: position.x-5, y: position.y+1}},
      {top: {x: position.x-4, y: position.y-3}, bottom: {x: position.x-4, y: position.y+3}},
      {top: {x: position.x-3, y: position.y-4}, bottom: {x: position.x-3, y: position.y+4}},
      {top: {x: position.x-2, y: position.y-4}, bottom: {x: position.x-2, y: position.y+5}},
      {top: {x: position.x-1, y: position.y-5}, bottom: {x: position.x-1, y: position.y+7}},
      {top: {x: position.x-0, y: position.y-5}, bottom: {x: position.x-0, y: position.y+7}},
      {top: {x: position.x+1, y: position.y-5}, bottom: {x: position.x+1, y: position.y+7}},
      {top: {x: position.x+2, y: position.y-5}, bottom: {x: position.x+2, y: position.y+7}},
      {top: {x: position.x+3, y: position.y-4}, bottom: {x: position.x+3, y: position.y+6}},
      {top: {x: position.x+4, y: position.y-3}, bottom: {x: position.x+4, y: position.y+5}},
      {top: {x: position.x+5, y: position.y-1}, bottom: {x: position.x+5, y: position.y+4}},
      {top: {x: position.x+6, y: position.y-0}, bottom: {x: position.x+6, y: position.y+3}},
      {top: {x: position.x+7, y: position.y-0}, bottom: {x: position.x+7, y: position.y+2}},
    ];

    // Stop loop when position is not good //
    let wrongTerrainIsNotFound = true;
    for (let i = 0; i < bunkerPositions.length && wrongTerrainIsNotFound; i++) {
      const currentColumnPosition = bunkerPositions[i];

      const topToBottomArray = range(currentColumnPosition.top.y, currentColumnPosition.bottom.y);
      for (const i in topToBottomArray) {
        if (Object.prototype.hasOwnProperty.call(topToBottomArray, i)) {
          const posY = topToBottomArray[i];
          if (terrain.get(currentColumnPosition.top.x, posY) === TERRAIN_MASK_WALL) wrongTerrainIsNotFound = false;
          if (currentColumnPosition.top.x <= 5 || currentColumnPosition.top.x >= 45) wrongTerrainIsNotFound = false;
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

  // Check if there is already a spawn
  if (flagMemory.commonMemory.headSpawnId !== undefined && flagMemory.roomPlanner.base.type === undefined) {
    // Make a base based on current already placed layout
    const headSpawn = Game.getObjectById(flagMemory.commonMemory.headSpawnId);
    if (headSpawn === null) return;

    // Get middle position of bunker
    const midPos = headSpawn.pos;
    midPos.x += 1;
    midPos.y -= 1;

    if (doesBunkerFitAtPosition(terrain, midPos)) flagMemory.roomPlanner.base.type = 'bunker';
    else flagMemory.roomPlanner.base.type = 'generated';
  } else {
    let foundPlaceForBunker = false;
    for (let x = 5; x < 45 && !foundPlaceForBunker; x++) {
      for (let y = 5; y < 45 && !foundPlaceForBunker; y++) {
        if (doesBunkerFitAtPosition(terrain, {x: x, y: y})) {
          flagMemory.roomPlanner.base.midPos = {x: x, y: y};
          foundPlaceForBunker = true;
          flagMemory.roomPlanner.base.type = 'bunker';
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
  }
};
// #endregion

// #region getBaseLayoutType function
const getBaseLayoutBasedOnType = (room, layoutType) => {
  // Acces flagMemory
  const flagMemory = Memory.flags[room.name];

  let midPos;
  if (flagMemory.commonMemory.headSpawnId) {
    const headSpawn = Game.getObjectById(flagMemory.commonMemory.headSpawnId);
    if (headSpawn === null) return;

    // Get middle position of bunker
    midPos = headSpawn.pos;
    midPos.x += 1;
    midPos.y -= 1;
  } else if (flagMemory.roomPlanner.base.midPos) midPos = flagMemory.roomPlanner.base.midPos;

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
        name: '{ roomName }-0',
      },
    ],
    [
      // * Controller level 2 //
      // Extensions
      {
        x: midPos.x - 3,
        y: midPos.y + 1,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 3,
        y: midPos.y + 2,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 2,
        y: midPos.y + 2,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 2,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 1,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION,
      },
    ],
    [
      // * Controller level 3 //
      // Extensions
      {
        x: midPos.x - 4,
        y: midPos.y + 2,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 4,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 3,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 3,
        y: midPos.y + 4,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 2,
        y: midPos.y + 4,
        type: STRUCTURE_EXTENSION,
      },

      // Towers
      {
        x: midPos.x - 0,
        y: midPos.y + 1,
        type: STRUCTURE_TOWER,
      },
    ],
    [
      // * Controller level 4 //
      // Extensions
      {
        x: midPos.x - 2,
        y: midPos.y + 5,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 1,
        y: midPos.y + 4,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 1,
        y: midPos.y + 5,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 0,
        y: midPos.y + 4,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 0,
        y: midPos.y + 5,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 1,
        y: midPos.y + 5,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 1,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 2,
        y: midPos.y + 2,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 2,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 2,
        y: midPos.y + 4,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 1,
        y: midPos.y + 0,
        type: STRUCTURE_STORAGE,
      },
    ],
    [
      // * Controller level 5 //
      // Extensions
      {
        x: midPos.x + 3,
        y: midPos.y + 1,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 3,
        y: midPos.y + 2,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 3,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 3,
        y: midPos.y + 4,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 4,
        y: midPos.y + 0,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 4,
        y: midPos.y + 1,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 4,
        y: midPos.y + 2,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 4,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 5,
        y: midPos.y + 1,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 5,
        y: midPos.y + 2,
        type: STRUCTURE_EXTENSION,
      },

      // Tower
      {
        x: midPos.x - 0,
        y: midPos.y - 1,
        type: STRUCTURE_TOWER,
      },
    ],
    [
      // * Controller level 6 //
      // Extensions
      {
        x: midPos.x + 5,
        y: midPos.y - 1,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 3,
        y: midPos.y - 1,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 4,
        y: midPos.y - 2,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 3,
        y: midPos.y - 2,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 5,
        y: midPos.y + 1,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 5,
        y: midPos.y - 1,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 5,
        y: midPos.y - 2,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 4,
        y: midPos.y - 0,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 4,
        y: midPos.y - 1,
        type: STRUCTURE_EXTENSION,
      },

      // Terminal
      {
        x: midPos.x + 1,
        y: midPos.y + 0,
        type: STRUCTURE_TERMINAL,
      },

      // Link
      {
        x: midPos.x + 1,
        y: midPos.y + 1,
        type: STRUCTURE_LINK,
      },

      // Labs
      {
        x: midPos.x - 2,
        y: midPos.y - 2,
        type: STRUCTURE_LAB,
      },
      {
        x: midPos.x - 3,
        y: midPos.y - 2,
        type: STRUCTURE_LAB,
      },
      {
        x: midPos.x - 3,
        y: midPos.y - 3,
        type: STRUCTURE_LAB,
      },
    ],
    [
      // * Controller level 7 //
      // Extension
      {
        x: midPos.x + 4,
        y: midPos.y - 3,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 3,
        y: midPos.y - 3,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 2,
        y: midPos.y - 3,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 1,
        y: midPos.y - 3,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 3,
        y: midPos.y - 4,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 2,
        y: midPos.y - 4,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 1,
        y: midPos.y - 4,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 0,
        y: midPos.y - 4,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 1,
        y: midPos.y - 5,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x - 0,
        y: midPos.y - 5,
        type: STRUCTURE_EXTENSION,
      },

      // Labs
      {
        x: midPos.x - 3,
        y: midPos.y - 1,
        type: STRUCTURE_LAB,
      },
      {
        x: midPos.x - 4,
        y: midPos.y - 2,
        type: STRUCTURE_LAB,
      },
      {
        x: midPos.x - 4,
        y: midPos.y - 3,
        type: STRUCTURE_LAB,
      },

      // Factory
      {
        x: midPos.x + 1,
        y: midPos.y - 1,
        type: STRUCTURE_FACTORY,
      },

      // Spawn
      {
        x: midPos.x + 5,
        y: midPos.y - 0,
        type: STRUCTURE_SPAWN,
        name: '{ roomName }-1',
      },

      // Tower
      {
        x: midPos.x + 0,
        y: midPos.y - 2,
        type: STRUCTURE_TOWER,
      },
    ],
    [
      // * Controller level 8 //
      // Extension
      {
        x: midPos.x + 1,
        y: midPos.y - 5,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 2,
        y: midPos.y - 5,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 7,
        y: midPos.y + 1,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 7,
        y: midPos.y + 2,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 6,
        y: midPos.y + 3,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 5,
        y: midPos.y + 4,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 4,
        y: midPos.y + 5,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 3,
        y: midPos.y + 6,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 2,
        y: midPos.y + 7,
        type: STRUCTURE_EXTENSION,
      },
      {
        x: midPos.x + 1,
        y: midPos.y + 7,
        type: STRUCTURE_EXTENSION,
      },

      // Towers
      {
        x: midPos.x + 0,
        y: midPos.y + 2,
        type: STRUCTURE_TOWER,
      },
      {
        x: midPos.x + 2,
        y: midPos.y - 0,
        type: STRUCTURE_TOWER,
      },
      {
        x: midPos.x - 2,
        y: midPos.y - 0,
        type: STRUCTURE_TOWER,
      },

      // Nuker
      {
        x: midPos.x - 1,
        y: midPos.y - 1,
        type: STRUCTURE_NUKER,
      },

      // Observer
      {
        x: midPos.x + 0,
        y: midPos.y + 7,
        type: STRUCTURE_OBSERVER,
      },

      // Labs
      {
        x: midPos.x - 2,
        y: midPos.y - 3,
        type: STRUCTURE_LAB,
      },
      {
        x: midPos.x - 1,
        y: midPos.y - 3,
        type: STRUCTURE_LAB,
      },
      {
        x: midPos.x - 3,
        y: midPos.y - 4,
        type: STRUCTURE_LAB,
      },
      {
        x: midPos.x - 2,
        y: midPos.y - 4,
        type: STRUCTURE_LAB,
      },

      // Spawn
      {
        x: midPos.x - 5,
        y: midPos.y - 0,
        type: STRUCTURE_SPAWN,
        name: '{ roomName }-2',
      },
    ],
  ];

  switch (layoutType) {
  case 'generated':
    // #region Generated layout

    break;
    // #endregion
  case 'bunker':
    // #region Bunker layout
    // * Bunker layout //
    // Build everything from the controller level and all below //
    for (let i = 2; i <= room.controller.level; i++) {
      for (let y = 0; y < bunker[i].length; y++) {
        const structureObject = bunker[i][y];
        createConstructionSite(
          room,
          {x: structureObject.x, y: structureObject.y},
          structureObject.type,
          structureObject.name ?
            structureObject.name.replace('{ roomName }', room.name) :
            undefined,
        );
      }
    }
    break;
    // #endregion
  default:
    break;
  }
};
// #endregion

// #region GetBestFreeSpot
const getBestFreeSpot = (room, startPos, structureType = STRUCTURE_LINK) => {
  const terrain = new Room.Terrain(room.name);
  // Get range based on structure type (container is 1, link is 2)
  const range = structureType === STRUCTURE_LINK ? 2 : 1;

  // getAllPositions function
  // Returns a position array based on inputPosition and inputRange
  const getAllPositions = (inputPosition, inputRange) => {
    // Get all possible positionsArray //
    const positionsArray = [];
    for (let i = 1; i <= inputRange; i++) {
      // Add all corners of the inputPosition + inputRange //
      // Top left
      positionsArray.push({
        x: inputPosition.x - inputRange,
        y: inputPosition.y + inputRange,
        roomname: inputPosition.roomName,
      });
      // Top right
      positionsArray.push({
        x: inputPosition.x + inputRange,
        y: inputPosition.y + inputRange,
        roomname: inputPosition.roomName,
      });

      // Bottom left
      positionsArray.push({
        x: inputPosition.x - inputRange,
        y: inputPosition.y - inputRange,
        roomname: inputPosition.roomName,
      });
      // Bottom right
      positionsArray.push({
        x: inputPosition.x + inputRange,
        y: inputPosition.y - inputRange,
        roomname: inputPosition.roomName,
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
          roomname: inputPosition.roomName,
        });
        // Right
        positionsArray.push({
          x: inputPosition.x + inputRange,
          y: inputPosition.y,
          roomname: inputPosition.roomName,
        });
        // Bottom
        positionsArray.push({
          x: inputPosition.x,
          y: inputPosition.y - inputRange,
          roomname: inputPosition.roomName,
        });
        // Left
        positionsArray.push({
          x: inputPosition.x - inputRange,
          y: inputPosition.y,
          roomname: inputPosition.roomName,
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
          roomname: inputPosition.roomName,
        });
        // Top right
        positionsArray.push({
          x: inputPosition.x + i,
          y: inputPosition.y + 2,
          roomname: inputPosition.roomName,
        });

        // Right top
        positionsArray.push({
          x: inputPosition.x + 2,
          y: inputPosition.y + i,
          roomname: inputPosition.roomName,
        });
        // Right bottom
        positionsArray.push({
          x: inputPosition.x + 2,
          y: inputPosition.y - i,
          roomname: inputPosition.roomName,
        });

        // Bottom left
        positionsArray.push({
          x: inputPosition.x - i,
          y: inputPosition.y - 2,
          roomname: inputPosition.roomName,
        });
        // Bottom right
        positionsArray.push({
          x: inputPosition.x + i,
          y: inputPosition.y - 2,
          roomname: inputPosition.roomName,
        });

        // Left top
        positionsArray.push({
          x: inputPosition.x - 2,
          y: inputPosition.y + i,
          roomname: inputPosition.roomName,
        });
        // Left bottom
        positionsArray.push({
          x: inputPosition.x - 2,
          y: inputPosition.y - i,
          roomname: inputPosition.roomName,
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
  let bestPosition = {
    pos: {x: 0, y: 0, roomName: room.name},
    spotsAround: 0,
  };
  positions.forEach((position) => {
    // Check if current position is not TERRAIN_MASK_WALL //
    if (terrain.get(position.x, position.y) === TERRAIN_MASK_WALL) return;

    // Get all positions in 1 range of inputPosition
    const loopPositions = getAllPositions(position, 1);

    // Set the spotsAround to zero
    let spotsAround = 0;

    loopPositions.forEach((loopPosition) => {
      if (terrain.get(loopPosition.x, loopPosition.y) !== TERRAIN_MASK_WALL) {
        spotsAround++;
      }
    });

    // If current position is better then current saved bestPosition, overwrite bestPosition
    if (spotsAround > bestPosition.spotsAround) {
      bestPosition = {pos: position, spotsAround: spotsAround};
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
  room,
  position,
  structureType,
  structureName,
) => {
  // Create a construction site based on the inputPosition and inputStructureType
  let constructionSite = room.createConstructionSite(
    position.x,
    position.y,
    structureType,
    structureName,
  );

  const look = room.lookAt(position.x, position.y);
  const flagMemory = Memory.flags[room.name];

  // Switch based on return value of createConstructionSite
  switch (constructionSite) {
  case OK:
    // Loop through all object's found at this position
    look.forEach((lookObject) => {
      if (lookObject.type === LOOK_CONSTRUCTION_SITES) {
        flagMemory.commonMemory.constructionSites.push(
          lookObject.constructionSite.id,
        );
      }
    });
    break;
  default:
    look.forEach((lookObject) => {
      if (lookObject.type === LOOK_CONSTRUCTION_SITES) {
        if (lookObject.constructionSite.structureType === structureType) {
          // Target structureType was found so set construction site to OK (good)
          constructionSite = OK;
        }
      }
    });
    break;
  }

  // Return value of createConstructionSite
  return constructionSite;
};
// #endregion
// #endregion

// #region BasePlanner function
const basePlanner = (room) => {
  // Get roomName and flagMemory
  const roomName = room.name;
  const flagMemory = Memory.flags[roomName];

  if (!flagMemory.roomPlanner.base.type) getBaseLayoutType(room);
  else getBaseLayoutBasedOnType(room, flagMemory.roomPlanner.base.type);
};
// #endregion

// #region RoomPlanner function
const roomPlanner = (room) => {
  // Get roomName and flagMemory
  const roomName = room.name;
  const flagMemory = Memory.flags[roomName];

  // Add new room data of sources //
  flagMemory.visuals.objects.sources = [];

  // #region Source structures
  for (let i = 0; i < flagMemory.commonMemory.sources.length; i++) {
    // Check if room already has this source planned
    if (flagMemory.roomPlanner.room.sources[i]) return;

    const source = flagMemory.commonMemory.sources[i];
    // TODO GET STRUCTURE BASED ON ROOM SPECS (like source count and controller level)
    const structureType = STRUCTURE_CONTAINER;
    const bestSourcePosition = getBestFreeSpot(room, source.pos, structureType);
    // Check if best position is found, otherwise return
    if (bestSourcePosition === undefined) return;

    // Build a structure there //
    const returnConstruction = createConstructionSite(
      room,
      bestSourcePosition.pos,
      structureType,
    );

    // Check if structure is successfully constructed
    if (returnConstruction !== OK) return;

    // Set best position to room planner memory for this source
    flagMemory.roomPlanner.room.sources[i] = bestSourcePosition;

    // * Handle visual to show target //
    // If visual is already in memory, return
    if (
      flagMemory.visuals.objects.sources[i] === true ||
      !config.rooms.visuals.structures
    ) {
      return;
    }

    const sourceVisualString = room.visual.circle(bestSourcePosition.pos, {
      fill: 'transparent',
      radius: 0.55,
      stroke: 'red',
    });
    if (Object.keys(sourceVisualString).length > 0) {
      // Update visual string in flagMemory //
      flagMemory.visuals.string = room.visual.export();
      flagMemory.visuals.objects.sources.push(true);
    }
  }
  // #endregion

  // #region Controller structure
  // Add new room data of the controller //
  // Check if room already has the controller planned
  if (flagMemory.roomPlanner.room.controller) return;

  const controller = room.controller;
  // TODO GET STRUCTURE BASED ON ROOM SPECS (like source count and controller level)
  const structureType = STRUCTURE_CONTAINER;
  const bestControllerPosition = getBestFreeSpot(
    room,
    controller.pos,
    structureType,
  );
  // Check if best position is found, otherwise return
  if (bestControllerPosition === undefined) return;

  // Build a structure there //
  const returnConstruction = createConstructionSite(
    room,
    bestControllerPosition.pos,
    structureType,
  );
  // Check if structure is successfully constructed
  if (returnConstruction !== OK) return;

  // Set best position to room planner memory for this source
  flagMemory.roomPlanner.room.controller = bestControllerPosition;

  // * Handle visual to show target //
  // If visual is already in memory, return
  if (
    flagMemory.visuals.objects.controller === true ||
    !config.rooms.visuals.structures
  ) {
    return;
  }

  const controllerVisualString = room.visual.circle(
    bestControllerPosition.pos,
    {fill: 'transparent', radius: 0.55, stroke: 'red'},
  );
  if (Object.keys(controllerVisualString).length > 0) {
    // Update visual string in flagMemory //
    flagMemory.visuals.string = room.visual.export();
    flagMemory.visuals.objects.controller = true;
  }
  // #endregion
};
// #endregion

module.exports = {
  // Run base planner //
  base: (room) => {
    basePlanner(room);
  },

  // Room planner //
  // Structures like controller storage, source storage and roads
  room: (room) => {
    roomPlanner(room);
  },
};