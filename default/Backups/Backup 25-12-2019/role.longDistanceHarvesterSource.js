module.exports = {
    run: function(creep) {



        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity && creep.room.name === creep.memory.target) {
            creep.memory.working = true;
        }




        // if creep  to complete a constructionSite
        if (creep.memory.working === true) {
            if (creep.room.name === creep.memory.home) {
                /*if (creep.ticksToLive < 1400) {
                    if (Game.spawns['E43N3'].renewCreep(creep) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(Game.spawns['E43N3'])
                    }
                }*/

                if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                    }
                }
                else {
                let target = creep.pos.findClosestByPath(creep.room.findExitTo(creep.memory.home));
                creep.travelTo(target)
            }
        }
        else if (creep.memory.working === false) {
            if (creep.room.name === creep.memory.target) {
                let target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target)
                }
            }
            else {
                let target = creep.pos.findClosestByRange(creep.room.findExitTo(creep.memory.target));
                creep.travelTo(target)
            }
        }
    }
};