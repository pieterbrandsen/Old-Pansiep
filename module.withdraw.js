const harvestModule = require('module.harvest');
const harvestLDModule = require('module.harvestLD');


module.exports = {
  run: function(creep) {
    const flagMemory = Memory.flags[creep.room.name];


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

    function createSurroundingConstructionSite(id,range,controllerLevel) {
      const room = creep.room
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


    function withdrawUpgraderSection() {
      const target = Game.getObjectById(flagMemory.controllerStorage);
      if (!target) {
        if (creep.room.controller) {
          let range = 3;
          let containerInRange = creep.room.controller.pos.findInRange(creep.room.containers, range,
            {filter: {structureType: STRUCTURE_CONTAINER}
          })[0];
          let linkInRange = creep.room.controller.pos.findInRange(creep.room.links, range,
            {filter: {structureType: STRUCTURE_LINK}
          })[0];
          let constructionSiteInRange = creep.room.controller.pos.findClosestByRange(FIND_CONSTRUCTION_SITES, {filter: (structure) => {
            return (structure.pos.inRangeTo(creep.room.controller,range))
          }});


          if (containerInRange) {
            flagMemory.controllerStorage = containerInRange.id;
          }
          else if (linkInRange) {
            flagMemory.controllerStorage = linkInRange.id;
          }
          else if (constructionSiteInRange == null) {
            createSurroundingConstructionSite(creep.room.controller.id,range,6,creep.room)
          }
          else {
            harvestModule.run(creep);
          }
        }
      }
      else {
        if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.travelTo(target);
        }
      }
    }

    function runWithdraw(target) {
      const runWithdraw = creep.withdraw(target,RESOURCE_ENERGY);

      switch(runWithdraw) {
        case OK:
        creep.say("Withdraw")
        break;
        case ERR_NOT_OWNER:
        break;
        case ERR_BUSY:
        break;
        case ERR_NOT_ENOUGH_RESOURCES:
        break;
        case ERR_INVALID_TARGET:
        if (!creep.pos.inRangeTo(creep.room.controller,4))
        creep.travelTo(creep.room.controller);
        break;
        case ERR_FULL:
        break;
        case ERR_NOT_IN_RANGE:
        creep.say("Moving");
        creep.moveTo(target);
        break;
        case ERR_INVALID_ARGS:
        break;
        default:
        break;
      }
    }

    function findWithdrawStructure() {
      const room = creep.room;
      let withdrawStructure;
      if (room.terminal) {
        switch(room.storage) {
          case undefined:
          withdrawStructure = STRUCTURE_TERMINAL;
          break;
          case !undefined:
          if (creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY))
          withdrawStructure = STRUCTURE_STORAGE;
          else
          withdrawStructure = STRUCTURE_TERMINAL;
          break;
          default:
          break;
        }
      }
      else if (room.storage && !room.terminal) {
        if (creep.room.containers.length > 0) {
          let energyStored = 0;
          room.containers.forEach((item, i) => {
            if (!creep.room.containers[i].pos.inRangeTo(creep.room.controller,3)) {
              energyStored += creep.room.containers[i].store.getUsedCapacity(RESOURCE_ENERGY);
            }
          });

          if (energyStored > 1500)
          withdrawStructure = STRUCTURE_CONTAINER;
          else
          withdrawStructure = STRUCTURE_STORAGE;
        }
        else {
          withdrawStructure = STRUCTURE_STORAGE;
        }
      }
      else if (room.containers.length > 0) {
        let energyStored = 0;
        room.containers.forEach((item, i) => {
          energyStored += room.containers[i].store.getUsedCapacity(RESOURCE_ENERGY);
        });
        if (energyStored > 500)
        withdrawStructure = STRUCTURE_CONTAINER;
        else
        withdrawStructure = null;
      }
      else
      withdrawStructure = null;

      return withdrawStructure;
    }

    function withdrawStructure() {
      const withdrawStructure = findWithdrawStructure();
      switch(withdrawStructure) {
        case STRUCTURE_TERMINAL:
        runWithdraw(creep.room.terminal);
        break;
        case STRUCTURE_STORAGE:
        let transferTarget = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
          filter: (s) => (s.structureType === STRUCTURE_SPAWN
            || s.structureType === STRUCTURE_EXTENSION
            || (s.structureType === STRUCTURE_TOWER && s.store.getUsedCapacity(RESOURCE_ENERGY) < 500 && creep.store.getUsedCapacity(RESOURCE_ENERGY) >= 150) && flagMemory.energyAvailable == flagMemory.energyCapacity
          ) && s.energy < s.energyCapacity
        });
        if (transferTarget !== null)
        runWithdraw(creep.room.storage);
        break;
        case STRUCTURE_CONTAINER:
        target = creep.pos.findClosestByRange(creep.room.containers, {filter: (structure) => {
          return (!structure.pos.inRangeTo(creep.room.controller,5) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > creep.store.getCapacity() && structure.structureType == withdrawStructure)}
        });
        runWithdraw(target);
        break;
        case null:
        if (creep.memory.role.includes("LD"))
        harvestLDModule.run(creep);
        else
        harvestModule.run(creep);


        default:
        break;
      }
    }

    if (creep.memory.role.includes("upgrader")) {
      if (mainSystem()) {
        // Get the CPU Usage //
        let start = Game.cpu.getUsed();

        // Run the part //
        withdrawUpgraderSection();

        // Set the average CPU Usage in the memory //

        Memory.cpuTracker["withdrawCPU.upgrader"] += Game.cpu.getUsed() - start;
      }
      else {
        // Run the part without tracking //
        withdrawUpgraderSection();
      }
    }
    else {
      if (mainSystem()) {
        // Get the CPU Usage //
        let start = Game.cpu.getUsed();

        // Run the part //
        withdrawStructure();

        // Set the average CPU Usage in the memory //

        Memory.cpuTracker["withdrawCPU.normal"] += Game.cpu.getUsed() - start;
      }
      else {
        // Run the part without tracking //
        withdrawStructure();
      }
    }
  }
};
