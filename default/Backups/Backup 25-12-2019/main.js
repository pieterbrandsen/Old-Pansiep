//Import roles
require('prototype.tower');
require('prototype.Room.structures');

const traveler = require('traveler');
const roleAttacker = require('role.attacker');
const roleHealer = require('role.healer');

const roleHarvester = require('role.harvester');
const roleHarvesterSource = require('role.harvesterSource');
const roleHarvesterContainer = require('role.harvesterContainer');
const roleHarvesterLink = require('role.harvesterLink');
const roleHarvesterStorage = require('role.harvesterStorage');
const roleHarvesterTerminal = require('role.harvesterTerminal');

const roleExtractorContainer = require('role.extractorContainer');
const roleExtractorLink = require('role.extractorLink');
const roleExtractorStorage = require('role.extractorStorage');
const roleExtractorTerminal = require('role.extractorTerminal');


const roleUpgrader = require('role.upgrader');
const roleUpgraderSource = require('role.upgraderSource');
const roleUpgraderContainer = require('role.upgraderContainer');
const roleUpgraderLink = require('role.upgraderLink');
const roleUpgraderStorage = require('role.upgraderStorage');
const roleUpgraderTerminal = require('role.upgraderTerminal');

const roleTransferer = require('role.transferer');
const roleTransfererFromTo = require('role.transfererFromTo');
const roleTransfererContainer = require('role.transfererContainer');
const roleTransfererLink = require('role.transfererLink');
const roleTransfererLinkToTerminal = require('role.transfererLinkToTerminal');
const roleTransfererLinkToStorage = require('role.transfererLinkToStorage');
const roleTransfererStorage = require('role.transfererStorage');
const roleTransfererTerminal = require('role.transfererTerminal');


const roleBuilder = require('role.builder');
const roleBuilderSource = require('role.builderSources');
const roleBuilderContainer = require('role.builderContainer');
const roleBuilderLink = require('role.builderLink');
const roleBuilderStorage = require('role.builderStorage');
const roleBuilderTerminal = require('role.builderTerminal');


const roleRepairer = require('role.repairer');
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
            let energyHarvested;
            
            /*if (!Creep.prototype._harvest) {

                // Store the original method
                Creep.prototype._harvest = Creep.prototype.harvest;

                // Create our new function
                Creep.prototype.harvest = function() {
                    
                    // Add custom functionality
                    let energyHarvested = 10
                    Memory.stats['energy'] = 0 + energyHarvested    

                    // Call and return the original method
                    return this.harvest();
                };
            }*/


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



            //Find Terminals

            const terminalt1 = Game.rooms['E43N3'].terminal.store[RESOURCE_ENERGY];
            const terminalt2 = Game.rooms['E43N2'].terminal.store[RESOURCE_ENERGY];
            const terminalt3 = Game.rooms['E42N2'].terminal.store[RESOURCE_ENERGY];
            const terminalt4 = Game.rooms['E42N3'].terminal.store[RESOURCE_ENERGY];
            const terminalt5 = Game.rooms['E42N1'].terminal.store[RESOURCE_ENERGY];
            const terminalt6 = Game.rooms['E43N1'].terminal.store[RESOURCE_ENERGY];
            const terminalt7 = Game.rooms['E43N4'].terminal.store[RESOURCE_ENERGY];
            const terminalt8 = Game.rooms['E44N3'].terminal.store[RESOURCE_ENERGY];


            const storaget1 = Game.rooms['E43N3'].storage.store[RESOURCE_ENERGY];
            const storaget2 = Game.rooms['E43N2'].storage.store[RESOURCE_ENERGY];
            const storaget3 = Game.rooms['E42N2'].storage.store[RESOURCE_ENERGY];
            const storaget4 = Game.rooms['E42N3'].storage.store[RESOURCE_ENERGY];
            const storaget5 = Game.rooms['E42N1'].storage.store[RESOURCE_ENERGY];
            const storaget6 = Game.rooms['E43N1'].storage.store[RESOURCE_ENERGY];
            const storaget7 = Game.rooms['E43N4'].storage.store[RESOURCE_ENERGY];
            const storaget8 = Game.rooms['E44N3'].storage.store[RESOURCE_ENERGY];


            const terminal1 = Game.rooms['E43N3'].terminal;
            const terminal2 = Game.rooms['E43N2'].terminal;
            const terminal3 = Game.rooms['E42N2'].terminal;
            const terminal4 = Game.rooms['E42N3'].terminal;
            const terminal5 = Game.rooms['E42N1'].terminal;
            const terminal6 = Game.rooms['E43N1'].terminal;
            const terminal7 = Game.rooms['E43N4'].terminal;
            const terminal8 = Game.rooms['E44N3'].terminal;

            let terminalTMi = Math.min(terminalt1, terminalt2, terminalt3, terminalt4, terminalt5, terminalt6, terminalt7, terminalt8);
            let terminalTMa = Math.max(terminalt1, terminalt2, terminalt3, terminalt4, terminalt5, terminalt6, terminalt7, terminalt8);
            let storageTMi = Math.min(storaget1, storaget2, storaget3, storaget4, storaget5, storaget6, storaget7, storaget8);
            let storageTMa = Math.max(storaget1, storaget2, storaget3, storaget4, storaget5, storaget6, storaget7, storaget8);
            let terminalSend = 10000;
            if (terminalTMa !== undefined && (terminalTMi < 10000 && terminalTMa > 20000)) {
                if (terminalt1 === terminalTMa) {
                    if (terminalt2 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalt2 + terminalSend) {
                            terminal1.send(RESOURCE_ENERGY, terminalSend, 'E43N2', 'Max to Min')
                        }
                    }
                    if (terminalt3 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal1.send(RESOURCE_ENERGY, terminalSend, 'E42N2', 'Max to Min')
                        }
                    }
                    if (terminalt4 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal1.send(RESOURCE_ENERGY, terminalSend, 'E42N3', 'Max to Min')
                        }
                    }
                    if (terminalt5 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal1.send(RESOURCE_ENERGY, terminalSend, 'E42N1', 'Max to Min')
                        }
                    }
                    if (terminalt6 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal1.send(RESOURCE_ENERGY, terminalSend, 'E43N1', 'Max to Min')
                        }
                    }
                    if (terminalt7 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal1.send(RESOURCE_ENERGY, terminalSend, 'E43N4', 'Max to Min')
                        }
                    }
                    if (terminalt8 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal1.send(RESOURCE_ENERGY, terminalSend, 'E44N3', 'Max to Min')
                        }
                    }
                }

                if (terminalt2 === terminalTMa) {
                    if (terminalt1 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal2.send(RESOURCE_ENERGY, terminalSend, 'E43N3', 'Max to Min')
                        }
                    }
                    if (terminalt3 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal2.send(RESOURCE_ENERGY, terminalSend, 'E42N2', 'Max to Min')
                        }
                    }
                    if (terminalt4 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal2.send(RESOURCE_ENERGY, terminalSend, 'E42N3', 'Max to Min')
                        }
                    }
                    if (terminalt5 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal2.send(RESOURCE_ENERGY, terminalSend, 'E42N1', 'Max to Min')
                        }
                    }
                    if (terminalt6 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal2.send(RESOURCE_ENERGY, terminalSend, 'E43N1', 'Max to Min')
                        }
                    }
                    if (terminalt7 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal2.send(RESOURCE_ENERGY, terminalSend, 'E43N4', 'Max to Min')
                        }
                    }
                    if (terminalt8 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal2.send(RESOURCE_ENERGY, terminalSend, 'E44N3', 'Max to Min')
                        }
                    }
                }

                if (terminalt3 === terminalTMa) {
                    if (terminalt1 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal3.send(RESOURCE_ENERGY, terminalSend, 'E43N3', 'Max to Min')
                        }
                    }
                    if (terminalt2 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal3.send(RESOURCE_ENERGY, terminalSend, 'E43N2', 'Max to Min')
                        }
                    }
                    if (terminalt4 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal3.send(RESOURCE_ENERGY, terminalSend, 'E42N3', 'Max to Min')
                        }
                    }
                    if (terminalt5 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal3.send(RESOURCE_ENERGY, terminalSend, 'E42N1', 'Max to Min')
                        }
                    }
                    if (terminalt6 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal3.send(RESOURCE_ENERGY, terminalSend, 'E43N1', 'Max to Min')
                        }
                    }
                    if (terminalt7 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal3.send(RESOURCE_ENERGY, terminalSend, 'E43N4', 'Max to Min')
                        }
                    }
                    if (terminalt8 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal3.send(RESOURCE_ENERGY, terminalSend, 'E44N3', 'Max to Min')
                        }
                    }
                }   

                if (terminalt4 === terminalTMa) {
                    if (terminalt1 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal4.send(RESOURCE_ENERGY, terminalSend, 'E43N3', 'Max to Min')
                        }
                    }
                    if (terminalt2 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal4.send(RESOURCE_ENERGY, terminalSend, 'E43N2', 'Max to Min')
                        }
                    }
                    if (terminalt3 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal4.send(RESOURCE_ENERGY, terminalSend, 'E42N2', 'Max to Min')
                        }
                    }
                    if (terminalt5 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal4.send(RESOURCE_ENERGY, terminalSend, 'E42N1', 'Max to Min')
                        }
                    }
                    if (terminalt6 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal4.send(RESOURCE_ENERGY, terminalSend, 'E43N1', 'Max to Min')
                        }
                    }
                    if (terminalt7 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal4.send(RESOURCE_ENERGY, terminalSend, 'E43N4', 'Max to Min')
                        }
                    }
                    if (terminalt8 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal4.send(RESOURCE_ENERGY, terminalSend, 'E44N3', 'Max to Min')
                        }
                    }
                }

                if (terminalt5 === terminalTMa) {
                    if (terminalt1 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal5.send(RESOURCE_ENERGY, terminalSend, 'E43N3', 'Max to Min')
                        }
                    }
                    if (terminalt2 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal5.send(RESOURCE_ENERGY, terminalSend, 'E43N2', 'Max to Min')
                        }
                    }
                    if (terminalt3 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal5.send(RESOURCE_ENERGY, terminalSend, 'E42N2', 'Max to Min')
                        }
                    }
                    if (terminalt4 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal5.send(RESOURCE_ENERGY, terminalSend, 'E42N3', 'Max to Min')
                        }
                    }
                    if (terminalt6 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal5.send(RESOURCE_ENERGY, terminalSend, 'E43N1', 'Max to Min')
                        }
                    }
                    if (terminalt7 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal5.send(RESOURCE_ENERGY, terminalSend, 'E43N4', 'Max to Min')
                        }
                    }
                    if (terminalt8 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal5.send(RESOURCE_ENERGY, terminalSend, 'E44N3', 'Max to Min')
                        }
                    }
                }
                if (terminalt6 === terminalTMa) {
                    if (terminalt1 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal6.send(RESOURCE_ENERGY, terminalSend, 'E43N3', 'Max to Min')
                        }
                    }
                    if (terminalt2 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal6.send(RESOURCE_ENERGY, terminalSend, 'E43N2', 'Max to Min')
                        }
                    }
                    if (terminalt3 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal6.send(RESOURCE_ENERGY, terminalSend, 'E42N2', 'Max to Min')
                        }
                    }
                    if (terminalt4 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal6.send(RESOURCE_ENERGY, terminalSend, 'E42N3', 'Max to Min')
                        }
                    }
                    if (terminalt5 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal6.send(RESOURCE_ENERGY, terminalSend, 'E42N1', 'Max to Min')
                        }
                    }
                    if (terminalt7 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal6.send(RESOURCE_ENERGY, terminalSend, 'E43N4', 'Max to Min')
                        }
                    }
                    if (terminalt8 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal6.send(RESOURCE_ENERGY, terminalSend, 'E44N3', 'Max to Min')
                        }
                    }
                }
                if (terminalt7 === terminalTMa) {
                    if (terminalt1 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal7.send(RESOURCE_ENERGY, terminalSend, 'E43N3', 'Max to Min')
                        }
                    }
                    if (terminalt2 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal7.send(RESOURCE_ENERGY, terminalSend, 'E43N2', 'Max to Min')
                        }
                    }
                    if (terminalt3 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal7.send(RESOURCE_ENERGY, terminalSend, 'E42N2', 'Max to Min')
                        }
                    }
                    if (terminalt4 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal7.send(RESOURCE_ENERGY, terminalSend, 'E42N3', 'Max to Min')
                        }
                    }
                    if (terminalt5 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal7.send(RESOURCE_ENERGY, terminalSend, 'E42N1', 'Max to Min')
                        }
                    }
                    if (terminalt6 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal7.send(RESOURCE_ENERGY, terminalSend, 'E43N1', 'Max to Min')
                        }
                    }
                    if (terminalt8 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal7.send(RESOURCE_ENERGY, terminalSend, 'E44N3', 'Max to Min')
                        }
                    }
                }
                if (terminalt8 === terminalTMa) {
                    if (terminalt1 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal8.send(RESOURCE_ENERGY, terminalSend, 'E43N3', 'Max to Min')
                        }
                    }
                    if (terminalt2 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal8.send(RESOURCE_ENERGY, terminalSend, 'E43N2', 'Max to Min')
                        }
                    }
                    if (terminalt3 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal8.send(RESOURCE_ENERGY, terminalSend, 'E42N2', 'Max to Min')
                        }
                    }
                    if (terminalt4 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal8.send(RESOURCE_ENERGY, terminalSend, 'E42N3', 'Max to Min')
                        }
                    }
                    if (terminalt5 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal8.send(RESOURCE_ENERGY, terminalSend, 'E42N1', 'Max to Min')
                        }
                    }
                    if (terminalt6 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal8.send(RESOURCE_ENERGY, terminalSend, 'E43N1', 'Max to Min')
                        }
                    }
                    if (terminalt7 === terminalTMi && terminalTMi < terminalSend) {
                        if (terminalTMa > terminalTMi) {
                            terminal8.send(RESOURCE_ENERGY, terminalSend, 'E43N4', 'Max to Min')
                        }
                    }
                }
            }
            let terminalTotal = (terminalt1 + terminalt2 + terminalt3 + terminalt4 + terminalt5 + terminalt6 + terminalt7 + terminalt8);
            let storageTotal = (storaget1 + storaget2 + storaget3 + storaget4 + storaget5 + storaget6 + storaget7 + storaget8);

            if (Game.time % 100 === 0) {
                console.log(terminalTotal + ' Total Energy Terminal, ' + terminalTMi + ' Min Energy, ' + terminalTMa + ' Max Energy');
            }
            if (Game.time % 100 === 0) {
                console.log(storageTotal + ' Total Energy Storage, ' + storageTMi + ' Min Energy, ' + storageTMa + ' Max Energy');
            }
            if (Game.time % 100 === 0) {
                console.log();
            }
            if (terminalTotal > 350 * 1000) {
                Game.notify('Terminal Total Has More Then 350K Energy!' && terminalTotal)
            }


            const linkFrom11 = Game.getObjectById("5d2d8e9adbfe1b628e83c414");
            const linkTo11 = Game.getObjectById("5d7bb4301ab01071fe0844a1");
            const linkFrom12 = Game.getObjectById("5d36b82aab0b117cdc03b16b");
            const linkTo12 = Game.getObjectById("5d7de9fedfd5c272344fd7d2");
            linkFrom11.transferEnergy(linkTo11);
            linkFrom12.transferEnergy(linkTo11);
            if (terminalt1 > 5000) {
                linkTo11.transferEnergy(linkTo12);
            }


            const linkFrom21 = Game.getObjectById("5d47fc70de98312b1d990ff0");
            const linkTo21 = Game.getObjectById("5d7a2328eff0ae438dca2861");
            const linkTo22 = Game.getObjectById("5d7af0940e63d70d58c546a4");
            const linkFrom22 = Game.getObjectById("5d38856cc99c215de2febacd");

            linkFrom21.transferEnergy(linkTo21);
            linkFrom22.transferEnergy(linkTo21);
            if (terminalt2 > 5000) {
                linkTo21.transferEnergy(linkTo22);
            }


            const linkFrom31 = Game.getObjectById("5d38a7eb5c57a23fff55bb4c");
            const linkTo31 = Game.getObjectById("5d7dd55d128ef459c47c4c2d");
            const linkFrom32 = Game.getObjectById("5d49a74566d7ea40916001c0");
            const linkTo32 = Game.getObjectById("5d814dd02a6b4021bedf54bb");

            linkFrom31.transferEnergy(linkTo31);
            linkFrom32.transferEnergy(linkTo31);
            if (terminalt3 > 5000) {
                linkTo31.transferEnergy(linkTo32);
            }

            const linkFrom41 = Game.getObjectById("5d6fef036db51a75659d9308");
            const linkTo41 = Game.getObjectById("5d7cb365794b10135f3ddf6b");
            const linkFrom42 = Game.getObjectById("5d59ae9e3b552d638902b9f8");
            const linkTo42 = Game.getObjectById("5d7ecadea35eaa43411b2e77");

            linkFrom41.transferEnergy(linkTo41);
            linkFrom42.transferEnergy(linkTo41);
            if (terminalt4 > 5000) {
                linkTo41.transferEnergy(linkTo42);
            }


            const linkFrom51 = Game.getObjectById("5d5bf39b980b3520ebb8f2fb");
            const linkTo51 = Game.getObjectById("5d81187ca15f4d21c8e07fc1");
            const linkTo52 = Game.getObjectById("5d8114e2965eaf139a2c9ca4");

            linkFrom51.transferEnergy(linkTo51);
            if (terminalt5 > 5000) {
                linkTo51.transferEnergy(linkTo52);
            }

            const linkFrom61 = Game.getObjectById("5d7f42f2e8764e721d95cee7");
            const linkTo61 = Game.getObjectById("5db1c6dd0976205b86a14247"); 
            const linkTo62 = Game.getObjectById("5d7e2aeae8764e721d956210");

            if (linkFrom61.store[RESOURCE_ENERGY] > 100) {
                linkFrom61.transferEnergy(linkTo61);
            }
            if (terminalt6 > 5000) {
                linkTo61.transferEnergy(linkTo62);
            }

            // E43N4 //
            const linkFrom71 = Game.getObjectById("5dcb7808164235065d127fec");
            const linkFrom72 = Game.getObjectById("5dd58eb474452608e52c9531");
            //const linkTo71 = Game.getObjectById("5dcab3039fc06c2d06c37390"); 
            const linkTo72 = Game.getObjectById("5dff8b07f0aef968911368c1");

            linkFrom71.transferEnergy(linkTo72);
            linkFrom72.transferEnergy(linkTo72);
            /*if (terminalt7 > 5000) {
                linkTo71.transferEnergy(linkTo72);
            }*/

            const linkFrom81 = Game.getObjectById("5dca862e8247cf5255b236cf");
            const linkFrom82 = Game.getObjectById("5dbad29ed0b493656aeb9fbf"); 
            const linkTo82 = Game.getObjectById("5dcbe41857ce88a6f3582d2c");

            linkFrom81.transferEnergy(linkTo82);
            //linkFrom82.transferEnergy(linkTo82);

            let spawnEnergy;
            let spawnEnergyMax;
            let towers11 = Game.rooms.E43N3.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_TOWER
            });
            spawnEnergy = Game.rooms.E43N3.energyAvailable;
            spawnEnergyMax = Game.rooms.E43N3.energyCapacityAvailable;
            for (let tower11 of towers11) {
                let targetRepair11 = tower11.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.hits < 5000000
                });
                if (targetRepair11 !== undefined) {
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
                    filter: (s) => s.hits < s.hitsMax && s.hits < 3000000
                });
                if (targetRepair21 !== undefined) {
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
                    filter: (s) => s.hits < s.hitsMax && s.hits < 3000000
                });
                if (targetRepair31 !== undefined) {
                    tower31.repair(targetRepair31);
                }
            }

            let towers41 = Game.rooms.E42N3.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_TOWER
            });
            spawnEnergy = Game.rooms.E42N3.energyAvailable;
            spawnEnergyMax = Game.rooms.E42N3.energyCapacity;
            for (let tower41 of towers41) {
                let targetRepair41 = tower41.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.hits < 3000000
                });
                if (targetRepair41 !== undefined) {
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
                    filter: (s) => s.hits < s.hitsMax && s.hits < 3000000
                });
                if (targetRepair51 !== undefined) {
                    tower51.repair(targetRepair51);
                }
            }

            let towers61 = Game.rooms.E43N1.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_TOWER
            });
            for (let tower61 of towers61) {
                let targetRepair61 = tower61.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.hits < 3000000
                });
                if (targetRepair61 !== undefined) {
                    tower61.repair(targetRepair61);
                }
            }
            let towers71 = Game.rooms.E44N3.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_TOWER
            });
            for (let tower71 of towers71) {
                let targetRepair71 = tower71.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.hits < 1000000
                });
                if (targetRepair71 !== undefined) {
                    tower71.repair(targetRepair71);
                }
            }
            let towers81 = Game.rooms.E43N4.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_TOWER
            });
            for (let tower81 of towers81) {
                let targetRepair81 = tower81.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.hits < 1000000
                });
                if (targetRepair81 !== undefined) {
                    tower81.repair(targetRepair81);
                }
            }

            // find all towers
            let towers = _.filter(Game.structures, s => s.structureType === STRUCTURE_TOWER);
            // for each tower
            for (let tower of towers) {
                // run tower logic
                tower.defend();
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

            /*//MINERALS
            room = 'E43N3';
            if (Game.rooms[room].terminal.store[RESOURCE_HYDROGEN] > 50000) {
                Game.notify(room + 'has to much resources!')
            }
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
            if (Game.rooms[room].terminal.store[RESOURCE_KEANIUM] > 50000) {
                Game.notify(room + 'has to much resources!')
            }
            if (Game.rooms[room].terminal.store[RESOURCE_LEMERGIUM] > 50000) {
                Game.notify(room + 'has to much resources!')
            }
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
            if (Game.rooms[room].terminal.store[RESOURCE_OXYGEN] > 50000) {
                Game.notify(room + 'has to much resources!')
            }
            if (needsResource(RESOURCE_UTRIUM, 5000, 'E42N2')) {
                terminal4.send(RESOURCE_UTRIUM, 1000, room)
            }
            if (needsResource(RESOURCE_KEANIUM, 5000, 'E42N2')) {
                terminal2.send(RESOURCE_KEANIUM, 1000, room)
            }
            if (needsResource(RESOURCE_LEMERGIUM, 5000, 'E42N2')) {
                terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
            }
            if (Game.rooms[room].terminal.store[RESOURCE_ZYNTHIUM] > 50000) {
                Game.notify(room + 'has to much resources!')
            }
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
            if (Game.rooms[room].terminal.store[RESOURCE_UTRIUM] > 50000) {
                Game.notify(room + 'has to much resources!')
            }
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
            if (Game.rooms[room].terminal.store[RESOURCE_CATALYST] > 50000) {
                Game.notify(room + 'has to much resources!')
            }

            //MINERALS
            room = 'E43N1';
            if (needsResource(RESOURCE_HYDROGEN, 5000, 'E43N1')) {
                terminal1.send(RESOURCE_HYDROGEN, 1000, room)
            }
            if (needsResource(RESOURCE_OXYGEN, 5000, 'E43N1')) {
                terminal3.send(RESOURCE_OXYGEN, 1000, room)
            }
            if (needsResource(RESOURCE_UTRIUM, 5000, 'E43N1')) {
                terminal4.send(RESOURCE_UTRIUM, 1000, room)
            }
            if (needsResource(RESOURCE_KEANIUM, 5000, 'E43N1')) {
                terminal2.send(RESOURCE_KEANIUM, 1000, room)
            }
            if (needsResource(RESOURCE_LEMERGIUM, 5000, 'E43N1')) {
                terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
            }
            if (needsResource(RESOURCE_ZYNTHIUM, 5000, 'E43N1')) {
                terminal3.send(RESOURCE_ZYNTHIUM, 1000, room)
            }
            if (needsResource(RESOURCE_CATALYST, 5000, 'E43N1')) {
                terminal5.send(RESOURCE_CATALYST, 1000, room)
            }

            //MINERALS
            room = 'E44N3';
            if (needsResource(RESOURCE_HYDROGEN, 5000, room)) {
                terminal1.send(RESOURCE_HYDROGEN, 1000, room)
            }
            if (needsResource(RESOURCE_OXYGEN, 5000, room)) {
                terminal3.send(RESOURCE_OXYGEN, 1000, room)
            }
            if (needsResource(RESOURCE_UTRIUM, 5000, room)) {
                terminal4.send(RESOURCE_UTRIUM, 1000, room)
            }
            if (needsResource(RESOURCE_KEANIUM, 5000, room)) {
                terminal2.send(RESOURCE_KEANIUM, 1000, room)
            }
            if (needsResource(RESOURCE_LEMERGIUM, 5000, room)) {
                terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
            }
            if (needsResource(RESOURCE_ZYNTHIUM, 5000, room)) {
                terminal3.send(RESOURCE_ZYNTHIUM, 1000, room)
            }
            if (needsResource(RESOURCE_CATALYST, 5000, room)) {
                terminal5.send(RESOURCE_CATALYST, 1000, room)
            }

            //MINERALS
            room = 'E43N4';
            if (needsResource(RESOURCE_HYDROGEN, 5000, room)) {
                terminal1.send(RESOURCE_HYDROGEN, 1000, room)
            }
            if (needsResource(RESOURCE_OXYGEN, 5000, room)) {
                terminal3.send(RESOURCE_OXYGEN, 1000, room)
            }
            if (needsResource(RESOURCE_UTRIUM, 5000, room)) {
                terminal4.send(RESOURCE_UTRIUM, 1000, room)
            }
            if (needsResource(RESOURCE_KEANIUM, 5000, room)) {
                terminal2.send(RESOURCE_KEANIUM, 1000, room)
            }
            if (needsResource(RESOURCE_LEMERGIUM, 5000, room)) {
                terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
            }
            if (needsResource(RESOURCE_ZYNTHIUM, 5000, room)) {
                terminal3.send(RESOURCE_ZYNTHIUM, 1000, room)
            }
            if (needsResource(RESOURCE_CATALYST, 5000, room)) {
                terminal5.send(RESOURCE_CATALYST, 1000, room)
            }
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
                let creep = Game.creeps[name];

                if (creep.memory.role === 'harvesterSo1' && creep.room.energyAvailable > 1000) {
                    creep.suicide()
                }
                if (creep.memory.role === 'harvesterSo2' && creep.room.energyAvailable > 1000) {
                    creep.suicide()
                }

                if (creep.memory.role === 'claimer1') {
                    roleClaimer.run(creep);
                }

                if (creep.memory.role === 'harvesterSo1') {
                    roleHarvesterSource.run(creep);
                }
                if (creep.memory.role === 'harvesterSo2') {
                    roleHarvesterSource.run(creep);
                }
                if (creep.memory.role === 'harvester1') {
                    roleHarvester.run(creep);
                }
                if (creep.memory.role === 'harvester2') {
                    roleHarvester.run(creep);
                }
                if (creep.memory.role === 'extractorSt') {
                    roleExtractorStorage.run(creep);
                }


                if (creep.memory.role === 'transfererSo1') {
                    roleTransferer.run(creep);
                }
                if (creep.memory.role === 'transfererSo1') {
                    roleTransferer.run(creep);
                }
                if (creep.memory.role === 'transferer1') {
                    roleTransferer.run(creep);
                }
                if (creep.memory.role === 'transferer2') {
                    roleTransferer.run(creep);
                }
                if (creep.memory.role === 'transfererLiTe1') {
                    roleTransfererLinkToTerminal.run(creep);
                }


                if (creep.memory.role === 'attackerMelee1') {
                    roleAttacker.run(creep);
                }


                if (creep.memory.role === 'upgraderSo1') {
                    roleUpgrader.run(creep);
                }
                if (creep.memory.role === 'upgraderSo2') {
                    roleUpgrader.run(creep);
                }
                if (creep.memory.role === 'upgrader1') {
                    roleUpgrader.run(creep);
                }
                if (creep.memory.role === 'upgrader2') {
                    roleUpgrader.run(creep);
                }


                if (creep.memory.role === 'builderSo1') {
                    roleBuilderSource.run(creep);
                }
                if (creep.memory.role === 'builderSo1') {
                    roleBuilderSource.run(creep);
                }
                if (creep.memory.role === 'builder1') {
                    roleBuilder.run(creep);
                }
                if (creep.memory.role === 'builder2') {
                    roleBuilder.run(creep);
                }
                

                if (creep.memory.role === 'repairerSo1') {
                    roleRepairerSource.run(creep);
                }
                if (creep.memory.role === 'repairerSo2') {
                    roleRepairerSource.run(creep);
                }
                if (creep.memory.role === 'repairer1') {
                    roleRepairer.run(creep);
                }
            }
            

            _.forEach(Object.keys(Game.rooms), function (roomName) {
                let room = Game.rooms[roomName];
                let controller = room.controller;
                

                if (controller && controller.my) {
                    function needsCreeps(role, roomName, numbers) {
                        let numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role === role && c.memory.room === roomName);
                        return numberOfCreeps < numbers
                    }
             
                    let roomName = room.name;
                    let harvester;
  
                    let harvesterSo;
                    let harvesterCo;
                    let harvesterLi;
                    
                    let transfererCo;
                    let transfererLiTe;
                    let transfererTe;

                    let attackerMelee;

                    let upgraderSo;
                    let upgraderCo;
                    let upgraderLi;

                    let builderSo;
                    let builderCo;
                    let builderTe;

                    let repairerCo;

                    //let structures = room.find(FIND_MY_STRUCTURES);
                    //let spawn = room.spawns
                    let spawn = room.find(FIND_MY_SPAWNS)
                    let transfererSpawn = room.find(room.spawns, {
                        filter: (structure) => {
                            return (structure.pos.inRangeTo(creep.room.terminal, 3));
                        }
                    });
                    let enemy = room.find(FIND_HOSTILE_CREEPS);
                    let construction = room.find(FIND_CONSTRUCTION_SITES);
                    let sources = Memory.rooms[roomName + '.sources'];
                    let minerals = Memory.rooms[roomName + '.mineral'];
                    let extension = room.extensions.length
                    let container = room.containers;

                    let normalDirections = [TOP_LEFT,LEFT,BOTTOM_LEFT,BOTTOM,BOTTOM_RIGHT];
                    let transfererDirections = [TOP_RIGHT];
        
                    let terminal = room.terminal;
                    let storage = room.storage;
                    
                    if (Game.time % 250 == 0) {
                        Memory.rooms[roomName + '.sources'] = room.find(FIND_SOURCES);
                        Memory.rooms[roomName + '.mineral'] = ((room.find(FIND_MINERALS)).mineralAmount);
                    }

//console.log(sources[0].pos)
                    if (controller.level >= 1 && controller.level <= 2 && extension >= 0) {
                        harvesterSo = [MOVE,
                                        WORK,
                                        CARRY,CARRY,CARRY]; "300 Energy"
                        upgraderSo = [MOVE,
                                        WORK,WORK,
                                        CARRY]; "300 Energy"
                        attackerMelee = [TOUGH,TOUGH,TOUGH,TOUGH,
                                        ATTACK,ATTACK,
                                        MOVE,MOVE]; "300 Energy"
                        builderSo = [MOVE,
                                        WORK,WORK,
                                        CARRY]; "300 Energy"
                        repairerSo = [MOVE,
                                        WORK,WORK,
                                        CARRY]; "300 Energy"

                        if (needsCreeps("harvesterSo1", roomName, 4)) {
                            spawn[0].spawnCreep(
                                harvesterSo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvesterSo1',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName,
                                    
                                }
                            });
                        }
                        else if (needsCreeps("harvesterSo2", roomName, 4) && sources[1] !== undefined) {
                            spawn[0].spawnCreep(
                                harvesterSo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvesterSo2',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName,
                                    
                                }
                            });
                        }
                        else if (needsCreeps("attackerMelee1", roomName, 5) && enemy[0] !== undefined) {
                            spawn[0].spawnCreep(
                                attackerMelee,
                            'Attacker' + Game.time,
                            {
                                memory: {
                                    role: 'attackerMelee1',
                                    working: false,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("upgraderSo1", roomName, 1)) {
                            spawn[0].spawnCreep(
                                upgraderSo,
                            'Upgrader' + Game.time,
                            {
                                memory: {
                                    role: 'upgraderSo1',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("upgraderSo2", roomName, 1) && sources[1] !== undefined) {
                            spawn[0].spawnCreep(
                                upgraderSo,
                            'Upgrader' + Game.time,
                            {
                                memory: {
                                    role: 'upgraderSo2',
                                    working: false,
                                    sourceId: sources[1].id,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("builderSo1", roomName, 1) && construction[0] !== undefined) {
                            spawn[0].spawnCreep(
                                builderSo,
                            'Builder' + Game.time,
                            {
                                memory: {
                                    role: 'builderSo1',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("repairerSo1", roomName, 1) && sources[1] !== undefined && room.find(FIND_MY_STRUCTURES)[0] !== undefined) {
                            spawn[0].spawnCreep(
                                [MOVE,
                                WORK, WORK,
                                CARRY],
                            'Repairer' + Game.time,
                            {
                                memory: {
                                    role: 'repairerSo1',
                                    working: false,
                                    sourceId: sources[1].id,
                                    room: roomName
                                }
                            });
                        }
                    }





                    else if (controller.level >= 2 && controller.level <= 3 && extension >= 5 && extension < 10) {
                        harvesterSo = [MOVE,
                                        WORK,
                                        CARRY,CARRY,CARRY]; "300 Energy"
                        harvesterCo = [MOVE,
                                        WORK,WORK,WORK,WORK,
                                        CARRY,CARRY]; "550 Energy"
                        transfererCo = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        CARRY,CARRY,CARRY,CARRY,CARRY]; "550 Energy"
                        attackerMelee = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,                  TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                        ATTACK,ATTACK,ATTACK,
                                        MOVE,MOVE]; "550 Energy"
                        upgraderCo = [MOVE,MOVE,
                                        WORK,WORK,WORK,
                                        CARRY,CARRY,CARRY]; "550 Energy"
                        builderCo = [MOVE,MOVE,
                                        WORK,WORK,WORK,
                                        CARRY,CARRY,CARRY]; "550 Energy"
                        repairerCo = [MOVE,MOVE,
                                        WORK,WORK,WORK,
                                        CARRY,CARRY,CARRY]; "550 Energy"


                        harvester = spawn[0].spawnCreep(
                            [MOVE,
                            WORK, WORK, WORK, WORK,
                            CARRY, CARRY],
                            'Harvester' + Game.time,
                            {dryRun: true});
                        if (needsCreeps("harvesterSo1", roomName, 4) && needsCreeps("harvester1",room,1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                            spawn[0].spawnCreep(
                                harvesterSo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvesterSo1',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName,
                                    
                                }
                            });
                        }
                        else if (needsCreeps("harvesterSo2", roomName, 4) && needsCreeps("harvester2",room,1) && sources[1] !== undefined && harvester === ERR_NOT_ENOUGH_ENERGY) {
                            spawn[0].spawnCreep(
                                harvesterSo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvesterSo2',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName,
                                    
                                }
                            });
                        }
                        else if (needsCreeps("harvester1", roomName, 2) && sources[1] !== undefined) {
                            spawn[0].spawnCreep(
                                harvesterCo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvester1',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("harvester2", roomName, 2) && sources[1] !== undefined) {
                            spawn[0].spawnCreep(
                                harvesterCo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvester2',
                                    working: false,
                                    sourceId: sources[1].id,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("transferer1", roomName, 2)) {
                            spawn[0].spawnCreep(
                                transfererCo,
                            'Transferer' + Game.time,
                            {
                                memory: {
                                    role: 'transferer1',
                                    working: false,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("attackerMelee1", roomName, 5) && enemy[0] !== undefined) {
                            spawn[0].spawnCreep(
                                attackerMelee,
                            'Attacker' + Game.time,
                            {
                                memory: {
                                    role: 'attackerMelee1',
                                    working: false,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("upgrader1", roomName, 2)) {
                            spawn[0].spawnCreep(
                                upgraderCo,
                            'Upgrader' + Game.time,
                            {
                                memory: {
                                    role: 'upgrader1',
                                    working: false,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("builder1", roomName, 1) && construction[0] !== undefined) {
                            spawn[0].spawnCreep(
                                builderCo,
                            'Builder' + Game.time,
                            {
                                memory: {
                                    role: 'builder1',
                                    working: false,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("repairer1", roomName, 1) && room.find(FIND_MY_STRUCTURES)[0] !== undefined) {
                            spawn[0].spawnCreep(
                                repairerCo,
                            'Repairer' + Game.time,
                            {
                                memory: {
                                    role: 'repairer1',
                                    working: false,
                                    room: roomName
                                }
                            });
                        }
                    }





                    else if (controller.level >= 3 && controller.level <= 4 && extension >= 10 && extension < 20) {
                        harvesterSo = [MOVE,
                                        WORK,
                                        CARRY,CARRY,CARRY]; "300 Energy"
                        harvesterCo = [MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY]; "700 Energy"
                        transfererCo = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; "800 Energy"
                        attackerMelee = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                                        MOVE,MOVE,MOVE,MOVE,MOVE]; "800 Energy"
                        upgraderCo = [MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY]; "700 Energy"
                        builderCo = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        WORK,WORK,WORK,
                                        CARRY,CARRY,CARRY,CARRY,CARRY]; "800 Energy"

                        harvester = spawn[0].spawnCreep(
                            harvesterCo,
                            'Harvester' + Game.time,
                            {dryRun: true});
                        if (needsCreeps("harvesterSo1", roomName, 4) && needsCreeps("harvester1",room,1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                            spawn[0].spawnCreep(
                                harvesterSo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvesterSo1',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName,
                                    
                                }
                            });
                        }
                        else if (needsCreeps("harvesterSo2", roomName, 4) && needsCreeps("harvester2",room,1) && sources[1] !== undefined && harvester === ERR_NOT_ENOUGH_ENERGY) {
                            spawn[0].spawnCreep(
                                harvesterSo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvesterSo2',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName,
                                    
                                }
                            });
                        }
                        else if (needsCreeps("harvester1", roomName, 2)) {
                            spawn[0].spawnCreep(
                                harvesterCo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvester1',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("harvester2", roomName, 2) && sources[1] !== undefined) {
                            spawn[0].spawnCreep(
                                harvesterCo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvester2',
                                    working: false,
                                    sourceId: sources[1].id,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("transferer1", roomName, 2)) {
                            spawn[0].spawnCreep(
                                transfererCo,
                            'Transferer' + Game.time,
                            {
                                memory: {
                                    role: 'transferer1',
                                    working: false,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("upgrader1", roomName, 1)) {
                            spawn[0].spawnCreep(
                                upgraderCo,
                            'Upgrader' + Game.time,
                            {
                                memory: {
                                    role: 'upgrader1',
                                    working: false,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("attackerMelee1", roomName, 5) && enemy[0] !== undefined) {
                            spawn[0].spawnCreep(
                                attackerMelee,
                            'Attacker' + Game.time,
                            {
                                memory: {
                                    role: 'attackerMelee1',
                                    working: false,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("builder1", roomName, 1) && construction[0] !== undefined) {
                            spawn[0].spawnCreep(
                                builderCo,
                            'Builder' + Game.time,
                            {
                                memory: {
                                    role: 'builder1',
                                    working: false,
                                    room: roomName
                                }
                            });
                        }
                    }
                    else if (controller.level >= 4 && controller.level <= 5 && extension >= 20 && extension < 30) {
                        harvesterSo = [MOVE,
                                        WORK,
                                        CARRY,CARRY,CARRY]; "300 Energy"
                        harvesterCo = [MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY]; "1200 Energy"
                        transfererCo = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; "1000 Energy"
                        attackerMelee = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; "1300 Energy"
                        upgraderCo = [MOVE,MOVE,MOVE,MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY]; "850 Energy"
                        builderCo = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY,CARRY,CARRY,CARRY]; "1000 Energy"

                        harvester = spawn[0].spawnCreep(
                            harvesterCo,
                            'Harvester' + Game.time,
                            {dryRun: true});
                        if (needsCreeps("harvesterSo1", roomName, 4) && needsCreeps("harvester1",room,1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                            spawn[0].spawnCreep(
                                harvesterSo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvesterSo1',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName,
                                    
                                }
                            });
                        }
                        else if (needsCreeps("harvesterSo2", roomName, 4) && needsCreeps("harvester2",room,1) && sources[1] !== undefined && harvester === ERR_NOT_ENOUGH_ENERGY) {
                            spawn[0].spawnCreep(
                                harvesterSo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvesterSo2',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName,
                                    
                                }
                            });
                        }
                        else if (needsCreeps("harvester1", roomName, 1)) {
                            spawn[0].spawnCreep(
                                harvesterCo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvester1',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("harvester2", roomName, 1) && sources[1] !== undefined) {
                            spawn[0].spawnCreep(
                                harvesterCo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvester2',
                                    working: false,
                                    sourceId: sources[1].id,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("transferer1", roomName, 2)) {
                            spawn[0].spawnCreep(
                                transfererCo,
                            'Transferer' + Game.time,
                            {
                                memory: {
                                    role: 'transferer1',
                                    working: false,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("attackerMelee1", roomName, 5) && enemy[0] !== undefined) {
                            spawn[0].spawnCreep(
                                attackerMelee,
                            'Attacker' + Game.time,
                            {
                                memory: {
                                    role: 'attackerMelee1',
                                    working: false,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("upgrader1", roomName, 1)) {
                            spawn[0].spawnCreep(
                                upgraderCo,
                            'Upgrader' + Game.time,
                            {
                                memory: {
                                    role: 'upgrader1',
                                    working: false,
                                    room: roomName
                                }
                            });
                        }
                        else if (needsCreeps("builder1", roomName, 1) && construction[0] !== undefined) {
                            spawn[0].spawnCreep(
                                builderCo,
                            'Builder' + Game.time,
                            {
                                memory: {
                                    role: 'builder1',
                                    working: false,
                                    room: roomName
                                }
                            });
                        }
                    }
                    else if (controller.level >= 5 && controller.level <= 6 && extension >= 30 && extension < 40) {
                        
                        harvesterSo = [MOVE,
                                        WORK,
                                        CARRY,CARRY,CARRY]; "300 Energy"
                        harvesterCo = [MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY]; "1200 Energy"
                        harvesterLi = [MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY]; "1200 Energy"
                        transfererCo = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; "1000 Energy"
                        attackerMelee = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,
                                        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; "1600 Energy"
                        upgraderLi = [MOVE,MOVE,MOVE,MOVE,MOVE,
                                        WORK,
                                        CARRY,CARRY];
                        builderLi = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY,CARRY,CARRY,CARRY]; "1000 Energy"

                        harvester = spawn[0].spawnCreep(
                            harvesterCo,
                            'Harvester' + Game.time,
                            {dryRun: true});
                        if (needsCreeps("harvesterSo1", roomName, 4) && needsCreeps("harvester1",room,1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                            spawn[0].spawnCreep(
                                harvesterSo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvesterSo1',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName,
                                    
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("harvesterSo2", roomName, 4) && needsCreeps("harvester2",room,1) && sources[1] !== undefined && harvester === ERR_NOT_ENOUGH_ENERGY) {
                            spawn[0].spawnCreep(
                                harvesterSo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvesterSo2',
                                    working: false,
                                    sourceId: sources[1].id,
                                    room: roomName,
                                     
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("harvester1", roomName, 1)) {
                            spawn[0].spawnCreep(
                                harvesterCo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvester1',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("harvester2", roomName, 1) && sources[1] !== undefined) {
                            spawn[0].spawnCreep(
                                harvesterCo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvester2',
                                    working: false,
                                    sourceId: sources[1].id,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("transferer1", roomName, 1)) {
                            spawn[0].spawnCreep(
                                transfererCo,
                            'Transferer' + Game.time,
                            {
                                memory: {
                                    role: 'transferer1',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("attackerMelee1", roomName, 5) && enemy[0] !== undefined) {
                            spawn[0].spawnCreep(
                                attackerMelee,
                            'Attacker' + Game.time,
                            {
                                memory: {
                                    role: 'attackerMelee1',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("upgrader1", roomName, 1)) {
                            spawn[0].spawnCreep(
                                upgraderLi,
                            'Upgrader' + Game.time,
                            {   
                                memory: {
                                    role: 'upgrader1',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("builder1", roomName, 1) && construction[0] !== undefined) {
                            spawn[0].spawnCreep(
                                builderLi,
                            'Builder' + Game.time,
                            {
                                memory: {
                                    role: 'builder1',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                    }
                    else if (controller.level >= 6 && controller.level <= 7 && extension >= 40 && spawn.length >= 1) {
                        harvesterSo = [MOVE,
                                        WORK,
                                        CARRY,CARRY,CARRY]; "300 Energy"
                        harvesterLi = [MOVE,MOVE,MOVE,MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY]; "1350 Energy"
                        harvesterMi = [MOVE,MOVE,MOVE,MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,]; "1750 Energy"
                        transfererLiTe = [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]; "300 Energy"
                        transfererTe = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; "1250 Energy"
                        attackerMelee = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,                   TOUGH,TOUGH,TOUGH,TOUGH,
                                        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; "2250 Energy"
                        upgraderLi = [MOVE,MOVE,MOVE,MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY]; "1850 Energy"
                        builderTe = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; "1350 Energy"

                        harvester = spawn[0].spawnCreep(
                            harvesterLi,
                            'Harvester' + Game.time,
                            {dryRun: true});
                        if (needsCreeps("harvesterSo1", roomName, 4) && needsCreeps("harvester1",room,1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                            spawn[0].spawnCreep(
                                harvesterSo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvesterSo1',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName,
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("harvesterSo2", roomName, 4) && needsCreeps("harvester2",room,1) && sources[1] !== undefined && harvester === ERR_NOT_ENOUGH_ENERGY) {
                            spawn[0].spawnCreep(
                                harvesterSo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvesterSo2',
                                    working: false,
                                    sourceId: sources[1].id,
                                    room: roomName,
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("transfererLiTe1", roomName, 1)) {
                            spawn[0].spawnCreep(
                                transfererLiTe,
                            'Transferer' + Game.time,
                            {
                                memory: {
                                    role: 'transfererLiTe1',
                                    working: false,
                                    room: roomName
                                }, directions: transfererDirections
                            });
                        }
                        else if (needsCreeps("transferer1", roomName, 1)) {
                            spawn[0].spawnCreep(
                                transfererTe,
                            'Transferer' + Game.time,
                            {
                                memory: {
                                    role: 'transferer1',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("harvester1", roomName, 1)) {
                            spawn[0].spawnCreep(
                                harvesterLi,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvester1',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("harvester2", roomName, 1) && sources[1] !== undefined) {
                            spawn[0].spawnCreep(
                                harvesterLi,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvester2',
                                    working: false,
                                    sourceId: sources[1].id,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("attackerMelee1", roomName, 5) && enemy[0] !== undefined) {
                            spawn[0].spawnCreep(
                                attackerMelee,
                            'Attacker' + Game.time,
                            {
                                memory: {
                                    role: 'attackerMelee1',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("upgrader1", roomName, 1)) {
                            spawn[0].spawnCreep(
                                upgraderLi,
                            'Upgrader' + Game.time,
                            {
                                memory: {
                                    role: 'upgrader1',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("builder1", roomName, 2) && construction[0] !== undefined) {
                            spawn[0].spawnCreep(
                                builderTe,
                            'Builder' + Game.time,
                            {
                                memory: {
                                    role: 'builder1',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("extractorSt", roomName, 1) && minerals > 0) {
                            spawn[0].spawnCreep(
                                harvesterMi,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'extractorSt',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                    }
                    else if (controller.level >= 7 && controller.level <= 8 && extension >= 50 && spawn.length == 2) {
                        harvesterSo = [MOVE,
                                        WORK,
                                        CARRY,CARRY,CARRY]; "300 Energy"
                        harvesterLi = [MOVE,MOVE,MOVE,MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY]; "1350 Energy"
                        harvesterMi = [MOVE,MOVE,MOVE,MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,]; "1750 Energy"
                        transfererLiTe = [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]; "300 Energy"
                        transfererTe = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; "1250 Energy"
                        attackerMelee = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,                  TOUGH,TOUGH,TOUGH,TOUGH,
                                        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; "2250 Energy"
                        upgraderLi = [MOVE,MOVE,MOVE,MOVE,MOVE,
                                        WORK,
                                        CARRY,CARRY];
                        builderTe = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; "1`850 Energy"

                        harvester = spawn[0].spawnCreep(
                            harvesterLi,
                            'Harvester' + Game.time,
                            {dryRun: true});
                        if (needsCreeps("harvesterSo1", roomName, 4) && needsCreeps("harvester1",room,1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                            spawn[0].spawnCreep(
                                harvesterSo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvesterSo1',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName,
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("harvesterSo2", roomName, 4) && needsCreeps("harvester2",room,1) && sources[1] !== undefined && harvester === ERR_NOT_ENOUGH_ENERGY) {
                            spawn[0].spawnCreep(
                                harvesterSo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvesterSo2',
                                    working: false,
                                    sourceId: sources[1].id,
                                    room: roomName,
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("transfererLiTe1", roomName, 1)) {
                            spawn[0].spawnCreep(
                                transfererLiTe,
                            'Transferer' + Game.time,
                            {
                                memory: {
                                    role: 'transfererLiTe1',
                                    working: false,
                                    room: roomName
                                }, directions: transfererDirections
                            });
                        }
                        else if (needsCreeps("harvester1", roomName, 1)) {
                            spawn[0].spawnCreep(
                                harvesterLi,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvester1',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("harvester2", roomName, 1) && sources[1] !== undefined) {
                            spawn[0].spawnCreep(
                                harvesterLi,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvester2',
                                    working: false,
                                    sourceId: sources[1].id,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("transferer1", roomName, 1)) {
                            spawn[0].spawnCreep(
                                transfererTe,
                            'Transferer' + Game.time,
                            {
                                memory: {
                                    role: 'transferer1',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("attackerMelee1", roomName, 5) && enemy[0] !== undefined) {
                            spawn[0].spawnCreep(
                                attackerMelee,
                            'Attacker' + Game.time,
                            {
                                memory: {
                                    role: 'attackerMelee1',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("upgrader1", roomName, 1)) {
                            spawn[1].spawnCreep(
                                upgraderLi,
                            'Upgrader' + Game.time,
                            {
                                memory: {
                                    role: 'upgrader1',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("builder1", roomName, 2) && construction[0] !== undefined) {
                            spawn[1].spawnCreep(
                                builderTe,
                            'Builder' + Game.time,
                            {
                                memory: {
                                    role: 'builder1',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("extractorSt", roomName, 1) && minerals > 0) {
                            spawn[0].spawnCreep(
                                harvesterMi,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'extractorSt',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                    }
                    else if (controller.level == 8 && extension > 50 && spawn.length >= 3) {
                        harvesterSo = [MOVE,
                                        WORK,
                                        CARRY,CARRY,CARRY]; "300 Energy"
                        harvesterLi = [MOVE,MOVE,MOVE,MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY]; "1350 Energy"
                        harvesterMi = [MOVE,MOVE,MOVE,MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,]; "1750 Energy"
                        transfererLiTe = [CARRY,CARRY,CARRY,CARRY,CARRY,MOVE]; "300 Energy"
                        transfererTe = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; "1250 Energy"
                        attackerMelee = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,          TOUGH,TOUGH,TOUGH,TOUGH,
                                        ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,
                                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]; "2250 Energy"
                        upgraderLi = [MOVE,MOVE,MOVE,MOVE,MOVE,
                                        WORK,
                                        CARRY,CARRY];
                        builderTe = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                        WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                        CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; "2350 Energy"
                        harvester = spawn[0].spawnCreep(
                            harvesterLi,
                            'Harvester' + Game.time,
                            {dryRun: true});
                        if (needsCreeps("harvesterSo1", roomName, 4) && needsCreeps("harvester1",room,1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
                            spawn[0].spawnCreep(
                                harvesterSo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvesterSo1',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName,
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("harvesterSo2", roomName, 4) && needsCreeps("harvester2",room,1) && sources[1] !== undefined && harvester === ERR_NOT_ENOUGH_ENERGY) {
                            spawn[0].spawnCreep(
                                harvesterSo,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvesterSo2',
                                    working: false,
                                    sourceId: sources[1].id,
                                    room: roomName,
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("transfererLiTe1", roomName, 1)) {
                            spawn[0].spawnCreep(
                                transfererLiTe,
                            'Transferer' + Game.time,
                            {
                                memory: {
                                    role: 'transfererLiTe1',
                                    working: false,
                                    room: roomName
                                }, directions: transfererDirections
                            });
                        }
                        else if (needsCreeps("harvester1", roomName, 1)) {
                            spawn[0].spawnCreep(
                                harvesterLi,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvester1',
                                    working: false,
                                    sourceId: sources[0].id,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("harvester2", roomName, 1) && sources[1] !== undefined) {
                            spawn[0].spawnCreep(
                                harvesterLi,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'harvester2',
                                    working: false,
                                    sourceId: sources[1].id,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("transferer1", roomName, 1)) {
                            spawn[0].spawnCreep(
                                transfererTe,   
                            'Transferer' + Game.time,
                            {
                                memory: {
                                    role: 'transferer1',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("attackerMelee1", roomName, 5) && enemy[0] !== undefined) {
                            spawn[0].spawnCreep(
                                attackerMelee,
                            'Attacker' + Game.time,
                            {
                                memory: {
                                    role: 'attackerMelee1',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("upgrader1", roomName, 1)) {
                            spawn[1].spawnCreep(
                                upgraderLi,
                            'Upgrader' + Game.time,
                            {
                                memory: {
                                    role: 'upgrader1',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("builder1", roomName, 2) && construction[0] !== undefined) {
                            spawn[2].spawnCreep(
                                builderTe,
                            'Builder' + Game.time,
                            {
                                memory: {
                                    role: 'builder1',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                        else if (needsCreeps("extractorSt", roomName, 1) && minerals > 0) {
                            spawn[0].spawnCreep(
                                harvesterMi,
                            'Harvester' + Game.time,
                            {
                                memory: {
                                    role: 'extractorSt',
                                    working: false,
                                    room: roomName
                                }, directions: normalDirections
                            });
                        }
                    }
                    else {Game.notify("Please check this room because of a controller level bug!!! (" + room + ") Thanks!")
                    }
                }
            });











            /*
=

            Game.spawns['E43N3-3'].spawnCreep(
                [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                'transfadied',
                {
                    memory: {
                        role: 'transfererFromTo',
                        working: false,
                    }
                });

            Game.spawns['E43N3-3'].spawnCreep(
                [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                'builder',
                {
                    memory: {
                        role: 'builderSo',
                        working: false,
                    }
                });
         */


        if (!Memory.stats) {
            Memory.stats = {}
        }
        if (!Memory.rooms) {
            Memory.rooms = {}
        }
        Memory.stats['cpu.getUsed'] = Game.cpu.getUsed();
        Memory.stats['cpu.cpuAvg10'] = 0.9 * Memory.stats['cpu.cpuAvg10'] + 0.1 * Memory.stats['cpu.getUsed'];
        Memory.stats['cpu.cpuAvg100'] = 0.99 * Memory.stats['cpu.cpuAvg100'] + 0.01 * Memory.stats['cpu.getUsed'];
        Memory.stats['cpu.cpuAvg1000'] = 0.999 * Memory.stats['cpu.cpuAvg1000'] + 0.001 * Memory.stats['cpu.getUsed'];
        Memory.stats['cpu.limit'] = Game.cpu.limit;
        Memory.stats['cpu.bucket'] = Game.cpu.bucket;
        Memory.stats['cpu.tickLimit'] = Game.cpu.tickLimit;

        Memory.stats['te.total'] = terminalTotal;
        Memory.stats['st.total'] = storageTotal;

        Memory.stats['gcl.progress'] = Game.gcl.progress;
        Memory.stats['gcl.progressTotal'] = Game.gcl.progressTotal;
        Memory.stats['gcl.level'] = Game.gcl.level;


        
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
                }
                _.forEach(RESOURCES_ALL, function (minerals) {
                    let room = Game.rooms[roomName];
                    let terminal = room.terminal;
                    let storage = room.storage;

                    if (room.controller && room.controller.my) {
                        if (storage) {
                            Memory.stats['rooms.' + roomName + '.minerals.' + minerals + '.storage'] = storage.store[minerals];
                        }
                        if (terminal) {
                            Memory.stats['rooms.' + roomName + '.minerals.' + minerals + '.terminal'] = terminal.store[minerals];
                        }
                    }});
                }
            });
        }
    });
};