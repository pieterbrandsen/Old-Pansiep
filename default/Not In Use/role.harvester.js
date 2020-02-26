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

        if (creep.memory.working === false) {
            if (creep.memory.sourceId !== undefined) {
                let target = Game.getObjectById(creep.memory.sourceId);
                if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target)
                }
            }
            else {console.log("This creep has no source! - " + creep.room.name + " - " + creep.name)}
        }
        else if (creep.memory.working === true) {
            if (_.size(creep.memory.link) == 0 || Game.time % 250 == 0) {
                creep.memory.link = creep.pos.findClosestByRange(creep.room.links, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_LINK && structure.pos.inRangeTo(Game.getObjectById(creep.memory.sourceId), 5));
                    }
                });
            }
            if (_.size(creep.memory.container) == 0 || Game.time % 250 == 0) {
                creep.memory.container = creep.pos.findClosestByRange(creep.containers, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_CONTAINER && structure.pos.inRangeTo(Game.getObjectById(creep.memory.sourceId), 5));
                    }
                });
            }

            if (creep.room.links.length > 2 && _.size(creep.memory.link) > 0) {
                let link = Game.getObjectById(creep.memory.link.id);
                if (creep.transfer(link, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(link)
                }
            }
            else if (creep.room.links.length < 2 && creep.room.containers.length > 0 && _.size(creep.memory.container) > 0) {
                let container = Game.getObjectById(creep.memory.container.id);

                if (creep.transfer(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(container)
                }
            }
            else if (creep.room.links.length < 2 && creep.room.containers.length == 0 && creep.room.terminal !== undefined) {
                if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }
            else {Game.notify("ERR: This room's Harvester cant Transfer (" + creep.room.name + ")!")}
        }

        function needsCreeps(role, numbers) {
            let numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role === role && c.memory.room === creep.room.name);
            return numberOfCreeps < numbers
        }
        if (creep.memory.role == "harvesterSo1" && needsCreeps("harvester1",1) ==  false) {
            creep.suicide();
        }
        if (creep.memory.role == "harvesterSo2" && needsCreeps("harvester2",1) ==  false) {
            creep.suicide();
        }
    }
};