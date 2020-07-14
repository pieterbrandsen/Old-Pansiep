const getAccesPoints = require('function.getAccesPoints');

module.exports = {
  run: function(id,getRange,controllerLevel,roomName) {
    const object = Game.getObjectById(id);
    const x = object.pos.x;
    const y = object.pos.y;



    const possiblePositions = [

    ]
    for (let i = 1; i < getRange; i++) {
      for (let j = 0; j < ; j++) {
        possiblePositions.push([x-j,y-i])
        possiblePositions.push([x+j,y-i])
        possiblePositions.push([x-j,y+i])
        possiblePositions.push([x+j,y+i])
      }
      for (let j = 0; j < ; j++) {

      }
      //possiblePositions.push([x,y])
    }

    console.log(true)





    const room = Game.rooms[roomName];
    let structureType;

    let constructionSiteCanBeBuild = false;
    function createConstruction(structureType,x,y) {
      if (room.createConstructionSite(x,y,structureType) == 0) {
        return true;

      }
      else {
        return false;
      }
    }




    if (room.controller.level >= controllerLevel) {
      structureType = STRUCTURE_LINK;
    }
    else {
      range = 1;
      structureType = STRUCTURE_CONTAINER;
    }

    const containerInRange = object.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
      return (structure.pos.inRangeTo(object,range) && structure.structureType == STRUCTURE_CONTAINER)}
    });
    const linkInRange = object.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
      return (structure.pos.inRangeTo(object,range) && structure.structureType == STRUCTURE_LINK)}
    });
    const storageInRange = object.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
      return (structure.pos.inRangeTo(object,range) && (structure.structureType == STRUCTURE_LINK || structure.structureType == STRUCTURE_CONTAINER))}
    });
    const constructionSitesInRange = object.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {filter: (structure) => {
      return (structure.pos.inRangeTo(object,range) && (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_LINK))}
    });


    if (constructionSitesInRange == null && ((containerInRange !== null || linkInRange !== null) || storageInRange == null)) {
      if (structureType == STRUCTURE_LINK && containerInRange !== null) {
        containerInRange.destroy();
      }

      if (createConstruction(structureType,x+range,y+range) == true && constructionSiteCanBeBuild == false) {
        room.createConstructionSite(x+range,y+range,structureType)
        constructionSiteCanBeBuild = true
      }
      else if (createConstruction(structureType,x,y+range) == true && constructionSiteCanBeBuild == false) {
        room.createConstructionSite(x+range,y+range,structureType)
        constructionSiteCanBeBuild = true
      }
      else if (createConstruction(structureType,x-range,y+range) == true && constructionSiteCanBeBuild == false) {
        room.createConstructionSite(x+range,y+range,structureType)
        constructionSiteCanBeBuild = true
      }
      else if (createConstruction(structureType,x-range,y) == true && constructionSiteCanBeBuild == false) {
        room.createConstructionSite(x+range,y+range,structureType)
        constructionSiteCanBeBuild = true
      }
      else if (createConstruction(structureType,x-range,y-range) == true && constructionSiteCanBeBuild == false) {
        room.createConstructionSite(x+range,y+range,structureType)
        constructionSiteCanBeBuild = true
      }
      else if (createConstruction(structureType,x,y-range) == true && constructionSiteCanBeBuild == false) {
        room.createConstructionSite(x+range,y+range,structureType)
        constructionSiteCanBeBuild = true
      }
      else if (createConstruction(structureType,x+range,y-range) == true && constructionSiteCanBeBuild == false) {
        room.createConstructionSite(x+range,y+range,structureType)
        constructionSiteCanBeBuild = true
      }
      else if (createConstruction(structureType,x,y-range) == true && constructionSiteCanBeBuild == false) {
        room.createConstructionSite(x+range,y+range,structureType)
        constructionSiteCanBeBuild = true
      }
    }


    return constructionSiteCanBeBuild;
  }
};
