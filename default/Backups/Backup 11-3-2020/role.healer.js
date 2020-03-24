module.exports = {
    run: function(creep) {
        let flag = creep.memory.target;
        if (creep.room.name === creep.memory.target) {
            let creepFlag = Memory.flags[creep.room.name + "-ATTACKER"];
            if (Game.flags[creep.room.name + "-ATTACKER"] == undefined) {
                creep.room.createFlag(25,25, creep.room.name + "-ATTACKER")
            }
            if (!Memory.flags[creep.room.name + "-ATTACKER"]) {
                Memory.flags[creep.room.name + "-ATTACKER"] = {}
            }
    
            creepFlag.creepDamaged = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax;
                }
            });



            let attacker = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.memory.role == "attackerMelee2";
                }
            });
            let target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax && object.memory.role == "attackerMelee2";
                }
            });
            let target2 = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax && object.memory.role == "attackerHeal1";
                }
            });
            let target3 = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax && object.pos.inRangeTo(creep,5) && !object.memory.role == "attackerMelee2" && !object.memory.role == "attackerHeal1";
                }
            });
            let healer = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: function(object) {
                    return object.hits < object.hitsMax && object.pos.inRangeTo(creep,5);
                }
            });



            let enemyInRange = creep.memory.enemyInRange = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                filter: function(object) {
                    return object.pos.inRangeTo(creep, 5);
                }
            });
            if (creepFlag.attacker[0] !== undefined) {
                if (target !== null) {
                    if(creep.heal(target) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(target);
                    }
                }
                else if (target2 !== null) {
                    if (creep.heal(target2) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(target2);
                    }
                }
                else if (target3 !== null) {
                    if(creep.heal(target3) === ERR_NOT_IN_RANGE) {
                        creep.travelTo(target3);
                    }
                }
                else {
                    creep.travelTo(attacker, {movingTarget:true})
                }
            }
            else if (Game.flags[flag] !== undefined) {
                creep.travelTo((Game.flags[flag]))
            }
        }
        else if (creep.room.name !== creep.memory.target) {
            if (Game.flags[flag] !== undefined) {
                creep.travelTo((Game.flags[flag]))
            }
            else if (Game.flags[flag] === undefined) {
                Game.notify("There is no flag in " + creep.memory.target + "!")
            }
        }
    }
};