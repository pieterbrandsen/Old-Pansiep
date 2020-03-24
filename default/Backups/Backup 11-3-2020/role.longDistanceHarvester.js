module.exports = {
    run: function(creep) {
        if (creep.memory.working === true && _.sum(creep.carry) === 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && _.sum(creep.carry) === creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (!creep.memory.link) {
            creep.memory.link = {}
        }
        if (!creep.memory.container) {
            creep.memory.container = {}
        }
        let target = creep.memory.target;
        let enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        
        if (Game.rooms[creep.memory.target] !== undefined) {
            if (creep.room.name === creep.memory.target) {
                if (creep.memory.working === false) {
                    if (creep.memory.sourceId !== undefined) {
                        let resource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                            filter: (resource) => {
                                return (resource.resourceType === RESOURCE_ENERGY && resource.pos.inRangeTo(Game.getObjectById(creep.memory.sourceId), 5));
                            }
                        });
                        let target = Game.getObjectById(creep.memory.sourceId);
                        if (resource == null) {
                            if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(target)
                            }
                        }
                        else {
                            if (creep.pickup(resource) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(resource)
                            }
                        }
                    }
                    else {console.log("This creep has no source! - " + creep.room.name + " - " + creep.name)
                    }
                }
                else if (creep.memory.working === true) {
                    if (_.size(creep.memory.container) == 0 || Game.time % 250 == 0) {
                        creep.memory.container = creep.pos.findClosestByRange(creep.room.containers, {
                            filter: (structure) => {
                                return (structure.structureType === STRUCTURE_CONTAINER && structure.pos.inRangeTo(Game.getObjectById(creep.memory.sourceId), 5));
                            }
                        });
                    }
                    let target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

                    if (_.size(creep.memory.container) > 0 && target == null) {
                        let container = Game.getObjectById(creep.memory.container.id);
                        if (creep.memory.container.hits < 200000) {
                            if (creep.repair(container) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(container)
                            }
                        }
                        if (creep.memory.container.hits > 200000) {
                            if (creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.travelTo(container)
                            }
                        }
                    }
                    else {     
                        if (creep.build(target) === ERR_NOT_IN_RANGE) {
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