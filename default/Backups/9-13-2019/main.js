//Import roles
require('prototype.tower');

const traveler = require('traveler');
const roleAttacker = require('role.attacker');
const roleHealer = require('role.healer');

const roleHarvesterSource = require('role.harvesterSource');
const roleHarvesterContainer = require('role.harvesterContainer');
const roleHarvesterLink = require('role.harvesterLink');
const roleHarvesterStorage = require('role.harvesterStorage');
const roleHarvesterTerminal = require('role.harvesterTerminal');

const roleExtractorContainer = require('role.extractorContainer');
const roleExtractorLink = require('role.extractorLink');
const roleExtractorStorage = require('role.extractorStorage');
const roleExtractorTerminal = require('role.extractorTerminal');


const roleUpgraderSource = require('role.upgraderSource');
const roleUpgraderContainer = require('role.upgraderContainer');
const roleUpgraderLink = require('role.upgraderLink');
const roleUpgraderStorage = require('role.upgraderStorage');
const roleUpgraderTerminal = require('role.upgraderTerminal');

const roleTransfererFromTo = require('role.transfererFromTo');
const roleTransfererContainer = require('role.transfererContainer');
const roleTransfererLink = require('role.transfererLink');
const roleTransfererLinkToTerminal = require('role.transfererLinkToTerminal');
const roleTransfererLinkToStorage = require('role.transfererLinkToStorage');
const roleTransfererStorage = require('role.transfererStorage');
const roleTransfererTerminal = require('role.transfererTerminal');


const roleBuilderSource = require('role.builderSources');
const roleBuilderContainer = require('role.builderContainer');
const roleBuilderLink = require('role.builderLink');
const roleBuilderStorage = require('role.builderStorage');
const roleBuilderTerminal = require('role.builderTerminal');


const roleRepairerSource = require('role.repairerSource');
const roleRepairerContainer = require('role.repairerContainer');
const roleRepairerLink = require('role.repairerLink');
const roleRepairerStorage = require('role.repairerStorage');
const roleRepairerTerminal = require('role.repairerTerminal');


const roleWallRepairerSource = require('role.wallRepairerSource');
const roleWallRepairerContainer = require('role.wallRepairerContainer');
const roleWallRepairerLink = require('role.wallRepairerLink');
const roleWallRepairerStorage = require('role.wallRepairerStorage');
const roleWallRepairerTerminal = require('role.wallRepairerTerminal');

const roleTombstonePickerContainer = require('role.tombstonePickerContainer');
const roleTombstonePickerLink = require('role.tombstonePickerLink');
const roleTombstonePickerStorage = require('role.tombstonePickerStorage');
const roleTombstonePickerTerminal = require('role.tombstonePickerTerminal');


const roleClaimer = require('role.claimer');
const roleReserver = require('role.reserver');
const roleDismantler = require('role.dismantle');

const roleScientist = require('role.scientist');
const roleLabPick = require('role.labPick');


const roleLongdistanceBuilderSource = require('role.longDistanceBuilderSource');
const roleLongdistanceBuilderContainer = require('role.longDistanceBuilderContainer');
const roleLongdistanceBuilderLink = require('role.longDistanceBuilderLink');
const roleLongdistanceBuilderStorage = require('role.longDistanceBuilderStorage');
const roleLongdistanceBuilderTerminal = require('role.longDistanceBuilderTerminal');


const roleLongDistanceHarvesterSource = require('role.longDistanceHarvesterSource');
const roleLongDistanceHarvesterContainer = require('role.longDistanceHarvesterContainer');
const roleLongDistanceHarvesterLink = require('role.longDistanceHarvesterLink');
const roleLongDistanceHarvesterStorage = require('role.longDistanceHarvesterStorage');
const roleLongDistanceHarvesterTerminal = require('role.longDistanceHarvesterTerminal');


const roleLongDistanceUpgraderSource = require('role.longDistanceUpgraderSource');
const roleLongDistanceUpgraderContainer = require('role.longDistanceUpgraderContainer');
const roleLongDistanceUpgraderLink = require('role.longDistanceUpgraderLink');
const roleLongDistanceUpgraderStorage = require('role.longDistanceUpgraderStorage');
const roleLongDistanceUpgraderTerminal = require('role.longDistanceUpgraderTerminal');

const roleLongDistanceTransfererContainer = require('role.longDistanceTransfererContainer');
const roleLongDistanceTransfererLink = require('role.longDistanceTransfererLink');
const roleLongDistanceTransfererStorage = require('role.longDistanceTransfererStorage');
const roleLongDistanceTransfererTerminal = require('role.longDistanceTransfererTerminal');


const profiler = require('screeps-profiler');

// This line monkey patches the global prototypes.
profiler.enable();
module.exports.loop = function() {
    profiler.wrap(function () {
        if (Game.cpu.bucket > 1000) {

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
            const linkTo21 = Game.getObjectById("5d7a2328eff0ae438dca2861");
            const linkTo22 = Game.getObjectById("5d7af0940e63d70d58c546a4");
            const linkFrom22 = Game.getObjectById("5d38856cc99c215de2febacd");
            linkFrom21.transferEnergy(linkTo21);
            linkFrom22.transferEnergy(linkTo21);
            if (linkTo22.energy < 200) {
                linkTo21.transferEnergy(linkTo22);
                }


            const linkFrom31 = Game.getObjectById("5d38a7eb5c57a23fff55bb4c");
            const linkTo3 = Game.getObjectById("5d388e83c08d9e7cff86ec68");
            const linkFrom32 = Game.getObjectById("5d49a74566d7ea40916001c0");
            linkFrom31.transferEnergy(linkTo3);
            linkFrom32.transferEnergy(linkTo3);

            const linkFrom41 = Game.getObjectById("5d6fef036db51a75659d9308");
            const linkTo41 = Game.getObjectById("5d4f03abe360cc20d4c03077");
            const linkFrom42 = Game.getObjectById("5d59ae9e3b552d638902b9f8");
            const linkTo42 = Game.getObjectById("5d59ae9e3b552d638902b9f8");

            linkFrom41.transferEnergy(linkTo42);
            linkFrom42.transferEnergy(linkTo41);


            const linkFrom51 = Game.getObjectById("5d5bf39b980b3520ebb8f2fb");
            const linkTo51 = Game.getObjectById("5d5bdd64415b51747a6d35d9");
            linkFrom51.transferEnergy(linkTo51);


            //Find Terminals

            /*const terminalt1 = Game.rooms['E43N3'].terminal.store[RESOURCE_ENERGY];
            const terminalt2 = Game.rooms['E43N2'].terminal.store[RESOURCE_ENERGY];
            const terminalt3 = Game.rooms['E42N2'].terminal.store[RESOURCE_ENERGY];
            const terminalt4 = Game.rooms['E42N3'].terminal.store[RESOURCE_ENERGY];
            const terminalt5 = Game.rooms['E42N1'].terminal.store[RESOURCE_ENERGY];


            const storaget1 = Game.rooms['E43N3'].storage.store[RESOURCE_ENERGY];
            //const storaget2 = Game.rooms['E43N2'].storage.store[RESOURCE_ENERGY];
            const storaget3 = Game.rooms['E42N2'].storage.store[RESOURCE_ENERGY];
            const storaget4 = Game.rooms['E42N3'].storage.store[RESOURCE_ENERGY];
            const storaget5 = Game.rooms['E42N1'].storage.store[RESOURCE_ENERGY];


            const terminal1 = Game.rooms['E43N3'].terminal;
            const terminal2 = Game.rooms['E43N2'].terminal;
            const terminal3 = Game.rooms['E42N2'].terminal;
            const terminal4 = Game.rooms['E42N3'].terminal;
            const terminal5 = Game.rooms['E42N1'].terminal;

            let terminalTMi = Math.min(terminalt1, terminalt2, terminalt3, terminalt4, terminalt5);
            let terminalTMa = Math.max(terminalt1, terminalt2, terminalt3, terminalt4, terminalt5);
            let terminalSend = 10000;

            if (terminalTMa !== undefined && (terminalTMi * 2 < terminalTMa)) {
                if (terminalt1 === terminalTMa) {
                    if (terminalt2 === terminalTMi) {
                        if (terminalTMa > terminalt2 + terminalSend) {
                            terminal1.send(RESOURCE_ENERGY, terminalSend, 'E43N2', 'Max to Min')
                        }
                    }
                    if (terminalt3 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal1.send(RESOURCE_ENERGY, terminalSend, 'E42N2', 'Max to Min')
                        }
                    }
                    if (terminalt4 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal1.send(RESOURCE_ENERGY, terminalSend, 'E42N3', 'Max to Min')
                        }
                    }
                    if (terminalt5 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal1.send(RESOURCE_ENERGY, terminalSend, 'E42N1', 'Max to Min')
                        }
                    }
                }

                if (terminalt2 === terminalTMa) {
                    if (terminalt1 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal2.send(RESOURCE_ENERGY, terminalSend, 'E43N3', 'Max to Min')
                        }
                    }
                    if (terminalt3 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal2.send(RESOURCE_ENERGY, terminalSend, 'E42N2', 'Max to Min')
                        }
                    }
                    if (terminalt4 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal2.send(RESOURCE_ENERGY, terminalSend, 'E42N3', 'Max to Min')
                        }
                    }
                    if (terminalt5 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal2.send(RESOURCE_ENERGY, terminalSend, 'E42N1', 'Max to Min')
                        }
                    }
                }

                if (terminalt3 === terminalTMa) {
                    if (terminalt1 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal3.send(RESOURCE_ENERGY, terminalSend, 'E43N3', 'Max to Min')
                        }
                    }
                    if (terminalt2 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal3.send(RESOURCE_ENERGY, terminalSend, 'E43N2', 'Max to Min')
                        }
                    }
                    if (terminalt4 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal3.send(RESOURCE_ENERGY, terminalSend, 'E42N3', 'Max to Min')
                        }
                    }
                    if (terminalt5 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal3.send(RESOURCE_ENERGY, terminalSend, 'E42N1', 'Max to Min')
                        }
                    }
                }

                if (terminalt4 === terminalTMa) {
                    if (terminalt1 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal4.send(RESOURCE_ENERGY, terminalSend, 'E43N3', 'Max to Min')
                        }
                    }
                    if (terminalt2 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal4.send(RESOURCE_ENERGY, terminalSend, 'E43N2', 'Max to Min')
                        }
                    }
                    if (terminalt3 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal4.send(RESOURCE_ENERGY, terminalSend, 'E42N2', 'Max to Min')
                        }
                    }
                    if (terminalt5 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal4.send(RESOURCE_ENERGY, terminalSend, 'E42N1', 'Max to Min')
                        }
                    }
                }

                if (terminalt5 === terminalTMa) {
                    if (terminalt1 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal5.send(RESOURCE_ENERGY, terminalSend, 'E43N3', 'Max to Min')
                        }
                    }
                    if (terminalt2 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal5.send(RESOURCE_ENERGY, terminalSend, 'E43N2', 'Max to Min')
                        }
                    }
                    if (terminalt3 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
                            terminal5.send(RESOURCE_ENERGY, terminalSend, 'E42N2', 'Max to Min')
                        }
                    }
                    if (terminalt4 === terminalTMi) {
                        if (terminalTMa > terminalTMi + terminalSend) {
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
                Game.notify('Terminal Total Has More Then 300K Energy!' && terminalTotal)
            }*/


            // find all towers
            let towers = _.filter(Game.structures, s => s.structureType === STRUCTURE_TOWER);
            // for each tower
            for (let tower of towers) {
                // run tower logic
                tower.defend();
            }

            let spawnEnergy;
            let spawnEnergyMax;
            let towers11 = Game.rooms.E43N3.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_TOWER
            });
            spawnEnergy = Game.rooms.E43N3.energyAvailable;
            spawnEnergyMax = Game.rooms.E43N3.energyCapacityAvailable;
            for (let tower11 of towers11) {
                let targetRepair11 = tower11.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.hits < 2500000
                });
                if (targetRepair11 !== undefined && spawnEnergy === spawnEnergyMax) {
                    tower11.repair(targetRepair11);
                }
            }

            let towers21 = Game.rooms.E43N2.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_TOWER
            });
            spawnEnergy = Game.rooms.E43N2.energyAvailable;
            spawnEnergyMax = Game.rooms.E43N2.energyCapacityAvailable;
            for (let tower21 of towers21) {
                let targetRepair21 = tower21.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.hits < 2500000
                });
                if (targetRepair21 !== undefined && spawnEnergy === spawnEnergyMax) {
                    tower21.repair(targetRepair21);
                }
            }

            let towers31 = Game.rooms.E42N2.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_TOWER
            });
            spawnEnergy = Game.rooms.E42N2.energyAvailable;
            spawnEnergyMax = Game.rooms.E42N2.energyCapacityAvailable;
            for (let tower31 of towers31) {
                let targetRepair31 = tower31.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.hits < 2500000
                });
                if (targetRepair31 !== undefined && spawnEnergy === spawnEnergyMax) {
                    tower31.repair(targetRepair31);
                }
            }

            let towers41 = Game.rooms.E42N3.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_TOWER
            });
            spawnEnergy = Game.rooms.E42N3.energyAvailable;
            spawnEnergyMax = Game.rooms.E42N3.energyCapacityAvailable;
            for (let tower41 of towers41) {
                let targetRepair41 = tower41.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.hits < 2500000
                });
                if (targetRepair41 !== undefined && spawnEnergy === spawnEnergyMax) {
                    tower41.repair(targetRepair41);
                }
            }

            let towers51 = Game.rooms.E42N1.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_TOWER
            });
            spawnEnergy = Game.rooms.E42N1.energyAvailable;
            spawnEnergyMax = Game.rooms.E42N1.energyCapacityAvailable;
            for (let tower51 of towers51) {
                let targetRepair51 = tower51.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.hits < 2500000
                });
                if (targetRepair51 !== undefined && spawnEnergy === spawnEnergyMax) {
                    tower51.repair(targetRepair51);
                }
            }

            let towers61 = Game.rooms.E43N1.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_TOWER
            });
            for (let tower61 of towers61) {
                let targetRepair61 = tower61.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.hits < 2500000
                });
                if (targetRepair61 !== undefined) {
                    tower61.repair(targetRepair61);
                }
            }

            let room;

            function needsResource(resource, amount, room) {
                let numberOfResource = Game.rooms[room].terminal.store[resource];
                if (numberOfResource === undefined) {
                    return 1
                } else {
                    return numberOfResource < amount
                }
            }

            //MINERALS
            /*room = 'E43N3';
            //if (needsResource(RESOURCE_HYDROGEN,5000,'E43N3')) {
            //    terminal1.send(RESOURCE_HYDROGEN, 1000, room)
            //}
            if (needsResource(RESOURCE_OXYGEN, 5000, 'E43N3')) {
                terminal3.send(RESOURCE_OXYGEN, 1000, room)
            }
            if (needsResource(RESOURCE_UTRIUM, 5000, 'E43N3')) {
                terminal4.send(RESOURCE_UTRIUM, 1000, room)
            }
            if (needsResource(RESOURCE_KEANIUM, 5000, 'E43N3')) {
                terminal2.send(RESOURCE_KEANIUM, 1000, room)
            }
            if (needsResource(RESOURCE_LEMERGIUM, 5000, 'E43N3')) {
                terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
            }
            if (needsResource(RESOURCE_ZYNTHIUM, 5000, 'E43N3')) {
                terminal3.send(RESOURCE_ZYNTHIUM, 1000, room)
            }
            if (needsResource(RESOURCE_CATALYST, 5000, 'E43N3')) {
                terminal5.send(RESOURCE_CATALYST, 1000, room)
            }

            //MINERALS
            room = 'E43N2';
            if (needsResource(RESOURCE_HYDROGEN, 5000, 'E43N2')) {
                terminal1.send(RESOURCE_HYDROGEN, 1000, room)
            }
            if (needsResource(RESOURCE_OXYGEN, 5000, 'E43N2')) {
                terminal3.send(RESOURCE_OXYGEN, 1000, room)
            }
            if (needsResource(RESOURCE_UTRIUM, 5000, 'E43N2')) {
                terminal4.send(RESOURCE_UTRIUM, 1000, room)
            }
            //if (needsResource(RESOURCE_KEANIUM,5000,'E43N2')) {
            //    terminal2.send(RESOURCE_KEANIUM, 1000, room)
            //}
            //if (needsResource(RESOURCE_LEMERGIUM,5000,'E43N2')) {
            //    terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
            //}
            if (needsResource(RESOURCE_ZYNTHIUM, 5000, 'E43N2')) {
                terminal3.send(RESOURCE_ZYNTHIUM, 1000, room)
            }
            if (needsResource(RESOURCE_CATALYST, 5000, 'E43N2')) {
                terminal5.send(RESOURCE_CATALYST, 1000, room)
            }

            //MINERALS
            room = 'E42N2';
            if (needsResource(RESOURCE_HYDROGEN, 5000, 'E42N2')) {
                terminal1.send(RESOURCE_HYDROGEN, 1000, room)
            }
            //if (needsResource(RESOURCE_OXYGEN,5000,'E42N2')) {
            //    terminal3.send(RESOURCE_OXYGEN, 1000, room)
            //}
            if (needsResource(RESOURCE_UTRIUM, 5000, 'E42N2')) {
                terminal4.send(RESOURCE_UTRIUM, 1000, room)
            }
            if (needsResource(RESOURCE_KEANIUM, 5000, 'E42N2')) {
                terminal2.send(RESOURCE_KEANIUM, 1000, room)
            }
            if (needsResource(RESOURCE_LEMERGIUM, 5000, 'E42N2')) {
                terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
            }
            //if (needsResource(RESOURCE_ZYNTHIUM,5000,'E42N2')) {
            //    terminal3.send(RESOURCE_ZYNTHIUM, 1000, room)
            //}
            if (needsResource(RESOURCE_CATALYST, 5000, 'E42N2')) {
                terminal5.send(RESOURCE_CATALYST, 1000, room)
            }

            //MINERALS
            room = 'E42N3';
            if (needsResource(RESOURCE_HYDROGEN, 5000, 'E42N3')) {
                terminal1.send(RESOURCE_HYDROGEN, 1000, room)
            }
            if (needsResource(RESOURCE_OXYGEN, 5000, 'E42N3')) {
                terminal3.send(RESOURCE_OXYGEN, 1000, room)
            }
            //if (needsResource(RESOURCE_UTRIUM,5000,'E42N3')) {
            //    terminal4.send(RESOURCE_UTRIUM, 1000, room)
            //}
            if (needsResource(RESOURCE_KEANIUM, 5000, 'E42N3')) {
                terminal2.send(RESOURCE_KEANIUM, 1000, room)
            }
            if (needsResource(RESOURCE_LEMERGIUM, 5000, 'E42N3')) {
                terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
            }
            if (needsResource(RESOURCE_ZYNTHIUM, 5000, 'E42N3')) {
                terminal3.send(RESOURCE_ZYNTHIUM, 1000, room)
            }
            if (needsResource(RESOURCE_CATALYST, 5000, 'E42N3')) {
                terminal5.send(RESOURCE_CATALYST, 1000, room)
            }

            //MINERALS
            room = 'E42N1';
            if (needsResource(RESOURCE_HYDROGEN, 5000, 'E42N1')) {
                terminal1.send(RESOURCE_HYDROGEN, 1000, room)
            }
            if (needsResource(RESOURCE_OXYGEN, 5000, 'E42N1')) {
                terminal3.send(RESOURCE_OXYGEN, 1000, room)
            }
            if (needsResource(RESOURCE_UTRIUM, 5000, 'E42N1')) {
                terminal4.send(RESOURCE_UTRIUM, 1000, room)
            }
            if (needsResource(RESOURCE_KEANIUM, 5000, 'E42N1')) {
                terminal2.send(RESOURCE_KEANIUM, 1000, room)
            }
            if (needsResource(RESOURCE_LEMERGIUM, 5000, 'E42N1')) {
                terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
            }
            if (needsResource(RESOURCE_ZYNTHIUM, 5000, 'E42N1')) {
                terminal3.send(RESOURCE_ZYNTHIUM, 1000, room)
            }
            //if (needsResource(RESOURCE_CATALYST,5000,'E42N1')) {
            //    terminal5.send(RESOURCE_CATALYST, 1000, room)
            //}

*/
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
                if (creep.memory.role === 'healerE43N4') {
                    roleHealer.run(creep);
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


                //LONG DISTANCE

                if (creep.memory.role === 'longDistanceReserver') {
                    roleReserver.run(creep);
                }


                if (creep.memory.role === 'longDistanceHarvesterSo') {
                    roleLongDistanceHarvesterSource.run(creep);
                }
                if (creep.memory.role === 'longDistanceHarvesterCo') {
                    roleLongDistanceHarvesterContainer.run(creep);
                }
                if (creep.memory.role === 'longDistanceHarvesterLi') {
                    roleLongDistanceHarvesterLink.run(creep);
                }
                if (creep.memory.role === 'longDistanceHarvesterSt') {
                    roleLongDistanceHarvesterStorage.run(creep);
                }
                if (creep.memory.role === 'longDistanceHarvesterTe') {
                    roleLongDistanceHarvesterTerminal.run(creep);
                }


                if (creep.memory.role === 'longDistanceUpgraderSo') {
                    roleLongDistanceUpgraderSource.run(creep);
                }
                if (creep.memory.role === 'longDistanceUpgraderCo') {
                    roleLongDistanceUpgraderContainer.run(creep);
                }
                if (creep.memory.role === 'longDistanceUpgraderLi') {
                    roleLongDistanceUpgraderLink.run(creep);
                }
                if (creep.memory.role === 'longDistanceUpgraderSt') {
                    roleLongDistanceUpgraderStorage.run(creep);
                }
                if (creep.memory.role === 'longDistanceUpgraderTe') {
                    roleLongDistanceUpgraderTerminal.run(creep);
                }


                if (creep.memory.role === 'longDistanceTransfererCo') {
                    roleLongDistanceTransfererContainer.run(creep);
                }
                if (creep.memory.role === 'longDistanceTransfererLi') {
                    roleLongDistanceTransfererLink.run(creep);
                }
                if (creep.memory.role === 'longDistanceTransfererSt') {
                    roleLongDistanceTransfererStorage.run(creep);
                }
                if (creep.memory.role === 'longDistanceTransfererTe') {
                    roleLongDistanceTransfererTerminal.run(creep);
                }

                if (creep.memory.role === 'longDistanceBuilderSo') {
                    roleLongdistanceBuilderSource.run(creep);
                }
                if (creep.memory.role === 'longDistanceBuilderCo') {
                    roleLongdistanceBuilderContainer.run(creep);
                }
                if (creep.memory.role === 'longDistanceBuilderLi') {
                    roleLongdistanceBuilderLink.run(creep);
                }
                if (creep.memory.role === 'longDistanceBuilderSt') {
                    roleLongdistanceBuilderStorage.run(creep);
                }
                if (creep.memory.role === 'longDistanceBuilderTe') {
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
                if (creep.memory.role === 'StransfererSt') {
                    roleTransfererStorage.run(creep);
                }
                if (creep.memory.role === 'StransfererTe') {
                    roleTransfererTerminal.run(creep);
                }

                //NORMAL

                if (creep.memory.role === 'harvesterSo1') {
                    roleHarvesterSource.run(creep);
                }
                if (creep.memory.role === 'harvesterSo2') {
                    roleHarvesterSource.run(creep);
                }
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

                if (creep.memory.role === 'harvesterSt1') {
                    roleHarvesterStorage.run(creep);
                }
                if (creep.memory.role === 'harvesterSt2') {
                    roleHarvesterStorage.run(creep);
                }

                if (creep.memory.role === 'harvesterTe1') {
                    roleHarvesterTerminal.run(creep);
                }
                if (creep.memory.role === 'harvesterTe2') {
                    roleHarvesterTerminal.run(creep);
                }

                if (creep.memory.role === 'extractorCo') {
                    roleExtractorContainer.run(creep);
                }

                if (creep.memory.role === 'extractorLi') {
                    roleExtractorLink.run(creep);
                }

                if (creep.memory.role === 'extractorSt') {
                    roleExtractorStorage.run(creep);
                }

                if (creep.memory.role === 'extractorTe') {
                    roleExtractorTerminal.run(creep);
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
                if (creep.memory.role === 'transfererLiSt') {
                    roleTransfererLinkToStorage.run(creep);
                }
                if (creep.memory.role === 'transfererFromTo') {
                    roleTransfererFromTo.run(creep);
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
                if (creep.memory.role === 'upgraderSt') {
                    roleUpgraderStorage.run(creep);
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
                if (creep.memory.role === 'builderSt') {
                    roleBuilderStorage.run(creep);
                }
                if (creep.memory.role === 'builderTe') {
                    roleBuilderTerminal.run(creep);
                }


                if (creep.memory.role === 'repairerSo') {
                    roleRepairerSource.run(creep);
                }
                if (creep.memory.role === 'repairerCo') {
                    roleRepairerContainer.run(creep);
                }
                if (creep.memory.role === 'repairerLi') {
                    roleRepairerLink.run(creep);
                }
                if (creep.memory.role === 'repairerSt') {
                    roleRepairerStorage.run(creep);
                }
                if (creep.memory.role === 'repairerTe') {
                    roleRepairerTerminal.run(creep);
                }


                if (creep.memory.role === 'wallRepairerSo') {
                    roleWallRepairerSource.run(creep);
                }
                if (creep.memory.role === 'wallRepairerCo') {
                    roleWallRepairerContainer.run(creep);
                }
                if (creep.memory.role === 'wallRepairerLi') {
                    roleWallRepairerLink.run(creep);
                }
                if (creep.memory.role === 'wallRepairerSt') {
                    roleWallRepairerStorage.run(creep);
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
                if (creep.memory.role === 'tombstonePickerSt') {
                    roleTombstonePickerStorage.run(creep);
                }
                if (creep.memory.role === 'tombstonePickerTe') {
                    roleTombstonePickerTerminal.run(creep);
                }
            }


            let harvester;
            let transferer;

            let home;
            let spawn;
            let spawn2;

            function needsCreeps(role, room, numbers) {
                let numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role === role && c.memory.home === home);
                return numberOfCreeps < numbers
            }

            home = 'E43N3';
            spawn = 'E43N3';
            spawn2 = 'E43N32';
            harvester = Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY],
                'Harvester' + Game.time,
                {dryRun: true});
            transferer = Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                'Transferer' + Game.time,
                {dryRun: true});

            if (needsCreeps("harvesterCo1", home, 0) && needsCreeps("SharvesterCo1", home, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterCo1',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab57",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterCo2", home, 0) && needsCreeps("SharvesterCo2", home, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterCo2',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab59",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi1", home, 1) && needsCreeps("SharvesterLi1", home, 1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterLi1',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab57",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi2", home, 1) && needsCreeps("SharvesterLi2", home, 1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterLi2',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab59",
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererCo", home, 0) && needsCreeps("StransfererCo", home, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLi", home, 0) && needsCreeps("StransfererLi", home, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererTe", home, 0) && needsCreeps("StransfererTe", home, 4) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLiSt", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        CARRY, CARRY],
                    'TransfererLinkTerminal' + Game.time,
                    {
                        memory: {
                            role: 'transfererLiSt',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterCo1", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterCo1',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab57",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterCo2", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterCo2',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab59",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi1", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterLi1',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab57",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi2", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterLi2',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab59",
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLi", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time,
                    {
                        memory: {
                            role: 'wallRepairerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time,
                    {
                        memory: {
                            role: 'wallRepairerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time, {
                        memory: {
                            role: 'wallRepairerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("extractorSt", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Extractor' + Game.time,
                    {
                        memory: {
                            role: 'extractorSt',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("scientist", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Scientist' + Game.time,
                    {
                        memory: {
                            role: 'scientist',
                            lab1: '5d46240e14989673a6250bc2',
                            lab2: '5d46a72fb82e1179ccbc22b7',
                            lab3: '5d471b0cb8211979f8d37a44',
                            lab4: '5d471b0cb8211979f8d37a44',
                            lab5: '5d471b0cb8211979f8d37a44',
                            lab6: '5d471b0cb8211979f8d37a44',
                            lab7: '5d471b0cb8211979f8d37a44',
                            lab8: '5d471b0cb8211979f8d37a44',
                            lab9: '5d471b0cb8211979f8d37a44',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("labPick", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        CARRY, CARRY],
                    'LabPicker' + Game.time,
                    {
                        memory: {
                            role: 'labPick',
                            lab1: '5d46240e14989673a6250bc2',
                            lab2: '5d46a72fb82e1179ccbc22b7',
                            lab3: '5d471b0cb8211979f8d37a44',
                            lab4: '5d471b0cb8211979f8d37a44',
                            lab5: '5d471b0cb8211979f8d37a44',
                            lab6: '5d471b0cb8211979f8d37a44',
                            lab7: '5d471b0cb8211979f8d37a44',
                            lab8: '5d471b0cb8211979f8d37a44',
                            lab9: '5d471b0cb8211979f8d37a44',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("attackerE43N4", home, 0)) {
                Game.spawns[spawn2].spawnCreep(
                    [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK],
                    'ATTACKER' + Game.time,
                    {
                        memory: {
                            role: 'attackerE43N4',
                            home: home,
                            target: 'E43N4'
                        }
                    });
            } else if (needsCreeps("healerE43N4", home, 0)) {
                Game.spawns[spawn2].spawnCreep(
                    [TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        HEAL, HEAL, HEAL, HEAL, HEAL],
                    'HEALER' + Game.time,
                    {
                        memory: {
                            role: 'healerE43N4',
                            home: home,
                            target: 'E43N4'
                        }
                    });
            } else if (needsCreeps("longDistanceHarvester11", home, 0)) {
                Game.spawns[spawn2].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'longDistanceHarvester' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceHarvester11',
                            working: false,
                            home: home,
                            target: 'E43N4',
                            sourceId: '5bbcaf859099fc012e63ab55'
                        }
                    });
            } else if (needsCreeps("longDistanceHarvester12", home, 0)) {
                Game.spawns[spawn2].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'longDistanceHarvester' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceHarvester12',
                            working: false,
                            home: home,
                            target: 'E43N4',
                            sourceId: '5bbcaf859099fc012e63ab53'
                        }
                    });
            } else if (needsCreeps("longDistanceTransferer1", home, 0)) {
                Game.spawns[spawn2].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'longDistanceTransferer' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceTransferer1',
                            working: false,
                            home: home,
                            target: 'E43N4'
                        }
                    });
            } else if (needsCreeps("longDistanceBuilder1", home, 0)) {
                Game.spawns[spawn2].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'longDistanceBuilder' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceBuilder1',
                            working: false,
                            home: home,
                            target: 'E43N4'
                        }
                    });
            } else if (needsCreeps("longDistanceReserver1", home, 0)) {
                Game.spawns[spawn2].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CLAIM, CLAIM],
                    'longDistanceReserver' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceReserver1',
                            working: false,
                            home: home,
                            target: 'E43N4'
                        }
                    });
            } else if (needsCreeps("longDistanceHarvesterSource1", home, 0)) {
                Game.spawns[spawn2].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'longDistanceHarvester' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceHarvesterSource1',
                            working: false,
                            home: home,
                            target: 'E43N4'
                        }
                    });
            } else if (needsCreeps("longDistanceHarvester21", home, 0)) {
                Game.spawns[spawn2].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'longDistanceHarvester' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceHarvester21',
                            working: false,
                            home: home,
                            target: 'E44N3',
                            sourceId: '5bbcaf969099fc012e63ad45'
                        }
                    });
            } else if (needsCreeps("longDistanceHarvester22", home, 0)) {
                Game.spawns[spawn2].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'longDistanceHarvester' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceHarvester22',
                            working: false,
                            home: home,
                            target: 'E44N3',
                            sourceId: '5bbcaf969099fc012e63ad44'
                        }
                    });
            } else if (needsCreeps("longDistanceTransferer2", home, 0)) {
                Game.spawns[spawn2].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'longDistanceTransferer' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceTransferer2',
                            working: false,
                            home: home,
                            target: 'E44N3'
                        }
                    });
            } else if (needsCreeps("longDistanceBuilder2", home, 0)) {
                Game.spawns[spawn2].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'longDistanceBuilder' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceBuilder2',
                            working: false,
                            home: home,
                            target: 'E44N3'
                        }
                    });
            } else if (needsCreeps("longDistanceReserver2", home, 0)) {
                Game.spawns[spawn2].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CLAIM, CLAIM],
                    'longDistanceReserver' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceReserver2',
                            working: false,
                            home: home,
                            target: 'E44N3'
                        }
                    });
            } else if (needsCreeps("longDistanceHarvesterSource2", home, 0)) {
                Game.spawns[spawn2].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'longDistanceHarvester' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceHarvesterSource2',
                            working: false,
                            home: home,
                            target: 'E44N3'
                        }
                    });
            } else if (needsCreeps("longDistanceBuilder21", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'longDistanceBuilder' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceBuilder21',
                            working: false,
                            home: home,
                            target: 'E43N1'
                        }
                    });
            }


            home = "E43N2";
            spawn = "E43N2-1";
            spawn2 = 'E43N2-3';

            harvester = Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY],
                'Harvester' + Game.time,
                {dryRun: true});
            transferer = Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                'Transferer' + Game.time,
                {dryRun: true});

            if (needsCreeps("harvesterCo1", home, 0) && needsCreeps("SharvesterCo1", home, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterCo1',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab5c",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterCo2", home, 0) && needsCreeps("SharvesterCo2", home, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterCo2',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab5b",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi1", home, 1) && needsCreeps("SharvesterLi1", home, 1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterLi1',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab5c",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi2", home, 1) && needsCreeps("SharvesterLi2", home, 1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterLi2',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab5b",
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererCo", home, 0) && needsCreeps("StransfererCo", home, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLi", home, 0) && needsCreeps("StransfererLi", home, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererTe", home, 1) && needsCreeps("StransfererTe", home, 4) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLiTe", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        CARRY, CARRY],
                    'TransfererLinkTerminal' + Game.time,
                    {
                        memory: {
                            role: 'transfererLiTe',
                            working: false,
                            home: home
                        }, directions: [TOP_RIGHT]

                    });
            } else if (needsCreeps("harvesterCo1", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterCo1',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab5c",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterCo2", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterCo2',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab5b",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi1", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterLi1',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab5c",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi2", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterLi2',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab5b",
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererTe", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderTe", home, 0)) {
                Game.spawns[spawn2].spawnCreep(
                    [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                        WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                        CARRY,CARRY,CARRY,CARRY,CARRY,],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time, {
                        memory: {
                            role: 'wallRepairerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time, {
                        memory: {
                            role: 'wallRepairerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time, {
                        memory: {
                            role: 'wallRepairerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("extractorSt", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Extractor' + Game.time,
                    {
                        memory: {
                            role: 'extractorSt',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("scientist", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Scientist' + Game.time,
                    {
                        memory: {
                            role: 'scientist',
                            lab1: '5d6f74fb18572120dd10e410',
                            lab2: '5d6ed75a849da1756658fa74',
                            lab3: '5d463a0fa95a521e2966728b',
                            lab4: '5d6ef93f8cee062b514e05c0',
                            lab5: '5d6fb7f88cee062b514e51f3',
                            lab6: '5d7009842d46c820daf44bb4',
                            lab7: '5d7009842d46c820daf44bb4',
                            lab8: '5d7009842d46c820daf44bb4',
                            lab9: '5d7009842d46c820daf44bb4',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("labPick", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        CARRY, CARRY],
                    'LabPicker' + Game.time,
                    {
                        memory: {
                            role: 'labPick',
                            lab1: '5d6f74fb18572120dd10e410',
                            lab2: '5d6ed75a849da1756658fa74',
                            lab3: '5d463a0fa95a521e2966728b',
                            lab4: '5d6ef93f8cee062b514e05c0',
                            lab5: '5d6fb7f88cee062b514e51f3',
                            lab6: '5d7009842d46c820daf44bb4',
                            lab7: '5d7009842d46c820daf44bb4',
                            lab8: '5d7009842d46c820daf44bb4',
                            lab9: '5d7009842d46c820daf44bb4',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("longDistanceBuilder21", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'longDistanceBuilder' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceBuilder21',
                            working: false,
                            home: home,
                            target: 'E43N1'
                        }
                    });
            }


            home = 'E42N2';
            spawn = 'E42N2';
            harvester = Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY],
                'Harvester' + Game.time,
                {dryRun: true});
            transferer = Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                'Transferer' + Game.time,
                {dryRun: true});
            if (needsCreeps("harvesterCo1", home, 0) && needsCreeps("SharvesterCo1", home, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterCo1',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9d0",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterCo2", home, 0) && needsCreeps("SharvesterCo2", home, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterCo2',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9d2",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi1", home, 1) && needsCreeps("SharvesterLi1", home, 1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterLi1',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9d0",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi2", home, 1) && needsCreeps("SharvesterLi2", home, 1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterLi2',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9d2",
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererCo", home, 0) && needsCreeps("StransfererCo", home, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLi", home, 0) && needsCreeps("StransfererLi", home, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererTe", home, 1) && needsCreeps("StransfererTe", home, 4) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLiTe", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        CARRY, CARRY],
                    'TransfererLinkTerminal' + Game.time,
                    {
                        memory: {
                            role: 'transfererLiTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterCo1", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterCo1',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9d0",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterCo2", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterCo2',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9d2",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi1", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterLi1',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9d0",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi2", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterLi2',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9d2",
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererTe", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time, {
                        memory: {
                            role: 'wallRepairerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time, {
                        memory: {
                            role: 'wallRepairerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time, {
                        memory: {
                            role: 'wallRepairerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("longDistanceBuilderTeE42N1", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                    'LongDistanceBuilderE44N3' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceBuilderTeE42N1',
                            working: false,
                            home: home,
                            target: 'E42N1'
                        }
                    });
            } else if (needsCreeps("extractorSt", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Extractor' + Game.time,
                    {
                        memory: {
                            role: 'extractorSt',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("scientist", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY],
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
                            lab7: '5d5525413a990a6377202706',
                            lab8: '5d5525413a990a6377202706',
                            lab9: '5d5525413a990a6377202706',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("labPick", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        CARRY, CARRY],
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
                            home: home
                        }
                    });
            }


            home = 'E42N3';
            spawn = 'E42N3';
            harvester = Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY],
                'Harvester' + Game.time,
                {dryRun: true});
            transferer = Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                'Transferer' + Game.time,
                {dryRun: true});
            if (needsCreeps("harvesterCo1", home, 0) && needsCreeps("SharvesterCo1", home, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterCo1',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9cd",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterCo2", home, 0) && needsCreeps("SharvesterCo2", home, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterCo2',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9ce",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi1", home, 1) && needsCreeps("SharvesterLi1", home, 2) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterLi1',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9cd",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi2", home, 1) && needsCreeps("SharvesterLi2", home, 2) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterLi2',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9ce",
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererCo", home, 0) && needsCreeps("StransfererCo", home, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLi", home, 0) && needsCreeps("StransfererLi", home, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererTe", home, 1) && needsCreeps("StransfererTe", home, 4) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLiTe", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'TransfererLinkTerminal' + Game.time,
                    {
                        memory: {
                            role: 'transfererLiTe',
                            working: false,
                            home: home
                        }
                    });


            } else if (needsCreeps("harvesterCo1", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterCo1',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9cd",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterCo2", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterCo2',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9ce",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi1", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterLi1',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9cd",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi2", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterLi2',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9ce",
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererTe", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderLi", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time, {
                        memory: {
                            role: 'wallRepairerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time, {
                        memory: {
                            role: 'wallRepairerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time, {
                        memory: {
                            role: 'wallRepairerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("extractorSt", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Extractor' + Game.time,
                    {
                        memory: {
                            role: 'extractorSt',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("scientist", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Scientist' + Game.time,
                    {
                        memory: {
                            role: 'scientist',
                            lab1: '5d6ee725b5e0621e0bc7f4e8',
                            lab2: '5d6f078b0ebed21e32792f01',
                            lab3: '5d6f7b2c31f4ac407ee5032e',
                            lab4: '5d6f7b2c31f4ac407ee5032e',
                            lab5: '5d6f7b2c31f4ac407ee5032e',
                            lab6: '5d6f7b2c31f4ac407ee5032e',
                            lab7: '5d6f7b2c31f4ac407ee5032e',
                            lab8: '5d6f7b2c31f4ac407ee5032e',
                            lab9: '5d6f7b2c31f4ac407ee5032e',
                            working: false,
                            home: home
                        }
                    });
            }


            home = 'E42N1';
            spawn = 'E42N1';
            harvester = Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE, MOVE, MOVE,
                    WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY],
                'Harvester' + Game.time,
                {dryRun: true});
            transferer = Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                'Transferer' + Game.time,
                {dryRun: true});
            if (needsCreeps("harvesterCo1", home, 0) && needsCreeps("SharvesterCo1", home, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterCo1',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9d4",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterCo2", home, 0) && needsCreeps("SharvesterCo2", home, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterCo2',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9d4",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvester", home, 1) && needsCreeps("Sharvester", home, 2) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'Sharvester',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9d4",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi2", home, 0) && needsCreeps("SharvesterLi2", home, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterLi2',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9d4",
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererCo", home, 0) && needsCreeps("StransfererCo", home, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLi", home, 0) && needsCreeps("StransfererLi", home, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererTe", home, 1) && needsCreeps("StransfererTe", home, 4) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLiTe", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        CARRY, CARRY],
                    'TransfererLinkTerminal' + Game.time,
                    {
                        memory: {
                            role: 'transfererLiTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterCo1", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterCo1',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9d4",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterCo2", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterCo2',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9d4",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi1", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterLi1',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9d4",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterLi2", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterLi2',
                            working: false,
                            sourceId: "5bbcaf719099fc012e63a9d4",
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererTe", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderTe", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK,
                        CARRY, CARRY, CARRY],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK,
                        CARRY, CARRY, CARRY],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK,
                        CARRY, CARRY, CARRY],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK,
                        CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK,
                        CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK,
                        CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK,
                        CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time,
                    {
                        memory: {
                            role: 'wallRepairerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK,
                        CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time,
                    {
                        memory: {
                            role: 'wallRepairerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK,
                        CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time,
                    {
                        memory: {
                            role: 'wallRepairerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("extractorSt", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Extractor' + Game.time,
                    {
                        memory: {
                            role: 'extractorSt',
                            working: false,
                            home: home
                        }
                    });
            }


            home = 'E43N1';
            spawn = 'E43';
            harvester = Game.spawns[spawn].spawnCreep(
                [MOVE,
                    WORK, WORK, WORK,
                    CARRY],
                'Harvester' + Game.time,
                {dryRun: true});
            transferer = Game.spawns[spawn].spawnCreep(
                [MOVE, MOVE, MOVE, MOVE,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                'Transferer' + Game.time,
                {dryRun: true});
            if (needsCreeps("harvesterCo1", home, 2) && needsCreeps("SharvesterCo1", home, 2) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'SharvesterCo1',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab5f",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvester", home, 0) && needsCreeps("Sharvester", home, 0) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY],
                    'StarterHarvester' + Game.time,
                    {
                        memory: {
                            role: 'Sharvester',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab5f",
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererCo", home, 4) && needsCreeps("StransfererCo", home, 2) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLi", home, 0) && needsCreeps("StransfererLi", home, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererTe", home, 0) && needsCreeps("StransfererTe", home, 0) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY],
                    'StarterTransferer' + Game.time,
                    {
                        memory: {
                            role: 'StransfererTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLiTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        CARRY, CARRY],
                    'TransfererLinkTerminal' + Game.time,
                    {
                        memory: {
                            role: 'transfererLiTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("harvesterCo1", home, 2)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK, WORK,
                        CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvesterCo1',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab5f",
                            home: home
                        }
                    });
            } else if (needsCreeps("harvester", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK, WORK,
                        CARRY],
                    'Harvester' + Game.time,
                    {
                        memory: {
                            role: 'harvester',
                            working: false,
                            sourceId: "5bbcaf859099fc012e63ab5f",
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererCo", home, 4)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("transfererTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Transferer' + Game.time,
                    {
                        memory: {
                            role: 'transfererTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderCo", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK, WORK,
                        CARRY, CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("upgraderTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK, WORK,
                        CARRY, CARRY],
                    'Upgrader' + Game.time,
                    {
                        memory: {
                            role: 'upgraderTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderCo", home, 1)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE,
                        WORK, WORK,
                        CARRY, CARRY, CARRY],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK,
                        CARRY, CARRY, CARRY],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("builderTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK,
                        CARRY, CARRY, CARRY],
                    'Builder' + Game.time,
                    {
                        memory: {
                            role: 'builderTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK,
                        CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK,
                        CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("repairerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK,
                        CARRY, CARRY, CARRY],
                    'Repairer' + Game.time,
                    {
                        memory: {
                            role: 'repairerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK,
                        CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time,
                    {
                        memory: {
                            role: 'wallRepairerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK,
                        CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time,
                    {
                        memory: {
                            role: 'wallRepairerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("wallRepairerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE,
                        WORK,
                        CARRY, CARRY, CARRY],
                    'WallRepairer' + Game.time,
                    {
                        memory: {
                            role: 'wallRepairerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerCo", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerCo',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerLi", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerLi',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("tombstonePickerTe", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE,
                        CARRY, CARRY, CARRY, CARRY],
                    'tombstonePicker' + Game.time,
                    {
                        memory: {
                            role: 'tombstonePickerTe',
                            working: false,
                            home: home
                        }
                    });
            } else if (needsCreeps("extractorSt", home, 0)) {
                Game.spawns[spawn].spawnCreep(
                    [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                        WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                    'Extractor' + Game.time,
                    {
                        memory: {
                            role: 'extractorSt',
                            working: false,
                            home: home
                        }
                    });
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

        Game.spawns['E43N3'].spawnCreep(
            [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE,MOVE,MOVE,MOVE,MOVE],
            'transfie',
            {
                memory: {
                    role: 'transfererLiSt',
                    working: false,
                }
            });

        Game.spawns['E43N3'].spawnCreep(
            [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,],
            'builder4',
            {
                memory: {
                    role: 'builderSt',
                    working: false,
                }
            });
         */


            if (!Memory.stats) {
                Memory.stats = {}
            }
            Memory.stats['cpu.getUsed'] = Game.cpu.getUsed();
            Memory.stats['cpu.limit'] = Game.cpu.limit;
            Memory.stats['cpu.bucket'] = Game.cpu.bucket;
            Memory.stats['cpu.tickLimit'] = Game.cpu.tickLimit;

            Memory.stats['gcl.progress'] = Game.gcl.progress;
            Memory.stats['gcl.progressTotal'] = Game.gcl.progressTotal;
            Memory.stats['gcl.level'] = Game.gcl.level;

            //Memory.stats['te.total'] = terminalTotal;
            //Memory.stats['st.total'] = storageTotal;

            //Memory.stats['te.max'] = terminalTMa;
            //Memory.stats['te.min'] = terminalTMi;

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


            _.forEach(Object.keys(Game.rooms), function (roomName) {
                let room = Game.rooms[roomName];
                let wall = room.find(FIND_STRUCTURES, {
                    filter: (s) => s.structureType === STRUCTURE_WALL
                });
                let wall2 = _.sum(room.find(FIND_STRUCTURES), s => (s.structureType === STRUCTURE_WALL) ? s.hits : 0);

                let rampart = room.find(FIND_STRUCTURES, {
                    filter: (s) => s.structureType === STRUCTURE_RAMPART
                });
                let rampart2 = _.sum(room.find(FIND_STRUCTURES), s => (s.structureType === STRUCTURE_RAMPART) ? s.hits : 0);


                if (room.controller && room.controller.my) {
                    Memory.stats['rooms.' + roomName + '.rcl.level'] = room.controller.level;
                    Memory.stats['rooms.' + roomName + '.rcl.progress'] = room.controller.progress;
                    Memory.stats['rooms.' + roomName + '.rcl.progressTotal'] = room.controller.progressTotal;

                    Memory.stats['rooms.' + roomName + '.spawn.energy'] = room.energyAvailable;
                    Memory.stats['rooms.' + roomName + '.spawn.energyTotal'] = room.energyCapacityAvailable;

                    Memory.stats['rooms.' + roomName + '.wall.hits'] = wall2 / wall.length;
                    Memory.stats['rooms.' + roomName + '.rampart.hits'] = rampart2 / rampart.length;

                    if (room.storage) {
                        Memory.stats['rooms.' + roomName + '.storage.energy'] = room.storage.store.energy[RESOURCE_ENERGY];
                    }
                    if (room.terminal) {
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
        }
    });
};