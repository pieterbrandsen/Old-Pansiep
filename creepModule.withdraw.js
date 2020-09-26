const harvestModule = require('creepModule.harvest');
const runMainSystem = require('function.mainSystem');


module.exports = {
  run: function(creep) {
    if (creep.ticksToLive < 50)
    creep.suicide();

    // Get The Variables Needed For Module //
    const getMainSystem = runMainSystem.run();
    const flagMemory = Memory.flags[creep.room.name];


    if (!creep.memory.withdrawId)
    creep.memory.withdrawId = ""


    function enterValueInMemory(memoryPath, inputValue) {
      flagMemory.roomManager[memoryPath] = inputValue;
    };

    function withdrawUpgraderSection() {
      const target = Game.getObjectById(flagMemory.controllerStructureId);
      if (target) {
        if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        creep.travelTo(target);
      }
      else  {
        const range = 3;
        const containerInRange = creep.room.controller.pos.findInRange(creep.room.containers, range)[0];
        const linkInRange = creep.room.controller.pos.findInRange(creep.room.links, range)[0];
        const constructionSiteInRange = creep.room.controller.pos.findInRange(FIND_CONSTRUCTION_SITES, range)[0];


        if (containerInRange)
        flagMemory.controllerStructureId = containerInRange.id;
        else if (linkInRange)
        flagMemory.controllerStructureId = linkInRange.id;
        else if (constructionSiteInRange == null)
        enterValueInMemory(`controller.HasStructure`, false);
        else
        harvestModule.run(creep);
      }
    }

    function runWithdraw(targetId) {
      const target = Game.getObjectById(targetId);

      switch(creep.withdraw(target,RESOURCE_ENERGY)) {
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
        creep.memory.withdrawId = "";
        break;
        case ERR_INVALID_TARGET:
        break;
        case ERR_FULL:
        break;
        case ERR_NOT_IN_RANGE:
        creep.travelTo(target, {maxRooms: 1});
        creep.say("Moving");
        break;
        case ERR_INVALID_ARGS:
        break;
        default:
        break;
      }
    }

    function findWithdrawStructure() {
      const room = creep.room;
      let withdrawStructure = null;

      function checkStorage() {
        if (room.storage) {
          if (flagMemory.totalEnergyAvailable !== flagMemory.totalEnergyCapacity || creep.memory.role !== "transferer") {
            if (room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 500) {
              withdrawStructure = "storage";
              creep.memory.withdrawId = room.storage.id;
              return true;
            }
          }
        }
      }
      function checkTerminal() {
        if (room.terminal) {
          if (flagMemory.totalEnergyAvailable !== flagMemory.totalEnergyCapacity || creep.memory.role !== "transferer") {
            if (room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 500) {
              withdrawStructure = STRUCTURE_TERMINAL
              creep.memory.withdrawId = room.terminal.id;
              return true;
            }
          }
        }
      }
      function checkContainers() {
        if (room.containers) {
          let containerId;

          room.containers.forEach((container, i) => {
            if (container) {
              if (container.id !== flagMemory.controllerStructureId) {
                if (container.store.getUsedCapacity(RESOURCE_ENERGY) > 500) {
                  containerId = container.id;
                  withdrawStructure = "container";
                }
              }
            }
          });

          if (containerId) {
            creep.memory.withdrawId = containerId;
            return true;
          }
        }
      }
      function checkLinks() {
        if (room.links && !creep.memory.role.includes("transferer")) {
          let linkId;

          room.links.forEach((link, i) => {
            if (link) {
              if (link.id !== flagMemory.controllerStructureId) {
                if (link.store.getUsedCapacity(RESOURCE_ENERGY) > 500) {
                  withdrawStructure = "link";
                  linkId = link.id;
                }
              }
            }
          });

          if (linkId) {
            withdrawStructure = STRUCTURE_LINK;
            creep.memory.withdrawId = linkId;
            return true;
          }
        }
      }

      if (!checkStorage()) {
        if (!checkTerminal()) {
          if (!checkContainers()) {
            if (!checkLinks()) {
              if (!creep.memory.role.includes("transferer"))
              creep.memory.withdrawId = "source";
              else if (!creep.pos.inRangeTo(creep.room.controller,5) && creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0)
              creep.moveTo(creep.room.controller);
            }
          }
        }
      }


      if (withdrawStructure !== null)
      creep.say(withdrawStructure)

      return withdrawStructure;
    }

    function withdrawStructure() {
      if (creep.memory.role.includes("harvesterLD"))
      harvestModule.run(creep);
      else {
        if (creep.memory.withdrawId) {
          const target = Game.getObjectById(creep.memory.withdrawId);
          creep.say(true)

          if (creep.memory.withdrawId == "source") {
            harvestModule.run(creep);
            if (Game.time % 10 == 0)
            creep.memory.withdrawId = "";
          }
          else if (target == null)
          creep.memory.withdrawId = "";
          else
          runWithdraw(target.id);
        }
        else if (Game.time % 5 == 0)
        findWithdrawStructure();
      }
    }

    if (getMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      if (creep.memory.role !== "upgrader")
      withdrawStructure();
      else
      withdrawUpgraderSection();

      // Set the average CPU Usage in the memory //
      Memory.flags[creep.memory.spawnRoom].trackers.cpuModule.withdrawModule += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part //
      if (creep.memory.role !== "upgrader")
      withdrawStructure();
      else
      withdrawUpgraderSection();
    }
  }
};
