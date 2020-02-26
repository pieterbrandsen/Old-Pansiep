module.exports = {
    run: function(creep) {
        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity && creep.room.name === creep.memory.target) {
            creep.memory.working = true;
        }
        let target = creep.memory.target

        if (Game.rooms[creep.memory.target] !== undefined) {
            if (creep.memory.working === true) {
                if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.controller)
                }
            }
            else if (creep.memory.working === false) {
                if (_.size(creep.memory.link) == 0|| Game.time % 250 == 0) {
                    creep.memory.link = creep.pos.findClosestByRange(creep.room.links, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_LINK && structure.pos.inRangeTo(creep.room.controller, 5));
                        }
                    });
                }
                if (_.size(creep.memory.container) == 0|| Game.time % 250 == 0) {
                    creep.memory.container = creep.pos.findClosestByRange(creep.room.containers, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_CONTAINER && structure.pos.inRangeTo(creep.room.controller, 5));
                        }
                    });
                }
                
                if (creep.room.links.length > 2) {
                    let link = Game.getObjectById(creep.memory.link.id);

                    if (creep.withdraw(link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(link)
                    }
                }
                else if (creep.room.links.length <= 2 && creep.room.containers.length > 0) {
                    let container = Game.getObjectById(creep.memory.container.id);

                    if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(container)
                    }
                }
                else if (creep.room.links.length <= 2 && creep.room.containers.length == 0 && creep.room.terminal !== undefined) {
                    if (creep.withdraw(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }
                else if (creep.room.links.length < 2 && creep.room.containers.length == 0) {
                    let target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                    if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(target)
                    }
                }
                else {Game.notify("ERR: This room's Upgrader cant Withdraw (" + creep.room.name + ")!")}
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