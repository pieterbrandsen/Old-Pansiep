module.exports = {
    run: function (creep) {

        let lab1 = Game.getObjectById(creep.memory.lab1);
        let lab2 = Game.getObjectById(creep.memory.lab2);
        let lab3 = Game.getObjectById(creep.memory.lab3);
        let lab4 = Game.getObjectById(creep.memory.lab4);
        let lab5 = Game.getObjectById(creep.memory.lab5);
        let lab6 = Game.getObjectById(creep.memory.lab6);
        let lab7 = Game.getObjectById(creep.memory.lab7);
        let lab8 = Game.getObjectById(creep.memory.lab8);
        let lab9 = Game.getObjectById(creep.memory.lab9);

        let lab1MineralAmount = lab1.mineralAmount;
        let lab2MineralAmount = lab2.mineralAmount;
        let lab3MineralAmount = lab3.mineralAmount;
        let lab4MineralAmount = lab4.mineralAmount;
        let lab5MineralAmount = lab1.mineralAmount;
        let lab6MineralAmount = lab6.mineralAmount;
        let lab7MineralAmount = lab7.mineralAmount;
        let lab8MineralAmount = lab8.mineralAmount;
        let lab9MineralAmount = lab9.mineralAmount;

        lab3.runReaction(lab1, lab2);
        lab4.runReaction(lab1, lab2);
        lab5.runReaction(lab1, lab2);
        lab6.runReaction(lab1, lab2);
        lab7.runReaction(lab1, lab2);
        lab8.runReaction(lab1, lab2);
        lab9.runReaction(lab1, lab2);

        let labMin = Math.min(lab1MineralAmount,lab2MineralAmount,lab3MineralAmount,lab4MineralAmount,lab5MineralAmount,lab6MineralAmount,lab7MineralAmount,lab8MineralAmount,lab9MineralAmount);
        if (creep.ticksToLive < 50 && _.sum(creep.carry) === 0) {
            creep.suicide()
        }

        //LAB CODE
        let room;

        //MINERALS
        room = creep.room.name;
        let terminalENERGY = Game.rooms[room].terminal.store[RESOURCE_ENERGY];

        let terminalHYDROGEN = Game.rooms[room].terminal.store[RESOURCE_HYDROGEN];


        let terminalOXYGEN = Game.rooms[room].terminal.store[RESOURCE_OXYGEN];

        let terminalUTRIUM = Game.rooms[room].terminal.store[RESOURCE_UTRIUM];

        let terminalKEANIUM = Game.rooms[room].terminal.store[RESOURCE_KEANIUM];

        let terminalLEMERGIUM = Game.rooms[room].terminal.store[RESOURCE_LEMERGIUM];

        let terminalZYNTHIUM = Game.rooms[room].terminal.store[RESOURCE_ZYNTHIUM];

        let terminalCATALYST = Game.rooms[room].terminal.store[RESOURCE_CATALYST];

        //BASE COMPOUNDS

        let terminalHYDROXIDE = Game.rooms[room].terminal.store[RESOURCE_HYDROXIDE];

        let terminalZYNTHIUM_KEANITE = Game.rooms[room].terminal.store[RESOURCE_ZYNTHIUM_KEANITE];

        let terminalUTRIUM_LEMERGITE = Game.rooms[room].terminal.store[RESOURCE_UTRIUM_LEMERGITE];

        let terminalGHODIUM = Game.rooms[room].terminal.store[RESOURCE_GHODIUM];

        //TIER 1 COMPOUNDS

        let terminalUTRIUM_HYDRIDE = Game.rooms[room].terminal.store[RESOURCE_UTRIUM_HYDRIDE];


        let terminalUTRIUM_OXIDE = Game.rooms[room].terminal.store[RESOURCE_UTRIUM_OXIDE];


        let terminalKEANIUM_HYDRIDE = Game.rooms[room].terminal.store[RESOURCE_KEANIUM_HYDRIDE];


        let terminalKEANIUM_OXIDE = Game.rooms[room].terminal.store[RESOURCE_KEANIUM_OXIDE];


        let terminalLEMERGIUM_HYDRIDE = Game.rooms[room].terminal.store[RESOURCE_LEMERGIUM_HYDRIDE];


        let terminalLEMERGIUM_OXIDE = Game.rooms[room].terminal.store[RESOURCE_LEMERGIUM_OXIDE];


        let terminalZYNTHIUM_HYDRIDE = Game.rooms[room].terminal.store[RESOURCE_ZYNTHIUM_HYDRIDE];


        let terminalZYNTHIUM_OXIDE = Game.rooms[room].terminal.store[RESOURCE_ZYNTHIUM_OXIDE];


        let terminalGHODIUM_HYDRIDE = Game.rooms[room].terminal.store[RESOURCE_GHODIUM_HYDRIDE];


        let terminalGHODIUM_OXIDE = Game.rooms[room].terminal.store[RESOURCE_GHODIUM_OXIDE];


        //TIER 2 COMPOUNDS

        let terminalUTRIUM_ACID = Game.rooms[room].terminal.store[RESOURCE_UTRIUM_ACID];


        let terminalUTRIUM_ALKALIDE = Game.rooms[room].terminal.store[RESOURCE_UTRIUM_ALKALIDE];


        let terminalKEANIUM_ACID = Game.rooms[room].terminal.store[RESOURCE_KEANIUM_ACID];


        let terminalKEANIUM_ALKALIDE = Game.rooms[room].terminal.store[RESOURCE_KEANIUM_ALKALIDE];


        let terminalLEMERGIUM_ACID = Game.rooms[room].terminal.store[RESOURCE_LEMERGIUM_ACID];


        let terminalLEMERGIUM_ALKALIDE = Game.rooms[room].terminal.store[RESOURCE_LEMERGIUM_ALKALIDE];


        let terminalZYNTHIUM_ACID = Game.rooms[room].terminal.store[RESOURCE_ZYNTHIUM_ACID];


        let terminalZYNTHIUM_ALKALIDE = Game.rooms[room].terminal.store[RESOURCE_ZYNTHIUM_ALKALIDE];


        let terminalGHODIUM_ACID = Game.rooms[room].terminal.store[RESOURCE_GHODIUM_ACID];


        let terminalGHODIUM_ALKALIDE = Game.rooms[room].terminal.store[RESOURCE_GHODIUM_ALKALIDE];


        //TIER 3 COMPOUNDS

        let terminalCATALYZED_UTRIUM_ACID = Game.rooms[room].terminal.store[RESOURCE_CATALYZED_UTRIUM_ACID];


        let terminalCATALYZED_UTRIUM_ALKALIDE = Game.rooms[room].terminal.store[RESOURCE_CATALYZED_UTRIUM_ALKALIDE];


        let terminalCATALYZED_KEANIUM_ACID = Game.rooms[room].terminal.store[RESOURCE_CATALYZED_KEANIUM_ACID];


        let terminalCATALYZED_KEANIUM_ALKALIDE = Game.rooms[room].terminal.store[RESOURCE_CATALYZED_KEANIUM_ALKALIDE];


        let terminalCATALYZED_LEMERGIUM_ACID = Game.rooms[room].terminal.store[RESOURCE_CATALYZED_LEMERGIUM_ACID];


        let terminalCATALYZED_LEMERGIUM_ALKALIDE = Game.rooms[room].terminal.store[RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE];


        let terminalCATALYZED_ZYNTHIUM_ACID = Game.rooms[room].terminal.store[RESOURCE_CATALYZED_ZYNTHIUM_ACID];


        let terminalCATALYZED_ZYNTHIUM_ALKALIDE = Game.rooms[room].terminal.store[RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE];


        let terminalCATALYZED_GHODIUM_ACID = Game.rooms[room].terminal.store[RESOURCE_CATALYZED_GHODIUM_ACID];


        let terminalCATALYZED_GHODIUM_ALKALIDE = Game.rooms[room].terminal.store[RESOURCE_CATALYZED_GHODIUM_ALKALIDE];
        function needsResource(resource, amount) {
            room = creep.room.name;
            let numberOfResource = Game.rooms[room].terminal.store[resource];
            if (numberOfResource === undefined) {return 1}
            else {return numberOfResource < amount}}

        function labNeedsResource1(resource) {
            return lab1MineralAmount < 250
        }
        function labNeedsResource2(resource) {
            return lab2MineralAmount < 250
        }
        let resource;
        let resource2;
        let resource3;

        let base = 999;
        let flagNeededBase = 4999;

        let tier1 = 999;
        let flagNeededTier1 = 2499;

        let tier2 = 999;
        let flagNeededTier2 = 2499;

        let tier3 = 4999;
        let flagNeededTier3 = 9999;

        let x;

        if (Game.flags.HYDROXIDE !== undefined && Game.flags.HYDROXIDE.room === creep.room || needsResource(RESOURCE_HYDROXIDE, base)) {

            resource = RESOURCE_HYDROGEN;
            resource2 = RESOURCE_OXYGEN;
            resource3 = RESOURCE_HYDROXIDE;

            if (needsResource(resource3, flagNeededBase) && Game.flags.HYDROXIDE === undefined) {creep.room.createFlag(10,10, 'HYDROXIDE')}
            if (terminalHYDROXIDE > flagNeededBase && Game.flags.HYDROXIDE !== undefined && Game.flags.HYDROXIDE.room === creep.room) {Game.flags.HYDROXIDE.remove()}
            if (needsResource(resource3, flagNeededBase) && Game.flags.HYDROXIDE !== undefined && Game.flags.HYDROXIDE.room === creep.room) {

            //WRONG CREEP

            if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            //WRONG LAB

            else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab1)
                }
            }

            else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab2)
                }
            }

            else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab3)
                }
            }

            else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab4)
                }
            }

            else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab5)
                }
            }

            else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab6)
                }
            }

            else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab7)
                }
            }

            else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab8)
                }
            }

            else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab9)
                }
            }

            //REACTION LABS

            else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab3)
                }
            }

            else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab4)
                }
            }

            else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab5)
                }
            }

            else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab6)
                }
            }

            else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab7)
                }
            }

            else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab8)
                }
            }

            else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab9)
                }
            }

            //EMPTY

            else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }

            else if (creep.carry[resource] === creep.carryCapacity) {
                if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab1)
                }
            }

            else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }

            else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab2)
                }
            }

            //FILLING

            else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }
            }

            else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.ZYNTHIUM_KEANITE !== undefined && Game.flags.ZYNTHIUM_KEANITE.room === creep.room || needsResource(RESOURCE_ZYNTHIUM_KEANITE, base)) {

            resource = RESOURCE_ZYNTHIUM;
            resource2 = RESOURCE_KEANIUM;
            resource3 = RESOURCE_ZYNTHIUM_KEANITE;

            if (needsResource(resource3, flagNeededBase) && Game.flags.ZYNTHIUM_KEANITE === undefined) {creep.room.createFlag(10,10, 'ZYNTHIUM_KEANITE')}
            if (terminalZYNTHIUM_KEANITE > flagNeededBase && Game.flags.ZYNTHIUM_KEANITE !== undefined && Game.flags.ZYNTHIUM_KEANITE.room === creep.room) {Game.flags.ZYNTHIUM_KEANITE.remove()}
            if (needsResource(resource3, flagNeededBase) && Game.flags.ZYNTHIUM_KEANITE !== undefined && Game.flags.ZYNTHIUM_KEANITE.room === creep.room) {

            //WRONG CREEP

            if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            //WRONG LAB

            else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab1)
                }
            }

            else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab2)
                }
            }

            else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab3)
                }
            }

            else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab4)
                }
            }

            else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab5)
                }
            }

            else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab6)
                }
            }

            else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab7)
                }
            }

            else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab8)
                }
            }

            else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab9)
                }
            }

            //REACTION LABS

            else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab3)
                }
            }

            else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab4)
                }
            }

            else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab5)
                }
            }

            else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab6)
                }
            }

            else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab7)
                }
            }

            else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab8)
                }
            }

            else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab9)
                }
            }

            //EMPTY

            else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }

            else if (creep.carry[resource] === creep.carryCapacity) {
                if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab1)
                }
            }

            else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }

            else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab2)
                }
            }

            //FILLING

            else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }
            }

            else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.UTRIUM_LEMERGITE !== undefined && Game.flags.UTRIUM_LEMERGITE.room === creep.room || needsResource(RESOURCE_UTRIUM_LEMERGITE, base)) {

            resource = RESOURCE_UTRIUM;
            resource2 = RESOURCE_LEMERGIUM;
            resource3 = RESOURCE_UTRIUM_LEMERGITE;

            if (needsResource(resource3, flagNeededBase) && Game.flags.UTRIUM_LEMERGITE === undefined) {creep.room.createFlag(10,10, 'UTRIUM_LEMERGITE')}
            if (terminalUTRIUM_LEMERGITE > flagNeededBase && Game.flags.UTRIUM_LEMERGITE !== undefined && Game.flags.UTRIUM_LEMERGITE.room === creep.room) {Game.flags.UTRIUM_LEMERGITE.remove()}
            if (needsResource(resource3, flagNeededBase) && Game.flags.UTRIUM_LEMERGITE !== undefined && Game.flags.UTRIUM_LEMERGITE.room === creep.room) {

            //WRONG CREEP

            if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            //WRONG LAB

            else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab1)
                }
            }

            else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab2)
                }
            }

            else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab3)
                }
            }

            else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab4)
                }
            }

            else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab5)
                }
            }

            else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab6)
                }
            }

            else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab7)
                }
            }

            else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab8)
                }
            }

            else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab9)
                }
            }

            //REACTION LABS

            else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab3)
                }
            }

            else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab4)
                }
            }

            else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab5)
                }
            }

            else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab6)
                }
            }

            else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab7)
                }
            }

            else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab8)
                }
            }

            else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab9)
                }
            }

            //EMPTY

            else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }

            else if (creep.carry[resource] === creep.carryCapacity) {
                if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab1)
                }
            }

            else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }

            else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab2)
                }
            }

            //FILLING

            else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                    }
                }

                if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }
            }

            else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.GHODIUM !== undefined && Game.flags.GHODIUM.room === creep.room || needsResource(RESOURCE_GHODIUM, base)) {

            resource = RESOURCE_ZYNTHIUM_KEANITE;
            resource2 = RESOURCE_UTRIUM_LEMERGITE;
            resource3 = RESOURCE_GHODIUM;

            if (needsResource(resource3, flagNeededBase) && Game.flags.GHODIUM === undefined) {creep.room.createFlag(10,10, 'GHODIUM')}
            if (terminalGHODIUM > flagNeededBase && Game.flags.GHODIUM !== undefined && Game.flags.GHODIUM.room === creep.room) {Game.flags.GHODIUM.remove()}
            if (needsResource(resource3, flagNeededBase) && Game.flags.GHODIUM !== undefined && Game.flags.GHODIUM.room === creep.room) {

            //WRONG CREEP

            if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                for (x of RESOURCES_ALL) {
                    if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                    if (creep.transfer(creep.room.terminal, x) === 0) {break}
                }
            }

            //WRONG LAB

            else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab1)
                }
            }

            else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab2)
                }
            }

            else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab3)
                }
            }

            else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab4)
                }
            }

            else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab5)
                }
            }

            else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab6)
                }
            }

            else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab7)
                }
            }

            else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab8)
                }
            }

            else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab9)
                }
            }

            //REACTION LABS

            else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab3)
                }
            }

            else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab4)
                }
            }

            else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab5)
                }
            }

            else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab6)
                }
            }

            else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab7)
                }
            }

            else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab8)
                }
            }

            else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab9)
                }
            }

            //EMPTY

            else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }

            else if (creep.carry[resource] === creep.carryCapacity) {
                if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab1)
                }
            }

            else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }

            else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab2)
                }
            }

            //FILLING

            else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }
            }

            else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                        }
                    }
                }
            }
        }



        else if (Game.flags.UTRIUM_HYDRIDE !== undefined && Game.flags.UTRIUM_HYDRIDE.room === creep.room || needsResource(RESOURCE_UTRIUM_HYDRIDE, tier1)) {

            resource = RESOURCE_UTRIUM;
            resource2 = RESOURCE_HYDROGEN;
            resource3 = RESOURCE_UTRIUM_HYDRIDE;

            if (needsResource(resource3, flagNeededTier1) && Game.flags.UTRIUM_HYDRIDE === undefined) {creep.room.createFlag(10,10, 'UTRIUM_HYDRIDE')}
            if (terminalUTRIUM_HYDRIDE > flagNeededTier1 && Game.flags.UTRIUM_HYDRIDE !== undefined && Game.flags.UTRIUM_HYDRIDE.room === creep.room) {Game.flags.UTRIUM_HYDRIDE.remove()}
            if (needsResource(resource3, flagNeededTier1) && Game.flags.UTRIUM_HYDRIDE !== undefined && Game.flags.UTRIUM_HYDRIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null) {
                if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity && lab1.mineralType === null) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.UTRIUM_OXIDE !== undefined && Game.flags.UTRIUM_OXIDE.room === creep.room || needsResource(RESOURCE_UTRIUM_OXIDE, tier1)) {

            resource = RESOURCE_UTRIUM;
            resource2 = RESOURCE_OXYGEN;
            resource3 = RESOURCE_UTRIUM_OXIDE;

            if (needsResource(resource3, flagNeededTier1) && Game.flags.UTRIUM_OXIDE === undefined) {creep.room.createFlag(10,10, 'UTRIUM_OXIDE')}
            if (terminalUTRIUM_OXIDE > flagNeededTier1 && Game.flags.UTRIUM_OXIDE !== undefined && Game.flags.UTRIUM_OXIDE.room === creep.room) {Game.flags.UTRIUM_OXIDE.remove()}
            if (needsResource(resource3, flagNeededTier1) && Game.flags.UTRIUM_OXIDE !== undefined && Game.flags.UTRIUM_OXIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.KEANIUM_HYDRIDE !== undefined && Game.flags.KEANIUM_HYDRIDE.room === creep.room || needsResource(RESOURCE_KEANIUM_HYDRIDE, tier1)) {

            resource = RESOURCE_KEANIUM;
            resource2 = RESOURCE_HYDROGEN;
            resource3 = RESOURCE_KEANIUM_HYDRIDE;

            if (needsResource(resource3, flagNeededTier1) && Game.flags.KEANIUM_HYDRIDE === undefined) {creep.room.createFlag(10,10, 'KEANIUM_HYDRIDE')}
            if (terminalKEANIUM_HYDRIDE > flagNeededTier1 && Game.flags.KEANIUM_HYDRIDE !== undefined && Game.flags.KEANIUM_HYDRIDE.room === creep.room) {Game.flags.KEANIUM_HYDRID.remove()}
            if (needsResource(resource3, flagNeededTier1) && Game.flags.KEANIUM_HYDRIDE !== undefined && Game.flags.KEANIUM_HYDRIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.KEANIUM_OXIDE !== undefined && Game.flags.KEANIUM_OXIDE.room === creep.room || needsResource(RESOURCE_KEANIUM_OXIDE, tier1)) {

            resource = RESOURCE_KEANIUM;
            resource2 = RESOURCE_OXYGEN;
            resource3 = RESOURCE_KEANIUM_OXIDE;

            if (needsResource(resource3, flagNeededTier1) && Game.flags.KEANIUM_OXIDE === undefined) {creep.room.createFlag(10,10, 'KEANIUM_OXIDE')}
            if (terminalKEANIUM_OXIDE > flagNeededTier1 && Game.flags.KEANIUM_OXIDE !== undefined && Game.flags.KEANIUM_OXIDE.room === creep.room) {Game.flags.KEANIUM_OXIDE.remove()}
            if (needsResource(resource3, flagNeededTier1) && Game.flags.KEANIUM_OXIDE !== undefined && Game.flags.KEANIUM_OXIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.LEMERGIUM_HYDRIDE !== undefined && Game.flags.LEMERGIUM_HYDRIDE.room === creep.room || needsResource(RESOURCE_LEMERGIUM_HYDRIDE, tier1)) {

            resource = RESOURCE_LEMERGIUM;
            resource2 = RESOURCE_HYDROGEN;
            resource3 = RESOURCE_LEMERGIUM_HYDRIDE;

            if (needsResource(resource3, flagNeededTier1) && Game.flags.LEMERGIUM_HYDRIDE === undefined) {creep.room.createFlag(10,10, 'LEMERGIUM_HYDRIDE')}
            if (terminalLEMERGIUM_HYDRIDE > flagNeededTier1 && Game.flags.LEMERGIUM_HYDRIDE !== undefined && Game.flags.LEMERGIUM_HYDRIDE.room === creep.room) {Game.flags.LEMERGIUM_HYDRIDE.remove()}
            if (needsResource(resource3, flagNeededTier1) && Game.flags.LEMERGIUM_HYDRIDE !== undefined && Game.flags.LEMERGIUM_HYDRIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.LEMERGIUM_OXIDE !== undefined && Game.flags.LEMERGIUM_OXIDE.room === creep.room || needsResource(RESOURCE_LEMERGIUM_OXIDE, tier1)) {

            resource = RESOURCE_LEMERGIUM;
            resource2 = RESOURCE_OXYGEN;
            resource3 = RESOURCE_LEMERGIUM_OXIDE;

            if (needsResource(resource3, flagNeededTier1) && Game.flags.LEMERGIUM_OXIDE === undefined) {creep.room.createFlag(10,10, 'LEMERGIUM_OXIDE')}
            if (terminalLEMERGIUM_OXIDE > flagNeededTier1 && Game.flags.LEMERGIUM_OXIDE !== undefined && Game.flags.LEMERGIUM_OXIDE.room === creep.room) {Game.flags.LEMERGIUM_OXIDE.remove()}
            if (needsResource(resource3, flagNeededTier1) && Game.flags.LEMERGIUM_OXIDE !== undefined && Game.flags.LEMERGIUM_OXIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.ZYNTHIUM_HYDRIDE !== undefined && Game.flags.ZYNTHIUM_HYDRIDE.room === creep.room || needsResource(RESOURCE_ZYNTHIUM_HYDRIDE, tier1)) {

            resource = RESOURCE_ZYNTHIUM;
            resource2 = RESOURCE_HYDROGEN;
            resource3 = RESOURCE_ZYNTHIUM_HYDRIDE;

            if (needsResource(resource3, flagNeededTier1) && Game.flags.ZYNTHIUM_HYDRIDE === undefined) {creep.room.createFlag(10,10, 'ZYNTHIUM_HYDRIDE')}
            if (terminalZYNTHIUM_HYDRIDE > flagNeededTier1 && Game.flags.ZYNTHIUM_HYDRIDE !== undefined && Game.flags.ZYNTHIUM_HYDRIDE.room === creep.room) {Game.flags.ZYNTHIUM_HYDRIDE.remove()}
            if (needsResource(resource3, flagNeededTier1) && Game.flags.ZYNTHIUM_HYDRIDE !== undefined && Game.flags.ZYNTHIUM_HYDRIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.ZYNTHIUM_OXIDE !== undefined && Game.flags.ZYNTHIUM_OXIDE.room === creep.room || needsResource(RESOURCE_ZYNTHIUM_OXIDE, tier1)) {

            resource = RESOURCE_ZYNTHIUM;
            resource2 = RESOURCE_OXYGEN;
            resource3 = RESOURCE_ZYNTHIUM_OXIDE;

            if (needsResource(resource3, flagNeededTier1) && Game.flags.ZYNTHIUM_OXIDE === undefined) {creep.room.createFlag(10,10, 'ZYNTHIUM_OXIDE')}
            if (terminalZYNTHIUM_OXIDE > flagNeededTier1 && Game.flags.ZYNTHIUM_OXIDE !== undefined && Game.flags.ZYNTHIUM_OXIDE.room === creep.room) {Game.flags.ZYNTHIUM_OXIDE.remove()}
            if (needsResource(resource3, flagNeededTier1) && Game.flags.ZYNTHIUM_OXIDE !== undefined && Game.flags.ZYNTHIUM_OXIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.GHODIUM_HYDRIDE !== undefined && Game.flags.GHODIUM_HYDRIDE.room === creep.room || needsResource(RESOURCE_GHODIUM_HYDRIDE, tier1)) {

            resource = RESOURCE_GHODIUM;
            resource2 = RESOURCE_HYDROGEN;
            resource3 = RESOURCE_GHODIUM_HYDRIDE;

            if (needsResource(resource3, flagNeededTier1) && Game.flags.GHODIUM_HYDRIDE === undefined) {creep.room.createFlag(10,10, 'GHODIUM_HYDRIDE')}
            if (terminalGHODIUM_HYDRIDE > flagNeededTier1 && Game.flags.GHODIUM_HYDRIDE !== undefined && Game.flags.GHODIUM_HYDRIDE.room === creep.room) {Game.flags.GHODIUM_HYDRIDE.remove()}
            if (needsResource(resource3, flagNeededTier1) && Game.flags.GHODIUM_HYDRIDE !== undefined && Game.flags.GHODIUM_HYDRIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.GHODIUM_OXIDE !== undefined && Game.flags.GHODIUM_OXIDE.room === creep.room || needsResource(RESOURCE_GHODIUM_OXIDE, tier1)) {

            resource = RESOURCE_GHODIUM;
            resource2 = RESOURCE_OXYGEN;
            resource3 = RESOURCE_GHODIUM_OXIDE;

            if (needsResource(resource3, flagNeededTier1) && Game.flags.GHODIUM_OXIDE === undefined) {creep.room.createFlag(10,10, 'GHODIUM_OXIDE')}
            if (terminalGHODIUM_OXIDE > flagNeededTier1 && Game.flags.GHODIUM_OXIDE !== undefined && Game.flags.GHODIUM_OXIDE.room === creep.room) {Game.flags.GHODIUM_OXIDE.remove()}
            if (needsResource(resource3, flagNeededTier1) && Game.flags.GHODIUM_OXIDE !== undefined && Game.flags.GHODIUM_OXIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(creep.room.terminal)
                }
            }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }



        else if (Game.flags.UTRIUM_ACID !== undefined && Game.flags.UTRIUM_ACID.room === creep.room || needsResource(RESOURCE_UTRIUM_ACID, tier2)) {

            resource = RESOURCE_UTRIUM_HYDRIDE;
            resource2 = RESOURCE_HYDROXIDE;
            resource3 = RESOURCE_UTRIUM_ACID;

            if (needsResource(resource3, flagNeededTier2) && Game.flags.UTRIUM_ACID === undefined) {creep.room.createFlag(10,10, 'UTRIUM_ACID')}
            if (terminalUTRIUM_ACID > flagNeededTier2 && Game.flags.UTRIUM_ACID !== undefined && Game.flags.UTRIUM_ACID.room === creep.room) {Game.flags.UTRIUM_ACID.remove()}
            if (needsResource(resource3, flagNeededTier2) && Game.flags.UTRIUM_ACID !== undefined && Game.flags.UTRIUM_ACID.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.UTRIUM_ALKALIDE !== undefined && Game.flags.UTRIUM_ALKALIDE.room === creep.room || needsResource(RESOURCE_UTRIUM_ALKALIDE, tier2)) {

            resource = RESOURCE_UTRIUM_OXIDE;
            resource2 = RESOURCE_HYDROXIDE;
            resource3 = RESOURCE_UTRIUM_ALKALIDE;

            if (needsResource(resource3, flagNeededTier2) && Game.flags.UTRIUM_ALKALIDE === undefined) {creep.room.createFlag(10,10, 'UTRIUM_ALKALIDE')}
            if (terminalUTRIUM_ALKALIDE > flagNeededTier2 && Game.flags.UTRIUM_ALKALIDE !== undefined && Game.flags.UTRIUM_ALKALIDE.room === creep.room) {Game.flags.UTRIUM_ALKALIDE.remove()}
            if (needsResource(resource3, flagNeededTier2) && Game.flags.UTRIUM_ALKALIDE !== undefined && Game.flags.UTRIUM_ALKALIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.KEANIUM_ACID !== undefined && Game.flags.KEANIUM_ACID.room === creep.room || needsResource(RESOURCE_KEANIUM_ACID, tier2)) {

            resource = RESOURCE_KEANIUM_HYDRIDE;
            resource2 = RESOURCE_HYDROXIDE;
            resource3 = RESOURCE_KEANIUM_ACID;

            if (needsResource(resource3, flagNeededTier2) && Game.flags.KEANIUM_ACID === undefined) {creep.room.createFlag(10,10, 'KEANIUM_ACID')}
            if (terminalKEANIUM_ACID > flagNeededTier2 && Game.flags.KEANIUM_ACID !== undefined && Game.flags.KEANIUM_ACID.room === creep.room) {Game.flags.KEANIUM_ACID.remove()}
            if (needsResource(resource3, flagNeededTier2) && Game.flags.KEANIUM_ACID !== undefined && Game.flags.KEANIUM_ACID.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.KEANIUM_ALKALIDE !== undefined && Game.flags.KEANIUM_ALKALIDE.room === creep.room || needsResource(RESOURCE_KEANIUM_ALKALIDE, tier2)) {

            resource = RESOURCE_KEANIUM_OXIDE;
            resource2 = RESOURCE_HYDROXIDE;
            resource3 = RESOURCE_KEANIUM_ALKALIDE;

            if (needsResource(resource3, flagNeededTier2) && Game.flags.KEANIUM_ALKALIDE === undefined) {creep.room.createFlag(10,10, 'KEANIUM_ALKALIDE')}
            if (terminalKEANIUM_OXIDE > flagNeededTier2 && Game.flags.KEANIUM_ALKALIDE !== undefined && Game.flags.KEANIUM_ALKALIDE.room === creep.room) {Game.flags.KEANIUM_ALKALIDE.remove()}
            if (needsResource(resource3, flagNeededTier2) && Game.flags.KEANIUM_ALKALIDE !== undefined && Game.flags.KEANIUM_ALKALIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.LEMERGIUM_ACID !== undefined && Game.flags.LEMERGIUM_ACID.room === creep.room || needsResource(RESOURCE_LEMERGIUM_ACID, tier2)) {

            resource = RESOURCE_LEMERGIUM_HYDRIDE;
            resource2 = RESOURCE_HYDROXIDE;
            resource3 = RESOURCE_LEMERGIUM_ACID;

            if (needsResource(resource3, flagNeededTier2) && Game.flags.LEMERGIUM_ACID === undefined) {creep.room.createFlag(10,10, 'LEMERGIUM_ACID')}
            if (terminalLEMERGIUM_ACID > flagNeededTier2 && Game.flags.LEMERGIUM_ACID !== undefined && Game.flags.LEMERGIUM_ACID.room === creep.room) {Game.flags.LEMERGIUM_ACID.remove()}
            if (needsResource(resource3, flagNeededTier2) && Game.flags.LEMERGIUM_ACID !== undefined && Game.flags.LEMERGIUM_ACID.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.LEMERGIUM_ALKALIDE !== undefined && Game.flags.LEMERGIUM_ALKALIDE.room === creep.room || needsResource(RESOURCE_LEMERGIUM_ALKALIDE, tier2)) {

            resource = RESOURCE_LEMERGIUM_OXIDE;
            resource2 = RESOURCE_HYDROXIDE;
            resource3 = RESOURCE_LEMERGIUM_ALKALIDE;

            if (needsResource(resource3, flagNeededTier2) && Game.flags.LEMERGIUM_ALKALIDE === undefined) {creep.room.createFlag(10,10, 'LEMERGIUM_ALKALIDE')}
            if (terminalLEMERGIUM_ALKALIDE > flagNeededTier2 && Game.flags.LEMERGIUM_ALKALIDE !== undefined && Game.flags.LEMERGIUM_ALKALIDE.room === creep.room) {Game.flags.LEMERGIUM_ALKALIDE.remove()}
            if (needsResource(resource3, flagNeededTier2) && Game.flags.LEMERGIUM_ALKALIDE !== undefined && Game.flags.LEMERGIUM_ALKALIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.ZYNTHIUM_ACID !== undefined && Game.flags.ZYNTHIUM_ACID.room === creep.room || needsResource(RESOURCE_ZYNTHIUM_ACID, tier2)) {

            resource = RESOURCE_ZYNTHIUM_HYDRIDE;
            resource2 = RESOURCE_HYDROXIDE;
            resource3 = RESOURCE_ZYNTHIUM_ACID;

            if (needsResource(resource3, flagNeededTier2) && Game.flags.ZYNTHIUM_ACID === undefined) {creep.room.createFlag(10,10, 'ZYNTHIUM_ACID')}
            if (terminalZYNTHIUM_ACID > flagNeededTier2 && Game.flags.ZYNTHIUM_ACID !== undefined && Game.flags.ZYNTHIUM_ACID.room === creep.room) {Game.flags.ZYNTHIUM_ACID.remove()}
            if (needsResource(resource3, flagNeededTier2) && Game.flags.ZYNTHIUM_ACID !== undefined && Game.flags.ZYNTHIUM_ACID.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.ZYNTHIUM_ALKALIDE !== undefined && Game.flags.ZYNTHIUM_ALKALIDE.room === creep.room || needsResource(RESOURCE_ZYNTHIUM_ALKALIDE, tier2)) {

            resource = RESOURCE_ZYNTHIUM_OXIDE;
            resource2 = RESOURCE_HYDROXIDE;
            resource3 = RESOURCE_ZYNTHIUM_ALKALIDE;

            if (needsResource(resource3, flagNeededTier2) && Game.flags.ZYNTHIUM_ALKALIDE === undefined) {creep.room.createFlag(10,10, 'ZYNTHIUM_ALKALIDE')}
            if (terminalZYNTHIUM_ALKALIDE > flagNeededTier2 && Game.flags.ZYNTHIUM_ALKALIDE !== undefined && Game.flags.ZYNTHIUM_ALKALIDE.room === creep.room) {Game.flags.ZYNTHIUM_ALKALIDE.remove()}
            if (needsResource(resource3, flagNeededTier2) && Game.flags.ZYNTHIUM_ALKALIDE !== undefined && Game.flags.ZYNTHIUM_ALKALIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.GHODIUM_ACID !== undefined && Game.flags.GHODIUM_ACID.room === creep.room || needsResource(RESOURCE_GHODIUM_ACID, tier2)) {

            resource = RESOURCE_GHODIUM_HYDRIDE;
            resource2 = RESOURCE_HYDROXIDE;
            resource3 = RESOURCE_GHODIUM_ACID;

            if (needsResource(resource3, flagNeededTier2) && Game.flags.GHODIUM_ACID === undefined) {creep.room.createFlag(10,10, 'GHODIUM_ACID')}
            if (terminalGHODIUM_ACID > flagNeededTier2 && Game.flags.GHODIUM_ACID !== undefined && Game.flags.GHODIUM_ACID.room === creep.room) {Game.flags.GHODIUM_ACID.remove()}
            if (needsResource(resource3, flagNeededTier2) && Game.flags.GHODIUM_ACID !== undefined && Game.flags.GHODIUM_ACID.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.GHODIUM_ALKALIDE !== undefined && Game.flags.GHODIUM_ALKALIDE.room === creep.room || needsResource(RESOURCE_GHODIUM_ALKALIDE, tier2)) {

            resource = RESOURCE_GHODIUM_OXIDE;
            resource2 = RESOURCE_HYDROXIDE;
            resource3 = RESOURCE_GHODIUM_ALKALIDE;

            if (needsResource(resource3, flagNeededTier2) && Game.flags.GHODIUM_ALKALIDE === undefined) {creep.room.createFlag(10,10, 'GHODIUM_ALKALIDE')}
            if (terminalGHODIUM_ALKALIDE > flagNeededTier2 && Game.flags.GHODIUM_ALKALIDE !== undefined && Game.flags.GHODIUM_ALKALIDE.room === creep.room) {Game.flags.GHODIUM_ALKALIDE.remove()}
            if (needsResource(resource3, flagNeededTier2) && Game.flags.GHODIUM_ALKALIDE !== undefined && Game.flags.GHODIUM_ALKALIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }



        else if (Game.flags.CATALYZED_UTRIUM_ACID !== undefined && Game.flags.CATALYZED_UTRIUM_ACID.room === creep.room || needsResource(RESOURCE_CATALYZED_UTRIUM_ACID, tier3)) {

            resource = RESOURCE_UTRIUM_ACID;
            resource2 = RESOURCE_CATALYST;
            resource3 = RESOURCE_CATALYZED_UTRIUM_ACID;

            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_UTRIUM_ACID === undefined) {creep.room.createFlag(10,10, 'CATALYZED_UTRIUM_ACID')}
            if (terminalCATALYZED_UTRIUM_ACID > flagNeededTier3 && Game.flags.CATALYZED_UTRIUM_ACID !== undefined && Game.flags.CATALYZED_UTRIUM_ACID.room === creep.room) {Game.flags.CATALYZED_UTRIUM_ACID.remove()}
            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_UTRIUM_ACID !== undefined && Game.flags.CATALYZED_UTRIUM_ACID.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.CATALYZED_UTRIUM_ALKALIDE !== undefined && Game.flags.CATALYZED_UTRIUM_ALKALIDE.room === creep.room || needsResource(RESOURCE_CATALYZED_UTRIUM_ALKALIDE, tier3)) {

            resource = RESOURCE_UTRIUM_ALKALIDE;
            resource2 = RESOURCE_CATALYST;
            resource3 = RESOURCE_CATALYZED_UTRIUM_ALKALIDE;

            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_UTRIUM_ALKALIDE === undefined) {creep.room.createFlag(10,10, 'CATALYZED_UTRIUM_ALKALIDE')}
            if (terminalCATALYZED_UTRIUM_ALKALIDE > flagNeededTier3 && Game.flags.CATALYZED_UTRIUM_ALKALIDE !== undefined && Game.flags.CATALYZED_UTRIUM_ALKALIDE.room === creep.room) {Game.flags.CATALYZED_UTRIUM_ALKALIDE.remove()}
            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_UTRIUM_ALKALIDE !== undefined && Game.flags.CATALYZED_UTRIUM_ALKALIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.CATALYZED_KEANIUM_ACID !== undefined && Game.flags.CATALYZED_KEANIUM_ACID.room === creep.room || needsResource(RESOURCE_CATALYZED_KEANIUM_ACID, tier3)) {

            resource = RESOURCE_KEANIUM_ACID;
            resource2 = RESOURCE_CATALYST;
            resource3 = RESOURCE_CATALYZED_KEANIUM_ACID;

            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_KEANIUM_ACID === undefined) {creep.room.createFlag(10,10, 'CATALYZED_KEANIUM_ACID')}
            if (terminalCATALYZED_KEANIUM_ACID > flagNeededTier3 && Game.flags.CATALYZED_KEANIUM_ACID !== undefined && Game.flags.CATALYZED_KEANIUM_ACID.room === creep.room) {Game.flags.CATALYZED_KEANIUM_ACID.remove()}
            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_KEANIUM_ACID !== undefined && Game.flags.CATALYZED_KEANIUM_ACID.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.CATALYZED_KEANIUM_ALKALIDE !== undefined && Game.flags.CATALYZED_KEANIUM_ALKALIDE.room === creep.room || needsResource(RESOURCE_CATALYZED_KEANIUM_ALKALIDE, tier3)) {

            resource = RESOURCE_KEANIUM_ALKALIDE;
            resource2 = RESOURCE_CATALYST;
            resource3 = RESOURCE_CATALYZED_KEANIUM_ALKALIDE;

            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_KEANIUM_ALKALIDE === undefined) {creep.room.createFlag(10,10, 'CATALYZED_KEANIUM_ALKALIDE')}
            if (terminalCATALYZED_KEANIUM_OXIDE > flagNeededTier3 && Game.flags.CATALYZED_KEANIUM_ALKALIDE !== undefined && Game.flags.CATALYZED_KEANIUM_ALKALIDE.room === creep.room) {Game.flags.CATALYZED_KEANIUM_ALKALIDE.remove()}
            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_KEANIUM_ALKALIDE !== undefined && Game.flags.CATALYZED_KEANIUM_ALKALIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.CATALYZED_LEMERGIUM_ACID !== undefined && Game.flags.CATALYZED_LEMERGIUM_ACID.room === creep.room || needsResource(RESOURCE_CATALYZED_LEMERGIUM_ACID, tier3)) {

            resource = RESOURCE_LEMERGIUM_ACID;
            resource2 = RESOURCE_CATALYST;
            resource3 = RESOURCE_CATALYZED_LEMERGIUM_ACID;

            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_LEMERGIUM_ACID === undefined) {creep.room.createFlag(10,10, 'CATALYZED_LEMERGIUM_ACID')}
            if (terminalCATALYZED_LEMERGIUM_ACID > flagNeededTier3 && Game.flags.CATALYZED_LEMERGIUM_ACID !== undefined && Game.flags.CATALYZED_LEMERGIUM_ACID.room === creep.room) {Game.flags.CATALYZED_LEMERGIUM_ACID.remove()}
            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_LEMERGIUM_ACID !== undefined && Game.flags.CATALYZED_LEMERGIUM_ACID.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.CATALYZED_LEMERGIUM_ALKALIDE !== undefined && Game.flags.CATALYZED_LEMERGIUM_ALKALIDE.room === creep.room || needsResource(RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE, tier3)) {

            resource = RESOURCE_LEMERGIUM_ALKALIDE;
            resource2 = RESOURCE_CATALYST;
            resource3 = RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE;

            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_LEMERGIUM_ALKALIDE === undefined) {creep.room.createFlag(10,10, 'CATALYZED_LEMERGIUM_ALKALIDE')}
            if (terminalCATALYZED_LEMERGIUM_ALKALIDE > flagNeededTier3 && Game.flags.CATALYZED_LEMERGIUM_ALKALIDE !== undefined && Game.flags.CATALYZED_LEMERGIUM_ALKALIDE.room === creep.room) {Game.flags.CATALYZED_LEMERGIUM_ALKALIDE.remove()}
            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_LEMERGIUM_ALKALIDE !== undefined && Game.flags.CATALYZED_LEMERGIUM_ALKALIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.CATALYZED_ZYNTHIUM_ACID !== undefined && Game.flags.CATALYZED_ZYNTHIUM_ACID.room === creep.room || needsResource(RESOURCE_CATALYZED_ZYNTHIUM_ACID, tier3)) {

            resource = RESOURCE_ZYNTHIUM_ACID;
            resource2 = RESOURCE_CATALYST;
            resource3 = RESOURCE_CATALYZED_ZYNTHIUM_ACID;

            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_ZYNTHIUM_ACID === undefined) {creep.room.createFlag(10,10, 'CATALYZED_ZYNTHIUM_ACID')}
            if (terminalCATALYZED_ZYNTHIUM_ACID > flagNeededTier3 && Game.flags.CATALYZED_ZYNTHIUM_ACID !== undefined && Game.flags.CATALYZED_ZYNTHIUM_ACID.room === creep.room) {Game.flags.CATALYZED_ZYNTHIUM_ACID.remove()}
            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_ZYNTHIUM_ACID !== undefined && Game.flags.CATALYZED_ZYNTHIUM_ACID.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.CATALYZED_ZYNTHIUM_ALKALIDE !== undefined && Game.flags.CATALYZED_ZYNTHIUM_ALKALIDE.room === creep.room || needsResource(RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE, tier3)) {

            resource = RESOURCE_ZYNTHIUM_ALKALIDE;
            resource2 = RESOURCE_CATALYST;
            resource3 = RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE;

            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_ZYNTHIUM_ALKALIDE === undefined) {creep.room.createFlag(10,10, 'CATALYZED_ZYNTHIUM_ALKALIDE')}
            if (terminalCATALYZED_ZYNTHIUM_ALKALIDE > flagNeededTier3 && Game.flags.CATALYZED_ZYNTHIUM_ALKALIDE !== undefined && Game.flags.CATALYZED_ZYNTHIUM_ALKALIDE.room === creep.room) {Game.flags.CATALYZED_ZYNTHIUM_ALKALIDE.remove()}
            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_ZYNTHIUM_ALKALIDE !== undefined && Game.flags.CATALYZED_ZYNTHIUM_ALKALIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.CATALYZED_GHODIUM_ACID !== undefined && Game.flags.CATALYZED_GHODIUM_ACID.room === creep.room || needsResource(RESOURCE_CATALYZED_GHODIUM_ACID, tier3)) {

            resource = RESOURCE_GHODIUM_ACID;
            resource2 = RESOURCE_CATALYST;
            resource3 = RESOURCE_CATALYZED_GHODIUM_ACID;

            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_GHODIUM_ACID === undefined) {creep.room.createFlag(10,10, 'CATALYZED_GHODIUM_ACID')}
            if (terminalCATALYZED_GHODIUM_ACID > flagNeededTier3 && Game.flags.CATALYZED_GHODIUM_ACID !== undefined && Game.flags.CATALYZED_GHODIUM_ACID.room === creep.room) {Game.flags.CATALYZED_GHODIUM_ACID.remove()}
            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_GHODIUM_ACID !== undefined && Game.flags.CATALYZED_GHODIUM_ACID.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

        else if (Game.flags.CATALYZED_GHODIUM_ALKALIDE !== undefined && Game.flags.CATALYZED_GHODIUM_ALKALIDE.room === creep.room || needsResource(RESOURCE_CATALYZED_GHODIUM_ALKALIDE, tier3)) {

            resource = RESOURCE_GHODIUM_ALKALIDE;
            resource2 = RESOURCE_CATALYST;
            resource3 = RESOURCE_CATALYZED_GHODIUM_ALKALIDE;

            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_GHODIUM_ALKALIDE === undefined) {creep.room.createFlag(10,10, 'CATALYZED_GHODIUM_ALKALIDE')}
            if (terminalCATALYZED_GHODIUM_ALKALIDE > flagNeededTier3 && Game.flags.CATALYZED_GHODIUM_ALKALIDE !== undefined && Game.flags.CATALYZED_GHODIUM_ALKALIDE.room === creep.room) {Game.flags.CATALYZED_GHODIUM_ALKALIDE.remove()}
            if (needsResource(resource3, flagNeededTier3) && Game.flags.CATALYZED_GHODIUM_ALKALIDE !== undefined && Game.flags.CATALYZED_GHODIUM_ALKALIDE.room === creep.room) {

                //WRONG CREEP

                if (_.sum(creep.carry) > 0 && creep.carry[resource] === undefined && creep.carry[resource2] === undefined) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] === creep.carryCapacity && labNeedsResource1(resource) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] === creep.carryCapacity && labNeedsResource2(resource2) === false) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                else if (_.sum(creep.carry) > 0 && creep.carry[resource2] < creep.carryCapacity) {
                    for (x of RESOURCES_ALL) {
                        if (creep.transfer(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                        if (creep.transfer(creep.room.terminal, x) === 0) {break}
                    }
                }

                //WRONG LAB

                else if (lab1.mineralType !== resource && lab1.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (lab2.mineralType !== resource2 && lab2.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                else if (lab3.mineralType !== resource3 && lab3.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType !== resource3 && lab4.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType !== resource3 && lab5.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType !== resource3 && lab6.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType !== resource3 && lab7.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType !== resource3 && lab8.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType !== resource3 && lab9.mineralType !== null && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //REACTION LABS

                else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab3)
                    }
                }

                else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab4)
                    }
                }

                else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab5)
                    }
                }

                else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab6)
                    }
                }

                else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab7)
                    }
                }

                else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab8)
                    }
                }

                else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity && _.sum(creep.carry) < creep.carryCapacity) {
                    if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab9)
                    }
                }

                //EMPTY

                else if (creep.carry[resource] === undefined && _.sum(creep.carry) === 0 && lab1.mineralType === null && lab1MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource] === creep.carryCapacity) {
                    if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab1)
                    }
                }

                else if (creep.carry[resource2] === undefined && _.sum(creep.carry) === 0 && lab2.mineralType === null && lab2MineralAmount < 50) {
                    if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(creep.room.terminal)
                    }
                }

                else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === null) {
                    if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(lab2)
                    }
                }

                //FILLING

                else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
                    if (labNeedsResource1(resource) && creep.carry[resource] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                        if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab1)
                        }
                    }
                }

                else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
                    if (labNeedsResource2(resource2) && creep.carry[resource2] === undefined && _.sum(creep.carry) === 0) {
                        if (creep.withdraw(creep.room.terminal, resource2, creep.carryCapacity) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(creep.room.terminal)
                        }
                    }

                    if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                        if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                            creep.travelTo(lab2)
                        }
                    }
                }
            }
        }

    }
};