//Import roles
require('prototype.tower');
const traveler = require('traveler');

const roleHarvesterSource = require('role.harvesterSource');
const roleHarvesterContainer = require('role.harvesterContainer');
const roleHarvesterLink = require('role.harvesterLink');
const roleExtractor = require('role.extractor');


const roleUpgraderSource = require('role.upgraderSource');
const roleUpgraderContainer = require('role.upgraderContainer');
const roleUpgraderLink = require('role.upgraderLink');
const roleUpgraderTerminal = require('role.upgraderTerminal');

const roleTransferer = require('role.transferer');
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


const roleLongdistanceBuilderSource = require('role.longDistanceBuilderSource');
const roleLongdistanceBuilderContainer = require('role.longDistanceBuilderContainer');
const roleLongdistanceBuilderLink = require('role.longDistanceBuilderLink');
const roleLongdistanceBuilderTerminal = require('role.longDistanceBuilderTerminal');


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


    const linkFrom41 = Game.getObjectById("5d4effa090e3aa2b1e0e5888");
    const linkTo4 = Game.getObjectById("5d4f03abe360cc20d4c03077");
    linkFrom41.transferEnergy(linkTo4);


    //Find Terminals

    const terminalt1 = _.sum(Game.rooms['E43N3'].terminal.store);
    const terminalt2 = _.sum(Game.rooms['E43N2'].terminal.store);
    const terminalt3 = _.sum(Game.rooms['E42N2'].terminal.store);


    const storaget1 = _.sum(Game.rooms['E43N3'].storage.store);
    const storaget2 = _.sum(Game.rooms['E43N2'].storage.store);
    const storaget3 = _.sum(Game.rooms['E42N2'].storage.store);
        

    
    const terminal1 = Game.getObjectById("5d3953a5f63ff85df6c403a9");
    const terminal2 = Game.getObjectById("5d397e2c7b54a34625aa588e");
    const terminal3 = Game.getObjectById("5d395c207a1f04171f834dd0");

    let terminalTMi = Math.min(terminalt1, terminalt2, terminalt3);
    let terminalTMa = Math.max(terminalt1, terminalt2, terminalt3);
    let terminalSend = terminalTMa / 2;

    //Send Energy From Highest To Lowest Terminal
    if (terminalTMa !== undefined && (terminalTMi * 2 < terminalTMa)) {
        if (terminalSend !== undefined && terminalt1 === terminalTMa) {
            if (terminalt2 === terminalTMi) {
                if (terminalTMa - terminalSend > terminalt2) {
                    terminal1.send(RESOURCE_ENERGY, terminalSend, 'E43N2', 'Max to Min')
                }
            }
            if (terminalt3 === terminalTMi) {
                if (terminalTMa - terminalSend > terminalTMi) {
                    terminal1.send(RESOURCE_ENERGY, terminalSend, 'E42N@', 'Max to Min')
                }
            }
        }


        if (terminalSend !== undefined && terminalt2 === terminalTMa) {
            if (terminalt1 === terminalTMi) {
                if (terminalTMa - terminalSend > terminalTMi) {
                    terminal2.send(RESOURCE_ENERGY, terminalSend, 'E43N3', 'Max to Min')
                }
            }
            if (terminalt3 === terminalTMi) {
                if (terminalTMa - terminalSend > terminalTMi) {
                    terminal2.send(RESOURCE_ENERGY, terminalSend, 'E42N2', 'Max to Min')
                }
            }
        }


        if (terminalSend !== undefined && terminalt3 === terminalTMa) {
            if (terminalt1 === terminalTMi) {
                if (terminalTMa - terminalSend > terminalTMi) {
                    terminal3.send(RESOURCE_ENERGY, terminalSend, 'E43N3', 'Max to Min')
                }
            }
            if (terminalt2 === terminalTMi) {
                if (terminalTMa - terminalSend > terminalTMi) {
                    terminal3.send(RESOURCE_ENERGY, terminalSend, 'E43N2', 'Max to Min')
                }
            }
        }
    }
    let terminalTotal = (terminalt1 + terminalt2 + terminalt3);

    if (Game.time % 50 === 0) {
        console.log(terminalTotal + ' Total Energy, ' + terminalTMi + ' Min Energy, ' + terminalTMa + ' Max Energy');
    }
    if (terminalTotal > 850 * 1000) {
        Game.notify('Terminal Total Has More Then 850K Energy!'&& terminalTotal)
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

        if (creep.memory.role === 'claimer') {
            roleClaimer.run(creep);
        }

        if (creep.memory.role === 'reserverE42N1') {
            roleReserver.run(creep);
        }
        if (creep.memory.role === 'reserverE43N4') {
            roleReserver.run(creep);
        }
        if (creep.memory.role === 'reserverE44N3') {
            roleReserver.run(creep);
        }
        //LONG DISTANCE

        if (creep.memory.role === 'longDistanceHarvesterCoE42N1') {
            roleLongDistanceHarvesterContainer.run(creep);
        }
        if (creep.memory.role === 'longDistanceHarvesterCoE43N41') {
            roleLongDistanceHarvesterContainer.run(creep);
        }
        if (creep.memory.role === 'longDistanceHarvesterCoE43N42') {
            roleLongDistanceHarvesterContainer.run(creep);
        }
        if (creep.memory.role === 'longDistanceHarvesterCoE44N31') {
            roleLongDistanceHarvesterContainer.run(creep);
        }
        if (creep.memory.role === 'longDistanceHarvesterCoE44N32') {
            roleLongDistanceHarvesterContainer.run(creep);
        }


        if (creep.memory.role === 'longDistanceTransfererTeE42N1') {
            roleLongDistanceTransfererTerminal.run(creep);
        }
        if (creep.memory.role === 'longDistanceTransfererTeE43N4') {
            roleLongDistanceTransfererTerminal.run(creep);
        }
        if (creep.memory.role === 'longDistanceTransfererTeE44N3') {
            roleLongDistanceTransfererTerminal.run(creep);
        }

        if (creep.memory.role === 'longDistanceBuilderLiE42N3') {
            roleLongdistanceBuilderLink.run(creep);
        }
        if (creep.memory.role === 'longDistanceBuilderTeE42N1') {
            roleLongdistanceBuilderTerminal.run(creep);
        }
        if (creep.memory.role === 'longDistanceBuilderTeE43N4') {
            roleLongdistanceBuilderTerminal.run(creep);
        }
        if (creep.memory.role === 'longDistanceBuilderTeE44N3') {
            roleLongdistanceBuilderTerminal.run(creep);
        }

        //STARTERS
        if (creep.memory.role === 'harvesterSo1S') {
            roleHarvesterSource.run(creep);
        }
        if (creep.memory.role === 'harvesterSo2S') {
            roleHarvesterSource.run(creep);
        }

        if (creep.memory.role === 'harvesterCo1S') {
            roleHarvesterContainer.run(creep);
        }
        if (creep.memory.role === 'harvesterCo2S') {
            roleHarvesterContainer.run(creep);
        }

        if (creep.memory.role === 'harvesterLi1S') {
            roleHarvesterLink.run(creep);
        }
        if (creep.memory.role === 'harvesterLi2S') {
            roleHarvesterLink.run(creep);
        }


        if (creep.memory.role === 'transfererCoS') {
            roleTransfererContainer.run(creep);
        }
        if (creep.memory.role === 'transfererLiS') {
            roleTransfererLink.run(creep);
        }
        if (creep.memory.role === 'transfererTeS') {
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


        if (creep.memory.role === 'transferer') {
            roleTransferer.run(creep);
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
        if (creep.memory.role === 'transfererTe') {
            roleTransfererTerminal.run(creep);
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


    //ROOM E43N3
    //ROOM E43N3


    let n1HCo;
    let n2HCo;
    let n1HLi;
    let n2HLi;

    let nTCo;
    let nTLi;
    let nTLiTe;
    let nTTe;


    let creepRoom;
    let harvester;

    let minimumNumberOf1HarvesterContainer;
    let minimumNumberOf2HarvesterContainer;

    let numberOf1HarvesterContainer;
    let numberOf2HarvesterContainer;

    let numberOf1SHarvesterContainer;
    let numberOf2SHarvesterContainer;


    let minimumNumberOf1HarvesterLink;
    let minimumNumberOf2HarvesterLink;

    let numberOf1HarvesterLink;
    let numberOf2HarvesterLink;

    let numberOf1SHarvesterLink;
    let numberOf2SHarvesterLink;

    minimumNumberOf1HarvesterContainer = 0;
    minimumNumberOf2HarvesterContainer = 0;

    numberOf1HarvesterContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N3");
    numberOf2HarvesterContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N3");

    numberOf1SHarvesterContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1S' && c.memory.room === "E43N3");
    numberOf2SHarvesterContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2S' && c.memory.room === "E43N3");


    minimumNumberOf1HarvesterLink = 1;
    minimumNumberOf2HarvesterLink = 1;

    numberOf1HarvesterLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N3");
    numberOf2HarvesterLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N3");

    numberOf1SHarvesterLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1S' && c.memory.room === "E43N3");
    numberOf2SHarvesterLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2S' && c.memory.room === "E43N3");

    let m1HCoE43N3 = minimumNumberOf1HarvesterContainer;
    let m2HCoE43N3 = minimumNumberOf2HarvesterContainer;

    let m1HLiE43N3 = minimumNumberOf1HarvesterLink;
    let m2HLiE43N3 = minimumNumberOf2HarvesterLink;

    creepRoom = "E43N3";

    harvester = Game.spawns['E43N3'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY],
        'Harvester' + Game.time,
        {dryRun: true});

    if (harvester === ERR_NOT_ENOUGH_ENERGY && numberOf1HarvesterContainer === 0 && numberOf1SHarvesterContainer < 2 && minimumNumberOf1HarvesterContainer !== 0) {
        Game.spawns['E43N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            'StarterHarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo1S',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab57",
                    room: creepRoom
                }
            });
    } else if (harvester === ERR_NOT_ENOUGH_ENERGY && numberOf2HarvesterContainer === 0 && numberOf2SHarvesterContainer < 2 && minimumNumberOf2HarvesterContainer !== 0) {
        Game.spawns['E43N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            'StarterHarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo2S',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab59",
                    room: creepRoom
                }
            });
    } else if (harvester === ERR_NOT_ENOUGH_ENERGY && numberOf1HarvesterLink === 0 && numberOf1SHarvesterLink < 2 && minimumNumberOf1HarvesterLink !== 0) {
        Game.spawns['E43N3'].spawnCreep(
            [MOVE,
                WORK,
                CARRY],
            'StarterHarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi1S',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab57",
                    room: creepRoom
                }
            });
    } else if (harvester === ERR_NOT_ENOUGH_ENERGY && numberOf2HarvesterLink === 0 && numberOf2SHarvesterLink < 2 && minimumNumberOf2HarvesterLink !== 0) {
        Game.spawns['E43N3'].spawnCreep(
            [MOVE,
                WORK,
                CARRY],
            'StarterHarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi2S',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab59",
                    room: creepRoom
                }
            });
    } else if (numberOf1HarvesterContainer < minimumNumberOf1HarvesterContainer) {
        Game.spawns['E43N3'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY],
            'HarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo1',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab57",
                    room: creepRoom
                }
            });
    } else if (numberOf2HarvesterContainer < minimumNumberOf2HarvesterContainer) {
        Game.spawns['E43N3'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY],
            'HarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo2',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab59",
                    room: creepRoom
                }
            });
    } else if (numberOf1HarvesterLink < minimumNumberOf1HarvesterLink) {
        Game.spawns['E43N3'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY],
            'HarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi1',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab57",
                    room: creepRoom
                }
            });
    } else if (numberOf2HarvesterLink < minimumNumberOf2HarvesterLink) {
        Game.spawns['E43N3'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY],
            'HarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi2',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab59",
                    room: creepRoom
                }
            });
    }


    //ROOM E43N2
    //ROOM E43N2


    minimumNumberOf1HarvesterContainer = 0;
    minimumNumberOf2HarvesterContainer = 0;

    numberOf1HarvesterContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N2");
    numberOf2HarvesterContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N2");

    numberOf1SHarvesterContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1S' && c.memory.room === "E43N2");
    numberOf2SHarvesterContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2S' && c.memory.room === "E43N2");


    minimumNumberOf1HarvesterLink = 1;
    minimumNumberOf2HarvesterLink = 1;

    numberOf1HarvesterLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N2");
    numberOf2HarvesterLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N2");

    numberOf1SHarvesterLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1S' && c.memory.room === "E43N2");
    numberOf2SHarvesterLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2S' && c.memory.room === "E43N2");

    let m1HCoE43N2 = minimumNumberOf1HarvesterContainer;
    let m2HCoE43N2 = minimumNumberOf2HarvesterContainer;

    let m1HLiE43N2 = minimumNumberOf1HarvesterLink;
    let m2HLiE43N2 = minimumNumberOf2HarvesterLink;

    creepRoom = "E43N2";

    harvester = Game.spawns['E43N2'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY],
        'Harvester' + Game.time,
        {dryRun: true});

    if (harvester === ERR_NOT_ENOUGH_ENERGY && numberOf1HarvesterContainer === 0 && numberOf1SHarvesterContainer < 2 && minimumNumberOf1HarvesterContainer !== 0) {
        Game.spawns['E43N2'].spawnCreep(
            [MOVE,
                WORK,
                CARRY],
            'StarterHarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo1S',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5c",
                    room: creepRoom
                }
            });
    } else if (harvester === ERR_NOT_ENOUGH_ENERGY && numberOf2HarvesterContainer === 0 && numberOf2SHarvesterContainer < 2 && minimumNumberOf2HarvesterContainer !== 0) {
        Game.spawns['E43N2'].spawnCreep(
            [MOVE,
                WORK,
                CARRY],
            'StarterHarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo2S',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5b",
                    room: creepRoom
                }
            });
    } else if (harvester === ERR_NOT_ENOUGH_ENERGY && numberOf1HarvesterLink === 0 && numberOf1SHarvesterLink < 2 && minimumNumberOf1HarvesterLink !== 0) {
        Game.spawns['E43N2'].spawnCreep(
            [MOVE,
                WORK,
                CARRY],
            'StarterHarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi1S',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5c",
                    room: creepRoom}});
    } else if (harvester === ERR_NOT_ENOUGH_ENERGY && numberOf2HarvesterLink === 0 && numberOf2SHarvesterLink < 2 && minimumNumberOf2HarvesterLink !== 0) {
        Game.spawns['E43N2'].spawnCreep(
            [MOVE,
                WORK,
                CARRY],
            'StarterHarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi2S',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5b",
                    room: creepRoom
                }
            });
    } else if (numberOf1HarvesterContainer < minimumNumberOf1HarvesterContainer) {
        Game.spawns['E43N2'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY],
            'HarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo1',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5c",
                    room: creepRoom
                }
            });
    } else if (numberOf2HarvesterContainer < minimumNumberOf2HarvesterContainer) {
        Game.spawns['E43N2'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY],
            'HarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo2',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5b",
                    room: creepRoom
                }
            });
    } else if (numberOf1HarvesterLink < minimumNumberOf1HarvesterLink) {
        Game.spawns['E43N2'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY],
            'HarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi1',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5c",
                    room: creepRoom
                }
            });

    } else if (numberOf2HarvesterLink < minimumNumberOf2HarvesterLink) {
        Game.spawns['E43N2'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY],
            'HarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi2',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5b",
                    room: creepRoom
                }
            });

    }


    //ROOM E42N2
    //ROOM E42N2

    minimumNumberOf1HarvesterContainer = 0;
    minimumNumberOf2HarvesterContainer = 0;

    numberOf1HarvesterContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E42N2");
    numberOf2HarvesterContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E42N2");

    numberOf1SHarvesterContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1S' && c.memory.room === "E42N2");
    numberOf2SHarvesterContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2S' && c.memory.room === "E42N2");


    minimumNumberOf1HarvesterLink = 1;
    minimumNumberOf2HarvesterLink = 1;

    numberOf1HarvesterLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E42N2");
    numberOf2HarvesterLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E42N2");

    numberOf1SHarvesterLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1S' && c.memory.room === "E42N2");
    numberOf2SHarvesterLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2S' && c.memory.room === "E42N2");

    let m1HCoE42N2 = minimumNumberOf1HarvesterContainer;
    let m2HCoE42N2 = minimumNumberOf2HarvesterContainer;

    let m1HLiE42N2 = minimumNumberOf1HarvesterLink;
    let m2HLiE42N2 = minimumNumberOf2HarvesterLink;

    creepRoom = "E42N2";

    harvester = Game.spawns['E42N2'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY],
        'Harvester' + Game.time,
        {dryRun: true});

    if (harvester === ERR_NOT_ENOUGH_ENERGY && numberOf1HarvesterContainer === 0 && numberOf1SHarvesterContainer < 2 && minimumNumberOf1HarvesterContainer !== 0) {
        Game.spawns['E42N2'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            'StarterHarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo1S',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d0",
                    room: creepRoom
                }
            });
    } else if (harvester === ERR_NOT_ENOUGH_ENERGY && numberOf2HarvesterContainer === 0 && numberOf2SHarvesterContainer < 2 && minimumNumberOf2HarvesterContainer !== 0) {
        Game.spawns['E42N2'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            'StarterHarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo2S',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d2",
                    room: creepRoom
                }
            });
    } else if (harvester === ERR_NOT_ENOUGH_ENERGY && numberOf1HarvesterLink === 0 && numberOf1SHarvesterLink < 2 && minimumNumberOf1HarvesterLink !== 0) {
        Game.spawns['E42N2'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            'StarterHarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi1S',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d0",
                    room: creepRoom
                }
            });
    } else if (harvester === ERR_NOT_ENOUGH_ENERGY && numberOf2HarvesterLink === 0 && numberOf2SHarvesterLink < 2 && minimumNumberOf2HarvesterLink !== 0) {
        Game.spawns['E42N2'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            'StarterHarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi2S',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d2",
                    room: creepRoom
                }
            });
    } else if (numberOf1HarvesterContainer < minimumNumberOf1HarvesterContainer) {
        Game.spawns['E42N2'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY],
            'HarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo1',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d0",
                    room: creepRoom
                }
            });
    } else if (numberOf2HarvesterContainer < minimumNumberOf2HarvesterContainer) {
        Game.spawns['E42N2'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY],
            'HarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo2',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d2",
                    room: creepRoom
                }
            });
    } else if (numberOf1HarvesterLink < minimumNumberOf1HarvesterLink) {
        Game.spawns['E42N2'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY],
            'HarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi1',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d0",
                    room: creepRoom
                }
            });
    } else if (numberOf2HarvesterLink < minimumNumberOf2HarvesterLink) {
        Game.spawns['E42N2'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY, CARRY],
            'HarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi2',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d2",
                    room: creepRoom
                }
            });
    }


    //ROOM E42N3
    //ROOM E42N3

    minimumNumberOf1HarvesterContainer = 0;
    minimumNumberOf2HarvesterContainer = 0;

    numberOf1HarvesterContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E42N3");
    numberOf2HarvesterContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E42N3");

    numberOf1SHarvesterContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1S' && c.memory.room === "E42N3");
    numberOf2SHarvesterContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2S' && c.memory.room === "E42N3");


    minimumNumberOf1HarvesterLink = 2;
    minimumNumberOf2HarvesterLink = 2;

    numberOf1HarvesterLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E42N3");
    numberOf2HarvesterLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E42N3");

    numberOf1SHarvesterLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1S' && c.memory.room === "E42N3");
    numberOf2SHarvesterLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2S' && c.memory.room === "E42N3");

    let m1HCoE42N3 = minimumNumberOf1HarvesterContainer;
    let m2HCoE42N3 = minimumNumberOf2HarvesterContainer;

    let m1HLiE42N3 = minimumNumberOf1HarvesterLink;
    let m2HLiE42N3 = minimumNumberOf2HarvesterLink;

    creepRoom = "E42N3";

    harvester = Game.spawns['E42N3'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE,
            WORK, WORK, WORK, WORK, WORK, WORK, WORK,
            CARRY],
        'Harvester' + Game.time,
        {dryRun: true});

    if (harvester === ERR_NOT_ENOUGH_ENERGY && numberOf1HarvesterContainer === 0 && numberOf1SHarvesterContainer < 2 && minimumNumberOf1HarvesterContainer !== 0) {
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            'StarterHarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo1S',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9cd",
                    room: creepRoom
                }
            });
    } else if (harvester === ERR_NOT_ENOUGH_ENERGY && numberOf2HarvesterContainer === 0 && numberOf2SHarvesterContainer < 2 && minimumNumberOf2HarvesterContainer !== 0) {
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            'StarterHarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo2S',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9ce",
                    room: creepRoom
                }
            });
    } else if (harvester === ERR_NOT_ENOUGH_ENERGY && numberOf1HarvesterLink === 0 && numberOf1SHarvesterLink < 2 && minimumNumberOf1HarvesterLink !== 0) {
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            'StarterHarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi1S',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9cd",
                    room: creepRoom
                }
            });
    } else if (harvester === ERR_NOT_ENOUGH_ENERGY && numberOf2HarvesterLink === 0 && numberOf2SHarvesterLink < 2 && minimumNumberOf2HarvesterLink !== 0) {
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            'StarterHarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi2S',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9ce",
                    room: creepRoom
                }
            });


    } else if (numberOf1HarvesterContainer < minimumNumberOf1HarvesterContainer) {
        Game.spawns['E42N3'].spawnCreep(
            [MOVE, MOVE,
                WORK, WORK, WORK,
                CARRY],
            'HarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo1',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9cd",
                    room: creepRoom
                }
            });
    } else if (numberOf2HarvesterContainer < minimumNumberOf2HarvesterContainer) {
        Game.spawns['E42N3'].spawnCreep(
            [MOVE, MOVE,
                WORK, WORK, WORK,
                CARRY],
            'HarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo2',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9ce",
                    room: creepRoom
                }
            });
    } else if (numberOf1HarvesterLink < minimumNumberOf1HarvesterLink) {
        Game.spawns['E42N3'].spawnCreep(
            [MOVE, MOVE,
                WORK, WORK, WORK,
                CARRY],
            'HarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi1',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9cd",
                    room: creepRoom
                }
            });
    } else if (numberOf2HarvesterLink < minimumNumberOf2HarvesterLink) {
        Game.spawns['E42N3'].spawnCreep(
            [MOVE, MOVE,
                WORK, WORK, WORK,
                CARRY],
            'HarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi2',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9ce",
                    room: creepRoom
                }
            });
    }


    //E43N3
    //E43N3
    let minimumNumberOfTransfererContainer;
    let minimumNumberOfTransfererLink;
    let minimumNumberOfTransfererLinkToTerminal;
    let minimumNumberOfTransfererTerminal;


    let numberOfSTransfererContainer;
    let numberOfSTransfererLink;
    let numberOfSTransfererTerminal;


    let numberOfTransfererContainer;
    let numberOfTransfererLink;
    let numberOfTransfererLinkToTerminal;
    let numberOfTransfererTerminal;

    let transferer;

    minimumNumberOfTransfererContainer = 0;
    minimumNumberOfTransfererLink = 0;
    minimumNumberOfTransfererLinkToTerminal = 1;
    minimumNumberOfTransfererTerminal = 2;


    numberOfSTransfererContainer = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCoS' && c.memory.room === "E43N3");
    numberOfSTransfererLink = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiS' && c.memory.room === "E43N3");
    numberOfSTransfererTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTeS' && c.memory.room === "E43N3");


    numberOfTransfererContainer = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N3");
    numberOfTransfererLink = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N3");
    numberOfTransfererLinkToTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N3");
    numberOfTransfererTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N3");

    let mTCoE43N3 = minimumNumberOfTransfererContainer;
    let mTLiE43N3 = minimumNumberOfTransfererLink;
    let mTLiTeE43N3 = minimumNumberOfTransfererLinkToTerminal;
    let mTTeE43N3 = minimumNumberOfTransfererTerminal;

    creepRoom = "E43N3";

    transferer = Game.spawns['E43N3'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE, MOVE,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
        'Transferer' + Game.time,
        {dryRun: true});

    if (transferer === ERR_NOT_ENOUGH_ENERGY && numberOfTransfererContainer === 0 && numberOfSTransfererContainer < 3 && minimumNumberOfTransfererContainer !== 0) {
        Game.spawns['E43N3'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            'StarterTransfererContainer' + Game.time,
            {
                memory: {
                    role: 'transfererCoS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (transferer === ERR_NOT_ENOUGH_ENERGY && numberOfTransfererLink === 0 && numberOfSTransfererLink < 3 && minimumNumberOfTransfererLink !== 0) {
        Game.spawns['E43N3'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            'StarterTransfererLink' + Game.time,
            {
                memory: {
                    role: 'transfererLiS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (transferer === ERR_NOT_ENOUGH_ENERGY && numberOfTransfererTerminal === 0 && numberOfSTransfererTerminal < 3 && minimumNumberOfTransfererTerminal !== 0) {
        Game.spawns['E43N3'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            'StarterTransfererTerminal' + Game.time,
            {
                memory: {
                    role: 'transfererTeS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererContainer < minimumNumberOfTransfererContainer) {
        Game.spawns['E43N3'].spawnCreep(
            [MOVE, MOVE, MOVE, MOVE, MOVE,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            'TransfererContainer' + Game.time,
            {
                memory: {
                    role: 'transfererCoS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererContainer < minimumNumberOfTransfererContainer) {
        Game.spawns['E43N3'].spawnCreep(
            [MOVE, MOVE, MOVE, MOVE, MOVE,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            'TransfererContainer' + Game.time,
            {
                memory: {
                    role: 'transfererCoS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererLink < minimumNumberOfTransfererLink) {
        Game.spawns['E43N3'].spawnCreep(
            [MOVE, MOVE, MOVE, MOVE, MOVE,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            'TransfererLink' + Game.time,
            {
                memory: {
                    role: 'transfererLi',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererLinkToTerminal < minimumNumberOfTransfererLinkToTerminal) {
        Game.spawns['E43N3'].spawnCreep(
            [MOVE,
                CARRY, CARRY],
            'TransfererLinkToTerminal' + Game.time,
            {
                memory: {
                    role: 'transfererLiTe',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererTerminal < minimumNumberOfTransfererTerminal) {
        Game.spawns['E43N3'].spawnCreep(
            [MOVE, MOVE, MOVE, MOVE, MOVE,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            'TransfererTerminal' + Game.time,
            {
                memory: {
                    role: 'transfererTe',
                    working: false,
                    room: creepRoom
                }
            });
    }


    //E43N2
    //E43N2


    minimumNumberOfTransfererContainer = 0;
    minimumNumberOfTransfererLink = 0;
    minimumNumberOfTransfererLinkToTerminal = 1;
    minimumNumberOfTransfererTerminal = 2;


    numberOfSTransfererContainer = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCoS' && c.memory.room === "E43N2");
    numberOfSTransfererLink = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiS' && c.memory.room === "E43N2");
    numberOfSTransfererTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTeS' && c.memory.room === "E43N2");


    numberOfTransfererContainer = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N2");
    numberOfTransfererLink = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N2");
    numberOfTransfererLinkToTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N2");
    numberOfTransfererTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N2");

    let mTCoE43N2 = minimumNumberOfTransfererContainer;
    let mTLiE43N2 = minimumNumberOfTransfererLink;
    let mTLiTeE43N2 = minimumNumberOfTransfererLinkToTerminal;
    let mTTeE43N2 = minimumNumberOfTransfererTerminal;

    creepRoom = "E43N2";

    transferer = Game.spawns['E43N2'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE, MOVE,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
        'Transferer' + Game.time,
        {dryRun: true});

    if (transferer === ERR_NOT_ENOUGH_ENERGY && numberOfTransfererContainer === 0 && numberOfSTransfererContainer < 3 && minimumNumberOfTransfererContainer !== 0) {
        Game.spawns['E43N2'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            'StarterTransfererContainer' + Game.time,
            {
                memory: {
                    role: 'transfererCoS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (transferer === ERR_NOT_ENOUGH_ENERGY && numberOfTransfererLink === 0 && numberOfSTransfererLink < 3 && minimumNumberOfTransfererLink !== 0) {
        Game.spawns['E43N2'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            'StarterTransfererLink' + Game.time,
            {
                memory: {
                    role: 'transfererLiS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (transferer === ERR_NOT_ENOUGH_ENERGY && numberOfTransfererTerminal === 0 && numberOfSTransfererTerminal < 3 && minimumNumberOfTransfererTerminal !== 0) {
        Game.spawns['E43N2'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            'StarterTransfererTerminal' + Game.time,
            {
                memory: {
                    role: 'transfererTeS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererContainer < minimumNumberOfTransfererContainer) {
        Game.spawns['E43N2'].spawnCreep(
            [MOVE, MOVE, MOVE, MOVE, MOVE,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            'TransfererContainer' + Game.time,
            {
                memory: {
                    role: 'transfererCoS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererContainer < minimumNumberOfTransfererContainer) {
        Game.spawns['E43N2'].spawnCreep(
            [MOVE, MOVE, MOVE, MOVE, MOVE,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            'TransfererContainer' + Game.time,
            {
                memory: {
                    role: 'transfererCoS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererLink < minimumNumberOfTransfererLink) {
        Game.spawns['E43N2'].spawnCreep(
            [MOVE, MOVE, MOVE, MOVE, MOVE,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            'TransfererLink' + Game.time,
            {
                memory: {
                    role: 'transfererLi',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererLinkToTerminal < minimumNumberOfTransfererLinkToTerminal) {
        Game.spawns['E43N2'].spawnCreep(
            [MOVE,
                CARRY, CARRY],
            'TransfererLinkToTerminal' + Game.time,
            {
                memory: {
                    role: 'transfererLiTe',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererTerminal < minimumNumberOfTransfererTerminal) {
        Game.spawns['E43N2'].spawnCreep(
            [MOVE, MOVE, MOVE, MOVE, MOVE,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            'TransfererTerminal' + Game.time,
            {
                memory: {
                    role: 'transfererTe',
                    working: false,
                    room: creepRoom
                }
            });
    }


    //E42N2
    //E42N2


    minimumNumberOfTransfererContainer = 0;
    minimumNumberOfTransfererLink = 0;
    minimumNumberOfTransfererLinkToTerminal = 1;
    minimumNumberOfTransfererTerminal = 2;


    numberOfSTransfererContainer = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCoS' && c.memory.room === "E42N2");
    numberOfSTransfererLink = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiS' && c.memory.room === "E42N2");
    numberOfSTransfererTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTeS' && c.memory.room === "E42N2");


    numberOfTransfererContainer = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E42N2");
    numberOfTransfererLink = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E42N2");
    numberOfTransfererLinkToTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E42N2");
    numberOfTransfererTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E42N2");

    let mTCoE42N2 = minimumNumberOfTransfererContainer;
    let mTLiE42N2 = minimumNumberOfTransfererLink;
    let mTLiTeE42N2 = minimumNumberOfTransfererLinkToTerminal;
    let mTTeE42N2 = minimumNumberOfTransfererTerminal;

    creepRoom = "E42N2";

    transferer = Game.spawns['E42N2'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE, MOVE,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
        'Transferer' + Game.time,
        {dryRun: true});

    if (transferer === ERR_NOT_ENOUGH_ENERGY && numberOfTransfererContainer === 0 && numberOfSTransfererContainer < 3 && minimumNumberOfTransfererContainer !== 0) {
        Game.spawns['E42N2'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            'StarterTransfererContainer' + Game.time,
            {
                memory: {
                    role: 'transfererCoS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (transferer === ERR_NOT_ENOUGH_ENERGY && numberOfTransfererLink === 0 && numberOfSTransfererLink < 3 && minimumNumberOfTransfererLink !== 0) {
        Game.spawns['E42N2'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            'StarterTransfererLink' + Game.time,
            {
                memory: {
                    role: 'transfererLiS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (transferer === ERR_NOT_ENOUGH_ENERGY && numberOfTransfererTerminal === 0 && numberOfSTransfererTerminal < 3 && minimumNumberOfTransfererTerminal !== 0) {
        Game.spawns['E42N2'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            'StarterTransfererTerminal' + Game.time,
            {
                memory: {
                    role: 'transfererTeS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererContainer < minimumNumberOfTransfererContainer) {
        Game.spawns['E42N2'].spawnCreep(
            [MOVE, MOVE, MOVE, MOVE, MOVE,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            'TransfererContainer' + Game.time,
            {
                memory: {
                    role: 'transfererCoS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererContainer < minimumNumberOfTransfererContainer) {
        Game.spawns['E42N2'].spawnCreep(
            [MOVE, MOVE, MOVE, MOVE, MOVE,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            'TransfererContainer' + Game.time,
            {
                memory: {
                    role: 'transfererCoS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererLink < minimumNumberOfTransfererLink) {
        Game.spawns['E42N2'].spawnCreep(
            [MOVE, MOVE, MOVE, MOVE, MOVE,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            'TransfererLink' + Game.time,
            {
                memory: {
                    role: 'transfererLi',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererLinkToTerminal < minimumNumberOfTransfererLinkToTerminal) {
        Game.spawns['E42N2'].spawnCreep(
            [MOVE,
                CARRY, CARRY],
            'TransfererLinkToTerminal' + Game.time,
            {
                memory: {
                    role: 'transfererLiTe',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererTerminal < minimumNumberOfTransfererTerminal) {
        Game.spawns['E42N2'].spawnCreep(
            [MOVE, MOVE, MOVE, MOVE, MOVE,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            'TransfererTerminal' + Game.time,
            {
                memory: {
                    role: 'transfererTe',
                    working: false,
                    room: creepRoom
                }
            });
    }


    //E42N3
    //E42N3


    minimumNumberOfTransfererContainer = 0;
    minimumNumberOfTransfererLink = 2;
    minimumNumberOfTransfererLinkToTerminal = 0;
    minimumNumberOfTransfererTerminal = 0;


    numberOfSTransfererContainer = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCoS' && c.memory.room === "E42N3");
    numberOfSTransfererLink = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiS' && c.memory.room === "E42N3");
    numberOfSTransfererTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTeS' && c.memory.room === "E42N3");


    numberOfTransfererContainer = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E42N3");
    numberOfTransfererLink = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E42N3");
    numberOfTransfererLinkToTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E42N3");
    numberOfTransfererTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E42N3");
    let mTCoE42N3 = minimumNumberOfTransfererContainer;
    let mTLiE42N3 = minimumNumberOfTransfererLink;
    let mTLiTeE42N3 = minimumNumberOfTransfererLinkToTerminal;
    let mTTeE42N3 = minimumNumberOfTransfererTerminal;

    creepRoom = "E42N3";

    transferer = Game.spawns['E42N3'].spawnCreep(
        [MOVE, MOVE, MOVE, MOVE,
            CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
        'Transferer' + Game.time,
        {dryRun: true});

    if (transferer === ERR_NOT_ENOUGH_ENERGY && numberOfTransfererContainer === 0 && numberOfSTransfererContainer < 3 && minimumNumberOfTransfererContainer !== 0) {
        Game.spawns['E42N3'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            'StarterTransfererContainer' + Game.time,
            {
                memory: {
                    role: 'transfererCoS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (transferer === ERR_NOT_ENOUGH_ENERGY && numberOfTransfererLink === 0 && numberOfSTransfererLink < 3 && minimumNumberOfTransfererLink !== 0) {
        Game.spawns['E42N3'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            'StarterTransfererLink' + Game.time,
            {
                memory: {
                    role: 'transfererLiS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (transferer === ERR_NOT_ENOUGH_ENERGY && numberOfTransfererTerminal === 0 && numberOfSTransfererTerminal < 3 && minimumNumberOfTransfererTerminal !== 0) {
        Game.spawns['E42N3'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            'StarterTransfererTerminal' + Game.time,
            {
                memory: {
                    role: 'transfererTeS',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererContainer < minimumNumberOfTransfererContainer) {
        Game.spawns['E42N3'].spawnCreep(
            [MOVE, MOVE, MOVE, MOVE,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            'TransfererContainer' + Game.time,
            {
                memory: {
                    role: 'transfererCo',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererLink < minimumNumberOfTransfererLink) {
        Game.spawns['E42N3'].spawnCreep(
            [MOVE, MOVE, MOVE, MOVE,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            'TransfererLink' + Game.time,
            {
                memory: {
                    role: 'transfererLi',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererLinkToTerminal < minimumNumberOfTransfererLinkToTerminal) {
        Game.spawns['E42N3'].spawnCreep(
            [MOVE,
                CARRY, CARRY],
            'TransfererLinkToTerminal' + Game.time,
            {
                memory: {
                    role: 'transfererLiTe',
                    working: false,
                    room: creepRoom
                }
            });
    } else if (numberOfTransfererTerminal < minimumNumberOfTransfererTerminal) {
        Game.spawns['E42N3'].spawnCreep(
            [MOVE, MOVE, MOVE, MOVE,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            'TransfererTerminal' + Game.time,
            {
                memory: {
                    role: 'transfererTe',
                    working: false,
                    room: creepRoom
                }
            });
    }


    // E43N3
    // E43N3


    let minimumNumberOfUpgraderSource;
    let minimumNumberOfUpgraderContainer;
    let minimumNumberOfUpgraderLink;
    let minimumNumberOfUpgraderTerminal;


    let numberOfUpgraderSource;
    let numberOfUpgraderContainer;
    let numberOfUpgraderLink;
    let numberOfUpgraderTerminal;


    minimumNumberOfUpgraderSource = 0;
    minimumNumberOfUpgraderContainer = 0;
    minimumNumberOfUpgraderLink = 0;
    minimumNumberOfUpgraderTerminal = 1;


    numberOfUpgraderSource = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderSo' && c.memory.room === "E43N3");
    numberOfUpgraderContainer = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderCo' && c.memory.room === "E43N3");
    numberOfUpgraderLink = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderLi' && c.memory.room === "E43N3");
    numberOfUpgraderTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderTe' && c.memory.room === "E43N3");

    creepRoom = "E43N3";

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N3");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N3");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N3");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N3");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N3");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N3");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N3");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N3");

    if (n1HCo === m1HCoE43N3 && n2HCo === m2HCoE43N3 && nTCo === mTCoE43N3 && mTCoE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLi === mTLiE43N3  && mTLiE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLiTe === mTLiTeE43N3 && nTTe === mTTeE43N3 && mTTeE43N3 !== 0) {
        if (numberOfUpgraderSource < minimumNumberOfUpgraderSource) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY,
                    MOVE, MOVE],
                'UpgraderSource' + Game.time,
                {
                    memory: {
                        role: 'upgraderSo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfUpgraderContainer < minimumNumberOfUpgraderContainer) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY,
                    MOVE, MOVE],
                'UpgraderContainer' + Game.time,
                {
                    memory: {
                        working: false,
                        role: 'upgraderCo',
                        room: creepRoom
                    }
                });
        } else if (numberOfUpgraderLink < minimumNumberOfUpgraderLink) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY,
                    MOVE, MOVE],
                'UpgraderLi' + Game.time,
                {
                    memory: {
                        role: 'upgraderLi',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfUpgraderTerminal < minimumNumberOfUpgraderTerminal) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY,
                    MOVE, MOVE],
                'UpgraderTerminal' + Game.time,
                {
                    memory: {
                        role: 'upgraderTe',
                        working: false,
                        room: creepRoom
                    }
                });
        }
    }


    // E43N2
    // E43N2


    minimumNumberOfUpgraderSource = 0;
    minimumNumberOfUpgraderContainer = 0;
    minimumNumberOfUpgraderLink = 0;
    minimumNumberOfUpgraderTerminal = 1;


    numberOfUpgraderSource = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderSo' && c.memory.room === "E43N2");
    numberOfUpgraderContainer = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderCo' && c.memory.room === "E43N2");
    numberOfUpgraderLink = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderLi' && c.memory.room === "E43N2");
    numberOfUpgraderTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderTe' && c.memory.room === "E43N2");

    creepRoom = "E43N2";

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N2");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N2");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N2");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N2");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N2");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N2");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N2");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N2");

    if (n1HCo === m1HCoE43N2 && n2HCo === m2HCoE43N2 && nTCo === mTCoE43N2 && mTCoE43N2 !== 0
        || n1HLi === m1HLiE43N2 && n2HLi === m2HLiE43N2 && nTLi === mTLiE43N2  && mTLiE43N2 !== 0
        || n1HLi === m1HLiE43N2 && n2HLi === m2HLiE43N2 && nTLiTe === mTLiTeE43N2 && nTTe === mTTeE43N2 && mTTeE43N2 !== 0) {

        if (numberOfUpgraderSource < minimumNumberOfUpgraderSource) {
            // try to spawn one
            Game.spawns['E43N2'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY,
                    MOVE, MOVE],
                'UpgraderSource' + Game.time,
                {
                    memory: {
                        role: 'upgraderSo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfUpgraderContainer < minimumNumberOfUpgraderContainer) {
            // try to spawn one
            Game.spawns['E43N2'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY,
                    MOVE, MOVE],
                'UpgraderContainer' + Game.time,
                {
                    memory: {
                        role: 'upgraderCo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfUpgraderLink < minimumNumberOfUpgraderLink) {
            // try to spawn one
            Game.spawns['E43N2'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY,
                    MOVE, MOVE],
                'UpgraderLi' + Game.time,
                {
                    memory: {
                        role: 'upgraderLi',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfUpgraderTerminal < minimumNumberOfUpgraderTerminal) {
            // try to spawn one
            Game.spawns['E43N2'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY,
                    MOVE, MOVE],
                'UpgraderTerminal' + Game.time,
                {
                    memory: {
                        role: 'upgraderTe',
                        working: false,
                        room: creepRoom
                    }
                });
        }
    }


    // E42N2
    // E42N2


    minimumNumberOfUpgraderSource = 0;
    minimumNumberOfUpgraderContainer = 0;
    minimumNumberOfUpgraderLink = 0;
    minimumNumberOfUpgraderTerminal = 1;


    numberOfUpgraderSource = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderSo' && c.memory.room === "E42N2");
    numberOfUpgraderContainer = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderCo' && c.memory.room === "E42N2");
    numberOfUpgraderLink = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderLi' && c.memory.room === "E42N2");
    numberOfUpgraderTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderTe' && c.memory.room === "E42N2");

    creepRoom = "E42N2";

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E42N2");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E42N2");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E42N2");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E42N2");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E42N2");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E42N2");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E42N2");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E42N2");

    if (n1HCo === m1HCoE42N2 && n2HCo === m2HCoE42N2 && nTCo === mTCoE42N2 && mTCoE42N2 !== 0
        || n1HLi === m1HLiE42N2 && n2HLi === m2HLiE42N2 && nTLi === mTLiE42N2  && mTLiE42N2 !== 0
        || n1HLi === m1HLiE42N2 && n2HLi === m2HLiE42N2 && nTLiTe === mTLiTeE42N2 && nTTe === mTTeE42N2 && mTTeE42N2 !== 0) {
        if (numberOfUpgraderSource < minimumNumberOfUpgraderSource) {
            // try to spawn one
            Game.spawns['E42N2'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY,
                    MOVE, MOVE],
                'UpgraderSource' + Game.time,
                {
                    memory: {
                        role: 'upgraderSo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfUpgraderContainer < minimumNumberOfUpgraderContainer) {
            // try to spawn one
            Game.spawns['E42N2'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY,
                    MOVE, MOVE],
                'UpgraderContainer' + Game.time,
                {
                    memory: {
                        role: 'upgraderCo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfUpgraderLink < minimumNumberOfUpgraderLink) {
            // try to spawn one
            Game.spawns['E42N2'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY,
                    MOVE, MOVE],
                'UpgraderLi' + Game.time,
                {
                    memory: {
                        role: 'upgraderLi',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfUpgraderTerminal < minimumNumberOfUpgraderTerminal) {
            // try to spawn one
            Game.spawns['E42N2'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY,
                    MOVE, MOVE],
                'UpgraderTerminal' + Game.time,
                {
                    memory: {
                        role: 'upgraderTe',
                        working: false,
                        room: creepRoom
                    }
                });
        }
    }


    // E42N3
    // E42N3


    minimumNumberOfUpgraderSource = 0;
    minimumNumberOfUpgraderContainer = 0;
    minimumNumberOfUpgraderLink = 2;
    minimumNumberOfUpgraderTerminal = 0;


    numberOfUpgraderSource = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderSo' && c.memory.room === "E42N3");
    numberOfUpgraderContainer = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderCo' && c.memory.room === "E42N3");
    numberOfUpgraderLink = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderLi' && c.memory.room === "E42N3");
    numberOfUpgraderTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderTe' && c.memory.room === "E42N3");

    creepRoom = "E42N3";

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N3");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N3");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N3");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N3");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N3");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N3");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N3");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N3");

    if (n1HCo === m1HCoE43N3 && n2HCo === m2HCoE43N3 && nTCo === mTCoE43N3 && mTCoE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLi === mTLiE43N3  && mTLiE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLiTe === mTLiTeE43N3 && nTTe === mTTeE43N3 && mTTeE43N3 !== 0) {
        if (numberOfUpgraderSource < minimumNumberOfUpgraderSource) {
            // try to spawn one
            Game.spawns['E42N3'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY,
                    MOVE, MOVE],
                'UpgraderSource' + Game.time,
                {
                    memory: {
                        role: 'upgraderSo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfUpgraderContainer < minimumNumberOfUpgraderContainer) {
            // try to spawn one
            Game.spawns['E42N3'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY,
                    MOVE, MOVE],
                'UpgraderContainer' + Game.time,
                {
                    memory: {
                        role: 'upgraderCo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfUpgraderLink < minimumNumberOfUpgraderLink) {
            // try to spawn one
            Game.spawns['E42N3'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY,
                    MOVE, MOVE],
                'UpgraderLi' + Game.time,
                {
                    memory: {
                        role: 'upgraderLi',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfUpgraderTerminal < minimumNumberOfUpgraderTerminal) {
            // try to spawn one
            Game.spawns['E42N3'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY,
                    MOVE, MOVE],
                'UpgraderTerminal' + Game.time,
                {
                    memory: {
                        role: 'upgraderTe',
                        working: false,
                        room: creepRoom
                    }
                });
        }
    }


    // E43N3
    // E43N3


    let minimumNumberOfBuilderSource;
    let minimumNumberOfBuilderContainer;
    let minimumNumberOfBuilderLink;
    let minimumNumberOfBuilderTerminal;


    let numberOfBuilderSource;
    let numberOfBuilderContainer;
    let numberOfBuilderLink;
    let numberOfBuilderTerminal;


    minimumNumberOfBuilderSource = 0;
    minimumNumberOfBuilderContainer = 0;
    minimumNumberOfBuilderLink = 0;
    minimumNumberOfBuilderTerminal = 0;


    numberOfBuilderSource = _.sum(Game.creeps, (c) => c.memory.role === 'builderSo' && c.memory.room === "E43N3");
    numberOfBuilderContainer = _.sum(Game.creeps, (c) => c.memory.role === 'builderCo' && c.memory.room === "E43N3");
    numberOfBuilderLink = _.sum(Game.creeps, (c) => c.memory.role === 'builderLi' && c.memory.room === "E43N3");
    numberOfBuilderTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'builderTe' && c.memory.room === "E43N3");

    creepRoom = "E43N3";

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N3");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N3");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N3");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N3");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N3");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N3");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N3");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N3");

    if (n1HCo === m1HCoE43N3 && n2HCo === m2HCoE43N3 && nTCo === mTCoE43N3 && mTCoE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLi === mTLiE43N3  && mTLiE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLiTe === mTLiTeE43N3 && nTTe === mTTeE43N3 && mTTeE43N3 !== 0) {

        if (numberOfBuilderSource < minimumNumberOfBuilderSource) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE],
                'BuilderSource' + Game.time,
                {
                    memory: {
                        role: 'builderSo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfBuilderContainer < minimumNumberOfBuilderContainer) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE],
                'BuilderContainer' + Game.time,
                {
                    memory: {
                        working: false,
                        role: 'builderCo',
                        room: creepRoom
                    }
                });
        } else if (numberOfBuilderLink < minimumNumberOfBuilderLink) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE],
                'BuilderLi' + Game.time,
                {
                    memory: {
                        role: 'builderLi',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfBuilderTerminal < minimumNumberOfBuilderTerminal) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE],
                'BuilderTerminal' + Game.time,
                {
                    memory: {
                        role: 'builderTe',
                        working: false,
                        room: creepRoom
                    }
                });
        }
    }


    // E43N2
    // E43N2


    minimumNumberOfBuilderSource = 0;
    minimumNumberOfBuilderContainer = 0;
    minimumNumberOfBuilderLink = 0;
    minimumNumberOfBuilderTerminal = 0;


    numberOfBuilderSource = _.sum(Game.creeps, (c) => c.memory.role === 'builderSo' && c.memory.room === "E43N2");
    numberOfBuilderContainer = _.sum(Game.creeps, (c) => c.memory.role === 'builderCo' && c.memory.room === "E43N2");
    numberOfBuilderLink = _.sum(Game.creeps, (c) => c.memory.role === 'builderLi' && c.memory.room === "E43N2");
    numberOfBuilderTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'builderTe' && c.memory.room === "E43N2");

    creepRoom = "E43N2";

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N2");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N2");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N2");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N2");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N2");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N2");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N2");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N2");

    if (n1HCo === m1HCoE43N2 && n2HCo === m2HCoE43N2 && nTCo === mTCoE43N2 && mTCoE43N2 !== 0
        || n1HLi === m1HLiE43N2 && n2HLi === m2HLiE43N2 && nTLi === mTLiE43N2  && mTLiE43N2 !== 0
        || n1HLi === m1HLiE43N2 && n2HLi === m2HLiE43N2 && nTLiTe === mTLiTeE43N2 && nTTe === mTTeE43N2 && mTTeE43N2 !== 0) {

        if (numberOfBuilderSource < minimumNumberOfBuilderSource) {
            // try to spawn one
            Game.spawns['E43N2'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE],
                'BuilderSource' + Game.time,
                {
                    memory: {
                        role: 'builderSo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfBuilderContainer < minimumNumberOfBuilderContainer) {
            // try to spawn one
            Game.spawns['E43N2'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE],
                'BuilderContainer' + Game.time,
                {
                    memory: {
                        working: false,
                        role: 'builderCo',
                        room: creepRoom
                    }
                });
        } else if (numberOfBuilderLink < minimumNumberOfBuilderLink) {
            // try to spawn one
            Game.spawns['E43N2'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE],
                'BuilderLi' + Game.time,
                {
                    memory: {
                        role: 'builderLi',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfBuilderTerminal < minimumNumberOfBuilderTerminal) {
            // try to spawn one
            Game.spawns['E43N2'].spawnCreep(
                [WORK, ],
                'BuilderTerminal' + Game.time,
                {
                    memory: {
                        role: 'builderTe',
                        working: false,
                    }
                });
        }
    }


    // E42N2
    // E42N2


    minimumNumberOfBuilderSource = 0;
    minimumNumberOfBuilderContainer = 0;
    minimumNumberOfBuilderLink = 0;
    minimumNumberOfBuilderTerminal = 0;


    numberOfBuilderSource = _.sum(Game.creeps, (c) => c.memory.role === 'builderSo' && c.memory.room === "E42N2");
    numberOfBuilderContainer = _.sum(Game.creeps, (c) => c.memory.role === 'builderCo' && c.memory.room === "E42N2");
    numberOfBuilderLink = _.sum(Game.creeps, (c) => c.memory.role === 'builderLi' && c.memory.room === "E42N2");
    numberOfBuilderTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'builderTe' && c.memory.room === "E42N2");

    creepRoom = "E42N2";

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E42N2");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E42N2");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E42N2");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E42N2");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E42N2");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E42N2");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E42N2");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E42N2");

    if (n1HCo === m1HCoE42N2 && n2HCo === m2HCoE42N2 && nTCo === mTCoE42N2 && mTCoE42N2 !== 0
        || n1HLi === m1HLiE42N2 && n2HLi === m2HLiE42N2 && nTLi === mTLiE42N2  && mTLiE42N2 !== 0
        || n1HLi === m1HLiE42N2 && n2HLi === m2HLiE42N2 && nTLiTe === mTLiTeE42N2 && nTTe === mTTeE42N2 && mTTeE42N2 !== 0) {
        if (numberOfBuilderSource < minimumNumberOfBuilderSource) {
            // try to spawn one
            Game.spawns['E42N2'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE],
                'BuilderSource' + Game.time,
                {
                    memory: {
                        role: 'builderSo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfBuilderContainer < minimumNumberOfBuilderContainer) {
            // try to spawn one
            Game.spawns['E42N2'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE],
                'BuilderContainer' + Game.time,
                {
                    memory: {
                        working: false,
                        role: 'builderCo',
                        room: creepRoom
                    }
                });
        } else if (numberOfBuilderLink < minimumNumberOfBuilderLink) {
            // try to spawn one
            Game.spawns['E42N2'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE],
                'BuilderLi' + Game.time,
                {
                    memory: {
                        role: 'builderLi',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfBuilderTerminal < minimumNumberOfBuilderTerminal) {
            // try to spawn one
            Game.spawns['E42N2'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE],
                'BuilderTerminal' + Game.time,
                {
                    memory: {
                        role: 'builderTe',
                        working: false,
                        room: creepRoom
                    }
                });
        }
    }


    // E42N3
    // E42N3


    minimumNumberOfBuilderSource = 0;
    minimumNumberOfBuilderContainer = 0;
    minimumNumberOfBuilderLink = 3;
    minimumNumberOfBuilderTerminal = 0;


    numberOfBuilderSource = _.sum(Game.creeps, (c) => c.memory.role === 'builderSo' && c.memory.room === "E42N3");
    numberOfBuilderContainer = _.sum(Game.creeps, (c) => c.memory.role === 'builderCo' && c.memory.room === "E42N3");
    numberOfBuilderLink = _.sum(Game.creeps, (c) => c.memory.role === 'builderLi' && c.memory.room === "E42N3");
    numberOfBuilderTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'builderTe' && c.memory.room === "E42N3");

    creepRoom = "E42N3";

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E42N3");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E42N3");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E42N3");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E42N3");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E42N3");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E42N3");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E42N3");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E42N3");

    if (n1HCo === m1HCoE42N3 && n2HCo === m2HCoE42N3 && nTCo === mTCoE42N3 && mTCoE42N3 !== 0
        || n1HLi === m1HLiE42N3 && n2HLi === m2HLiE42N3 && nTLi === mTLiE42N3  && mTLiE42N3 !== 0
        || n1HLi === m1HLiE42N3 && n2HLi === m2HLiE42N3 && nTLiTe === mTLiTeE42N3 && nTTe === mTTeE42N3 && mTTeE42N3 !== 0) {
        if (numberOfBuilderSource < minimumNumberOfBuilderSource) {
            // try to spawn one
            Game.spawns['E42N3'].spawnCreep(
                [WORK, WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE],
                'BuilderSource' + Game.time,
                {
                    memory: {
                        role: 'builderSo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfBuilderContainer < minimumNumberOfBuilderContainer) {
            // try to spawn one
            Game.spawns['E42N3'].spawnCreep(
                [WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE],
                'BuilderContainer' + Game.time,
                {
                    memory: {
                        working: false,
                        role: 'builderCo',
                        room: creepRoom
                    }
                });
        } else if (numberOfBuilderLink < minimumNumberOfBuilderLink) {
            // try to spawn one
            Game.spawns['E42N3'].spawnCreep(
                [WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE],
                'BuilderLi' + Game.time,
                {
                    memory: {
                        role: 'builderLi',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfBuilderTerminal < minimumNumberOfBuilderTerminal) {
            // try to spawn one
            Game.spawns['E42N3'].spawnCreep(
                [WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE],
                'BuilderTerminal' + Game.time,
                {
                    memory: {
                        role: 'builderTe',
                        working: false,
                        room: creepRoom
                    }
                });
        }
    }


    //E43N3
    //E43N3


    let minimumNumberOfRepairerContainer;
    let minimumNumberOfRepairerLink;
    let minimumNumberOfRepairerTerminal;


    let numberOfRepairerContainer;
    let numberOfRepairerLink;
    let numberOfRepairerTerminal;


    minimumNumberOfRepairerContainer = 0;
    minimumNumberOfRepairerLink = 0;
    minimumNumberOfRepairerTerminal = 0;


    numberOfRepairerContainer = _.sum(Game.creeps, (c) => c.memory.role === 'repairerCo' && c.memory.room === "E43N3");
    numberOfRepairerLink = _.sum(Game.creeps, (c) => c.memory.role === 'repairerLi' && c.memory.room === "E43N3");
    numberOfRepairerTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'repairerTe' && c.memory.room === "E43N3");

    creepRoom = "E43N3";

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N3");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N3");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N3");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N3");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N3");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N3");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N3");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N3");

    if (n1HCo === m1HCoE43N3 && n2HCo === m2HCoE43N3 && nTCo === mTCoE43N3 && mTCoE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLi === mTLiE43N3  && mTLiE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLiTe === mTLiTeE43N3 && nTTe === mTTeE43N3 && mTTeE43N3 !== 0) {
        if (numberOfRepairerContainer < minimumNumberOfRepairerContainer) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'RepairerLink' + Game.time,
                {
                    memory: {
                        role: 'repairerCo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfRepairerLink < minimumNumberOfRepairerLink) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'RepairerLink' + Game.time,
                {
                    memory: {
                        role: 'repairerLi',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfRepairerTerminal < minimumNumberOfRepairerTerminal) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'RepairerTerminal' + Game.time,
                {
                    memory: {
                        role: 'repairerTe',
                        working: false,
                        room: creepRoom
                    }
                });
        }
    }


    //E43N2
    //E43N2


    minimumNumberOfRepairerContainer = 0;
    minimumNumberOfRepairerLink = 0;
    minimumNumberOfRepairerTerminal = 0;


    numberOfRepairerContainer = _.sum(Game.creeps, (c) => c.memory.role === 'repairerCo' && c.memory.room === "E43N2");
    numberOfRepairerLink = _.sum(Game.creeps, (c) => c.memory.role === 'repairerLi' && c.memory.room === "E43N2");
    numberOfRepairerTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'repairerTe' && c.memory.room === "E43N2");

    creepRoom = "E43N2";

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N2");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N2");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N2");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N2");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N2");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N2");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N2");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N2");

    if (n1HCo === m1HCoE43N2 && n2HCo === m2HCoE43N2 && nTCo === mTCoE43N2 && mTCoE43N2 !== 0
        || n1HLi === m1HLiE43N2 && n2HLi === m2HLiE43N2 && nTLi === mTLiE43N2  && mTLiE43N2 !== 0
        || n1HLi === m1HLiE43N2 && n2HLi === m2HLiE43N2 && nTLiTe === mTLiTeE43N2 && nTTe === mTTeE43N2 && mTTeE43N2 !== 0) {
        if (numberOfRepairerContainer < minimumNumberOfRepairerContainer) {
            // try to spawn one
            Game.spawns['E43N2'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'RepairerLink' + Game.time,
                {
                    memory: {
                        role: 'repairerCo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfRepairerLink < minimumNumberOfRepairerLink) {
            // try to spawn one
            Game.spawns['E43N2'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'RepairerLink' + Game.time,
                {
                    memory: {
                        role: 'repairerLi',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfRepairerTerminal < minimumNumberOfRepairerTerminal) {
            // try to spawn one
            Game.spawns['E43N2'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'RepairerTerminal' + Game.time,
                {
                    memory: {
                        role: 'repairerTe',
                        working: false,
                        room: creepRoom
                    }
                });
        }
    }


    //E43N3
    //E43N3


    minimumNumberOfRepairerContainer = 0;
    minimumNumberOfRepairerLink = 0;
    minimumNumberOfRepairerTerminal = 0;


    numberOfRepairerContainer = _.sum(Game.creeps, (c) => c.memory.role === 'repairerCo' && c.memory.room === "E43N3");
    numberOfRepairerLink = _.sum(Game.creeps, (c) => c.memory.role === 'repairerLi' && c.memory.room === "E43N3");
    numberOfRepairerTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'repairerTe' && c.memory.room === "E43N3");

    creepRoom = "E43N3";

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N3");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N3");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N3");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N3");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N3");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N3");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N3");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N3");

    if (n1HCo === m1HCoE43N3 && n2HCo === m2HCoE43N3 && nTCo === mTCoE43N3 && mTCoE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLi === mTLiE43N3  && mTLiE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLiTe === mTLiTeE43N3 && nTTe === mTTeE43N3 && mTTeE43N3 !== 0) {
        if (numberOfRepairerContainer < minimumNumberOfRepairerContainer) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'RepairerLink' + Game.time,
                {
                    memory: {
                        role: 'repairerCo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfRepairerLink < minimumNumberOfRepairerLink) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'RepairerLink' + Game.time,
                {
                    memory: {
                        role: 'repairerLi',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfRepairerTerminal < minimumNumberOfRepairerTerminal) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'RepairerTerminal' + Game.time,
                {
                    memory: {
                        role: 'repairerTe',
                        working: false,
                        room: creepRoom
                    }
                });
        }
    }


    //E42N3
    //E42N3


    minimumNumberOfRepairerContainer = 0;
    minimumNumberOfRepairerLink = 0;
    minimumNumberOfRepairerTerminal = 0;


    numberOfRepairerContainer = _.sum(Game.creeps, (c) => c.memory.role === 'repairerCo' && c.memory.room === "E42N3");
    numberOfRepairerLink = _.sum(Game.creeps, (c) => c.memory.role === 'repairerLi' && c.memory.room === "E42N3");
    numberOfRepairerTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'repairerTe' && c.memory.room === "E42N3");

    creepRoom = "E42N3";

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E42N3");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E42N3");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E42N3");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E42N3");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E42N3");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E42N3");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E42N3");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E42N3");

    if (n1HCo === m1HCoE42N3 && n2HCo === m2HCoE42N3 && nTCo === mTCoE42N3 && mTCoE42N3 !== 0
        || n1HLi === m1HLiE42N3 && n2HLi === m2HLiE42N3 && nTLi === mTLiE42N3  && mTLiE42N3 !== 0
        || n1HLi === m1HLiE42N3 && n2HLi === m2HLiE42N3 && nTLiTe === mTLiTeE42N3 && nTTe === mTTeE42N3 && mTTeE42N3 !== 0) {
        if (numberOfRepairerContainer < minimumNumberOfRepairerContainer) {
            // try to spawn one
            Game.spawns['E42N3'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'RepairerLink' + Game.time,
                {
                    memory: {
                        role: 'repairerCo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfRepairerLink < minimumNumberOfRepairerLink) {
            // try to spawn one
            Game.spawns['E42N3'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'RepairerLink' + Game.time,
                {
                    memory: {
                        role: 'repairerLi',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfRepairerTerminal < minimumNumberOfRepairerTerminal) {
            // try to spawn one
            Game.spawns['E42N3'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'RepairerTerminal' + Game.time,
                {
                    memory: {
                        role: 'repairerTe',
                        working: false,
                        room: creepRoom
                    }
                });
        }
    }


    //E43N3
    //E43N3


    let minimumNumberOfWallRepairerContainer;
    let minimumNumberOfWallRepairerLink;
    let minimumNumberOfWallRepairerTerminal;


    let numberOfWallRepairerContainer;
    let numberOfWallRepairerLink;
    let numberOfWallRepairerTerminal;


    minimumNumberOfWallRepairerContainer = 0;
    minimumNumberOfWallRepairerLink = 0;
    minimumNumberOfWallRepairerTerminal = 0;


    numberOfWallRepairerContainer = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerCo' && c.memory.room === "E43N3");
    numberOfWallRepairerLink = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerLi' && c.memory.room === "E43N3");
    numberOfWallRepairerTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerTe' && c.memory.room === "E43N3");

    creepRoom = "E43N3";

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N3");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N3");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N3");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N3");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N3");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N3");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N3");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N3");

    if (n1HCo === m1HCoE43N3 && n2HCo === m2HCoE43N3 && nTCo === mTCoE43N3 && mTCoE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLi === mTLiE43N3  && mTLiE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLiTe === mTLiTeE43N3 && nTTe === mTTeE43N3 && mTTeE43N3 !== 0) {
        if (numberOfWallRepairerContainer < minimumNumberOfWallRepairerContainer) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'WallRepairerLink' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerCo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfWallRepairerLink < minimumNumberOfWallRepairerLink) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'WallRepairerLink' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerLi',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfWallRepairerTerminal < minimumNumberOfWallRepairerTerminal) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'WallRepairerTerminal' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerTe',
                        working: false,
                        room: creepRoom
                    }
                });
        }
    }
    //E43N2
    //E43N2


    minimumNumberOfWallRepairerContainer = 0;
    minimumNumberOfWallRepairerLink = 0;
    minimumNumberOfWallRepairerTerminal = 0;


    numberOfWallRepairerContainer = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerCo' && c.memory.room === "E43N2");
    numberOfWallRepairerLink = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerLi' && c.memory.room === "E43N2");
    numberOfWallRepairerTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerTe' && c.memory.room === "E43N2");

    creepRoom = "E43N2";

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N2");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N2");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N2");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N2");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N2");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N2");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N2");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N2");

    if (n1HCo === m1HCoE43N2 && n2HCo === m2HCoE43N2 && nTCo === mTCoE43N2 && mTCoE43N2 !== 0
        || n1HLi === m1HLiE43N2 && n2HLi === m2HLiE43N2 && nTLi === mTLiE43N2  && mTLiE43N2 !== 0
        || n1HLi === m1HLiE43N2 && n2HLi === m2HLiE43N2 && nTLiTe === mTLiTeE43N2 && nTTe === mTTeE43N2 && mTTeE43N2 !== 0) {

        if (numberOfWallRepairerContainer < minimumNumberOfWallRepairerContainer) {
            // try to spawn one
            Game.spawns['E43N2'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'WallRepairerLink' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerCo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfWallRepairerLink < minimumNumberOfWallRepairerLink) {
            // try to spawn one
            Game.spawns['E43N2'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'WallRepairerLink' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerLi',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfWallRepairerTerminal < minimumNumberOfWallRepairerTerminal) {
            // try to spawn one
            Game.spawns['E43N2'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'WallRepairerTerminal' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerTe',
                        working: false,
                        room: creepRoom
                    }
                });
        }
    }


    //E42N2
    //E42N2


    minimumNumberOfWallRepairerContainer = 0;
    minimumNumberOfWallRepairerLink = 0;
    minimumNumberOfWallRepairerTerminal = 0;


    numberOfWallRepairerContainer = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerCo' && c.memory.room === "E42N2");
    numberOfWallRepairerLink = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerLi' && c.memory.room === "E42N2");
    numberOfWallRepairerTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerTe' && c.memory.room === "E42N2");

    creepRoom = "E42N2";

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E42N2");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E42N2");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E42N2");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E42N2");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E42N2");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E42N2");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E42N2");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E42N2");

    if (n1HCo === m1HCoE42N2 && n2HCo === m2HCoE42N2 && nTCo === mTCoE42N2 && mTCoE42N2 !== 0
        || n1HLi === m1HLiE42N2 && n2HLi === m2HLiE42N2 && nTLi === mTLiE42N2  && mTLiE42N2 !== 0
        || n1HLi === m1HLiE42N2 && n2HLi === m2HLiE42N2 && nTLiTe === mTLiTeE42N2 && nTTe === mTTeE42N2 && mTTeE42N2 !== 0) {
        if (numberOfWallRepairerContainer < minimumNumberOfWallRepairerContainer) {
            // try to spawn one
            Game.spawns['E42N2'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'WallRepairerLink' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerCo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfWallRepairerLink < minimumNumberOfWallRepairerLink) {
            // try to spawn one
            Game.spawns['E42N2'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'WallRepairerLink' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerLi',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfWallRepairerTerminal < minimumNumberOfWallRepairerTerminal) {
            // try to spawn one
            Game.spawns['E42N2'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'WallRepairerTerminal' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerTe',
                        working: false,
                        room: creepRoom
                    }
                });
        }
    }

    //E42N3
    //E42N3


    minimumNumberOfWallRepairerContainer = 0;
    minimumNumberOfWallRepairerLink = 0;
    minimumNumberOfWallRepairerTerminal = 0;


    numberOfWallRepairerContainer = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerCo' && c.memory.room === "E42N3");
    numberOfWallRepairerLink = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerLi' && c.memory.room === "E42N3");
    numberOfWallRepairerTerminal = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerTe' && c.memory.room === "E42N3");

    creepRoom = "E42N3";

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E42N3");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E42N3");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E42N3");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E42N3");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E42N3");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E42N3");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E42N3");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E42N3");

    if (n1HCo === m1HCoE42N3 && n2HCo === m2HCoE42N3 && nTCo === mTCoE42N3 && mTCoE42N3 !== 0
        || n1HLi === m1HLiE42N3 && n2HLi === m2HLiE42N3 && nTLi === mTLiE42N3  && mTLiE42N3 !== 0
        || n1HLi === m1HLiE42N3 && n2HLi === m2HLiE42N3 && nTLiTe === mTLiTeE42N3 && nTTe === mTTeE42N3 && mTTeE42N3 !== 0) {
        if (numberOfWallRepairerContainer < minimumNumberOfWallRepairerContainer) {
            // try to spawn one
            Game.spawns['E42N3'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'WallRepairerLink' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerCo',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfWallRepairerLink < minimumNumberOfWallRepairerLink) {
            // try to spawn one
            Game.spawns['E42N3'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'WallRepairerLink' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerLi',
                        working: false,
                        room: creepRoom
                    }
                });
        } else if (numberOfWallRepairerTerminal < minimumNumberOfWallRepairerTerminal) {
            // try to spawn one
            Game.spawns['E42N3'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE],
                'WallRepairerTerminal' + Game.time,
                {
                    memory: {
                        role: 'wallRepairerTe',
                        working: false,
                        room: creepRoom
                    }
                });
        }
    }







    //Extractor
    let minimumNumberOfExtractor;
    let numberOfExtractor;
    minimumNumberOfExtractor = 1;


    numberOfExtractor = _.sum(Game.creeps, (c) => c.memory.role === 'extractor' && c.memory.room === "E43N3");

    creepRoom = "E43N3";

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N3");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N3");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N3");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N3");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N3");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N3");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N3");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N3");

    if (n1HCo === m1HCoE43N3 && n2HCo === m2HCoE43N3 && nTCo === mTCoE43N3 && mTCoE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLi === mTLiE43N3  && mTLiE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLiTe === mTLiTeE43N3 && nTTe === mTTeE43N3 && mTTeE43N3 !== 0) {
        
        if (numberOfExtractor < minimumNumberOfExtractor) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                'Extractor' + Game.time,
                {
                    memory: {
                        role: 'extractor',
                        working: false,
                        room: creepRoom
                    }
                });
        }
    }




        minimumNumberOfExtractor = 1;


        numberOfExtractor = _.sum(Game.creeps, (c) => c.memory.role === 'extractor' && c.memory.room === "E43N2");

        creepRoom = "E43N2";

        n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N2");
        n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N2");
        n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N2");
        n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N2");

        nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N2");
        nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N2");
        nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N2");
        nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N2");

        if (n1HCo === m1HCoE43N2 && n2HCo === m2HCoE43N2 && nTCo === mTCoE43N2 && mTCoE43N2 !== 0
            || n1HLi === m1HLiE43N2 && n2HLi === m2HLiE43N2 && nTLi === mTLiE43N2  && mTLiE43N2 !== 0
            || n1HLi === m1HLiE43N2 && n2HLi === m2HLiE43N2 && nTLiTe === mTLiTeE43N2 && nTTe === mTTeE43N2 && mTTeE43N2 !== 0) {

            if (numberOfExtractor < minimumNumberOfExtractor) {
                // try to spawn one
                Game.spawns['E43N2'].spawnCreep(
                    [WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY,
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                    'Extractor' + Game.time,
                    {
                        memory: {
                            role: 'extractor',
                            working: false,
                            room: creepRoom
                        }
                    });
            }
        }



        minimumNumberOfExtractor = 1;


        numberOfExtractor = _.sum(Game.creeps, (c) => c.memory.role === 'extractor' && c.memory.room === "E42N2");

        creepRoom = "E42N2";

        n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E42N2");
        n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E42N2");
        n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E42N2");
        n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E42N2");

        nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E42N2");
        nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E42N2");
        nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E42N2");
        nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E42N2");

        if (n1HCo === m1HCoE42N2 && n2HCo === m2HCoE42N2 && nTCo === mTCoE42N2 && mTCoE42N2 !== 0
            || n1HLi === m1HLiE42N2 && n2HLi === m2HLiE42N2 && nTLi === mTLiE42N2  && mTLiE42N2 !== 0
            || n1HLi === m1HLiE42N2 && n2HLi === m2HLiE42N2 && nTLiTe === mTLiTeE42N2 && nTTe === mTTeE42N2 && mTTeE42N2 !== 0) {

            if (numberOfExtractor < minimumNumberOfExtractor) {
                // try to spawn one
                Game.spawns['E42N2'].spawnCreep(
                    [WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY,
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                    'Extractor' + Game.time,
                    {
                        memory: {
                            role: 'extractor',
                            working: false,
                            room: creepRoom
                        }
                    });
            }
        }



        minimumNumberOfExtractor = 0;


        numberOfExtractor = _.sum(Game.creeps, (c) => c.memory.role === 'extractor' && c.memory.room === "E42N3");

        creepRoom = "E42N3";

        n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E42N3");
        n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E42N3");
        n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E42N3");
        n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E42N3");

        nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E42N3");
        nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E42N3");
        nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E42N3");
        nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E42N3");

        if (n1HCo === m1HCoE42N3 && n2HCo === m2HCoE42N3 && nTCo === mTCoE42N3 && mTCoE42N3 !== 0
            || n1HLi === m1HLiE42N3 && n2HLi === m2HLiE42N3 && nTLi === mTLiE42N3  && mTLiE42N3 !== 0
            || n1HLi === m1HLiE42N3 && n2HLi === m2HLiE42N3 && nTLiTe === mTLiTeE42N3 && nTTe === mTTeE42N3 && mTTeE42N3 !== 0) {

            if (numberOfExtractor < minimumNumberOfExtractor) {
                // try to spawn one
                Game.spawns['E42N3'].spawnCreep(
                    [WORK, WORK, WORK,
                        CARRY, CARRY, CARRY, CARRY, CARRY,
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                    'Extractor' + Game.time,
                    {
                        memory: {
                            role: 'extractor',
                            working: false,
                            room: creepRoom
                        }
                    });
            }
        }
    //Long Distance

    let numberOfLongDistanceBuilderTeE42N1 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceBuilderTeE42N1' && c.memory.room === "E42N2");
    let minimumNumberOfLongDistanceBuilderTeE42N1 = 0;

    let numberOfLongDistanceBuilderTeE43N4 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceBuilderTeE43N4' && c.memory.room === "E43N3");
    let minimumNumberOfLongDistanceBuilderTeE43N4 = 0;

    let numberOfLongDistanceBuilderTeE44N3 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceBuilderTeE44N3' && c.memory.room === "E43N3");
    let minimumNumberOfLongDistanceBuilderTeE44N3 = 0;
    
    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N3");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N3");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N3");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N3");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N3");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N3");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N3");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N3");

    if (n1HCo === m1HCoE43N3 && n2HCo === m2HCoE43N3 && nTCo === mTCoE43N3 && mTCoE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLi === mTLiE43N3  && mTLiE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLiTe === mTLiTeE43N3 && nTTe === mTTeE43N3 && mTTeE43N3 !== 0) {

        creepRoom = "E42N2";
        if (numberOfLongDistanceBuilderTeE42N1 < minimumNumberOfLongDistanceBuilderTeE42N1) {
            // try to spawn one
            Game.spawns['E42N2'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                'LongDistanceBuilderE42N1' + Game.time,
                {
                    memory: {
                        role: 'longDistanceBuilderTeE42N1',
                        working: false,
                        room: creepRoom,
                        home: 'E42N2',
                        target: 'E42N1'
                    }
                });
        }
        else if (numberOfLongDistanceBuilderTeE43N4 < minimumNumberOfLongDistanceBuilderTeE43N4) {
            creepRoom = "E43N3";
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                'LongDistanceBuilderE43N4' + Game.time,
                {
                    memory: {
                        role: 'longDistanceBuilderTeE43N4',
                        working: false,
                        room: creepRoom,
                        home: 'E43N3',
                        target: 'E43N4'
                    }
                });
        }
        else if (numberOfLongDistanceBuilderTeE44N3 < minimumNumberOfLongDistanceBuilderTeE44N3) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [WORK, WORK, WORK, WORK,
                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                'LongDistanceBuilderE44N3' + Game.time,
                {
                    memory: {
                        role: 'longDistanceBuilderTeE44N3',
                        working: false,
                        room: creepRoom,
                        home: 'E43N3',
                        target: 'E44N3'
                    }
                });
        }

        
        
        
        
        
        
        let numberOfLongDistanceTransfererTeE42N1 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceTransfererTeE42N1' && c.memory.room === "E42N2");
        let minimumNumberOfLongDistanceTransfererTeE42N1 = 0;

        let numberOfLongDistanceTransfererTeE43N4 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceTransfererTeE43N4' && c.memory.room === "E43N3");
        let minimumNumberOfLongDistanceTransfererTeE43N4 = 0;

        let numberOfLongDistanceTransfererTeE44N3 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceTransfererTeE44N3' && c.memory.room === "E43N3");
        let minimumNumberOfLongDistanceTransfererTeE44N3 = 0;

        n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N3");
        n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N3");
        n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N3");
        n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N3");

        nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N3");
        nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N3");
        nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N3");
        nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N3");

        if (n1HCo === m1HCoE43N3 && n2HCo === m2HCoE43N3 && nTCo === mTCoE43N3 && mTCoE43N3 !== 0
            || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLi === mTLiE43N3  && mTLiE43N3 !== 0
            || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLiTe === mTLiTeE43N3 && nTTe === mTTeE43N3 && mTTeE43N3 !== 0) {

            creepRoom = "E42N2";
            if (numberOfLongDistanceTransfererTeE42N1 < minimumNumberOfLongDistanceTransfererTeE42N1) {
                // try to spawn one
                Game.spawns['E42N2'].spawnCreep(
                    [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                            MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'LongDistanceTransfererE42N1' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceTransfererTeE42N1',
                            working: false,
                            room: creepRoom,
                            home: 'E42N2',
                            target: 'E42N1'
                        }
                    });
            }

            creepRoom = "E43N3";
            if (numberOfLongDistanceTransfererTeE43N4 < minimumNumberOfLongDistanceTransfererTeE43N4) {
                // try to spawn one
                Game.spawns['E43N3'].spawnCreep(
                    [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'LongDistanceTransfererE43N4' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceTransfererTeE43N4',
                            working: false,
                            room: creepRoom,
                            home: 'E43N3',
                            target: 'E43N4'
                        }
                    });
            }

            creepRoom = "E43N3";
            if (numberOfLongDistanceTransfererTeE44N3 < minimumNumberOfLongDistanceTransfererTeE44N3) {
                // try to spawn one
                Game.spawns['E43N3'].spawnCreep(
                    [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                        MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],
                    'LongDistanceTransfererE44N3' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceTransfererTeE44N3',
                            working: false,
                            room: creepRoom,
                            home: 'E43N3',
                            target: 'E44N3'
                        }
                    });
            }
        }


        
        
        
        
        
        let minimumNumberOfLongDistanceHarvesterCoE42N1;
        let numberOfLongDistanceHarvesterCoE42N1;
        numberOfLongDistanceHarvesterCoE42N1 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceHarvesterCoE42N1' && c.memory.room === "E42N2");
        minimumNumberOfLongDistanceHarvesterCoE42N1 = 0;


        let minimumNumberOfLongDistanceHarvesterCoE43N41;
        let numberOfLongDistanceHarvesterCoE43N41;
        numberOfLongDistanceHarvesterCoE43N41 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceHarvesterCoE43N41' && c.memory.room === "E43N3");
        minimumNumberOfLongDistanceHarvesterCoE43N41 = 0;

        let minimumNumberOfLongDistanceHarvesterCoE43N42;
        let numberOfLongDistanceHarvesterCoE43N42;
        numberOfLongDistanceHarvesterCoE43N42 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceHarvesterCoE43N42' && c.memory.room === "E43N3");
        minimumNumberOfLongDistanceHarvesterCoE43N42 = 0;

        
        let numberOfLongDistanceHarvesterCoE44N31 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceHarvesterCoE44N31' && c.memory.room === "E43N3");
        let minimumNumberOfLongDistanceHarvesterCoE44N31 = 0;

        let numberOfLongDistanceHarvesterCoE44N32 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceHarvesterCoE44N32' && c.memory.room === "E43N3");
        let minimumNumberOfLongDistanceHarvesterCoE44N32 = 1;

        n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N3");
        n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N3");
        n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N3");
        n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N3");

        nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N3");
        nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N3");
        nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N3");
        nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N3");

        if (n1HCo === m1HCoE43N3 && n2HCo === m2HCoE43N3 && nTCo === mTCoE43N3 && mTCoE43N3 !== 0
            || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLi === mTLiE43N3  && mTLiE43N3 !== 0
            || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLiTe === mTLiTeE43N3 && nTTe === mTTeE43N3 && mTTeE43N3 !== 0) {

            creepRoom = "E42N2";
            if (numberOfLongDistanceHarvesterCoE42N1 < minimumNumberOfLongDistanceHarvesterCoE42N1) {
                // try to spawn one
                Game.spawns['E42N2'].spawnCreep(
                    [WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY,
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE],
                    'LongDistanceHarvesterE42N1' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceHarvesterCoE42N1',
                            working: false,
                            room: creepRoom,
                            home: 'E42N2',
                            target: 'E42N1',
                            sourceId: '5bbcaf719099fc012e63a9d4'
                        }
                    });
            }

            creepRoom = "E43N3";
            if (numberOfLongDistanceHarvesterCoE43N41 < minimumNumberOfLongDistanceHarvesterCoE43N41) {
                // try to spawn one
                Game.spawns['E43N3'].spawnCreep(
                    [WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY,
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE],
                    'LongDistanceHarvesterE43N4' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceHarvesterCoE43N41',
                            working: false,
                            room: creepRoom,
                            home: 'E43N3',
                            target: 'E43N4',
                            sourceId: '5bbcaf859099fc012e63ab55'
                        }
                    });
            }
            creepRoom = "E43N3";
            if (numberOfLongDistanceHarvesterCoE43N42 < minimumNumberOfLongDistanceHarvesterCoE43N42) {
                // try to spawn one
                Game.spawns['E43N3'].spawnCreep(
                    [WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY,
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE],
                    'LongDistanceHarvesterE43N4' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceHarvesterCoE43N42',
                            working: false,
                            room: creepRoom,
                            home: 'E43N3',
                            target: 'E43N4',
                            sourceId: '5bbcaf859099fc012e63ab53'
                        }
                    });
            }


            creepRoom = "E43N3";
            if (numberOfLongDistanceHarvesterCoE44N31 < minimumNumberOfLongDistanceHarvesterCoE44N31) {
                // try to spawn one
                Game.spawns['E43N3'].spawnCreep(
                    [WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY,
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE],
                    'LongDistanceHarvesterE44N3' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceHarvesterCoE44N31',
                            working: false,
                            room: creepRoom,
                            home: 'E43N3',
                            target: 'E44N3',
                            sourceId: '5bbcaf969099fc012e63ad44'
                        }
                    });
            }
            creepRoom = "E43N3";
            if (numberOfLongDistanceHarvesterCoE44N32 < minimumNumberOfLongDistanceHarvesterCoE44N32) {
                // try to spawn one
                Game.spawns['E43N3'].spawnCreep(
                    [WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                        CARRY, CARRY,
                        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE],
                    'LongDistanceHarvesterE44N3' + Game.time,
                    {
                        memory: {
                            role: 'longDistanceHarvesterCoE44N32',
                            working: false,
                            room: creepRoom,
                            home: 'E43N3',
                            target: 'E44N3',
                            sourceId: '5bbcaf969099fc012e63ad45'
                        }
                    });
            }
        }
        
    }



    // CLAIMER
    creepRoom = "E43N3";
    let claimer;

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N3");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N3");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N3");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N3");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N3");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N3");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N3");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N3");

    if (n1HCo === m1HCoE43N3 && n2HCo === m2HCoE43N3 && nTCo === mTCoE43N3 && mTCoE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLi === mTLiE43N3  && mTLiE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLiTe === mTLiTeE43N3 && nTTe === mTTeE43N3 && mTTeE43N3 !== 0) {

    }





    //RESERVER

    n1HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo1' && c.memory.room === "E43N3");
    n2HCo = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo2' && c.memory.room === "E43N3");
    n1HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi1' && c.memory.room === "E43N3");
    n2HLi = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi2' && c.memory.room === "E43N3");

    nTCo = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo' && c.memory.room === "E43N3");
    nTLi = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi' && c.memory.room === "E43N3");
    nTLiTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLiTe' && c.memory.room === "E43N3");
    nTTe = _.sum(Game.creeps, (c) => c.memory.role === 'transfererTe' && c.memory.room === "E43N3");

    if (n1HCo === m1HCoE43N3 && n2HCo === m2HCoE43N3 && nTCo === mTCoE43N3 && mTCoE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLi === mTLiE43N3  && mTLiE43N3 !== 0
        || n1HLi === m1HLiE43N3 && n2HLi === m2HLiE43N3 && nTLiTe === mTLiTeE43N3 && nTTe === mTTeE43N3 && mTTeE43N3 !== 0) {

        let minimumNumberOfReserversE42N1 = 0;
        let numberOfReserversE42N1 = _.sum(Game.creeps, (c) => c.memory.role === 'reserverE42N1' && c.memory.room === "E42N2");
        creepRoom = 'E42N2';
        if (numberOfReserversE42N1 < minimumNumberOfReserversE42N1) {
            // try to spawn one
            Game.spawns['E42N2'].spawnCreep(
                [CLAIM,CLAIM,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,],
                'Reserver' + Game.time,
                {
                    memory: {
                        role: 'reserverE42N1',
                        working: false,
                        room: creepRoom,
                        target: 'E42N1'
                    }
                });
        }

        let minimumNumberOfReserversE43N4 = 0;
        let numberOfReserversE43N4 = _.sum(Game.creeps, (c) => c.memory.role === 'reserverE43N4' && c.memory.room === "E43N3");
        creepRoom = 'E43N3';
        if (numberOfReserversE43N4 < minimumNumberOfReserversE43N4) { //&& Game.rooms['E43N4'].controller.reservation < 4000) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [CLAIM,CLAIM,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                'Reserver' + Game.time,
                {
                    memory: {
                        role: 'reserverE43N4',
                        working: false,
                        room: creepRoom,
                        target: 'E43N4'
                    }
                });
        }

        let minimumNumberOfReserversE44N3 = 0;
        let numberOfReserversE44N3 = _.sum(Game.creeps, (c) => c.memory.role === 'reserverE44N3' && c.memory.room === "E43N3");
        creepRoom = 'E43N3';
        if (numberOfReserversE44N3 < minimumNumberOfReserversE44N3) { //&& Game.rooms['E43N4'].controller.reservation < 4000) {
            // try to spawn one
            Game.spawns['E43N3'].spawnCreep(
                [CLAIM,CLAIM,
                    MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
                'Reserver' + Game.time,
                {
                    memory: {
                        role: 'reserverE44N3',
                        working: false,
                        room: creepRoom,
                        target: 'E44N3'
                    }
                });
        }
    }

    if(!Memory.stats){ Memory.stats = {} }
    Memory.stats['cpu.getUsed'] = Game.cpu.getUsed();
    Memory.stats['cpu.limit'] = Game.cpu.limit;
    Memory.stats['cpu.bucket'] = Game.cpu.bucket;
    Memory.stats['cpu.tickLimit'] = Game.cpu.tickLimit;

    Memory.stats['gcl.progress'] = Game.gcl.progress;
    Memory.stats['gcl.progressTotal'] = Game.gcl.progressTotal;
    Memory.stats['gcl.level'] = Game.gcl.level;

    Memory.stats['te.total'] = terminalTotal;
    Memory.stats['te.max'] = terminalTMa;
    Memory.stats['te.min'] = terminalTMi;

    //Memory.stats['cpu.usage'] = console.log(Game.profiler.output());
    Memory.stats['heap'] = Game.cpu.getHeapStatistics();









        _.forEach(Object.keys(Game.rooms), function(roomName){
        let room = Game.rooms[roomName];

        if(room.controller && room.controller.my){
            Memory.stats['rooms.' + roomName + '.rcl.level'] = room.controller.level;
            Memory.stats['rooms.' + roomName + '.rcl.progress'] = room.controller.progress;
            Memory.stats['rooms.' + roomName + '.rcl.progressTotal'] = room.controller.progressTotal;

            Memory.stats['rooms.' + roomName + '.spawn.energy'] = room.energyAvailable;
            Memory.stats['rooms.' + roomName + '.spawn.energyTotal'] = room.energyCapacityAvailable;

            if(room.storage){
                Memory.stats['rooms.' + roomName + '.storage.energy'] = room.storage.store.energy;
            }
            if(room.terminal){
                Memory.stats['rooms.' + roomName + '.terminal.energy'] = room.terminal.store.energy;
                }
            }
        });
        //cpu = Game.cpu.getUsed() - cpu;
        //Memory.stats['cpu.test.cpu2'] = cpu;
        //console.log('End: ' + cpu)
    });
};
