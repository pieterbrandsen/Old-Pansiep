// #region Functions
// #region GetBestFreeSpot
const getBestFreeSpot = (room, startPos, structureType = STRUCTURE_LINK) => {
  const terrain = new Room.Terrain(room.name);
  // Get range based on structure type (container is 1, link is 2)
  const range = (structureType === STRUCTURE_LINK) ? 2 : 1;

  // getAllPositions function
  // Returns a position array based on inputPosition and inputRange
  const getAllPositions = (inputPosition, inputRange) => {
    // Get all possible positionsArray //
    const positionsArray = [];
    for (let i = 1; i <= inputRange; i++) {
      // Add all corners of the inputPosition + inputRange //
      // Top left
      positionsArray.push({x: inputPosition.x-inputRange, y: inputPosition.y+inputRange, roomname: inputPosition.roomName});
      // Top right
      positionsArray.push({x: inputPosition.x+inputRange, y: inputPosition.y+inputRange, roomname: inputPosition.roomName});

      // Bottom left
      positionsArray.push({x: inputPosition.x-inputRange, y: inputPosition.y-inputRange, roomname: inputPosition.roomName});
      // Bottom right
      positionsArray.push({x: inputPosition.x+inputRange, y: inputPosition.y-inputRange, roomname: inputPosition.roomName});


      // Add all other positionsArray then corners
      if (i === 1) {
        // Add only 2's in this case
        //    1 2 3
        // 1 ╟─┼─┼─╫ 1
        // 2 ╟─┼─┼─╫ 2
        // 3 ╟─┼─┼─╫ 3
        //    1 2 3

        // Top
        positionsArray.push({x: inputPosition.x, y: inputPosition.y+inputRange, roomname: inputPosition.roomName});
        // Right
        positionsArray.push({x: inputPosition.x+inputRange, y: inputPosition.y, roomname: inputPosition.roomName});
        // Bottom
        positionsArray.push({x: inputPosition.x, y: inputPosition.y-inputRange, roomname: inputPosition.roomName});
        // Left
        positionsArray.push({x: inputPosition.x-inputRange, y: inputPosition.y, roomname: inputPosition.roomName});
      } else if (i <= inputRange-1) {
        // Add all numbers expect 2's
        //    1 2 3
        // 1 ╟─┼─┼─╫ 1
        // 2 ╟─┼─┼─╫ 2
        // 3 ╟─┼─┼─╫ 3
        //    1 2 3

        // Top left
        positionsArray.push({x: inputPosition.x-i, y: inputPosition.y+2, roomname: inputPosition.roomName});
        // Top right
        positionsArray.push({x: inputPosition.x+i, y: inputPosition.y+2, roomname: inputPosition.roomName});

        // Right top
        positionsArray.push({x: inputPosition.x+2, y: inputPosition.y+i, roomname: inputPosition.roomName});
        // Right bottom
        positionsArray.push({x: inputPosition.x+2, y: inputPosition.y-i, roomname: inputPosition.roomName});

        // Bottom left
        positionsArray.push({x: inputPosition.x-i, y: inputPosition.y-2, roomname: inputPosition.roomName});
        // Bottom right
        positionsArray.push({x: inputPosition.x+i, y: inputPosition.y-2, roomname: inputPosition.roomName});

        // Left top
        positionsArray.push({x: inputPosition.x-2, y: inputPosition.y+i, roomname: inputPosition.roomName});
        // Left bottom
        positionsArray.push({x: inputPosition.x-2, y: inputPosition.y-i, roomname: inputPosition.roomName});
      }
    }

    return positionsArray;
  };

  // Get all possible positions based on inputPosition
  const positions = getAllPositions(startPos, range);


  // Return if positions is empty //
  if (positions.length === 0) return;

  // Check all possible positions and assign the best one (compare to last best one)
  let bestPosition = {pos: {x: 0, y: 0, roomName: room.name}, spotsAround: 0};
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


// #region buildConstructionSite
const createConstructionSite = (room, position, structureType) => {
  // Create a construction site based on the inputPosition and inputStructureType
  let constructionSite = room.createConstructionSite(position.x, position.y, structureType);

  const look = room.lookAt(position.x, position.y);
  const flagMemory = Memory.flags[room.name];

  // Switch based on return value of createConstructionSite
  switch (constructionSite) {
  case OK:
    // Loop through all object's found at this position
    look.forEach((lookObject) => {
      if (lookObject.type === LOOK_CONSTRUCTION_SITES) {
        flagMemory.commonMemory.constructionSites.push(lookObject.constructionSite.id);
      }
    });
    break;
  default:
    look.forEach((lookObject) => {
      if (lookObject.type === LOOK_CONSTRUCTION_SITES) {
        if (lookObject.constructionSite.structureType === structureType) {
          flagMemory.commonMemory.constructionSites.push(lookObject.constructionSite.id);
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


//#region BasePlanner function
const basePlanner = (room) => {
};
//#endregion

//#region RoomPlanner function
const roomPlanner = (room) => {
  // Get roomName and flagMemory
  const roomName = room.name;
  const flagMemory = Memory.flags[roomName];

  // Add new room data of sources //
  flagMemory.visuals.objects.sources = [];

  //#region Source structures
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
    const returnConstruction = createConstructionSite(room, bestSourcePosition.pos, structureType);

    // Check if structure is successfully constructed
    if (returnConstruction !== OK) return;


    // Set best position to room planner memory for this source
    flagMemory.roomPlanner.room.sources[i] = bestSourcePosition;

    // * Handle visual to show target //
    // If visual is already in memory, return
    if (flagMemory.visuals.objects.sources[i] === true) return;

    const sourceVisualString = room.visual.circle(bestSourcePosition.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
    if (Object.keys(sourceVisualString).length > 0) {
      // Update visual string in flagMemory //
      flagMemory.visuals.string = room.visual.export();
      flagMemory.visuals.objects.sources.push(true);
    }
  }
  //#endregion


  //#region Controller structure
  // Add new room data of the controller //
  // Check if room already has the controller planned
  if (flagMemory.roomPlanner.room.controller) return;

  const controller = room.controller;
  // TODO GET STRUCTURE BASED ON ROOM SPECS (like source count and controller level)
  const structureType = STRUCTURE_CONTAINER;
  const bestControllerPosition = getBestFreeSpot(room, controller.pos, structureType);
  // Check if best position is found, otherwise return
  if (bestControllerPosition === undefined) return;

  // Build a structure there //
  const returnConstruction = createConstructionSite(room, bestControllerPosition.pos, structureType);
  // Check if structure is successfully constructed
  console.log(returnConstruction);
  if (returnConstruction !== OK) return;


  // Set best position to room planner memory for this source
  flagMemory.roomPlanner.room.controller = bestControllerPosition;

  // * Handle visual to show target //
  // If visual is already in memory, return
  if (flagMemory.visuals.objects.controller === true) return;

  const controllerVisualString = room.visual.circle(bestControllerPosition.pos, {fill: 'transparent', radius: 0.55, stroke: 'red'});
  if (Object.keys(controllerVisualString).length > 0) {
    // Update visual string in flagMemory //
    flagMemory.visuals.string = room.visual.export();
    flagMemory.visuals.objects.controller = true;
  }
  //#endregion
};
//#endregion


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
