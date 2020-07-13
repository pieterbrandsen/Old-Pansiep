module.exports = {
  run: function(id,getRange,controllerLevel,roomName) {
    const room = Game.rooms[roomName];
    let range = getRange;
    let object = Game.getObjectById(id);
    let structureType;
    let x = object.pos.x;
    let y = object.pos.y;
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
      if (object.structureType == STRUCTURE_CONTROLLER)
      range = 1;
      structureType = STRUCTURE_CONTAINER;
    }

    let containerInRange = object.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
      return (structure.pos.inRangeTo(object,range) && structure.structureType == STRUCTURE_CONTAINER)}
    });
    let linkInRange = object.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
      return (structure.pos.inRangeTo(object,range) && structure.structureType == STRUCTURE_LINK)}
    });
    let constructionSitesInRange = object.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {filter: (structure) => {
      return (structure.pos.inRangeTo(object,range) && (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_LINK))}
    });


    if (constructionSitesInRange == null) {
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
