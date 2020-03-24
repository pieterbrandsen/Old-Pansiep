module.exports = {
    run: function(creep) {
        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (!creep.memory.link) {
            creep.memory.link = {}
        }
        if (!creep.memory.container) {
            creep.memory.container = {}
        }
        //let target = creep.memory.target
        let target = "E42N2"
        if (creep.room.name == target) {
            if (creep.memory.working === true) {
              // Go upgrade controller
              if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.controller)
              }
            }
            else if (creep.memory.working === false) {
              let target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
              if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(target)
              }
            }
            else {
                if (Game.flags[target] !== undefined) {
                    creep.travelTo((Game.flags[target]))
                }
            }
        }
        else if (creep.room.name !== target) {
            if (Game.flags[target] !== undefined) {
                creep.travelTo((Game.flags[target]))
            }
            if (Game.flags[target] === undefined) {
                Game.notify("There is no flag in " + creep.memory.target + "!")
            }
        }
    }
};
