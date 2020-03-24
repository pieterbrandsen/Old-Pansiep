module.exports = {
    run: function(creep) {
        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (!creep.memory.sourceId) {
            creep.memory.sourceId = ""
        }


        //let target = creep.memory.target
        let target = "E42N2"
        if (creep.room.name == target) {
            if (creep.memory.working === true) {
                let target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if (creep.build(target) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target)
                }
            }
            else if (creep.memory.working === false) {
              if (creep.memory.sourceId.length > 0) {
                let target = Game.getObjectById(creep.memory.sourceId);
                if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target)
                }
              }
              else if (creep.memory.sourceId.length == 0) {
                let target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target)
                }
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
