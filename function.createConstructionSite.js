const getAccesPoints = require('function.getAccesPoints');

module.exports = {
  run: function(id,getRange,controllerLevel,roomName) {
    const room = Game.rooms[roomName];
    const terrain = new Room.Terrain(roomName);
    const flagMemory = Memory.flags[roomName];
    const object = Game.getObjectById(id);
    const x = object.pos.x;
    const y = object.pos.y;
    let range = getRange;

    let structureType;
    let constructionSiteCanBeBuild = false;
    let isThereStruture = false;
    let errorMessage = "";

    if (room.controller.level >= controllerLevel) {
      structureType = STRUCTURE_LINK;
    }
    else {
      if (id !== room.controller.id) {
        range = 1;
      }
      structureType = STRUCTURE_CONTAINER;
    }




    function createConstruction(structureType,x,y) {
      // TODO: Create output if fault message
      const buildStructure = room.createConstructionSite(x,y,structureType);
      if (buildStructure == 0) {
        return true;
      }
      else {
        errorMessage = buildStructure;
        return false;
      }
    }





    const containerInRange = object.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
      return (structure.pos.inRangeTo(object,range+1) && structure.structureType == STRUCTURE_CONTAINER)}
    });
    const linkInRange = object.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
      return (structure.pos.inRangeTo(object,range+1) && structure.structureType == STRUCTURE_LINK)}
    });
    const storageInRange = object.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
      return (structure.pos.inRangeTo(object,range+1) && (structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_CONTAINER))}
    });
    const constructionSitesInRange = object.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {filter: (structure) => {
      return (structure.pos.inRangeTo(object,range+1) && (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_LINK))}
    });


    if (constructionSitesInRange == null && ((containerInRange !== null && linkInRange == null && structureType == STRUCTURE_LINK) || storageInRange == null)) {
      if (structureType == STRUCTURE_LINK && containerInRange !== null) {
        containerInRange.destroy();
      }

      const possiblePositions = [];
      let optimalPositions = [0,[0,0], 50];

      for (let i = 1; i < range+1; i++) {
        for (let j = 0; j < range+1; j++) {
          possiblePositions.push([x-j,y-i])
          possiblePositions.push([x+j,y-i])
          possiblePositions.push([x-j,y+i])
          possiblePositions.push([x+j,y+i])
        }
      }

      for (var i = 0; i < possiblePositions.length; i++) {
        const posX = possiblePositions[i][0];
        const posY = possiblePositions[i][1];
        const possiblePositionsOfPlacementPossible = getAccesPoints.run(posX, posY, roomName)[0];
        if (terrain.get(posX,posY) == 0) {
          if (possiblePositionsOfPlacementPossible > optimalPositions[0]) {
            optimalPositions[0] = possiblePositionsOfPlacementPossible
            optimalPositions[1][0] = posX;
            optimalPositions[1][1] = posY;
          }
          else if (Game.getObjectById(flagMemory.roomManager.headSpawn) !== null) {
            const getRangeToHeadSpawn = Game.getObjectById(flagMemory.roomManager.headSpawn).pos.getRangeTo(posX,posY)
            if (possiblePositionsOfPlacementPossible == optimalPositions[0] && getRangeToHeadSpawn < optimalPositions[2]) {
              optimalPositions[0] = possiblePositionsOfPlacementPossible
              optimalPositions[1][0] = posX;
              optimalPositions[1][1] = posY;
              optimalPositions[2] = getRangeToHeadSpawn;
            }
          }
        }
      }

      constructionSiteCanBeBuild = createConstruction(structureType,optimalPositions[1][0],optimalPositions[1][1]);
    }
    else {
      isThereStruture = true;
    }


    return [constructionSiteCanBeBuild, isThereStruture, errorMessage];
  }
};
