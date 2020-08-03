const harvestModule = require('module.harvest');
const mainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(creep) {
    // Get The Variables Needed For Module //
    const runMainSystem = mainSystem.run();
    const room = Game.rooms[creep.room.name];
    const flagMemory = Memory.flags[creep.room.name];

    if (!creep.memory.withdrawId)
    creep.memory.withdrawId = "";

    function enterValueInMemory(memoryPath, inputValue) {
      flagMemory.roomManager[memoryPath] = inputValue;
    };

    function findWithdrawStructure() {
      let withdrawStructure = null;

      function checkStorage() {
        // Check If Storage Is Defined And Big Enough For Withdrawing //
        if (room.storage)
        if (flagMemory.totalEnergyAvailable !== flagMemory.totalEnergyCapacity || flagMemory.totalEnergyAvailable == 0)
        if (room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 500) {
          withdrawStructure = STRUCTURE_STORAGE;
          creep.memory.withdrawId = room.storage.id;
          return true;
        }
      }
      function checkTerminal() {
        // Check If Terminal Is Defined And Big Enough For Withdrawing //
        if (room.terminal)
        if (room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 500) {
          withdrawStructure = STRUCTURE_TERMINAL
          creep.memory.withdrawId = room.terminal.id;
          return true;
        }
      }
      function checkContainers() {
        // Find Container And Check If Big Enough For Withdraw //

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
        // Find Link And Check If Big Enough For Withdraw //

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


      // Check All Possible Storages //
      if (!checkStorage())
      if (!checkTerminal())
      if (!checkContainers())
      if (!checkLinks()) {
        if (creep.memory.role !== "transferer")
        creep.memory.withdrawId = "source";
      }

      // If Structure Is Found, Say Structure //
      if (withdrawStructure !== null)
      creep.say(withdrawStructure)

      // Return Structure //
      return withdrawStructure;
    }

    function findStructureInRange(objectId, range) {
      const object = Game.getObjectById(objectId);

      function findContainer() {
        // Loop Through Each Container And Look For The Container In Range //
        room.containers.forEach((structure, i) => {
          if (structure.pos.inRangeTo(object,range))
          return [true, structure.id];
        });
        return false;
      }

      function findLink() {
        // Loop Through Each Link And Look For The Link In Range //
        room.links.forEach((structure, i) => {
          if (structure.pos.inRangeTo(object,range))
          return [true, structure.id];
        });
        return false;
      }

      // Check If There Is Already A Structure Being Build //
      if (!findContainer())
      if (!findLink())
      return false;

      return true;
    }

    function withdrawUpgraderSection() {
      // Get Controller Storage //
      const target = Game.getObjectById(flagMemory.controllerStorage);

      // If Controller Storage Is Defined //
      if (target) {
        // Withdraw From Controller Storage //
        if(creep.withdraw(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        creep.travelTo(target);
      }
      else {
        // If Creep Is In Room With Controller //
        if (creep.room.controller) {
          // Find Structure //
          const range = 4;
          const findStructure = findStructureInRange(creep.room.controller.id, range);

          // If Strucutre Is Found //
          if (findStructure[0])
          // Set Id In ControllerStorage Memory //
          flagMemory.controllerStorage = findStructure[1];
          // Else Harvest Energy From Source //
          else
          harvestModule.run(creep);
        }
      }
    }

    function runWithdraw(target) {
      // Check If Creep Doesn't Keep On Withdrawing From Storage And Transfer Back ///
      if (target)
      if ((target.structureType == "storage" || target.structureType == "terminal") && flagMemory.totalEnergyCapacity == flagMemory.totalEnergyAvailable)
        return false;

      const runWithdraw = creep.withdraw(target,RESOURCE_ENERGY);
      switch(runWithdraw) {
        case OK:
        // Succesfol Withdraw //
        creep.say("Withdraw");

        // Set Last WithdrawStructure In Memory And Reset WithdrawId //
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
        break;
        case ERR_FULL:
        break;
        case ERR_NOT_IN_RANGE:
        // Travel To Target Until In Range //
        creep.travelTo(target);
        creep.say("Moving");
        break;
        case ERR_INVALID_ARGS:
        break;
        default:
        break;
      }
    }

    function withdrawStructure() {
      // If WithdrawId Is In Memory //
      if (creep.memory.withdrawId.length > 0) {
        // If WithdrawId Is Source, Go Harvest A Source //
        if (creep.memory.withdrawId == "source")
        harvestModule.run(creep);
        // Run Withdraw Structure //
        else
        runWithdraw(Game.getObjectById(creep.memory.withdrawId));
      }
      else
      // Go Get A new Structure //
      if (Game.time % 5 == 0)
      findWithdrawStructure();
    }


    if (creep.memory.role.includes("upgrader")) {
      if (mainSystem) {
        // Get the CPU Usage //
        let start = Game.cpu.getUsed();

        // Run the part //
        withdrawUpgraderSection();

        // Set the average CPU Usage in the memory //

        flagMemory.trackers.cpu.withdrawModule += Game.cpu.getUsed() - start;
      }
      else {
        // Run the part without tracking //
        withdrawUpgraderSection();
      }
    }
    else {
      if (runMainSystem) {
        // Get the CPU Usage //
        let start = Game.cpu.getUsed();
        // Run the part //
        withdrawStructure();

        // Set the average CPU Usage in the memory //

        flagMemory.trackers.cpu.withdrawModule += Game.cpu.getUsed() - start;
      }
      else {
        // Run the part without tracking //
        withdrawStructure();
      }
    }
  }
};
