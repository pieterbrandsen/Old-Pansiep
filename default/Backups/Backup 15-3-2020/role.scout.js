// module.exports = {
//     run: function(creep) {
//         let target = creep.memory.target
//         if (Game.flags[target] !== undefined) {
//             creep.travelTo((Game.flags[target]))
//         }
//         else if (Game.flags[target] === undefined) {
//             Game.notify("There is no flag in " + creep.memory.target + "!")
//         }
//
//         if (creep.room.name === creep.memory.target) {
//             let enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
//                 filter: function(enemy) {
//                     return !enemy.pos.inRangeTo(Game.flags["spawn1"]);
//                 }
//             });
//
//             let creepFlag = Memory.flags[creep.room.name + "-ATTACKER"];
//             if (Game.flags[creep.room.name + "-ATTACKER"] == undefined) {
//                 creep.room.createFlag(25,25, creep.room.name + "-ATTACKER")
//             }
//             if (!Memory.flags[creep.room.name + "-ATTACKER"]) {
//                 Memory.flags[creep.room.name + "-ATTACKER"] = {}
//             }
//
//             if (Game.time % 25 == 0) {
//                 creepFlag.attacker = creep.room.find(FIND_MY_CREEPS, {
//                     filter: function(object) {
//                         return object.memory.role == "attackerMelee2";
//                     }
//                 });
//                 creepFlag.healer = creep.room.find(FIND_MY_CREEPS, {
//                     filter: function(object) {
//                         return object.memory.role == "attackerHeal1";
//                     }
//                 });
//             }
//
//             creepFlag.spawn1 = Game.getObjectById("5bbcaf969099fc012e63ad3c").ticksToSpawn !== undefined ? Game.getObjectById("5bbcaf969099fc012e63ad3c").ticksToSpawn : 301;
//             creepFlag.spawn2 = Game.getObjectById("5bbcaf969099fc012e63ad3e").ticksToSpawn !== undefined ? Game.getObjectById("5bbcaf969099fc012e63ad3e").ticksToSpawn : 301;
//             creepFlag.spawn3 = Game.getObjectById("5bbcaf969099fc012e63ad40").ticksToSpawn !== undefined ? Game.getObjectById("5bbcaf969099fc012e63ad40").ticksToSpawn : 301;
//             creepFlag.spawn4 = Game.getObjectById("5bbcaf969099fc012e63ad41").ticksToSpawn !== undefined ? Game.getObjectById("5bbcaf969099fc012e63ad41").ticksToSpawn : 301;
//             creepFlag.spawnMin = Math.min(creepFlag.spawn2,creepFlag.spawn3,creepFlag.spawn4);
//
//             creepFlag.enemy = enemy !== null ? true : false;
//         }
//     }
// };

module.exports = {
    run: function(creep) {
        let target = "E40N0"

        if (creep.pos.inRangeTo(Game.flags[target],0) == false) {
          creep.travelTo(Game.flags[target])
          console.log(creep.room.name)
        }
        // if (creep.room.name !== target) {
        //     creep.travelTo(Game.flags[target])
        //     console.log(creep.room.name)
        //
        // }
        // else {
        //   creep.travelTo(Game.flags[target])
        //   console.log(creep.room.name)
        // }
    }
};
