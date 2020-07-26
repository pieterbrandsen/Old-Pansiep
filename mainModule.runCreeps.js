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
    // Make Check For If Counter Was Runned //
    let counterIsRunned = false;


    function addRoleToMemory(roomName, role) {
      // Run Each 10 Ticks //
      if (Game.time % 10 == 0) {
        // Define Variables //
        const flagMemory = Memory.flags[roomName];
        const rolesCount = flagMemory.rolesCount;

        // If FlagMemory Has RolesCount Defined //
        if (rolesCount) {
          // If Role Is Not Yet In Memory, Else +1 //
          if (!rolesCount[role])
          rolesCount[role] = 0;
          else
          rolesCount[role]++;
        }
        else
        // Define RolesCount //
        flagMemory.rolesCount = {};

        // CounterIsRunned Is True, Run At The End The RoleCount Reset //
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
          // Run Role Code, Add Role To RoleCount //
          roleHarvester.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "transferer":
          // Run Role Code, Add Role To RoleCount //
          roleTransferer.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "transfererLiTe":
          // Run Role Code, Add Role To RoleCount //
          roleTransfererLiTe.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "builder":
          // Run Role Code, Add Role To RoleCount //
          roleBuilder.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "upgrader":
          // Run Role Code, Add Role To RoleCount //
          roleUpgrader.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "repairer":
          // Run Role Code, Add Role To RoleCount //
          roleRepairer.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "extractor":
          // Run Role Code, Add Role To RoleCount //
          roleExtractor.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "claimer":
          // Run Role Code, Add Role To RoleCount //
          roleClaimer.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "attacker":
          // Run Role Code, Add Role To RoleCount //
          roleAttacker.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "builderLD":
          // Run Role Code, Add Role To RoleCount //
          roleBuilderLD.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "ruinWithdrawer":
          // Run Role Code, Add Role To RoleCount //
          roleRuinWithdrawer.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "reserverLD":
          // Run Role Code, Add Role To RoleCount //
          roleReserverLD.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "harvesterLD-0":
        case "harvesterLD-1":
        case "harvesterLD-2":
        case "harvesterLD-3":
          // Run Role Code, Add Role To RoleCount //
          roleHarvesterLD.run(creep);
          addRoleToMemory(targetRoom, role);
          break;
        case "transfererLD":
          // Run Role Code, Add Role To RoleCount //
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
