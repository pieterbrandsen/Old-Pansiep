module.exports = {
  run: function(creep) {
    const flagMemory = Memory.flags[creep.room.name];
    // If creep has no targetId assign a empty string //
    if (!creep.memory.targetId)
    creep.memory.targetId = "";

    if (!creep.memory.builderWorkCount) {
      creep.memory.builderWorkCount = creep.getActiveBodyparts(WORK);
    }


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



    function mainSystem() {
      // If Memory.mainSystem is defined //
      if (Memory.mainSystem) {
        // If Memory.mainSystem is allowed to track cpu return True //
        if (Memory.mainSystem.cpuTracker == true) {
          return true;
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    }

    function findNewTarget() {
      // Find new target to build //
      const findNewTarget = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

      if (!findNewTarget) {
        // If no target is found, reset constructionSiteAmount and suicide //
        Memory.flags[creep.room.name].constructionSitesAmount = 0;
        if (Game.flags["builderLD"+creep.memory.spawnRoom])
        Game.flags["builderLD"+creep.memory.spawnRoom].remove();
        if (creep.memory.role.includes("builder"))
        creep.suicide()
        else {
          if (Game.time % 10 == 0) {
            if (creep.memory.sourceId) {
              createSurroundingConstructionSite(creep.memory.sourceId,2,7);
            }
          }
        }
      }
      else {
        // If current target is null assign the new found target //
        if (Game.getObjectById(creep.memory.targetId) == null) {
          creep.memory.targetId = findNewTarget.id;
        }
        else {
          // If creep is standing on the structure move to controller else assign the new target to the memory //
          if (creep.pos.inRangeTo(Game.getObjectById(creep.memory.targetId),0)) {
            creep.travelTo(creep.room.controller)
          }
          else {
            creep.memory.targetId = findNewTarget.id;
          }
        }
      }
    }

    function buildTarget() {
      const runBuilder = creep.build(Game.getObjectById(creep.memory.targetId));
      switch(runBuilder) {
        case OK:
          creep.say(creep.store.getUsedCapacity() / creep.store.getCapacity() * 100 +"%");
          if (creep.memory.builderWorkCount) {
            Memory.performanceTracker[creep.room.name + ".builderEnergy"] += creep.memory.builderWorkCount * 2;
          }
          break;
        case ERR_NOT_OWNER:
          break;
        case ERR_BUSY:
          break;
        case ERR_NOT_ENOUGH_RESOURCES:
          break;
        case ERR_INVALID_TARGET:
          findNewTarget();
          break;
        case ERR_NOT_IN_RANGE:
          creep.say("Moving");
          creep.travelTo(Game.getObjectById(creep.memory.targetId));
          break;
        case ERR_NO_BODYPART:
        default:
          break;
      }
    }


    if (mainSystem()) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      buildTarget();

      // Set the average CPU Usage in the memory //

      Memory.cpuTracker["builderCPU.total"] += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      buildTarget();
    }
  }
};
