module.exports = {
  run: function(creep) {
    const flagMemory = Memory.flags[creep.room.name];
    // If creep has no targetId assign a empty string //
    if (!creep.memory.targetId)
    creep.memory.targetId = "";

    if (!creep.memory.builderWorkCount) {
      creep.memory.builderWorkCount = creep.getActiveBodyparts(WORK);
    }



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
              for (var i = 0; i < 5; i++) {
                if (creep.memory.role.includes(`${i}`))
                flagMemory.roomManager[`source-${i}.HasStructure`] = false;
              }
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

      flagMemory.trackers.cpuModule.builderModule += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      buildTarget();
    }
  }
};
