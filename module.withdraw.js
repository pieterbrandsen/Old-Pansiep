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

    if (!creep.memory.withdrawId)
    creep.memory.withdrawId = ""


    function enterValueInMemory(memoryPath, inputValue) {
      flagMemory.roomManager[memoryPath] = inputValue;
    };

    function withdrawUpgraderSection() {
      const target = Game.getObjectById(flagMemory.controllerStorage);
      if (!target) {
        if (creep.room.controller) {
          let range = 5;
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
            enterValueInMemory(`controller.HasStructure`, false);
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
      if ((target.structureType == "storage" || target.structureType == "terminal") && flagMemory.totalEnergyCapacity == flagMemory.totalEnergyAvailable) {
        return false;
      }
      else {
        const runWithdraw = creep.withdraw(target,RESOURCE_ENERGY);

        switch(runWithdraw) {
          case OK:
          creep.say("Withdraw");
          creep.memory.withdrawStructure = target.structureType;
          creep.memory.withdrawId = "";
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
          creep.travelTo(target);
          break;
          case ERR_INVALID_ARGS:
          break;
          default:
          break;
        }
      }
    }

    function findWithdrawStructure() {
      const room = creep.room;
      let withdrawStructure = null;

      function checkStorage() {
        if (room.storage)
        if (room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 500) {
          withdrawStructure = STRUCTURE_STORAGE;
          creep.memory.withdrawId = room.storage.id;
          return true;
        }
      }
      function checkTerminal() {
        if (room.terminal)
        if (room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 500) {
          withdrawStructure = STRUCTURE_TERMINAL
          creep.memory.withdrawId = room.terminal.id;
          return true;
        }
      }
      function checkContainers() {
        if (room.containers.length > 0) {
          let energyStored = 0;
          room.containers.forEach((item, i) => {
            energyStored += room.containers[i].store.getUsedCapacity(RESOURCE_ENERGY);
          });
          if (energyStored > 500) {
            target = creep.pos.findClosestByRange(creep.room.containers, {filter: (structure) => {
              return (!structure.pos.inRangeTo(creep.room.controller,3) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0)}
            });
            if (target !== null) {
              withdrawStructure = STRUCTURE_CONTAINER;
              creep.memory.withdrawId = target.id;
              return true;
            }
          }
        }
      }
      function checkLinks() {
        if (room.links.length > 0) {
          let energyStored = 0;
          room.links.forEach((item, i) => {
            if (!item.pos.inRangeTo(creep.room.controller,3))
            energyStored += room.links[i].store.getUsedCapacity(RESOURCE_ENERGY);
          });

          if (energyStored > 500) {
            target = creep.pos.findClosestByRange(creep.room.links, {filter: (structure) => {
              return (!structure.pos.inRangeTo(creep.room.controller,3) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0)}
            });
            if (target !== null) {
              withdrawStructure = STRUCTURE_LINK;
              creep.memory.withdrawId = target.id;
              return true;
            }
          }
        }
      }


      if (creep.memory.role !== "transferer") {
        if (!checkContainers())
        if (!checkTerminal())
        if (!checkStorage())
        if (!checkLinks()) {
          creep.memory.withdrawId = "source";
        }
      }
      else {
        if (!checkStorage())
        if (!checkTerminal())
        if (!checkContainers())
        if (!checkLinks()) {

        }
      }


      if (withdrawStructure !== null)
      creep.say(withdrawStructure)

      return withdrawStructure;
    }

    function withdrawStructure() {
      if (creep.memory.role.includes("LD")) {
        harvestModule.run(creep);
      }
      else {
        if (creep.memory.withdrawId.length > 0) {
          if (creep.memory.withdrawId == "source")
          harvestModule.run(creep);
          else
          runWithdraw(Game.getObjectById(creep.memory.withdrawId));
        }
        else {
          if (Game.time % 5 == 0) {
            findWithdrawStructure();
          }
        }
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
