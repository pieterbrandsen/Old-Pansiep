//Import roles

require('prototype.tower');
//const roleStarter = require('role.starter');
const roleHarvester1 = require('role.harvesterContainer');
const roleHarvester2 = require('role.harvesterLink');

const roleUpgrader = require('role.upgrader');
const roleTransferer = require('role.transferer');
const roleBuilder = require('role.builder');
const roleBuilderSource = require('role.builderSources');
const roleWallrepairer = require('role.wallrepairer');
const roleClaimer = require('role.claimer');
const roleTombstonePicker = require('role.tombstonePicker');
const roleRepairer = require('role.repairer');

const roleLongdistanceBuilder = require('role.longDistanceBuilder');
const roleLongdistanceBuilderSource = require('role.longDistanceBuilderSource');

const roleLongDistanceHarvester = require('role.longDistanceHarvesterSpawn');
const roleLongDistanceUpgrader = require('role.longDistanceHarvesterUpgrader');




module.exports.loop = function () {

    const linkFrom1 = Game.getObjectById("5d2d8e9adbfe1b628e83c414");
    const linkTo = Game.getObjectById("5d2d8745e9ffb93fbdf51d0c");
    //const linkFrom2 = Game.getObjectById("5cbca11f5568da5c6d6d5e38");
    linkFrom1.transferEnergy(linkTo);
    //linkFrom2.transferEnergy(linkTo);

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


        //W33N49
        if (creep.memory.role === 'Sharvester11') {
            roleHarvester1.run(creep);
        }
        if (creep.memory.role === 'Sharvester12') {
            roleHarvester1.run(creep);
        }
        if (creep.memory.role === 'Stransferer1') {
            roleTransferer.run(creep);
        }


        if (creep.memory.role === 'harvester11') {
            roleHarvester1.run(creep);
        }
        if (creep.memory.role === 'harvester12') {
            roleHarvester1.run(creep);
        }


        if (creep.memory.role === 'upgrader1') {
            roleUpgrader.run(creep);
        }


        if (creep.memory.role === 'transferer1') {
            roleTransferer.run(creep);
        }


        if (creep.memory.role === 'builder1') {
            roleBuilder.run(creep);
        }


        if (creep.memory.role === 'wallRepairer1') {
            roleWallrepairer.run(creep);
        }


        if (creep.memory.role === 'claimer') {
            roleClaimer.run(creep);
        }


        if (creep.memory.role === 'tombstonePicker1') {
            roleTombstonePicker.run(creep);
        }


        if (creep.memory.role === 'repairer1') {
            roleRepairer.run(creep);
        }


        if (creep.memory.role === 'longDistanceBuilderE42N2') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role === 'longDistanceBuilderSourceE42N2') {
            roleRepairer.run(creep);
        }



        if (creep.memory.role === 'longDistanceBuilderE43N2') {
            roleLongdistanceBuilder.run(creep);
        }
        if (creep.memory.role === 'longDistanceBuilderSourceE43N2') {
            roleLongdistanceBuilderSource.run(creep);
        }




        if (creep.memory.role === 'longDistanceUpgraderE43N2') {
            roleLongDistanceUpgrader.run(creep);
        }
        if (creep.memory.role === 'longDistanceUpgraderE42N2') {
            roleLongDistanceUpgrader.run(creep);
        }










        //W33N48
        if (creep.memory.role === 'Sharvester21') {
            roleHarvester1.run(creep);
        }
        if (creep.memory.role === 'Sharvester22') {
            roleHarvester1.run(creep);
        }
        if (creep.memory.role === 'Stransferer2') {
            roleTransferer.run(creep);
        }


        if (creep.memory.role === 'harvester21') {
            roleHarvester1.run(creep);
        }
        if (creep.memory.role === 'harvester22') {
            roleHarvester1.run(creep);
        }


        if (creep.memory.role === 'upgrader2') {
            roleUpgrader.run(creep);
        }


        if (creep.memory.role === 'transferer2') {
            roleTransferer.run(creep);
        }


        if (creep.memory.role === 'builder2') {
            roleBuilder.run(creep);
        }


        if (creep.memory.role === 'wallRepairer2') {
            roleWallrepairer.run(creep);
        }


        if (creep.memory.role === 'tombstonePicker2') {
            roleTombstonePicker.run(creep);
        }


        if (creep.memory.role === 'repairer2') {
            roleRepairer.run(creep);
        }


        //W33N48
        if (creep.memory.role === 'Sharvester31') {
            roleHarvester1.run(creep);
        }
        if (creep.memory.role === 'Sharvester32') {
            roleHarvester1.run(creep);
        }
        if (creep.memory.role === 'Stransferer3') {
            roleTransferer.run(creep);
        }


        if (creep.memory.role === 'harvester31') {
            roleHarvester1.run(creep);
        }
        if (creep.memory.role === 'harvester32') {
            roleHarvester1.run(creep);
        }


        if (creep.memory.role === 'upgrader3') {
            roleUpgrader.run(creep);
        }


        if (creep.memory.role === 'transferer3') {
            roleTransferer.run(creep);
        }


        if (creep.memory.role === 'builder3') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role === 'builderSource3') {
            roleBuilderSource.run(creep);
        }


        if (creep.memory.role === 'wallRepairer3') {
            roleWallrepairer.run(creep);
        }


        if (creep.memory.role === 'tombstonePicker3') {
            roleTombstonePicker.run(creep);
        }


        if (creep.memory.role === 'repairer3') {
            roleRepairer.run(creep);
        }


        if (creep.memory.role === 'longDistanceHarvesterE42N1') {
            roleLongDistanceHarvester.run(creep);
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




        //If possible to spawn normal creeps not starters
        const harvester1 =
            Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK, WORK,
                CARRY,
                MOVE],
            'Harvester' + Game.time,
            { dryRun: true});
        const transferer1 =
            Game.spawns['E43N3'].spawnCreep(
            [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            'Transferer' + Game.time,
            { dryRun: true});

        const harvester2 =
            Game.spawns['E43N2'].spawnCreep(
                [WORK, WORK, WORK,
                    CARRY,
                    MOVE],
                'Harvester' + Game.time,
                { dryRun: true});
        const transferer2 =
            Game.spawns['E43N2'].spawnCreep(
                [CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE],
                'Transferer' + Game.time,
                { dryRun: true});


        const harvester3 =
            Game.spawns['E42N2'].spawnCreep(
                [WORK, WORK, WORK,
                    CARRY,
                    MOVE],
                'Harvester' + Game.time,
                { dryRun: true});
        const transferer3 =
            Game.spawns['E42N2'].spawnCreep(
                [CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY,
                    MOVE, MOVE, MOVE],
                'Transferer' + Game.time,
                { dryRun: true});





    //                  ROOM E43N3
    //                  ROOM E43N3

    //minimum numbers of creeps for each role
    const minimumNumberOf11Harvesters = 2;
    const minimumNumberOf12Harvesters = 2;
    const minimumNumberOf1Upgraders = 2;
    const minimumNumberOf1Transferers = 3;
    const minimumNumberOf1Builders = 2;
    const minimumNumberOf1WallRepairers = 0;
    const minimumNumberOf1TombstonePicker = 1;
    const minimumNumberOf1Repairers = 0;

    const minimumNumberOf1LongdistanceBuilderE43N2 = 0;
    const minimumNumberOf1LongdistanceBuilderSourceE43N2 = 0;
    const minimumNumberOf1LongdistanceBuilderE42N2 = 0;
    const minimumNumberOf1LongdistanceBuilderSourceE42N2 = 0;

    const minimumNumberOf1LongdistanceUpgraderE43N2 = 0;
    const minimumNumberOf1LongdistanceUpgraderE42N2 = 0;


    // count the number of creeps alive for each role
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a harvester
    const numberOf11SHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'Sharvester11');
    const numberOf12SHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'Sharvester12');
    const numberOf1STransfers = _.sum(Game.creeps, (c) => c.memory.role === 'Stransferer1');

    const numberOf11Harvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester11');
    const numberOf12Harvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester12');
    const numberOf1Upgraders = _.sum(Game.creeps, (c) => c.memory.role === 'upgrader1');
    const numberOf1Transferers = _.sum(Game.creeps, (c) => c.memory.role === 'transferer1');
    const numberOf1Builders = _.sum(Game.creeps, (c) => c.memory.role === 'builder1');
    const numberOf1WallRepairers = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairer1');
    const numberOf1TombstonePicker = _.sum(Game.creeps, (c) => c.memory.role === 'tombstonePicker1');
    const numberOf1Repairers = _.sum(Game.creeps, (c) => c.memory.role === 'repairer1');

    const numberOf1LongdistanceBuilderE43N2 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceBuilderE43N2');
    const numberOf1LongdistanceBuilderSourceE43N2 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceBuilderSourceE43N2');

    const numberOf1LongdistanceBuilderE42N2 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceBuilderE42N2');
    const numberOf1LongdistanceBuilderSourceE42N2 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceBuilderSourceE42N2');


    const numberOf1LongdistanceUpgraderE43N2 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceUpgraderE43N2');
    const numberOf1LongdistanceUpgraderE42N2 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceUpgraderE42N2');


    //STARTER CREEPS

    if (harvester1 === ERR_NOT_ENOUGH_ENERGY && numberOf11Harvesters === 0 && numberOf11SHarvesters <1) {
        Game.spawns['E43N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '11SHarvester' + Game.time,
            {memory: {
                    role: 'Sharvester11',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab57"}});
    }
    else if (harvester1 === ERR_NOT_ENOUGH_ENERGY && numberOf12Harvesters === 0 && numberOf12SHarvesters <1) {
        Game.spawns['E43N3'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '12SHarvester' + Game.time,
            {memory: {
                    role: 'Sharvester12',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab59"}});
    }
    else if (transferer1 === ERR_NOT_ENOUGH_ENERGY && numberOf1Transferers === 0 && numberOf1STransfers <3) {
        Game.spawns['E43N3'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            '1STransferer' + Game.time,
            {memory: {
                    role: 'Stransferer1',
                    working: false,
                    pickLink: "5cbcb2f0991d6a2456adcfbc",
                    deliverContainer: "5d2d8745e9ffb93fbdf51d0c"}});
    }

    //NORMAL CREEPS

    else if (numberOf11Harvesters < minimumNumberOf11Harvesters) {
        Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK, WORK,
                CARRY,
                MOVE],
            '11Harvester' + Game.time,
            {
                memory: {
                    role: 'harvester11',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab57"}});
    }
    else if (numberOf12Harvesters < minimumNumberOf12Harvesters) {
        Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK, WORK,
                CARRY,
                MOVE],
            '12Harvester' + Game.time,
            {
                memory: {
                    role: 'harvester12',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab59"}});
    }
    else if (numberOf1Transferers < minimumNumberOf1Transferers) {
        Game.spawns['E43N3'].spawnCreep(
            [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,CARRY, CARRY,CARRY,
                MOVE, MOVE],
            '1Transferer' + Game.time,
            {
                memory: {
                    role: 'transferer1',
                    working: false,
                    deliverContainer: "5d2d8745e9ffb93fbdf51d0c"}});
    }
    else if (numberOf1TombstonePicker < minimumNumberOf1TombstonePicker) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [CARRY, CARRY, CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,CARRY, CARRY,
                MOVE, MOVE],
            '1TombstonePicker' + Game.time,
            {
                memory: {
                    role: 'tombstonePicker1',
                    working: false}});
    }
    else if (numberOf1Upgraders < minimumNumberOf1Upgraders) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK, WORK, WORK, WORK,
                CARRY,
                MOVE, MOVE],
            'Upgrader1' + Game.time,
            {
                memory: {
                    role: 'upgrader1',
                    working: false,
                    pickContainer: "5d2d8745e9ffb93fbdf51d0c"}});
    }
    else if (FIND_CONSTRUCTION_SITES !== undefined && numberOf1Builders < minimumNumberOf1Builders) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY,CARRY,
                MOVE, MOVE,MOVE,MOVE],
            '1Builder' + Game.time,
            {
                memory: {
                    role: 'builder1',
                    working: false}});
    }
    else if (numberOf1WallRepairers < minimumNumberOf1WallRepairers) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '1WallRepairer' + Game.time,
            {
                memory: {
                    role: 'wallRepairer1',
                    working: false}});
    }
    else if (numberOf1Repairers < minimumNumberOf1Repairers) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK,
                CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '1Repairer' + Game.time,
            {
                memory: {
                    role: 'repairer1',
                    working: false}});
    }



    else if (numberOf1LongdistanceUpgraderE43N2 < minimumNumberOf1LongdistanceUpgraderE43N2) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE],
            '1LongdistanceUpgraderE43N2' + Game.time,
            {
                memory: {
                    role: 'longDistanceUpgraderE43N2',
                    working: false,
                    target: "E43N2",
                    home: "E43N3"}});
    }
    else if (numberOf1LongdistanceUpgraderE42N2 < minimumNumberOf1LongdistanceUpgraderE42N2) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE],
            '1LongdistanceUpgraderE42N2' + Game.time,
            {
                memory: {
                    role: 'longDistanceUpgraderE42N2',
                    working: false,
                    target: "E42N2",
                    home: "E43N3"}});
    }




    else if (numberOf1LongdistanceBuilderE42N2 < minimumNumberOf1LongdistanceBuilderE42N2) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY,CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE],
            '1longDistanceBuilderE42N2' + Game.time,
            {
                memory: {
                    role: 'longDistanceBuilderE42N2',
                    working: false,
                    target: "E42N2",
                    home: "E43N3"}});
    }
    else if (numberOf1LongdistanceBuilderSourceE42N2 < minimumNumberOf1LongdistanceBuilderSourceE42N2) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY,CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE],
            '1longDistanceBuilderSourceE42N2' + Game.time,
            {
                memory: {
                    role: 'longDistanceBuilderSourceE42N2',
                    working: false,
                    target: "E42N2",
                    home: "E43N3"}});
    }



    else if (numberOf1LongdistanceBuilderE43N2 < minimumNumberOf1LongdistanceBuilderE43N2) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY,CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE],
            '1longDistanceBuilderE43N2' + Game.time,
            {
                memory: {
                    role: 'longDistanceBuilderE43N2',
                    working: false,
                    target: "E43N2",
                    home: "E43N3"}});
    }
    else if (numberOf1LongdistanceBuilderSourceE43N2 < minimumNumberOf1LongdistanceBuilderSourceE43N2) {
        // try to spawn one
        Game.spawns['E43N3'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY,CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE, MOVE],
            '1LongdistanceHarvesterE43N2' + Game.time,
            {
                memory: {
                    role: 'LongDistanceHarvesterE43N2',
                    working: false,
                    target: "E43N2",
                    home: "E43N3"}});
    }

    /*Game.spawns['E43N3'].spawnCreep(
        [WORK,
            CARRY,
            MOVE,
            CLAIM],
        'CLAIMER' + Game.time,
        {memory: {
                role: 'claimer',
                working: false,
                target: "E43N2" }});*/







    //                  ROOM E43N2
    //                  ROOM E43N2

    //minimum numbers of creeps for each role
    const minimumNumberOf21Harvesters = 2;
    const minimumNumberOf22Harvesters = 2;
    const minimumNumberOf2Upgraders = 2;
    const minimumNumberOf2Transferers = 3;
    const minimumNumberOf2Builders = 1;
    const minimumNumberOf2WallRepairers = 0;
    const minimumNumberOf2TombstonePicker = 1;
    const minimumNumberOf2Repairers = 0;





    const numberOf21SHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'Sharvester21');
    const numberOf22SHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'Sharvester22');
    const numberOf2STransfers = _.sum(Game.creeps, (c) => c.memory.role === 'Stransferer2');

    const numberOf21Harvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester21');
    const numberOf22Harvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester22');
    const numberOf2Upgraders = _.sum(Game.creeps, (c) => c.memory.role === 'upgrader2');
    const numberOf2Transferers = _.sum(Game.creeps, (c) => c.memory.role === 'transferer2');
    const numberOf2Builders = _.sum(Game.creeps, (c) => c.memory.role === 'builder2');
    const numberOf2WallRepairers = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairer2');
    const numberOf2TombstonePicker = _.sum(Game.creeps, (c) => c.memory.role === 'tombstonePicker2');
    const numberOf2Repairers = _.sum(Game.creeps, (c) => c.memory.role === 'repairer2');




    //STARTER CREEPS

    if (harvester2 === ERR_NOT_ENOUGH_ENERGY && numberOf21Harvesters === 0 && numberOf21SHarvesters <1) {
        Game.spawns['E43N2'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '21SHarvester' + Game.time,
            {memory: {
                    role: 'Sharvester21',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5b"}});
    }
    else if (harvester2 === ERR_NOT_ENOUGH_ENERGY && numberOf22Harvesters === 0 && numberOf22SHarvesters <1) {
        Game.spawns['E43N2'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '22SHarvester' + Game.time,
            {memory: {
                    role: 'Sharvester22',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5c"}});
    }
    else if (transferer2 === ERR_NOT_ENOUGH_ENERGY && numberOf2Transferers === 0 && numberOf2STransfers <3) {
        Game.spawns['E43N2'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            '2STransferer' + Game.time,
            {memory: {
                    role: 'Stransferer2',
                    working: false,
                    deliverContainer: "5d2c51d73dceb87ca33c6441"}});
    }

    //NORMAL CREEPS

    else if (numberOf21Harvesters < minimumNumberOf21Harvesters) {
        Game.spawns['E43N2'].spawnCreep(
            [WORK, WORK, WORK,
                CARRY,
                MOVE],
            '21Harvester' + Game.time,
            {
                memory: {
                    role: 'harvester21',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5b"}});
    }
    else if (numberOf22Harvesters < minimumNumberOf22Harvesters) {
        Game.spawns['E43N2'].spawnCreep(
            [WORK, WORK, WORK,
                CARRY,
                MOVE],
            '22Harvester' + Game.time,
            {
                memory: {
                    role: 'harvester22',
                    working: false,
                    sourceId: "5bbcaf859099fc012e63ab5c"}});
    }
    else if (numberOf2Transferers < minimumNumberOf2Transferers) {
        Game.spawns['E43N2'].spawnCreep(
            [CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE, MOVE],
            '2Transferer' + Game.time,
            {
                memory: {
                    role: 'transferer2',
                    working: false,
                    deliverContainer: "5d2c51d73dceb87ca33c6441"}});
    }
    else if (numberOf2TombstonePicker < minimumNumberOf2TombstonePicker) {
        // try to spawn one
        Game.spawns['E43N2'].spawnCreep(
            [CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '2TombstonePicker' + Game.time,
            {
                memory: {
                    role: 'tombstonePicker2',
                    working: false}});
    }
    else if (numberOf2Upgraders < minimumNumberOf2Upgraders) {
        // try to spawn one
        Game.spawns['E43N2'].spawnCreep(
            [WORK, WORK, WORK, WORK, WORK,
                CARRY,
                MOVE, MOVE],
            '2Upgrader' + Game.time,
            {
                memory: {
                    role: 'upgrader2',
                    working: false,
                    pickContainer: "5d2c51d73dceb87ca33c6441"}});
    }
    else if (FIND_CONSTRUCTION_SITES !== undefined && numberOf2Builders < minimumNumberOf2Builders) {
        // try to spawn one
        Game.spawns['E43N2'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '2Builder' + Game.time,
            {
                memory: {
                    role: 'builder2',
                    working: false}});
    }
    else if (numberOf2WallRepairers < minimumNumberOf2WallRepairers) {
        // try to spawn one
        Game.spawns['E43N2'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '2WallRepairer' + Game.time,
            {
                memory: {
                    role: 'wallRepairer2',
                    working: false}});
    }
    else if (numberOf2Repairers < minimumNumberOf2Repairers) {
        // try to spawn one
        Game.spawns['E43N2'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '2Repairer' + Game.time,
            {
                memory: {
                    role: 'repairer2',
                    working: false}});
    }







    //                  ROOM E42N2
    //                  ROOM E42N2

    //minimum numbers of creeps for each role
    const minimumNumberOf31Harvesters = 2;
    const minimumNumberOf32Harvesters = 2;

    const minimumNumberOf3Upgraders = 2;

    const minimumNumberOf3Transferers = 3;

    const minimumNumberOf3Builders = 1;
    const minimumNumberOf3BuildersSource = 0;

    const minimumNumberOf3WallRepairers = 0;

    const minimumNumberOf3TombstonePicker = 1;
    const minimumNumberOf3Repairers = 0;


    const minimumNumberOf1LongdistanceHarvesterE42N1 = 0;




    const numberOf31SHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'Sharvester31');
    const numberOf32SHarvesters = _.sum(Game.creeps, (c) => c.memory.role === 'Sharvester32');
    const numberOf3STransfers = _.sum(Game.creeps, (c) => c.memory.role === 'Stransferer3');

    const numberOf31Harvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester31');
    const numberOf32Harvesters = _.sum(Game.creeps, (c) => c.memory.role === 'harvester32');

    const numberOf3Upgraders = _.sum(Game.creeps, (c) => c.memory.role === 'upgrader3');

    const numberOf3Transferers = _.sum(Game.creeps, (c) => c.memory.role === 'transferer3');

    const numberOf3Builders = _.sum(Game.creeps, (c) => c.memory.role === 'builder3');
    const numberOf3BuildersSource = _.sum(Game.creeps, (c) => c.memory.role === 'builderSource3');

    const numberOf3WallRepairers = _.sum(Game.creeps, (c) => c.memory.role === 'wallRepairer3');

    const numberOf3TombstonePicker = _.sum(Game.creeps, (c) => c.memory.role === 'tombstonePicker3');
    const numberOf3Repairers = _.sum(Game.creeps, (c) => c.memory.role === 'repairer3');



    const numberOf1LongdistanceHarvesterE42N1 = _.sum(Game.creeps, (c) => c.memory.role === 'longDistanceHarvesterE42N1');

    //STARTER CREEPS

    if (harvester3 === ERR_NOT_ENOUGH_ENERGY && numberOf31Harvesters === 0 && numberOf31SHarvesters <1) {
        Game.spawns['E42N2'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '31SHarvester' + Game.time,
            {memory: {
                    role: 'Sharvester31',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d0"}});
    }
    else if (harvester3 === ERR_NOT_ENOUGH_ENERGY && numberOf32Harvesters === 0 && numberOf32SHarvesters <1) {
        Game.spawns['E42N2'].spawnCreep(
            [WORK,
                CARRY,
                MOVE],
            '32SHarvester' + Game.time,
            {memory: {
                    role: 'Sharvester32',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d2"}});
    }
    else if (transferer3 === ERR_NOT_ENOUGH_ENERGY && numberOf3Transferers === 0 && numberOf3STransfers <1) {
        Game.spawns['E42N2'].spawnCreep(
            [CARRY, CARRY, CARRY,
                MOVE],
            '3STransferer' + Game.time,
            {memory: {
                    role: 'Stransferer3',
                    working: false,
                    pickLink: "5cbcb2f0991d6a2456adcfbc",
                    deliverContainer: "5d2cd4e97a1f04171f7dc2a5"}});
    }

    //NORMAL CREEPS

    else if (numberOf31Harvesters < minimumNumberOf31Harvesters) {
        Game.spawns['E42N2'].spawnCreep(
            [WORK, WORK, WORK,
                CARRY,
                MOVE],
            '31Harvester' + Game.time,
            {
                memory: {
                    role: 'harvester31',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d0"}});
    }
    else if (numberOf32Harvesters < minimumNumberOf32Harvesters) {
        Game.spawns['E42N2'].spawnCreep(
            [WORK, WORK, WORK,
                CARRY,
                MOVE],
            '32Harvester' + Game.time,
            {
                memory: {
                    role: 'harvester32',
                    working: false,
                    sourceId: "5bbcaf719099fc012e63a9d2"}});
    }
    else if (numberOf3Transferers < minimumNumberOf3Transferers) {
        Game.spawns['E42N2'].spawnCreep(
            [CARRY, CARRY, CARRY, CARRY,CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE, MOVE],
            '3Transferer' + Game.time,
            {
                memory: {
                    role: 'transferer3',
                    working: false,
                    deliverContainer: "5d2cd4e97a1f04171f7dc2a5"}});
    }
    else if (FIND_CONSTRUCTION_SITES !== undefined && numberOf3Builders < minimumNumberOf3Builders) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '3Builder' + Game.time,
            {
                memory: {
                    role: 'builder3',
                    working: false}});
    }


    else if (numberOf3TombstonePicker < minimumNumberOf3TombstonePicker) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '3TombstonePicker' + Game.time,
            {
                memory: {
                    role: 'tombstonePicker3',
                    working: false}});
    }
    else if (numberOf3Upgraders < minimumNumberOf3Upgraders) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [WORK, WORK, WORK, WORK, WORK,
                CARRY,
                MOVE, MOVE],
            '3Upgrader' + Game.time,
            {
                memory: {
                    role: 'upgrader3',
                    working: false,
                    pickContainer: "5d2cd4e97a1f04171f7dc2a5"}});
    }
    else if (numberOf3WallRepairers < minimumNumberOf3WallRepairers) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '3WallRepairer' + Game.time,
            {
                memory: {
                    role: 'wallRepairer3',
                    working: false}});
    }
    else if (numberOf3Repairers < minimumNumberOf3Repairers) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [WORK,
                CARRY, CARRY,
                MOVE, MOVE],
            '3Repairer' + Game.time,
            {
                memory: {
                    role: 'repairer3',
                    working: false}});
    }



    else if (numberOf1LongdistanceHarvesterE42N1 < minimumNumberOf1LongdistanceHarvesterE42N1) {
        // try to spawn one
        Game.spawns['E42N2'].spawnCreep(
            [WORK, WORK,
                CARRY, CARRY, CARRY, CARRY, CARRY,
                MOVE, MOVE],
            '3LongdistanceHarvesterE42N1' + Game.time,
            {
                memory: {
                    role: 'longDistanceHarvesterE42N1',
                    working: false,
                    target: "E42N1",
                    home: "E42N2"}});
    }
};