module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    function createSurroundingConstructionSite(id,getRange,controllerLevel) {
      let range = getRange;
      const room = creep.room;
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
    };

    const sources = room.find(FIND_SOURCES);
    sources.forEach((item, i) => {
      if (flagMemory.roomManager.sources[i].HasStructure == false)
        createSurroundingConstructionSite(flagMemory.sources[i].id,2,7);
    });

    if (flagMemory.roomManager.controllerStorage.HasStructure == false)
      createSurroundingConstructionSite(room.controller.id,3,6);



  }
}
