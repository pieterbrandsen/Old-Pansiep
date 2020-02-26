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
                    let target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                    if (creep.build(target) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(target)
                    }
                }
                else if (creep.memory.working === false) {
                    if ((creep.room.terminal !== undefined && creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 500) || (creep.room.storage !== undefined && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 500)) {
                        let max = Math.max(creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY), creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY))

                        if (creep.room.terminal !== undefined && creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) == max) {
                            if (creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.terminal)
                            }
                        }
                        else if (creep.room.storage !== undefined && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) == max) {
                            if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(creep.room.storage)
                            }
                        }
                    }
                    else if ((creep.room.terminal === undefined || creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < 500) || (creep.room.storage === undefined || creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) < 500)) {
                        let target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                        if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(target)
                        }
                        else {Game.notify("ERR: This room's BuilderLD cant Harvest (" + creep.room.name + ")!")}
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