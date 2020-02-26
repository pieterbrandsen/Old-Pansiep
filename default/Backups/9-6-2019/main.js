//Import roles
require('prototype.tower');

const traveler = require('traveler');
const roleAttacker = require('role.attacker');

const roleHarvesterSource = require('role.harvesterSource');
const roleHarvesterContainer = require('role.harvesterContainer');
const roleHarvesterLink = require('role.harvesterLink');
const roleExtractor = require('role.extractor');


const roleUpgraderSource = require('role.upgraderSource');
const roleUpgraderContainer = require('role.upgraderContainer');
const roleUpgraderLink = require('role.upgraderLink');
const roleUpgraderTerminal = require('role.upgraderTerminal');

const roleTransfererSource = require('role.transfererSource');
const roleTransfererContainer = require('role.transfererContainer');
const roleTransfererLink = require('role.transfererLink');
const roleTransfererLinkToTerminal = require('role.transfererLinkToTerminal');
const roleTransfererTerminal = require('role.transfererTerminal');


const roleBuilderSource = require('role.builderSources');
const roleBuilderContainer = require('role.builderContainer');
const roleBuilderLink= require('role.builderLink');
const roleBuilderTerminal = require('role.builderTerminal');


const roleWallRepairerContainer = require('role.wallRepairerContainer');
//const roleWallRepairerLink = require('role.wallRepairerLink');
const roleWallRepairerTerminal = require('role.wallRepairerTerminal');


const roleRepairerContainer = require('role.repairerContainer');
const roleRepairerLink = require('role.repairerLink');
const roleRepairerTerminal = require('role.repairerTerminal');


const roleTombstonePickerContainer = require('role.tombstonePickerContainer');
const roleTombstonePickerLink = require('role.tombstonePickerLink');
const roleTombstonePickerTerminal = require('role.tombstonePickerTerminal');


const roleClaimer = require('role.claimer');
const roleReserver = require('role.reserver');
const roleDismantler = require('role.dismantle');
//longDistanceHarvesterCoE44N32
//longDistanceHarvesterCoE44N31

const roleScientist = require('role.scientist');
const roleLabPick = require('role.labPick');



const roleLongdistanceBuilderSource = require('role.longDistanceBuilderSource');
const roleLongdistanceBuilderContainer = require('role.longDistanceBuilderContainer');
const roleLongdistanceBuilderLink = require('role.longDistanceBuilderLink');
const roleLongdistanceBuilderTerminal = require('role.longDistanceBuilderTerminal');


const roleLongDistanceHarvesterSource = require('role.longDistanceHarvesterSource');
const roleLongDistanceHarvesterContainer = require('role.longDistanceHarvesterContainer');
const roleLongDistanceHarvesterLink = require('role.longDistanceHarvesterLink');
const roleLongDistanceHarvesterTerminal = require('role.longDistanceHarvesterTerminal');


const roleLongDistanceUpgraderContainer = require('role.longDistanceHarvesterUpgraderContainer');
const roleLongDistanceUpgraderLink = require('role.longDistanceHarvesterUpgraderLink');
const roleLongDistanceUpgraderTerminal = require('role.longDistanceHarvesterUpgraderTerminal');

const roleLongDistanceTransfererTerminal = require('role.longDistanceTransfererTerminal');


const profiler = require('screeps-profiler');

// This line monkey patches the global prototypes.
profiler.enable();
module.exports.loop = function() {
    profiler.wrap(function() {
        //let cpu = Game.cpu.getUsed();
        //Memory.stats['cpu.test.cpu'] = cpu;

        //console.log('Begin1: ' + cpu)

        /*for (let name in Game.creeps) {
            // get the creep object
            let creep = Game.creeps[name];
            const van = creep.pos.findInRange(FIND_CREEPS, 50);
            if (van.length > 0) {
                creep.say('🚐 VAN 🚐')
            }
        }*/
        //Send Energy From Mining Link To Head Link
        const linkFrom11 = Game.getObjectById("5d2d8e9adbfe1b628e83c414");
        const linkTo1 = Game.getObjectById("5d2d8745e9ffb93fbdf51d0c");
        const linkFrom12 = Game.getObjectById("5d36b82aab0b117cdc03b16b");
        linkFrom11.transferEnergy(linkTo1);
        linkFrom12.transferEnergy(linkTo1);


        const linkFrom21 = Game.getObjectById("5d47fc70de98312b1d990ff0");
        const linkTo2 = Game.getObjectById("5d389279496c40170746c670");
        const linkFrom22 = Game.getObjectById("5d38856cc99c215de2febacd");
        linkFrom21.transferEnergy(linkTo2);
        linkFrom22.transferEnergy(linkTo2);


        const linkFrom31 = Game.getObjectById("5d38a7eb5c57a23fff55bb4c");
        const linkTo3 = Game.getObjectById("5d388e83c08d9e7cff86ec68");
        const linkFrom32 = Game.getObjectById("5d49a74566d7ea40916001c0");
        linkFrom31.transferEnergy(linkTo3);
        linkFrom32.transferEnergy(linkTo3);


        const linkFrom41 = Game.getObjectById("5d6fef036db51a75659d9308");
        const linkTo41 = Game.getObjectById("5d4f03abe360cc20d4c03077");
        const linkFrom42 = Game.getObjectById("5d59ae9e3b552d638902b9f8");
        linkFrom41.transferEnergy(linkTo41);
        linkFrom42.transferEnergy(linkTo41);


        const linkFrom51 = Game.getObjectById("5d5bf39b980b3520ebb8f2fb");
        const linkTo51 = Game.getObjectById("5d5bdd64415b51747a6d35d9");
        linkFrom51.transferEnergy(linkTo51);




        //Find Terminals

        const terminalt1 = Game.rooms['E43N3'].terminal.store[RESOURCE_ENERGY];
        const terminalt2 = Game.rooms['E43N2'].terminal.store[RESOURCE_ENERGY];
        const terminalt3 = Game.rooms['E42N2'].terminal.store[RESOURCE_ENERGY];
        const terminalt4 = Game.rooms['E42N3'].terminal.store[RESOURCE_ENERGY];
        const terminalt5 = Game.rooms['E42N1'].terminal.store[RESOURCE_ENERGY];




        //const storaget1 = Game.rooms['E43N3'].storage.store[RESOURCE_ENERGY];
        const storaget2 = Game.rooms['E43N2'].storage.store[RESOURCE_ENERGY];
        const storaget3 = Game.rooms['E42N2'].storage.store[RESOURCE_ENERGY];
        const storaget4 = Game.rooms['E42N3'].storage.store[RESOURCE_ENERGY];
        const storaget5 = Game.rooms['E42N1'].storage.store[RESOURCE_ENERGY];


        const terminal1 = Game.rooms['E43N3'].terminal;
        const terminal2 = Game.rooms['E43N2'].terminal;
        const terminal3 = Game.rooms['E42N2'].terminal;
        const terminal4 = Game.rooms['E42N3'].terminal;
        const terminal5 = Game.rooms['E42N1'].terminal;

        let terminalTMi = Math.min(terminalt1, terminalt2, terminalt3, terminalt4,terminalt5);
        let terminalTMa = Math.max(terminalt1, terminalt2, terminalt3, terminalt4,terminalt5);
        let terminalSend = 10000;

        if (terminalTMa !== undefined && (terminalTMi * 2 < terminalTMa)) {
            if (terminalt1 === terminalTMa) {
                if (terminalt2 === terminalTMi) {
                    if (terminalTMa - terminalSend > terminalt2) {
                        terminal1.send(RESOURCE_ENERGY, terminalSend, 'E43N2', 'Max to Min')
                    }
                }
                if (terminalt3 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal1.send(RESOURCE_ENERGY, terminalSend, 'E42N2', 'Max to Min')
                    }
                }
                if (terminalt4 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal1.send(RESOURCE_ENERGY, terminalSend, 'E42N3', 'Max to Min')
                    }
                }
                if (terminalt5 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal1.send(RESOURCE_ENERGY, terminalSend, 'E42N1', 'Max to Min')
                    }
                }
            }

            if (terminalt2 === terminalTMa) {
                if (terminalt1 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal2.send(RESOURCE_ENERGY, terminalSend, 'E43N3', 'Max to Min')
                    }
                }
                if (terminalt3 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal2.send(RESOURCE_ENERGY, terminalSend, 'E42N2', 'Max to Min')
                    }
                }
                if (terminalt4 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal2.send(RESOURCE_ENERGY, terminalSend, 'E42N3', 'Max to Min')
                    }
                }
                if (terminalt5 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal2.send(RESOURCE_ENERGY, terminalSend, 'E42N1', 'Max to Min')
                    }
                }
            }
            
            if (terminalt3 === terminalTMa) {
                if (terminalt1 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal3.send(RESOURCE_ENERGY, terminalSend, 'E43N3', 'Max to Min')
                    }
                }
                if (terminalt2 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal3.send(RESOURCE_ENERGY, terminalSend, 'E43N2', 'Max to Min')
                    }
                }
                if (terminalt4 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal3.send(RESOURCE_ENERGY, terminalSend, 'E42N3', 'Max to Min')
                    }
                }
                if (terminalt5 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal3.send(RESOURCE_ENERGY, terminalSend, 'E42N1', 'Max to Min')
                    }
                }
            }

            if (terminalt4 === terminalTMa) {
                if (terminalt1 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal4.send(RESOURCE_ENERGY, terminalSend, 'E43N3', 'Max to Min')
                    }
                }
                if (terminalt2 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal4.send(RESOURCE_ENERGY, terminalSend, 'E43N2', 'Max to Min')
                    }
                }
                if (terminalt3 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal4.send(RESOURCE_ENERGY, terminalSend, 'E42N2', 'Max to Min')
                    }
                }
                if (terminalt5 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal4.send(RESOURCE_ENERGY, terminalSend, 'E42N1', 'Max to Min')
                    }
                }
            }

            if (terminalt5 === terminalTMa) {
                if (terminalt1 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal5.send(RESOURCE_ENERGY, terminalSend, 'E43N3', 'Max to Min')
                    }
                }
                if (terminalt2 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal5.send(RESOURCE_ENERGY, terminalSend, 'E43N2', 'Max to Min')
                    }
                }
                if (terminalt3 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal5.send(RESOURCE_ENERGY, terminalSend, 'E42N2', 'Max to Min')
                    }
                }
                if (terminalt4 === terminalTMi) {
                    if (terminalSend > terminalTMi) {
                        terminal5.send(RESOURCE_ENERGY, terminalSend, 'E42N3', 'Max to Min')
                    }
                }
            }
        }
        let terminalTotal = (terminalt1 + terminalt2 + terminalt3 + terminalt4 + terminalt5);
        //let storageTotal = (storaget1 + storaget2 + storaget3);

        if (Game.time % 50 === 0) {
            console.log(terminalTotal + ' Total Energy, ' + terminalTMi + ' Min Energy, ' + terminalTMa + ' Max Energy');
        }
        if (terminalTotal > 300 * 1000) {
            Game.notify('Terminal Total Has More Then 300K Energy!'&& terminalTotal)
        }


        // find all towers
        let towers = _.filter(Game.structures, s => s.structureType === STRUCTURE_TOWER);
        // for each tower
        for (let tower of towers) {
            // run tower logic
            tower.defend();
        }


        let towers11 = Game.rooms.E43N3.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_TOWER
        });
        for (let tower11 of towers11) {
            let targetRepair11 = tower11.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.hits < 250000
            });
            if (targetRepair11 !== undefined) {
                tower11.repair(targetRepair11);
            }
        }
        let towers21 = Game.rooms.E43N2.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_TOWER
        });
        for (let tower21 of towers21) {
            let targetRepair21 = tower21.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.hits < 250000
            });
            if (targetRepair21 !== undefined) {
                tower21.repair(targetRepair21);
            }
        }
        let towers31 = Game.rooms.E42N2.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_TOWER
        });
        for (let tower31 of towers31) {
            let targetRepair31 = tower31.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.hits < 250000
            });
            if (targetRepair31 !== undefined) {
                tower31.repair(targetRepair31);
            }
        }
        let towers41 = Game.rooms.E42N3.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_TOWER
        });
        for (let tower41 of towers41) {
            let targetRepair41 = tower41.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.hits < 250000
            });
            if (targetRepair41 !== undefined) {
                tower41.repair(targetRepair41);
            }
        }
        let towers51 = Game.rooms.E42N1.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_TOWER
        });
        for (let tower51 of towers51) {
            let targetRepair51 = tower51.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.hits < 250000
            });
            if (targetRepair51 !== undefined) {
                tower51.repair(targetRepair51);
            }
        }





        //LAB CODE
        let room;
        let terminalENERGY;
        let terminalHYDROGEN;
        let terminalOXYGEN;
        let terminalUTRIUM;
        let terminalKEANIUM;
        let terminalLEMERGIUM;
        let terminalZYNTHIUM;
        let terminalCATALYST;

        //BASE COMPOUNDS

        let terminalHYDROXIDE;
        let terminalZYNTHIUM_KEANITE;
        let terminalUTRIUM_LEMERGITE;
        let terminalGHODIUM;

        //TIER 1 COMPOUNDS

        let terminalUTRIUM_HYDRIDE;
        let terminalUTRIUM_OXIDE;
        let terminalKEANIUM_HYDRIDE;
        let terminalKEANIUM_OXIDE;
        let terminalLEMERGIUM_HYDRIDE;
        let terminalLEMERGIUM_OXIDE;
        let terminalZYNTHIUM_HYDRIDE;
        let terminalZYNTHIUM_OXIDE;
        let terminalGHODIUM_HYDRIDE;
        let terminalGHODIUM_OXIDE;

        //MINERALS
        room = 'E43N3';
        terminalENERGY = Game.rooms[room].terminal.store[RESOURCE_ENERGY];

        terminalHYDROGEN = Game.rooms[room].terminal.store[RESOURCE_HYDROGEN];


        terminalOXYGEN = Game.rooms[room].terminal.store[RESOURCE_OXYGEN];

        terminalUTRIUM = Game.rooms[room].terminal.store[RESOURCE_UTRIUM];

        terminalKEANIUM = Game.rooms[room].terminal.store[RESOURCE_KEANIUM];

        terminalLEMERGIUM = Game.rooms[room].terminal.store[RESOURCE_LEMERGIUM];

        terminalZYNTHIUM = Game.rooms[room].terminal.store[RESOURCE_ZYNTHIUM];

        terminalCATALYST = Game.rooms[room].terminal.store[RESOURCE_CATALYST];


        //if (terminalHYDROGEN < 5000 || terminalHYDROGEN === undefined) {
        //    terminal1.send(RESOURCE_HYDROGEN, 1000, room)
        //}
        if (terminalOXYGEN < 5000 || terminalOXYGEN === undefined) {
            terminal3.send(RESOURCE_OXYGEN, 1000, room)
        }
        if (terminalUTRIUM < 5000 || terminalUTRIUM === undefined) {
            terminal4.send(RESOURCE_UTRIUM, 1000, room)
        }
        if (terminalKEANIUM < 5000 || terminalKEANIUM === undefined) {
            terminal2.send(RESOURCE_KEANIUM, 1000, room)
        }
        if (terminalLEMERGIUM < 5000 || terminalLEMERGIUM === undefined) {
            terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
        }
        /*if (terminalZYNTHIUM < 5000 || terminalZYNTHIUM === undefined) {
            terminal2.send(RESOURCE_ZYNTHIUM, 1000, room')
        }*/
        /*if (terminalCATALYST < 5000 || terminalCATALYST === undefined) {
            terminal2.send(RESOURCE_CATALYST, 1000, room')
        }*/




        //MINERALS
        room = 'E43N2';
        terminalENERGY = Game.rooms[room].terminal.store[RESOURCE_ENERGY];

        terminalHYDROGEN = Game.rooms[room].terminal.store[RESOURCE_HYDROGEN];


        terminalOXYGEN = Game.rooms[room].terminal.store[RESOURCE_OXYGEN];

        terminalUTRIUM = Game.rooms[room].terminal.store[RESOURCE_UTRIUM];

        terminalKEANIUM = Game.rooms[room].terminal.store[RESOURCE_KEANIUM];

        terminalLEMERGIUM = Game.rooms[room].terminal.store[RESOURCE_LEMERGIUM];

        terminalZYNTHIUM = Game.rooms[room].terminal.store[RESOURCE_ZYNTHIUM];

        terminalCATALYST = Game.rooms[room].terminal.store[RESOURCE_CATALYST];


        if (terminalHYDROGEN < 5000 || terminalHYDROGEN === undefined) {
            terminal1.send(RESOURCE_HYDROGEN, 1000, room)
        }
        if (terminalOXYGEN < 5000 || terminalOXYGEN === undefined) {
            terminal3.send(RESOURCE_OXYGEN, 1000, room)
        }
        if (terminalUTRIUM < 5000 || terminalUTRIUM === undefined) {
            terminal4.send(RESOURCE_UTRIUM, 1000, room)
        }
        //if (terminalKEANIUM < 5000 || terminalKEANIUM === undefined) {
        //    terminal2.send(RESOURCE_KEANIUM, 1000, room)
        //}
        //if (terminalLEMERGIUM < 5000 || terminalLEMERGIUM === undefined) {
        //    terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
        //}
        /*if (terminalZYNTHIUM < 5000 || terminalZYNTHIUM === undefined) {
            terminal2.send(RESOURCE_ZYNTHIUM, 1000, room')
        }*/
        /*if (terminalCATALYST < 5000 || terminalCATALYST === undefined) {
            terminal2.send(RESOURCE_CATALYST, 1000, room')
        }*/





        //MINERALS
        room = 'E42N2';
        terminalENERGY = Game.rooms[room].terminal.store[RESOURCE_ENERGY];

        terminalHYDROGEN = Game.rooms[room].terminal.store[RESOURCE_HYDROGEN];


        terminalOXYGEN = Game.rooms[room].terminal.store[RESOURCE_OXYGEN];

        terminalUTRIUM = Game.rooms[room].terminal.store[RESOURCE_UTRIUM];

        terminalKEANIUM = Game.rooms[room].terminal.store[RESOURCE_KEANIUM];

        terminalLEMERGIUM = Game.rooms[room].terminal.store[RESOURCE_LEMERGIUM];

        terminalZYNTHIUM = Game.rooms[room].terminal.store[RESOURCE_ZYNTHIUM];

        terminalCATALYST = Game.rooms[room].terminal.store[RESOURCE_CATALYST];


        if (terminalHYDROGEN < 5000 || terminalHYDROGEN === undefined) {
            terminal1.send(RESOURCE_HYDROGEN, 1000, room)
        }
        //if (terminalOXYGEN < 5000 || terminalOXYGEN === undefined) {
        //    terminal3.send(RESOURCE_OXYGEN, 1000, room)
        //}
        if (terminalUTRIUM < 5000 || terminalUTRIUM === undefined) {
            terminal4.send(RESOURCE_UTRIUM, 1000, room)
        }
        if (terminalKEANIUM < 5000 || terminalKEANIUM === undefined) {
            terminal2.send(RESOURCE_KEANIUM, 1000, room)
        }
        if (terminalLEMERGIUM < 5000 || terminalLEMERGIUM === undefined) {
            terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
        }
        /*if (terminalZYNTHIUM < 5000 || terminalZYNTHIUM === undefined) {
            terminal2.send(RESOURCE_ZYNTHIUM, 1000, room')
        }*/
        /*if (terminalCATALYST < 5000 || terminalCATALYST === undefined) {
            terminal2.send(RESOURCE_CATALYST, 1000, room')
        }*/






        //MINERALS
        room = 'E42N2';
        terminalENERGY = Game.rooms[room].terminal.store[RESOURCE_ENERGY];

        terminalHYDROGEN = Game.rooms[room].terminal.store[RESOURCE_HYDROGEN];


        terminalOXYGEN = Game.rooms[room].terminal.store[RESOURCE_OXYGEN];

        terminalUTRIUM = Game.rooms[room].terminal.store[RESOURCE_UTRIUM];

        terminalKEANIUM = Game.rooms[room].terminal.store[RESOURCE_KEANIUM];

        terminalLEMERGIUM = Game.rooms[room].terminal.store[RESOURCE_LEMERGIUM];

        terminalZYNTHIUM = Game.rooms[room].terminal.store[RESOURCE_ZYNTHIUM];

        terminalCATALYST = Game.rooms[room].terminal.store[RESOURCE_CATALYST];

        if (terminalHYDROGEN < 5000 || terminalHYDROGEN === undefined) {
            terminal1.send(RESOURCE_HYDROGEN, 1000, room)
        }
        if (terminalOXYGEN < 5000 || terminalOXYGEN === undefined) {
            terminal3.send(RESOURCE_OXYGEN, 1000, room)
        }
        //if (terminalUTRIUM < 5000 || terminalUTRIUM === undefined) {
        //    terminal4.send(RESOURCE_UTRIUM, 1000, room)
        //}
        if (terminalKEANIUM < 5000 || terminalKEANIUM === undefined) {
            terminal2.send(RESOURCE_KEANIUM, 1000, room)
        }
        if (terminalLEMERGIUM < 5000 || terminalLEMERGIUM === undefined) {
            terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
        }
        /*if (terminalZYNTHIUM < 5000 || terminalZYNTHIUM === undefined) {
            terminal2.send(RESOURCE_ZYNTHIUM, 1000, room')
        }*/
        /*if (terminalCATALYST < 5000 || terminalCATALYST === undefined) {
            terminal2.send(RESOURCE_CATALYST, 1000, room')
        }*/







        // Check if creep died
        for (let name in Memory.creeps) {
            // and checking if the creep is still alive
            if (Game.creeps[name] === undefined) {
                // if not, delete the memory entry
                delete Memory.creeps[name];
            }
        }

        // Every creep name in Game.creeps
        for (let name in Game.creeps) {
            // get the creep object
            let creep = Game.creeps[name];




            if (creep.memory.role === 'dismantler') {
                roleDismantler.run(creep);
            }
            if (creep.memory.role === 'attackerE43N4') {
                roleAttacker.run(creep);
            }

            if (creep.memory.role === 'claimer') {
                roleClaimer.run(creep);
            }

            if (creep.memory.role === 'scientist') {
                roleScientist.run(creep);
            }
            if (creep.memory.role === 'labPick') {
                roleLabPick.run(creep);
            }

            if (creep.memory.role === 'longDistanceReserver1') {
                roleReserver.run(creep);
            }
            if (creep.memory.role === 'longDistanceReserver2') {
                roleReserver.run(creep);
            }

            //LONG DISTANCE

            if (creep.memory.role === 'longDistanceHarvester11') {
                roleLongDistanceHarvesterContainer.run(creep);
            }
            if (creep.memory.role === 'longDistanceHarvester12') {
                roleLongDistanceHarvesterContainer.run(creep);
            }
            if (creep.memory.role === 'longDistanceHarvester21') {
                roleLongDistanceHarvesterContainer.run(creep);
            }
            if (creep.memory.role === 'longDistanceHarvester22') {
                roleLongDistanceHarvesterContainer.run(creep);
            }



            if (creep.memory.role === 'longDistanceHarvesterSource1') {
                roleLongDistanceHarvesterSource.run(creep);
            }
            if (creep.memory.role === 'longDistanceHarvesterSource2') {
                roleLongDistanceHarvesterSource.run(creep);
            }


            if (creep.memory.role === 'longDistanceTransferer1') {
                roleLongDistanceTransfererTerminal.run(creep);
            }
            if (creep.memory.role === 'longDistanceTransferer2') {
                roleLongDistanceTransfererTerminal.run(creep);
            }

            if (creep.memory.role === 'longDistanceBuilder1') {
                roleLongdistanceBuilderTerminal.run(creep);
            }
            if (creep.memory.role === 'longDistanceBuilder2') {
                roleLongdistanceBuilderTerminal.run(creep);
            }
            if (creep.memory.role === 'longDistanceBuilder21') {
                roleLongdistanceBuilderTerminal.run(creep);
            }

            //STARTERS
            if (creep.memory.role === 'SharvesterSo1') {
                roleHarvesterSource.run(creep);
            }
            if (creep.memory.role === 'SharvesterSo2') {
                roleHarvesterSource.run(creep);
            }


            if (creep.memory.role === 'SharvesterCo1') {
                roleHarvesterContainer.run(creep);
            }
            if (creep.memory.role === 'SharvesterCo2') {
                roleHarvesterContainer.run(creep);
            }

            if (creep.memory.role === 'SharvesterLi1') {
                roleHarvesterLink.run(creep);
            }
            if (creep.memory.role === 'SharvesterLi2') {
                roleHarvesterLink.run(creep);
            }


            if (creep.memory.role === 'StransfererCo') {
                roleTransfererContainer.run(creep);
            }
            if (creep.memory.role === 'StransfererLi') {
                roleTransfererLink.run(creep);
            }
            if (creep.memory.role === 'StransfererTe') {
                roleTransfererTerminal.run(creep);
            }

            //NORMAL

            if (creep.memory.role === 'harvesterCo1') {
                roleHarvesterContainer.run(creep);
            }
            if (creep.memory.role === 'harvesterCo2') {
                roleHarvesterContainer.run(creep);
            }

            if (creep.memory.role === 'harvesterLi1') {
                roleHarvesterLink.run(creep);
            }
            if (creep.memory.role === 'harvesterLi2') {
                roleHarvesterLink.run(creep);
            }

            if (creep.memory.role === 'extractor') {
                roleExtractor.run(creep);
            }


            if (creep.memory.role === 'transfererSo') {
                roleTransfererSource.run(creep);
            }
            if (creep.memory.role === 'transfererCo') {
                roleTransfererContainer.run(creep);
            }
            if (creep.memory.role === 'transfererLi') {
                roleTransfererLink.run(creep);
            }
            if (creep.memory.role === 'transfererLiTe') {
                roleTransfererLinkToTerminal.run(creep);
            }
            if (creep.memory.role === 'transfererLiTe2') {
                roleTransfererLinkToTerminal.run(creep);
            }
            if (creep.memory.role === 'transfererTe') {
                roleTransfererTerminal.run(creep);
            }


            if (creep.memory.role === 'upgraderSo') {
                roleUpgraderSource.run(creep);
            }
            if (creep.memory.role === 'upgraderCo') {
                roleUpgraderContainer.run(creep);
            }
            if (creep.memory.role === 'upgraderLi') {
                roleUpgraderLink.run(creep);
            }
            if (creep.memory.role === 'upgraderTe') {
                roleUpgraderTerminal.run(creep);
            }


            if (creep.memory.role === 'builderSo') {
                roleBuilderSource.run(creep);
            }
            if (creep.memory.role === 'builderCo') {
                roleBuilderContainer.run(creep);
            }
            if (creep.memory.role === 'builderLi') {
                roleBuilderLink.run(creep);
            }
            if (creep.memory.role === 'builderTe') {
                roleBuilderTerminal.run(creep);
            }


            if (creep.memory.role === 'wallRepairerCo') {
                roleWallRepairerContainer.run(creep);
            }
            if (creep.memory.role === 'wallRepairerLi') {
                roleWallRepairerLink.run(creep);
            }
            if (creep.memory.role === 'wallRepairerTe') {
                roleWallRepairerTerminal.run(creep);
            }


            if (creep.memory.role === 'tombstonePickerCo') {
                roleTombstonePickerContainer.run(creep);
            }
            if (creep.memory.role === 'tombstonePickerLi') {
                roleTombstonePickerLink.run(creep);
            }
            if (creep.memory.role === 'tombstonePickerTe') {
                roleTombstonePickerTerminal.run(creep);
            }


            if (creep.memory.role === 'repairerCo') {
                roleRepairerContainer.run(creep);
            }
            if (creep.memory.role === 'repairerLi') {
                roleRepairerLink.run(creep);
            }
            if (creep.memory.role === 'repairerTe') {
                roleRepairerTerminal.run(creep);
            }
        }



        let harvester;
        let transferer;
        let spawn;
        let spawn2;
        function needsCreeps(role, room, numbers) {
            let numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role === role && c.memory.home === spawn);
            return numberOfCreeps < numbers
        }



        spawn = 'E43N3';
        spawn2 = 'E43N32';
        harvester = Game.spawns[spawn].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
            {dryRun: true});
        transferer = Game.spawns[spawn].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
            'Transferer' + Game.time,
            {dryRun: true});
        if (needsCreeps("harvesterCo1", spawn, 0) && needsCreeps("SharvesterCo1", spawn, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterCo1',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab57",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterCo2", spawn, 0) && needsCreeps("SharvesterCo2", spawn, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterCo2',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab59",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi1", spawn, 1) && needsCreeps("SharvesterLi1", spawn, 1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterLi1',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab57",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi2", spawn, 1) && needsCreeps("SharvesterLi2", spawn, 1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterLi2',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab59",
                        home: spawn}});
        }

        else if (needsCreeps("transfererCo", spawn, 0) && needsCreeps("StransfererCo", spawn, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLi", spawn, 0) && needsCreeps("StransfererLi", spawn, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererTe", spawn, 1) && needsCreeps("StransfererTe", spawn, 1) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererTe',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLiTe", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    CARRY, CARRY],
                'TransfererLinkTerminal' + Game.time,
                {
                    memory: {
                        role: 'transfererLiTe',
                        working: false,
                        home: spawn}});
        }



        else if (needsCreeps("harvesterCo1", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                    [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterCo1',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab57",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterCo2", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                    [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterCo2',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab59",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi1", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                    [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterLi1',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab57",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi2", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                    [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterLi2',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab59",
                        home: spawn}});
        }


        else if (needsCreeps("transfererCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererTe", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("upgraderCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("upgraderLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("upgraderTe", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("builderCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("builderLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("builderTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("repairerCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("repairerLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("repairerTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("wallRepairerCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("wallRepairerLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("wallRepairerTe", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("tombstonePickerCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("tombstonePickerLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("tombstonePickerTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerTe',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("extractor", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'extractor' + Game.time,
                {
                    memory: {
                        role: 'extractor',
                        working: false,
                        home: spawn}});
        }

        else if (needsCreeps("scientist", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    CARRY,CARRY],
                'Scientist' + Game.time,
                {
                    memory: {
                        role: 'scientist',
                        lab1: '5d471b0cb8211979f8d37a44',
                        lab2: '5d46240e14989673a6250bc2',
                        lab3: '5d46a72fb82e1179ccbc22b7',
                        lab4: '5d471b0cb8211979f8d37a44',
                        lab5: '5d46240e14989673a6250bc2',
                        lab6: '5d46a72fb82e1179ccbc22b7',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("labPick", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    CARRY,CARRY],
                'LabPicker' + Game.time,
                {
                    memory: {
                        role: 'labPick',
                        lab1: '5d471b0cb8211979f8d37a44',
                        lab2: '5d46240e14989673a6250bc2',
                        lab3: '5d46a72fb82e1179ccbc22b7',
                        lab4: '5d471b0cb8211979f8d37a44',
                        lab5: '5d46240e14989673a6250bc2',
                        lab6: '5d46a72fb82e1179ccbc22b7',
                        working: false,
                        home: spawn}});
        }



        else if (needsCreeps("attackerE43N4", spawn, 0)) {
            Game.spawns[spawn2].spawnCreep(
                [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK],
                'ATTACKER' + Game.time,
                {
                    memory: {
                        role: 'attackerE43N4',
                        home: spawn,
                        target: 'E43N4'}});
        }

        else if (needsCreeps("longDistanceHarvester11", spawn, 0)) {
            Game.spawns[spawn2].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'longDistanceHarvester' + Game.time,
                {
                    memory: {
                        role: 'longDistanceHarvester11',
                        working: false,
                        home: spawn,
                        target: 'E43N4',
                        sourceId: '5bbcaf859099fc012e63ab55'}});
        }

        else if (needsCreeps("longDistanceHarvester12", spawn, 0)) {
            Game.spawns[spawn2].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'longDistanceHarvester' + Game.time,
                {
                    memory: {
                        role: 'longDistanceHarvester12',
                        working: false,
                        home: spawn,
                        target: 'E43N4',
                        sourceId: '5bbcaf859099fc012e63ab53'}});
        }

        else if (needsCreeps("longDistanceTransferer1", spawn, 0)) {
            Game.spawns[spawn2].spawnCreep(
                    [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, CARRY,CARRY,CARRY,CARRY,CARRY],
                'longDistanceTransferer' + Game.time,
                {
                    memory: {
                        role: 'longDistanceTransferer1',
                        working: false,
                        home: spawn,
                        target: 'E43N4'}});
        }

        else if (needsCreeps("longDistanceBuilder1", spawn, 0)) {
            Game.spawns[spawn2].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'longDistanceBuilder' + Game.time,
                {
                    memory: {
                        role: 'longDistanceBuilder1',
                        working: false,
                        home: spawn,
                        target: 'E43N4'}});
        }

        else if (needsCreeps("longDistanceReserver1", spawn, 0)) {
            Game.spawns[spawn2].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CLAIM,CLAIM],
                'longDistanceReserver' + Game.time,
                {
                    memory: {
                        role: 'longDistanceReserver1',
                        working: false,
                        home: spawn,
                        target: 'E43N4'}});
        }
        else if (needsCreeps("longDistanceHarvesterSource1", spawn, 0)) {
            Game.spawns[spawn2].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'longDistanceHarvester' + Game.time,
                {
                    memory: {
                        role: 'longDistanceHarvesterSource1',
                        working: false,
                        home: spawn,
                        target: 'E43N4'}});
        }


        else if (needsCreeps("longDistanceHarvester21", spawn, 0)) {
            Game.spawns[spawn2].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'longDistanceHarvester' + Game.time,
                {
                    memory: {
                        role: 'longDistanceHarvester21',
                        working: false,
                        home: spawn,
                        target: 'E44N3',
                        sourceId: '5bbcaf969099fc012e63ad45'}});
        }

        else if (needsCreeps("longDistanceHarvester22", spawn, 0)) {
            Game.spawns[spawn2].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'longDistanceHarvester' + Game.time,
                {
                    memory: {
                        role: 'longDistanceHarvester22',
                        working: false,
                        home: spawn,
                        target: 'E44N3',
                        sourceId: '5bbcaf969099fc012e63ad44'}});
        }


        else if (needsCreeps("longDistanceTransferer2", spawn, 0)) {
            Game.spawns[spawn2].spawnCreep(
                    [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, CARRY,CARRY,CARRY,CARRY,CARRY],
                'longDistanceTransferer' + Game.time,
                {
                    memory: {
                        role: 'longDistanceTransferer2',
                        working: false,
                        home: spawn,
                        target: 'E44N3'}});
        }

        else if (needsCreeps("longDistanceBuilder2", spawn,0)) {
            Game.spawns[spawn2].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'longDistanceBuilder' + Game.time,
                {
                    memory: {
                        role: 'longDistanceBuilder2',
                        working: false,
                        home: spawn,
                        target: 'E44N3'}});
        }

        else if (needsCreeps("longDistanceReserver2", spawn, 0)) {
            Game.spawns[spawn2].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CLAIM,CLAIM],
                'longDistanceReserver' + Game.time,
                {
                    memory: {
                        role: 'longDistanceReserver2',
                        working: false,
                        home: spawn,
                        target: 'E44N3'}});
        }
        else if (needsCreeps("longDistanceHarvesterSource2", spawn, 0)) {
            Game.spawns[spawn2].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'longDistanceHarvester' + Game.time,
                {
                    memory: {
                        role: 'longDistanceHarvesterSource2',
                        working: false,
                        home: spawn,
                        target: 'E44N3'}});
        }
        else if (needsCreeps("longDistanceBuilder21", spawn,0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'longDistanceBuilder' + Game.time,
                {
                    memory: {
                        role: 'longDistanceBuilder21',
                        working: false,
                        home: spawn,
                        target: 'E43N1'}});
        }





        spawn = 'E43N2';
        harvester = Game.spawns[spawn].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
            {dryRun: true});
        transferer = Game.spawns[spawn].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
            'Transferer' + Game.time,
            {dryRun: true});
        if (needsCreeps("harvesterCo1", spawn, 0) && needsCreeps("SharvesterCo1", spawn, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterCo1',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab5c",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterCo2", spawn, 0) && needsCreeps("SharvesterCo2", spawn, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterCo2',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab5b",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi1", spawn, 1) && needsCreeps("SharvesterLi1", spawn, 1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterLi1',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab5c",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi2", spawn, 1) && needsCreeps("SharvesterLi2", spawn, 1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterLi2',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab5b",
                        home: spawn}});
        }

        else if (needsCreeps("transfererCo", spawn, 0) && needsCreeps("StransfererCo", spawn, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLi", spawn, 0) && needsCreeps("StransfererLi", spawn, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererTe", spawn, 1) && needsCreeps("StransfererTe", spawn, 1) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererTe',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLiTe", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    CARRY, CARRY],
                'TransfererLinkTerminal' + Game.time,
                {
                    memory: {
                        role: 'transfererLiTe',
                        working: false,
                        home: spawn}});
        }



        else if (needsCreeps("harvesterCo1", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterCo1',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab5c",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterCo2", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                    [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterCo2',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab5b",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi1", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                    [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterLi1',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab5c",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi2", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                    [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterLi2',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab5b",
                        home: spawn}});
        }


        else if (needsCreeps("transfererCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererTe", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("upgraderCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("upgraderLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("upgraderTe", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("builderCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("builderLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("builderTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("repairerCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("repairerLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("repairerTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("wallRepairerCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("wallRepairerLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("wallRepairerTe", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("tombstonePickerCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("tombstonePickerLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("tombstonePickerTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerTe',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("extractor", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'extractor' + Game.time,
                {
                    memory: {
                        role: 'extractor',
                        working: false,
                        home: spawn}});
        }

        else if (needsCreeps("scientist", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    CARRY,CARRY],
                'Scientist' + Game.time,
                {
                    memory: {
                        role: 'scientist',
                        lab1: '5d469f243b552d6389fb045b',
                        lab2: '5d47f69290e3aa2b1e0b8b24',
                        lab3: '5d463a0fa95a521e2966728b',
                        lab4: '5d469f243b552d6389fb045b',
                        lab5: '5d47f69290e3aa2b1e0b8b24',
                        lab6: '5d463a0fa95a521e2966728b',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("labPick", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    CARRY,CARRY],
                'LabPicker' + Game.time,
                {
                    memory: {
                        role: 'labPick',
                        lab1: '5d469f243b552d6389fb045b',
                        lab2: '5d47f69290e3aa2b1e0b8b24',
                        lab3: '5d463a0fa95a521e2966728b',
                        lab4: '5d469f243b552d6389fb045b',
                        lab5: '5d47f69290e3aa2b1e0b8b24',
                        lab6: '5d463a0fa95a521e2966728b',
                        working: false,
                        home: spawn}});
        }



        else if (needsCreeps("longDistanceBuilder21", spawn,0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'longDistanceBuilder' + Game.time,
                {
                    memory: {
                        role: 'longDistanceBuilder21',
                        working: false,
                        home: spawn,
                        target: 'E43N1'}});
        }





        spawn = 'E42N2';
        harvester = Game.spawns[spawn].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
            {dryRun: true});
        transferer = Game.spawns[spawn].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
            'Transferer' + Game.time,
            {dryRun: true});
        if (needsCreeps("harvesterCo1", spawn, 0) && needsCreeps("SharvesterCo1", spawn, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterCo1',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9d0",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterCo2", spawn, 0) && needsCreeps("SharvesterCo2", spawn, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterCo2',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9d2",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi1", spawn, 1) && needsCreeps("SharvesterLi1", spawn, 1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterLi1',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9d0",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi2", spawn, 1) && needsCreeps("SharvesterLi2", spawn, 1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterLi2',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9d2",
                        home: spawn}});
        }

        else if (needsCreeps("transfererCo", spawn, 0) && needsCreeps("StransfererCo", spawn, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLi", spawn, 0) && needsCreeps("StransfererLi", spawn, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererTe", spawn, 1) && needsCreeps("StransfererTe", spawn, 1) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererTe',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLiTe", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    CARRY, CARRY],
                'TransfererLinkTerminal' + Game.time,
                {
                    memory: {
                        role: 'transfererLiTe',
                        working: false,
                        home: spawn}});
        }



        else if (needsCreeps("harvesterCo1", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterCo1',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9d0",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterCo2", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterCo2',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9d2",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi1", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                    [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterLi1',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9d0",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi2", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                    [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterLi2',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9d2",
                        home: spawn}});
        }


        else if (needsCreeps("transfererCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererTe", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("upgraderCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("upgraderLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("upgraderTe", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("builderCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("builderLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("builderTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("repairerCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("repairerLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("repairerTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("wallRepairerCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("wallRepairerLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("wallRepairerTe", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("tombstonePickerCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("tombstonePickerLi", spawn, 0  )) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("tombstonePickerTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerTe',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("longDistanceBuilderTeE42N1", spawn, 0)) {
            Game.spawns['E42N2'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                'LongDistanceBuilderE44N3' + Game.time,
                {
                    memory: {
                        role: 'longDistanceBuilderTeE42N1',
                        working: false,
                        home: 'E42N2',
                        target: 'E42N1'
                    }
                });
        }


        else if (needsCreeps("extractor", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'extractor' + Game.time,
                {
                    memory: {
                        role: 'extractor',
                        working: false,
                        home: spawn}});
        }

        else if (needsCreeps("scientist", spawn, 1  )) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    CARRY,CARRY],
                'Scientist' + Game.time,
                {
                    memory: {
                        role: 'scientist',
                        lab1: '5d53e13631f4ac407edbd077',
                        lab2: '5d54169c5141741e276d0589',
                        lab3: '5d549eb78cee062b5143adf6',
                        lab4: '5d54dfb76700154079e34039',
                        lab5: '5d5525413a990a6377202706',
                        lab6: '5d545e1c415b51747a6abb73',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("labPick", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    CARRY,CARRY],
                'LabPicker' + Game.time,
                {
                    memory: {
                        role: 'labPick',
                        lab1: '5d53e13631f4ac407edbd077',
                        lab2: '5d54169c5141741e276d0589',
                        lab3: '5d549eb78cee062b5143adf6',
                        lab4: '5d54dfb76700154079e34039',
                        lab5: '5d5525413a990a6377202706',
                        lab6: '5d545e1c415b51747a6abb73',
                        working: false,
                        home: spawn}});
        }




        spawn = 'E42N3';
        harvester = Game.spawns[spawn].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
            {dryRun: true});
        transferer = Game.spawns[spawn].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
            'Transferer' + Game.time,
            {dryRun: true});
        if (needsCreeps("harvesterCo1", spawn, 0) && needsCreeps("SharvesterCo1", spawn, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterCo1',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9cd",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterCo2", spawn, 0) && needsCreeps("SharvesterCo2", spawn, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterCo2',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9ce",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi1", spawn, 1) && needsCreeps("SharvesterLi1", spawn, 2) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterLi1',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9cd",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi2", spawn, 1) && needsCreeps("SharvesterLi2", spawn, 2) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterLi2',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9ce",
                        home: spawn}});
        }

        else if (needsCreeps("transfererCo", spawn, 0) && needsCreeps("StransfererCo", spawn, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLi", spawn, 0) && needsCreeps("StransfererLi", spawn, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererTe", spawn, 1) && needsCreeps("StransfererTe", spawn, 1) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererTe',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLiTe", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,
                    CARRY, CARRY,CARRY],
                'TransfererLinkTerminal' + Game.time,
                {
                    memory: {
                        role: 'transfererLiTe',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLiTe2", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY, CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY, CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'TransfererLinkTerminal' + Game.time,
                {
                    memory: {
                        role: 'transfererLiTe2',
                        working: false,
                        home: spawn}});
        }



        else if (needsCreeps("harvesterCo1", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                    [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterCo1',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9cd",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterCo2", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                    [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterCo2',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9ce",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi1", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                    [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterLi1',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9cd",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi2", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                    [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterLi2',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9ce",
                        home: spawn}});
        }


        else if (needsCreeps("transfererCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLi", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererTe", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("upgraderCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("upgraderLi", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("upgraderTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("builderCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("builderLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("builderTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("repairerCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("repairerLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("repairerTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("wallRepairerCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("wallRepairerLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("wallRepairerTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("tombstonePickerCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("tombstonePickerLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("tombstonePickerTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerTe',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("extractor", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'extractor' + Game.time,
                {
                    memory: {
                        role: 'extractor',
                        working: false,
                        home: spawn}});
        }





        spawn = 'E42N1';
        harvester = Game.spawns[spawn].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
            {dryRun: true});
        transferer = Game.spawns[spawn].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
            'Transferer' + Game.time,
            {dryRun: true});
        if (needsCreeps("harvesterCo1", spawn, 0) && needsCreeps("SharvesterCo1", spawn, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterCo1',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9d4",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterCo2", spawn, 0) && needsCreeps("SharvesterCo2", spawn, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterCo2',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9d4",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi1", spawn, 1) && needsCreeps("SharvesterLi1", spawn, 1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterLi1',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9d4",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi2", spawn, 0) && needsCreeps("SharvesterLi2", spawn, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterLi2',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9d4",
                        home: spawn}});
        }

        else if (needsCreeps("transfererCo", spawn, 0) && needsCreeps("StransfererCo", spawn, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLi", spawn, 0) && needsCreeps("StransfererLi", spawn, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererTe", spawn, 1) && needsCreeps("StransfererTe", spawn, 2) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererTe',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLiTe", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    CARRY, CARRY],
                'TransfererLinkTerminal' + Game.time,
                {
                    memory: {
                        role: 'transfererLiTe',
                        working: false,
                        home: spawn}});
        }



        else if (needsCreeps("harvesterCo1", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterCo1',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9d4",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterCo2", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterCo2',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9d4",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi1", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterLi1',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9d4",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi2", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY,CARRY],
            'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterLi2',
                        working: false,
                        sourceId: "5bbcaf719099fc012e63a9d4",
                        home: spawn}});
        }


        else if (needsCreeps("transfererCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererTe", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("upgraderCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("upgraderLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("upgraderTe", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY,CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("builderCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("builderLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("builderTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("repairerCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("repairerLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("repairerTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("wallRepairerCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("wallRepairerLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("wallRepairerTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("tombstonePickerCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("tombstonePickerLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("tombstonePickerTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerTe',
                        working: false,
                        home: spawn}});
        }

        else if (needsCreeps("extractor", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'extractor' + Game.time,
                {
                    memory: {
                        role: 'extractor',
                        working: false,
                        home: spawn}});
        }



        spawn = 'E43';
        harvester = Game.spawns[spawn].spawnCreep(
            [MOVE,MOVE,MOVE,
                WORK,WORK,
                CARRY],
            'Harvester' + Game.time,
            {dryRun: true});
        transferer = Game.spawns[spawn].spawnCreep(
            [MOVE,MOVE,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
            'Transferer' + Game.time,
            {dryRun: true});
        if (needsCreeps("harvesterCo1", spawn, 2) && needsCreeps("SharvesterCo1", spawn, 2) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterCo1',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab5f",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi1", spawn, 0) && needsCreeps("SharvesterLi1", spawn, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'StarterHarvester' + Game.time,
                {
                    memory: {
                        role: 'SharvesterLi1',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab5f",
                        home: spawn}});
        }


        else if (needsCreeps("transfererCo", spawn, 4) && needsCreeps("StransfererCo", spawn, 2) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLi", spawn, 0) && needsCreeps("StransfererLi", spawn, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererTe", spawn, 0) && needsCreeps("StransfererTe", spawn, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
            Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY],
                'StarterTransferer' + Game.time,
                {
                    memory: {
                        role: 'StransfererTe',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLiTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    CARRY, CARRY],
                'TransfererLinkTerminal' + Game.time,
                {
                    memory: {
                        role: 'transfererLiTe',
                        working: false,
                        home: spawn}});
        }



        else if (needsCreeps("harvesterCo1", spawn, 2)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,WORK,
                    CARRY],
                'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterCo1',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab5f",
                        home: spawn}});
        }
        else if (needsCreeps("harvesterLi1", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,WORK,
                    CARRY],
                'Harvester' + Game.time,
                {
                    memory: {
                        role: 'harvesterLi1',
                        working: false,
                        sourceId: "5bbcaf859099fc012e63ab5f",
                        home: spawn}});
        }


        else if (needsCreeps("transfererCo", spawn, 4)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("transfererTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'Transferer' + Game.time,
                {
                    memory: {
                        role: 'transfererTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("upgraderCo", spawn, 4)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("upgraderLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("upgraderTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,WORK,
                    CARRY,CARRY],
                'Upgrader' + Game.time,
                {
                    memory: {
                        role: 'upgraderTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("builderCo", spawn, 1)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("builderLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("builderTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'Builder' + Game.time,
                {
                    memory: {
                        role: 'builderTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("repairerCo", spawn, 2)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("repairerLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("repairerTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'Repairer' + Game.time,
                {
                    memory: {
                        role: 'repairerTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("wallRepairerCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("wallRepairerLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("wallRepairerTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK,
                    CARRY,CARRY,CARRY],
                'WallRepairer' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerTe',
                        working: false,
                        home: spawn}});
        }


        else if (needsCreeps("tombstonePickerCo", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerCo',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("tombstonePickerLi", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerLi',
                        working: false,
                        home: spawn}});
        }
        else if (needsCreeps("tombstonePickerTe", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,
                    CARRY,CARRY,CARRY,CARRY],
                'tombstonePicker' + Game.time,
                {
                    memory: {
                        role: 'tombstonePickerTe',
                        working: false,
                        home: spawn}});
        }

        else if (needsCreeps("extractor", spawn, 0)) {
            Game.spawns[spawn].spawnCreep(
                [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                    WORK,WORK,WORK,WORK,WORK,
                    CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
                'extractor' + Game.time,
                {
                    memory: {
                        role: 'extractor',
                        working: false,
                        home: spawn}});
        }


        /*
        Game.spawns['E43N2'].spawnCreep(
            [CLAIM,
                MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
            'Reserver' + Game.time,
            {
                memory: {
                    role: 'claimer',
                    working: false,
                    target: 'E43N1'
                }
            });

         */












































        if(!Memory.stats){ Memory.stats = {} }
        Memory.stats['cpu.getUsed'] = Game.cpu.getUsed();
        Memory.stats['cpu.limit'] = Game.cpu.limit;
        Memory.stats['cpu.bucket'] = Game.cpu.bucket;
        Memory.stats['cpu.tickLimit'] = Game.cpu.tickLimit;

        Memory.stats['gcl.progress'] = Game.gcl.progress;
        Memory.stats['gcl.progressTotal'] = Game.gcl.progressTotal;
        Memory.stats['gcl.level'] = Game.gcl.level;

        Memory.stats['te.total'] = terminalTotal;
        //Memory.stats['st.total'] = storageTotal;

        Memory.stats['te.max'] = terminalTMa;
        Memory.stats['te.min'] = terminalTMi;

        //Memory.stats['cpu.usage'] = console.log(Game.profiler.output());
        Memory.stats['heap'] = Game.cpu.getHeapStatistics();






        /*_.forEach(Game.rooms, room => {
            let eventLog = room.getEventLog();
            let attackEvents = _.filter(eventLog, {event: EVENT_HARVEST});
            attackEvents.forEach(event => {
                let target = Game.getObjectById(event.sourceId);
                console.log(target);
            });
        });*/


        _.forEach(Object.keys(Game.rooms), function(roomName){
            let room = Game.rooms[roomName];

            if(room.controller && room.controller.my){
                Memory.stats['rooms.' + roomName + '.rcl.level'] = room.controller.level;
                Memory.stats['rooms.' + roomName + '.rcl.progress'] = room.controller.progress;
                Memory.stats['rooms.' + roomName + '.rcl.progressTotal'] = room.controller.progressTotal;

                Memory.stats['rooms.' + roomName + '.spawn.energy'] = room.energyAvailable;
                Memory.stats['rooms.' + roomName + '.spawn.energyTotal'] = room.energyCapacityAvailable;

                if(room.storage){
                    Memory.stats['rooms.' + roomName + '.storage.energy'] = room.storage.store.energy[RESOURCE_ENERGY];
                }
                if(room.terminal){
                    Memory.stats['rooms.' + roomName + '.terminal.energy'] = room.terminal.store.energy[RESOURCE_ENERGY];

                    Memory.stats['rooms.' + roomName + '.terminal.hydrogen'] = room.terminal.store[RESOURCE_HYDROGEN];

                    Memory.stats['rooms.' + roomName + '.terminal.oxygen'] = room.terminal.store[RESOURCE_OXYGEN];

                    Memory.stats['rooms.' + roomName + '.terminal.utrium'] = room.terminal.store[RESOURCE_UTRIUM];

                    Memory.stats['rooms.' + roomName + '.terminal.keanium'] = room.terminal.store[RESOURCE_KEANIUM];

                    Memory.stats['rooms.' + roomName + '.terminal.lemergium'] = room.terminal.store[RESOURCE_LEMERGIUM];

                    Memory.stats['rooms.' + roomName + '.terminal.zynthium'] = room.terminal.store[RESOURCE_ZYNTHIUM];

                    Memory.stats['rooms.' + roomName + '.terminal.catalyst'] = room.terminal.store[RESOURCE_CATALYST];
                }
            }
        });
    });
};