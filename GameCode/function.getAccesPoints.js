module.exports = {
  run: function(inputId, roomName) {
    // Get The Object Of The InputId
    const object = Game.getObjectById(inputId);
    // Get The Terrain Of The InputRoom //
    const room = Game.rooms[roomName];
    const terrain = new Room.Terrain(roomName);
    // Possible Postions //
    let possiblePositionsList = [];
    let count = 0;


    const possiblePositions = [
      // Top Position
      [object.pos.x,object.pos.y-1],

      // Top Right Position
      [object.pos.x+1,object.pos.y-1],

      // Right Position
      [object.pos.x+1,object.pos.y],

      // Bottom Right Position
      [object.pos.x+1,object.pos.y+1],

      // Bottom Position
      [object.pos.x,object.pos.y+1],

      // Bottom Left Position
      [object.pos.x-1,object.pos.y+1],

      // Left Position
      [object.pos.x-1,object.pos.y],

      // Top Left Position
      [object.pos.x-1,object.pos.y-1],
    ]

    function checkIfSpotIsFree(position) {
      // Containers en Roads moeten niet meegeteld worden, missen er 2 nog!
      const positionObject = room.lookForAt(LOOK_STRUCTURES,position[0],position[1])
      if (positionObject[0] !== undefined) {
        if (positionObject[0].structureType == STRUCTURE_CONTAINER || positionObject[0].structureType == STRUCTURE_ROAD)
          return true;
      }
      else if (terrain.get(position[0],position[1]) == 0)
        return true;
      else return false;
    }

    // Loop Through Every Possible Position //
    possiblePositions.forEach((item, i) => {
      // Check If Terrain Is Empty //
      // If Terrain Is Empty, Enter The Possible Position In An Array //
      if (checkIfSpotIsFree(item)) {
        // Enter Positions In Array To Use For Optmizing Placement //
        possiblePositionsList.push([item[0],item[1]])
        count++;
      }
    });


    // Return Possible Positions //
    return [count, possiblePositionsList];
  }
}
