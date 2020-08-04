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


    function addRoleAndPartToMemory(roomName, role, part, partsAmount) {
      addRoleToMemory(roomName,role);
      if (part)
      addPartsToMemory(roomName, role, part, partsAmount);
    }

    function addRoleToMemory(roomName, role) {
      // Run Each 10 Ticks //
      if (Game.time % 10 == 0) {
        // Define Variables //
        const flagMemory = Memory.flags[roomName];
        const rolesCount = flagMemory.rolesCount;

        // If FlagMemory Has RolesCount Defined //
        if (rolesCount) {
          // +1 For InputRole, Else Define Role In RolesCount //
          if (rolesCount[role] !== undefined)
          rolesCount[role]++;
          else
          rolesCount[role] = 0;
        }
        else
        // Define RolesCount //
        flagMemory.rolesCount = {};

        // CounterIsRunned Is True, Run At The End The RoleCount Reset //
        if (!counterIsRunned)
        counterIsRunned = true;
      }
    }

    function addPartsToMemory(roomName, role, part, inputPartsAmount) {
      // Run Each 10 Ticks //
      if (Game.time % 10 == 0) {
        // Define Variables //
        const flagMemory = Memory.flags[roomName];
        const partsAmount = flagMemory.partsAmount;

        // If FlagMemory Has PartsAmount Defined //
        if (partsAmount) {
          // Add Parts In ParsAmount, Else Define Part In PartsAmount //
          if (partsAmount[`${role}-${part}`] !== undefined)
          partsAmount[`${role}-${part}`]+=inputPartsAmount;
          else
          partsAmount[`${role}-${part}`] = 0;
        }
        else
        // Define PartsAmount //
        flagMemory.partsAmount = {};

        // CounterIsRunned Is True, Run At The End The RoleCount Reset //
        if (!counterIsRunned)
        counterIsRunned = true;
      }
    }

    // Loop Through All Alive Creeps //
    for (let name in Game.creeps) {
      // Get Creep And Creep Memory //
      const creep = Game.creeps[name];
      const role = creep.memory.role
      const targetRoom = creep.memory.targetRoom;

      if (Memory.flags[creep.memory.targetRoom].trackers !== undefined) {
        // Check For Each Possible Role And Run The Right Code Part For The Creep //
        switch (role) {
          case "harvester-0":
          case "harvester-1":
            // Run Role Code, Add Role To RoleCount //
            roleHarvester.run(creep);
            addRoleAndPartToMemory(targetRoom, role, "WORK", creep.getActiveBodyparts(WORK));
            break;
          case "transferer":
            // Run Role Code, Add Role To RoleCount //
            roleTransferer.run(creep);
            addRoleAndPartToMemory(targetRoom, role, "CARRY", creep.getActiveBodyparts(CARRY));
            break;
          case "transfererLiTe":
            // Run Role Code, Add Role To RoleCount //
            roleTransfererLiTe.run(creep);
            addRoleAndPartToMemory(targetRoom, role, "CARRY", creep.getActiveBodyparts(CARRY));
            break;
          case "builder":
            // Run Role Code, Add Role To RoleCount //
            roleBuilder.run(creep);
            addRoleAndPartToMemory(targetRoom, role, "WORK", creep.getActiveBodyparts(WORK));
            break;
          case "upgrader":
            // Run Role Code, Add Role To RoleCount //
            roleUpgrader.run(creep);
            addRoleAndPartToMemory(targetRoom, role, "WORK", creep.getActiveBodyparts(WORK));
            break;
          case "repairer":
            // Run Role Code, Add Role To RoleCount //
            roleRepairer.run(creep);
            addRoleAndPartToMemory(targetRoom, role, "WORK", creep.getActiveBodyparts(WORK));
            break;
          case "extractor":
            // Run Role Code, Add Role To RoleCount //
            roleExtractor.run(creep);
            addRoleAndPartToMemory(targetRoom, role, "WORK", creep.getActiveBodyparts(WORK));
            break;
          case "claimer":
            // Run Role Code, Add Role To RoleCount //
            roleClaimer.run(creep);
            addRoleAndPartToMemory(targetRoom, role, "CLAIM", creep.getActiveBodyparts(CLAIM));
            break;
          case "attacker":
            // Run Role Code, Add Role To RoleCount //
            roleAttacker.run(creep);
            addRoleAndPartToMemory(targetRoom, role, "RANGED_ATTACK", creep.getActiveBodyparts(RANGED_ATTACK));
            break;
          case "builderLD":
            // Run Role Code, Add Role To RoleCount //
            roleBuilderLD.run(creep);
            addRoleAndPartToMemory(targetRoom, role, "WORK", creep.getActiveBodyparts(WORK));
            break;
          case "ruinWithdrawer":
            // Run Role Code, Add Role To RoleCount //
            roleRuinWithdrawer.run(creep);
            addRoleAndPartToMemory(targetRoom, role, "CARRY", creep.getActiveBodyparts(CARRY));
            break;
          case "reserverLD":
            // Run Role Code, Add Role To RoleCount //
            roleReserverLD.run(creep);
            addRoleAndPartToMemory(targetRoom, role, "CLAIM", creep.getActiveBodyparts(CLAIM));
            break;
          case "harvesterLD-0":
          case "harvesterLD-1":
          case "harvesterLD-2":
          case "harvesterLD-3":
            // Run Role Code, Add Role To RoleCount //
            roleHarvesterLD.run(creep);
            addRoleAndPartToMemory(targetRoom, role, "WORK", creep.getActiveBodyparts(WORK));
            break;
          case "transfererLD":
            // Run Role Code, Add Role To RoleCount //
            roleTransfererLD.run(creep);
            addRoleAndPartToMemory(targetRoom, role, "CARRY", creep.getActiveBodyparts(CARRY));
            break;
          default:
            console.log(`Creep in room ${creep.room.name} is missing a role or has no run function. The role is ${role}.`);
            break;
        }
      }
    }
  }
}
