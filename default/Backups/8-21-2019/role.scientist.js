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
        else if (creep.memory.working === true && _.sum(creep.carry) === 0 && labMin < 100) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working === false && _.sum(creep.carry) === creep.carryCapacity) {
            // switch state
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

        //PICKUP


        if (creep.memory.working === true) {
            if (terminalHYDROXIDE < 5000 || terminalHYDROXIDE === undefined) {
                if (creep.carry[RESOURCE_OXYGEN] > 0 && lab2.mineralAmount < 100 ) {
                    if (creep.transfer(lab2, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab3.mineralAmount < 100) {
                    if (creep.transfer(lab3, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                }
                else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab5.mineralAmount < 100 ) {
                    if (creep.transfer(lab5, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab6.mineralAmount < 100) {
                    if (creep.transfer(lab6, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            }



            /*else if (RESOURCE_ZYNTHIUM < 5000 || terminalZYNTHIUM_KEANITE === undefined) {
                if (creep.carry[RESOURCE_ZYNTHIUM] > 0 && lab2.mineralAmount < 100 ) {
                    if (creep.transfer(lab2, RESOURCE_ZYNTHIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_KEANIUM] > 0 && lab3.mineralAmount < 100) {
                    if (creep.transfer(lab3, RESOURCE_KEANIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                }
                else if (creep.carry[RESOURCE_ZYNTHIUM] > 0 && lab5.mineralAmount < 100 ) {
                    if (creep.transfer(lab5, RESOURCE_ZYNTHIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_KEANIUM] > 0 && lab6.mineralAmount < 100) {
                    if (creep.transfer(lab6, RESOURCE_KEANIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            }*/



            else if (terminalUTRIUM_LEMERGITE < 5000 || terminalUTRIUM_LEMERGITE === undefined) {
                if (creep.carry[RESOURCE_UTRIUM] > 0 && lab2.mineralAmount < 100 ) {
                    if (creep.transfer(lab2, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_LEMERGIUM] > 0 && lab3.mineralAmount < 100) {
                    if (creep.transfer(lab3, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                }
                else if (creep.carry[RESOURCE_UTRIUM] > 0 && lab5.mineralAmount < 100 ) {
                    if (creep.transfer(lab5, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_LEMERGIUM] > 0 && lab6.mineralAmount < 100) {
                    if (creep.transfer(lab6, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            }



            /*else if (terminalGHODIUM < 5000 || terminalGHODIUM === undefined) {
                if (creep.carry[RESOURCE_ZYNTHIUM_KEANITE] > 0 && lab2.mineralAmount < 100 ) {
                    if (creep.transfer(lab2, RESOURCE_ZYNTHIUM_KEANITE) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_UTRIUM_LEMERGITE] > 0 && lab3.mineralAmount < 100) {
                    if (creep.transfer(lab3, RESOURCE_UTRIUM_LEMERGITE) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                }
                else if (creep.carry[RESOURCE_ZYNTHIUM_KEANITE] > 0 && lab5.mineralAmount < 100 ) {
                    if (creep.transfer(lab5, RESOURCE_ZYNTHIUM_KEANITE) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_UTRIUM_LEMERGITE] > 0 && lab6.mineralAmount < 100) {
                    if (creep.transfer(lab6, RESOURCE_UTRIUM_LEMERGITE) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            }*/






            else if (terminalUTRIUM_HYDRIDE < 5000 || terminalUTRIUM_HYDRIDE === undefined) {
                if (creep.carry[RESOURCE_UTRIUM] > 0 && lab2.mineralAmount < 100 ) {
                    if (creep.transfer(lab2, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab3.mineralAmount < 100) {
                    if (creep.transfer(lab3, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                }
                else if (creep.carry[RESOURCE_UTRIUM] > 0 && lab5.mineralAmount < 100 ) {
                    if (creep.transfer(lab5, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab6.mineralAmount < 100) {
                    if (creep.transfer(lab6, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            }


            else if (terminalUTRIUM_OXIDE < 5000 || terminalUTRIUM_OXIDE === undefined) {
                if (creep.carry[RESOURCE_UTRIUM] > 0 && lab2.mineralAmount < 100 ) {
                    if (creep.transfer(lab2, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab3.mineralAmount < 100) {
                    if (creep.transfer(lab3, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                }
                else if (creep.carry[RESOURCE_UTRIUM] > 0 && lab5.mineralAmount < 100 ) {
                    if (creep.transfer(lab5, RESOURCE_UTRIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab6.mineralAmount < 100) {
                    if (creep.transfer(lab6, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            }



            else if (terminalLEMERGIUM_HYDRIDE < 5000 || terminalLEMERGIUM_HYDRIDE === undefined) {
                if (creep.carry[RESOURCE_LEMERGIUM] > 0 && lab2.mineralAmount < 100 ) {
                    if (creep.transfer(lab2, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab3.mineralAmount < 100) {
                    if (creep.transfer(lab3, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                }
                else if (creep.carry[RESOURCE_LEMERGIUM] > 0 && lab5.mineralAmount < 100 ) {
                    if (creep.transfer(lab5, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab6.mineralAmount < 100) {
                    if (creep.transfer(lab6, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            }



            else if (terminalLEMERGIUM_OXIDE < 5000 || terminalLEMERGIUM_OXIDE === undefined) {
                if (creep.carry[RESOURCE_LEMERGIUM] > 0 && lab2.mineralAmount < 100 ) {
                    if (creep.transfer(lab2, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab3.mineralAmount < 100) {
                    if (creep.transfer(lab3, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                }
                else if (creep.carry[RESOURCE_LEMERGIUM] > 0 && lab5.mineralAmount < 100 ) {
                    if (creep.transfer(lab5, RESOURCE_LEMERGIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab6.mineralAmount < 100) {
                    if (creep.transfer(lab6, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            }



            else if (terminalZYNTHIUM_HYDRIDE < 5000 || terminalZYNTHIUM_HYDRIDE === undefined) {
                if (creep.carry[RESOURCE_ZYNTHIUM] > 0 && lab2.mineralAmount < 100 ) {
                    if (creep.transfer(lab2, RESOURCE_ZYNTHIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab3.mineralAmount < 100) {
                    if (creep.transfer(lab3, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                }
                else if (creep.carry[RESOURCE_ZYNTHIUM] > 0 && lab5.mineralAmount < 100 ) {
                    if (creep.transfer(lab5, RESOURCE_ZYNTHIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab6.mineralAmount < 100) {
                    if (creep.transfer(lab6, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            }



            else if (terminalZYNTHIUM_OXIDE < 5000 || terminalZYNTHIUM_OXIDE === undefined) {
                if (creep.carry[RESOURCE_ZYNTHIUM] > 0 && lab2.mineralAmount < 100 ) {
                    if (creep.transfer(lab2, RESOURCE_ZYNTHIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab3.mineralAmount < 100) {
                    if (creep.transfer(lab3, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                }
                else if (creep.carry[RESOURCE_ZYNTHIUM] > 0 && lab5.mineralAmount < 100 ) {
                    if (creep.transfer(lab5, RESOURCE_ZYNTHIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab6.mineralAmount < 100) {
                    if (creep.transfer(lab6, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            }



            else if (terminalGHODIUM_HYDRIDE < 5000 || terminalGHODIUM_HYDRIDE === undefined) {
                if (creep.carry[RESOURCE_GHODIUM] > 0 && lab2.mineralAmount < 100 ) {
                    if (creep.transfer(lab2, RESOURCE_GHODIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab3.mineralAmount < 100) {
                    if (creep.transfer(lab3, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                }
                else if (creep.carry[RESOURCE_GHODIUM] > 0 && lab5.mineralAmount < 100 ) {
                    if (creep.transfer(lab5, RESOURCE_GHODIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_HYDROGEN] > 0 && lab6.mineralAmount < 100) {
                    if (creep.transfer(lab6, RESOURCE_HYDROGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            }



            else if (terminalGHODIUM_OXIDE < 5000 || terminalGHODIUM_OXIDE === undefined) {
                if (creep.carry[RESOURCE_GHODIUM] > 0 && lab2.mineralAmount < 100 ) {
                    if (creep.transfer(lab2, RESOURCE_GHODIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab2)
                    }
                } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab3.mineralAmount < 100) {
                    if (creep.transfer(lab3, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab3)
                    }
                }
                else if (creep.carry[RESOURCE_GHODIUM] > 0 && lab5.mineralAmount < 100 ) {
                    if (creep.transfer(lab5, RESOURCE_GHODIUM) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab5)
                    }
                } else if (creep.carry[RESOURCE_OXYGEN] > 0 && lab6.mineralAmount < 100) {
                    if (creep.transfer(lab6, RESOURCE_OXYGEN) === ERR_NOT_IN_RANGE) {
                        // move towards it
                        creep.travelTo(lab6)
                    }
                }
            }



        }

        else if (creep.memory.working === false) {

            /*if (lab2.mineralAmount < 30) {
                creep.withdraw(lab2,lab2.mineralType)
            }
            if (lab3.mineralAmount < 30) {
                creep.withdraw(lab3,lab3.mineralType)
            }
            if (lab5.mineralAmount < 30) {
                creep.withdraw(lab5,lab5.mineralType)
            }
            if (lab6.mineralAmount < 30) {
                creep.withdraw(lab6,lab6.mineralType)
            }*/
            /*if(_.sum(creep.carry) > 0 || _.sum(creep.carry) < 50) {
                creep.transfer(creep.room.terminal,RESOURCE_UTRIUM)
            }*/



            if (terminalHYDROXIDE < 5000 || terminalHYDROXIDE === undefined) {
                if (creep.carry[RESOURCE_HYDROGEN] < 25 || creep.carry[RESOURCE_HYDROGEN] === undefined || creep.carry[RESOURCE_OXYGEN] < 25 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                    if (creep.carry[RESOURCE_HYDROGEN] < 25 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROGEN, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_OXYGEN] < 25 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_OXYGEN, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            /*else if (terminalZYNTHIUM_KEANITE < 5000 || terminalZYNTHIUM_KEANITE === undefined) {
                if (creep.carry[RESOURCE_ZYNTHIUM] < 25 || creep.carry[RESOURCE_ZYNTHIUM] === undefined || creep.carry[RESOURCE_KEANIUM] < 25 || creep.carry[RESOURCE_KEANIUM] === undefined) {
                    if (creep.carry[RESOURCE_ZYNTHIUM] < 25 || creep.carry[RESOURCE_ZYNTHIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_ZYNTHIUM, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_KEANIUM] < 25 || creep.carry[RESOURCE_KEANIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_KEANIUM, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }*/



            else if (terminalUTRIUM_LEMERGITE < 5000 || terminalUTRIUM_LEMERGITE === undefined) {
                if (creep.carry[RESOURCE_UTRIUM] < 25 || creep.carry[RESOURCE_UTRIUM] === undefined || creep.carry[RESOURCE_LEMERGIUM] < 25 || creep.carry[RESOURCE_LEMERGIUM] === undefined) {
                    if (creep.carry[RESOURCE_UTRIUM] < 25 || creep.carry[RESOURCE_UTRIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_UTRIUM, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_LEMERGIUM] < 25 || creep.carry[RESOURCE_LEMERGIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_LEMERGIUM, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            /*else if (terminalGHODIUM < 5000 || terminalGHODIUM === undefined) {
                if (creep.carry[RESOURCE_ZYNTHIUM_KEANITE] < 25 || creep.carry[RESOURCE_ZYNTHIUM_KEANITE] === undefined || creep.carry[RESOURCE_UTRIUM_LEMERGITE] < 25 || creep.carry[RESOURCE_UTRIUM_LEMERGITE] === undefined) {
                    if (creep.carry[RESOURCE_HYDROGEN] < 25 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_ZYNTHIUM_KEANITE, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_UTRIUM_LEMERGITE] < 25 || creep.carry[RESOURCE_UTRIUM_LEMERGITE] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_UTRIUM_LEMERGITE, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }*/







            else if (terminalUTRIUM_HYDRIDE < 5000 || terminalUTRIUM_HYDRIDE === undefined) {
                if (creep.carry[RESOURCE_UTRIUM] < 25 || creep.carry[RESOURCE_UTRIUM] === undefined || creep.carry[RESOURCE_HYDROGEN] < 25 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                    if (creep.carry[RESOURCE_UTRIUM] < 25 || creep.carry[RESOURCE_UTRIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_UTRIUM, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROGEN] < 25 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROGEN, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (terminalUTRIUM_OXIDE < 5000 || terminalUTRIUM_OXIDE === undefined) {
                if (creep.carry[RESOURCE_UTRIUM] < 25 || creep.carry[RESOURCE_UTRIUM] === undefined || creep.carry[RESOURCE_OXYGEN] < 25 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                    if (creep.carry[RESOURCE_UTRIUM] < 25 || creep.carry[RESOURCE_UTRIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_UTRIUM, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_OXYGEN] < 25 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_OXYGEN, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            /*else if (terminalKEANIUM_HYDRIDE < 5000 || terminalKEANIUM_HYDRIDE === undefined) {
                if (creep.carry[RESOURCE_KEANIUM] < 25 || creep.carry[RESOURCE_KEANIUM] === undefined || creep.carry[RESOURCE_HYDROGEN] < 25 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                    if (creep.carry[RESOURCE_KEANIUM] < 25 || creep.carry[RESOURCE_KEANIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_KEANIUM, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROGEN] < 25 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROGEN, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (terminalKEANIUM_OXIDE < 5000 || terminalKEANIUM_OXIDE === undefined) {
                if (creep.carry[RESOURCE_KEANIUM] < 25 || creep.carry[RESOURCE_KEANIUM] === undefined || creep.carry[RESOURCE_OXYGEN] < 25 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                    if (creep.carry[RESOURCE_KEANIUM] < 25 || creep.carry[RESOURCE_KEANIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_KEANIUM, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_OXYGEN] < 25 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_OXYGEN, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }*/



            else if (terminalLEMERGIUM_HYDRIDE < 5000 || terminalLEMERGIUM_HYDRIDE === undefined) {
                if (creep.carry[RESOURCE_LEMERGIUM] < 25 || creep.carry[RESOURCE_LEMERGIUM] === undefined || creep.carry[RESOURCE_HYDROGEN] < 25 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                    if (creep.carry[RESOURCE_LEMERGIUM] < 25 || creep.carry[RESOURCE_LEMERGIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_LEMERGIUM, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROGEN] < 25 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROGEN, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (terminalLEMERGIUM_OXIDE < 5000 || terminalLEMERGIUM_OXIDE === undefined) {
                if (creep.carry[RESOURCE_LEMERGIUM] < 25 || creep.carry[RESOURCE_LEMERGIUM] === undefined || creep.carry[RESOURCE_HYDROGEN] < 25 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                    if (creep.carry[RESOURCE_LEMERGIUM] < 25 || creep.carry[RESOURCE_LEMERGIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_LEMERGIUM, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_OXYGEN] < 25 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_OXYGEN, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            /*else if (terminalZYNTHIUM_HYDRIDE < 5000 || terminalZYNTHIUM_HYDRIDE === undefined) {
                if (creep.carry[RESOURCE_ZYNTHIUM] < 25 || creep.carry[RESOURCE_ZYNTHIUM] === undefined || creep.carry[RESOURCE_HYDROGEN] < 25 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                    if (creep.carry[RESOURCE_ZYNTHIUM] < 25 || creep.carry[RESOURCE_ZYNTHIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_ZYNTHIUM, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROGEN] < 25 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROGEN, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (terminalZYNTHIUM_OXIDE < 5000 || terminalZYNTHIUM_OXIDE === undefined) {
                if (creep.carry[RESOURCE_ZYNTHIUM] < 25 || creep.carry[RESOURCE_ZYNTHIUM] === undefined || creep.carry[RESOURCE_OXYGEN] < 25 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                    if (creep.carry[RESOURCE_ZYNTHIUM] < 25 || creep.carry[RESOURCE_ZYNTHIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_ZYNTHIUM, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_OXYGEN] < 25 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_OXYGEN, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (terminalGHODIUM_HYDRIDE < 5000 || terminalGHODIUM_HYDRIDE === undefined) {
                if (creep.carry[RESOURCE_GHODIUM] < 25 || creep.carry[RESOURCE_GHODIUM] === undefined || creep.carry[RESOURCE_HYDROGEN] < 25 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                    if (creep.carry[RESOURCE_GHODIUM] < 25 || creep.carry[RESOURCE_GHODIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_GHODIUM, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_HYDROGEN] < 25 || creep.carry[RESOURCE_HYDROGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_HYDROGEN, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }



            else if (terminalGHODIUM_OXIDE < 5000 || terminalGHODIUM_OXIDE === undefined) {
                if (creep.carry[RESOURCE_GHODIUM] < 25 || creep.carry[RESOURCE_GHODIUM] === undefined || creep.carry[RESOURCE_OXYGEN] < 25 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                    if (creep.carry[RESOURCE_GHODIUM] < 25 || creep.carry[RESOURCE_GHODIUM] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_GHODIUM, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                    if (creep.carry[RESOURCE_OXYGEN] < 25 || creep.carry[RESOURCE_OXYGEN] === undefined) {
                        if (creep.withdraw(creep.room.terminal, RESOURCE_OXYGEN, 25) === ERR_NOT_IN_RANGE) {
                            // move towards it
                            creep.travelTo(creep.room.terminal)
                        }
                    }
                }
            }*/



        }
    }
};