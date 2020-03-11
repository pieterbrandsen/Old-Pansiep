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


const roleScientist = require('role.scientist2');

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

            function haveResource(resource, amount, roomName) {
                let numberOfResource = 0;

                let room = Game.rooms[roomName];

                if (room.storage.store[resource] !== undefined) {
                    numberOfResource += room.storage.store[resource];
                }
                if (room.terminal.store[resource] !== undefined) {
                    numberOfResource += room.terminal.store[resource];
                }
                return numberOfResource > amount
            }
            function marketPrice(resource, currentPrice) {
                let price = Game.market.getAllOrders({type: ORDER_SELL, resourceType: resource});
                price.sort((a, b) => a.price - b.price);

                if (price[0].price * 1,15 > price[2].price && price[0].price * 1,4 > price[5].price) {
                    let newPrice = price[0].price *0.975;
                    return newPrice
                }
                else {
                    let secondPrice = price[3].price;
                    return secondPrice;
                }
            }



            for (let name in Memory.creeps) {
                if (Game.creeps[name] === undefined) {
                    delete Memory.creeps[name];
                }
            }

            let start3 = Game.cpu.getUsed()


            // Every creep name in Game.creeps
            let array = [];
            for (let name in Game.creeps) {
                let creep = Game.creeps[name];
                let role = creep.memory.role
                array.push(role);
                //Memory.flags["E43N3"].creeps = array

                let start4 = Game.cpu.getUsed()
                if (creep.memory.role === 'claimer1') {
                    roleClaimer.run(creep);
                }
                if (creep.memory.role === 'reserver1') {
                    roleReserver.run(creep);
                }
                if (creep.memory.role === 'reserver2') {
                    roleReserver.run(creep);
                }

                let end4 = Game.cpu.getUsed() - start4
                Memory.stats['cpu.avg.role1'] += end4;

                if (creep.memory.role === 'scout1') {
                    roleScout.run(creep);
                }

                let start5 = Game.cpu.getUsed()

                if (creep.memory.role === 'harvesterSo11') {
                    roleHarvester.run(creep);
                }
                if (creep.memory.role === 'harvesterSo21') {
                    roleHarvester.run(creep);
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

                Memory.stats['cpu.avg.role2'] += Game.cpu.getUsed() - start5;

                let start6 = Game.cpu.getUsed()

                if (creep.memory.role === 'extractorSt') {
                    roleExtractorStorage.run(creep);
                }

                let end6 = Game.cpu.getUsed() - start6
                Memory.stats['cpu.avg.role3'] += end6;

                let start7 = Game.cpu.getUsed()

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

                let end7 = Game.cpu.getUsed() - start7
                Memory.stats['cpu.avg.role4'] += end7;

                let start8 = Game.cpu.getUsed()

                if (creep.memory.role === 'transfererLiTe1') {
                    roleTransfererLinkToTerminal.run(creep);
                }

                let end8 = Game.cpu.getUsed() - start8
                Memory.stats['cpu.avg.role5'] += end8;

                let start9 = Game.cpu.getUsed()

                if (creep.memory.role === 'scientist1') {
                    roleScientist.run(creep);
                }

                let end9 = Game.cpu.getUsed() - start9
                Memory.stats['cpu.avg.role6'] += end9;

                let start10 = Game.cpu.getUsed()

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

                let end10 = Game.cpu.getUsed() - start10;
                Memory.stats['cpu.avg.role7'] += end10;

                let start11 = Game.cpu.getUsed()

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

                let end11 = Game.cpu.getUsed() - start11
                Memory.stats['cpu.avg.role8'] += end11;

                let start12 = Game.cpu.getUsed()

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

                let end12 = Game.cpu.getUsed() - start12;
                Memory.stats['cpu.avg.role9'] += end12;

                let start13 = Game.cpu.getUsed()

                if (creep.memory.role === 'repairerSo1') {
                    roleRepairerSource.run(creep);
                }
                if (creep.memory.role === 'repairer1') {
                    roleRepairer.run(creep);
                }
                if (creep.memory.role === 'repairerLD1') {
                    roleLongDistanceRepairer.run(creep);
                }

                let end13 = Game.cpu.getUsed() - start13
                Memory.stats['cpu.avg.role10'] += end13;
            }


            if (Game.time % 20 == 0) {
                let harvester = 0;
                let extractor = 0;
                let transferer = 0;
                let upgrader = 0;
                let builder = 0;
                let repairer = 0;
                let attacker = 0;
                let reserver = 0;
                let scientist = 0;

                for (let i = 0; i< array.length; i++) {
                    if (array[i].includes("harvester") == true) {
                        harvester++
                    }
                    if (array[i].includes("extractor") == true) {
                        extractor++
                    }
                    if (array[i].includes("transferer") == true) {
                        transferer++
                    }
                    if (array[i].includes("upgrader") == true) {
                        upgrader++
                    }
                    if (array[i].includes("builder") == true) {
                        builder++
                    }
                    if (array[i].includes("repairer") == true) {
                        repairer++
                    }
                    if (array[i].includes("attacker") == true) {
                        attacker++
                    }
                    if (array[i].includes("reserver") == true) {
                        reserver++
                    }
                    if (array[i].includes("scientist") == true) {
                        scientist++
                    }
                }
                Memory.stats['creeps.avg.harvester'] = harvester

                Memory.stats['creeps.avg.extractor'] = extractor

                Memory.stats['creeps.avg.transferer'] = transferer

                Memory.stats['creeps.avg.upgrader'] = upgrader

                Memory.stats['creeps.avg.builder'] = builder

                Memory.stats['creeps.avg.repairer'] = repairer

                Memory.stats['creeps.avg.attacker'] = attacker

                Memory.stats['creeps.avg.reserver'] = reserver

                Memory.stats['creeps.avg.scientist'] = scientist
            }
            Memory.stats['creeps.avg10.harvester'] = 0.9 * Memory.stats['creeps.avg10.harvester'] + 0.1 * Memory.stats['creeps.avg.harvester'];
            Memory.stats['creeps.avg100.harvester'] = 0.99 * Memory.stats['creeps.avg100.harvester'] + 0.01 * Memory.stats['creeps.avg.harvester'];
            Memory.stats['creeps.avg1000.harvester'] = 0.999 * Memory.stats['creeps.avg1000.harvester'] + 0.001 * Memory.stats['creeps.avg.harvester'];

            Memory.stats['creeps.avg10.extractor'] = 0.9 * Memory.stats['creeps.avg10.extractor'] + 0.1 * Memory.stats['creeps.avg.extractor'];
            Memory.stats['creeps.avg100.extractor'] = 0.99 * Memory.stats['creeps.avg100.extractor'] + 0.01 * Memory.stats['creeps.avg.extractor'];
            Memory.stats['creeps.avg1000.extractor'] = 0.999 * Memory.stats['creeps.avg1000.extractor'] + 0.001 * Memory.stats['creeps.avg.extractor'];

            Memory.stats['creeps.avg10.transferer'] = 0.9 * Memory.stats['creeps.avg10.transferer'] + 0.1 * Memory.stats['creeps.avg.transferer'];
            Memory.stats['creeps.avg100.transferer'] = 0.99 * Memory.stats['creeps.avg100.transferer'] + 0.01 * Memory.stats['creeps.avg.transferer'];
            Memory.stats['creeps.avg1000.transferer'] = 0.999 * Memory.stats['creeps.avg1000.transferer'] + 0.001 * Memory.stats['creeps.avg.transferer'];

            Memory.stats['creeps.avg10.upgrader'] = 0.9 * Memory.stats['creeps.avg10.upgrader'] + 0.1 * Memory.stats['creeps.avg.upgrader'];
            Memory.stats['creeps.avg100.upgrader'] = 0.99 * Memory.stats['creeps.avg100.upgrader'] + 0.01 * Memory.stats['creeps.avg.upgrader'];
            Memory.stats['creeps.avg1000.upgrader'] = 0.999 * Memory.stats['creeps.avg1000.upgrader'] + 0.001 * Memory.stats['creeps.avg.upgrader'];

            Memory.stats['creeps.avg10.builder'] = 0.9 * Memory.stats['creeps.avg10.builder'] + 0.1 * Memory.stats['creeps.avg.builder'];
            Memory.stats['creeps.avg100.builder'] = 0.99 * Memory.stats['creeps.avg100.builder'] + 0.01 * Memory.stats['creeps.avg.builder'];
            Memory.stats['creeps.avg1000.builder'] = 0.999 * Memory.stats['creeps.avg1000.builder'] + 0.001 * Memory.stats['creeps.avg.builder'];

            Memory.stats['creeps.avg10.repairer'] = 0.9 * Memory.stats['creeps.avg10.repairer'] + 0.1 * Memory.stats['creeps.avg.repairer'];
            Memory.stats['creeps.avg100.repairer'] = 0.99 * Memory.stats['creeps.avg100.repairer'] + 0.01 * Memory.stats['creeps.avg.repairer'];
            Memory.stats['creeps.avg1000.repairer'] = 0.999 * Memory.stats['creeps.avg1000.repairer'] + 0.001 * Memory.stats['creeps.avg.repairer'];

            Memory.stats['creeps.avg10.attacker'] = 0.9 * Memory.stats['creeps.avg10.attacker'] + 0.1 * Memory.stats['creeps.avg.attacker'];
            Memory.stats['creeps.avg100.attacker'] = 0.99 * Memory.stats['creeps.avg100.attacker'] + 0.01 * Memory.stats['creeps.avg.attacker'];
            Memory.stats['creeps.avg1000.attacker'] = 0.999 * Memory.stats['creeps.avg1000.attacker'] + 0.001 * Memory.stats['creeps.avg.attacker'];

            Memory.stats['creeps.avg10.reserver'] = 0.9 * Memory.stats['creeps.avg10.reserver'] + 0.1 * Memory.stats['creeps.avg.reserver'];
            Memory.stats['creeps.avg100.reserver'] = 0.99 * Memory.stats['creeps.avg100.reserver'] + 0.01 * Memory.stats['creeps.avg.reserver'];
            Memory.stats['creeps.avg1000.reserver'] = 0.999 * Memory.stats['creeps.avg1000.reserver'] + 0.001 * Memory.stats['creeps.avg.reserver'];

            Memory.stats['creeps.avg10.scientist'] = 0.9 * Memory.stats['creeps.avg10.scientist'] + 0.1 * Memory.stats['creeps.avg.scientist'];
            Memory.stats['creeps.avg100.scientist'] = 0.99 * Memory.stats['creeps.avg100.scientist'] + 0.01 * Memory.stats['creeps.avg.scientist'];
            Memory.stats['creeps.avg1000.scientist'] = 0.999 * Memory.stats['creeps.avg1000.scientist'] + 0.001 * Memory.stats['creeps.avg.scientist'];



            Memory.stats['cpu.avg10.role1'] = 0.9 * Memory.stats['cpu.avg10.role1'] + 0.1 * Memory.stats['cpu.avg.role1'];
            Memory.stats['cpu.avg100.role1'] = 0.99 * Memory.stats['cpu.avg100.role1'] + 0.01 * Memory.stats['cpu.avg.role1'];
            Memory.stats['cpu.avg1000.role1'] = 0.999 * Memory.stats['cpu.avg1000.role1'] + 0.001 * Memory.stats['cpu.avg.role1'];
            Memory.stats['cpu.avg.role1'] = 0;

            Memory.stats['cpu.avg10.role2'] = 0.9 * Memory.stats['cpu.avg10.role2'] + 0.1 * Memory.stats['cpu.avg.role2'];
            Memory.stats['cpu.avg100.role2'] = 0.99 * Memory.stats['cpu.avg100.role2'] + 0.01 * Memory.stats['cpu.avg.role2'];
            Memory.stats['cpu.avg1000.role2'] = 0.999 * Memory.stats['cpu.avg1000.role2'] + 0.001 * Memory.stats['cpu.avg.role2'];
            Memory.stats['cpu.avg.role2'] = 0;

            Memory.stats['cpu.avg10.role3'] = 0.9 * Memory.stats['cpu.avg10.role3'] + 0.1 * Memory.stats['cpu.avg.role3'];
            Memory.stats['cpu.avg100.role3'] = 0.99 * Memory.stats['cpu.avg100.role3'] + 0.01 * Memory.stats['cpu.avg.role3'];
            Memory.stats['cpu.avg1000.role3'] = 0.999 * Memory.stats['cpu.avg1000.role3'] + 0.001 * Memory.stats['cpu.avg.role3'];
            Memory.stats['cpu.avg.role3'] = 0;

            Memory.stats['cpu.avg10.role4'] = 0.9 * Memory.stats['cpu.avg10.role4'] + 0.1 * Memory.stats['cpu.avg.role4'];
            Memory.stats['cpu.avg100.role4'] = 0.99 * Memory.stats['cpu.avg100.role4'] + 0.01 * Memory.stats['cpu.avg.role4'];
            Memory.stats['cpu.avg1000.role4'] = 0.999 * Memory.stats['cpu.avg1000.role4'] + 0.001 * Memory.stats['cpu.avg.role4'];
            Memory.stats['cpu.avg.role4'] = 0;

            Memory.stats['cpu.avg10.role5'] = 0.9 * Memory.stats['cpu.avg10.role5'] + 0.1 * Memory.stats['cpu.avg.role5'];
            Memory.stats['cpu.avg100.role5'] = 0.99 * Memory.stats['cpu.avg100.role5'] + 0.01 * Memory.stats['cpu.avg.role5'];
            Memory.stats['cpu.avg1000.role5'] = 0.999 * Memory.stats['cpu.avg1000.role5'] + 0.001 * Memory.stats['cpu.avg.role5'];
            Memory.stats['cpu.avg.role5'] = 0;

            Memory.stats['cpu.avg10.role6'] = 0.9 * Memory.stats['cpu.avg10.role6'] + 0.1 * Memory.stats['cpu.avg.role6'];
            Memory.stats['cpu.avg100.role6'] = 0.99 * Memory.stats['cpu.avg100.role6'] + 0.01 * Memory.stats['cpu.avg.role6'];
            Memory.stats['cpu.avg1000.role6'] = 0.999 * Memory.stats['cpu.avg1000.role6'] + 0.001 * Memory.stats['cpu.avg.role6'];
            Memory.stats['cpu.avg.role6'] = 0;

            Memory.stats['cpu.avg10.role7'] = 0.9 * Memory.stats['cpu.avg10.role7'] + 0.1 * Memory.stats['cpu.avg.role7'];
            Memory.stats['cpu.avg100.role7'] = 0.99 * Memory.stats['cpu.avg100.role7'] + 0.01 * Memory.stats['cpu.avg.role7'];
            Memory.stats['cpu.avg1000.role7'] = 0.999 * Memory.stats['cpu.avg1000.role7'] + 0.001 * Memory.stats['cpu.avg.role7'];
            Memory.stats['cpu.avg.role7'] = 0;

            Memory.stats['cpu.avg10.role8'] = 0.9 * Memory.stats['cpu.avg10.role8'] + 0.1 * Memory.stats['cpu.avg.role8'];
            Memory.stats['cpu.avg100.role8'] = 0.99 * Memory.stats['cpu.avg100.role8'] + 0.01 * Memory.stats['cpu.avg.role8'];
            Memory.stats['cpu.avg1000.role8'] = 0.999 * Memory.stats['cpu.avg1000.role8'] + 0.001 * Memory.stats['cpu.avg.role8'];
            Memory.stats['cpu.avg.role8'] = 0;

            Memory.stats['cpu.avg10.role9'] = 0.9 * Memory.stats['cpu.avg10.role9'] + 0.1 * Memory.stats['cpu.avg.role9'];
            Memory.stats['cpu.avg100.role9'] = 0.99 * Memory.stats['cpu.avg100.role9'] + 0.01 * Memory.stats['cpu.avg.role9'];
            Memory.stats['cpu.avg1000.role9'] = 0.999 * Memory.stats['cpu.avg1000.role9'] + 0.001 * Memory.stats['cpu.avg.role9'];
            Memory.stats['cpu.avg.role9'] = 0;

            Memory.stats['cpu.avg10.role10'] = 0.9 * Memory.stats['cpu.avg10.role10'] + 0.1 * Memory.stats['cpu.avg.role10'];
            Memory.stats['cpu.avg100.role10'] = 0.99 * Memory.stats['cpu.avg100.role10'] + 0.01 * Memory.stats['cpu.avg.role10'];
            Memory.stats['cpu.avg1000.role10'] = 0.999 * Memory.stats['cpu.avg1000.role10'] + 0.001 * Memory.stats['cpu.avg.role10'];
            Memory.stats['cpu.avg.role10'] = 0;

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
              let controller = room.controller;

              if (controller && controller.my) {
                let flag = Memory.flags[roomName];
                let room = Game.rooms[roomName];
                let roomName = room.name;

                if (Game.flags[roomName] == undefined) {
                  room.createFlag(25,25, roomName)
                }
                if (!Memory.flags[roomName]) {
                    Memory.flags[roomName] = {}
                }

                if (Game.flags[roomName] !== undefined) {

                  let harvester;
                  let transferer;

                  let harvesterSo;

                  let transfererSo;
                  let transferer;
                  let transfererLiTe;

                  let attackerMelee;

                  let upgraderSo;
                  let upgrader;

                  let builder;

                  let repairer;

                  if (Game.time % 1000 == 0) {
                    flag.transfererMode == "";
                    flag.harvesterMode == "";
                    flag.upgraderMode == "";
                    flag.builderMode == "";
                    flag.repairerMode == "";
                  }

                  if (Game.time % 10 == 0) {
                    flag.totalEnergyAvailable = room.energyAvailable;
                    flag.totalEnergyCapacity = room.energyCapacityAvailable;
                  }


                  if (flag.transfererSpawn == undefined) {
                    flag.transfererSpawn = room.terminal.pos.findClosestByRange(room.spawns, {
                      filter: (structure) => {
                        return (structure.pos.inRangeTo(room.terminal, 5));
                      }
                    });

                    flag.sources = room.find(FIND_SOURCES).id;
                    flag.mineral = room.find(FIND_MINERALS);
                  }

                  if (Game.time % 1000 == 0) {
                      flag.constructions = room.find(FIND_CONSTRUCTION_SITES);
                  }
                  if (Game.time % 25 == 0) {
                      flag.enemy = room.find(FIND_HOSTILE_CREEPS);
                  }

                  // FLAG MEMORY USAGE //
                  let enemy = flag.enemy;
                  let construction = flag.constructions;
                  let sources = flag.sources;
                  let minerals = flag.mineral[0].mineralAmount;
                  let mineralType = flag.mineral[0].mineralType;
                  let extension = room.extensions.length;
                  let totalEnergyAvailable = flag.totalEnergyAvailable;
                  let totalEnergyCapacity = flag.totalEnergyAvailable;


                  let normalDirections = [TOP_LEFT,LEFT,BOTTOM_LEFT,BOTTOM,BOTTOM_RIGHT];
                  let transfererDirections = [TOP_RIGHT];


                  let transfererSpawn = flag.transfererSpawn;
                  function getFirstOpenSpawn() {
                    let freeSpawns = room.find(room.spawns, {
                      filter: (structure) => {
                        return (structure.spawning == null);
                      }
                    });

                    if (freeSpawns.length > 0) {
                      return freeSpawns[0];
                    }
                    return null;
                  }




                  if (room.terminal !== undefined && Game.time % 250 == 0) {
                    if (needsResource(RESOURCE_HYDROGEN, 5000, roomName) && mineralType !== RESOURCE_HYDROGEN) {
                      Game.rooms['E43N3'].terminal.send(RESOURCE_HYDROGEN, 1000, roomName)
                    }
                    if (needsResource(RESOURCE_OXYGEN, 5000, roomName) && mineralType !== RESOURCE_OXYGEN) {
                      Game.rooms['E42N2'].terminal.send(RESOURCE_OXYGEN, 1000, roomName)
                    }
                    if (needsResource(RESOURCE_UTRIUM, 5000, roomName) && mineralType !== RESOURCE_UTRIUM) {
                      Game.rooms['E42N3'].terminal.send(RESOURCE_UTRIUM, 1000, roomName)
                    }
                    //if (needsResource(RESOURCE_KEANIUM, 5000, roomName) && mineralType !== RESOURCE_KEANIUM) {
                    //  Game.rooms['E43N3'].terminal.send(RESOURCE_KEANIUM, 1000, roomName)
                    //}
                    if (needsResource(RESOURCE_LEMERGIUM, 5000, roomName) && mineralType !== RESOURCE_LEMERGIUM) {
                      Game.rooms['E43N3'].terminal.send(RESOURCE_LEMERGIUM, 1000, roomName)
                    }
                    if (needsResource(RESOURCE_ZYNTHIUM, 5000, roomName) && mineralType !== RESOURCE_ZYNTHIUM) {
                      Game.rooms['E43N1'].terminal.send(RESOURCE_ZYNTHIUM, 1000, roomName)
                    }
                    //if (needsResource(RESOURCE_CATALYST, 5000, roomName) && mineralType !== RESOURCE_CATALYST) {
                    //  Game.rooms['E43N3'].terminal.send(RESOURCE_CATALYST, 1000, roomName)
                    //}
                  }

                  if (room.terminal !== undefined && room.storage !== undefined) {
                    let mineralType = Memory.rooms[roomName + '.mineral'][0].mineralType;
                    let currentAmount = flag.remainingAmount;
                    let addAmount = 25 * 1000;
                    let orderId = flag.order.id;
                    let newPrice = marketPrice(mineralType, flag.price);

                    if (flag.orders == undefined) {
                      flag.orders = Game.market.orders;
                    }

                    if (flag.order == undefined && _.size(flag.orders) > 0) {
                      for (let i = 0; i< Object.keys(flag.orders).length;i++) {
                        if (Object.keys(flag.orders)[i] == flag.orderId) {
                          let flagOrder = flag.orderId
                          flag.order = flag.orders[flagOrder]
                        }
                      }
                    }


                    if (Game.time % 250 == 0) {
                      if (_.size(flag.order) == 0) {
                        Game.market.createOrder({
                          type: ORDER_SELL,
                          resourceType: mineralType,
                          price: 2,
                          totalAmount: 1,
                          roomName: roomName
                        });
                        flag.remainingAmount = 1;
                        flag.order = Game.market.getAllOrders({type: ORDER_SELL, resourceType: mineralType, roomName: roomName})[0];
                        console.log("Created new order for: " + mineralType + " in room: " + roomName)
                      }
                    }
                    if (Game.time % 500 == 0) {
                      let testVariable = Game.market.getAllOrders({type: ORDER_SELL, resourceType: mineralType, roomName: roomName})[0];
                        if (testVariable !== undefined) {
                          flag.remainingAmount = Game.market.getAllOrders({type: ORDER_SELL, resourceType: mineralType, roomName: roomName})[0].remainingAmount;

                          if (flag.order.price !== newPrice) {
                            Game.market.changeOrderPrice(orderId, newPrice)
                            console.log("Changed the price of the resource: " + mineralType + " from: " + flag.price + " to: " + newPrice)
                          }

                          if (haveResource(mineralType, 250000, roomName) == true && currentAmount < 50000) {
                            Game.market.extendOrder(orderId, addAmount)
                            console.log(mineralType + " - " + room + " - " + addAmount);
                            flag.remainingAmount = Game.market.getAllOrders({type: ORDER_SELL, resourceType: mineralType, roomName: roomName})[0].remainingAmount;
                          }
                        }
                      }
                    }


                  let towers = room.towers;
                  let mineralType = flag.mineral[0].mineralType;


                  if (_.size(Memory.rooms[roomName + '.enemy']) == 0) {
                    for (let tower of towers) {
                      let targetRepair = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (s) => s.hits < s.hitsMax && s.hits < 7 * 1000 *1000 // 7 Million
                      });

                      if (targetRepair !== undefined) {
                        tower.repair(targetRepair);
                      }
                    }
                  }
                  if (_.size(Memory.rooms[roomName + '.enemy']) > 0) {
                    for (let tower of towers) {
                      tower.defend();
                    }
                  }



                  function harvesterSpawnCreep(spawn,parts,role,roomName,source) {
                    let name = role + "-" + Math.round(Math.random() * 100)
                    spawn.spawnCreep(
                        parts,
                    name,
                    {
                        memory: {
                            role: role,
                            working: false,
                            sourceId: source,
                            room: roomName,

                        }
                    });
                  }
                  function normalCreepsSpawnCreep(spawn,parts,role,roomName) {
                    let name = role + "-" + Math.round(Math.random() * 100)
                    spawn.spawnCreep(
                        parts,
                    name,
                    {
                        memory: {
                            working: false,
                            role: role,
                            room: roomName,

                        }
                    });
                  }



                  // SPANWING PART!!!
                  let spawn = getFirstOpenSpawn()
                  let source1 = sources[0];
                  let source2 = sources[1];
                  if (spawn) {
                      // Small or Big creep, if low energy small creep


                      harvesterSo = [MOVE,
                                    WORK,
                                    CARRY]; "200 Energy"


                      // Min controller is 1
                      if (totalEnergyAvailable > 200 && totalEnergyAvailable < 300) {
                        if (needsCreeps("harvesterSo1", roomName, 3)) {
                          harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                        }
                        else if (needsCreeps("harvesterSo2", roomName, 3) && sources[1] !== undefined) {
                          harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                        }
                      }


                      harvesterSo = [MOVE,
                                    WORK,WORK,
                                    CARRY]; "300 Energy"
                      transfererSo = [MOVE,MOVE,MOVE,
                                    CARRY,CARRY,CARRY]; "300 Energy"
                      builder = [MOVE,MOVE,
                                WORK,
                                CARRY,CARRY]; "300 Energy"
                      builder = [MOVE,MOVE,
                                WORK,
                                CARRY,CARRY]; "300 Energy"
                      repairer = [MOVE,MOVE,
                                WORK,
                                CARRY,CARRY]; "300 Energy"
                      upgrader = [MOVE,MOVE,
                                WORK,
                                CARRY,CARRY]; "300 Energy"


                      // Min controller is 1
                      if (totalEnergyAvailable == 300) {
                        if (needsCreeps("transfererSo1", roomName, 4) && needsCreeps("transferer1",roomName,1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                          normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                        }
                        else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1)) {
                          harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                        }
                        else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                          harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                        }
                        else if (needsCreeps("repairer1", roomName, 2) && towers !== undefined) {
                          normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                        }
                        else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                          normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                        }
                        else if (needsCreeps("upgrader1", roomName, 3)) {
                          normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                        }
                      }
                    }


                    harvester = [MOVE,
                                  WORK,WORK,
                                  CARRY]; "300 Energy"
                    transferer = [MOVE,MOVE,MOVE,
                                  CARRY,CARRY,CARRY]; "300 Energy"
                    upgrader = [MOVE,
                              WORK,WORK,
                              CARRY]; "300 Energy"
                    builder = [MOVE,MOVE,
                              WORK,
                              CARRY,CARRY]; "300 Energy"
                    repairer = [MOVE,MOVE,
                              WORK,
                              CARRY,CARRY]; "300 Energy"



                    // Min controller is 2
                    if (totalEnergyCapacity > 300 && totalEnergyCapacity < 400) {
                      if (needsCreeps("transfererSo1", roomName, 4) && needsCreeps("transferer1",roomName,1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                      }
                      else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1)) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                      }
                      else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                      }
                      else if (needsCreeps("transferer1", roomName, 3) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                      }
                      else if (needsCreeps("harvester1", roomName, 3)) {
                        harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                      }
                      else if (needsCreeps("harvester2", roomName, 3) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                      }
                      else if (needsCreeps("repairer1", roomName, 2) && towers !== undefined) {
                        normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                      }
                      else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                        normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                      }
                      else if (needsCreeps("upgrader1", roomName, 3)) {
                        normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                      }
                    }


                    harvester = [MOVE,
                                  WORK,WORK,WORK,
                                  CARRY]; "400 Energy"
                    transferer = [MOVE,MOVE,MOVE,MOVE,
                                  CARRY,CARRY,CARRY,CARRY]; "400 Energy"
                    upgrader = [MOVE,
                              WORK,WORK,WORK,
                              CARRY]; "400 Energy"
                    builder = [MOVE,MOVE,MOVE,
                              WORK,
                              CARRY,CARRY]; "400 Energy"
                    repairer = [MOVE,MOVE,
                              WORK,WORK,
                              CARRY,CARRY]; "400 Energy"


                    // Min controller is 2
                    if (totalEnergyCapacity >= 400 && totalEnergyCapacity < 500) {
                      if (needsCreeps("transfererSo1", roomName, 4) && needsCreeps("transferer1",roomName,1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                      }
                      else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1)) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                      }
                      else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                      }
                      else if (needsCreeps("transferer1", roomName, 3) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                      }
                      else if (needsCreeps("harvester1", roomName, 2)) {
                        harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                      }
                      else if (needsCreeps("harvester2", roomName, 2) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                      }
                      else if (needsCreeps("repairer1", roomName, 2) && towers !== undefined) {
                        normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                      }
                      else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                        normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                      }
                      else if (needsCreeps("upgrader1", roomName, 2)) {
                        normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                      }
                    }


                    harvester = [MOVE,
                                  WORK,WORK,WORK,WORK,
                                  CARRY]; "500 Energy"
                    transferer = [MOVE,MOVE,MOVE,MOVE,MOVE,
                                  CARRY,CARRY,CARRY,CARRY,CARRY]; "500 Energy"
                    upgrader = [MOVE,
                              WORK,WORK,WORK,WORK,
                              CARRY]; "500 Energy"
                    builder = [MOVE,MOVE,MOVE,MOVE,
                              WORK,
                              CARRY,CARRY,CARRY]; "500 Energy"
                    repairer = [MOVE,MOVE,MOVE,
                              WORK,WORK,
                              CARRY,CARRY,CARRY]; "500 Energy"


                    // Min controller is 2
                    if (totalEnergyCapacity >= 500 && totalEnergyCapacity < 600) {
                      if (needsCreeps("transfererSo1", roomName, 4) && needsCreeps("transferer1",roomName,1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                      }
                      else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1)) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                      }
                      else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                      }
                      else if (needsCreeps("transferer1", roomName, 3) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                      }
                      else if (needsCreeps("harvester1", roomName, 2)) {
                        harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                      }
                      else if (needsCreeps("harvester2", roomName, 2) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                      }
                      else if (needsCreeps("repairer1", roomName, 2) && towers !== undefined) {
                        normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                      }
                      else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                        normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                      }
                      else if (needsCreeps("upgrader1", roomName, 2)) {
                        normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                      }
                    }


                    harvester = [MOVE,
                                  WORK,WORK,WORK,WORK,WORK,
                                  CARRY]; "600 Energy"
                    transferer = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                  CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; "600 Energy"
                    upgrader = [MOVE,
                              WORK,WORK,WORK,WORK,WORK,
                              CARRY]; "600 Energy"
                    builder = [MOVE,MOVE,MOVE,MOVE,MOVE,
                              WORK,WORK,
                              CARRY,CARRY,CARRY]; "600 Energy"
                    repairer = [MOVE,MOVE,MOVE,MOVE,MOVE,
                              WORK,WORK,
                              CARRY,CARRY,CARRY]; "600 Energy"


                    // Min controller is 2
                    if (totalEnergyCapacity >= 600 && totalEnergyCapacity < 700) {
                      if (needsCreeps("transfererSo1", roomName, 4) && needsCreeps("transferer1",roomName,1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                      }
                      else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1)) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                      }
                      else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                      }
                      else if (needsCreeps("transferer1", roomName, 3) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                      }
                      else if (needsCreeps("harvester1", roomName, 1)) {
                        harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                      }
                      else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                      }
                      else if (needsCreeps("repairer1", roomName, 2) && towers !== undefined) {
                        normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                      }
                      else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                        normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                      }
                      else if (needsCreeps("upgrader1", roomName, 2)) {
                        normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                      }
                    }


                    harvester = [MOVE,
                                  WORK,WORK,WORK,WORK,
                                  CARRY]; "500 Energy"
                    transferer = [MOVE,MOVE,MOVE,MOVE,MOVE,
                                  CARRY,CARRY,CARRY,CARRY,CARRY]; "500 Energy"
                    upgrader = [MOVE,
                              WORK,WORK,WORK,WORK,
                              CARRY]; "500 Energy"
                    builder = [MOVE,MOVE,MOVE,MOVE,
                              WORK,
                              CARRY,CARRY,CARRY]; "450 Energy"
                    repairer = [MOVE,MOVE,MOVE,
                              WORK,WORK,
                              CARRY,CARRY,CARRY]; "500 Energy"


                    // Min controller is 2
                    if (totalEnergyCapacity >= 500 && totalEnergyCapacity < 600) {
                      if (needsCreeps("transfererSo1", roomName, 4) && needsCreeps("transferer1",roomName,1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                      }
                      else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1)) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                      }
                      else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                      }
                      else if (needsCreeps("transferer1", roomName, 3) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                      }
                      else if (needsCreeps("harvester1", roomName, 2)) {
                        harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                      }
                      else if (needsCreeps("harvester2", roomName, 2) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                      }
                      else if (needsCreeps("repairer1", roomName, 2) && towers !== undefined) {
                        normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                      }
                      else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                        normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                      }
                      else if (needsCreeps("upgrader1", roomName, 2)) {
                        normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                      }
                    }


                    harvester = [MOVE,
                                  WORK,WORK,WORK,WORK,WORK,
                                  CARRY]; "500 Energy"
                    transferer = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                                  CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; "500 Energy"
                    upgrader = [MOVE,
                              WORK,WORK,WORK,WORK,WORK,
                              CARRY]; "500 Energy"
                    builder = [MOVE,MOVE,MOVE,MOVE,MOVE,
                              WORK,WORK,
                              CARRY,CARRY,CARRY]; "500 Energy"
                    repairer = [MOVE,MOVE,MOVE,MOVE,MOVE,
                              WORK,WORK,
                              CARRY,CARRY,CARRY]; "500 Energy"


                    // Min controller is 2
                    if (totalEnergyCapacity >= 600 && totalEnergyCapacity < 700) {
                      if (needsCreeps("transfererSo1", roomName, 4) && needsCreeps("transferer1",roomName,1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                      }
                      else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1)) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                      }
                      else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                      }
                      else if (needsCreeps("transferer1", roomName, 3) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                      }
                      else if (needsCreeps("harvester1", roomName, 2)) {
                        harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                      }
                      else if (needsCreeps("harvester2", roomName, 2) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                      }
                      else if (needsCreeps("repairer1", roomName, 2) && towers !== undefined) {
                        normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                      }
                      else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                        normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                      }
                      else if (needsCreeps("upgrader1", roomName, 2)) {
                        normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                      }
                    }


                    harvester = [MOVE,
                                  WORK,WORK,WORK,WORK,WORK "6:",WORK,
                                  CARRY]; "700 Energy"
                    transferer = [MOVE,MOVE,MOVE,MOVE,MOVE"6:",MOVE,MOVE,
                                  CARRY,CARRY,CARRY,CARRY,CARRY"6:",CARRY,CARRY]; "700 Energy"
                    upgrader = [MOVE,
                              WORK,WORK,WORK,WORK,WORK"6:",WORK,
                              CARRY]; "700 Energy"
                    builder = [MOVE,MOVE,MOVE,MOVE,MOVE"6:",MOVE,
                              WORK,WORK,
                              CARRY,CARRY,CARRY,CARRY]; "700 Energy"


                    // Min controller is 2
                    if (totalEnergyCapacity >= 700 && totalEnergyCapacity < 800) {
                      if (needsCreeps("transfererSo1", roomName, 4) && needsCreeps("transferer1",roomName,1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                      }
                      else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1)) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                      }
                      else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                      }
                      else if (needsCreeps("transferer1", roomName, 3) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                      }
                      else if (needsCreeps("harvester1", roomName, 1)) {
                        harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                      }
                      else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                      }
                      else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                        normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                      }
                      else if (needsCreeps("upgrader1", roomName, 2)) {
                        normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                      }
                    }


                    harvester = [MOVE,
                                  WORK,WORK,WORK,WORK,WORK "6:",WORK,WORK,
                                  CARRY]; "800 Energy"
                    transferer = [MOVE,MOVE,MOVE,MOVE,MOVE"6:",MOVE,MOVE,MOVE,
                                  CARRY,CARRY,CARRY,CARRY,CARRY"6:",CARRY,CARRY,CARRY]; "800 Energy"
                    upgrader = [MOVE,
                              WORK,WORK,WORK,WORK,WORK"6:",WORK,WORK,
                              CARRY]; "800 Energy"
                    builder = [MOVE,MOVE,MOVE,MOVE,MOVE"6:",MOVE,MOVE,
                              WORK,WORK,
                              CARRY,CARRY,CARRY,CARRY,CARRY"6:"]; "800 Energy"


                    // Min controller is 3
                    if (totalEnergyCapacity >= 800 && totalEnergyCapacity < 900) {
                      if (needsCreeps("transfererSo1", roomName, 4) && needsCreeps("transferer1",roomName,1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                      }
                      else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1)) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                      }
                      else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                      }
                      else if (needsCreeps("transferer1", roomName, 3) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                      }
                      else if (needsCreeps("harvester1", roomName, 1)) {
                        harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                      }
                      else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                      }
                      else if (needsCreeps("repairer1", roomName, 2) && towers !== undefined) {
                        normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                      }
                      else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                        normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                      }
                      else if (needsCreeps("upgrader1", roomName, 2)) {
                        normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                      }
                    }


                    harvester = [MOVE,
                                  WORK,WORK,WORK,WORK,WORK "6:",WORK,WORK,WORK,
                                  CARRY]; "900 Energy"
                    transferer = [MOVE,MOVE,MOVE,MOVE,MOVE"6:",MOVE,MOVE,MOVE,MOVE,
                                  CARRY,CARRY,CARRY,CARRY,CARRY"6:",CARRY,CARRY,CARRY,CARRY]; "900 Energy"
                    upgrader = [MOVE,
                              WORK,WORK,WORK,WORK,WORK"6:",WORK,WORK,WORK,
                              CARRY]; "900 Energy"
                    builder = [MOVE,MOVE,MOVE,MOVE,MOVE"6:",MOVE,MOVE,MOVE,
                              WORK,WORK,
                              CARRY,CARRY,CARRY,CARRY,CARRY"6:",CARRY]; "900 Energy"


                    // Min controller is 3
                    if (totalEnergyCapacity >= 900 && totalEnergyCapacity < 1000) {
                      if (needsCreeps("transfererSo1", roomName, 4) && needsCreeps("transferer1",roomName,1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                      }
                      else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1)) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                      }
                      else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                      }
                      else if (needsCreeps("transferer1", roomName, 2) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                      }
                      else if (needsCreeps("harvester1", roomName, 1)) {
                        harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                      }
                      else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                      }
                      else if (needsCreeps("repairer1", roomName, 2) && towers !== undefined) {
                        normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                      }
                      else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                        normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                      }
                      else if (needsCreeps("upgrader1", roomName, 2)) {
                        normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                      }
                    }


                    harvester = [MOVE,
                                  WORK,WORK,WORK,WORK,WORK "6:",WORK,WORK,WORK,WORK,
                                  CARRY]; "1000 Energy"
                    transferer = [MOVE,MOVE,MOVE,MOVE,MOVE"6:",MOVE,MOVE,MOVE,MOVE,MOVE"11:",
                                  CARRY,CARRY,CARRY,CARRY,CARRY"6:",CARRY,CARRY,CARRY,CARRY,CARRY"11:"]; "1000 Energy"
                    upgrader = [MOVE,
                              WORK,WORK,WORK,WORK,WORK"6:",WORK,WORK,WORK,WORK,
                              CARRY]; "1000 Energy"
                    builder = [MOVE,MOVE,MOVE,MOVE,MOVE"6:",MOVE,MOVE,MOVE,MOVE,
                              WORK,WORK,
                              CARRY,CARRY,CARRY,CARRY,CARRY"6:",CARRY,CARRY]; "1000 Energy"


                    // Min controller is 3
                    if (totalEnergyCapacity >= 1000 && totalEnergyCapacity < 1250) {
                      if (needsCreeps("transfererSo1", roomName, 4) && needsCreeps("transferer1",roomName,1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                      }
                      else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1)) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                      }
                      else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                      }
                      else if (needsCreeps("transferer1", roomName, 2) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                      }
                      else if (needsCreeps("harvester1", roomName, 1)) {
                        harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                      }
                      else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                      }
                      else if (needsCreeps("repairer1", roomName, 2) && towers !== undefined) {
                        normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                      }
                      else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                        normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                      }
                      else if (needsCreeps("upgrader1", roomName, 1)) {
                        normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                      }
                    }


                    harvester = [MOVE,MOVE,
                                  WORK,WORK,WORK,WORK,WORK "6:",WORK,WORK,WORK,WORK,WORK,
                                  CARRY,CARRY]; "1200 Energy"
                    transferer = [MOVE,MOVE,MOVE,MOVE,MOVE"6:",MOVE,MOVE,MOVE,MOVE,MOVE"11:",MOVE,MOVE,
                                  CARRY,CARRY,CARRY,CARRY,CARRY"6:",CARRY,CARRY,CARRY,CARRY,CARRY"11:",CARRY,CARRY]; "1200 Energy"
                    upgrader = [MOVE,
                              WORK,WORK,WORK,WORK,WORK"6:",WORK,WORK,WORK,WORK,WORK"11:",WORK,
                              CARRY]; "1200 Energy"
                    builder = [MOVE,MOVE,MOVE,MOVE,MOVE"6:",MOVE,MOVE,MOVE,MOVE,MOVE"11:",MOVE,
                              WORK,WORK,WORK,
                              CARRY,CARRY,CARRY,CARRY,CARRY"6:",CARRY,CARRY,CARRY]; "1250 Energy"


                    // Min controller is 3
                    if (totalEnergyCapacity >= 1250 && totalEnergyCapacity < 1500) {
                      if (needsCreeps("transfererSo1", roomName, 4) && needsCreeps("transferer1",roomName,1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                      }
                      else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1)) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                      }
                      else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                      }
                      else if (needsCreeps("transferer1", roomName, 2) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                      }
                      else if (needsCreeps("harvester1", roomName, 1)) {
                        harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                      }
                      else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                      }
                      else if (needsCreeps("repairer1", roomName, 2) && towers !== undefined) {
                        normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                      }
                      else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                        normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                      }
                      else if (needsCreeps("upgrader1", roomName, 1)) {
                        normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                      }
                    }


                    transferer = [MOVE,MOVE,MOVE,MOVE,MOVE"6:",MOVE,MOVE,MOVE,MOVE,MOVE"11:",MOVE,MOVE,MOVE,MOVE,MOVE"16:",
                                  CARRY,CARRY,CARRY,CARRY,CARRY"6:",CARRY,CARRY,CARRY,CARRY,CARRY"11:",CARRY,CARRY,CARRY,CARRY,CARRY"16:"]; "1500 Energy"
                    upgrader = [MOVE,
                              WORK,WORK,WORK,WORK,WORK"6:",WORK,WORK,WORK,WORK,WORK"11:",WORK,WORK,WORK,WORK,
                              CARRY]; "1500 Energy"
                    builder = [MOVE,MOVE,MOVE,MOVE,MOVE"6:",MOVE,MOVE,MOVE,MOVE,MOVE"11:",MOVE,MOVE,MOVE,
                              WORK,WORK,WORK,WORK,
                              CARRY,CARRY,CARRY,CARRY,CARRY"6:",CARRY,CARRY,CARRY,CARRY]; "1500 Energy"


                    // Min controller is 4
                    if (totalEnergyCapacity >= 1500 && totalEnergyCapacity < 1750) {
                      if (needsCreeps("transfererSo1", roomName, 4) && needsCreeps("transferer1",roomName,1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                      }
                      else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1)) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                      }
                      else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                      }
                      else if (needsCreeps("transferer1", roomName, 1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                      }
                      else if (needsCreeps("harvester1", roomName, 1)) {
                        harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                      }
                      else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                      }
                      else if (needsCreeps("repairer1", roomName, 2) && towers !== undefined) {
                        normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                      }
                      else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                        normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                      }
                      else if (needsCreeps("upgrader1", roomName, 1)) {
                        normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                      }
                    }


                    upgrader = [MOVE,
                              WORK,WORK,WORK,WORK,WORK"6:",WORK,WORK,WORK,WORK,WORK"11:",WORK,WORK,WORK,WORK,WORK,
                              CARRY]; "1600 Energy"
                    builder = [MOVE,MOVE,MOVE,MOVE,MOVE"6:",MOVE,MOVE,MOVE,MOVE,MOVE"11:",MOVE,MOVE,MOVE,MOVE,MOVE"16:",
                              WORK,WORK,WORK,WORK,WORK"6:",
                              CARRY,CARRY,CARRY,CARRY,CARRY"6:",CARRY,CARRY,CARRY,CARRY,CARRY"11:"]; "1750 Energy"


                    // Min controller is 4
                    if (totalEnergyCapacity >= 1750 && totalEnergyCapacity < 2000) {
                      if (needsCreeps("transfererSo1", roomName, 4) && needsCreeps("transferer1",roomName,1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                      }
                      else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1)) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                      }
                      else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                      }
                      else if (needsCreeps("transferer1", roomName, 1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                      }
                      else if (needsCreeps("harvester1", roomName, 1)) {
                        harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                      }
                      else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                      }
                      else if (needsCreeps("repairer1", roomName, 2) && towers !== undefined) {
                        normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                      }
                      else if (needsCreeps("builder1", roomName, 1) && _.size(construction) > 0) {
                        normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                      }
                      else if (needsCreeps("upgrader1", roomName, 1)) {
                        normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                      }
                    }


                    builder = [MOVE,MOVE,MOVE,MOVE,MOVE"6:",MOVE,MOVE,MOVE,MOVE,MOVE"11:",MOVE,MOVE,MOVE,MOVE,MOVE"16:",MOVE,MOVE,MOVE,
                              WORK,WORK,WORK,WORK,
                              CARRY,CARRY,CARRY,CARRY,CARRY"6:",CARRY,CARRY,CARRY,CARRY,CARRY"11:",CARRY,CARRY,CARRY,CARRY]; "2000 Energy"


                    // Min controller is 5
                    if (totalEnergyCapacity >= 2000 && totalEnergyCapacity < 2500) {
                      if (needsCreeps("transfererSo1", roomName, 4) && needsCreeps("transferer1",roomName,1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                      }
                      else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1)) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                      }
                      else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                      }
                      else if (needsCreeps("transferer1", roomName, 1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                      }
                      else if (needsCreeps("harvester1", roomName, 1)) {
                        harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                      }
                      else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                      }
                      else if (needsCreeps("repairer1", roomName, 2) && towers !== undefined) {
                        normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                      }
                      else if (needsCreeps("builder1", roomName, 1) && _.size(construction) > 0) {
                        normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                      }
                      else if (needsCreeps("upgrader1", roomName, 1)) {
                        normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                      }
                    }


                    builder = [MOVE,MOVE,MOVE,MOVE,MOVE"6:",MOVE,MOVE,MOVE,MOVE,MOVE"11:",MOVE,MOVE,MOVE,MOVE,MOVE"16:",MOVE,MOVE,MOVE,MOVE,MOVE"21:",MOVE,MOVE,
                              WORK,WORK,WORK,WORK,WORK"6:",WORK,
                              CARRY,CARRY,CARRY,CARRY,CARRY"6:",CARRY,CARRY,CARRY,CARRY,CARRY"11:",CARRY,CARRY,CARRY,CARRY,CARRY"16:",CARRY]; "2500 Energy"


                    // Min controller is 6
                    if (totalEnergyCapacity >= 2500 && totalEnergyCapacity < 5600) {
                      if (needsCreeps("transfererSo1", roomName, 4) && needsCreeps("transferer1",roomName,1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                      }
                      else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1)) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                      }
                      else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                      }
                      else if (needsCreeps("transferer1", roomName, 1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                      }
                      else if (needsCreeps("harvester1", roomName, 1)) {
                        harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                      }
                      else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                      }
                      else if (needsCreeps("repairer1", roomName, 2) && towers !== undefined) {
                        normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                      }
                      else if (needsCreeps("builder1", roomName, 1) && _.size(construction) > 0) {
                        normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                      }
                      else if (needsCreeps("upgrader1", roomName, 1)) {
                        normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                      }
                    }


                    builder = [MOVE,MOVE,MOVE,MOVE,MOVE"6:",MOVE,MOVE,MOVE,MOVE,MOVE"11:",MOVE,MOVE,MOVE,MOVE,MOVE"16:",MOVE,MOVE,MOVE,MOVE,MOVE"21:",MOVE,MOVE,MOVE,MOVE,MOVE"26:",
                              WORK,WORK,WORK,WORK,WORK"6:",WORK,WORK,WORK,
                              CARRY,CARRY,CARRY,CARRY,CARRY"6:",CARRY,CARRY,CARRY,CARRY,CARRY"11:",CARRY,CARRY,CARRY,CARRY,CARRY"16:",CARRY,CARRY]; "2900 Energy"


                    // Min controller is 7
                    if (totalEnergyCapacity >= 5600 && totalEnergyCapacity < 12900) {
                      if (needsCreeps("transfererSo1", roomName, 4) && needsCreeps("transferer1",roomName,1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                      }
                      else if (needsCreeps("harvesterSo1", roomName, 3) && needsCreeps("harvester1",roomName,1)) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                      }
                      else if (needsCreeps("harvesterSo2", roomName, 3) && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                      }
                      else if (needsCreeps("transferer1", roomName, 1) && (room.containers.length > 0 || room.links.length > 0 || room.storage !== undefined || room.terminal !== undefined)) {
                        normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                      }
                      else if (needsCreeps("harvester1", roomName, 1)) {
                        harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                      }
                      else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                        harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                      }
                      else if (needsCreeps("repairer1", roomName, 2) && towers !== undefined) {
                        normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                      }
                      else if (needsCreeps("builder1", roomName, 1) && _.size(construction) > 0) {
                        normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                      }
                      else if (needsCreeps("upgrader1", roomName, 1)) {
                        normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                      }
                    }
                  }
                }
              }
            };


            let end = Game.cpu.getUsed() - start
            Memory.stats['cpu.avg.spawning'] = end;
            Memory.stats['cpu.avg10.spawning'] = 0.9 * Memory.stats['cpu.avg10.spawning'] + 0.1 * Memory.stats['cpu.avg.spawning'];
            Memory.stats['cpu.avg100.spawning'] = 0.99 * Memory.stats['cpu.avg100.spawning'] + 0.01 * Memory.stats['cpu.avg.spawning'];
            Memory.stats['cpu.avg1000.spawning'] = 0.999 * Memory.stats['cpu.avg1000.spawning'] + 0.001 * Memory.stats['cpu.avg.spawning'];



/*
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
*/

        let start2 = Game.cpu.getUsed(); // Grafana CPU Usage


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


            Memory.stats['rooms.' + roomName + '.creeps.total'] = _.sum(Game.creeps, (c) => c.memory.room === roomName);

            if (room.storage) {
              Memory.stats['rooms.' + roomName + '.storage.energy'] = room.storage.store.energy[RESOURCE_ENERGY];
              Memory.stats['rooms.' + roomName + '.st'] = room.storage.store[RESOURCE_ENERGY];
            }
            if (room.terminal) {
              Memory.stats['rooms.' + roomName + '.terminal.energy'] = room.terminal.store.energy[RESOURCE_ENERGY];
              Memory.stats['rooms.' + roomName + '.te'] = room.terminal.store[RESOURCE_ENERGY];
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

      // _.forEach(Object.keys(Game.rooms), function (roomName) {
      //   let room = Game.rooms[roomName];
      //   if (room.controller && room.controller.my) {
      //     let eventLog = room.getEventLog();
      //     let harvestEvents = _.filter(eventLog, {event: EVENT_HARVEST});
      //     if (harvestEvents.length > 0) {
      //       Memory.rooms['harvest.' + roomName] = harvestEvents;
      //     }
      //
      //     _.forEach(Object(Memory.rooms['harvest.' + roomName]), function (event) {
      //       let amount = event.data.amount;
      //       Memory.stats['rooms.' + roomName + '.events.EnergyHarvested'] += amount
      //     });
      //     if (Game.time % 25000 == 0) {
      //       let nul = 0
      //       Memory.stats['rooms.' + roomName + '.events.EnergyHarvested'] = nul;
      //     }
      //
      //
      //     let upgradeEvents = _.filter(eventLog, {event: EVENT_UPGRADE_CONTROLLER});
      //     if (upgradeEvents.length > 0) {
      //       Memory.rooms['upgrade.' + roomName] = upgradeEvents;
      //     }
      //
      //     _.forEach(Object(Memory.rooms['upgrade.' + roomName]), function (event) {
      //       let amount = event.data.energySpent;
      //       Memory.stats['rooms.' + roomName + '.events.UpgradeEnergy'] += amount
      //     });
      //     if (Game.time % 25000 == 0) {
      //       let nul = 0
      //       Memory.stats['rooms.' + roomName + '.events.UpgradeEnergy'] = nul;
      //     }
      //
      //
      //     let repairEvents = _.filter(eventLog, {event: EVENT_REPAIR});
      //     if (repairEvents.length > 0) {
      //       Memory.rooms['repair.' + roomName] = repairEvents;
      //     }
      //
      //     _.forEach(Object(Memory.rooms['repair.' + roomName]), function (event) {
      //       let amount = event.data.energySpent;
      //       Memory.stats['rooms.' + roomName + '.events.RepairEnergy'] += amount
      //     });
      //     if (Game.time % 25000 == 0) {
      //       let nul = 0
      //       Memory.stats['rooms.' + roomName + '.events.RepairEnergy'] = nul;
      //     }
      //
      //
      //     let buildEvents = _.filter(eventLog, {event: EVENT_BUILD});
      //     if (buildEvents.length > 0) {
      //       Memory.rooms['build.' + roomName] = buildEvents;
      //     }
      //
      //     _.forEach(Object(Memory.rooms['build.' + roomName]), function (event) {
      //       let amount = (event.data.energySpent);
      //       Memory.stats['rooms.' + roomName + '.events.BuildEnergy'] += amount
      //     });
      //     if (Game.time % 25000 == 0) {
      //       let nul = 0
      //       Memory.stats['rooms.' + roomName + '.events.BuildEnergy'] = nul;
      //     }
      //   }
      // });

      let end2 = Game.cpu.getUsed() - start2
      Memory.stats['cpu.avg.grafana'] = end2;

      Memory.stats['cpu.avg10.grafana'] = 0.9 * Memory.stats['cpu.avg10.grafana'] + 0.1 * Memory.stats['cpu.avg.grafana'];
      Memory.stats['cpu.avg100.grafana'] = 0.99 * Memory.stats['cpu.avg100.grafana'] + 0.01 * Memory.stats['cpu.avg.grafana'];
      Memory.stats['cpu.avg1000.grafana'] = 0.999 * Memory.stats['cpu.avg1000.grafana'] + 0.001 * Memory.stats['cpu.avg.grafana'];

    }
  });
};
