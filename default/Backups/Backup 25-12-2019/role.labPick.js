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
        let lab2 = Game.getObjectById(creep.memory.lab2);
        let lab3 = Game.getObjectById(creep.memory.lab3);
        let lab4 = Game.getObjectById(creep.memory.lab4);
        let lab5 = Game.getObjectById(creep.memory.lab5);
        let lab6 = Game.getObjectById(creep.memory.lab6);


        let labb1 = lab1.mineralAmount;
        let labb2 = lab2.mineralAmount;
        let labb3 = lab3.mineralAmount;
        let labb4 = lab4.mineralAmount;
        let labb5 = lab5.mineralAmount;
        let labb6 = lab6.mineralAmount;


    if (creep.memory.working === false) {
        let lab1RE = lab1.mineralType;
        let lab2RE = lab2.mineralType;
        let lab3RE = lab3.mineralType;
        let lab4RE = lab4.mineralType;
        let lab5RE = lab5.mineralType;
        let lab6RE = lab6.mineralType;
        let lab6Pick = labb6 - labb5;



        if (labb3 > 0) {
            let lab2Pick = labb2 - labb3;
            if (creep.withdraw(lab2, lab2RE, 1) === ERR_NOT_IN_RANGE) {
                creep.travelTo(lab2)
            }
        }

        if (labb3 > 0) {
            let lab3Pick = labb3 - labb2;
            if (creep.withdraw(lab3, lab3RE, 1) === ERR_NOT_IN_RANGE) {
                creep.travelTo(lab3)
            }
        }


        if (labb5 > 0) {
            let lab5Pick = labb5 - labb6;
            if (creep.withdraw(lab5, lab5RE, 1) === ERR_NOT_IN_RANGE) {
                creep.travelTo(lab5)
            }
        }

        if (labb6 > 0) {
            let lab6Pick = labb6 - labb5;
            if (creep.withdraw(lab6, lab6RE, 1) === ERR_NOT_IN_RANGE) {
                creep.travelTo(lab6)
            }
        }


        if (lab1.mineralAmount > 0) {
            if (creep.withdraw(lab1, lab1RE) === ERR_NOT_IN_RANGE) {
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


        if (creep.transfer(creep.room.terminal, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_ZYNTHIUM_KEANITE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_UTRIUM_LEMERGITE) === ERR_NOT_IN_RANGE) {
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


        if (creep.transfer(creep.room.terminal, RESOURCE_UTRIUM_ACID) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_UTRIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_KEANIUM_ACID) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_KEANIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_LEMERGIUM_ACID) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_LEMERGIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_ZYNTHIUM_ACID) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_ZYNTHIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_GHODIUM_ACID) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_GHODIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}


        if (creep.transfer(creep.room.terminal, RESOURCE_CATALYZED_UTRIUM_ACID) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_CATALYZED_UTRIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_CATALYZED_KEANIUM_ACID) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_CATALYZED_KEANIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_CATALYZED_LEMERGIUM_ACID) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_CATALYZED_ZYNTHIUM_ACID) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_CATALYZED_GHODIUM_ACID) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}

        if (creep.transfer(creep.room.terminal, RESOURCE_CATALYZED_GHODIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}
    }




    }
};