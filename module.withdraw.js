const harvestModule = require('module.harvest');

function createSurroundingConstructionSite(id,range,controllerLevel) {
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

  if (object.room.controller.level >= controllerLevel) {
    structureType = STRUCTURE_LINK;
  }
  else {
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


  if (((!containerInRange && structureType == STRUCTURE_CONTAINER) || (!linkInRange && structureType == STRUCTURE_LINK)) && constructionSitesInRange == null) {
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

module.exports = {
  run: function(creep) {

    if (creep.memory.role.includes("upgrader")) {
      const target = Game.getObjectById(creep.memory.targetId);

      if (!target) {
        let range = 3;
        let containerInRange = creep.room.controller.pos.findInRange(creep.room.containers, range,
          {filter: {structureType: STRUCTURE_CONTAINER}})[0];
        let linkInRange = creep.room.controller.pos.findInRange(creep.room.links, range,
          {filter: {structureType: STRUCTURE_LINK}})[0];
        let constructionSiteInRange = creep.room.controller.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {filter: (structure) => {
          return (structure.pos.inRangeTo(creep.room.controller,range))}
        });

        if (containerInRange) {
            creep.memory.targetId = containerInRange.id;
        }
        else if (linkInRange) {
            creep.memory.targetId = linkInRange.id;
        }
        else if (constructionSiteInRange == null) {
          createSurroundingConstructionSite(creep.room.controller.id,range,6,creep.room)
        }
        else {
          harvestModule.run(creep);
        }
      }
      else {
        if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.travelTo(target);
        }
      }
    }
    else {
      let containerAmount = creep.room.containers.length;
      let linkAmount = creep.room.links.length;
      let energyStored = 0;

      if (creep.room.storage || creep.room.terminal) {
        if (creep.room.storage && creep.room.terminal) {
          if (creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) >= 250) {
            if(creep.withdraw(creep.room.storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.storage);
            }
          }
          else {
            if(creep.withdraw(creep.room.terminal,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.terminal);
            }
          }
        }
        else if (creep.room.storage) {
          if(creep.withdraw(creep.room.storage,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.travelTo(creep.room.storage);
          }
        }
        else if (creep.room.terminal) {
          if(creep.withdraw(creep.room.terminal,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.travelTo(creep.room.terminal);
          }
        }
      }
      if (containerAmount > 0) {
        creep.room.containers.forEach((item, i) => {
          if (creep.room.containers[i] !== null) {
            energyStored += creep.room.containers[i].store.getUsedCapacity(RESOURCE_ENERGY);
          }
        });


        if (energyStored > 500) {
          const findClosestContainer = creep.pos.findClosestByRange(creep.room.containers, {filter: (structure) => {
            return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getCapacity() && !structure.pos.inRangeTo(creep.room.controller,5))}
          });

          if (findClosestContainer) {
            if(creep.withdraw(findClosestContainer,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(findClosestContainer);
            }
          }
        }
        else if (creep.getActiveBodyparts(WORK) > 0) {
          harvestModule.run(creep);
        }
      }
      if (linkAmount > 0) {
        creep.room.links.forEach((item, i) => {
          energyStored += creep.room.links[i].store.getUsedCapacity(RESOURCE_ENERGY);
        });

        if (energyStored > 1000) {
          const findClosestLink = creep.pos.findClosestByRange(creep.room.links, {filter: (structure) => {
            return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getCapacity())}
          });

          if (findClosestLink) {
            if(creep.withdraw(findClosestLink,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.travelTo(findClosestLink);
            }
          }
        }
        else if (creep.getActiveBodyparts(WORK) > 0) {
          harvestModule.run(creep);
        }
      }
      else if (creep.getActiveBodyparts(WORK) > 0) {
        harvestModule.run(creep);
      }
    }
  }
};