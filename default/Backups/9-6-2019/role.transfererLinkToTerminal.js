module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if creep is bringing energy to the controller but has no energy left
        if (creep.memory.working === true && _.sum(creep.carry) === 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working === false && _.sum(creep.carry) === creep.carryCapacity) {
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
                    return (structure.structureType === STRUCTURE_LINK) && structure.pos.inRangeTo(structure.room.controller, 7);
                }
            });
            if (needsResource(RESOURCE_HYDROGEN, 10000) && haveResourceStorage(RESOURCE_CATALYST,1000)) {
                creep.withdraw(creep.room.storage,RESOURCE_HYDROGEN)
            }
            else if (needsResource(RESOURCE_OXYGEN, 10000) && haveResourceStorage(RESOURCE_CATALYST,1000)) {
                creep.withdraw(creep.room.storage,RESOURCE_OXYGEN)
            }
            else if (needsResource(RESOURCE_UTRIUM, 10000) && haveResourceStorage(RESOURCE_CATALYST,1000)) {
                creep.withdraw(creep.room.storage,RESOURCE_UTRIUM)
            }
            else if (needsResource(RESOURCE_KEANIUM, 10000) && haveResourceStorage(RESOURCE_CATALYST,1000)) {
                creep.withdraw(creep.room.storage,RESOURCE_KEANIUM)
            }
            else if (needsResource(RESOURCE_LEMERGIUM, 10000) && haveResourceStorage(RESOURCE_CATALYST,1000)) {
                creep.withdraw(creep.room.storage,RESOURCE_LEMERGIUM)
            }
            else if (needsResource(RESOURCE_ZYNTHIUM, 10000) && haveResourceStorage(RESOURCE_CATALYST,1000)) {
                creep.withdraw(creep.room.storage,RESOURCE_ZYNTHIUM)
            }
            else if (needsResource(RESOURCE_CATALYST, 10000) && haveResourceStorage(RESOURCE_CATALYST,1000)) {
                creep.withdraw(creep.room.storage,RESOURCE_CATALYST)
            }

            else if (creep.room.terminal.store[RESOURCE_ENERGY] < 100000) {
                if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(target)
                }
            }
        }
    }
};