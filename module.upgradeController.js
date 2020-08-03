const builderModule = require('module.builder');
const mainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(creep) {
    // Get The Variables Needed For Module //
    const runMainSystem = mainSystem.run();
    const room = Game.rooms[creep.room.name];
    const flagMemory = Memory.flags[creep.room.name];


    function upgradeController() {
      // Find Controller And Check If Building Doesn't Need To Be Done //
      if(creep.room.controller && flagMemory.constructionSitesAmount == 0) {
        switch(creep.upgradeController(creep.room.controller)) {
          case OK:
          // Say Remaining Energy Percentage Left //
          creep.say(`${Math.round(creep.store.getUsedCapacity() / creep.store.getCapacity() * 100)}%`);
            break;
          case ERR_NOT_OWNER:
            break;
          case ERR_BUSY:
            break;
          case ERR_NOT_ENOUGH_RESOURCES:
            break;
          case ERR_INVALID_TARGET:
            break;
          case ERR_NOT_IN_RANGE:
          // Travel To Target Until In Range //
            creep.travelTo(creep.room.controller);
            creep.say("Moving");
            break;
          case ERR_NO_BODYPART:
            break;
          default:
            break;
        }
      }
    }

    function findStructureInRange(objectId, range) {
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

    function runModule() {
      // If Room Has Storage //
      if (flagMemory.controllerStorage)
      // Upgrade controller //
      upgradeController();
      else {
        const range = 4;
        const findStructure = findStructureInRange(creep.room.controller.id, range);
        if (findStructure[0])
        flagMemory.controllerStorage = findStructure[1];
        else {
          const newTarget = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

          if (newTarget !== null)
          builderModule.run(creep);
          else
          upgradeController();
        }
      }
    }


    if (runMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      runModule();

      // Set the average CPU Usage in the memory //

      flagMemory.trackers.cpu.upgraderModule += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      runModule();
    }
  }
};
