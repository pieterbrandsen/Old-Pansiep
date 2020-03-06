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
        let target = creep.memory.target
        
        if (Game.rooms[creep.memory.target] !== undefined) {
            if (creep.room.name === creep.memory.target) {
                if (creep.memory.working === true) {
                    let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => s.hits < s.hitsMax && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART
                    });
                    if (target !== undefined) {
                        if (creep.repair(target) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(target)
                        }
                    }
                    else {creep.memory.working = false}
                }
                else if (creep.memory.working === false) {
                    let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 1000);
                        }
                        });
                    if (container !== null) {
                        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(container)
                        }
                    }
                    else {
                        let target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                        if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(target)
                        }
                    }
                }
            }
            else if (creep.room.name !== creep.memory.target) {
                if (Game.flags[target] !== undefined) {
                    creep.travelTo((Game.flags[target]))
                }
                if (Game.flags[target] === undefined) {
                    Game.notify("There is no flag in " + creep.memory.target + "!")
                }
            }
        }
        else if (Game.rooms[creep.memory.target] == undefined) {
            if (Game.flags[target] !== undefined) {
                creep.travelTo((Game.flags[target]))
            }
            if (Game.flags[target] === undefined) {
                Game.notify("There is no flag in " + creep.memory.target + "!")
            }
        }
    }
};