const harvestModule = require('module.harvest');

function createSurroundingConstructionSite(id,range,controllerLevel,room) {
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

  if (room.controller.lever >= controllerLevel) {
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



  if (!containerInRange && !linkInRange) {
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
        let containerInRange = creep.room.controller.pos.findClosestByRange(creep.room.containers, {filter: (structure) => {
          return (structure.pos.inRangeTo(creep.room.controller,range))}
        });
        let constructionSiteInRange = creep.room.controller.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {filter: (structure) => {
          return (structure.pos.inRangeTo(creep.room.controller,range))}
        });

        if (containerInRange) {
            creep.memory.targetId = containerInRange.id;
        }
        else if (!constructionSiteInRange) {
          createSurroundingConstructionSite(creep.room.controller.id,range,6,creep.room)
        }
        else {
          harvestModule.run(creep);
        }
      }
      else {
        creep.say(creep.withdraw(target,RESOURCE_ENERGY))
        if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.travelTo(target);
        }
      }
    }
    else {
      let containerAmount = creep.room.containers.length;
      let linkAmount = creep.room.links.length;
      let energyStored = 0;

      if (containerAmount > 0) {
        creep.room.containers.forEach((item, i) => {
          energyStored += creep.room.containers[i].store.getUsedCapacity(RESOURCE_ENERGY);
        });


        if (energyStored > 1000) {
          const findClosestContainer = creep.pos.findClosestByRange(creep.room.containers, {filter: (structure) => {
            return (structure.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getCapacity())}
          });

          if (findClosestContainer) {
            if(creep.withdraw(findClosestContainer,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.travelTo(findClosestContainer);
            }
          }
        }
        else if (creep.getActiveBodyparts(WORK) > 0) {
          harvestModule.run(creep);
        }
      }
      else if (creep.room.storage || creep.room.terminal) {
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
        if (creep.room.terminal !== undefined) {
          energyStored += creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY);
        }
        if (energyStored > 5000) {
          return true;
        }
        else if (creep.getActiveBodyparts(WORK) > 0) {
          harvestModule.run(creep);
        }
      }
      else if (linkAmount > 0) {
        creep.room.links.forEach((item, i) => {
          energyStored += creep.room.links[i].store.getUsedCapacity(RESOURCE_ENERGY);
        });

        if (energyStored > 500) {
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
