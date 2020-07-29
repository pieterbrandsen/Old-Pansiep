const mainSystem = require('miniModule.mainSystem');

module.exports = {
  run: function(creep) {
    // Get the variables needed for module //
    const runMainSystem = mainSystem.run();
    const flagMemory = Memory.flags[creep.room.name];
    const target = Game.getObjectById(creep.memory.targetId);

    // If creep has no targetId assign a empty string //
    if (!creep.memory.targetId)
    creep.memory.targetId = "";


    function findNewTarget() {
      // Find new target to build //
      const newTarget = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES).id;

      // If NewTarget Isn't Undefined, Assign New Target //
      if (newTarget !== undefined)
      creep.memory.targetId = newTarget;
      // Else Update Memory And Suicide //
      else {
        // Reset ConstructionSitesAmount In Room Memory //
        Memory.flags[creep.room.name].constructionSitesAmount = 0;

        // If Creep's Role Is BuilderLD, Remove The TargetRoom BuildeLD Flag //
        if (creep.memory.role == "builderLD")
        if (Game.flags["builderLD"+creep.memory.spawnRoom])
        Game.flags["builderLD"+creep.memory.spawnRoom].remove();

        // If Creep's Role Is Builder, Suicide //
        // A Harvester That Builds Should Not Suicide //
        if (creep.memory.role.includes("builder"))
        creep.suicide();
      }
    }

    function buildTarget() {
      // Run Build Target //
      switch(creep.build(target)) {
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


    if (runMainSystem) {
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
