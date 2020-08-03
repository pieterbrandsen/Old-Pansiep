const mainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(creep) {
    // Get The Variables Needed For Module //
    const runMainSystem = mainSystem.run();
    const flagMemory = Memory.flags[creep.room.name];
    const target = Game.getObjectById(creep.memory.targetId);

    function repairTarget() {
      // If Creep Has No TargetId Assign A Empty String //
      if (!creep.memory.targetId)
      creep.memory.targetId = "";


      function findNewTarget() {
        // Find New Target To Repair //
        const newTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART
        }).id;

        // If NewTarget Isn't Undefined, Assign New Target //
        if (newTarget !== undefined)
        creep.memory.targetId = newTarget;
      }

      function buildTarget() {
        // Run Build Target //
        switch(creep.repair(target)) {
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
          // Find New Target //
          findNewTarget();
          break;
          case ERR_NOT_IN_RANGE:
          // Travel To Target Until In Range //
          creep.travelTo(Game.getObjectById(creep.memory.targetId));
          creep.say("Moving");
          break;
          case ERR_NO_BODYPART:
          default:
          break;
        }
      }
    }


    if (runMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      repairTarget();

      // Set the average CPU Usage in the memory //
      flagMemory.trackers.cpu.repairModule += Game.cpu.getUsed() - start;
    }
    else
    // Run the part without tracking //
    repairTarget();
  }
};
