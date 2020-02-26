module.exports = {
    run: function(creep) {

    if (creep.ticksToLive < 150 && creep.memory.working === false) {
        creep.suicide()
    }
    else if (creep.memory.working === true && _.sum(creep.carry) === 0) {
        creep.memory.working = false;
    }
    // if creep is harvesting energy but is full
    else if (creep.memory.working === false && _.sum(creep.carry) === creep.carryCapacity) {
        creep.memory.working = true;
    }



    let lab1 = Game.getObjectById(creep.memory.lab1);
    let lab4 = Game.getObjectById(creep.memory.lab4);

    if (creep.memory.working === false) {
        let lab1RE = lab1.mineralType;
        let lab4RE = lab4.mineralType;
        if (lab1.mineralAmount > 0) {
            if (creep.withdraw(lab1, lab1RE) === ERR_NOT_IN_RANGE) {
                // move towards it
                creep.travelTo(lab1)
            }
        }
        else if (lab4.mineralAmount > 0) {
            if (creep.withdraw(lab4, lab4RE) === ERR_NOT_IN_RANGE) {
                // move towards it
                creep.travelTo(lab4)
            }
        }
    }

    else if (creep.memory.working === true) {
        if (creep.transfer(creep.room.terminal, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
            // move towards it
            creep.travelTo(creep.room.terminal)}
        if (creep.transfer(creep.room.terminal, RESOURCE_ZYNTHIUM_KEANITE) === ERR_NOT_IN_RANGE) {
            // move towards it
            creep.travelTo(creep.room.terminal)}
        if (creep.transfer(creep.room.terminal, RESOURCE_UTRIUM_LEMERGITE) === ERR_NOT_IN_RANGE) {
            // move towards it
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_GHODIUM) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_UTRIUM_HYDRIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_UTRIUM_OXIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_KEANIUM_HYDRIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_KEANIUM_OXIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_LEMERGIUM_HYDRIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_LEMERGIUM_OXIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_ZYNTHIUM_HYDRIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_ZYNTHIUM_OXIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_GHODIUM_HYDRIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_GHODIUM_OXIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}
    }




    }
};