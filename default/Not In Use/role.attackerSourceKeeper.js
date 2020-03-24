module.exports = {
    run: function(creep) {
        let test21 = Game.cpu.getUsed()

        /*function getStandardRoomCallback() {
            return function (roomName) {
                if(roomsToAvoid.includes(roomName)){
                    return false;
                }
                if (!global.costMatrices[roomName]) {
                    let room = Game.rooms[roomName];
                    let costs = new PathFinder.CostMatrix;
                    if (!room) {
                        return costs;
                    }
                    room.find(FIND_STRUCTURES).forEach(function (struct) {
                        if (struct.structureType === STRUCTURE_ROAD) {
                            costs.set(struct.pos.x, struct.pos.y, 1);
                        } else if (struct.structureType !== STRUCTURE_CONTAINER &&
                            (struct.structureType !== STRUCTURE_RAMPART ||
                                (!struct.my && !struct.isPublic))) {
                            // Can't walk through non-walkable buildings
                            costs.set(struct.pos.x, struct.pos.y, 0xff);
                        }
                    });
                    global.costMatrices[roomName] = costs;
                }
                return global.costMatrices[roomName];
            };
        }*/
        
        let flag = creep.memory.target;
        let creepFlag = Memory.flags[creep.room.name + "-ATTACKER"];

        if (creep.room.name === creep.memory.target) {
            let enemyInRange = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: function(object) {
                    return object.pos.inRangeTo(creep.pos, 4);
                }
            });
            let target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
                filter: function(object) {
                    return !object.pos.inRangeTo(Game.flags["spawn1"],5);
                }
            });
            let healer = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.memory.role == "attackerHeal1";
                }
            });

            let spawn1 = creepFlag.spawn1;
            let spawn2 = creepFlag.spawn2;
            let spawn3 = creepFlag.spawn3;
            let spawn4 = creepFlag.spawn4;
            let spawnMin = creepFlag.spawnMin;
            
            let enemy = creepFlag.enemy;

            if (Game.time % 10 == 0) {
                console.log(spawnMin + ": Next SourceKeeper!")
            }
            let healerInRange = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.memory.role == "attackerHeal1" && object.pos.inRangeTo(creep, 5);
                }
            });

            if (creepFlag.healer[0] !== undefined || enemyInRange !== null) {
                if (healerInRange !== null || enemyInRange !== null) {
                    if (creep.hits == creep.hitsMax || enemyInRange !== null) {
                        if (target === null) {
                            if (spawn2 == spawnMin) {
                                creep.travelTo(Game.flags["spawn2"], {maxRooms:1});
                            }
                            if (spawn3 == spawnMin) {
                                creep.travelTo(Game.flags["spawn3"], {maxRooms:1});
                            }
                            if (spawn4 == spawnMin) {
                                creep.travelTo(Game.flags["spawn4"], {maxRooms:1});
                            }
                        }
                        else if (target !== null) {
                            if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                                creep.travelTo(target, {maxRooms:1});
                            }
                            if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                                creep.travelTo(target, {maxRooms:1});
                            }
                        }
                    }
                    else {creep.travelTo(healer)}
                }
                else {creep.travelTo(Game.flags[flag], {maxRooms:1})}
            }
            
        }
        else if (creep.room.name !== creep.memory.target) {
            if (Game.flags[flag] !== undefined) {
                creep.travelTo(Game.flags[flag])
            }
            else if (Game.flags[flag] === undefined) {
                Game.notify("There is no flag in " + creep.memory.target + "!")
            }
        }
        let test22 = Game.cpu.getUsed() - test21
Memory.stats['test.cpu.avg.test2'] = test22;
Memory.stats['test.cpu.avg10.test2'] = 0.9 * Memory.stats['test.cpu.avg10.test2'] + 0.1 * Memory.stats['test.cpu.avg.test2'];
Memory.stats['test.cpu.avg100.test2'] = 0.99 * Memory.stats['test.cpu.avg100.test2'] + 0.01 * Memory.stats['test.cpu.avg.test2'];
Memory.stats['test.cpu.avg1000.test2'] = 0.999 * Memory.stats['test.cpu.avg1000.test2'] + 0.001 * Memory.stats['test.cpu.avg.test2'];
//console.log(Memory.stats['test.cpu.avg100.test2'] + ": Test 2")
    }
};