const runMainSystem = require('miniModule.mainSystem');

const targetHitsDefense = 5*1000*1000;
const targetHitsNormal = 50*1000;
module.exports = {
  run: function(creep) {
    const getMainSystem = runMainSystem.run();
    const flagMemory = Memory.flags[creep.room.name];

    if (!creep.memory.targetId)
    creep.memory.targetId = "";
    if (!creep.memory.workCount)
    creep.memory.workCount = creep.getActiveBodyparts(WORK);




    function findNewTarget() {
      let findNewTarget;
      if (creep.memory.role == "repairer") {
        if (creep.room.towers.length > 0 && flagMemory.trackers.room.energyStored > 50 * 1000) {
          findNewTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.hits < targetHitsDefense
          });
        }
        else if (creep.room.ramparts.length > 0) {
          findNewTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.hits < targetHitsNormal && s.structureType == (STRUCTURE_RAMPART || STRUCTURE_WALL)
          });
        }
      }
      else {
        findNewTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (s) => s.hits < s.hitsMax && s.hits < 5000
        });
      }

      if (findNewTarget)
      creep.memory.targetId = findNewTarget.id;
      else
      creep.say("NoTarget")
    }


    function repairTarget() {
      const target = Game.getObjectById(creep.memory.targetId);
      const runRepair = creep.repair(target);

      switch(runRepair) {
        case OK:
        if (target.hits >= targetHitsDefense && creep.room.towers.length > 0 || target.hits >= targetHitsNormal && creep.room.towers.length == 0 || target.hits == target.hitsMax || (creep.memory.role == "builder" && target.hits >= 5000))
        creep.memory.targetId = "";

        creep.say(`${Math.round(creep.store.getUsedCapacity() / creep.store.getCapacity()) * 100}%`);
        Memory.flags[creep.memory.spawnRoom].trackers.performance.repairerEnergy += creep.memory.workCount;
        break;
        case ERR_NOT_OWNER:
        break;
        case ERR_BUSY:
        break;
        case ERR_NOT_ENOUGH_RESOURCES:
        break;
        case ERR_INVALID_TARGET:
        creep.memory.targetId = "";
        if (Game.time % 10 == 0)
        findNewTarget();
        break;
        case ERR_NOT_IN_RANGE:
        // Travel To Target //
        creep.moveTo(target);
        creep.say("Moving");
        break;
        case ERR_NO_BODYPART:
        break;
        default:
        break;
      }
    }

    function runModule() {
    }

    if (getMainSystem) {
      // Get the CPU Usage //
      let start = Game.cpu.getUsed();

      // Run the part //
      repairTarget();

      // Set the average CPU Usage in the memory //
      Memory.flags[creep.memory.spawnRoom].trackers.cpuModule.repairModule += Game.cpu.getUsed() - start;
    }
    else {
      // Run the part without tracking //
      repairTarget();
    }
  }
};
