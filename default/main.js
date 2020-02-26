//Import roles
require('prototype.tower');
require('prototype.Room.structures');
require('traveler')

// const traveler = require('traveler');
const roleAttacker = require('role.attacker');
const roleAttackerSource = require('role.attackerSource');
const roleAttackerSourceKeeper = require('role.attackerSourceKeeper');

const roleHealer = require('role.healer');

const roleHarvester = require('role.harvester');
const roleHarvesterSource = require('role.harvesterSource');

const roleExtractorStorage = require('role.extractorStorage');


const roleUpgrader = require('role.upgrader');
const roleUpgraderSource = require('role.upgraderSource');


const roleTransferer = require('role.transferer');
const roleTransfererLinkToTerminal = require('role.transfererLinkToTerminal');
const roleTransfererFromTo = require('role.transfererFromTo');


const roleBuilder = require('role.builder');
const roleBuilderSource = require('role.builderSource');


const roleRepairer = require('role.repairer');
const roleRepairerSource = require('role.repairerSource');


const roleClaimer = require('role.claimer');
const roleReserver = require('role.reserver');


const roleScientist = require('role.scientist');

const roleScout = require('role.scout');

const roleLongDistanceBuilder = require('role.longDistanceBuilder');
const roleLongDistanceHarvester = require('role.longDistanceHarvester');
const roleLongDistanceUpgrader = require('role.longDistanceUpgrader');
const roleLongDistanceTransferer = require('role.longDistanceTransferer');
const roleLongDistanceRepairer = require('role.longDistanceRepairer');

const profiler = require('screeps-profiler');


// This line monkey patches the global prototypes.
profiler.enable();
module.exports.loop = function() {
    profiler.wrap(function () {
        if (Game.cpu.bucket > 1000) {

            let energyHarvested;
            /*=if (!Creep.prototype._harvest) {

                // Store the original method
                Creep.prototype._harvest = Creep.prototype.harvest;

                // Create our new function
                Creep.prototype.harvest = function() {
                    
                    // Add custom functionality

                    // Call and return the original method
                    return this.harvest();
                };
            }*/
            /*let structs = Game.rooms.E43N3.find(FIND_STRUCTURES);
            for (let i = 0; i < structs.length; i++)
              {
              if (structs[i].structureType == STRUCTURE_RAMPART)
                structs[i].destroy();
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

            // Game.rooms['E43N2'].terminal.send(RESOURCE_LEMERGIUM, 20000, 'E46N1','trade contract #1');
            // Game.rooms['E43N1'].terminal.send(RESOURCE_ZYNTHIUM, 20000, 'E46N1','trade contract #1');

            //Find Terminals
            let start4 = Game.cpu.getUsed()
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
            if (terminalTMa !== undefined && (terminalTMi < 5000 && terminalTMa > 20000)) {
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
                console.log(storageTotal + ' Total Energy Storage, ' + storageTMi + ' Min Energy, ' + storageTMa + ' Max Energy');
                console.log(terminalTotal + ' Total Energy Terminal, ' + terminalTMi + ' Min Energy, ' + terminalTMa + ' Max Energy');
                console.log()
            }
            if (terminalTotal > 400 * 1000) {
                Game.notify('Terminal Total Has More Then 400K Energy!' && terminalTotal)
            }


            const linkFrom11 = Game.getObjectById("5d2d8e9adbfe1b628e83c414");
            const linkTo11 = Game.getObjectById("5d7bb4301ab01071fe0844a1");
            const linkFrom12 = Game.getObjectById("5d36b82aab0b117cdc03b16b");
            const linkTo12 = Game.getObjectById("5d7de9fedfd5c272344fd7d2");
            linkFrom11.transferEnergy(linkTo11);
            linkFrom12.transferEnergy(linkTo11);
            if (terminalt1 > 25000) {
                linkTo11.transferEnergy(linkTo12);
            }


            const linkFrom21 = Game.getObjectById("5d47fc70de98312b1d990ff0");
            const linkTo21 = Game.getObjectById("5d7a2328eff0ae438dca2861");
            const linkTo22 = Game.getObjectById("5d7af0940e63d70d58c546a4");
            const linkFrom22 = Game.getObjectById("5d38856cc99c215de2febacd");

            linkFrom21.transferEnergy(linkTo21);
            linkFrom22.transferEnergy(linkTo21);
            if (terminalt2 > 25000) {
                linkTo21.transferEnergy(linkTo22);
            }


            const linkFrom31 = Game.getObjectById("5d38a7eb5c57a23fff55bb4c");
            const linkTo31 = Game.getObjectById("5d7dd55d128ef459c47c4c2d");
            const linkFrom32 = Game.getObjectById("5d49a74566d7ea40916001c0");
            const linkTo32 = Game.getObjectById("5d814dd02a6b4021bedf54bb");

            linkFrom31.transferEnergy(linkTo31);
            linkFrom32.transferEnergy(linkTo31);
            if (terminalt3 > 25000) {
                linkTo31.transferEnergy(linkTo32);
            }

            const linkFrom41 = Game.getObjectById("5d6fef036db51a75659d9308");
            const linkTo41 = Game.getObjectById("5d7cb365794b10135f3ddf6b");
            const linkFrom42 = Game.getObjectById("5d59ae9e3b552d638902b9f8");
            const linkTo42 = Game.getObjectById("5d7ecadea35eaa43411b2e77");

            linkFrom41.transferEnergy(linkTo41);
            linkFrom42.transferEnergy(linkTo41);
            if (terminalt4 > 25000) {
                linkTo41.transferEnergy(linkTo42);
            }


            const linkFrom51 = Game.getObjectById("5d5bf39b980b3520ebb8f2fb");
            const linkTo51 = Game.getObjectById("5d81187ca15f4d21c8e07fc1");
            const linkTo52 = Game.getObjectById("5d8114e2965eaf139a2c9ca4");

            linkFrom51.transferEnergy(linkTo51);
            if (terminalt5 > 25000) {
                linkTo51.transferEnergy(linkTo52);
            }

            const linkFrom61 = Game.getObjectById("5d7f42f2e8764e721d95cee7");
            const linkTo61 = Game.getObjectById("5db1c6dd0976205b86a14247"); 
            const linkTo62 = Game.getObjectById("5d7e2aeae8764e721d956210");

            if (linkFrom61.store[RESOURCE_ENERGY] > 100) {
                linkFrom61.transferEnergy(linkTo61);
            }
            if (terminalt6 > 25000) {
                linkTo61.transferEnergy(linkTo62);
            }

            // E43N4 //
            const linkFrom71 = Game.getObjectById("5dcb7808164235065d127fec");
            const linkFrom72 = Game.getObjectById("5dd58eb474452608e52c9531");
            const linkTo71 = Game.getObjectById("5e0883a835f1a523a22548cc"); 
            const linkTo72 = Game.getObjectById("5dff8b07f0aef968911368c1");

            linkFrom71.transferEnergy(linkTo71);
            linkFrom72.transferEnergy(linkTo71);
            if (terminalt7 > 25000) {
                linkTo71.transferEnergy(linkTo72);
            }

            // E44N3 //
            const linkFrom81 = Game.getObjectById("5dca862e8247cf5255b236cf");
            const linkFrom82 = Game.getObjectById("5e00a4e486cb6b08f510294e"); 
            const linkTo81 = Game.getObjectById("5e09e37a0cf0c5684c81aa56"); 
            const linkTo82 = Game.getObjectById("5dcbe41857ce88a6f3582d2c");

            linkFrom81.transferEnergy(linkTo81);
            linkFrom82.transferEnergy(linkTo81);
            if (terminalt8 > 25000) {
                linkTo81.transferEnergy(linkTo82);
            }

            let spawnEnergy;
            let spawnEnergyMax;




            let end4 = Game.cpu.getUsed() - start4
            Memory.stats['cpu.avg.terminal'] = end4;
            Memory.stats['cpu.avg10.terminal'] = 0.9 * Memory.stats['cpu.avg10.terminal'] + 0.1 * Memory.stats['cpu.avg.terminal'];
            Memory.stats['cpu.avg100.terminal'] = 0.99 * Memory.stats['cpu.avg100.terminal'] + 0.01 * Memory.stats['cpu.avg.terminal'];
            Memory.stats['cpu.avg1000.terminal'] = 0.999 * Memory.stats['cpu.avg1000.terminal'] + 0.001 * Memory.stats['cpu.avg.terminal'];


            let room;

            function needsResource(resource, amount, room) {
                let numberOfResource = Game.rooms[room].terminal.store[resource];
                if (numberOfResource === undefined) {
                    return 2
                } else {
                    return numberOfResource < amount
                }
            }

            function haveResource(resource, amount, room) {
                let numberOfResource = room.storage.store[resource];
                if (numberOfResource === undefined) {
                    return 2
                } else {
                    return numberOfResource > amount
                }
            }
            function marketPrice(resource) {
                let price = Game.market.getAllOrders({type: ORDER_SELL, resourceType: resource});
                price.sort((a, b) => a.price - b.price);
                
                if (price[0].price * 1,15 > price[1].price) {
                    let newPrice = price[0].price;
                    return newPrice
                }
                else {
                    let secondPrice = price[1].price;
                    return secondPrice;
                }
            }



            /*//MINERALS
            room = 'E43N3';
            if (Game.rooms[room].terminal.store[RESOURCE_HYDROGEN] > 50000) {
                Game.notify(room + 'has to much resources!')
            }
            if (needsResource(RESOURCE_OXYGEN, 5000, 'E43N3') && spawn[0] !== undefined) {
                terminal3.send(RESOURCE_OXYGEN, 1000, room)
            }
            if (needsResource(RESOURCE_UTRIUM, 5000, 'E43N3') && spawn[0] !== undefined) {
                terminal4.send(RESOURCE_UTRIUM, 1000, room)
            }
            if (needsResource(RESOURCE_KEANIUM, 5000, 'E43N3') && spawn[0] !== undefined) {
                terminal2.send(RESOURCE_KEANIUM, 1000, room)
            }
            if (needsResource(RESOURCE_LEMERGIUM, 5000, 'E43N3') && spawn[0] !== undefined) {
                terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
            }
            if (needsResource(RESOURCE_ZYNTHIUM, 5000, 'E43N3') && spawn[0] !== undefined) {
                terminal3.send(RESOURCE_ZYNTHIUM, 1000, room)
            }
            if (needsResource(RESOURCE_CATALYST, 5000, 'E43N3') && spawn[0] !== undefined) {
                terminal5.send(RESOURCE_CATALYST, 1000, room)
            }

            //MINERALS
            room = 'E43N2';
            if (needsResource(RESOURCE_HYDROGEN, 5000, 'E43N2') && spawn[0] !== undefined) {
                terminal1.send(RESOURCE_HYDROGEN, 1000, room)
            }
            if (needsResource(RESOURCE_OXYGEN, 5000, 'E43N2') && spawn[0] !== undefined) {
                terminal3.send(RESOURCE_OXYGEN, 1000, room)
            }
            if (needsResource(RESOURCE_UTRIUM, 5000, 'E43N2') && spawn[0] !== undefined) {
                terminal4.send(RESOURCE_UTRIUM, 1000, room)
            }
            if (Game.rooms[room].terminal.store[RESOURCE_KEANIUM] > 50000) {
                Game.notify(room + 'has to much resources!')
            }
            if (Game.rooms[room].terminal.store[RESOURCE_LEMERGIUM] > 50000) {
                Game.notify(room + 'has to much resources!')
            }
            if (needsResource(RESOURCE_ZYNTHIUM, 5000, 'E43N2') && spawn[0] !== undefined) {
                terminal3.send(RESOURCE_ZYNTHIUM, 1000, room)
            }
            if (needsResource(RESOURCE_CATALYST, 5000, 'E43N2') && spawn[0] !== undefined) {
                terminal5.send(RESOURCE_CATALYST, 1000, room)
            }

            //MINERALS
            room = 'E42N2';
            if (needsResource(RESOURCE_HYDROGEN, 5000, 'E42N2') && spawn[0] !== undefined) {
                terminal1.send(RESOURCE_HYDROGEN, 1000, room)
            }
            if (Game.rooms[room].terminal.store[RESOURCE_OXYGEN] > 50000) {
                Game.notify(room + 'has to much resources!')
            }
            if (needsResource(RESOURCE_UTRIUM, 5000, 'E42N2') && spawn[0] !== undefined) {
                terminal4.send(RESOURCE_UTRIUM, 1000, room)
            }
            if (needsResource(RESOURCE_KEANIUM, 5000, 'E42N2') && spawn[0] !== undefined) {
                terminal2.send(RESOURCE_KEANIUM, 1000, room)
            }
            if (needsResource(RESOURCE_LEMERGIUM, 5000, 'E42N2') && spawn[0] !== undefined) {
                terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
            }
            if (Game.rooms[room].terminal.store[RESOURCE_ZYNTHIUM] > 50000) {
                Game.notify(room + 'has to much resources!')
            }
            if (needsResource(RESOURCE_CATALYST, 5000, 'E42N2') && spawn[0] !== undefined) {
                terminal5.send(RESOURCE_CATALYST, 1000, room)
            }

            //MINERALS
            room = 'E42N3';
            if (needsResource(RESOURCE_HYDROGEN, 5000, 'E42N3') && spawn[0] !== undefined) {
                terminal1.send(RESOURCE_HYDROGEN, 1000, room)
            }
            if (needsResource(RESOURCE_OXYGEN, 5000, 'E42N3') && spawn[0] !== undefined) {
                terminal3.send(RESOURCE_OXYGEN, 1000, room)
            }
            if (Game.rooms[room].terminal.store[RESOURCE_UTRIUM] > 50000) {
                Game.notify(room + 'has to much resources!')
            }
            if (needsResource(RESOURCE_KEANIUM, 5000, 'E42N3') && spawn[0] !== undefined) {
                terminal2.send(RESOURCE_KEANIUM, 1000, room)
            }
            if (needsResource(RESOURCE_LEMERGIUM, 5000, 'E42N3') && spawn[0] !== undefined) {
                terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
            }
            if (needsResource(RESOURCE_ZYNTHIUM, 5000, 'E42N3') && spawn[0] !== undefined) {
                terminal3.send(RESOURCE_ZYNTHIUM, 1000, room)
            }
            if (needsResource(RESOURCE_CATALYST, 5000, 'E42N3') && spawn[0] !== undefined) {
                terminal5.send(RESOURCE_CATALYST, 1000, room)
            }

            //MINERALS
            room = 'E42N1';
            if (needsResource(RESOURCE_HYDROGEN, 5000, 'E42N1') && spawn[0] !== undefined) {
                terminal1.send(RESOURCE_HYDROGEN, 1000, room)
            }
            if (needsResource(RESOURCE_OXYGEN, 5000, 'E42N1') && spawn[0] !== undefined) {
                terminal3.send(RESOURCE_OXYGEN, 1000, room)
            }
            if (needsResource(RESOURCE_UTRIUM, 5000, 'E42N1') && spawn[0] !== undefined) {
                terminal4.send(RESOURCE_UTRIUM, 1000, room)
            }
            if (needsResource(RESOURCE_KEANIUM, 5000, 'E42N1') && spawn[0] !== undefined) {
                terminal2.send(RESOURCE_KEANIUM, 1000, room)
            }
            if (needsResource(RESOURCE_LEMERGIUM, 5000, 'E42N1') && spawn[0] !== undefined) {
                terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
            }
            if (needsResource(RESOURCE_ZYNTHIUM, 5000, 'E42N1') && spawn[0] !== undefined) {
                terminal3.send(RESOURCE_ZYNTHIUM, 1000, room)
            }
            if (Game.rooms[room].terminal.store[RESOURCE_CATALYST] > 50000) {
                Game.notify(room + 'has to much resources!')
            }

            //MINERALS
            room = 'E43N1';
            if (needsResource(RESOURCE_HYDROGEN, 5000, 'E43N1') && spawn[0] !== undefined) {
                terminal1.send(RESOURCE_HYDROGEN, 1000, room)
            }
            if (needsResource(RESOURCE_OXYGEN, 5000, 'E43N1') && spawn[0] !== undefined) {
                terminal3.send(RESOURCE_OXYGEN, 1000, room)
            }
            if (needsResource(RESOURCE_UTRIUM, 5000, 'E43N1') && spawn[0] !== undefined) {
                terminal4.send(RESOURCE_UTRIUM, 1000, room)
            }
            if (needsResource(RESOURCE_KEANIUM, 5000, 'E43N1') && spawn[0] !== undefined) {
                terminal2.send(RESOURCE_KEANIUM, 1000, room)
            }
            if (needsResource(RESOURCE_LEMERGIUM, 5000, 'E43N1') && spawn[0] !== undefined) {
                terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
            }
            if (needsResource(RESOURCE_ZYNTHIUM, 5000, 'E43N1') && spawn[0] !== undefined) {
                terminal3.send(RESOURCE_ZYNTHIUM, 1000, room)
            }
            if (needsResource(RESOURCE_CATALYST, 5000, 'E43N1') && spawn[0] !== undefined) {
                terminal5.send(RESOURCE_CATALYST, 1000, room)
            }

            //MINERALS
            room = 'E44N3';
            if (needsResource(RESOURCE_HYDROGEN, 5000, room) && spawn[0] !== undefined) {
                terminal1.send(RESOURCE_HYDROGEN, 1000, room)
            }
            if (needsResource(RESOURCE_OXYGEN, 5000, room) && spawn[0] !== undefined) {
                terminal3.send(RESOURCE_OXYGEN, 1000, room)
            }
            if (needsResource(RESOURCE_UTRIUM, 5000, room) && spawn[0] !== undefined) {
                terminal4.send(RESOURCE_UTRIUM, 1000, room)
            }
            if (needsResource(RESOURCE_KEANIUM, 5000, room) && spawn[0] !== undefined) {
                terminal2.send(RESOURCE_KEANIUM, 1000, room)
            }
            if (needsResource(RESOURCE_LEMERGIUM, 5000, room) && spawn[0] !== undefined) {
                terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
            }
            if (needsResource(RESOURCE_ZYNTHIUM, 5000, room) && spawn[0] !== undefined) {
                terminal3.send(RESOURCE_ZYNTHIUM, 1000, room)
            }
            if (needsResource(RESOURCE_CATALYST, 5000, room) && spawn[0] !== undefined) {
                terminal5.send(RESOURCE_CATALYST, 1000, room)
            }

            //MINERALS
            room = 'E43N4';
            if (needsResource(RESOURCE_HYDROGEN, 5000, room) && spawn[0] !== undefined) {
                terminal1.send(RESOURCE_HYDROGEN, 1000, room)
            }
            if (needsResource(RESOURCE_OXYGEN, 5000, room) && spawn[0] !== undefined) {
                terminal3.send(RESOURCE_OXYGEN, 1000, room)
            }
            if (needsResource(RESOURCE_UTRIUM, 5000, room) && spawn[0] !== undefined) {
                terminal4.send(RESOURCE_UTRIUM, 1000, room)
            }
            if (needsResource(RESOURCE_KEANIUM, 5000, room) && spawn[0] !== undefined) {
                terminal2.send(RESOURCE_KEANIUM, 1000, room)
            }
            if (needsResource(RESOURCE_LEMERGIUM, 5000, room) && spawn[0] !== undefined) {
                terminal2.send(RESOURCE_LEMERGIUM, 1000, room)
            }
            if (needsResource(RESOURCE_ZYNTHIUM, 5000, room) && spawn[0] !== undefined) {
                terminal3.send(RESOURCE_ZYNTHIUM, 1000, room)
            }
            if (needsResource(RESOURCE_CATALYST, 5000, room) && spawn[0] !== undefined) {
                terminal5.send(RESOURCE_CATALYST, 1000, room)
            }
*/
            for (let name in Memory.creeps) {
                if (Game.creeps[name] === undefined) {
                    delete Memory.creeps[name];
                }
            }

            let start3 = Game.cpu.getUsed()

            // Every creep name in Game.creeps
            for (let name in Game.creeps) {            
                let creep = Game.creeps[name];

                //creep.signController(creep.room.controller,"Please learn me this game, im bad")


                if (creep.memory.role === 'claimer1') {
                    roleClaimer.run(creep);
                }
                if (creep.memory.role === 'reserver1') {
                    roleReserver.run(creep);
                }
                if (creep.memory.role === 'reserver2') {
                    roleReserver.run(creep);
                }

                if (creep.memory.role === 'scout1') {
                    roleScout.run(creep);
                }

                if (creep.memory.role === 'harvesterSo11') {
                    roleHarvesterSource.run(creep);
                }
                if (creep.memory.role === 'harvesterSo21') {
                    roleHarvesterSource.run(creep);
                }
                if (creep.memory.role === 'harvesterSo1') {
                    roleHarvester.run(creep);
                }
                if (creep.memory.role === 'harvesterSo2') {
                    roleHarvester.run(creep);
                }
                if (creep.memory.role === 'harvester1') {
                    roleHarvester.run(creep);
                }
                if (creep.memory.role === 'harvester2') {
                    roleHarvester.run(creep);
                }
                if (creep.memory.role === 'harvesterLD1') {
                    roleLongDistanceHarvester.run(creep);
                }
                if (creep.memory.role === 'harvesterLD2') {
                    roleLongDistanceHarvester.run(creep);
                }
                if (creep.memory.role === 'harvesterLD3') {
                    roleLongDistanceHarvester.run(creep);
                }
                if (creep.memory.role === 'harvesterLD4') {
                    roleLongDistanceHarvester.run(creep);
                }
                
                if (creep.memory.role === 'extractorSt') {
                    roleExtractorStorage.run(creep);
                }


                if (creep.memory.role === 'transfererFromTo') {
                    roleTransfererFromTo.run(creep);
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
                if (creep.memory.role === 'transfererLD1') {
                    roleLongDistanceTransferer.run(creep);
                }
                if (creep.memory.role === 'transfererLD2') {
                    roleLongDistanceTransferer.run(creep);
                }

                
                if (creep.memory.role === 'transfererLiTe1') {
                    roleTransfererLinkToTerminal.run(creep);
                }
                if (creep.memory.role === 'scientist1') {
                    roleScientist.run(creep);
                }


                if (creep.memory.role === 'attackerMelee1') {
                    roleAttacker.run(creep);
                }
                if (creep.memory.role === 'attackerMelee2') {
                    roleAttackerSourceKeeper.run(creep);
                }
                if (creep.memory.role === 'attackerMelee3') {
                    roleAttackerSource.run(creep);
                }
                if (creep.memory.role === 'attackerMelee4') {
                    roleAttackerSource.run(creep);
                }
                if (creep.memory.role === 'attackerMeleeRange2') {
                    roleAttackerSource.run(creep);
                }
                if (creep.memory.role === 'attackerHeal1') {
                    roleHealer.run(creep);
                }


                if (creep.memory.role === 'upgraderSo1') {
                    roleUpgraderSource.run(creep);
                }
                if (creep.memory.role === 'upgraderSo2') {
                    roleUpgraderSource.run(creep);
                }
                if (creep.memory.role === 'upgrader1') {
                    roleUpgrader.run(creep);
                }
                if (creep.memory.role === 'upgrader2') {
                    roleUpgrader.run(creep);
                }
                if (creep.memory.role === 'upgraderLD1') {
                    roleLongDistanceUpgrader.run(creep);
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
                if (creep.memory.role === 'builderLD1') {
                    roleLongDistanceBuilder.run(creep);
                }
                

                if (creep.memory.role === 'repairerSo1') {
                    roleRepairerSource.run(creep);
                }
                if (creep.memory.role === 'repairer1') {
                    roleRepairer.run(creep);
                }
                if (creep.memory.role === 'repairerLD1') {
                    roleLongDistanceRepairer.run(creep);
                }
            }
            let end3 = Game.cpu.getUsed() - start3
            Memory.stats['cpu.avg.creep'] = end3;
            Memory.stats['cpu.avg10.creep'] = 0.9 * Memory.stats['cpu.avg10.creep'] + 0.1 * Memory.stats['cpu.avg.creep'];
            Memory.stats['cpu.avg100.creep'] = 0.99 * Memory.stats['cpu.avg100.creep'] + 0.01 * Memory.stats['cpu.avg.creep'];
            Memory.stats['cpu.avg1000.creep'] = 0.999 * Memory.stats['cpu.avg1000.creep'] + 0.001 * Memory.stats['cpu.avg.creep'];
             
            let start = Game.cpu.getUsed()

            function needsCreeps(role, roomName, numbers) {
                let numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role === role && c.memory.room === roomName);
                return numberOfCreeps < numbers
            }
            function needsCreeps2(role, roomName, numbers) {
                let numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role === role && c.memory.room === roomName && c.ticksToLive > 350);
                return numberOfCreeps < numbers
            }

            _.forEach(Object.keys(Game.rooms), function (roomName) {
                let room = Game.rooms[roomName];
                let controller = room.controller;
                if (controller && controller.my) {
                    let towers = room.towers;
                    let mineralType = Memory.rooms[roomName + '.mineral'][0].mineralType;

                    for (let tower of towers) {
                        tower.defend();
                    }
                    if (_.size(Memory.rooms[roomName + '.enemy']) == 0) {
                        for (let tower of towers) {
                            let targetRepair;
                            if (1==1) {
                                targetRepair = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                                    filter: (s) => s.hits < s.hitsMax && s.hits < 3000000
                                });
                            }
                            if (targetRepair !== undefined) {
                                tower.repair(targetRepair);
                            }
                        }
                    }

                    if (Game.time % 500 == 0) {
                        Memory.rooms[roomName + '.sources'] = room.find(FIND_SOURCES);
                        Memory.rooms[roomName + '.mineral'] = room.find(FIND_MINERALS);
                    }
                    if (Game.time % 500 == 0) {
                        Memory.rooms[roomName + '.constructions'] = room.find(FIND_CONSTRUCTION_SITES);
                    }
                    if (Game.time % 50 == 0) {
                        Memory.rooms[roomName + '.enemy'] = room.find(FIND_HOSTILE_CREEPS);
                    }

                    if (controller.level >= 6 && room.terminal !== undefined && room.storage !== null && Game.time % 2 == 0) {
                        let flag = Memory.flags[roomName];
                        let mineralType = Memory.rooms[roomName + '.mineral'][0].mineralType;
                        let currentAmount = flag.marketAmount;
                        let addAmount = 25 * 1000;
                        let orderId = flag.orderId;
                        let newPrice = marketPrice(mineralType);

                        if (Game.time % 500 == 0) {
                            Game.market.changeOrderPrice(orderId, newPrice)
                        }
                        if (Game.time % 5 == 0) {
                            if (haveResource(mineralType, 250000, room) && currentAmount < 50000) {
                                Game.market.extendOrder(orderId, addAmount)
                            }
                        }


                        if (Game.time % 2 == 0) {
                            flag.orderId = Game.market.getAllOrders({type: ORDER_SELL, resourceType: mineralType, roomName: roomName})[0].id
                            flag.marketAmount = Game.market.getAllOrders({type: ORDER_SELL, resourceType: mineralType, roomName: roomName})[0].amount
                            flag.price = Game.market.getAllOrders({type: ORDER_SELL, resourceType: mineralType, roomName: roomName})[0].price
                        }
                    }
                }
            });

            if (Game.time % 5 == 0) {
                _.forEach(Object.keys(Game.rooms), function (roomName) {
                    let room = Game.rooms[roomName];
                    let controller = room.controller;

                    if (controller && controller.my) {
                        let roomName = room.name;
                        let harvester;
                        let transferer;
    
                        let harvesterSo;
                        let harvesterCo;
                        let harvesterLi;
                        
                        let transfererSo;
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

                           

                        let enemy = Memory.rooms[roomName + '.enemy'];
                        let construction = Memory.rooms[roomName + '.constructions'];
                        let sources = Memory.rooms[roomName + '.sources'];
                        let minerals = Memory.rooms[roomName + '.mineral'][0].mineralAmount;
                        let mineralType = Memory.rooms[roomName + '.mineral'][0].mineralType;
                        let flag = Memory.flags[roomName];
                        let extension = room.extensions.length

                        let normalDirections = [TOP_LEFT,LEFT,BOTTOM_LEFT,BOTTOM,BOTTOM_RIGHT];
                        let transfererDirections = [TOP_RIGHT];
                        
                        let spawn2 = room.spawns[1]
                        let spawn = room.find(FIND_MY_SPAWNS, {
                            filter: (structure) => {
                                return (structure.structureType === STRUCTURE_SPAWN && structure.spawning == null);
                            }
                        });
                        
                        if (Game.flags[roomName] == undefined) {
                            room.createFlag(25,25, roomName)
                        }
                        if (!Memory.flags[roomName]) {
                            Memory.flags[roomName] = {}
                        }

                        let transfererSpawn;
                        if (room.terminal !== undefined) {
                            transfererSpawn = room.terminal.pos.findClosestByRange(room.spawns, {
                                filter: (structure) => {
                                    return (structure.structureType === STRUCTURE_SPAWN && structure.pos.inRangeTo(room.terminal, 5));
                                }
                            });
                        }

                        if (_.size(Game.market.getAllOrders({type: ORDER_SELL, resourceType: mineralType, roomName: roomName})) == 0 && room.terminal !== undefined) {
                            Game.market.createOrder({
                                type: ORDER_SELL,
                                resourceType: mineralType,
                                price: 2,
                                totalAmount: 1,
                                roomName: roomName
                            });
                        }







                        if (controller.level >= 1 && controller.level <= 2 && extension >= 0 && spawn[0] !== undefined) {
                            harvesterSo = [MOVE,
                                            WORK,WORK,
                                            CARRY]; "300 Energy"
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

                            if (needsCreeps("harvesterSo11", roomName, 1) && spawn[0] !== undefined && needsCreeps("harvesterSo1", roomName, 1) && needsCreeps("harvester1", roomName, 1)) {
                                spawn[0].spawnCreep(
                                    harvesterSo,
                                'Harvester' + Game.time,
                                {
                                    memory: {
                                        role: 'harvesterSo11',
                                        working: false,
                                        sourceId: sources[0].id,
                                        room: roomName,
                                        
                                    }
                                });
                            }
                            else if (needsCreeps("harvesterSo21", roomName, 1) && sources[1] !== undefined && needsCreeps("harvesterSo2", roomName, 1)&& needsCreeps("harvester2", roomName, 1)) {
                                spawn[0].spawnCreep(
                                    harvesterSo,
                                'Harvester' + Game.time,
                                {
                                    memory: {
                                        role: 'harvesterSo21',
                                        working: false,
                                        sourceId: sources[1].id,
                                        room: roomName,
                                        
                                    }
                                });
                            }
                            else if (needsCreeps("attackerMelee1", roomName, 5) && _.size(enemy) > 0) {
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
                            else if (needsCreeps("upgraderSo1", roomName, 1) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("builderSo1", roomName, 1) && _.size(construction) > 0) {
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
                            else if (needsCreeps("repairerSo1", roomName, 2) && sources[1] !== undefined) {
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





                        else if (controller.level >= 2 && controller.level <= 3 && extension >= 5 && extension < 10 && spawn[0] !== undefined) {
                            harvesterSo = [MOVE,
                                            WORK,WORK,
                                            CARRY]; "300 Energy"
                            transfererSo = [MOVE,MOVE,MOVE,
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
                            transferer = spawn[0].spawnCreep(
                                transfererCo,
                                'Transferer' + Game.time,
                                {dryRun: true});

                            if (needsCreeps("transfererSo1", roomName, 1) && needsCreeps("transferer1",roomName,1) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                                spawn[0].spawnCreep(
                                    transfererSo,
                                'Transferer' + Game.time,
                                {
                                    memory: {
                                        role: 'transfererSo1',
                                        working: false,
                                        room: roomName,
                                    }
                                });
                            }
                            else if (needsCreeps("harvesterSo1", roomName, 2) && needsCreeps("harvester1",roomName,1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
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
                            else if (needsCreeps("harvesterSo2", roomName, 2) && needsCreeps("harvester2",roomName,1) && sources[1] !== undefined && harvester === ERR_NOT_ENOUGH_ENERGY) {
                                spawn[0].spawnCreep(
                                    harvesterSo,
                                'Harvester' + Game.time,
                                {
                                    memory: {
                                        role: 'harvesterSo2',
                                        working: false,
                                        sourceId: sources[1].id,
                                        room: roomName,
                                        
                                    }
                                });
                            }
                            else if (needsCreeps("transferer1", roomName, 3) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("harvester1", roomName, 2) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("attackerMelee1", roomName, 3) && _.size(enemy) > 0) {
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
                            else if (needsCreeps("upgrader1", roomName, 1) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("builder1", roomName, 1) && _.size(construction) > 0) {
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
                            else if (needsCreeps("repairer1", roomName, 2) && spawn[0] !== undefined) {
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





                        else if (controller.level >= 3 && controller.level <= 4 && extension >= 10 && extension < 20 && spawn[0] !== undefined) {
                            harvesterSo = [MOVE,
                                            WORK,WORK,
                                            CARRY]; "300 Energy"
                            transfererSo = [MOVE,MOVE,MOVE,
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
                            transferer = spawn[0].spawnCreep(
                                transfererCo,
                                'Transferer' + Game.time,
                                {dryRun: true});

                            if (needsCreeps("transfererSo1", roomName, 1) && needsCreeps("transferer1",roomName,1) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                                spawn[0].spawnCreep(
                                    transfererSo,
                                'Transferer' + Game.time,
                                {
                                    memory: {
                                        role: 'transfererSo1',
                                        working: false,
                                        room: roomName,
                                    }
                                });
                            }
                            else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
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
                            else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && sources[1] !== undefined && harvester === ERR_NOT_ENOUGH_ENERGY) {
                                spawn[0].spawnCreep(
                                    harvesterSo,
                                'Harvester' + Game.time,
                                {
                                    memory: {
                                        role: 'harvesterSo2',
                                        working: false,
                                        sourceId: sources[1].id,
                                        room: roomName,
                                        
                                    }
                                });
                            }
                            else if (needsCreeps("transferer1", roomName, 3) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("harvester1", roomName, 2) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("upgrader1", roomName, 1) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("attackerMelee1", roomName, 5) && _.size(enemy) > 0) {
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
                            else if (needsCreeps("builder1", roomName, 1) && _.size(construction) > 0) {
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
                        else if (controller.level >= 4 && controller.level <= 5 && extension >= 20 && extension < 30 && spawn[0] !== undefined) {
                            harvesterSo = [MOVE,
                                            WORK,WORK,
                                            CARRY]; "300 Energy"
                            transfererSo = [MOVE,MOVE,MOVE,
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
                            transferer = spawn[0].spawnCreep(
                                transfererCo,
                                'Transferer' + Game.time,
                                {dryRun: true});

                            if (needsCreeps("transfererSo1", roomName, 1) && needsCreeps("transferer1",roomName,1) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                                spawn[0].spawnCreep(
                                    transfererSo,
                                'Transferer' + Game.time,
                                {
                                    memory: {
                                        role: 'transfererSo1',
                                        working: false,
                                        room: roomName,
                                    }
                                });
                            }
                            else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
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
                            else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && sources[1] !== undefined && harvester === ERR_NOT_ENOUGH_ENERGY) {
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
                            else if (needsCreeps("transferer1", roomName, 1) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("harvester1", roomName, 1) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("attackerMelee1", roomName, 5) && _.size(enemy) > 0) {
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
                            else if (needsCreeps("upgrader1", roomName, 1) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("builder1", roomName, 1) && _.size(construction) > 0) {
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
                        else if (controller.level >= 5 && controller.level <= 6 && extension >= 30 && extension < 40 && spawn[0] !== undefined) {
                            
                            harvesterSo = [MOVE,
                                            WORK,WORK,
                                            CARRY]; "300 Energy"
                            transfererSo = [MOVE,MOVE,MOVE,
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
                                            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                            CARRY,CARRY]; "1850 Energy"
                            builderLi = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                            WORK,WORK,WORK,WORK,WORK,
                                            CARRY,CARRY,CARRY,CARRY,CARRY]; "1000 Energy"

                            harvester = spawn[0].spawnCreep(
                                harvesterCo,
                                'Harvester' + Game.time,
                                {dryRun: true});
                            transferer = spawn[0].spawnCreep(
                                transfererCo,
                                'Transferer' + Game.time,
                                {dryRun: true});

                            if (needsCreeps("transfererSo1", roomName, 1) && needsCreeps("transferer1",roomName,1) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                                spawn[0].spawnCreep(
                                    transfererSo,
                                'Transferer' + Game.time,
                                {
                                    memory: {
                                        role: 'transfererSo1',
                                        working: false,
                                        room: roomName,
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
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
                            else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && sources[1] !== undefined && harvester === ERR_NOT_ENOUGH_ENERGY) {
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
                            else if (needsCreeps("transferer1", roomName, 1) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("harvester1", roomName, 1) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("attackerMelee1", roomName, 5) && _.size(enemy) > 0) {
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
                            else if (needsCreeps("upgrader1", roomName, 2) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("builder1", roomName, 1) && _.size(construction) > 0) {
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
                            else if (needsCreeps("extractorSt", roomName, 1) && minerals > 0 && room.extractor.length > 0) {
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
                        else if (controller.level >= 6 && controller.level <= 7 && extension >= 40 && spawn.length >= 1 && spawn[0] !== undefined) {
                            harvesterSo = [MOVE,
                                            WORK,WORK,
                                            CARRY]; "300 Energy"
                            transfererSo = [MOVE,MOVE,MOVE,
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
                            attackerMeele = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,]; "2250 Energy"
                            upgraderLi = [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY]
                            builderTe = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                            WORK,WORK,WORK,WORK,WORK,
                                            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; "1350 Energy"

                            harvester = spawn[0].spawnCreep(
                                harvesterLi,
                                'Harvester' + Game.time,
                                {dryRun: true});
                            transferer = spawn[0].spawnCreep(
                                transfererTe,
                                'Transferer' + Game.time,
                                {dryRun: true});

                            if (needsCreeps("transfererSo1", roomName, 1) && needsCreeps("transferer1",roomName,1) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                                spawn[0].spawnCreep(
                                    transfererSo,
                                'Transferer' + Game.time,
                                {
                                    memory: {
                                        role: 'transfererSo1',
                                        working: false,
                                        room: roomName,
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
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
                            else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && sources[1] !== undefined && harvester === ERR_NOT_ENOUGH_ENERGY) {
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
                            else if (needsCreeps("transfererLiTe1", roomName, 1) && spawn[0] !== undefined) {
                            transfererSpawn.spawnCreep(
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
                            else if (needsCreeps("transferer1", roomName, 1) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("harvester1", roomName, 1) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("attackerMelee1", roomName, 5) && _.size(enemy) > 0) {
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
                            else if (needsCreeps("upgrader1", roomName, 1) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("builder1", roomName, 1) && _.size(construction) > 0) {
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
                        else if (controller.level >= 7 && controller.level <= 8 && extension >= 50 && spawn.length == 2 && spawn[0] !== undefined) {
                            harvesterSo = [MOVE,
                                            WORK,WORK,
                                            CARRY]; "300 Energy"
                            transfererSo = [MOVE,MOVE,MOVE,
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
                            attackerMeele = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,]; "2250 Energy"
                            upgraderLi = [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY]
                            builderTe = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; "1`850 Energy"

                            harvester = spawn[0].spawnCreep(
                                harvesterLi,
                                'Harvester' + Game.time,
                                {dryRun: true});
                            transferer = spawn[0].spawnCreep(
                                transfererTe,
                                'Transferer' + Game.time,
                                {dryRun: true});

                            if (needsCreeps("transfererSo1", roomName, 1) && needsCreeps("transferer1",roomName,1) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                                spawn[0].spawnCreep(
                                    transfererSo,
                                'Transferer' + Game.time,
                                {
                                    memory: {
                                        role: 'transfererSo1',
                                        working: false,
                                        room: roomName,
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
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
                            else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && sources[1] !== undefined && harvester === ERR_NOT_ENOUGH_ENERGY) {
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
                            else if (needsCreeps("transfererLiTe1", roomName, 1) && spawn[0] !== undefined) {
                                transfererSpawn.spawnCreep(
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
                            else if (needsCreeps("transferer1", roomName, 1) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("harvester1", roomName, 1) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("attackerMelee1", roomName, 5) && _.size(enemy) > 0) {
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
                            else if (needsCreeps("upgrader1", roomName, 1) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("builder1", roomName, 1) && _.size(construction) > 0) {
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
                        else if (controller.level == 8 && extension > 50 && spawn.length >= 3 && spawn[0] !== undefined) {
                            harvesterSo = [MOVE,
                                            WORK,WORK,
                                            CARRY]; "300 Energy"
                            transfererSo = [MOVE,MOVE,MOVE,
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
                            upgraderLi = [MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY]
                            builderTe = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                            WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; "2350 Energy"
                            harvester = spawn[0].spawnCreep(
                                harvesterLi,
                                'Harvester' + Game.time,
                                {dryRun: true});
                            transferer = spawn[0].spawnCreep(
                                transfererTe,
                                'Transferer' + Game.time,
                                {dryRun: true});

                            if (needsCreeps("transfererSo1", roomName, 1) && needsCreeps("transferer1",roomName,1) && transferer === ERR_NOT_ENOUGH_ENERGY) {
                                spawn[0].spawnCreep(
                                    transfererSo,
                                'Transferer' + Game.time,
                                {
                                    memory: {
                                        role: 'transfererSo1',
                                        working: false,
                                        room: roomName,
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1) && harvester === ERR_NOT_ENOUGH_ENERGY) {
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
                            else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && sources[1] !== undefined && harvester === ERR_NOT_ENOUGH_ENERGY) {
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
                            else if (needsCreeps("transfererLiTe1", roomName, 1) && spawn[0] !== undefined) {
                            transfererSpawn.spawnCreep(
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
                            else if (needsCreeps("transferer1", roomName, 1) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("harvester1", roomName, 1) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("attackerMelee1", roomName, 5) && _.size(enemy) > 0) {
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
                            else if (needsCreeps("upgrader1", roomName, 1) && spawn[0] !== undefined) {
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
                            else if (needsCreeps("builder1", roomName, 1) && _.size(construction) > 0) {
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
                        if (roomName == "E43N1" && spawn[0] !== undefined) { // 2 Source
                            let target = "E44N1"
                            let reserver = [MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,CLAIM];
                            let transfererLD = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
                            let harvesterLD = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                CARRY,CARRY,CARRY,CARRY,CARRY];
                            let repairerLD = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
                            

                            if (needsCreeps("reserver1", roomName, 1) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    reserver,
                                'Reserver' + Game.time,
                                {
                                    memory: {
                                        role: 'reserver1',
                                        working: false,
                                        room: roomName,
                                        target: target
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("repairerLD1", roomName, 1) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    repairerLD,
                                'Repairer' + Game.time,
                                {
                                    memory: {
                                        role: 'repairerLD1',
                                        working: false,
                                        room: roomName,
                                        target: target
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("transfererLD1", roomName, 3) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    transfererLD,
                                'Transferer' + Game.time,
                                {
                                    memory: {
                                        role: 'transfererLD1',
                                        working: false,
                                        room: roomName,
                                        target: target
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("harvesterLD1", roomName, 1) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    harvesterLD,
                                'Harvester' + Game.time,
                                {
                                    memory: {
                                        role: 'harvesterLD1',
                                        working: false,
                                        room: roomName,
                                        target: target,
                                        sourceId: "5bbcaf969099fc012e63ad4b"
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("harvesterLD2", roomName, 1) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    harvesterLD,
                                'Harvester' + Game.time,
                                {
                                    memory: {
                                        role: 'harvesterLD2',
                                        working: false,
                                        room: roomName,
                                        target: target,
                                        sourceId: "5bbcaf969099fc012e63ad4c"
                                    }, directions: normalDirections
                                });
                            }
                        }
                        else if (roomName == "E42N3" && spawn[0] !== undefined) { // 1 Source
                            let target = "E42N4"
                            let reserver = [MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,CLAIM];
                            let transfererLD = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
                            let harvesterLD = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                CARRY,CARRY,CARRY,CARRY,CARRY];

                            if (needsCreeps("reserver1", roomName, 1) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    reserver,
                                'Reserver' + Game.time,
                                {
                                    memory: {
                                        role: 'reserver1',
                                        working: false,
                                        room: roomName,
                                        target: target
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("transfererLD1", roomName, 2) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    transfererLD,
                                'Transferer' + Game.time,
                                {
                                    memory: {
                                        role: 'transfererLD1',
                                        working: false,
                                        room: roomName,
                                        target: target
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("harvesterLD1", roomName, 1) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    harvesterLD,
                                'Harvester' + Game.time,
                                {
                                    memory: {
                                        role: 'harvesterLD1',
                                        working: false,
                                        room: roomName,
                                        target: target,
                                        sourceId: "5bbcaf719099fc012e63a9c9"
                                    }, directions: normalDirections
                                });
                            }
                        }
                        /*else if (roomName == "E44N3") { // 2 Source
                            let target = "E44N4"



                            let attackerMelee = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,]; "2250 Energy"
                            let transfererLD = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
                            let repairerLD = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
                            let harvesterLD = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
                            

                                let reserver = [MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM];
                            if (needsCreeps("transfererLD1", roomName, 2) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    transfererLD,
                                'Transferer' + Game.time,
                                {
                                    memory: {
                                        role: 'transfererLD1',
                                        working: false,
                                        room: roomName,
                                        target: target
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("repairerLD1", roomName, 2 ) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    repairerLD,
                                'Repairer' + Game.time,
                                {
                                    memory: {
                                        role: 'repairerLD1',
                                        working: false,
                                        room: roomName,
                                        target: target
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("harvesterLD2", roomName, 0) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    harvesterLD,
                                'Harvester' + Game.time,
                                {
                                    memory: {
                                        role: 'harvesterLD2',
                                        working: false,
                                        room: roomName,
                                        target: target,
                                        sourceId: "5bbcaf969099fc012e63ad42"
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("harvesterLD3", roomName, 1) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    harvesterLD,
                                'Harvester' + Game.time,
                                {
                                    memory: {
                                        role: 'harvesterLD3',
                                        working: false,
                                        room: roomName,
                                        target: target,
                                        sourceId: "5bbcaf969099fc012e63ad3f"
                                    }, directions: normalDirections
                                });
                            }
                        }*/
                        else if (roomName == "E43N2") { // 1 Source
                            let target = "E44N2"
                            let reserver = [MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,CLAIM];
                            let transfererLD = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
                            let harvesterLD = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                CARRY,CARRY,CARRY,CARRY,CARRY];
                            
                            if (needsCreeps("reserver1", roomName, 1) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    reserver,
                                'Reserver' + Game.time,
                                {
                                    memory: {
                                        role: 'reserver1',
                                        working: false,
                                        room: roomName,
                                        target: target
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("transfererLD1", roomName, 2) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    transfererLD,
                                'Transferer' + Game.time,
                                {
                                    memory: {
                                        role: 'transfererLD1',
                                        working: false,
                                        room: roomName,
                                        target: target
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("harvesterLD1", roomName, 1) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    harvesterLD,
                                'Harvester' + Game.time,
                                {
                                    memory: {
                                        role: 'harvesterLD1',
                                        working: false,
                                        room: roomName,
                                        target: target,
                                        sourceId: "5bbcaf969099fc012e63ad48"
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("builderLD1", roomName, 2) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    harvesterLD,
                                'Builder' + Game.time,
                                {
                                    memory: {
                                        role: 'builderLD1',
                                        working: false,
                                        room: roomName,
                                        target: "E47N2",
                                    }, directions: normalDirections
                                });
                            }
                        }
                        /*else if (roomName == "E43N4") { // 3 X 4K Source
                            let target = "E44N4"
                            let scout = [MOVE]
                            let reserver = [MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,CLAIM];
                            let transfererLD = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
                            let repairerLD = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]
                            let harvesterLD = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                                WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                                                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
                            let attackerMelee = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,]; "2250 Energy"
                            let attackerMeleeRange = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                                ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK];
                            let attackerHeal = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL]; "2200 Energy"

                            //let attackerMelee = [MOVE,ATTACK]
                            //let attackerHeal = [MOVE,HEAL]
                            if (needsCreeps2("scout1", roomName, 1) && spawn2 !== undefined) {
                                spawn2.spawnCreep(
                                    scout,
                                'Scout-' + roomName,
                                {
                                    memory: {
                                        role: 'scout1',
                                        working: false,
                                        room: roomName,
                                        target: target,
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps2("attackerMelee2", roomName, 1) && spawn2 !== undefined) {
                                spawn2.spawnCreep(
                                    attackerMelee,
                                'AttackerMeelee' + Game.time,
                                {
                                    memory: {
                                        role: 'attackerMelee2',
                                        working: false,
                                        room: roomName,
                                        target: target,
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps2("attackerHeal1", roomName, 1) && spawn2 !== undefined) {
                                spawn2.spawnCreep(
                                    attackerHeal,
                                'Healer' + Game.time,
                                {
                                    memory: {
                                        role: 'attackerHeal1',
                                        working: false,
                                        room: roomName,
                                        target: target,
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("harvesterLD1", roomName, 1) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    harvesterLD,
                                'Harvester' + Game.time,
                                {
                                    memory: {
                                        role: 'harvesterLD1',
                                        working: false,
                                        room: roomName,
                                        target: target,
                                        sourceId: "5bbcaf969099fc012e63ad3d"
                                    }, directions: normalDirections
                                });
                            }
                            else if (needsCreeps("transfererLD1", roomName, 2) && spawn[0] !== undefined) {
                                spawn[0].spawnCreep(
                                    transfererLD,
                                'Transferer' + Game.time,
                                {
                                    memory: {
                                        role: 'transfererLD1',
                                        working: false,
                                        room: roomName,
                                        target: target
                                    }, directions: normalDirections
                                });
                            }
                        }*/
                    }
                });
            }
            let end = Game.cpu.getUsed() - start
            Memory.stats['cpu.avg.spawning'] = end;
            Memory.stats['cpu.avg10.spawning'] = 0.9 * Memory.stats['cpu.avg10.spawning'] + 0.1 * Memory.stats['cpu.avg.spawning'];
            Memory.stats['cpu.avg100.spawning'] = 0.99 * Memory.stats['cpu.avg100.spawning'] + 0.01 * Memory.stats['cpu.avg.spawning'];
            Memory.stats['cpu.avg1000.spawning'] = 0.999 * Memory.stats['cpu.avg1000.spawning'] + 0.001 * Memory.stats['cpu.avg.spawning'];

            

/*
=

            Game.spawns['E43N2-3'].spawnCreep(
                [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,CLAIM,CLAIM,
                    MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                'claimer2',
                {
                    memory: {
                        role: 'claimer1',
                        working: false,
                    }
                });

            Game.spawns['E43N1-1'].spawnCreep(
                [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                    MOVE,MOVE,MOVE,MOVE,MOVE],
                'Transferer4',
                {
                    memory: {
                        role: 'transfererFromTo',
                        working: false,
                    }
                });
         */

        let start2 = Game.cpu.getUsed();


        if (!Memory.stats) {
            Memory.stats = {}
        }
        if (!Memory.flags) {
            Memory.flags = {}
        }
        if (!Memory.rooms) {
            Memory.rooms = {}
        }
        if (!Memory.test) {
            Memory.test = {}
        }
        if (Game.time % 10 == 0) {
            Memory.stats['cpu.limit'] = Game.cpu.limit;
            Memory.stats['cpu.bucket'] = Game.cpu.bucket;
            Memory.stats['cpu.tickLimit'] = Game.cpu.tickLimit;
    
            Memory.stats['te.total'] = terminalTotal;
            Memory.stats['st.total'] = storageTotal;
    
            Memory.stats['gcl.progress'] = Game.gcl.progress;
            Memory.stats['gcl.progressTotal'] = Game.gcl.progressTotal;
            Memory.stats['gcl.level'] = Game.gcl.level;
    
            Memory.stats['market.credits'] = Game.market.credits;
    
            Memory.stats['creeps.total'] = _.size(Memory.creeps);


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
    
                    Memory.stats['rooms.' + roomName + '.te'] = terminalTotal;
                    Memory.stats['rooms.' + roomName + '.st'] = storageTotal;
    
                    Memory.stats['rooms.' + roomName + '.creeps.total'] = _.sum(Game.creeps, (c) => c.memory.room === roomName);
    
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
                        }
                    });
                }    
            });
        }



        
        Memory.stats['cpu.getUsed'] = Game.cpu.getUsed();
        Memory.stats['cpu.cpuAvg10'] = 0.9 * Memory.stats['cpu.cpuAvg10'] + 0.1 * Memory.stats['cpu.getUsed'];
        Memory.stats['cpu.cpuAvg100'] = 0.99 * Memory.stats['cpu.cpuAvg100'] + 0.01 * Memory.stats['cpu.getUsed'];
        Memory.stats['cpu.cpuAvg1000'] = 0.999 * Memory.stats['cpu.cpuAvg1000'] + 0.001 * Memory.stats['cpu.getUsed'];
        
        _.forEach(Object.keys(Game.rooms), function (roomName) {
            let room = Game.rooms[roomName];
            if (room.controller && room.controller.my) {
                let eventLog = room.getEventLog();
                let harvestEvents = _.filter(eventLog, {event: EVENT_HARVEST});
                if (harvestEvents.length > 0) {
                    Memory.rooms['harvest.' + roomName] = harvestEvents;
                } 
                
                _.forEach(Object(Memory.rooms['harvest.' + roomName]), function (event) {
                    let amount = event.data.amount;
                    Memory.stats['rooms.' + roomName + '.events.EnergyHarvested'] += amount
                });
                if (Game.time % 25000 == 0) {
                    let nul = 0
                    Memory.stats['rooms.' + roomName + '.events.EnergyHarvested'] = nul;
                }


                let upgradeEvents = _.filter(eventLog, {event: EVENT_UPGRADE_CONTROLLER});
                if (upgradeEvents.length > 0) {
                    Memory.rooms['upgrade.' + roomName] = upgradeEvents;
                } 
                
                _.forEach(Object(Memory.rooms['upgrade.' + roomName]), function (event) {
                    let amount = event.data.energySpent;
                    Memory.stats['rooms.' + roomName + '.events.UpgradeEnergy'] += amount
                });
                if (Game.time % 25000 == 0) {
                    let nul = 0
                    Memory.stats['rooms.' + roomName + '.events.UpgradeEnergy'] = nul;
                }


                let repairEvents = _.filter(eventLog, {event: EVENT_REPAIR});
                if (repairEvents.length > 0) {
                    Memory.rooms['repair.' + roomName] = repairEvents;
                } 
                
                _.forEach(Object(Memory.rooms['repair.' + roomName]), function (event) {
                    let amount = event.data.energySpent;
                    Memory.stats['rooms.' + roomName + '.events.RepairEnergy'] += amount
                });
                if (Game.time % 25000 == 0) {
                    let nul = 0
                    Memory.stats['rooms.' + roomName + '.events.RepairEnergy'] = nul;
                }


                let buildEvents = _.filter(eventLog, {event: EVENT_BUILD});
                if (buildEvents.length > 0) {
                    Memory.rooms['build.' + roomName] = buildEvents;
                } 
                
                _.forEach(Object(Memory.rooms['build.' + roomName]), function (event) {
                    let amount = (event.data.amount) / 100;
                    Memory.stats['rooms.' + roomName + '.events.BuildEnergy'] += amount
                });
                if (Game.time % 25000 == 0) {
                    let nul = 0
                    Memory.stats['rooms.' + roomName + '.events.BuildEnergy'] = nul;
                }    
            }
        });

        let end2 = Game.cpu.getUsed() - start2
        Memory.stats['cpu.avg.grafana'] = end2;
        
        Memory.stats['cpu.avg10.grafana'] = 0.9 * Memory.stats['cpu.avg10.grafana'] + 0.1 * Memory.stats['cpu.avg.grafana'];
        Memory.stats['cpu.avg100.grafana'] = 0.99 * Memory.stats['cpu.avg100.grafana'] + 0.01 * Memory.stats['cpu.avg.grafana'];
        Memory.stats['cpu.avg1000.grafana'] = 0.999 * Memory.stats['cpu.avg1000.grafana'] + 0.001 * Memory.stats['cpu.avg.grafana'];

        }
    });
};