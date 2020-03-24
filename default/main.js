//Import roles
require('prototype.tower');
require('prototype.Room.structures');
require('traveler')

// const traveler = require('traveler');
const roleAttacker = require('role.attacker');
//const roleAttackerSource = require('role.attackerSource');
//const roleAttackerSourceKeeper = require('role.attackerSourceKeeper');

// roleHealer = require('role.healer');

const roleHarvester = require('role.harvester');
//const roleHarvesterSource = require('role.harvesterSource');

const roleExtractor = require('role.extractor');


const roleUpgrader = require('role.upgrader');
//const roleUpgraderSource = require('role.upgraderSource');


const roleTransferer = require('role.transferer');
const roleTransfererLinkToTerminal = require('role.transfererLinkToTerminal');
//const roleTransfererFromTo = require('role.transfererFromTo');


const roleBuilder = require('role.builder');
//const roleBuilderSource = require('role.builderSource');


const roleRepairer = require('role.repairer');
//const roleRepairerSource = require('role.repairerSource');


//const roleClaimer = require('role.claimer');
const roleReserver = require('role.reserver');


const roleScientist = require('role.scientist');

//const roleScout = require('role.scout');

//const roleLongDistanceBuilder = require('role.longDistanceBuilder');
const roleLongDistanceHarvester = require('role.longDistanceHarvester');
//const roleLongDistanceUpgrader = require('role.longDistanceUpgrader');
const roleLongDistanceTransferer = require('role.longDistanceTransferer');
//const roleLongDistanceRepairer = require('role.longDistanceRepairer');

//const profiler = require('screeps-profiler');


// This line monkey patches the global prototypes.
//profiler.enable();
module.exports.loop = function() {
  //profiler.wrap(function () {
    if (Game.cpu.bucket > 1000) {

      // if (!Memory.stats) {
      //     Memory.stats = {}
      // }


      let shardName = Game.shard.name;
      let energyHarvested;


      let startDeleteMemory = Game.cpu.getUsed();

      Memory.creeps;

      if (!Memory.stats) {
        Memory.stats = {}
      }

      if (Game.time % 50 == 0) {
        for (let name in Memory.creeps) {
          if (Game.creeps[name] === undefined) {
            delete Memory.creeps[name];
          }
        }
      }




      function needEnergyInTerminal() {
        if (Memory.rooms["terminalNeedsEnergy"].length > 0 && Memory.rooms["terminalHasEnergy"].length > 0) {
          let terminalRecieve = Game.rooms[Memory.rooms["terminalNeedsEnergy"]].terminal;
          let terminalSend = Game.rooms[Memory.rooms["terminalHasEnergy"]].terminal;
          if (terminalRecieve !== undefined && terminalSend !== undefined) {
            if (terminalRecieve.store.getUsedCapacity(RESOURCE_ENERGY) < 25000 && terminalSend.store.getUsedCapacity(RESOURCE_ENERGY) > 35000) {
              terminalSend.send(RESOURCE_ENERGY,10000,Memory.rooms["terminalNeedsEnergy"])
            }
          }
        }
      }

      if (Game.time % 50 == 0) {
        needEnergyInTerminal()
      }


      Memory.stats['global.deleteMemory.avg'] = Game.cpu.getUsed() - startDeleteMemory;
      Memory.stats['global.deleteMemory.avg10'] = 0.9 * Memory.stats['global.deleteMemory.avg10'] + 0.1 * Memory.stats['global.deleteMemory.avg'];
      Memory.stats['global.deleteMemory.avg100'] = 0.99 * Memory.stats['global.deleteMemory.avg100'] + 0.01 * Memory.stats['global.deleteMemory.avg'];



      let startCreepGlobal = Game.cpu.getUsed(); // Creeps Global CPU Usage Each Room



        for (let name in Game.creeps) {
          let creep = Game.creeps[name];
          let role = creep.memory.role


          if (creep.memory.role == 'claimer') {
              roleClaimer.run(creep);
          }
          if (creep.memory.role == 'rReserver') {
              roleReserver.run(creep);
          }


          if (creep.memory.role == 'scout') {
              roleScout.run(creep);
          }


          if (creep.memory.role == 'harvesterSo1') {
              roleHarvester.run(creep);
          }
          if (creep.memory.role == 'harvesterSo2') {
              roleHarvester.run(creep);
          }
          if (creep.memory.role == 'harvester1') {
            roleHarvester.run(creep);
          }
          if (creep.memory.role == 'harvester2') {
            roleHarvester.run(creep);
          }
          if (creep.memory.role == 'rHarvester1') {
            roleLongDistanceHarvester.run(creep);
          }
          if (creep.memory.role == 'rHarvester2') {
            roleLongDistanceHarvester.run(creep);
          }


          if (creep.memory.role == 'extractor') {
              roleExtractor.run(creep);
          }


          if (creep.memory.role == 'transfererFromTo') {
              roleTransfererFromTo.run(creep);
          }
          if (creep.memory.role == 'transfererSo1') {
              roleTransferer.run(creep);
          }
          if (creep.memory.role == 'transferer1') {
              roleTransferer.run(creep);
          }
          if (creep.memory.role == 'transferer2') {
              roleTransferer.run(creep);
          }
          if (creep.memory.role == 'rTransferer') {
              roleLongDistanceTransferer.run(creep);
          }


          if (creep.memory.role === 'transfererLiTe1') {
              roleTransfererLinkToTerminal.run(creep);
          }


          if (creep.memory.role === 'scientist') {
              roleScientist.run(creep);
          }


          if (creep.memory.role === 'attackerMelee1') {
              roleAttacker.run(creep);
          }
          if (creep.memory.role === 'attackerMelee2') {
              roleAttackerSourceKeeper.run(creep);
          }
          if (creep.memory.role === 'attackerMelee3') {
              roleAttackerSource.run(creep);
          }
          if (creep.memory.role === 'attackerMelee4') {
              roleAttackerSource.run(creep);
          }
          if (creep.memory.role === 'attackerMeleeRange2') {
              roleAttackerSource.run(creep);
          }
          if (creep.memory.role === 'attackerHeal1') {
              roleHealer.run(creep);
          }


          if (creep.memory.role === 'upgraderSo1') {
              roleUpgraderSource.run(creep);
          }
          if (creep.memory.role === 'upgraderSo2') {
              roleUpgraderSource.run(creep);
          }
          if (creep.memory.role === 'upgrader1') {
              roleUpgrader.run(creep);
          }
          if (creep.memory.role === 'upgrader2') {
              roleUpgrader.run(creep);
          }
          if (creep.memory.role === 'upgraderLD1') {
              roleLongDistanceUpgrader.run(creep);
          }


          if (creep.memory.role === 'builderSo1') {
              roleBuilderSource.run(creep);
          }
          if (creep.memory.role === 'builder1') {
              roleBuilder.run(creep);
          }
          if (creep.memory.role === 'builder2') {
              roleBuilder.run(creep);
          }
          if (creep.memory.role === 'builderLD1') {
              roleLongDistanceBuilder.run(creep);
          }


          if (creep.memory.role === 'repairerSo1') {
              roleRepairerSource.run(creep);
          }
          if (creep.memory.role === 'repairer1') {
              roleRepairer.run(creep);
          }
          if (creep.memory.role === 'repairerLD1') {
              roleLongDistanceRepairer.run(creep);
          }
        }
        //Memory.flags[roomName] = {}


      Memory.stats['global.cpu.roleUsage.avg'] = Game.cpu.getUsed() - startCreepGlobal;
      Memory.stats['global.cpu.roleUsage.avg10'] = 0.9 * Memory.stats['global.cpu.roleUsage.avg10'] + 0.1 * Memory.stats['global.cpu.roleUsage.avg'];
      Memory.stats['global.cpu.roleUsage.avg100'] = 0.99 * Memory.stats['global.cpu.roleUsage.avg100'] + 0.01 * Memory.stats['global.cpu.roleUsage.avg'];



      _.forEach(Object.keys(Game.rooms), function (roomName) {
        let controller = Game.rooms[roomName].controller;
        let name = roomName


        if (controller && controller.my) {
          let roomName = name

          let room = Game.rooms[roomName];
          let flag = Memory.flags[roomName];


          if (Game.flags[roomName] == undefined) {
            room.createFlag(25,25, roomName)
          }
          if (!Memory.flags[roomName]) {
              Memory.flags[roomName] = {}
          }

          if (Game.flags[roomName] !== undefined) {
            let startFlagAssign = Game.cpu.getUsed();
            let startRoomCpuUsage = Game.cpu.getUsed();








            let harvester;
            let extractor;

            let transferer;

            let harvesterSo;
            let transfererSo;

            let transfererLiTe;

            let attackerMelee;

            let upgraderSo;
            let upgrader;

            let builder;

            let repairer;

            let scientist;


            if (Game.time % 10 == 0) {
              //flag.totalEnergyCapacity = room.energyCapacityAvailable;
              let spawns = room.spawns.length;
              let extensions = room.extensions.length;

              if (controller.level == 1) {
                if (room.spawns.length > 0) {
                  if (spawns > 1)
                    spawns = 1;

                  flag.totalEnergyCapacity = (spawns * 300);
                  }
              }
              if (controller.level == 2) {
                if (room.spawns.length > 0) {
                  if (spawns > 1)
                    spawns = 1;
                  if (extensions > 5)
                    extensions = 5;

                  flag.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
                  }
              }
              else if (controller.level == 3) {
                if (room.spawns.length > 0) {
                  if (spawns > 1)
                    spawns = 1;
                  if (extensions > 10) {
                    extensions = 10;
                  }

                  flag.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
                  }
              }
              else if (controller.level == 4) {
                if (room.spawns.length > 0) {
                  if (spawns > 1)
                    spawns = 1;
                  if (extensions > 20)
                    extensions = 20;

                  flag.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
                  }
              }
              else if (controller.level == 5) {
                if (room.spawns.length > 0) {
                  if (spawns > 1)
                    spawns = 1;
                  if (extensions > 30)
                    extensions = 30;

                  flag.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
                  }
              }
              else if (controller.level == 6) {
                if (room.spawns.length > 0) {
                  if (spawns > 1)
                    spawns = 1;
                  if (extensions > 40)
                    extensions = 40;

                  flag.totalEnergyCapacity = (spawns * 300) + (extensions * 50);
                  }
              }
              else if (controller.level == 7) {
                if (room.spawns.length > 0) {
                  if (spawns > 2)
                    spawns = 2;
                  if (extensions > 50)
                    extensions = 50;

                  flag.totalEnergyCapacity = (spawns * 300) + (extensions * 100);
                  }
              }
              else if (controller.level == 8) {
                flag.totalEnergyCapacity = (spawns * 300) + (extensions * 200);
              }
            }



            if ((flag.sources == undefined || flag.sources.length == 0) || Game.time % 10000 == 0)
              flag.sources = room.find(FIND_SOURCES);
            if ((flag.mineral == undefined || flag.mineral.length == 0) || Game.time % 10000 == 0)
              flag.mineral = room.find(FIND_MINERALS);



            if (Game.time % 1000 == 0 || !flag.constructions) {
                flag.constructions = room.find(FIND_CONSTRUCTION_SITES);
            }
            if (Game.time % 10 == 0) {
                flag.enemy = room.find(FIND_HOSTILE_CREEPS);
            }


            Memory.stats['rooms.' + roomName + '.flagAssign.getUsed'] = Game.cpu.getUsed() - startFlagAssign;
            Memory.stats['rooms.' + roomName + '.flagAssign.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.flagAssign.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.flagAssign.getUsed'];
            Memory.stats['rooms.' + roomName + '.flagAssign.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.flagAssign.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.flagAssign.getUsed'];

            let startMarket = Game.cpu.getUsed();


            // FLAG MEMORY USAGE //
            let enemy = flag.enemy;
            let construction = flag.constructions;
            let sources = flag.sources;
            let mineralAmount = flag.mineral[0].mineralAmount;
            let mineralType = flag.mineral[0].mineralType;
            let extension = room.extensions.length;
            let totalEnergyAvailable = flag.totalEnergyAvailable;
            let totalEnergyCapacity = flag.totalEnergyCapacity;


            let normalDirections = [TOP_LEFT,LEFT,BOTTOM_LEFT,BOTTOM,BOTTOM_RIGHT];
            let transfererDirections = [TOP_RIGHT];







            if (room.terminal !== undefined && Game.time % 10 == 0 && shardName == "shard3" && room.storage !== undefined) {
              let room;

              room = "E43N3";
              if (needsResource(RESOURCE_HYDROGEN, 7500, roomName) && mineralType !== RESOURCE_HYDROGEN && Game.rooms[room].storage.store.getUsedCapacity(RESOURCE_HYDROGEN) > 5000) {
                Game.rooms[room].terminal.send(RESOURCE_HYDROGEN, 5000, roomName)
              }

              room = "E42N2";
              if (needsResource(RESOURCE_OXYGEN, 7500, roomName) && mineralType !== RESOURCE_OXYGEN && Game.rooms[room].storage.store.getUsedCapacity(RESOURCE_OXYGEN) > 5000) {
                Game.rooms[room].terminal.send(RESOURCE_OXYGEN, 5000, roomName)
              }

              room = "E42N3";
              if (needsResource(RESOURCE_UTRIUM, 7500, roomName) && mineralType !== RESOURCE_UTRIUM && Game.rooms[room].storage.store.getUsedCapacity(RESOURCE_UTRIUM) > 5000) {
                Game.rooms[room].terminal.send(RESOURCE_UTRIUM, 5000, roomName)
              }

              room = "E43N3";
              if (needsResource(RESOURCE_KEANIUM, 7500, roomName) && mineralType !== RESOURCE_KEANIUM && Game.rooms[room].storage.store.getUsedCapacity(RESOURCE_KEANIUM) > 5000) {
               Game.rooms[room].terminal.send(RESOURCE_KEANIUM, 5000, roomName)
              }

              room = "E43N4";
              if (needsResource(RESOURCE_LEMERGIUM, 7500, roomName) && mineralType !== RESOURCE_LEMERGIUM && Game.rooms[room].storage.store.getUsedCapacity(RESOURCE_LEMERGIUM) > 5000) {
                Game.rooms[room].terminal.send(RESOURCE_LEMERGIUM, 5000, roomName)
              }

              room = "E43N4";
              if (needsResource(RESOURCE_ZYNTHIUM, 7500, roomName) && mineralType !== RESOURCE_ZYNTHIUM && Game.rooms[room].storage.store.getUsedCapacity(RESOURCE_ZYNTHIUM) > 5000) {
                Game.rooms[room].terminal.send(RESOURCE_ZYNTHIUM, 5000, roomName)
              }

              room = "E43N4";
              if (needsResource(RESOURCE_CATALYST, 7500, roomName) && mineralType !== RESOURCE_CATALYST && Game.rooms[room].storage.store.getUsedCapacity(RESOURCE_CATALYST) > 5000) {
               Game.rooms[room].terminal.send(RESOURCE_CATALYST, 5000, roomName)
              }
            }

            // Cancel All Orders!
            // for (const id in Game.market.orders) {
            //     Game.market.cancelOrder(id);
            // }

            // if (room.terminal !== undefined && room.storage !== undefined && Game.time % 10 == 0) {
            //   if (Object.keys(flag.orders).length == 0 || Game.time % 1000 == 0) {
            //     flag.orders = Game.market.orders;
            //   }
            //
            //
            //   if (flag.order) {
            //     let currentAmount = flag.order.remainingAmount;
            //     let addAmount = 25 * 1000;
            //     let orderId = flag.order.id;
            //
            //     if (Game.time % 50 == 0) {
            //       for (let i = 0; i< Object.keys(flag.orders).length;i++) {
            //         if (Object.keys(flag.orders)[i] == flag.order.id) {
            //           flag.order = flag.orders[flag.order.id]
            //         }
            //       }
            //
            //       if (!flag.order) {
            //         Game.market.createOrder({
            //           type: ORDER_SELL,
            //           resourceType: mineralType,
            //           price: 2,
            //           totalAmount: 1,
            //           roomName: roomName
            //         });
            //         flag.remainingAmount = 1;
            //         flag.order = Game.market.getAllOrders({type: ORDER_SELL, resourceType: mineralType, roomName: roomName})[0];
            //         console.log("Created new order for: " + mineralType + " in room: " + roomName)
            //       }
            //
            //       let order = Game.market.getAllOrders({type: ORDER_SELL, resourceType: mineralType, roomName: roomName})[0];
            //       if (order !== undefined) {
            //         let orderPrice = flag.order.price;
            //         let newPrice = marketPrice(mineralType, orderPrice);
            //
            //         if (flag.order.price !== newPrice) {
            //           Game.market.changeOrderPrice(orderId, newPrice)
            //           //console.log("Changed the price of the resource: " + mineralType + " from: " + flag.price + " to: " + newPrice)
            //         }
            //
            //         if (haveResource(mineralType, 200000, roomName) == true && currentAmount < 50000) {
            //           Game.market.extendOrder(orderId, addAmount)
            //           console.log(mineralType + " - " + roomName + " - " + addAmount);
            //           flag.remainingAmount = Game.market.getAllOrders({type: ORDER_SELL, resourceType: mineralType, roomName: roomName})[0].remainingAmount;
            //         }
            //       }
            //     }
            //   }
            // }

            Memory.stats['rooms.' + roomName + '.market.getUsed'] = Game.cpu.getUsed() - startMarket;
            Memory.stats['rooms.' + roomName + '.market.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.market.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.market.getUsed'];
            Memory.stats['rooms.' + roomName + '.market.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.market.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.market.getUsed'];


            let startRepair = Game.cpu.getUsed();

            let towers = room.towers;

            if (_.size(flag.enemy) > 0) {
              for (let tower of towers) {
                tower.defend();
              }
            }

            if (_.size(flag.enemy) == 0) {
              let repairTarget = flag.repairTarget;

              if (!flag.repairTarget) {
                flag.repairTarget = [];
              }

              if (flag.repairTarget !== undefined) {
                let repairAmount = 7 * 1000 * 1000 // 8 Million

                if (flag.repairTarget.length == 0 && Game.time % 10000 == 0) {
                  let targetRepair = room.find(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.hits < repairAmount
                  });

                  if (targetRepair.length > 0) {
                    for (let i = 0; targetRepair.length > i; i++) {
                      flag.repairTarget[i] = targetRepair[i].id
                    }
                  }
                }


                if (flag.repairTarget.length > 0) {
                  for (let tower of towers) {
                    let target = Game.getObjectById(flag.repairTarget[0]);

                    if (target !== null) {
                      if (target.hits < target.hitsMax && target.hits < repairAmount) {
                        tower.repair(target);
                      }
                      else {
                        flag.repairTarget.shift();
                      }
                    }
                    else {
                      flag.repairTarget.shift();
                    }
                  }
                }
              }
            }

            Memory.stats['rooms.' + roomName + '.repair.getUsed'] = Game.cpu.getUsed() - startRepair;
            Memory.stats['rooms.' + roomName + '.repair.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.repair.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.repair.getUsed'];
            Memory.stats['rooms.' + roomName + '.repair.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.repair.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.repair.getUsed'];


            let startFunctions = Game.cpu.getUsed();

            function getFirstOpenSpawn() {
              let freeSpawns = room.find(FIND_MY_SPAWNS, {
                filter: (structure) => {
                  return (structure.spawning == null);
                }
              });

              if (freeSpawns.length > 0) {
                return freeSpawns[0];
              }
              return null;
            }

            function getTransfererSpawn() {
              if (room.terminal !== undefined) {
                let freeSpawns = room.terminal.pos.findInRange(FIND_MY_SPAWNS,3);

                if (freeSpawns.length > 0) {
                  return freeSpawns[0];
                }
              }
              return null;
            }



            function transfererLiTeSpawnCreep(spawn,parts,role,roomName,source) {
              let name = role + "-" + Math.round(Math.random() * 100)
              spawn.spawnCreep(
                  parts,
              name,
              {
                  memory: {
                      role: role,
                      working: false,
                      room: roomName,

                  }, directions: transfererDirections
              });
            }
            function harvesterSpawnCreep(spawn,parts,role,roomName,source) {
              let name = role + "-" + Math.round(Math.random() * 100)
              spawn.spawnCreep(
                  parts,
              name,
              {
                  memory: {
                      role: role,
                      working: false,
                      sourceId: source,
                      room: roomName,
                  }, directions: normalDirections
              });
            }
            function normalCreepsSpawnCreep(spawn,parts,role,roomName) {
              let name = role + "-" + Math.round(Math.random() * 100)
              spawn.spawnCreep(
                  parts,
              name,
              {
                  memory: {
                      working: false,
                      role: role,
                      room: roomName,
                  }, directions: normalDirections
              });
            }
            function remoteCreepsSpawnCreep(spawn,parts,role,roomName,targetRoom,sourceId) {
              let name = role + "-" + Math.round(Math.random() * 100)
              spawn.spawnCreep(
                  parts,
              name,
              {
                  memory: {
                      working: false,
                      role: role,
                      room: roomName,
                      targetRoom: targetRoom,
                      sourceId: sourceId,
                  }, directions: normalDirections
              });
            }

            function canCreepSpawn(spawn,parts) {
              let parts2 = (parts.toString()).split(",");
              let spawning = spawn.spawnCreep(
                parts2,
              "name",
              {dryRun: true});

              return spawning;
            }


            function canTransfererSpawn() {
              let numberOfCreepsTransferer = _.sum(Game.creeps, (c) => c.memory.role === "transferer1" && c.memory.room === roomName) + _.sum(Game.creeps, (c) => c.memory.role === "transfererSo1" && c.memory.room === roomName);
              let numberOfCreepsHarvesterSo = _.sum(Game.creeps, (c) => c.memory.role === "harvesterSo1" && c.memory.room === roomName) + _.sum(Game.creeps, (c) => c.memory.role === "harvesterSo2" && c.memory.room === roomName);
              let numberOfCreepsHarvester = _.sum(Game.creeps, (c) => c.memory.role === "harvester1" && c.memory.room === roomName) + _.sum(Game.creeps, (c) => c.memory.role === "harvester2" && c.memory.room === roomName);


              let container = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                  return (structure.structureType == STRUCTURE_CONTAINER && !structure.pos.inRangeTo(room.controller,5));
                }
              });

              let storage = room.storage;
              let terminal = room.terminal;

              if (container.length > 0) {
                let container2 = room.find(room.containers, {
                  filter: (structure) => {
                    return (!structure.pos.inRangeTo(room.controller,5) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 600);
                  }
                });
                if (container2 !== null) {
                  if (numberOfCreepsHarvesterSo > 2 && numberOfCreepsTransferer < 2) {
                    return true;
                  }
                  else if (numberOfCreepsHarvester > 0) {
                    return true;
                  }
                }
              }
              else if (storage !== undefined) {
                let storage2 = storage.store.getUsedCapacity(RESOURCE_ENERGY);
                if (storage2 > 5000) {
                  return true;
                }
              }
              else if (terminal !== undefined) {
                let terminal2 = terminal.store.getUsedCapacity(RESOURCE_ENERGY);
                if (terminal2 > 5000) {
                  return true;
                }
              }
              else {
                return false;
              }
            }





            function needsCreeps(role, roomName, numbers) {
                let numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role === role && c.memory.room === roomName);
                if (role.includes("harvester") == true) {
                  if (role.includes("1")) {
                    return numberOfCreeps < numbers && numberOfCreeps < flag.harvestersNeeded1
                  }
                  else if (role.includes("2")) {
                    return numberOfCreeps < numbers && numberOfCreeps < flag.harvestersNeeded2
                  }
                  else {
                    return numberOfCreeps < numbers
                  }
                }
                else {
                  return numberOfCreeps < numbers
                }
            }
            function needsCreeps2(role, roomName, numbers) {
                let numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role === role && c.memory.room === roomName && c.ticksToLive > 350);
                return numberOfCreeps < numbers
            }

            function needsRemoteCreeps(role, roomName, numbers,targetRoom) {
                let numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role == role && c.memory.room == roomName && c.memory.targetRoom == targetRoom/* && c.ticksToLive > 150*/);
                //console.log(targetRoom + " - " + numberOfCreeps + " - " + role + " - " + numbers)
                return numberOfCreeps < numbers
            }
            //console.log()



            function needsResource(resource, amount, room) {
                let numberOfResource = Game.rooms[room].terminal.store[resource];
                if (numberOfResource === undefined) {
                    return 2
                } else {
                    return numberOfResource < amount
                }
            }

            function haveResource(resource, amount, roomName) {
                let numberOfResource = 0;

                let room = Game.rooms[roomName];

                if (room.storage.store[resource] !== undefined) {
                    numberOfResource += room.storage.store[resource];
                }
                if (room.terminal.store[resource] !== undefined) {
                    numberOfResource += room.terminal.store[resource];
                }
                return numberOfResource > amount
            }
            function marketPrice(resource, currentPrice) {
                let price = Game.market.getAllOrders({type: ORDER_SELL, resourceType: resource});
                price.sort((a, b) => a.price - b.price);

                if (price[0].price * 1,15 > price[2].price && price[0].price * 1,4 > price[5].price) {
                    let newPrice = price[0].price *0.975;
                    return newPrice
                }
                else {
                    let secondPrice = price[3].price;
                    return secondPrice;
                }
            }

            function canHarvesterSpawn(source) {
              const terrain = new Room.Terrain(roomName);
              const sourcePos = source.pos;
              let sourcePosX;
              let sourcePosY;
              let count = 8;

              sourcePosX = source.pos.x-1;
              sourcePosY = source.pos.y-1;
              if (terrain.get(sourcePosX,sourcePosY) == 1)
                count--;

              sourcePosX = source.pos.x;
              sourcePosY = source.pos.y-1;
              if (terrain.get(sourcePosX,sourcePosY) == 1)
                count--;

              sourcePosX = source.pos.x+1;
              sourcePosY = source.pos.y-1;
              if (terrain.get(sourcePosX,sourcePosY) == 1)
                count--;

              sourcePosX = source.pos.x-1;
              sourcePosY = source.pos.y;
              if (terrain.get(sourcePosX,sourcePosY) == 1)
                count--;

              sourcePosX = source.pos.x+1;
              sourcePosY = source.pos.y;
              if (terrain.get(sourcePosX,sourcePosY) == 1)
                count--;

              sourcePosX = source.pos.x-1;
              sourcePosY = source.pos.y+1;
              if (terrain.get(sourcePosX,sourcePosY) == 1)
                count--;

              sourcePosX = source.pos.x;
              sourcePosY = source.pos.y+1;
              if (terrain.get(sourcePosX,sourcePosY) == 1)
                count--;

              sourcePosX = source.pos.x+1;
              sourcePosY = source.pos.y+1;
              if (terrain.get(sourcePosX,sourcePosY) == 1)
                count--;

              return count;
            }

            if (!flag.harvestersNeeded1) {
              flag.harvestersNeeded1 = canHarvesterSpawn(sources[0])
            }
            if (!flag.harvestersNeeded2) {
              flag.harvestersNeeded2 = canHarvesterSpawn(sources[1])
            }


            function findLinksNearStructures() {
              function findClosestLink(objectId) {
                let object = Game.getObjectById(objectId);

                let link = object.pos.findClosestByRange(room.links, {
                  filter: (structure) => {
                    return (structure.pos.inRangeTo(object,5));
                  }
                });

                if (link !== null) {
                  return link.id
                }
              }


              if (!flag.link1) {
                flag.link1 = findClosestLink(sources[0].id);
              }
              if (!flag.link2) {
                flag.link2 = findClosestLink(sources[1].id);
              }
              if (!flag.linkController) {
                flag.linkController = findClosestLink(room.controller.id);
              }
              if (!flag.linkHead) {
                if (Game.spawns[roomName+"-1"]) {
                  flag.linkHead = findClosestLink(Game.spawns[roomName+"-1"].id);
                }
                else if (Game.spawns[roomName+"-2"]) {
                  flag.linkHead = findClosestLink(flag.linkHead = Game.spawns[roomName+"-2"].id);
                }
                else if (Game.spawns[roomName+"-3"]) {
                  flag.linkHead = findClosestLink(flag.linkHead = Game.spawns[roomName+"-3"].id);
                }
                else if (Game.spawns[roomName]) {
                  flag.linkHead = findClosestLink(flag.linkHead = Game.spawns[roomName].id);
                }
              }
            }


            if (Game.time % 500 == 0) {
              if (!flag.link1 && room.links.length > 1) {
                findLinksNearStructures()
              }
              if (!flag.link2 && room.links.length > 1) {
                findLinksNearStructures()
              }
              if (!flag.linkHead && room.links.length > 1) {
                findLinksNearStructures()
              }
              if (!flag.linkController && room.links.length > 1) {
                findLinksNearStructures()
              }
            }

            Memory.stats['rooms.' + roomName + '.functions.getUsed'] = Game.cpu.getUsed() - startFunctions;
            Memory.stats['rooms.' + roomName + '.functions.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.functions.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.functions.getUsed'];
            Memory.stats['rooms.' + roomName + '.functions.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.functions.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.functions.getUsed'];


            let startLink = Game.cpu.getUsed();

            if (Game.time % 2 == 0 && room.links.length > 1) {
              const linkFrom1 = Game.getObjectById(flag.link1)
              const linkFrom2 = Game.getObjectById(flag.link2)
              const linkTo1 = Game.getObjectById(flag.linkHead)
              const linkTo2 = Game.getObjectById(flag.linkController)

              if (linkFrom1 !== null && linkTo1 !== null) {
                if (linkTo1.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                  linkFrom1.transferEnergy(linkTo1)
                }
              }
              if (linkFrom1 !== null && linkTo1 == null && linkTo2 !== null) {
                if (linkTo2.store.getFreeCapacity(RESOURCE_ENERGY) > 200) {
                  linkFrom1.transferEnergy(linkTo2)
                }
              }

              if (linkFrom2 !== null && linkTo1 !== null) {
                if (linkTo1.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                  linkFrom2.transferEnergy(linkTo1)
                }
              }
              if (linkFrom2 !== null && linkTo1 == null && linkTo2 !== null) {
                if (linkTo2.store.getFreeCapacity(RESOURCE_ENERGY) > 200) {
                  linkFrom2.transferEnergy(linkTo2)
                }
              }

              if (linkTo1 !== null && linkTo2 !== null && room.storage !== undefined) {
                if (room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 25000) {
                  if (linkTo2.store.getFreeCapacity(RESOURCE_ENERGY) > 200) {
                    linkTo1.transferEnergy(linkTo2)
                  }
                }
              }
              if (linkTo1 !== null && linkTo2 !== null && room.storage == undefined) {
                if (linkTo2.store.getFreeCapacity(RESOURCE_ENERGY) > 200) {
                  linkTo1.transferEnergy(linkTo2)
                }
              }
            }

            Memory.stats['rooms.' + roomName + '.link.getUsed'] = Game.cpu.getUsed() - startLink;
            Memory.stats['rooms.' + roomName + '.link.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.link.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.link.getUsed'];
            Memory.stats['rooms.' + roomName + '.link.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.link.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.link.getUsed'];

            let startTerminal = Game.cpu.getUsed();


            if (Game.time % 250 == 0 && room.terminal !== undefined) {
              let terminalRecieve = Game.rooms[Memory.rooms["terminalNeedsEnergy"]].terminal;
              let terminalSend = Game.rooms[Memory.rooms["terminalHasEnergy"]].terminal;
              let thisTerminal = room.terminal
              if (thisTerminal.store.getUsedCapacity(RESOURCE_ENERGY) > terminalSend.store.getUsedCapacity(RESOURCE_ENERGY)) {
                Memory.rooms["terminalHasEnergy"] = roomName;
              }
              if (thisTerminal.store.getUsedCapacity(RESOURCE_ENERGY) < terminalRecieve.store.getUsedCapacity(RESOURCE_ENERGY)) {
                Memory.rooms["terminalNeedsEnergy"] = roomName;
              }
              needEnergyInTerminal()
            }


            if (room.terminal !== undefined && Game.time % 20 == 0)
              Memory.stats['rooms.' + roomName + '.terminal.store'] = room.terminal.store.getUsedCapacity(RESOURCE_ENERGY);

            if (room.storage !== undefined && Game.time % 20 == 0)
              Memory.stats['rooms.' + roomName + '.storage.store'] = room.storage.store.getUsedCapacity(RESOURCE_ENERGY);


            Memory.stats['rooms.' + roomName + '.terminal.getUsed'] = Game.cpu.getUsed() - startTerminal;
            Memory.stats['rooms.' + roomName + '.terminal.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.terminal.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.terminal.getUsed'];
            Memory.stats['rooms.' + roomName + '.terminal.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.terminal.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.terminal.getUsed'];





            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.harvester.avg'] = flag.harvesterCpu;
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.harvester.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.harvester.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.harvester.avg'];
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.harvester.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.harvester.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.harvester.avg'];

            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.extractor.avg'] = flag.extractorCpu;
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.extractor.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.extractor.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.extractor.avg'];
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.extractor.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.extractor.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.extractor.avg'];

            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.transferer.avg'] = flag.transfererCpu;
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.transferer.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.transferer.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.transferer.avg'];
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.transferer.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.transferer.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.transferer.avg'];

            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.transfererLiTe.avg'] = flag.transfererLiTeCpu;
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.transfererLiTe.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.transfererLiTe.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.transfererLiTe.avg'];
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.transfererLiTe.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.transfererLiTe.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.transfererLiTe.avg'];

            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.scientist.avg'] = flag.scientistCpu;
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.scientist.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.scientist.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.scientist.avg'];
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.scientist.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.scientist.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.scientist.avg'];

            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.upgrader.avg'] = flag.upgraderCpu;
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.upgrader.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.upgrader.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.upgrader.avg'];
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.upgrader.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.upgrader.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.upgrader.avg'];

            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.builder.avg'] = flag.builderCpu
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.builder.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.builder.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.builder.avg'];
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.builder.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.builder.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.builder.avg'];

            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.repairer.avg'] = flag.repairerCpu
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.repairer.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.repairer.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.repairer.avg'];
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.repairer.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.repairer.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.repairer.avg'];


            flag.claimerCpu = 0;
            flag.harvesterCpu = 0;
            flag.extractorCpu = 0;
            flag.transfererCpu = 0;
            flag.transfererLiTeCpu = 0;
            flag.scientistCpu = 0;
            flag.upgraderCpu = 0;
            flag.builderCpu = 0;
            flag.repairerCpu = 0;



            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rReserver.avg'] = flag.rReserverCpu
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rReserver.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rReserver.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rReserver.avg'];
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rReserver.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rReserver.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rReserver.avg'];

            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rHarvester.avg'] = flag.rHarvesterCpu
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rHarvester.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rHarvester.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rHarvester.avg'];
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rHarvester.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rHarvester.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rHarvester.avg'];

            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rTransferer.avg'] = flag.rTransfererCpu
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rTransferer.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rTransferer.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rTransferer.avg'];
            Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rTransferer.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rTransferer.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.roleUsageSpecifiedAvg.rTransferer.avg'];


            flag.rReserverCpu = 0;
            flag.rHarvesterCpu = 0;
            flag.rTransfererCpu = 0;





            let startSpawn = Game.cpu.getUsed();

            // SPANWING PART!!!
            let spawn = getFirstOpenSpawn()
            let spawn2 = getTransfererSpawn()
            let source1 = sources[0].id;
            let source2 = sources[1].id;
            if (spawn && Game.time % 20 == 0) {
              // Small or Big creep, if low energy small creep

              harvesterSo = [MOVE,
                            WORK,WORK,
                            CARRY]; "300 Energy"
              transfererSo = [MOVE,MOVE,MOVE,
                            CARRY,CARRY,CARRY]; "300 Energy"
              transfererLiTe = [MOVE,
                            CARRY,CARRY,CARRY,CARRY,CARRY]; "300 Energy"

              harvester = [MOVE,
                            WORK,WORK,
                            CARRY]; "300 Energy"
              transferer = [MOVE,MOVE,MOVE,
                            CARRY,CARRY,CARRY]; "300 Energy"
              upgrader = [MOVE,
                        WORK,WORK,
                        CARRY]; "300 Energy"
              builder = [MOVE,MOVE,
                        WORK,
                        CARRY,CARRY]; "300 Energy"
              repairer = [MOVE,MOVE,
                        WORK,
                        CARRY,CARRY]; "300 Energy"


              // Min controller is 2
              if (totalEnergyCapacity >= 300 && totalEnergyCapacity < 400) {
                if (needsCreeps("transfererSo1", roomName, 3) && canCreepSpawn(spawn,transferer) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("transferer1",roomName,1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                }
                else if (needsCreeps("harvesterSo1", roomName, flag.harvestersNeeded1,flag) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester1",roomName,1)) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                }
                else if (needsCreeps("harvesterSo2", roomName, flag.harvestersNeeded2,flag) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                }
                else if (needsCreeps("transferer1", roomName, 3) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                }
                else if (needsCreeps("harvester1", roomName, flag.harvestersNeeded1)) {
                  harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                }
                else if (needsCreeps("harvester2", roomName, flag.harvestersNeeded2) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                }
                else if (needsCreeps("repairer1", roomName, 2) && towers.length == 0) {
                  normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                }
                else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                  normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                }
                else if (needsCreeps("upgrader1", roomName, 3)) {
                  normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                }
              }



              harvester = [MOVE,
                            WORK,WORK,WORK,
                            CARRY]; "400 Energy"
              transferer = [MOVE,MOVE,MOVE,MOVE,
                            CARRY,CARRY,CARRY,CARRY]; "400 Energy"
              upgrader = [MOVE,
                        WORK,WORK,WORK,
                        CARRY]; "400 Energy"
              builder = [MOVE,MOVE,MOVE,
                        WORK,
                        CARRY,CARRY]; "400 Energy"
              repairer = [MOVE,MOVE,
                        WORK,WORK,
                        CARRY,CARRY]; "400 Energy"


              // Min controller is 2
              if (totalEnergyCapacity >= 400 && totalEnergyCapacity < 500) {
                if (needsCreeps("transfererSo1", roomName, 3) && canCreepSpawn(spawn,transferer) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("transferer1",roomName,1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                }
                else if (needsCreeps("harvesterSo1", roomName, flag.harvestersNeeded1) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester1",roomName,1)) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                }
                else if (needsCreeps("harvesterSo2", roomName, flag.harvestersNeeded2) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                }
                else if (needsCreeps("transferer1", roomName, 3) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                }
                else if (needsCreeps("harvester1", roomName, flag.harvestersNeeded1)) {
                  harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                }
                else if (needsCreeps("harvester2", roomName, flag.harvestersNeeded1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                }
                else if (needsCreeps("repairer1", roomName, 2) && towers.length == 0) {
                  normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                }
                else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                  normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                }
                else if (needsCreeps("upgrader1", roomName, 2)) {
                  normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                }
              }


              harvester = [MOVE,
                            WORK,WORK,WORK,WORK,
                            CARRY]; "500 Energy"
              transferer = [MOVE,MOVE,MOVE,MOVE,MOVE,
                            CARRY,CARRY,CARRY,CARRY,CARRY]; "500 Energy"
              upgrader = [MOVE,
                        WORK,WORK,WORK,WORK,
                        CARRY]; "500 Energy"
              builder = [MOVE,MOVE,MOVE,MOVE,
                        WORK,
                        CARRY,CARRY,CARRY]; "500 Energy"
              repairer = [MOVE,MOVE,MOVE,
                        WORK,WORK,
                        CARRY,CARRY,CARRY]; "500 Energy"


              // Min controller is 2
              if (totalEnergyCapacity >= 500 && totalEnergyCapacity < 600) {
                if (needsCreeps("transfererSo1", roomName, 3) && canCreepSpawn(spawn,transferer) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("transferer1",roomName,1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                }
                else if (needsCreeps("harvesterSo1", roomName, flag.harvestersNeeded1) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester1",roomName,1)) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                }
                else if (needsCreeps("harvesterSo2", roomName, flag.harvestersNeeded2) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                }
                else if (needsCreeps("transferer1", roomName, 3) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                }
                else if (needsCreeps("harvester1", roomName, 3)) {
                  harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                }
                else if (needsCreeps("harvester2", roomName, 3) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                }
                else if (needsCreeps("repairer1", roomName, 2) && towers.length == 0) {
                  normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                }
                else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                  normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                }
                else if (needsCreeps("upgrader1", roomName, 2)) {
                  normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                }
              }


              harvester = [MOVE,
                            WORK,WORK,WORK,WORK,WORK,
                            CARRY]; "600 Energy"
              transferer = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
                            CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]; "600 Energy"
              upgrader = [MOVE,
                        WORK,WORK,WORK,WORK,WORK,
                        CARRY]; "600 Energy"
              builder = [MOVE,MOVE,MOVE,MOVE,MOVE,
                        WORK,WORK,
                        CARRY,CARRY,CARRY]; "600 Energy"
              repairer = [MOVE,MOVE,MOVE,MOVE,MOVE,
                        WORK,WORK,
                        CARRY,CARRY,CARRY]; "600 Energy"


              // Min controller is 2
              if (totalEnergyCapacity >= 600 && totalEnergyCapacity < 700) {
                if (needsCreeps("transfererSo1", roomName, 3) && canCreepSpawn(spawn,transferer) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("transferer1",roomName,1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                }
                else if (needsCreeps("harvesterSo1", roomName, flag.harvestersNeeded1) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester1",roomName,1)) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                }
                else if (needsCreeps("harvesterSo2", roomName, flag.harvestersNeeded2) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                }
                else if (needsCreeps("transferer1", roomName, 2) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                }
                else if (needsCreeps("harvester1", roomName, 2)) {
                  harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                }
                else if (needsCreeps("harvester2", roomName, 2) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                }
                else if (needsCreeps("repairer1", roomName, 2) && towers.length == 0) {
                  normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                }
                else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                  normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                }
                else if (needsCreeps("upgrader1", roomName, 2)) {
                  normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                }
              }


              harvester = [MOVE,
                            WORK,WORK,WORK,WORK,WORK /* 6:*/,WORK,
                            CARRY]; "700 Energy"
              transferer = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6:*/,MOVE,MOVE,
                            CARRY,CARRY,CARRY,CARRY,CARRY/* 6:*/,CARRY,CARRY]; "700 Energy"
              upgrader = [MOVE,
                        WORK,WORK,WORK,WORK,WORK/* 6:*/,WORK,
                        CARRY]; "700 Energy"
              builder = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6:*/,MOVE,
                        WORK,WORK,
                        CARRY,CARRY,CARRY,CARRY]; "700 Energy"


              // Min controller is 2
              if (totalEnergyCapacity >= 700 && totalEnergyCapacity < 800) {
                if (needsCreeps("transfererSo1", roomName, 3) && canCreepSpawn(spawn,transferer) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("transferer1",roomName,1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                }
                else if (needsCreeps("harvesterSo1", roomName, flag.harvestersNeeded1) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester1",roomName,1)) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                }
                else if (needsCreeps("harvesterSo2", roomName, flag.harvestersNeeded2) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                }
                else if (needsCreeps("transferer1", roomName, 2) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                }
                else if (needsCreeps("harvester1", roomName, 2)) {
                  harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                }
                else if (needsCreeps("harvester2", roomName, 2) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                }
                else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                  normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                }
                else if (needsCreeps("upgrader1", roomName, 2)) {
                  normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                }
              }


              harvester = [MOVE,
                            WORK,WORK,WORK,WORK,WORK /* 6:*/,WORK,WORK,
                            CARRY]; "800 Energy"
              transferer = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6:*/,MOVE,MOVE,MOVE,
                            CARRY,CARRY,CARRY,CARRY,CARRY/* 6:*/,CARRY,CARRY,CARRY]; "800 Energy"
              upgrader = [MOVE,
                        WORK,WORK,WORK,WORK,WORK/* 6:*/,WORK,WORK,
                        CARRY]; "800 Energy"
              builder = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6:*/,MOVE,MOVE,
                        WORK,WORK,
                        CARRY,CARRY,CARRY,CARRY,CARRY/* 6:*/]; "800 Energy"


              // Min controller is 3
              if (totalEnergyCapacity >= 800 && totalEnergyCapacity < 900) {
                if (needsCreeps("transfererSo1", roomName, 3) && canCreepSpawn(spawn,transferer) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("transferer1",roomName,1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                }
                else if (needsCreeps("harvesterSo1", roomName, flag.harvestersNeeded1) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester1",roomName,1)) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                }
                else if (needsCreeps("harvesterSo2", roomName, flag.harvestersNeeded2) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                }
                else if (needsCreeps("transferer1", roomName, 3) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                }
                else if (needsCreeps("harvester1", roomName, 1)) {
                  harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                }
                else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                }
                else if (needsCreeps("repairer1", roomName, 2) && towers.length == 0) {
                  normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                }
                else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                  normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                }
                else if (needsCreeps("upgrader1", roomName, 2)) {
                  normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                }
              }


              harvester = [MOVE,
                            WORK,WORK,WORK,WORK,WORK /* 6:*/,WORK,WORK,WORK,
                            CARRY]; "900 Energy"
              transferer = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6:*/,MOVE,MOVE,MOVE,MOVE,
                            CARRY,CARRY,CARRY,CARRY,CARRY/* 6:*/,CARRY,CARRY,CARRY,CARRY]; "900 Energy"
              upgrader = [MOVE,
                        WORK,WORK,WORK,WORK,WORK/* 6:*/,WORK,WORK,WORK,
                        CARRY]; "900 Energy"
              builder = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6:*/,MOVE,MOVE,MOVE,
                        WORK,WORK,
                        CARRY,CARRY,CARRY,CARRY,CARRY/* 6:*/,CARRY]; "900 Energy"


              // Min controller is 3
              if (totalEnergyCapacity >= 900 && totalEnergyCapacity < 1000) {
                if (needsCreeps("transfererSo1", roomName, 3) && canCreepSpawn(spawn,transferer) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("transferer1",roomName,1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                }
                else if (needsCreeps("harvesterSo1", roomName, flag.harvestersNeeded1) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester1",roomName,1)) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                }
                else if (needsCreeps("harvesterSo2", roomName, flag.harvestersNeeded2) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                }
                else if (needsCreeps("transferer1", roomName, 3) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                }
                else if (needsCreeps("harvester1", roomName, 1)) {
                  harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                }
                else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                }
                else if (needsCreeps("repairer1", roomName, 2) && towers.length == 0) {
                  normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                }
                else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                  normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                }
                else if (needsCreeps("upgrader1", roomName, 2)) {
                  normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                }
              }


              harvester = [MOVE,
                            WORK,WORK,WORK,WORK,WORK /* 6:*/,WORK,WORK,WORK,WORK,
                            CARRY]; "1000 Energy"
              transferer = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6:*/,MOVE,MOVE,MOVE,MOVE,MOVE/* 11:*/,
                            CARRY,CARRY,CARRY,CARRY,CARRY/* 6:*/,CARRY,CARRY,CARRY,CARRY,CARRY/* 11:*/]; "1000 Energy"
              upgrader = [MOVE,
                        WORK,WORK,WORK,WORK,WORK/* 6:*/,WORK,WORK,WORK,WORK,
                        CARRY]; "1000 Energy"
              builder = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6:*/,MOVE,MOVE,MOVE,MOVE,
                        WORK,WORK,
                        CARRY,CARRY,CARRY,CARRY,CARRY/* 6:*/,CARRY,CARRY]; "1000 Energy"


              // Min controller is 3
              if (totalEnergyCapacity >= 1000 && totalEnergyCapacity < 1250) {
                if (needsCreeps("transfererSo1", roomName, 3) && canCreepSpawn(spawn,transferer) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("transferer1",roomName,1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                }
                else if (needsCreeps("harvesterSo1", roomName, flag.harvestersNeeded1) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester1",roomName,1)) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                }
                else if (needsCreeps("harvesterSo2", roomName, flag.harvestersNeeded2) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                }
                else if (needsCreeps("transferer1", roomName, 3) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                }
                else if (needsCreeps("harvester1", roomName, 1)) {
                  harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                }
                else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                }
                else if (needsCreeps("repairer1", roomName, 2) && towers.length == 0) {
                  normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                }
                else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                  normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                }
                else if (needsCreeps("upgrader1", roomName, 2)) {
                  normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                }
              }


              harvester = [MOVE,MOVE,
                            WORK,WORK,WORK,WORK,WORK /* 6:*/,WORK,WORK,WORK,WORK,WORK,
                            CARRY,CARRY]; "1200 Energy"
              transferer = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6:*/,MOVE,MOVE,MOVE,MOVE,MOVE/* 11:*/,MOVE,MOVE,
                            CARRY,CARRY,CARRY,CARRY,CARRY/* 6:*/,CARRY,CARRY,CARRY,CARRY,CARRY/* 11:*/,CARRY,CARRY]; "1200 Energy"
              upgrader = [MOVE,
                        WORK,WORK,WORK,WORK,WORK/* 6:*/,WORK,WORK,WORK,WORK,WORK/* 11:*/,WORK,
                        CARRY]; "1200 Energy"
              builder = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6:*/,MOVE,MOVE,MOVE,MOVE,MOVE/* 11:*/,MOVE,
                        WORK,WORK,WORK,
                        CARRY,CARRY,CARRY,CARRY,CARRY/* 6:*/,CARRY,CARRY,CARRY]; "1250 Energy"

              // Min controller is 3
              if (totalEnergyCapacity >= 1250 && totalEnergyCapacity < 1500) {
                if (needsCreeps("transfererSo1", roomName, 3) && canCreepSpawn(spawn,transferer) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("transferer1",roomName,1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                }
                else if (needsCreeps("harvesterSo1", roomName, flag.harvestersNeeded1) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester1",roomName,1)) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                }
                else if (needsCreeps("harvesterSo2", roomName, flag.harvestersNeeded2) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                }
                else if (needsCreeps("transferer1", roomName, 3) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                }
                else if (needsCreeps("harvester1", roomName, 1)) {
                  harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                }
                else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                }
                else if (needsCreeps("repairer1", roomName, 2) && towers.length == 0) {
                  normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                }
                else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                  normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                }
                else if (needsCreeps("upgrader1", roomName, 2)) {
                  normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                }
              }


              transferer = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6:*/,MOVE,MOVE,MOVE,MOVE,MOVE/* 11:*/,MOVE,MOVE,MOVE,MOVE,MOVE/* 16:*/,
                            CARRY,CARRY,CARRY,CARRY,CARRY/* 6:*/,CARRY,CARRY,CARRY,CARRY,CARRY/* 11:*/,CARRY,CARRY,CARRY,CARRY,CARRY/* 16:*/]; "1500 Energy"
              upgrader = [MOVE,
                        WORK,WORK,WORK,WORK,WORK/* 6:*/,WORK,WORK,WORK,WORK,WORK/* 11:*/,WORK,WORK,WORK,WORK,
                        CARRY]; "1500 Energy"
              builder = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6:*/,MOVE,MOVE,MOVE,MOVE,MOVE/* 11:*/,MOVE,MOVE,MOVE,
                        WORK,WORK,WORK,WORK,
                        CARRY,CARRY,CARRY,CARRY,CARRY/* 6:*/,CARRY,CARRY,CARRY,CARRY]; "1500 Energy"


              // Min controller is 4
              if (totalEnergyCapacity >= 1500 && totalEnergyCapacity < 1750) {
                if (needsCreeps("transfererSo1", roomName, 3) && canCreepSpawn(spawn,transferer) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("transferer1",roomName,1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                }
                else if (needsCreeps("harvesterSo1", roomName, flag.harvestersNeeded1) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester1",roomName,1)) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                }
                else if (needsCreeps("harvesterSo2", roomName, flag.harvestersNeeded2) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                }
                else if (needsCreeps("transferer1", roomName, 3) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                }
                else if (needsCreeps("harvester1", roomName, 1)) {
                  harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                }
                else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                }
                else if (needsCreeps("repairer1", roomName, 2) && towers.length == 0) {
                  normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                }
                else if (needsCreeps("builder1", roomName, 2) && _.size(construction) > 0) {
                  normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                }
                else if (needsCreeps("upgrader1", roomName, 2)) {
                  normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                }
              }


              upgrader = [MOVE,MOVE,
                        WORK,WORK,WORK,WORK,WORK/* 6:*/,WORK,WORK,WORK,WORK,WORK/* 11:*/,WORK,WORK,WORK,WORK,WORK,
                        CARRY,CARRY]; "1700 Energy"
              builder = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6:*/,MOVE,MOVE,MOVE,MOVE,MOVE/* 11:*/,MOVE,MOVE,MOVE,MOVE,MOVE/* 16:*/,
                        WORK,WORK,WORK,WORK,WORK/* 6:*/,
                        CARRY,CARRY,CARRY,CARRY,CARRY/* 6:*/,CARRY,CARRY,CARRY,CARRY,CARRY/* 11:*/]; "1750 Energy"


              // Min controller is 4
              if (totalEnergyCapacity >= 1750 && totalEnergyCapacity < 2000) {
                if (needsCreeps("transfererSo1", roomName, 3) && canCreepSpawn(spawn,transferer) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("transferer1",roomName,1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                }
                else if (needsCreeps("harvesterSo1", roomName, flag.harvestersNeeded1) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester1",roomName,1)) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                }
                else if (needsCreeps("harvesterSo2", roomName, flag.harvestersNeeded2) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                }
                else if (needsCreeps("transferer1", roomName, 3) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                }
                else if (needsCreeps("harvester1", roomName, 1)) {
                  harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                }
                else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                }
                else if (needsCreeps("repairer1", roomName, 2) && towers.length == 0) {
                  normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                }
                else if (needsCreeps("builder1", roomName, 1) && _.size(construction) > 0) {
                  normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                }
                else if (needsCreeps("upgrader1", roomName, 2)) {
                  normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                }
              }


              harvester = [MOVE,MOVE,MOVE,
                            WORK,WORK,WORK,WORK,WORK /* 6:*/,WORK,WORK,WORK,WORK,WORK/* 11:*/,WORK,WORK,WORK,WORK,WORK,
                            CARRY,CARRY,CARRY]; "1800 Energy"
              upgrader = [MOVE,MOVE,MOVE,
                        WORK,WORK,WORK,WORK,WORK/* 6:*/,WORK,WORK,WORK,WORK,WORK/* 11:*/,WORK,WORK,WORK,WORK,WORK,
                        CARRY,CARRY,CARRY]; "1800 Energy"
              builder = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6:*/,MOVE,MOVE,MOVE,MOVE,MOVE/* 11:*/,MOVE,MOVE,MOVE,MOVE,MOVE/* 16:*/,MOVE,MOVE,MOVE,
                        WORK,WORK,WORK,WORK,
                        CARRY,CARRY,CARRY,CARRY,CARRY/* 6:*/,CARRY,CARRY,CARRY,CARRY,CARRY/* 11:*/,CARRY,CARRY,CARRY,CARRY]; "2000 Energy"


              // Min controller is 5
              if (totalEnergyCapacity >= 2000 && totalEnergyCapacity < 2300) {
                if (needsCreeps("transfererSo1", roomName, 3) && canCreepSpawn(spawn,transferer) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("transferer1",roomName,1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                }
                else if (needsCreeps("harvesterSo1", roomName, flag.harvestersNeeded1) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester1",roomName,1)) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                }
                else if (needsCreeps("harvesterSo2", roomName, flag.harvestersNeeded2) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                }
                else if (needsCreeps("transferer1", roomName, 2) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                }
                else if (needsCreeps("harvester1", roomName, 1)) {
                  harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                }
                else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                }
                else if (needsCreeps("repairer1", roomName, 2) && towers.length == 0) {
                  normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                }
                else if (needsCreeps("builder1", roomName, 1) && _.size(construction) > 0) {
                  normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                }
                else if (needsCreeps("upgrader1", roomName, 2)) {
                  normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                }
              }


              harvester = [MOVE,MOVE,MOVE,
                            WORK,WORK,WORK,WORK,WORK /* 6:*/,WORK,WORK,WORK,WORK,WORK/* 11:*/,WORK,WORK,WORK,WORK,WORK/* 16:*/,WORK,WORK,WORK,WORK,WORK,
                            CARRY,CARRY]; "2250 Energy"
              extractor = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6: */,MOVE,
                            WORK,WORK,WORK,WORK,WORK /* 6:*/,WORK,WORK,WORK,WORK,WORK/* 11:*/,WORK,WORK,WORK,WORK,WORK/* 16:*/,
                            CARRY,CARRY,CARRY,CARRY,CARRY/* 6:*/,CARRY,CARRY,CARRY]; "2200 Energy"
              builder = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6:*/,MOVE,MOVE,MOVE,MOVE,MOVE/* 11:*/,MOVE,MOVE,MOVE,MOVE,MOVE/* 16:*/,MOVE,MOVE,MOVE,MOVE,MOVE/* 21:*/,
                        WORK,WORK,WORK,WORK,WORK/* 6:*/,WORK,
                        CARRY,CARRY,CARRY,CARRY,CARRY/* 6:*/,CARRY,CARRY,CARRY,CARRY,CARRY/* 11:*/,CARRY,CARRY,CARRY,CARRY]; "2300 Energy"


              // Min controller is 6
              if (totalEnergyCapacity >= 2300 && totalEnergyCapacity < 5600) {
                if (needsCreeps("transfererLiTe1", roomName, 1) && room.storage !== undefined && room.terminal !== undefined) {
                  transfererLiTeSpawnCreep(spawn2,transfererLiTe,"transfererLiTe1",roomName);
                }
                else if (needsCreeps("transfererSo1", roomName, 3) && canCreepSpawn(spawn,transferer) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("transferer1",roomName,1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                }
                else if (needsCreeps("harvesterSo1", roomName, flag.harvestersNeeded1) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester1",roomName,1)) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                }
                else if (needsCreeps("harvesterSo2", roomName, flag.harvestersNeeded2) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                }
                else if (needsCreeps("transferer1", roomName, 1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                }
                else if (needsCreeps("harvester1", roomName, 1)) {
                  harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                }
                else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                }
                else if (needsCreeps("repairer1", roomName, 2) && towers.length == 0) {
                  normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                }
                else if (needsCreeps("builder1", roomName, 1) && _.size(construction) > 0) {
                  normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                }
                else if (needsCreeps("extractor", roomName, 1) && room.terminal && room.storage && mineralAmount > 0) {
                  normalCreepsSpawnCreep(spawn,extractor,"extractor",roomName);
                }
                else if (needsCreeps("upgrader1", roomName, 4) && room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 10000) {
                  normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                }
              }


              harvester = [MOVE,MOVE,MOVE,MOVE,MOVE,
                            WORK,WORK,WORK,WORK,WORK /* 6:*/,WORK,WORK,WORK,WORK,WORK/* 11:*/,WORK,WORK,WORK,WORK,WORK/* 16:*/,WORK,WORK,WORK,WORK,WORK/* 21:*/,
                            CARRY,CARRY,CARRY,CARRY,CARRY /* 6:*/,CARRY,CARRY,CARRY]; "2650 Energy"
              builder = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6:*/,MOVE,MOVE,MOVE,MOVE,MOVE/* 11:*/,MOVE,MOVE,MOVE,MOVE,MOVE/* 16:*/,MOVE,MOVE,MOVE,MOVE,MOVE/* 21:*/,MOVE,MOVE,MOVE,MOVE,MOVE,
                        WORK,WORK,WORK,WORK,WORK/* 6:*/,WORK,WORK,WORK,
                        CARRY,CARRY,CARRY,CARRY,CARRY/* 6:*/,CARRY,CARRY,CARRY,CARRY,CARRY/* 11:*/,CARRY,CARRY,CARRY,CARRY,CARRY/* 16:*/,CARRY,CARRY]; "3550 Energy"


              // Min controller is 7
              if (totalEnergyCapacity >= 5600 && totalEnergyCapacity < 12900) {
                if (needsCreeps("transfererLiTe1", roomName, 1) && room.storage !== undefined && room.terminal !== undefined) {
                  transfererLiTeSpawnCreep(spawn2,transfererLiTe,"transfererLiTe1",roomName);
                }
                else if (needsCreeps("transfererSo1", roomName, 3) && canCreepSpawn(spawn,transferer) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("transferer1",roomName,1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                }
                else if (needsCreeps("harvesterSo1", roomName, flag.harvestersNeeded1) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester1",roomName,1)) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                }
                else if (needsCreeps("harvesterSo2", roomName, flag.harvestersNeeded2) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                }
                else if (needsCreeps("transferer1", roomName, 1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                }
                else if (needsCreeps("harvester1", roomName, 1)) {
                  harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                }
                else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                }
                else if (needsCreeps("repairer1", roomName, 2) && towers.length == 0) {
                  normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                }
                else if (needsCreeps("builder1", roomName, 1) && _.size(construction) > 0) {
                  normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                }
                else if (needsCreeps("extractor", roomName, 1) && room.terminal && room.storage && mineralAmount > 0) {
                  normalCreepsSpawnCreep(spawn,extractor,"extractor",roomName);
                }
                else if (needsCreeps("upgrader1", roomName, 5) && room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 50000) {
                  normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                }
              }


              scientist = [MOVE,MOVE,MOVE,MOVE,MOVE/* 6: */,MOVE,MOVE,MOVE,MOVE,MOVE,
                          CARRY,CARRY,CARRY,CARRY,CARRY/* 6: */,CARRY,CARRY,CARRY,CARRY,CARRY]


              // Min controller is 8
              if (totalEnergyCapacity >= 12900) {
                if (needsCreeps("transfererLiTe1", roomName, 1) && room.storage !== undefined && room.terminal !== undefined) {
                  transfererLiTeSpawnCreep(spawn2,transfererLiTe,"transfererLiTe1",roomName);
                }
                else if (needsCreeps("transfererSo1", roomName, 3) && canCreepSpawn(spawn,transferer) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("transferer1",roomName,1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transfererSo,"transfererSo1",roomName);
                }
                else if (needsCreeps("harvesterSo1", roomName, flag.harvestersNeeded1) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester1",roomName,1)) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo1",roomName,source1);
                }
                else if (needsCreeps("harvesterSo2", roomName, flag.harvestersNeeded2) && canCreepSpawn(spawn,harvester) == ERR_NOT_ENOUGH_ENERGY && needsCreeps("harvester2",roomName,1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvesterSo,"harvesterSo2",roomName,source2);
                }
                else if (needsCreeps("transferer1", roomName, 1) && canTransfererSpawn() == true) {
                  normalCreepsSpawnCreep(spawn,transferer,"transferer1",roomName);
                }
                else if (needsCreeps("harvester1", roomName, 1)) {
                  harvesterSpawnCreep(spawn,harvester,"harvester1",roomName,source1);
                }
                else if (needsCreeps("harvester2", roomName, 1) && source2 !== undefined) {
                  harvesterSpawnCreep(spawn,harvester,"harvester2",roomName,source2);
                }
                else if (needsCreeps("repairer1", roomName, 2) && towers.length == 0) {
                  normalCreepsSpawnCreep(spawn,repairer,"repairer1",roomName);
                }
                else if (needsCreeps("builder1", roomName, 1) && _.size(construction) > 0) {
                  normalCreepsSpawnCreep(spawn,builder,"builder1",roomName);
                }
                // else if (needsCreeps("scientist", roomName, 1) && room.storage && room.labs.length > 3) {
                //   normalCreepsSpawnCreep(spawn,scientist,"scientist",roomName);
                // }
                else if (needsCreeps("extractor", roomName, 1) && room.terminal && room.storage && mineralAmount > 0) {
                  normalCreepsSpawnCreep(spawn,extractor,"extractor",roomName);
                }
                else if (needsCreeps("upgrader1", roomName, 1) && room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 100000) {
                  normalCreepsSpawnCreep(spawn,upgrader,"upgrader1",roomName);
                }
              }








              // REMOTES!!!

              let targetRoom;
              const rHarvester = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
              const rTransferer = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY];
              const rReserver = [MOVE,MOVE,CLAIM,CLAIM];

              let attacker = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE];
              let reserver2 = [MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM,CLAIM,CLAIM,CLAIM,CLAIM]

              if (room.energyAvailable > 5000) {
                if (roomName == "E43N2") {
                  targetRoom = "E44N2";
                  if (needsRemoteCreeps("rHarvester1", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rHarvester,"rHarvester1",roomName,targetRoom,"5bbcaf969099fc012e63ad48");
                  }
                  else if (needsRemoteCreeps("rReserver", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rReserver,"rReserver",roomName,targetRoom, "");
                  }
                  else if (needsRemoteCreeps("rTransferer", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rTransferer,"rTransferer",roomName,targetRoom, "");
                  }

                  targetRoom = "E45N2";
                  if (needsRemoteCreeps("rHarvester1", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rHarvester,"rHarvester1",roomName,targetRoom,"5bbcafa79099fc012e63af82");
                  }
                  else if (needsRemoteCreeps("rReserver", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rReserver,"rReserver",roomName,targetRoom, "");
                  }
                  else if (needsRemoteCreeps("rTransferer", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rTransferer,"rTransferer",roomName,targetRoom, "");
                  }
                }


                if (roomName == "E42N3") {
                  targetRoom = "E42N4";
                  if (needsRemoteCreeps("rHarvester1", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rHarvester,"rHarvester1",roomName,targetRoom,"5bbcaf719099fc012e63a9c9");
                  }
                  else if (needsRemoteCreeps("rReserver", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rReserver,"rReserver",roomName,targetRoom,"");
                  }
                  else if (needsRemoteCreeps("rTransferer", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rTransferer,"rTransferer",roomName,targetRoom, "");
                  }

                  targetRoom = "E41N4";
                  if (needsRemoteCreeps("rHarvester1", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rHarvester,"rHarvester1",roomName,targetRoom,"5bbcaf609099fc012e63a846");
                  }
                  else if (needsRemoteCreeps("rReserver", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rReserver,"rReserver",roomName,targetRoom, "");
                  }
                  else if (needsRemoteCreeps("rTransferer", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rTransferer,"rTransferer",roomName,targetRoom, "");
                  }
                }


                if (roomName == "E42N2") {
                  targetRoom = "E41N2";
                  if (needsRemoteCreeps("rHarvester1", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rHarvester,"rHarvester1",roomName,targetRoom,"5bbcaf609099fc012e63a84c");
                  }
                  else if (needsRemoteCreeps("rHarvester2", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rHarvester,"rHarvester2",roomName,targetRoom,"5bbcaf609099fc012e63a84e");
                  }
                  else if (needsRemoteCreeps("rReserver", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rReserver,"rReserver",roomName,targetRoom, "");
                  }
                  else if (needsRemoteCreeps("rTransferer", roomName, 2,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rTransferer,"rTransferer",roomName,targetRoom, "");
                  }

                  targetRoom = "E42N1";
                  if (needsRemoteCreeps("rHarvester1", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rHarvester,"rHarvester1",roomName,targetRoom,"5bbcaf719099fc012e63a9d4");
                  }
                  else if (needsRemoteCreeps("rReserver", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rReserver,"rReserver",roomName,targetRoom, "");
                  }
                  else if (needsRemoteCreeps("rTransferer", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rTransferer,"rTransferer",roomName,targetRoom, "");
                  }
                  // else if (needsRemoteCreeps("attackerMelee1", roomName, 1,targetRoom)) {
                  //   remoteCreepsSpawnCreep(spawn,attacker,"attackerMelee1",roomName,targetRoom, "");
                  // }

                  targetRoom = "E41N1";
                  if (needsRemoteCreeps("rHarvester1", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rHarvester,"rHarvester1",roomName,targetRoom,"5bbcaf609099fc012e63a851");
                  }
                  else if (needsRemoteCreeps("rReserver", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rReserver,"rReserver",roomName,targetRoom, "");
                  }
                  else if (needsRemoteCreeps("rTransferer", roomName, 1,targetRoom)) {
                    remoteCreepsSpawnCreep(spawn,rTransferer,"rTransferer",roomName,targetRoom, "");
                  }
                }


                if (roomName == "E43N4") {
                  // targetRoom = "E43N5";
                  // if (needsRemoteCreeps("rHarvester1", roomName, 1,targetRoom)) {
                  //   remoteCreepsSpawnCreep(spawn,rHarvester,"rHarvester1",roomName,targetRoom,"5bbcaf859099fc012e63ab50");
                  // }
                  // else if (needsRemoteCreeps("rReserver", roomName, 1,targetRoom)) {
                  //   remoteCreepsSpawnCreep(spawn,rReserver,"rReserver",roomName,targetRoom, "");
                  // }
                  // else if (needsRemoteCreeps("rTransferer", roomName, 2,targetRoom)) {
                  //   remoteCreepsSpawnCreep(spawn,rTransferer,"rTransferer",roomName,targetRoom);
                  // }

                  // targetRoom = "E42N5";
                  // if (needsRemoteCreeps("rHarvester1", roomName, 1,targetRoom)) {
                  //   remoteCreepsSpawnCreep(spawn,rHarvester,"rHarvester1",roomName,targetRoom,"5bbcaf709099fc012e63a9c6");
                  // }
                  // else if (needsRemoteCreeps("rReserver", roomName, 1,targetRoom)) {
                  //   remoteCreepsSpawnCreep(spawn,rReserver,"rReserver",roomName,targetRoom, "");
                  // }
                  // else if (needsRemoteCreeps("rTransferer", roomName, 1,targetRoom)) {
                  //   remoteCreepsSpawnCreep(spawn,rTransferer,"rTransferer",roomName,targetRoom);
                  // }
                }
              }
            }
            Memory.stats['rooms.' + roomName + '.spawn.getUsed'] = Game.cpu.getUsed() - startSpawn;
            Memory.stats['rooms.' + roomName + '.spawn.avg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.spawn.avg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.spawn.getUsed'];
            Memory.stats['rooms.' + roomName + '.spawn.avg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.spawn.avg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.spawn.getUsed'];

            Memory.stats['rooms.' + roomName + '.cpuGetUsed'] = Game.cpu.getUsed() - startRoomCpuUsage;
            Memory.stats['rooms.' + roomName + '.cpuAvg10'] = 0.9 * Memory.stats['rooms.' + roomName + '.cpuAvg10'] + 0.1 * Memory.stats['rooms.' + roomName + '.cpuGetUsed'];
            Memory.stats['rooms.' + roomName + '.cpuAvg100'] = 0.99 * Memory.stats['rooms.' + roomName + '.cpuAvg100'] + 0.01 * Memory.stats['rooms.' + roomName + '.cpuGetUsed'];


            if (Game.time % 500) {
              if (room.storage) {
                if (room.storage.store.getFreeCapacity() < 50000) {
                  Game.notify("Check Room: " + roomName + " The storage of storage is low!")
                }
              }
              if (room.terminal) {
                if (room.terminal.store.getFreeCapacity() < 25000) {
                  Game.notify("Check Room: " + roomName + " The storage of terminal is low!")
                }
              }
            }
          }
        }
      });

      // Grafana Global
      let startGrafanaGlobal = Game.cpu.getUsed(); // Grafana Global CPU Usage


      if (Game.time % 20 == 0) {
        Memory.stats['gcl.progress'] = (Game.gcl.progress);
        Memory.stats['gcl.progressTotal'] = Game.gcl.progressTotal;
        Memory.stats['gcl.level'] = Game.gcl.level;

        Memory.stats['market.credits'] = Game.market.credits;

        Memory.stats['global.creepsTotal'] = _.size(Memory.creeps);

        if (Game.time % 500 == 0) {
          Memory.stats['memory.size'] = JSON.stringify(Memory).length
        }

        _.forEach(Object.keys(Game.rooms), function (roomName) {
          let room = Game.rooms[roomName];




          let wall = room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_WALL
          });
          let wall2 = _.sum(room.find(FIND_STRUCTURES), s => (s.structureType === STRUCTURE_WALL) ? s.hits : 0);

          let rampart = room.find(FIND_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_RAMPART
          });
          let rampart2 = _.sum(room.find(FIND_STRUCTURES), s => (s.structureType === STRUCTURE_RAMPART) ? s.hits : 0);




          if (Game.time % 50 == 0) {
            let structures = room.find(FIND_STRUCTURES).length
            Memory.stats['rooms.' + roomName + '.structuresTotal'] = structures


            if (Game.time % 2 == 0) {
              Memory.stats['rooms.' + roomName + '.structures.spawns'] = room.spawns.length;
              Memory.stats['rooms.' + roomName + '.structures.extensions'] = room.extensions.length;
              Memory.stats['rooms.' + roomName + '.structures.towers'] = room.towers.length;
              Memory.stats['rooms.' + roomName + '.structures.links'] = room.links.length;
              Memory.stats['rooms.' + roomName + '.structures.containers'] = room.containers.length;
              Memory.stats['rooms.' + roomName + '.structures.roads'] = room.roads.length;
              Memory.stats['rooms.' + roomName + '.structures.labs'] = room.labs.length;
              Memory.stats['rooms.' + roomName + '.structures.walls'] = wall.length;
              Memory.stats['rooms.' + roomName + '.structures.ramparts'] = rampart.length;
            }
          }

          if (room.controller && room.controller.my) {
            Memory.stats['rooms.' + roomName + '.rcl.level'] = room.controller.level;
            Memory.stats['rooms.' + roomName + '.rcl.progress'] = room.controller.progress;
            Memory.stats['rooms.' + roomName + '.rcl.progressTotal'] = room.controller.progressTotal;

            Memory.stats['rooms.' + roomName + '.spawn.energy'] = room.energyAvailable;
            Memory.stats['rooms.' + roomName + '.spawn.energyTotal'] = room.energyCapacityAvailable;

            if (Game.time % 5 == 0) {
              if (room.storage) {
                Memory.stats['rooms.' + roomName + '.storage.storageSpaceUsed'] = room.storage.store.getUsedCapacity();
                Memory.stats['rooms.' + roomName + '.storage.storage.energy'] = room.storage.store.getUsedCapacity(RESOURCE_ENERGY);
              }
              if (room.terminal) {
                Memory.stats['rooms.' + roomName + '.storage.terminalSpaceUsed'] = room.terminal.store.getUsedCapacity();
                Memory.stats['rooms.' + roomName + '.storage.terminal.energy'] = room.terminal.store.getUsedCapacity(RESOURCE_ENERGY);
              }
            }

            Memory.stats['rooms.' + roomName + '.wall.hits'] = wall2 / wall.length;
            Memory.stats['rooms.' + roomName + '.rampart.hits'] = rampart2 / rampart.length;

            // _.forEach(RESOURCES_ALL, function (minerals) {
            //   let room = Game.rooms[roomName];
            //   let terminal = room.terminal;
            //   let storage = room.storage;
            //
            //   if (room.controller && room.controller.my) {
            //     if (storage) {
            //       Memory.stats['rooms.' + roomName + '.minerals.' + minerals + '.storage'] = storage.store[minerals];
            //     }
            //     if (terminal) {
            //       Memory.stats['rooms.' + roomName + '.minerals.' + minerals + '.terminal'] = terminal.store[minerals];
            //     }
            //   }
            // });
          }
        });
      }

      Memory.stats['global.cpu.avg.grafana'] = Game.cpu.getUsed() - startGrafanaGlobal;
      Memory.stats['global.cpu.avg10.grafana'] = 0.9 * Memory.stats['global.cpu.avg10.grafana'] + 0.1 * Memory.stats['global.cpu.avg.grafana'];
      Memory.stats['global.cpu.avg100.grafana'] = 0.99 * Memory.stats['global.cpu.avg100.grafana'] + 0.01 * Memory.stats['global.cpu.avg.grafana'];

      if (shardName == "shard3") {
        Memory.stats['shard3.cpu.limit'] = 20;
        Memory.stats['cpu.bucket'] = Game.cpu.bucket;
        Memory.stats['cpu.tickLimit'] = Game.cpu.tickLimit;

        Memory.stats['shard3.cpu.getUsed'] = Game.cpu.getUsed();
        Memory.stats['shard3.cpu.cpuAvg10'] = 0.9 * Memory.stats['shard3.cpu.cpuAvg10'] + 0.1 * Memory.stats['shard3.cpu.getUsed'];
        Memory.stats['shard3.cpu.cpuAvg100'] = 0.99 * Memory.stats['shard3.cpu.cpuAvg100'] + 0.01 * Memory.stats['shard3.cpu.getUsed'];
        Memory.stats['shard3.cpu.cpuAvg1000'] = 0.999 * Memory.stats['shard3.cpu.cpuAvg1000'] + 0.001 * Memory.stats['shard3.cpu.getUsed'];
      }
    }
  //});
};




// _.forEach(Object.keys(Game.rooms), function (roomName) {
//   let room = Game.rooms[roomName];
//   if (room.controller && room.controller.my) {
//     let eventLog = room.getEventLog();
//     let harvestEvents = _.filter(eventLog, {event: EVENT_HARVEST});
//     if (harvestEvents.length > 0) {
//       Memory.rooms['harvest.' + roomName] = harvestEvents;
//     }
//
//     _.forEach(Object(Memory.rooms['harvest.' + roomName]), function (event) {
//       let amount = event.data.amount;
//       Memory.stats['rooms.' + roomName + '.events.EnergyHarvested'] += amount
//     });
//     if (Game.time % 25000 == 0) {
//       let nul = 0
//       Memory.stats['rooms.' + roomName + '.events.EnergyHarvested'] = nul;
//     }
//
//
//     let upgradeEvents = _.filter(eventLog, {event: EVENT_UPGRADE_CONTROLLER});
//     if (upgradeEvents.length > 0) {
//       Memory.rooms['upgrade.' + roomName] = upgradeEvents;
//     }
//
//     _.forEach(Object(Memory.rooms['upgrade.' + roomName]), function (event) {
//       let amount = event.data.energySpent;
//       Memory.stats['rooms.' + roomName + '.events.UpgradeEnergy'] += amount
//     });
//     if (Game.time % 25000 == 0) {
//       let nul = 0
//       Memory.stats['rooms.' + roomName + '.events.UpgradeEnergy'] = nul;
//     }
//
//
//     let repairEvents = _.filter(eventLog, {event: EVENT_REPAIR});
//     if (repairEvents.length > 0) {
//       Memory.rooms['repair.' + roomName] = repairEvents;
//     }
//
//     _.forEach(Object(Memory.rooms['repair.' + roomName]), function (event) {
//       let amount = event.data.energySpent;
//       Memory.stats['rooms.' + roomName + '.events.RepairEnergy'] += amount
//     });
//     if (Game.time % 25000 == 0) {
//       let nul = 0
//       Memory.stats['rooms.' + roomName + '.events.RepairEnergy'] = nul;
//     }
//
//
//     let buildEvents = _.filter(eventLog, {event: EVENT_BUILD});
//     if (buildEvents.length > 0) {
//       Memory.rooms['build.' + roomName] = buildEvents;
//     }
//
//     _.forEach(Object(Memory.rooms['build.' + roomName]), function (event) {
//       let amount = (event.data.energySpent);
//       Memory.stats['rooms.' + roomName + '.events.BuildEnergy'] += amount
//     });
//     if (Game.time % 25000 == 0) {
//       let nul = 0
//       Memory.stats['rooms.' + roomName + '.events.BuildEnergy'] = nul;
//     }
//   }
// });



// Game.spawns['E42N2-3'].spawnCreep(
// [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,
//           WORK,WORK,WORK,WORK,WORK,WORK,WORK,
//           CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY],
//     'SCOUT6',
//     {
//         memory: {
//             role: 'scout',
//             working: false,
//         }
//     });


// Game.spawns['E42N2-3'].spawnCreep(
//   [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CLAIM],
//       'SCOUTCLAIM2',
//       {
//             memory: {
//                   role: 'scout',
//                   working: false,
//               }
//           });

/*
if (!Creep.prototype._harvest) {

// Store the original method
    Creep.prototype._harvest = Creep.prototype.harvest;

    // Create our new function
    Creep.prototype.harvest = function() {

        // Add custom functionality

        // Call and return the original method
        return this.harvest();
    };
}
*/



/*
let structs = Game.rooms.E43N3.find(FIND_STRUCTURES);
for (let i = 0; i < structs.length; i++) {
  if (structs[i].structureType == STRUCTURE_RAMPART)
    structs[i].destroy();
}
*/
