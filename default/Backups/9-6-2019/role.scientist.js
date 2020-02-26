module.exports = {
    run: function(creep) {

        let lab1 = Game.getObjectById(creep.memory.lab1);
        let lab2 = Game.getObjectById(creep.memory.lab2);
        let lab3 = Game.getObjectById(creep.memory.lab3);
        let lab4 = Game.getObjectById(creep.memory.lab4);
        let lab5 = Game.getObjectById(creep.memory.lab5);
        let lab6 = Game.getObjectById(creep.memory.lab6);

        let labb1 = lab2.mineralAmount;
        let labb2 = lab3.mineralAmount;
        let labb4 = lab5.mineralAmount;
        let labb5 = lab6.mineralAmount;

        lab1.runReaction(lab2, lab3);
        lab4.runReaction(lab5, lab6);

        let labMin = Math.min(labb1,labb2,labb4,labb5);
        if (creep.ticksToLive < 150 && creep.memory.working === false) {
            creep.suicide()
        }
        else if (creep.memory.working === true && _.sum(creep.carry) === 0 && labMin < 50) {
            creep.memory.working = false;
        }
        else if (creep.memory.working === false && _.sum(creep.carry) === creep.carryCapacity) {
            creep.memory.working = true;
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
        //PICKUP





        let test = 1
        if ((test === 1) && test === 2 || test === 3 ||  test === 2) {
            console.log(test)
        }








        if (creep.memory.working === true) {

            if (lab1.mineralAmount > 75 && _.sum(creep.carry) < 10) {
                if (creep.withdraw(lab1,lab1.mineralType,75) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab1)
                }
            }
            else if (lab4.mineralAmount > 75 && _.sum(creep.carry) < 10) {
                if (creep.withdraw(lab4,lab4.mineralType,75) === ERR_NOT_IN_RANGE) {
                    creep.travelTo(lab4)
                }
            }
            else if(_.sum(creep.carry) > 0 && _.sum(creep.carry) < 50) {
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


            else if(_.sum(creep.carry) > 50 && _.sum(creep.carry) < 100) {
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
            else if (creep.carry[RESOURCE_OXYGEN] > 0 || creep.carry[RESOURCE_HYDROGEN] > 0 || terminalHYDROXIDE === undefined && terminalHYDROXIDE < 5000) {
                if (creep.carry[RESOURCE_OXYGEN] > 0 && lab2.mineralAmount === 0) {
                    if (creep.transfer(lab2, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab3.mineralAmount === 0) {
                    if (creep.transfer(lab3, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab5.mineralAmount === 0) {
                    if (creep.transfer(lab5, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab6.mineralAmount === 0) {
                    if (creep.transfer(lab6, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            }



            else if (creep.carry[RESOURCE_KEANIUM] > 0 || creep.carry[RESOURCE_ZYNTHIUM] > 0 || terminalZYNTHIUM_KEANITE === undefined && terminalZYNTHIUM_KEANITE < 5000) {

                if (creep.carry[RESOURCE_ZYNTHIUM] > 0 && lab2.mineralAmount === 0) {
                    if (creep.transfer(lab2, RESOURCE_ZYNTHIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_KEANIUM] > 0 && lab3.mineralAmount === 0) {
                    if (creep.transfer(lab3, RESOURCE_KEANIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                }
                else if (creep.carry[RESOURCE_ZYNTHIUM] > 0 && lab5.mineralAmount === 0) {
                    if (creep.transfer(lab5, RESOURCE_ZYNTHIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_KEANIUM] > 0 && lab6.mineralAmount === 0) {
                    if (creep.transfer(lab6, RESOURCE_KEANIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            }


            else if (creep.carry[RESOURCE_LEMERGIUM] > 0 || creep.carry[RESOURCE_UTRIUM] > 0 || terminalUTRIUM_LEMERGITE === undefined && terminalUTRIUM_LEMERGITE < 5000) {
                if (creep.carry[RESOURCE_UTRIUM] > 0 && lab2.mineralAmount === 0) {
                    if (creep.transfer(lab2, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_LEMERGIUM] > 0 && lab3.mineralAmount === 0) {
                    if (creep.transfer(lab3, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                } else if (creep.carry[RESOURCE_UTRIUM] > 0 && lab5.mineralAmount === 0) {
                    if (creep.transfer(lab5, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_LEMERGIUM] > 0 && lab6.mineralAmount === 0) {
                    if (creep.transfer(lab6, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            }



            else if (creep.carry[RESOURCE_ZYNTHIUM_KEANITE] > 0 || creep.carry[RESOURCE_UTRIUM_LEMERGITE] > 0 || terminalGHODIUM === undefined && terminalGHODIUM < 5000) {
                if (creep.carry[RESOURCE_ZYNTHIUM_KEANITE] > 0 && lab2.mineralAmount === 0) {
                    if (creep.transfer(lab2, RESOURCE_ZYNTHIUM_KEANITE) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_UTRIUM_LEMERGITE] > 0 && lab3.mineralAmount === 0) {
                    if (creep.transfer(lab3, RESOURCE_UTRIUM_LEMERGITE) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                }
                else if (creep.carry[RESOURCE_ZYNTHIUM_KEANITE] > 0 && lab5.mineralAmount === 0) {
                    if (creep.transfer(lab5, RESOURCE_ZYNTHIUM_KEANITE) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_UTRIUM_LEMERGITE] > 0 && lab6.mineralAmount === 0) {
                    if (creep.transfer(lab6, RESOURCE_UTRIUM_LEMERGITE) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            }


            else if (creep.carry[RESOURCE_UTRIUM] > 0 || creep.carry[RESOURCE_HYDROGEN] > 0 || terminalUTRIUM_HYDRIDE === undefined && terminalUTRIUM_HYDRIDE < 5000) {
                if (creep.carry[RESOURCE_UTRIUM] > 0 && lab2.mineralAmount === 0) {
                    if (creep.transfer(lab2, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab3.mineralAmount === 0) {
                    if (creep.transfer(lab3, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                } else if (creep.carry[RESOURCE_UTRIUM] > 0 && lab5.mineralAmount === 0) {
                    if (creep.transfer(lab5, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab6.mineralAmount === 0) {
                    if (creep.transfer(lab6, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            }

            else if (creep.carry[RESOURCE_UTRIUM] > 0 || creep.carry[RESOURCE_OXYGEN] > 0 || terminalUTRIUM_OXIDE === undefined && terminalUTRIUM_OXIDE < 5000) {
                if (creep.carry[RESOURCE_UTRIUM] > 0 && lab2.mineralAmount === 0) {
                    if (creep.transfer(lab2, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab3.mineralAmount === 0) {
                    if (creep.transfer(lab3, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                } else if (creep.carry[RESOURCE_UTRIUM] > 0 && lab5.mineralAmount === 0) {
                    if (creep.transfer(lab5, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab6.mineralAmount === 0) {
                    if (creep.transfer(lab6, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            } else if (creep.carry[RESOURCE_KEANIUM] > 0 || creep.carry[RESOURCE_HYDROGEN] > 0 || terminalKEANIUM_HYDRIDE === undefined && terminalKEANIUM_HYDRIDE < 5000) {
                if (creep.carry[RESOURCE_KEANIUM] > 0 && lab2.mineralAmount === 0) {
                    if (creep.transfer(lab2, RESOURCE_KEANIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab3.mineralAmount === 0) {
                    if (creep.transfer(lab3, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                } else if (creep.carry[RESOURCE_KEANIUM] > 0 && lab5.mineralAmount === 0) {
                    if (creep.transfer(lab5, RESOURCE_KEANIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab6.mineralAmount === 0) {
                    if (creep.transfer(lab6, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            } else if (creep.carry[RESOURCE_OXYGEN] > 0 || creep.carry[RESOURCE_KEANIUM] > 0 || terminalKEANIUM_OXIDE === undefined && terminalKEANIUM_OXIDE < 5000) {
                if (creep.carry[RESOURCE_KEANIUM] > 0 && lab2.mineralAmount === 0) {
                    if (creep.transfer(lab2, RESOURCE_KEANIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab3.mineralAmount === 0) {
                    if (creep.transfer(lab3, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                } else if (creep.carry[RESOURCE_KEANIUM] > 0 && lab5.mineralAmount === 0) {
                    if (creep.transfer(lab5, RESOURCE_KEANIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab6.mineralAmount === 0) {
                    if (creep.transfer(lab6, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            } else if (creep.carry[RESOURCE_HYDROGEN] > 0 || creep.carry[RESOURCE_LEMERGIUM] > 0 || terminalLEMERGIUM_HYDRIDE === undefined && terminalLEMERGIUM_HYDRIDE < 5000) {
                if (creep.transfer(lab2, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE) {
                    if (creep.carry[RESOURCE_LEMERGIUM] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    } else if (creep.carry[RESOURCE_LEMERGIUM] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                } else if (creep.carry[RESOURCE_OXYGEN] > 0 || creep.carry[RESOURCE_LEMERGIUM] > 0 || terminalLEMERGIUM_OXIDE === undefined && terminalLEMERGIUM_OXIDE < 5000) {
                    if (creep.carry[RESOURCE_LEMERGIUM] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    } else if (creep.carry[RESOURCE_LEMERGIUM] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                }



                else if (creep.carry[RESOURCE_HYDROGEN] > 0 || creep.carry[RESOURCE_ZYNTHIUM] > 0 || terminalZYNTHIUM_HYDRIDE === undefined && terminalZYNTHIUM_HYDRIDE < 5000) {
                    if (creep.carry[RESOURCE_ZYNTHIUM] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_ZYNTHIUM) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    }
                    else if (creep.carry[RESOURCE_ZYNTHIUM] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_ZYNTHIUM) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                }



                else if (creep.carry[RESOURCE_OXYGEN] > 0 || creep.carry[RESOURCE_ZYNTHIUM] > 0 || terminalZYNTHIUM_OXIDE === undefined && terminalZYNTHIUM_OXIDE < 5000) {
                    if (creep.carry[RESOURCE_ZYNTHIUM] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_ZYNTHIUM) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    }
                    else if (creep.carry[RESOURCE_ZYNTHIUM] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_ZYNTHIUM) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                }



                else if (creep.carry[RESOURCE_HYDROGEN] > 0 || creep.carry[RESOURCE_GHODIUM] > 0 && terminalGHODIUM_HYDRIDE < 5000 || terminalGHODIUM_HYDRIDE === undefined) {
                    if (creep.carry[RESOURCE_GHODIUM] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_GHODIUM) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    }
                    else if (creep.carry[RESOURCE_GHODIUM] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_GHODIUM) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                }



                else if (creep.carry[RESOURCE_OXYGEN] > 0 || creep.carry[RESOURCE_GHODIUM] > 0 && terminalGHODIUM_OXIDE < 5000 || terminalGHODIUM_OXIDE === undefined) {
                    if (creep.carry[RESOURCE_GHODIUM] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_GHODIUM) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    }
                    else if (creep.carry[RESOURCE_GHODIUM] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_GHODIUM) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                }











                else if (creep.carry[RESOURCE_HYDROXIDE] > 0 || creep.carry[RESOURCE_UTRIUM_HYDRIDE] > 0 && terminalUTRIUM_ACID < 5000 || terminalUTRIUM_ACID === undefined) {

                    if (creep.carry[RESOURCE_UTRIUM_HYDRIDE] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_UTRIUM_HYDRIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    } else if (creep.carry[RESOURCE_UTRIUM_HYDRIDE] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_UTRIUM_HYDRIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 || creep.carry[RESOURCE_UTRIUM_OXIDE] > 0 && terminalUTRIUM_ALKALIDE < 5000 || terminalUTRIUM_ALKALIDE === undefined) {
                    if (creep.carry[RESOURCE_UTRIUM_OXIDE] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_UTRIUM_OXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    } else if (creep.carry[RESOURCE_UTRIUM_OXIDE] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_UTRIUM_OXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 || creep.carry[RESOURCE_KEANIUM_HYDRIDE] > 0 && terminalKEANIUM_ACID < 5000 || terminalKEANIUM_ACID === undefined) {
                    if (creep.carry[RESOURCE_KEANIUM_HYDRIDE] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_KEANIUM_HYDRIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    } else if (creep.carry[RESOURCE_KEANIUM_HYDRIDE] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_KEANIUM_HYDRIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 || creep.carry[RESOURCE_KEANIUM_OXIDE] > 0 && terminalKEANIUM_ALKALIDE < 5000 || terminalKEANIUM_ALKALIDE === undefined) {
                    if (creep.carry[RESOURCE_KEANIUM_OXIDE] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_KEANIUM_OXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    } else if (creep.carry[RESOURCE_KEANIUM_OXIDE] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_KEANIUM_OXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 || creep.carry[RESOURCE_LEMERGIUM_HYDRIDE] > 0 && terminalLEMERGIUM_ACID < 5000 || terminalLEMERGIUM_ACID === undefined) {
                    if (creep.carry[RESOURCE_LEMERGIUM_HYDRIDE] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_LEMERGIUM_HYDRIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    } else if (creep.carry[RESOURCE_LEMERGIUM_HYDRIDE] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_LEMERGIUM_HYDRIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 || creep.carry[RESOURCE_LEMERGIUM_OXIDE] > 0 && terminalLEMERGIUM_ALKALIDE < 5000 || terminalLEMERGIUM_ALKALIDE === undefined) {
                    if (creep.carry[RESOURCE_LEMERGIUM_OXIDE] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_LEMERGIUM_OXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    } else if (creep.carry[RESOURCE_LEMERGIUM_OXIDE] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_LEMERGIUM_OXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                }



                else if (creep.carry[RESOURCE_ZYNTHIUM_HYDRIDE] > 0 || creep.carry[RESOURCE_HYDROXIDE] > 0 && terminalZYNTHIUM_ACID < 5000 || terminalZYNTHIUM_ACID === undefined) {
                    if (creep.carry[RESOURCE_ZYNTHIUM_HYDRIDE] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_ZYNTHIUM_HYDRIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    }
                    else if (creep.carry[RESOURCE_ZYNTHIUM_HYDRIDE] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_ZYNTHIUM_HYDRIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                }



                else if (creep.carry[RESOURCE_HYDROXIDE] > 0 || creep.carry[RESOURCE_ZYNTHIUM_OXIDE] > 0 && terminalZYNTHIUM_ALKALIDE < 5000 || terminalZYNTHIUM_ALKALIDE === undefined) {
                    if (creep.carry[RESOURCE_ZYNTHIUM_OXIDE] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_ZYNTHIUM_OXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    }
                    else if (creep.carry[RESOURCE_ZYNTHIUM_OXIDE] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_ZYNTHIUM_OXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                }



                else if (creep.carry[RESOURCE_HYDROXIDE] > 0 || creep.carry[RESOURCE_GHODIUM_HYDRIDE] > 0 && terminalGHODIUM_ACID < 5000 || terminalGHODIUM_ACID === undefined) {
                    if (creep.carry[RESOURCE_GHODIUM_HYDRIDE] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_GHODIUM_HYDRIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    }
                    else if (creep.carry[RESOURCE_GHODIUM_HYDRIDE] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_GHODIUM_HYDRIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                }



                else if (creep.carry[RESOURCE_HYDROXIDE] > 0 || creep.carry[RESOURCE_GHODIUM_OXIDE] > 0 && terminalGHODIUM_ALKALIDE < 5000 || terminalGHODIUM_ALKALIDE === undefined) {
                    if (creep.carry[RESOURCE_GHODIUM] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_GHODIUM) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    }
                    else if (creep.carry[RESOURCE_GHODIUM] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_GHODIUM) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_HYDROXIDE] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_HYDROXIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                }

















                else if (creep.carry[RESOURCE_CATALYST] > 0 || creep.carry[RESOURCE_UTRIUM_ACID] > 0 && terminalCATALYZED_UTRIUM_ACID < 5000 || terminalCATALYZED_UTRIUM_ACID === undefined) {
                    if (creep.carry[RESOURCE_UTRIUM_ACID] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_UTRIUM_ACID) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    } else if (creep.carry[RESOURCE_UTRIUM_ACID] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_UTRIUM_ACID) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                } else if (creep.carry[RESOURCE_CATALYST] > 0 || creep.carry[RESOURCE_UTRIUM_ALKALIDE] > 0 && terminalCATALYZED_UTRIUM_ALKALIDE < 5000 || terminalCATALYZED_UTRIUM_ALKALIDE === undefined) {
                    if (creep.carry[RESOURCE_UTRIUM_ALKALIDE] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_UTRIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    } else if (creep.carry[RESOURCE_UTRIUM_ALKALIDE] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_UTRIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                } else if (creep.carry[RESOURCE_CATALYST] > 0 || creep.carry[RESOURCE_KEANIUM_ACID] > 0 && terminalCATALYZED_KEANIUM_ACID < 5000 || terminalCATALYZED_KEANIUM_ACID === undefined) {
                    if (creep.carry[RESOURCE_KEANIUM_ACID] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_KEANIUM_ACID) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    } else if (creep.carry[RESOURCE_KEANIUM_ACID] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_KEANIUM_ACID) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                } else if (creep.carry[RESOURCE_CATALYST] > 0 || creep.carry[RESOURCE_KEANIUM_ALKALIDE] > 0 && terminalCATALYZED_KEANIUM_ALKALIDE < 5000 || terminalCATALYZED_KEANIUM_ALKALIDE === undefined) {
                    if (creep.carry[RESOURCE_KEANIUM_ALKALIDE] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_KEANIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    } else if (creep.carry[RESOURCE_KEANIUM_ALKALIDE] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_KEANIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                } else if (creep.carry[RESOURCE_CATALYST] > 0 || creep.carry[RESOURCE_LEMERGIUM_ACID] > 0 && terminalCATALYZED_LEMERGIUM_ACID < 5000 || terminalCATALYZED_LEMERGIUM_ACID === undefined) {
                    if (creep.carry[RESOURCE_LEMERGIUM_ACID] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_LEMERGIUM_ACID) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    } else if (creep.carry[RESOURCE_LEMERGIUM_ACID] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_LEMERGIUM_ACID) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                } else if (creep.carry[RESOURCE_CATALYST] > 0 || creep.carry[RESOURCE_LEMERGIUM_ALKALIDE] > 0 && terminalCATALYZED_LEMERGIUM_ALKALIDE < 5000 || terminalCATALYZED_LEMERGIUM_ALKALIDE === undefined) {
                    if (creep.carry[RESOURCE_LEMERGIUM_ALKALIDE] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_LEMERGIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    } else if (creep.carry[RESOURCE_LEMERGIUM_ALKALIDE] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_LEMERGIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                }


                else if (creep.carry[RESOURCE_CATALYST] > 0 || creep.carry[RESOURCE_ZYNTHIUM_ACID] > 0 && terminalCATALYZED_ZYNTHIUM_ACID < 5000 || terminalCATALYZED_ZYNTHIUM_ACID === undefined) {
                    if (creep.carry[RESOURCE_ZYNTHIUM_ACID] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_ZYNTHIUM_ACID) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    }
                    else if (creep.carry[RESOURCE_ZYNTHIU_ACID] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_ZYNTHIUM_ACID) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                }



                else if (creep.carry[RESOURCE_CATALYST] > 0 || creep.carry[RESOURCE_ZYNTHIUM_ALKALIDE] > 0 && terminalCATALYZED_ZYNTHIUM_ALKALIDE < 5000 || terminalCATALYZED_ZYNTHIUM_ALKALIDE === undefined) {
                    if (creep.carry[RESOURCE_ZYNTHIUM_ALKALIDE] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_ZYNTHIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    }
                    else if (creep.carry[RESOURCE_ZYNTHIUM_ALKALIDE] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_ZYNTHIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                }


                else if (creep.carry[RESOURCE_CATALYST] > 0 || creep.carry[RESOURCE_GHODIUM_ACID] > 0 && terminalCATALYZED_GHODIUM_ACID < 5000 || terminalCATALYZED_GHODIUM_ACID === undefined) {
                    if (creep.carry[RESOURCE_GHODIUM_ACID] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_GHODIUM_ACID) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    }
                    else if (creep.carry[RESOURCE_GHODIUM_ACID] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_GHODIUM_ACID) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                }



                else if (creep.carry[RESOURCE_CATALYST] > 0 || creep.carry[RESOURCE_GHODIUM_ALKALIDE] > 0 && terminalCATALYZED_GHODIUM_ALKALIDE < 5000 || terminalCATALYZED_GHODIUM_ALKALIDE === undefined) {
                    if (creep.carry[RESOURCE_GHODIUM_ALKALIDE] > 0 && lab2.mineralAmount === 0) {
                        if (creep.transfer(lab2, RESOURCE_GHODIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab2)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab3.mineralAmount === 0) {
                        if (creep.transfer(lab3, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab3)
                        }
                    }
                    else if (creep.carry[RESOURCE_GHODIUM_ALKALIDE] > 0 && lab5.mineralAmount === 0) {
                        if (creep.transfer(lab5, RESOURCE_GHODIUM_ALKALIDE) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab5)
                        }
                    } else if (creep.carry[RESOURCE_CATALYST] > 0 && lab6.mineralAmount === 0) {
                        if (creep.transfer(lab6, RESOURCE_CATALYST) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(lab6)
                        }
                    }
                }
            }
        }

        else if (creep.memory.working === false) {
            //creep.withdraw(lab6,lab6.mineralType,25);

            if(_.sum(creep.carry) > 0 && _.sum(creep.carry) < 50) {
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


            else if(_.sum(creep.carry) > 50 && _.sum(creep.carry) < 100) {
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



            else if (creep.carry[RESOURCE_OXYGEN] === 0 || creep.carry[RESOURCE_HYDROGEN] === 0 || terminalHYDROXIDE === undefined && terminalHYDROXIDE < 5000) {
                if (creep.carry[RESOURCE_HYDROGEN] < 50 || creep.carry[RESOURCE_HYDROGEN] === undefined || creep.carry[RESOURCE_OXYGEN] < 50 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                    if (creep.carry[RESOURCE_HYDROGEN] < 50 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROGEN, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_OXYGEN] < 50 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_OXYGEN, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_KEANIUM] === 0 || creep.carry[RESOURCE_ZYNTHIUM] === 0 && terminalZYNTHIUM_KEANITE < 5000 || terminalZYNTHIUM_KEANITE === undefined) {
                if (creep.carry[RESOURCE_ZYNTHIUM] < 50 || creep.carry[RESOURCE_ZYNTHIUM] === undefined || creep.carry[RESOURCE_KEANIUM] < 50 || creep.carry[RESOURCE_KEANIUM] === undefined) {
                    if (creep.carry[RESOURCE_ZYNTHIUM] < 50 || creep.carry[RESOURCE_ZYNTHIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_ZYNTHIUM, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_KEANIUM] < 50 || creep.carry[RESOURCE_KEANIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_KEANIUM, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }


            else if (creep.carry[RESOURCE_LEMERGIUM] === 0 || creep.carry[RESOURCE_UTRIUM] === 0 && terminalUTRIUM_LEMERGITE < 5000 || terminalUTRIUM_LEMERGITE === undefined) {
                if (creep.carry[RESOURCE_UTRIUM] < 50 || creep.carry[RESOURCE_UTRIUM] === undefined || creep.carry[RESOURCE_LEMERGIUM] < 50 || creep.carry[RESOURCE_LEMERGIUM] === undefined) {
                    if (creep.carry[RESOURCE_UTRIUM] < 50 || creep.carry[RESOURCE_UTRIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_UTRIUM, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_LEMERGIUM] < 50 || creep.carry[RESOURCE_LEMERGIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_LEMERGIUM, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_ZYNTHIUM_KEANITE] === 0 || creep.carry[RESOURCE_UTRIUM_LEMERGITE] === 0 && terminalGHODIUM < 5000 || terminalGHODIUM === undefined) {
                if (creep.carry[RESOURCE_ZYNTHIUM_KEANITE] < 50 || creep.carry[RESOURCE_ZYNTHIUM_KEANITE] === undefined || creep.carry[RESOURCE_UTRIUM_LEMERGITE] < 50 || creep.carry[RESOURCE_UTRIUM_LEMERGITE] === undefined) {
                    if (creep.carry[RESOURCE_HYDROGEN] < 50 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_ZYNTHIUM_KEANITE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_UTRIUM_LEMERGITE] < 50 || creep.carry[RESOURCE_UTRIUM_LEMERGITE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_UTRIUM_LEMERGITE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }







            else if (creep.carry[RESOURCE_UTRIUM] === 0 || creep.carry[RESOURCE_HYDROGEN] === 0 && terminalUTRIUM_HYDRIDE < 5000 || terminalUTRIUM_HYDRIDE === undefined) {
                if (creep.carry[RESOURCE_UTRIUM] < 50 || creep.carry[RESOURCE_UTRIUM] === undefined || creep.carry[RESOURCE_HYDROGEN] < 50 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                    if (creep.carry[RESOURCE_UTRIUM] < 50 || creep.carry[RESOURCE_UTRIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_UTRIUM, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROGEN] < 50 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROGEN, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_UTRIUM] === 0 || creep.carry[RESOURCE_OXYGEN] === 0 && terminalUTRIUM_OXIDE < 5000 || terminalUTRIUM_OXIDE === undefined) {
                if (creep.carry[RESOURCE_UTRIUM] < 50 || creep.carry[RESOURCE_UTRIUM] === undefined || creep.carry[RESOURCE_OXYGEN] < 50 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                    if (creep.carry[RESOURCE_UTRIUM] < 50 || creep.carry[RESOURCE_UTRIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_UTRIUM, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_OXYGEN] < 50 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_OXYGEN, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_KEANIUM] === 0 || creep.carry[RESOURCE_HYDROGEN] === 0 && terminalKEANIUM_HYDRIDE < 5000 || terminalKEANIUM_HYDRIDE === undefined) {
                if (creep.carry[RESOURCE_KEANIUM] < 50 || creep.carry[RESOURCE_KEANIUM] === undefined || creep.carry[RESOURCE_HYDROGEN] < 50 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                    if (creep.carry[RESOURCE_KEANIUM] < 50 || creep.carry[RESOURCE_KEANIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_KEANIUM, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROGEN] < 50 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROGEN, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_OXYGEN] === 0 || creep.carry[RESOURCE_KEANIUM] === 0 && terminalKEANIUM_OXIDE < 5000 || terminalKEANIUM_OXIDE === undefined) {
                if (creep.carry[RESOURCE_KEANIUM] < 50 || creep.carry[RESOURCE_KEANIUM] === undefined || creep.carry[RESOURCE_OXYGEN] < 50 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                    if (creep.carry[RESOURCE_KEANIUM] < 50 || creep.carry[RESOURCE_KEANIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_KEANIUM, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_OXYGEN] < 50 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_OXYGEN, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_HYDROGEN] === 0 || creep.carry[RESOURCE_LEMERGIUM] === 0 && terminalLEMERGIUM_HYDRIDE < 5000 || terminalLEMERGIUM_HYDRIDE === undefined) {
                if (creep.carry[RESOURCE_LEMERGIUM] < 50 || creep.carry[RESOURCE_LEMERGIUM] === undefined || creep.carry[RESOURCE_HYDROGEN] < 50 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                    if (creep.carry[RESOURCE_LEMERGIUM] < 50 || creep.carry[RESOURCE_LEMERGIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_LEMERGIUM, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROGEN] < 50 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROGEN, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_OXYGEN] === 0 || creep.carry[RESOURCE_LEMERGIUM] === 0 && terminalLEMERGIUM_OXIDE < 5000 || terminalLEMERGIUM_OXIDE === undefined) {
                if (creep.carry[RESOURCE_LEMERGIUM] < 50 || creep.carry[RESOURCE_LEMERGIUM] === undefined || creep.carry[RESOURCE_HYDROGEN] < 50 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                    if (creep.carry[RESOURCE_LEMERGIUM] < 50 || creep.carry[RESOURCE_LEMERGIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_LEMERGIUM, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_OXYGEN] < 50 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_OXYGEN, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_HYDROGEN] === 0 || creep.carry[RESOURCE_ZYNTHIUM] === 0 && terminalZYNTHIUM_HYDRIDE < 5000 || terminalZYNTHIUM_HYDRIDE === undefined) {
                if (creep.carry[RESOURCE_ZYNTHIUM] < 50 || creep.carry[RESOURCE_ZYNTHIUM] === undefined || creep.carry[RESOURCE_HYDROGEN] < 50 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                    if (creep.carry[RESOURCE_ZYNTHIUM] < 50 || creep.carry[RESOURCE_ZYNTHIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_ZYNTHIUM, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROGEN] < 50 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROGEN, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_OXYGEN] === 0 || creep.carry[RESOURCE_ZYNTHIUM] === 0 && terminalZYNTHIUM_OXIDE < 5000 || terminalZYNTHIUM_OXIDE === undefined) {
                if (creep.carry[RESOURCE_ZYNTHIUM] < 50 || creep.carry[RESOURCE_ZYNTHIUM] === undefined || creep.carry[RESOURCE_OXYGEN] < 50 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                    if (creep.carry[RESOURCE_ZYNTHIUM] < 50 || creep.carry[RESOURCE_ZYNTHIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_ZYNTHIUM, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_OXYGEN] < 50 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_OXYGEN, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_HYDROGEN] === 0 || creep.carry[RESOURCE_GHODIUM] === 0 && terminalGHODIUM_HYDRIDE < 5000 || terminalGHODIUM_HYDRIDE === undefined) {
                if (creep.carry[RESOURCE_GHODIUM] < 50 || creep.carry[RESOURCE_GHODIUM] === undefined || creep.carry[RESOURCE_HYDROGEN] < 50 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                    if (creep.carry[RESOURCE_GHODIUM] < 50 || creep.carry[RESOURCE_GHODIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_GHODIUM, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROGEN] < 50 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROGEN, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_OXYGEN] === 0 || creep.carry[RESOURCE_GHODIUM] === 0 && terminalGHODIUM_OXIDE < 5000 || terminalGHODIUM_OXIDE === undefined) {
                if (creep.carry[RESOURCE_GHODIUM] < 50 || creep.carry[RESOURCE_GHODIUM] === undefined || creep.carry[RESOURCE_OXYGEN] < 50 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                    if (creep.carry[RESOURCE_GHODIUM] < 50 || creep.carry[RESOURCE_GHODIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_GHODIUM, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_OXYGEN] < 50 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_OXYGEN, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }


















            else if (creep.carry[RESOURCE_HYDROXIDE] === 0 || creep.carry[RESOURCE_UTRIUM_HYDRIDE] === 0 && terminalUTRIUM_ACID < 5000 || terminalUTRIUM_ACID === undefined) {
                if (creep.carry[RESOURCE_UTRIUM_HYDRIDE] < 50 || creep.carry[RESOURCE_UTRIUM_HYDRIDE] === undefined || creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                    if (creep.carry[RESOURCE_UTRIUM_HYDRIDE] < 50 || creep.carry[RESOURCE_UTRIUM_HYDRIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_UTRIUM_HYDRIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROXIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_HYDROXIDE] === 0 || creep.carry[RESOURCE_UTRIUM_OXIDE] === 0 && terminalUTRIUM_ALKALIDE < 5000 || terminalUTRIUM_ALKALIDE === undefined) {
                if (creep.carry[RESOURCE_UTRIUM_OXIDE] < 50 || creep.carry[RESOURCE_UTRIUM_OXIDE] === undefined || creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                    if (creep.carry[RESOURCE_UTRIUM_OXIDE] < 50 || creep.carry[RESOURCE_UTRIUM_OXIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_UTRIUM_OXIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROXIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_HYDROXIDE] === 0 || creep.carry[RESOURCE_KEANIUM_HYDRIDE] === 0 && terminalKEANIUM_ACID < 5000 || terminalKEANIUM_ACID === undefined) {
                if (creep.carry[RESOURCE_KEANIUM_HYDRIDE] < 50 || creep.carry[RESOURCE_KEANIUM_HYDRIDE] === undefined || creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                    if (creep.carry[RESOURCE_KEANIUM_HYDRIDE] < 50 || creep.carry[RESOURCE_KEANIUM_HYDRIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_KEANIUM_HYDRIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROXIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_HYDROXIDE] === 0 || creep.carry[RESOURCE_KEANIUM_OXIDE] === 0 && terminalKEANIUM_ALKALIDE < 5000 || terminalKEANIUM_ALKALIDE === undefined) {
                if (creep.carry[RESOURCE_KEANIUM_OXIDE] < 50 || creep.carry[RESOURCE_KEANIUM_OXIDE] === undefined || creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                    if (creep.carry[RESOURCE_KEANIUM_OXIDE] < 50 || creep.carry[RESOURCE_KEANIUM_OXIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_KEANIUM_OXIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROXIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_HYDROXIDE] === 0 || creep.carry[RESOURCE_LEMERGIUM_HYDRIDE] === 0 && terminalLEMERGIUM_ACID < 5000 || terminalLEMERGIUM_ACID === undefined) {
                if (creep.carry[RESOURCE_LEMERGIUM_HYDRIDE] < 50 || creep.carry[RESOURCE_LEMERGIUM_HYDRIDE] === undefined || creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                    if (creep.carry[RESOURCE_LEMERGIUM_HYDRIDE] < 50 || creep.carry[RESOURCE_LEMERGIUM_HYDRIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_LEMERGIUM_HYDRIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROXIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_HYDROXIDE] === 0 || creep.carry[RESOURCE_LEMERGIUM_OXIDE] === 0 &&    terminalLEMERGIUM_ALKALIDE < 5000 || terminalLEMERGIUM_ALKALIDE === undefined) {
                if (creep.carry[RESOURCE_LEMERGIUM_OXIDE] < 50 || creep.carry[RESOURCE_LEMERGIUM_OXIDE] === undefined || creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                    if (creep.carry[RESOURCE_LEMERGIUM_OXIDE] < 50 || creep.carry[RESOURCE_LEMERGIUM_OXIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_LEMERGIUM_OXIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROXIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_ZYNTHIUM_HYDRIDE] === 0 || creep.carry[RESOURCE_HYDROXIDE] === 0 && terminalZYNTHIUM_ACID < 5000 || terminalZYNTHIUM_ACID === undefined) {
                if (creep.carry[RESOURCE_ZYNTHIUM_HYDRIDE] < 50 || creep.carry[RESOURCE_ZYNTHIUM_HYDRIDE] === undefined || creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                    if (creep.carry[RESOURCE_ZYNTHIUM_HYDRIDE] < 50 || creep.carry[RESOURCE_ZYNTHIUM_HYDRIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_ZYNTHIUM_HYDRIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROXIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_HYDROXIDE] === 0 || creep.carry[RESOURCE_ZYNTHIUM_OXIDE] === 0 && terminalZYNTHIUM_ALKALIDE < 5000 || terminalZYNTHIUM_ALKALIDE === undefined) {
                if (creep.carry[RESOURCE_ZYNTHIUM_OXIDE] < 50 || creep.carry[RESOURCE_ZYNTHIUM_OXIDE] === undefined || creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                    if (creep.carry[RESOURCE_ZYNTHIUM_OXIDE] < 50 || creep.carry[RESOURCE_ZYNTHIUM_OXIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_ZYNTHIUM, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROXIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_HYDROXIDE] === 0 || creep.carry[RESOURCE_GHODIUM_HYDRIDE] === 0 && terminalGHODIUM_ACID < 5000 || terminalGHODIUM_ACID === undefined) {
                if (creep.carry[RESOURCE_GHODIUM_HYDRIDE] < 50 || creep.carry[RESOURCE_GHODIUM_HYDRIDE] === undefined || creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                    if (creep.carry[RESOURCE_GHODIUM_HYDRIDE] < 50 || creep.carry[RESOURCE_GHODIUM_HYDRIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_GHODIUM_HYDRIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROXIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_HYDROXIDE] === 0 || creep.carry[RESOURCE_GHODIUM_OXIDE] === 0 && terminalGHODIUM_ALKALIDE < 5000 || terminalGHODIUM_ALKALIDE === undefined) {
                if (creep.carry[RESOURCE_GHODIUM_OXIDE] < 50 || creep.carry[RESOURCE_GHODIUM_OXIDE] === undefined || creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                    if (creep.carry[RESOURCE_GHODIUM_OXIDE] < 50 || creep.carry[RESOURCE_GHODIUM_OXIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_GHODIUM_OXIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROXIDE] < 50 || creep.carry[RESOURCE_HYDROXIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROXIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }





///////////////////////////////
            else if (creep.carry[RESOURCE_CATALYST] === 0 || creep.carry[RESOURCE_UTRIUM_ACID] === 0 && terminalCATALYZED_UTRIUM_ACID < 5000 || terminalCATALYZED_UTRIUM_ACID === undefined) {
                if (creep.carry[RESOURCE_UTRIUM_ACID] < 50 || creep.carry[RESOURCE_UTRIUM_ACID] === undefined || creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                    if (creep.carry[RESOURCE_UTRIUM_ACID] < 50 || creep.carry[RESOURCE_UTRIUM_ACID] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_UTRIUM_ACID, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_CATALYST, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_CATALYST] === 0 || creep.carry[RESOURCE_UTRIUM_ALKALIDE] === 0 && terminalCATALYZED_UTRIUM_ALKALIDE < 5000 || terminalCATALYZED_UTRIUM_ALKALIDE === undefined) {
                if (creep.carry[RESOURCE_UTRIUM_ALKALIDE] < 50 || creep.carry[RESOURCE_UTRIUM_ALKALIDE] === undefined || creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                    if (creep.carry[RESOURCE_UTRIUM_ALKALIDE] < 50 || creep.carry[RESOURCE_UTRIUM_ALKALIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_UTRIUM_ALKALIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_CATALYST, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_CATALYST] === 0 || creep.carry[RESOURCE_KEANIUM_ACID] === 0 && terminalCATALYZED_KEANIUM_ACID < 5000 || terminalCATALYZED_KEANIUM_ACID === undefined) {
                if (creep.carry[RESOURCE_KEANIUM_ACID] < 50 || creep.carry[RESOURCE_KEANIUM_ACID] === undefined || creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                    if (creep.carry[RESOURCE_KEANIUM_ACID] < 50 || creep.carry[RESOURCE_KEANIUM_ACID] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_KEANIUM_ACID, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_CATALYST, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_CATALYST] === 0 || creep.carry[RESOURCE_KEANIUM_ALKALIDE] === 0 && terminalCATALYZED_KEANIUM_OXIDE < 5000 || terminalCATALYZED_KEANIUM_OXIDE === undefined) {
                if (creep.carry[RESOURCE_KEANIUM_ALKALIDE] < 50 || creep.carry[RESOURCE_KEANIUM_ALKALIDE] === undefined || creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                    if (creep.carry[RESOURCE_KEANIUM_ALKALIDE] < 50 || creep.carry[RESOURCE_KEANIUM_ALKALIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_KEANIUM_ALKALIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_CATALYST, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_CATALYST] === 0 || creep.carry[RESOURCE_LEMERGIUM_ACID] === 0 && terminalCATALYZED_LEMERGIUM_ACID < 5000 || terminalCATALYZED_LEMERGIUM_ACID === undefined) {
                if (creep.carry[RESOURCE_LEMERGIUM_ACID] < 50 || creep.carry[RESOURCE_LEMERGIUM_ACID] === undefined || creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                    if (creep.carry[RESOURCE_LEMERGIUM_ACID] < 50 || creep.carry[RESOURCE_LEMERGIUM_ACID] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_LEMERGIUM_ACID, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_CATALYST, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_CATALYST] === 0 || creep.carry[RESOURCE_LEMERGIUM_ALKALIDE] === 0 && terminalCATALYZED_LEMERGIUM_ALKALIDE < 5000 || terminalCATALYZED_LEMERGIUM_ALKALIDE === undefined) {
                if (creep.carry[RESOURCE_LEMERGIUM_ALKALIDE] < 50 || creep.carry[RESOURCE_LEMERGIUM_ALKALIDE] === undefined || creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                    if (creep.carry[RESOURCE_LEMERGIUM_ALKALIDE] < 50 || creep.carry[RESOURCE_LEMERGIUM_ALKALIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_LEMERGIUM_ALKALIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_CATALYST, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_CATALYST] === 0 || creep.carry[RESOURCE_ZYNTHIUM_ACID] === 0 && terminalCATALYZED_ZYNTHIUM_ACID < 5000 || terminalCATALYZED_ZYNTHIUM_ACID === undefined) {
                if (creep.carry[RESOURCE_ZYNTHIUM_ACID] < 50 || creep.carry[RESOURCE_ZYNTHIUM_ACID] === undefined || creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                    if (creep.carry[RESOURCE_ZYNTHIUM_ACID] < 50 || creep.carry[RESOURCE_ZYNTHIUM_ACID] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_ZYNTHIUM_ACID, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_CATALYST, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_CATALYST] === 0 || creep.carry[RESOURCE_ZYNTHIUM_ALKALIDE] === 0 && terminalCATALYZED_ZYNTHIUM_ALKALIDE < 5000 || terminalCATALYZED_ZYNTHIUM_ALKALIDE === undefined) {
                if (creep.carry[RESOURCE_ZYNTHIUM_ALKALIDE] < 50 || creep.carry[RESOURCE_ZYNTHIUM_ALKALIDE] === undefined || creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                    if (creep.carry[RESOURCE_ZYNTHIUM_ALKALIDE] < 50 || creep.carry[RESOURCE_ZYNTHIUM_ALKALIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_ZYNTHIUM, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_CATALYST, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_CATALYST] === 0 || creep.carry[RESOURCE_GHODIUM_ACID] === 0 && terminalCATALYZED_GHODIUM_ACID < 5000 || terminalCATALYZED_GHODIUM_ACID === undefined) {
                if (creep.carry[RESOURCE_GHODIUM_ACID] < 50 || creep.carry[RESOURCE_GHODIUM_ACID] === undefined || creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                    if (creep.carry[RESOURCE_GHODIUM_ACID] < 50 || creep.carry[RESOURCE_GHODIUM_ACID] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_GHODIUM_ACID, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_CATALYST, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (creep.carry[RESOURCE_CATALYST] > 0 || creep.carry[RESOURCE_GHODIUM_ALKALIDE] > 0 && terminalCATALYZED_GHODIUM_ALKALIDE < 5000 || terminalCATALYZED_GHODIUM_ALKALIDE === undefined) {
                if (creep.carry[RESOURCE_GHODIUM_ALKALIDE] < 50 || creep.carry[RESOURCE_GHODIUM_ALKALIDE] === undefined || creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                    if (creep.carry[RESOURCE_GHODIUM_ALKALIDE] < 50 || creep.carry[RESOURCE_GHODIUM_ALKALIDE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_GHODIUM_ALKALIDE, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_CATALYST] < 50 || creep.carry[RESOURCE_CATALYST] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_CATALYST, 50) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }


            else if(_.sum(creep.carry) > 0) {
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
    }
};