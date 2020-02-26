//Import roles
require('prototype.tower');
//const roleStarter = require('role.starter');
const roleHarvesterContainer = require('role.harvesterContainer');
const roleHarvesterLink = require('role.harvesterLink');

const roleExtractor = require('role.extractor');


const roleUpgraderContainer = require('role.upgraderContainer');
const roleUpgraderLink = require('role.upgraderLink');


const roleTransfererContainer = require('role.transfererContainer');
const roleTransfererLink = require('role.transfererLink');


const roleBuilderContainer = require('role.builderContainer');
const roleBuilderLink= require('role.builderLink');
const roleBuilderSource = require('role.builderSources');


const roleWallrepairerContainer = require('role.wallrepairerContainer');
const roleWallrepairerLink = require('role.wallrepairerLink');


const roleRepairerContainer = require('role.repairerContainer');
const roleRepairerLink = require('role.repairerLink');


const roleTombstonePickerContainer = require('role.tombstonePickerContainer');
const roleTombstonePickerLink = require('role.tombstonePickerLink');


const roleClaimer = require('role.claimer');

const roleLongdistanceBuilderContainer = require('role.longDistanceBuilderContainer');
const roleLongdistanceBuilderLink = require('role.longDistanceBuilderLink');


const roleLongDistanceHarvesterContainer = require('role.longDistanceHarvesterContainer');
const roleLongDistanceHarvesterLink = require('role.longDistanceHarvesterLink');


const roleLongDistanceUpgraderContainer = require('role.longDistanceHarvesterUpgraderContainer');
const roleLongDistanceUpgraderLink = require('role.longDistanceHarvesterUpgraderLink');




module.exports.loop = function () {

    const linkFrom11 = Game.getObjectById("5d2d8e9adbfe1b628e83c414");
    const linkTo1 = Game.getObjectById("5d2d8745e9ffb93fbdf51d0c");
    const linkFrom12 = Game.getObjectById("5d36b82aab0b117cdc03b16b");
    linkFrom11.transferEnergy(linkTo1);
    linkFrom12.transferEnergy(linkTo1);


    const linkFrom21 = Game.getObjectById("5d32269ed4f3583fee902949");
    const linkTo2 = Game.getObjectById("5d389279496c40170746c670");
    const linkFrom22 = Game.getObjectById("5d38856cc99c215de2febacd");
    linkFrom21.transferEnergy(linkTo2);
    linkFrom22.transferEnergy(linkTo2);


    const linkFrom31 = Game.getObjectById("5d38a7eb5c57a23fff55bb4c");
    const linkTo3 = Game.getObjectById("5d388e83c08d9e7cff86ec68");
    const linkFrom32 = Game.getObjectById("5d31cb367e7ab11a2dcc4cfe");
    linkFrom31.transferEnergy(linkTo3);
    linkFrom32.transferEnergy(linkTo3);

    const terminal1 = Game.getObjectById("5d3953a5f63ff85df6c403a9");
    const terminal2 = Game.getObjectById("5d397e2c7b54a34625aa588e");
    const terminal3 = Game.getObjectById("5d395c207a1f04171f834dd0");

    // find all towers
    let towers = _.filter(Game.structures, s => s.structureType === STRUCTURE_TOWER);
    // for each tower
    for (let tower of towers) {
        // run tower logic
        tower.defend();
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



        if (creep.memory.role === 'claimer') {
            roleClaimer.run(creep);
        }



        //LONG DISTANCE

        if (creep.memory.role === 'longDistanceHarvesterLiE42N1') {
            roleLongDistanceHarvesterLink.run(creep);
        }



        //E43N3
        //STARTERS
        if (creep.memory.role === 'SharvesterCo11') {
            roleHarvesterContainer.run(creep);
        }
        if (creep.memory.role === 'SharvesterCo12') {
            roleHarvesterContainer.run(creep);
        }

        if (creep.memory.role === 'SharvesterLi11') {
            roleHarvesterLink.run(creep);
        }
        if (creep.memory.role === 'SharvesterLi12') {
            roleHarvesterLink.run(creep);
        }

        if (creep.memory.role === 'StransfererCo1') {
            roleTransfererContainer.run(creep);
        }
        if (creep.memory.role === 'StransfererLi1') {
            roleTransfererLink.run(creep);
        }

        //NORMAL

        if (creep.memory.role === 'harvesterC11') {
            roleHarvesterContainer.run(creep);
        }
        if (creep.memory.role === 'harvesterC12') {
            roleHarvesterContainer.run(creep);
        }

        if (creep.memory.role === 'harvesterLi11') {
            roleHarvesterLink.run(creep);
        }
        if (creep.memory.role === 'harvesterLi12') {
            roleHarvesterLink.run(creep);
        }

        if (creep.memory.role === 'extractor1') {
            roleExtractor.run(creep);
        }



        if (creep.memory.role === 'upgraderCo1') {
            roleUpgraderContainer.run(creep);
        }
        if (creep.memory.role === 'upgraderLi1') {
            roleUpgraderLink.run(creep);
        }



        if (creep.memory.role === 'transfererCo1') {
            roleTransfererContainer.run(creep);
        }
        if (creep.memory.role === 'transfererLi1') {
            roleTransfererLink.run(creep);
        }



        if (creep.memory.role === 'builderCo1') {
            roleBuilderContainer.run(creep);
        }
        if (creep.memory.role === 'builderLi1') {
            roleBuilderLink.run(creep);
        }
        if (creep.memory.role === 'builderSo1') {
            roleBuilderSource.run(creep);
        }


        if (creep.memory.role === 'wallRepairerCo1') {
            roleWallrepairerContainer.run(creep);
        }
        if (creep.memory.role === 'wallRepairerLi1') {
            roleWallrepairerLink.run(creep);
        }


        if (creep.memory.role === 'tombstonePickerCo1') {
            roleTombstonePickerContainer.run(creep);
        }
        if (creep.memory.role === 'tombstonePickerLi1') {
            roleTombstonePickerLink.run(creep);
        }



        if (creep.memory.role === 'repairerCo1') {
            roleRepairerContainer.run(creep);
        }
        if (creep.memory.role === 'repairerLi1') {
            roleRepairerLink.run(creep);
        }


        if (creep.memory.role === 'longDistanceBuilderLiE42N31') {
            roleLongdistanceBuilderLink.run(creep);
        }



        //E43N2
        //STARTERS
        if (creep.memory.role === 'SharvesterCo21') {
            roleHarvesterContainer.run(creep);
        }
        if (creep.memory.role === 'SharvesterCo22') {
            roleHarvesterContainer.run(creep);
        }

        if (creep.memory.role === 'SharvesterLi21') {
            roleHarvesterLink.run(creep);
        }
        if (creep.memory.role === 'SharvesterLi22') {
            roleHarvesterLink.run(creep);
        }

        if (creep.memory.role === 'StransfererCo2') {
            roleTransfererContainer.run(creep);
        }
        if (creep.memory.role === 'StransfererLi2') {
            roleTransfererLink.run(creep);
        }

        //NORMAL

        if (creep.memory.role === 'harvesterC21') {
            roleHarvesterContainer.run(creep);
        }
        if (creep.memory.role === 'harvesterC22') {
            roleHarvesterContainer.run(creep);
        }

        if (creep.memory.role === 'harvesterLi21') {
            roleHarvesterLink.run(creep);
        }
        if (creep.memory.role === 'harvesterLi22') {
            roleHarvesterLink.run(creep);
        }

        if (creep.memory.role === 'extractor2') {
            roleExtractor.run(creep);
        }



        if (creep.memory.role === 'upgraderCo2') {
            roleUpgraderContainer.run(creep);
        }
        if (creep.memory.role === 'upgraderLi2') {
            roleUpgraderLink.run(creep);
        }



        if (creep.memory.role === 'transfererCo2') {
            roleTransfererContainer.run(creep);
        }
        if (creep.memory.role === 'transfererLi2') {
            roleTransfererLink.run(creep);
        }



        if (creep.memory.role === 'builderCo2') {
            roleBuilderContainer.run(creep);
        }
        if (creep.memory.role === 'builderLi2') {
            roleBuilderLink.run(creep);
        }
        if (creep.memory.role === 'builderSo2') {
            roleBuilderSource.run(creep);
        }


        if (creep.memory.role === 'wallRepairerCo2') {
            roleWallrepairerContainer.run(creep);
        }
        if (creep.memory.role === 'wallRepairerLi2') {
            roleWallrepairerLink.run(creep);
        }


        if (creep.memory.role === 'tombstonePickerCo2') {
            roleTombstonePickerContainer.run(creep);
        }
        if (creep.memory.role === 'tombstonePickerLi2') {
            roleTombstonePickerLink.run(creep);
        }



        if (creep.memory.role === 'repairerCo2') {
            roleRepairerContainer.run(creep);
        }
        if (creep.memory.role === 'repairerLi2') {
            roleRepairerLink.run(creep);
        }


        //E42N2
        //STARTERS
        if (creep.memory.role === 'SharvesterCo31') {
            roleHarvesterContainer.run(creep);
        }
        if (creep.memory.role === 'SharvesterCo32') {
            roleHarvesterContainer.run(creep);
        }

        if (creep.memory.role === 'SharvesterLi31') {
            roleHarvesterLink.run(creep);
        }
        if (creep.memory.role === 'SharvesterLi32') {
            roleHarvesterLink.run(creep);
        }

        if (creep.memory.role === 'StransfererCo3') {
            roleTransfererContainer.run(creep);
        }
        if (creep.memory.role === 'StransfererLi3') {
            roleTransfererLink.run(creep);
        }

        //NORMAL

        if (creep.memory.role === 'harvesterC31') {
            roleHarvesterContainer.run(creep);
        }
        if (creep.memory.role === 'harvesterC32') {
            roleHarvesterContainer.run(creep);
        }

        if (creep.memory.role === 'harvesterLi31') {
            roleHarvesterLink.run(creep);
        }
        if (creep.memory.role === 'harvesterLi32') {
            roleHarvesterLink.run(creep);
        }

        if (creep.memory.role === 'extractor3') {
            roleExtractor.run(creep);
        }



        if (creep.memory.role === 'upgraderCo3') {
            roleUpgraderContainer.run(creep);
        }
        if (creep.memory.role === 'upgraderLi3') {
            roleUpgraderLink.run(creep);
        }



        if (creep.memory.role === 'transfererCo3') {
            roleTransfererContainer.run(creep);
        }
        if (creep.memory.role === 'transfererLi3') {
            roleTransfererLink.run(creep);
        }



        if (creep.memory.role === 'builderCo3') {
            roleBuilderContainer.run(creep);
        }
        if (creep.memory.role === 'builderLi3') {
            roleBuilderLink.run(creep);
        }
        if (creep.memory.role === 'builderSo3') {
            roleBuilderSource.run(creep);
        }


        if (creep.memory.role === 'wallRepairerCo3') {
            roleWallrepairerContainer.run(creep);
        }
        if (creep.memory.role === 'wallRepairerLi3') {
            roleWallrepairerLink.run(creep);
        }


        if (creep.memory.role === 'tombstonePickerCo3') {
            roleTombstonePickerContainer.run(creep);
        }
        if (creep.memory.role === 'tombstonePickerLi3') {
            roleTombstonePickerLink.run(creep);
        }



        if (creep.memory.role === 'repairerCo3') {
            roleRepairerContainer.run(creep);
        }
        if (creep.memory.role === 'repairerLi3') {
            roleRepairerLink.run(creep);
        }


        if (creep.memory.role === 'longDistanceBuilderLiE42N33') {
            roleLongdistanceBuilderLink.run(creep);
        }


        //E42N3
        //STARTERS
        if (creep.memory.role === 'SharvesterCo41') {
            roleHarvesterContainer.run(creep);
        }
        if (creep.memory.role === 'SharvesterCo42') {
            roleHarvesterContainer.run(creep);
        }

        if (creep.memory.role === 'SharvesterLi41') {
            roleHarvesterLink.run(creep);
        }
        if (creep.memory.role === 'SharvesterLi42') {
            roleHarvesterLink.run(creep);
        }

        if (creep.memory.role === 'StransfererCo4') {
            roleTransfererContainer.run(creep);
        }
        if (creep.memory.role === 'StransfererLi4') {
            roleTransfererLink.run(creep);
        }

        //NORMAL

        if (creep.memory.role === 'harvesterC41') {
            roleHarvesterContainer.run(creep);
        }
        if (creep.memory.role === 'harvesterC42') {
            roleHarvesterContainer.run(creep);
        }

        if (creep.memory.role === 'harvesterLi41') {
            roleHarvesterLink.run(creep);
        }
        if (creep.memory.role === 'harvesterLi42') {
            roleHarvesterLink.run(creep);
        }

        if (creep.memory.role === 'extractor4') {
            roleExtractor.run(creep);
        }



        if (creep.memory.role === 'upgraderCo4') {
            roleUpgraderContainer.run(creep);
        }
        if (creep.memory.role === 'upgraderLi4') {
            roleUpgraderLink.run(creep);
        }



        if (creep.memory.role === 'transfererCo4') {
            roleTransfererContainer.run(creep);
        }
        if (creep.memory.role === 'transfererLi4') {
            roleTransfererLink.run(creep);
        }



        if (creep.memory.role === 'builderCo4') {
            roleBuilderContainer.run(creep);
        }
        if (creep.memory.role === 'builderLi4') {
            roleBuilderLink.run(creep);
        }
        if (creep.memory.role === 'builderSo4') {
            roleBuilderSource.run(creep);
        }


        if (creep.memory.role === 'wallRepairerCo4') {
            roleWallrepairerContainer.run(creep);
        }
        if (creep.memory.role === 'wallRepairerLi4') {
            roleWallrepairerLink.run(creep);
        }


        if (creep.memory.role === 'tombstonePickerCo4') {
            roleTombstonePickerContainer.run(creep);
        }
        if (creep.memory.role === 'tombstonePickerLi4') {
            roleTombstonePickerLink.run(creep);
        }



        if (creep.memory.role === 'repairerCo4') {
            roleRepairerContainer.run(creep);
        }
        if (creep.memory.role === 'repairerLi4') {
            roleRepairerLink.run(creep);
        }
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
    /*let towers41 = Game.rooms.E42N3.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType === STRUCTURE_TOWER
    });
    for (let tower41 of towers41) {
        let targetRepair41 = tower41.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.hits < 250000
        });
        if (targetRepair41 !== undefined) {
            tower41.repair(targetRepair41);
        }
    }*/





    //If possible to spawn normal creeps not starters
    const harvester1 =
        Game.spawns['E43N3'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY],
            'Harvester' + Game.time,
            { dryRun: true});
    const transferer1 =
        Game.spawns['E43N3'].spawnCreep(
            [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE, MOVE],
            'Transferer' + Game.time,
            { dryRun: true});

    const harvester2 =
        Game.spawns['E43N2'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY],
            'Harvester' + Game.time,
            { dryRun: true});
    const transferer2 =
        Game.spawns['E43N2'].spawnCreep(
            [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE, MOVE, MOVE],
            'Transferer' + Game.time,
            { dryRun: true});


    const harvester3 =
        Game.spawns['E42N2'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY],
            'Harvester' + Game.time,
            { dryRun: true});
    const transferer3 =
        Game.spawns['E42N2'].spawnCreep(
            [CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,
                MOVE, MOVE, MOVE],
            'Transferer' + Game.time,
            { dryRun: true});


    const harvester4 =
        Game.spawns['E42N3'].spawnCreep(
            [MOVE,
                WORK,WORK,
                CARRY],
            'Harvester' + Game.time,
            { dryRun: true});
    const transferer4 =
        Game.spawns['E42N3'].spawnCreep(
            [CARRY,CARRY,CARRY,CARRY,
                MOVE, MOVE],
            'Transferer' + Game.time,
            { dryRun: true});




    //                  ROOM E43N3
    //                  ROOM E43N3

    //minimum numbers of creeps for each role
    const minimumNumberOf11HarvestersContainer = 0;
    const minimumNumberOf12HarvestersContainer = 0;

    const minimumNumberOf11HarvestersLink = 1;
    const minimumNumberOf12HarvestersLink = 1;

    const minimumNumberOf1Extractor = 0;


    const minimumNumberOf1UpgradersContainer = 0;
    const minimumNumberOf1UpgradersLink = 1;


    const minimumNumberOf1TransferersContainer = 0;
    const minimumNumberOf1TransferersLink = 1;


    const minimumNumberOf1BuildersContainer = 0;
    const minimumNumberOf1BuildersLink = 0;
    const minimumNumberOf1BuildersSource = 0;


    const minimumNumberOf1WallRepairersContainer = 0;
    const minimumNumberOf1WallRepairersLink = 0;

    const minimumNumberOf1RepairersContainer = 0;
    const minimumNumberOf1RepairersLink = 0;

    const minimumNumberOf1TombstonePickerContainer = 0;
    const minimumNumberOf1TombstonePickerLink = 1;


    const minimumNumberOf1LongdistanceBuilderE42N3Link = 0;



    //NUMBER

    const numberOf11SHarvestersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'SharvesterCo11');
    const numberOf12SHarvestersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'SharvesterCo12');

    const numberOf1STransfersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'StransfererCo1');


    const numberOf11SHarvestersLink = _.sum(Game.creeps, (c) => c.memory.role === 'SharvesterLi11');
    const numberOf12SHarvestersLink = _.sum(Game.creeps, (c) => c.memory.role === 'SharvesterLi12');

    const numberOf1STransfersLink = _.sum(Game.creeps, (c) => c.memory.role === 'StransfererLi1');

    //NORMAL

    const numberOf11HarvestersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo11');
    const numberOf12HarvestersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo12');

    const numberOf11HarvestersLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi11');
    const numberOf12HarvestersLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi12');

    const numberOf1Extractor = _.sum(Game.creeps, (c) => c.memory.role === 'extractor1');


    const numberOf1UpgradersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderCo1');
    const numberOf1UpgradersLink = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderLi1');


    const numberOf1TransferersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo1');
    const numberOf1TransferersLink = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi1');


    const numberOf1BuildersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'builderCo1');
    const numberOf1BuildersLink = _.sum(Game.creeps, (c) => c.memory.role === 'builderLi1');
    const numberOf1BuildersSource = _.sum(Game.creeps, (c) => c.memory.role === 'builderSo1');


    const numberOf1WallRepairersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerCo1');
    const numberOf1WallRepairersLink = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerLi1');

    const numberOf1RepairersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'repairerCo1');
    const numberOf1RepairersLink = _.sum(Game.creeps, (c) => c.memory.role === 'repairerLi1');


    const numberOf1TombstonePickerContainer = _.sum(Game.creeps, (c) => c.memory.role === 'tombstonePickerCo1');
    const numberOf1TombstonePickerLink = _.sum(Game.creeps, (c) => c.memory.role === 'tombstonePickerLi1');


    const numberOf1LongdistanceBuilderE42N3Link = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceBuilderLiE42N31');
    //STARTER CREEPS

    if (harvester1 === ERR_NOT_ENOUGH_ENERGY && numberOf11HarvestersContainer === 0 && numberOf11SHarvestersContainer <1 && minimumNumberOf11HarvestersContainer !== 0) {
        Game.spawns['E43N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '11SHarvesterContainer' + Game.time,
            {memory: {
                    role: 'SharvesterCo11',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab57"}});
    }
    else if (harvester1 === ERR_NOT_ENOUGH_ENERGY && numberOf12HarvestersContainer === 0 && numberOf12SHarvestersContainer <1 && minimumNumberOf12HarvestersContainer !== 0) {
        Game.spawns['E43N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '12SHarvesterContainer' + Game.time,
            {memory: {
                    role: 'SharvesterCo12',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab59"}});
    }
    else if (transferer1 === ERR_NOT_ENOUGH_ENERGY && numberOf1TransferersContainer === 0 && numberOf1STransfersContainer <3 && minimumNumberOf1TransferersContainer !== 0) {
        Game.spawns['E43N3'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            '1STransfererContainer' + Game.time,
            {memory: {
                    role: 'StransfererCo1',
                    working: false,
                    pickLink: "5cbcb2f0991d6a2456adcfbc",
                    deliverContainer: "5d2d8745e9ffb93fbdf51d0c"}});
    }


    else if (harvester1 === ERR_NOT_ENOUGH_ENERGY && numberOf11HarvestersLink === 0 && numberOf11SHarvestersLink <1 && minimumNumberOf11HarvestersLink !== 0)  {
        Game.spawns['E43N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '11SHarvesterContainer' + Game.time,
            {memory: {
                    role: 'SharvesterLi11',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab57"}});
    }
    else if (harvester1 === ERR_NOT_ENOUGH_ENERGY && numberOf12HarvestersLink === 0 && numberOf12SHarvestersLink <1 && minimumNumberOf12HarvestersLink !== 0) {
        Game.spawns['E43N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '12SHarvesterLink' + Game.time,
            {memory: {
                    role: 'SharvesterLi12',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab59"}});
    }
    else if (transferer1 === ERR_NOT_ENOUGH_ENERGY && numberOf1TransferersLink === 0 && numberOf1STransfersLink <3 && minimumNumberOf1TransferersLink !== 0) {
        Game.spawns['E43N3'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            '1STransfererLink' + Game.time,
            {memory: {
                    role: 'StransfererLi1',
                    working: false,
                    deliverTerminal: "5d3953a5f63ff85df6c403a9"}});
    }

    //NORMAL CREEPS

    else if (numberOf11HarvestersContainer < minimumNumberOf11HarvestersContainer) {
        Game.spawns['E43N3'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY],
            '11HarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo11',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab57"}});
    }
    else if (numberOf12HarvestersContainer < minimumNumberOf12HarvestersContainer) {
        Game.spawns['E43N3'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY],
            '12HarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo12',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab59"}});
    }

    else if (numberOf11HarvestersLink < minimumNumberOf11HarvestersLink) {
        Game.spawns['E43N3'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY],
            '11HarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi11',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab57"}});
    }
    else if (numberOf12HarvestersLink < minimumNumberOf12HarvestersLink) {
        Game.spawns['E43N3'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK, WORK,
                CARRY],
            '12HarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi12',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab59"}});
    }

    else if (numberOf1Extractor < minimumNumberOf1Extractor) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK, WORK, WORK, WORK,
                CARRY,
                MOVE, MOVE, MOVE],
            '1Extractor' + Game.time,
            {
                memory: {
                    role: 'extractor1',
                    working: false,
                    sourceId: "5bbcb678d867df5e542078a4",
                    deliverContainer: "5d2e4331ae29775e0162c7da"}});
    }


    else if (numberOf1TransferersContainer < minimumNumberOf1TransferersContainer) {
        Game.spawns['E43N3'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,MOVE,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
            '1TransfererContainer' + Game.time,
            {
                memory: {
                    role: 'transfererCo1',
                    working: false,
                    deliverContainer: "5d2d8745e9ffb93fbdf51d0c"}});
    }
    else if (numberOf1TransferersLink < minimumNumberOf1TransferersLink) {
        Game.spawns['E43N3'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,MOVE,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
            '1TransfererLink' + Game.time,
            {
                memory: {
                    role: 'transfererLi1',
                    working: false,
                    deliverTerminal: "5d3953a5f63ff85df6c403a9"}});
    }


    else if (numberOf1UpgradersContainer < minimumNumberOf1UpgradersContainer) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK, WORK, WORK, WORK,WORK, WORK, WORK, WORK, WORK,
                CARRY,
                MOVE, MOVE],
            'Upgrader1Container' + Game.time,
            {
                memory: {
                    role: 'upgraderCo1',
                    working: false,
                    pickContainer: "5d2d8745e9ffb93fbdf51d0c"}});
    }
    else if (numberOf1UpgradersLink < minimumNumberOf1UpgradersLink) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK, WORK, WORK, WORK,WORK, WORK, WORK, WORK, WORK,
                CARRY,
                MOVE, MOVE],
            'Upgrader1Link' + Game.time,
            {
                memory: {
                    role: 'upgraderLi1',
                    working: false,
                    pickLink: "5d2d8745e9ffb93fbdf51d0c"}});
    }


    else if (numberOf1BuildersContainer < minimumNumberOf1BuildersContainer) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY,CARRY,
                MOVE, MOVE,MOVE,MOVE],
            '1BuilderContainer' + Game.time,
            {
                memory: {
                    role: 'builderCo1',
                    working: false}});
    }
    else if (numberOf1BuildersLink < minimumNumberOf1BuildersLink) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY,CARRY,
                MOVE, MOVE,MOVE,MOVE],
            '1BuilderLink' + Game.time,
            {
                memory: {
                    role: 'builderLi1',
                    working: false}});
    }
    else if (numberOf1BuildersSource < minimumNumberOf1BuildersSource) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY,CARRY,
                MOVE, MOVE,MOVE,MOVE],
            '1BuilderSource' + Game.time,
            {
                memory: {
                    role: 'builderSo1',
                    working: false}});
    }

    else if (numberOf1TombstonePickerContainer < minimumNumberOf1TombstonePickerContainer) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [CARRY, CARRY, CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,
                MOVE, MOVE],
            '1TombstonePickerContainer' + Game.time,
            {
                memory: {
                    role: 'tombstonePickerCo1',
                    working: false}});
    }
    else if (numberOf1TombstonePickerLink < minimumNumberOf1TombstonePickerLink) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [CARRY, CARRY, CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,
                MOVE, MOVE],
            '1TombstonePickerLink' + Game.time,
            {
                memory: {
                    role: 'tombstonePickerLi1',
                    working: false}});
    }


    else if (numberOf1RepairersContainer < minimumNumberOf1RepairersContainer) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK,
                CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '1RepairerContainer' + Game.time,
            {
                memory: {
                    role: 'repairerCo1',
                    working: false}});
    }
    else if (numberOf1RepairersLink < minimumNumberOf1RepairersLink) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK,
                CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '1RepairerLink' + Game.time,
            {
                memory: {
                    role: 'repairerLi1',
                    working: false}});
    }


    else if (numberOf1WallRepairersContainer < minimumNumberOf1WallRepairersContainer) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '1WallRepairerContainer' + Game.time,
            {
                memory: {
                    role: 'wallRepairerCo1',
                    working: false}});
    }
    else if (numberOf1WallRepairersLink < minimumNumberOf1WallRepairersLink) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '1WallRepairerLink' + Game.time,
            {
                memory: {
                    role: 'wallRepairerLi1',
                    working: false}});
    }


    else if (numberOf1LongdistanceBuilderE42N3Link < minimumNumberOf1LongdistanceBuilderE42N3Link) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '1LongdistanceBuilderE42N3Link' + Game.time,
            {
                memory: {
                    role: 'longDistanceBuilderLiE42N31',
                    working: false,
                    target: "E42N3",
                    home: "E43N3"}});
    }





    /*Game.spawns['E42N2'].spawnCreep(
        [WORK,
            CARRY,
            MOVE, MOVE, MOVE, MOVE,
            CLAIM],
        'CLAIMER' + Game.time,
        {memory: {
                role: 'claimer',
                working: false,
                target: "E42N3",
                claim: "5bbcaf719099fc012e63a9cc"}});*/







    //                  ROOM E43N2
    //                  ROOM E43N2

    //minimum numbers of creeps for each role
    const minimumNumberOf21HarvestersContainer = 0;
    const minimumNumberOf22HarvestersContainer = 0;

    const minimumNumberOf21HarvestersLink = 1;
    const minimumNumberOf22HarvestersLink = 1;

    const minimumNumberOf2Extractor = 0;


    const minimumNumberOf2UpgradersContainer = 0;
    const minimumNumberOf2UpgradersLink = 1;


    const minimumNumberOf2TransferersContainer = 0;
    const minimumNumberOf2TransferersLink = 1;


    const minimumNumberOf2BuildersContainer = 0;
    const minimumNumberOf2BuildersLink = 0;
    const minimumNumberOf2BuildersSource = 0;


    const minimumNumberOf2WallRepairersContainer = 0;
    const minimumNumberOf2WallRepairersLink = 0;

    const minimumNumberOf2RepairersContainer = 0;
    const minimumNumberOf2RepairersLink = 0;

    const minimumNumberOf2TombstonePickerContainer = 0;
    const minimumNumberOf2TombstonePickerLink = 1;


    //NUMBER

    const numberOf21SHarvestersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'SharvesterCo21');
    const numberOf22SHarvestersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'SharvesterCo22');

    const numberOf2STransfersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'StransfererCo2');


    const numberOf21SHarvestersLink = _.sum(Game.creeps, (c) => c.memory.role === 'SharvesterLi21');
    const numberOf22SHarvestersLink = _.sum(Game.creeps, (c) => c.memory.role === 'SharvesterLi22');

    const numberOf2STransfersLink = _.sum(Game.creeps, (c) => c.memory.role === 'StransfererLi2');
    //NORMAL

    const numberOf21HarvestersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo21');
    const numberOf22HarvestersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo22');

    const numberOf21HarvestersLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi21');
    const numberOf22HarvestersLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi22');

    const numberOf2Extractor = _.sum(Game.creeps, (c) => c.memory.role === 'extractor2');


    const numberOf2UpgradersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderCo2');
    const numberOf2UpgradersLink = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderLi2');


    const numberOf2TransferersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo2');
    const numberOf2TransferersLink = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi2');


    const numberOf2BuildersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'builderCo2');
    const numberOf2BuildersLink = _.sum(Game.creeps, (c) => c.memory.role === 'builderLi2');
    const numberOf2BuildersSource = _.sum(Game.creeps, (c) => c.memory.role === 'builderSo2');


    const numberOf2WallRepairersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerCo2');
    const numberOf2WallRepairersLink = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerLi2');

    const numberOf2RepairersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'repairerCo2');
    const numberOf2RepairersLink = _.sum(Game.creeps, (c) => c.memory.role === 'repairerLi2');


    const numberOf2TombstonePickerContainer = _.sum(Game.creeps, (c) => c.memory.role === 'tombstonePickerCo2');
    const numberOf2TombstonePickerLink = _.sum(Game.creeps, (c) => c.memory.role === 'tombstonePickerLi2');



    //STARTER CREEPS

    if (harvester2 === ERR_NOT_ENOUGH_ENERGY && numberOf21HarvestersContainer === 0 && numberOf21SHarvestersContainer <1 && minimumNumberOf21HarvestersContainer !== 0) {
        Game.spawns['E43N2'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '21SHarvesterContainer' + Game.time,
            {memory: {
                    role: 'SharvesterCo21',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5b"}});
    }
    else if (harvester2 === ERR_NOT_ENOUGH_ENERGY && numberOf22HarvestersContainer === 0 && numberOf22SHarvestersContainer <1 && minimumNumberOf22HarvestersContainer !== 0) {
        Game.spawns['E43N2'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '22SHarvesterContainer' + Game.time,
            {memory: {
                    role: 'SharvesterCo22',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5c"}});
    }
    else if (transferer2 === ERR_NOT_ENOUGH_ENERGY && numberOf2TransferersContainer === 0 && numberOf2STransfersContainer <3 && minimumNumberOf2TransferersContainer !== 0) {
        Game.spawns['E43N2'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            '2STransfererContainer' + Game.time,
            {memory: {
                    role: 'StransfererCo2',
                    working: false,
                    deliverContainer: "5d2c51d73dceb87ca33c6441"}});
    }


    if (harvester2 === ERR_NOT_ENOUGH_ENERGY && numberOf21HarvestersLink === 0 && numberOf21SHarvestersLink <1 && minimumNumberOf21HarvestersLink !== 0)  {
        Game.spawns['E43N2'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '21SHarvesterLink' + Game.time,
            {memory: {
                    role: 'SharvesterLi21',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5b"}});
    }
    else if (harvester2 === ERR_NOT_ENOUGH_ENERGY && numberOf22HarvestersLink === 0 && numberOf22SHarvestersLink <1 && minimumNumberOf22HarvestersLink !== 0) {
        Game.spawns['E43N2'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '22SHarvesterLink' + Game.time,
            {memory: {
                    role: 'SharvesterLi22',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5c"}});
    }
    else if (transferer2 === ERR_NOT_ENOUGH_ENERGY && numberOf2TransferersLink === 0 && numberOf2STransfersLink <3 && minimumNumberOf2TransferersLink !== 0) {
        Game.spawns['E43N2'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            '2STransfererLink' + Game.time,
            {memory: {
                    role: 'StransfererLi2',
                    working: false,
                    deliverTerminal: "5d397e2c7b54a34625aa588e"}});
    }

    //NORMAL CREEPS

    else if (numberOf21HarvestersContainer < minimumNumberOf21HarvestersContainer) {
        Game.spawns['E43N2'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY],
            '21HarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo21',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5b"}});
    }
    else if (numberOf22HarvestersContainer < minimumNumberOf22HarvestersContainer) {
        Game.spawns['E43N2'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY],
            '22HarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo22',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5c"}});
    }

    else if (numberOf21HarvestersLink < minimumNumberOf21HarvestersLink) {
        Game.spawns['E43N2'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY],
            '21HarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi21',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5b"}});
    }
    else if (numberOf22HarvestersLink < minimumNumberOf22HarvestersLink) {
        Game.spawns['E43N2'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK, WORK,
                CARRY],
            '22HarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi22',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5c"}});
    }

    else if (numberOf2Extractor < minimumNumberOf2Extractor) {
        // try to spawn one
        Game.spawns['E43N2'].spawnCreep(
            [WORK, WORK, WORK, WORK, WORK,
                CARRY,
                MOVE, MOVE,MOVE],
            '2Extractor' + Game.time,
            {
                memory: {
                    role: 'extractor2',
                    working: false,
                    sourceId: "5bbcb678d867df5e542078a5",
                    deliverContainer: ""}});
    }


    else if (numberOf2TransferersContainer < minimumNumberOf2TransferersContainer) {
        Game.spawns['E43N2'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,MOVE,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
            '2TransfererContainer' + Game.time,
            {
                memory: {
                    role: 'transfererCo2',
                    working: false,
                    deliverContainer: ""}});
    }

    else if (numberOf2TransferersLink < minimumNumberOf2TransferersLink) {
        Game.spawns['E43N2'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,MOVE,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
            '2TransfererLink' + Game.time,
            {
                memory: {
                    role: 'transfererLi2',
                    working: false,
                    deliverTerminal: "5d397e2c7b54a34625aa588e"}});
    }


    else if (numberOf2UpgradersContainer < minimumNumberOf2UpgradersContainer) {
        // try to spawn one
        Game.spawns['E43N2'].spawnCreep(
            [WORK, WORK, WORK, WORK, WORK,WORK, WORK, WORK, WORK, WORK,
                CARRY,
                MOVE, MOVE],
            '2UpgraderContainer' + Game.time,
            {
                memory: {
                    role: 'upgraderCo2',
                    working: false,
                    pickContainer: "5d2c51d73dceb87ca33c6441"}});
    }
    else if (numberOf2UpgradersLink < minimumNumberOf2UpgradersLink) {
        // try to spawn one
        Game.spawns['E43N2'].spawnCreep(
            [WORK, WORK, WORK, WORK, WORK,WORK, WORK, WORK, WORK, WORK,
                CARRY,
                MOVE, MOVE],
            '2UpgraderLink' + Game.time,
            {
                memory: {
                    role: 'upgraderLi2',
                    working: false,
                    pickLink: "5d389279496c40170746c670"}});
    }


    else if (numberOf2BuildersContainer < minimumNumberOf2BuildersContainer) {
        // try to spawn one
        Game.spawns['E43N2'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '2BuilderContainer' + Game.time,
            {
                memory: {
                    role: 'builderCo2',
                    working: false}});
    }
    else if (numberOf2BuildersLink < minimumNumberOf2BuildersLink) {
        // try to spawn one
        Game.spawns['E43N2'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '2BuilderLink' + Game.time,
            {
                memory: {
                    role: 'builderLi2',
                    working: false}});
    }
    else if (numberOf2BuildersSource < minimumNumberOf2BuildersSource) {
        // try to spawn one
        Game.spawns['E43N2'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '2BuilderSource' + Game.time,
            {
                memory: {
                    role: 'builderSo2',
                    working: false}});
    }


    else if (numberOf2TombstonePickerContainer < minimumNumberOf2TombstonePickerContainer) {
        // try to spawn one
        Game.spawns['E43N2'].spawnCreep(
            [CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '2TombstonePickerContainer' + Game.time,
            {
                memory: {
                    role: 'tombstonePickerCo2',
                    working: false}});
    }
    else if (numberOf2TombstonePickerLink < minimumNumberOf2TombstonePickerLink) {
        // try to spawn one
        Game.spawns['E43N2'].spawnCreep(
            [CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '2TombstonePickerLink' + Game.time,
            {
                memory: {
                    role: 'tombstonePickerLi2',
                    working: false}});
    }


    else if (numberOf2RepairersContainer < minimumNumberOf2RepairersContainer) {
        // try to spawn one
        Game.spawns['E43N2'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '2RepairerContainer' + Game.time,
            {
                memory: {
                    role: 'repairerCo2',
                    working: false}});
    }
    else if (numberOf2RepairersLink < minimumNumberOf2RepairersLink) {
        // try to spawn one
        Game.spawns['E43N2'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '2RepairerLink' + Game.time,
            {
                memory: {
                    role: 'repairerLi2',
                    working: false}});
    }


    else if (numberOf2WallRepairersContainer < minimumNumberOf2WallRepairersContainer) {
        // try to spawn one
        Game.spawns['E43N2'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '2WallRepairerContainer' + Game.time,
            {
                memory: {
                    role: 'wallRepairerCo2',
                    working: false}});
    }
    else if (numberOf2WallRepairersLink < minimumNumberOf2WallRepairersLink) {
        // try to spawn one
        Game.spawns['E43N2'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '2WallRepairerLink' + Game.time,
            {
                memory: {
                    role: 'wallRepairerLi2',
                    working: false}});
    }




    //                  ROOM E42N2
    //                  ROOM E42N2

    //minimum numbers of creeps for each role
    const minimumNumberOf31HarvestersContainer = 0;
    const minimumNumberOf32HarvestersContainer = 0;

    const minimumNumberOf31HarvestersLink = 1;
    const minimumNumberOf32HarvestersLink = 1;

    const minimumNumberOf3Extractor = 1;


    const minimumNumberOf3UpgradersContainer = 0;
    const minimumNumberOf3UpgradersLink = 1;


    const minimumNumberOf3TransferersContainer = 0;
    const minimumNumberOf3TransferersLink = 1;


    const minimumNumberOf3BuildersContainer = 0;
    const minimumNumberOf3BuildersLink = 0;
    const minimumNumberOf3BuildersSource = 0;


    const minimumNumberOf3WallRepairersContainer = 0;
    const minimumNumberOf3WallRepairersLink = 0;

    const minimumNumberOf3RepairersContainer = 0;
    const minimumNumberOf3RepairersLink = 0;

    const minimumNumberOf3TombstonePickerContainer = 0;
    const minimumNumberOf3TombstonePickerLink = 1;


    const minimumNumberOf3LongdistanceHarvesterE42N1Link = 0;

    const minimumNumberOf3LongdistanceBuilderE42N3Link = 0;

    //NUMBER

    const numberOf31SHarvestersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'SharvesterCo31');
    const numberOf32SHarvestersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'SharvesterCo32');

    const numberOf3STransfersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'StransfererCo3');


    const numberOf31SHarvestersLink = _.sum(Game.creeps, (c) => c.memory.role === 'SharvesterLi31');
    const numberOf32SHarvestersLink = _.sum(Game.creeps, (c) => c.memory.role === 'SharvesterLi32');

    const numberOf3STransfersLink = _.sum(Game.creeps, (c) => c.memory.role === 'StransfererLi3');

    //NORMAL

    const numberOf31HarvestersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo31');
    const numberOf32HarvestersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo32');

    const numberOf31HarvestersLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi31');
    const numberOf32HarvestersLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi32');

    const numberOf3Extractor = _.sum(Game.creeps, (c) => c.memory.role === 'extractor3');


    const numberOf3UpgradersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderCo3');
    const numberOf3UpgradersLink = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderLi3');


    const numberOf3TransferersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo3');
    const numberOf3TransferersLink = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi3');


    const numberOf3BuildersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'builderCo3');
    const numberOf3BuildersLink = _.sum(Game.creeps, (c) => c.memory.role === 'builderLi3');
    const numberOf3BuildersSource = _.sum(Game.creeps, (c) => c.memory.role === 'builderSo3');


    const numberOf3WallRepairersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerCo3');
    const numberOf3WallRepairersLink = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerLi3');

    const numberOf3RepairersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'repairerCo3');
    const numberOf3RepairersLink = _.sum(Game.creeps, (c) => c.memory.role === 'repairerLi3');


    const numberOf3TombstonePickerContainer = _.sum(Game.creeps, (c) => c.memory.role === 'tombstonePickerCo3');
    const numberOf3TombstonePickerLink = _.sum(Game.creeps, (c) => c.memory.role === 'tombstonePickerLi3');


    const numberOf3LongdistanceHarvesterE42N1Link = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceHarvesterLiE42N1');

    const numberOf3LongdistanceBuilderE42N3Link = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceBuilderLiE42N33');

    //STARTER CREEPS

    if (harvester3 === ERR_NOT_ENOUGH_ENERGY && numberOf31HarvestersContainer === 0 && numberOf31SHarvestersContainer <1 && minimumNumberOf31HarvestersContainer !== 0)  {
        Game.spawns['E42N2'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '31SHarvesterContainer' + Game.time,
            {memory: {
                    role: 'SharvesterCo31',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d0"}});
    }
    else if (harvester3 === ERR_NOT_ENOUGH_ENERGY && numberOf32HarvestersContainer === 0 && numberOf32SHarvestersContainer <1 && minimumNumberOf32HarvestersContainer !== 0) {
        Game.spawns['E42N2'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '32SHarvesterContainer' + Game.time,
            {memory: {
                    role: 'SharvesterCo32',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d2"}});
    }
    else if (transferer3 === ERR_NOT_ENOUGH_ENERGY && numberOf3TransferersContainer === 0 && numberOf3STransfersContainer <3 && minimumNumberOf3TransferersContainer !== 0) {
        Game.spawns['E42N2'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            '3STransfererLink' + Game.time,
            {memory: {
                    role: 'StransfererCo3',
                    working: false,
                    pickLink: "5cbcb2f0991d6a2456adcfbc",
                    deliverContainer: "5d2cd4e97a1f04171f7dc2a5"}});
    }

    else if (harvester3 === ERR_NOT_ENOUGH_ENERGY && numberOf31HarvestersLink === 0 && numberOf31SHarvestersLink <1 && minimumNumberOf31HarvestersLink !== 0)  {
        Game.spawns['E42N2'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '31SHarvesterContainer' + Game.time,
            {memory: {
                    role: 'SharvesterLi31',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d0"}});
    }
    else if (harvester3 === ERR_NOT_ENOUGH_ENERGY && numberOf32HarvestersLink === 0 && numberOf32SHarvestersLink <1 && minimumNumberOf32HarvestersLink !== 0) {
        Game.spawns['E42N2'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '32SHarvesterLink' + Game.time,
            {memory: {
                    role: 'SharvesterLi32',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d2"}});
    }
    else if (transferer3 === ERR_NOT_ENOUGH_ENERGY && numberOf3TransferersLink === 0 && numberOf3STransfersLink <3 && minimumNumberOf3TransferersLink !== 0) {
        Game.spawns['E42N2'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            '3STransfererLink' + Game.time,
            {memory: {
                    role: 'StransfererLi3',
                    working: false}});
    }

    //NORMAL CREEPS

    else if (numberOf31HarvestersContainer < minimumNumberOf31HarvestersContainer) {
        Game.spawns['E42N2'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY],
            '31HarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo31',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d0"}});
    }
    else if (numberOf32HarvestersContainer < minimumNumberOf32HarvestersContainer) {
        Game.spawns['E42N2'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY],
            '32Harvester' + Game.time,
            {
                memory: {
                    role: 'harvester32',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d2"}});
    }

    else if (numberOf31HarvestersLink < minimumNumberOf31HarvestersLink) {
        Game.spawns['E42N2'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY],
            '31HarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi31',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d0"}});
    }
    else if (numberOf32HarvestersLink < minimumNumberOf32HarvestersLink) {
        Game.spawns['E42N2'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,
                WORK,WORK,WORK,WORK,WORK,WORK,WORK,
                CARRY],
            '32HarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi32',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d2"}});
    }

    else if (numberOf3Extractor < minimumNumberOf3Extractor) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [WORK, WORK, WORK, WORK, WORK,
                CARRY,
                MOVE, MOVE,MOVE],
            '1Extractor' + Game.time,
            {
                memory: {
                    role: 'extractor3',
                    working: false,
                    sourceId: "5bbcb66dd867df5e54207839",
                    deliverContainer: "5d39794666d7ea40915a6bf1"}});
    }


    else if (numberOf3TransferersContainer < minimumNumberOf3TransferersContainer) {
        Game.spawns['E42N2'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,MOVE,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
            '3TransfererContainer' + Game.time,
            {
                memory: {
                    role: 'transfererCo3',
                    working: false,
                    deliverContainer: "5d2cd4e97a1f04171f7dc2a5"}});
    }
    else if (numberOf3TransferersLink < minimumNumberOf3TransferersLink) {
        Game.spawns['E42N2'].spawnCreep(
            [MOVE,MOVE,MOVE,MOVE,MOVE,
                CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
            '3TransfererLink' + Game.time,
            {
                memory: {
                    role: 'transfererLi3',
                    working: false,
                    deliverTerminal: "5d395c207a1f04171f834dd0"}});
    }


    else if (numberOf3UpgradersContainer < minimumNumberOf3UpgradersContainer) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [WORK, WORK, WORK, WORK, WORK,WORK, WORK, WORK, WORK, WORK,
                CARRY,
                MOVE, MOVE],
            '3UpgraderContainer' + Game.time,
            {
                memory: {
                    role: 'upgraderCo3',
                    working: false,
                    pickContainer: "5d2cd4e97a1f04171f7dc2a5"}});
    }

    else if (numberOf3UpgradersLink < minimumNumberOf3UpgradersLink) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [WORK, WORK, WORK, WORK, WORK,WORK, WORK, WORK, WORK, WORK,
                CARRY,
                MOVE, MOVE],
            '3UpgraderLink' + Game.time,
            {
                memory: {
                    role: 'upgraderLi3',
                    working: false,
                    pickLink: "5d388e83c08d9e7cff86ec68"}});
    }


    else if (numberOf3BuildersContainer < minimumNumberOf3BuildersContainer) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '3BuilderContainer' + Game.time,
            {
                memory: {
                    role: 'builderCo3',
                    working: false}});
    }
    else if (numberOf3BuildersLink < minimumNumberOf3BuildersLink) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '3BuilderLink' + Game.time,
            {
                memory: {
                    role: 'builderLi3',
                    working: false}});
    }
    else if (numberOf3BuildersSource < minimumNumberOf3BuildersSource) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '3BuilderSource' + Game.time,
            {
                memory: {
                    role: 'builderSo3',
                    working: false}});
    }


    else if (numberOf3TombstonePickerContainer < minimumNumberOf3TombstonePickerContainer) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '3TombstonePickerContainer' + Game.time,
            {
                memory: {
                    role: 'tombstonePickerCo3',
                    working: false}});
    }
    else if (numberOf3TombstonePickerLink < minimumNumberOf3TombstonePickerLink) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '3TombstonePickerLink' + Game.time,
            {
                memory: {
                    role: 'tombstonePickerLi3',
                    working: false}});
    }


    else if (numberOf3RepairersContainer < minimumNumberOf3RepairersContainer) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '3RepairerCo' + Game.time,
            {
                memory: {
                    role: 'repairerCo3',
                    working: false}});
    }
    else if (numberOf3RepairersLink < minimumNumberOf3RepairersLink) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '3RepairerLink' + Game.time,
            {
                memory: {
                    role: 'repairerLi3',
                    working: false}});
    }


    else if (numberOf3WallRepairersContainer < minimumNumberOf3WallRepairersContainer) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '3WallRepairerContainer' + Game.time,
            {
                memory: {
                    role: 'wallRepairerCo3',
                    working: false}});
    }
    else if (numberOf3WallRepairersLink < minimumNumberOf3WallRepairersLink) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '3WallRepairerLink' + Game.time,
            {
                memory: {
                    role: 'wallRepairerLi3',
                    working: false}});
    }


    else if (numberOf3LongdistanceHarvesterE42N1Link < minimumNumberOf3LongdistanceHarvesterE42N1Link) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '3LongdistanceHarvesterE42N1Link' + Game.time,
            {
                memory: {
                    role: 'longDistanceHarvesterLiE42N1',
                    working: false,
                    target: "E42N1",
                    home: "E42N2"}});
    }
    else if (numberOf3LongdistanceBuilderE42N3Link < minimumNumberOf3LongdistanceBuilderE42N3Link) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '3LongdistanceBuilderE42N3Link' + Game.time,
            {
                memory: {
                    role: 'longDistanceBuilderLiE42N33',
                    working: false,
                    target: "E42N3",
                    home: "E42N2"}});
    }
    //                  ROOM E43N3
    //                  ROOM E43N3

    //minimum numbers of creeps for each role
    const minimumNumberOf41HarvestersContainer = 2;
    const minimumNumberOf42HarvestersContainer = 2;

    const minimumNumberOf41HarvestersLink = 0;
    const minimumNumberOf42HarvestersLink = 0;

    const minimumNumberOf4Extractor = 0;


    const minimumNumberOf4UpgradersContainer = 1;
    const minimumNumberOf4UpgradersLink = 0;


    const minimumNumberOf4TransferersContainer = 2;
    const minimumNumberOf4TransferersLink = 0;


    const minimumNumberOf4BuildersContainer = 0;
    const minimumNumberOf4BuildersLink = 0;
    const minimumNumberOf4BuildersSource = 2;


    const minimumNumberOf4WallRepairersContainer = 0;
    const minimumNumberOf4WallRepairersLink = 0;

    const minimumNumberOf4RepairersContainer = 0;
    const minimumNumberOf4RepairersLink = 0;

    const minimumNumberOf4TombstonePickerContainer = 0;
    const minimumNumberOf4TombstonePickerLink = 0;



    //NUMBER

    const numberOf41SHarvestersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'SharvesterCo41');
    const numberOf42SHarvestersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'SharvesterCo42');

    const numberOf4STransfersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'StransfererCo4');


    const numberOf41SHarvestersLink = _.sum(Game.creeps, (c) => c.memory.role === 'SharvesterLi41');
    const numberOf42SHarvestersLink = _.sum(Game.creeps, (c) => c.memory.role === 'SharvesterLi42');

    const numberOf4STransfersLink = _.sum(Game.creeps, (c) => c.memory.role === 'StransfererLi4');

    //NORMAL

    const numberOf41HarvestersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo11');
    const numberOf42HarvestersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterCo12');

    const numberOf41HarvestersLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi11');
    const numberOf42HarvestersLink = _.sum(Game.creeps, (c) => c.memory.role === 'harvesterLi12');

    const numberOf4Extractor = _.sum(Game.creeps, (c) => c.memory.role === 'extractor4');


    const numberOf4UpgradersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderCo4');
    const numberOf4UpgradersLink = _.sum(Game.creeps, (c) => c.memory.role === 'upgraderLi4');


    const numberOf4TransferersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'transfererCo4');
    const numberOf4TransferersLink = _.sum(Game.creeps, (c) => c.memory.role === 'transfererLi4');


    const numberOf4BuildersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'builderCo4');
    const numberOf4BuildersLink = _.sum(Game.creeps, (c) => c.memory.role === 'builderLi4');
    const numberOf4BuildersSource = _.sum(Game.creeps, (c) => c.memory.role === 'builderSo4');


    const numberOf4WallRepairersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerCo4');
    const numberOf4WallRepairersLink = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairerLi4');

    const numberOf4RepairersContainer = _.sum(Game.creeps, (c) => c.memory.role === 'repairerCo4');
    const numberOf4RepairersLink = _.sum(Game.creeps, (c) => c.memory.role === 'repairerLi4');


    const numberOf4TombstonePickerContainer = _.sum(Game.creeps, (c) => c.memory.role === 'tombstonePickerCo4');
    const numberOf4TombstonePickerLink = _.sum(Game.creeps, (c) => c.memory.role === 'tombstonePickerLi4');
    
    //STARTER CREEPS

    if (harvester4 === ERR_NOT_ENOUGH_ENERGY && numberOf41HarvestersContainer === 0 && numberOf41SHarvestersContainer <2 && minimumNumberOf41HarvestersContainer !== 0) {
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '41SHarvesterContainer' + Game.time,
            {memory: {
                    role: 'SharvesterCo41',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9cd"}});
    }
    else if (harvester4 === ERR_NOT_ENOUGH_ENERGY && numberOf42HarvestersContainer === 0 && numberOf42SHarvestersContainer < 2 && minimumNumberOf42HarvestersContainer !== 0) {
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '42SHarvesterContainer' + Game.time,
            {memory: {
                    role: 'SharvesterCo42',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9ce"}});
    }
    else if (transferer4 === ERR_NOT_ENOUGH_ENERGY && numberOf4TransferersContainer === 0 && numberOf4STransfersContainer <3 && minimumNumberOf4TransferersContainer !== 0) {
        Game.spawns['E42N3'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            '4STransfererContainer' + Game.time,
            {memory: {
                    role: 'StransfererCo4',
                    working: false,
                    pickLink: "",
                    deliverContainer: ""}});
    }


    else if (harvester4 === ERR_NOT_ENOUGH_ENERGY && numberOf41HarvestersLink === 0 && numberOf41SHarvestersLink <1 && minimumNumberOf41HarvestersLink !== 0)  {
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '41SHarvesterContainer' + Game.time,
            {memory: {
                    role: 'SharvesterLi41',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9cd"}});
    }
    else if (harvester4 === ERR_NOT_ENOUGH_ENERGY && numberOf42HarvestersLink === 0 && numberOf42SHarvestersLink <1 && minimumNumberOf42HarvestersLink !== 0) {
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '42SHarvesterLink' + Game.time,
            {memory: {
                    role: 'SharvesterLi42',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9ce"}});
    }
    else if (transferer4 === ERR_NOT_ENOUGH_ENERGY && numberOf4TransferersLink === 0 && numberOf4STransfersLink <3 && minimumNumberOf4TransferersLink !== 0) {
        Game.spawns['E42N3'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            '4STransfererLink' + Game.time,
            {memory: {
                    role: 'StransfererLi4',
                    working: false,
                    deliverTerminal: ""}});
    }

    //NORMAL CREEPS

    else if (numberOf41HarvestersContainer < minimumNumberOf41HarvestersContainer) {
        Game.spawns['E42N3'].spawnCreep(
            [MOVE,
                WORK,WORK,
                CARRY],
            '41HarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo41',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9cd"}});
    }
    else if (numberOf42HarvestersContainer < minimumNumberOf42HarvestersContainer) {
        Game.spawns['E42N3'].spawnCreep(
            [MOVE,
                WORK,WORK,
                CARRY],
            '42HarvesterContainer' + Game.time,
            {
                memory: {
                    role: 'harvesterCo42',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9ce"}});
    }

    else if (numberOf41HarvestersLink < minimumNumberOf41HarvestersLink) {
        Game.spawns['E42N3'].spawnCreep(
            [MOVE,
                WORK,WORK,
                CARRY],
            '41HarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi41',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9cd"}});
    }
    else if (numberOf42HarvestersLink < minimumNumberOf42HarvestersLink) {
        Game.spawns['E43N3'].spawnCreep(
            [MOVE,
                WORK,WORK,
                CARRY, CARRY],
            '42HarvesterLink' + Game.time,
            {
                memory: {
                    role: 'harvesterLi42',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9ce"}});
    }

    else if (numberOf4Extractor < minimumNumberOf4Extractor) {
        // try to spawn one
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '4Extractor' + Game.time,
            {
                memory: {
                    role: 'extractor4',
                    working: false,
                    sourceId: "",
                    deliverContainer: ""}});
    }


    else if (numberOf4TransferersContainer < minimumNumberOf4TransferersContainer) {
        Game.spawns['E42N3'].spawnCreep(
            [MOVE,MOVE,
                CARRY,CARRY,CARRY,CARRY],
            '4TransfererContainer' + Game.time,
            {
                memory: {
                    role: 'transfererCo4',
                    working: false,
                    deliverContainer: ""}});
    }
    else if (numberOf1TransferersLink < minimumNumberOf1TransferersLink) {
        Game.spawns['E42N3'].spawnCreep(
            [MOVE,MOVE,
                CARRY,CARRY,CARRY,CARRY],
            '1TransfererLink' + Game.time,
            {
                memory: {
                    role: 'transfererLi1',
                    working: false,
                    deliverTerminal: ""}});
    }


    else if (numberOf4UpgradersContainer < minimumNumberOf4UpgradersContainer) {
        // try to spawn one
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE, MOVE],
            'Upgrader4Container' + Game.time,
            {
                memory: {
                    role: 'upgraderCo4',
                    working: false,
                    pickContainer: ""}});
    }
    else if (numberOf4UpgradersLink < minimumNumberOf4UpgradersLink) {
        // try to spawn one
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE, MOVE],
            'Upgrader4Link' + Game.time,
            {
                memory: {
                    role: 'upgraderLi4',
                    working: false,
                    pickLink: ""}});
    }


    else if (numberOf4BuildersContainer < minimumNumberOf4BuildersContainer) {
        // try to spawn one
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '4BuilderContainer' + Game.time,
            {
                memory: {
                    role: 'builderCo4',
                    working: false}});
    }
    else if (numberOf4BuildersLink < minimumNumberOf4BuildersLink) {
        // try to spawn one
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '1BuilderLink' + Game.time,
            {
                memory: {
                    role: 'builderLi1',
                    working: false}});
    }
    else if (numberOf4BuildersSource < minimumNumberOf4BuildersSource) {
        // try to spawn one
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE,],
            '4BuilderSource' + Game.time,
            {
                memory: {
                    role: 'builderSo4',
                    working: false}});
    }

    else if (numberOf4TombstonePickerContainer < minimumNumberOf4TombstonePickerContainer) {
        // try to spawn one
        Game.spawns['E42N3'].spawnCreep(
            [CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '4TombstonePickerContainer' + Game.time,
            {
                memory: {
                    role: 'tombstonePickerCo4',
                    working: false}});
    }
    else if (numberOf4TombstonePickerLink < minimumNumberOf4TombstonePickerLink) {
        // try to spawn one
        Game.spawns['E42N3'].spawnCreep(
            [CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '4TombstonePickerLink' + Game.time,
            {
                memory: {
                    role: 'tombstonePickerLi4',
                    working: false}});
    }


    else if (numberOf4RepairersContainer < minimumNumberOf4RepairersContainer) {
        // try to spawn one
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '4RepairerContainer' + Game.time,
            {
                memory: {
                    role: 'repairerCo4',
                    working: false}});
    }
    else if (numberOf4RepairersLink < minimumNumberOf4RepairersLink) {
        // try to spawn one
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '4RepairerLink' + Game.time,
            {
                memory: {
                    role: 'repairerLi4',
                    working: false}});
    }


    else if (numberOf4WallRepairersContainer < minimumNumberOf4WallRepairersContainer) {
        // try to spawn one
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '4WallRepairerContainer' + Game.time,
            {
                memory: {
                    role: 'wallRepairerCo4',
                    working: false}});
    }
    else if (numberOf4WallRepairersLink < minimumNumberOf4WallRepairersLink) {
        // try to spawn one
        Game.spawns['E42N3'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '4WallRepairerLink' + Game.time,
            {
                memory: {
                    role: 'wallRepairerLi4',
                    working: false}});
    }
};