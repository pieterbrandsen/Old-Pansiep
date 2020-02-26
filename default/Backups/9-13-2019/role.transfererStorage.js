module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        if (creep.ticksToLive < 50 && creep.carry.energy === 0) {
            creep.suicide()
        }
        else if (creep.ticksToLive < 50 && creep.carry.energy !== 0) {
            if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.terminal)}
        }
        else if (creep.memory.working === true && _.sum(creep.carry) === 0 && creep.ticksToLive > 50) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && _.sum(creep.carry) === creep.carryCapacity && creep.ticksToLive > 50) {
            creep.memory.working = true;
        }

        function needsResource(resource, amount) {
            room = creep.room.name;
            let numberOfResource = Game.rooms[room].terminal.store[resource];
            if (numberOfResource === undefined) {return 1}
            else {return numberOfResource < amount}}
        function haveResourceStorage(resource, amount) {
            room = creep.room.name;
            let numberOfResource = Game.rooms[room].storage.store[resource];
            if (numberOfResource === undefined) {return 1}
            else {return numberOfResource > amount}}

        let room = creep.room.name;

        if (creep.memory.working === true) {

            if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.terminal)}

            if (creep.transfer(creep.room.terminal, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.terminal)}

            if (creep.transfer(creep.room.terminal, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.terminal)}

            if (creep.transfer(creep.room.terminal, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.terminal)}

            if (creep.transfer(creep.room.terminal, RESOURCE_KEANIUM) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.terminal)}

            if (creep.transfer(creep.room.terminal, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.terminal)}

            if (creep.transfer(creep.room.terminal, RESOURCE_ZYNTHIUM) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.terminal)}

            if (creep.transfer(creep.room.terminal, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.terminal)}
        }
        else if (creep.memory.working === false) {
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_LINK);
                }
            });

            if (needsResource(RESOURCE_HYDROGEN, 5000) && haveResourceStorage(RESOURCE_HYDROGEN,1000) === true) {
                if (creep.transfer(creep.room.storage, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.storage)}
            }
            else if (needsResource(RESOURCE_OXYGEN, 5000) && haveResourceStorage(RESOURCE_OXYGEN,1000) === true) {
                if (creep.transfer(creep.room.storage, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.storage)}
            }
            else if (needsResource(RESOURCE_UTRIUM, 5000) && haveResourceStorage(RESOURCE_UTRIUM,1000) === true) {
                if (creep.transfer(creep.room.storage, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.storage)}
            }
            else if (needsResource(RESOURCE_KEANIUM, 5000) && haveResourceStorage(RESOURCE_KEANIUM,1000) === true) {
                if (creep.withdraw(creep.room.storage, RESOURCE_KEANIUM) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.storage)}
            }
            else if (needsResource(RESOURCE_LEMERGIUM, 5000) && haveResourceStorage(RESOURCE_LEMERGIUM,1000) === true) {
                if (creep.withdraw(creep.room.storage, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.storage)}
            }
            else if (needsResource(RESOURCE_ZYNTHIUM, 5000) && haveResourceStorage(RESOURCE_ZYNTHIUM,1000) === true) {
                if (creep.withdraw(creep.room.storage, RESOURCE_ZYNTHIUM) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.storage)}
            }
            else if (needsResource(RESOURCE_CATALYST, 5000) && haveResourceStorage(RESOURCE_CATALYST,1000) === true) {
                if (creep.withdraw(creep.room.storage, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.storage)}
            }

            else if (creep.room.terminal.store[RESOURCE_ENERGY] < 100000) {
                if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target)
                }
            }
        }
    }
};