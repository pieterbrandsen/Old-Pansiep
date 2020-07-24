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
    for (let name in Game.creeps) {
      let creep = Game.creeps[name];
      let role = creep.memory.role

      if (role) {
        if (creep.memory.role == "harvester-0" || creep.memory.role == "harvester-1") {
          roleHarvester.run(creep);
        }
        else if (creep.memory.role == "transferer") {
          roleTransferer.run(creep);
        }
        else if (creep.memory.role == "builder") {
          roleBuilder.run(creep);
        }
        else if (creep.memory.role == "transfererLiTe") {
          roleTransfererLiTe.run(creep);
        }
        else if (creep.memory.role == "upgrader") {
          roleUpgrader.run(creep);
        }
        else if (creep.memory.role == "repairer") {
          roleRepairer.run(creep);
        }
        else if (creep.memory.role == "extractor") {
          roleExtractor.run(creep);
        }
        else if (creep.memory.role == "claimer") {
          roleClaimer.run(creep);
        }
        else if (creep.memory.role == "attacker") {
          roleAttacker.run(creep);
        }
        else if (creep.memory.role == "builderLD") {
          roleBuilderLD.run(creep);
        }
        else if (creep.memory.role == "pixelFarmer") {
          rolePixelFarmer.run(creep);
        }
        else if (creep.memory.role == "ruinWithdrawer") {
          roleRuinWithdrawer.run(creep);
        }
        else if (creep.memory.role == "reserverLD") {
          roleReserverLD.run(creep);
        }
        else if (creep.memory.role.includes("harvesterLD")) {
          roleHarvesterLD.run(creep);
        }
        else if (creep.memory.role == "transfererLD") {
          roleTransfererLD.run(creep);
        }
        else if (creep.memory.role == "shardUp") {
          roleShardUp.run(creep);
        }
      }
      else {
        if (shardName == "shard0") {
          if (creep.getActiveBodyparts(CLAIM) > 0) {
            creep.memory.role = "claimer";
          }
          else if (creep.getActiveBodyparts(WORK) > 0) {
            creep.memory.working = false;
            creep.memory.spawnRoom = "E43N3";
            creep.memory.role = "builderLD";
          }
          else {
            creep.memory.role  = "pixelFarmer";
          }
        }
        else {
          if (creep.getActiveBodyparts(WORK) > 0 || creep.getActiveBodyparts(CLAIM) > 0)
          creep.memory.role = "shardUp";
          else
          creep.memory.role  = "pixelFarmer";
        }
      }
    }
  }
}
