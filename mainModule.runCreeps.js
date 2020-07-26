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
    // Loop Through All Alive Creeps //
    for (let name in Game.creeps) {
      // Get Creep And Role //
      let creep = Game.creeps[name];
      let role = creep.memory.role

      // Check For Each Possible Role And Run The Right Code Part For The Creep //
      switch (role) {
        case "harvester-0":
        case "harvester-1":
          roleHarvester.run(creep);
          break;
        case "transferer":
          roleTransferer.run(creep);
          break;
        case "transfererLiTe":
          roleTransfererLiTe.run(creep);
          break;
        case "builder":
          roleBuilder.run(creep);
          break;
        case "upgrader":
          roleUpgrader.run(creep);
          break;
        case "repairer":
          roleRepairer.run(creep);
          break;
        case "extractor":
          roleExtractor.run(creep);
          break;
        case "claimer":
          roleClaimer.run(creep);
          break;
        case "attacker":
          roleAttacker.run(creep);
          break;
        case "builderLD":
          roleBuilderLD.run(creep);
          break;
        case "ruinWithdrawer":
          roleRuinWithdrawer.run(creep);
          break;
        case "reserverLD":
          roleReserverLD.run(creep);
          break;
        case "harvesterLD-0":
        case "harvesterLD-1":
        case "harvesterLD-2":
        case "harvesterLD-3":
          roleHarvesterLD.run(creep);
          break;
        case "transfererLD":
          roleTransfererLD.run(creep);
          break;
        default:
          console.log(`Creep in room ${creep.room.name} is missing a role or has no run function. The role is ${role}.`);
          break;
      }
    }
  }
}
