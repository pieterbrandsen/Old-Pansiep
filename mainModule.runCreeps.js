const roleHarvester = require('role.harvester');
const roleTransferer = require('role.transferer');
const roleTransfererLiTe = require('role.transfererLiTe');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleBuilderLD = require('role.builderLD');
const roleRepairer = require('role.repairer');
const roleExtractor = require('role.extractor');
const roleClaimer = require('role.claimer');
const roleAttacker = require('role.attacker');

const rolePixelFarmer = require('role.pixelFarmer');
const roleRuinWithdrawer = require('role.ruinWithdrawer');
const roleShardUp = require('role.shardUp');

const roleReserverLD = require('role.reserver');
const roleHarvesterLD = require('role.harvesterLD');
const roleTransfererLD = require('role.transfererLD');

module.exports = {
  run: function() {
    let counterIsRunned = false;
    function addRoleToMemory(roomName, role) {
        if (Game.time % 10 == 0) {
          const flagMemory = Memory.flags[roomName];
          let rolesCount = flagMemory.rolesCount;
          if (rolesCount) {
            if (!rolesCount[role])
            rolesCount[role] = 0;
            else
            rolesCount[role]++;
          }

          if (!counterIsRunned)
          counterIsRunned = true;
        }
    }

    function resetCreepAmount() {
      Object.keys(Memory.flags).forEach((flag, i) => {
        const flagMemory = Memory.flags[flag]
        if (flagMemory.rolesCount) {
          Object.keys(flagMemory.rolesCount).forEach((item, i) => {
            flagMemory.rolesCount[item] = 0;
          });
        }
      });
    }

    // Loop Through All Alive Creeps //
    for (let name in Game.creeps) {
      // Get Creep And Creep Memory //
      const creep = Game.creeps[name];
      const role = creep.memory.role
      const targetRoom = creep.memory.targetRoom;

      // Check For Each Possible Role And Run The Right Code Part For The Creep //
      switch (role) {
        case "harvester-0":
        case "harvester-1":
          roleHarvester.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "transferer":
          roleTransferer.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "transfererLiTe":
          roleTransfererLiTe.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "builder":
          roleBuilder.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "upgrader":
          roleUpgrader.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "repairer":
          roleRepairer.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "extractor":
          roleExtractor.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "claimer":
          roleClaimer.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "attacker":
          roleAttacker.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "builderLD":
          roleBuilderLD.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "ruinWithdrawer":
          roleRuinWithdrawer.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "reserverLD":
          roleReserverLD.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "harvesterLD-0":
        case "harvesterLD-1":
        case "harvesterLD-2":
        case "harvesterLD-3":
          roleHarvesterLD.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "transfererLD":
          roleTransfererLD.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        default:
          console.log(`Creep in room ${creep.room.name} is missing a role or has no run function. The role is ${role}.`);
          break;
      }

      if (counterIsRunned)
        resetCreepAmount();
    }
  }
}
