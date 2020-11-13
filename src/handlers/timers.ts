//#region Require('./)
import {
  Config,
  TimerRunner,
  FunctionRunnerWithCpu,
  GetAllEnergyStructures,
  RoomPlanner,
  BasePlanner
} from "../utils/importer";
//#endregion

//#region Functions()
const globalTimers = () => {};

const globalRoomTimers = (room: Room) => {
  // Create a acces point to the flagMemory //
  const flagMemory: FlagMemory = Memory.flags[room.name];

  // Run RoomPlanner if the TimerRunner returns true;
  if (TimerRunner(Config.rooms.loops.roomPlanner.room) || !flagMemory.isFilled)
    FunctionRunnerWithCpu(
      RoomPlanner,
      Memory.stats[Game.shard.name].rooms[room.name].cpu.smallModules,
      "roomPlanner",
      room
    );
  else Memory.stats[Game.shard.name].rooms[room.name].cpu.smallModules["roomPlanner"] = 0;

  // Run GetAllEnergyStructures if the TimerRunner returns true;
  if (TimerRunner(Config.rooms.loops.roomPlanner.room) || !flagMemory.isFilled)
    FunctionRunnerWithCpu(
      GetAllEnergyStructures,
      Memory.stats[Game.shard.name].rooms[room.name].cpu.smallModules,
      "getAllEnergyStructures",
      room
    );
  else Memory.stats[Game.shard.name].rooms[room.name].cpu.smallModules["getAllEnergyStructures"] = 0;
};

const ownedRoomTimers = (room: Room) => {
  // Run all the timers from the globalRoom part
  globalRoomTimers(room);

  // Create a acces point to the flagMemory //
  const flagMemory: FlagMemory = Memory.flags[room.name];
};

const remoteRoomTimers = (room: Room) => {
  // Run all the timers from the globalRoom part
  globalRoomTimers(room);

  // Create a acces point to the flagMemory //
  const flagMemory: FlagMemory = Memory.flags[room.name];
};
//#endregion
// const globalRoomTimers = (room: Room) => {
//   // Get all construction sites each ... ticks //
//   if (Game.time % config.rooms.loops.getConstructionStructures === 0 || !flagMemory.isFilled) {
//     flagMemory.commonMemory.constructionSites = room.find(FIND_CONSTRUCTION_SITES).map(c => c.id);
//   }

//   // Get all damaged structures each ... ticks //
//   if (Game.time % config.rooms.loops.getDamagedStructures === 0 || !flagMemory.isFilled) {
//     // Get all structures that are not on max hits and under hitsTarget
//     flagMemory.repair.targets = room
//       .find(FIND_STRUCTURES, {
//         filter: s =>
//           s.hits < s.hitsMax && s.hits < (flagMemory.repair.hitsTarget ? flagMemory.repair.hitsTarget : 250 * 1000)
//       })
//       .map(c => c.id);
//   }

//   // Get all damaged owned creeps each ... ticks //
//   if (Game.time % config.rooms.loops.getDamagedCreeps === 0 || !flagMemory.isFilled) {
//     // Find all creeps that are damaged and is mine
//     flagMemory.damagedCreeps = room
//       .find(FIND_MY_CREEPS, {
//         filter: c => c.hits < c.hitsMax
//       })
//       .map(c => c.id);
//   }

//   // Get all hostile creeps each ... ticks //
//   if (Game.time % config.rooms.loops.getHostileCreeps === 0 || !flagMemory.isFilled) {
//     flagMemory.enemies = {
//       parts: { WORK: 0, ATTACK: 0, RANGED_ATTACK: 0, TOUGH: 0, HEAL: 0 },
//       creeps: []
//     };

//     const allHostileCreeps = room.find(FIND_HOSTILE_CREEPS);

//     for (let i = 0; i < allHostileCreeps.length; i++) {
//       const creep = allHostileCreeps[i];
//       // Check if current owner is on whitelist. If so break
//       if (config.whitelist.indexOf(creep) >= 0) break;

//       // Create variables for creep
//       let netToughCount = 0;
//       let netAttackCount = 0;
//       let netRangedAttackCount = 0;
//       let netHealCount = 0;

//       // Loop though all the parts in the body to check for boost.
//       creep.body.forEach(part => {
//         if (part.boost !== undefined) {
//           switch (part.boost) {
//             case RESOURCE_UTRIUM_HYDRIDE:
//               netAttackCount += 2;
//               break;
//             case RESOURCE_KEANIUM_OXIDE:
//               netRangedAttackCount += 2;
//               break;
//             case RESOURCE_LEMERGIUM_OXIDE:
//               netHealCount += 2;
//               break;
//             // case RESOURCE_GHODIUM_OXIDE:
//             // netToughCount+=2;
//             // break;
//             case RESOURCE_UTRIUM_ACID:
//               netAttackCount += 3;
//               break;
//             case RESOURCE_KEANIUM_ALKALIDE:
//               netRangedAttackCount += 3;
//               break;
//             case RESOURCE_LEMERGIUM_ALKALIDE:
//               netHealCount += 3;
//               break;
//             // case RESOURCE_GHODIUM_ALKALIDE:
//             // netToughCount+=3;
//             // break;
//             case RESOURCE_CATALYZED_UTRIUM_ACID:
//               netAttackCount += 4;
//               break;
//             case RESOURCE_CATALYZED_KEANIUM_ACID:
//               netRangedAttackCount += 4;
//               break;
//             case RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE:
//               netHealCount += 4;
//               break;
//             case RESOURCE_CATALYZED_GHODIUM_ALKALIDE:
//               netToughCount += 4;
//               break;
//             default:
//               break;
//           }
//         } else {
//           switch (part.type) {
//             case "tough":
//               netToughCount += 1;
//               break;
//             case "attack":
//               netAttackCount += 1;
//               break;
//             case "ranged_attack":
//               netRangedAttackCount += 1;
//               break;
//             case "heal":
//               netHealCount += 1;
//               break;
//             default:
//               break;
//           }
//         }
//       });

//       // Add all found parts to total memory
//       flagMemory.enemies.parts.ATTACK += netAttackCount;
//       flagMemory.enemies.parts.RANGED_ATTACK += netRangedAttackCount;
//       flagMemory.enemies.parts.HEAL += netHealCount;
//       flagMemory.enemies.parts.TOUGH += netToughCount;

//       // Add creep parts and id to array
//       flagMemory.enemies.creeps.push({
//         id: creep.id,
//         parts: {
//           ATTACK: netAttackCount,
//           RANGED_ATTACK: netRangedAttackCount,
//           TOUGH: netToughCount,
//           HEAL: netHealCount
//         }
//       });
//     }
//   }

//   // Check all structures saved in memory if they still alive each ... ticks //
//   if (Game.time % config.rooms.loops.structureNullChecker === 0 || !flagMemory.isFilled) {
//     const structureExist = (room, pos, structureType) => {
//       const structures = room.lookForAt(LOOK_STRUCTURES, pos.x, pos.y);

//       for (const structure of structures) {
//         if (structure.structureType === structureType) {
//           return [true, structure.id];
//         }
//       }
//       return [false, ""];
//     };

//     // Check all source structures
//     for (let i = 0; i < flagMemory.roomPlanner.room.sources.length; i++) {
//       // Get source
//       const source = flagMemory.roomPlanner.room.sources[i];

//       // Break if there is still a live structure
//       if (Game.getObjectById(source.id) === null) {
//         // Get all structures at saved pos
//         const structureExistResult = structureExist(room, source.pos, source.structureType);

//         // If structure was found
//         if (structureExistResult[0]) {
//           // Get structureObject
//           const structureObject = Game.getObjectById(structureExistResult[1]);

//           // Save the id back to memory
//           flagMemory.roomPlanner.room.sources[i].id = structureObject.id;
//         } else {
//           // Remove id from memory
//           flagMemory.roomPlanner.room.sources[i].id = undefined;
//         }
//       }
//     }
//   }
// };

// const ownedRoomTimers = room => {
//   // Create a acces point to the flagMemory //
//   const flagMemory = Memory.flags[room.name];

//   // Set cpuUsed to zero
//   let cpuUsedStart = Game.cpu.getUsed();
//   let cpuUsedEnd = Game.cpu.getUsed();

//   // Run base layout planner each ... ticks //
//   if (
//     Game.time % config.rooms.loops.roomPlanner.base === 0 ||
//     !flagMemory.isFilled ||
//     flagMemory.commonMemory.controllerLevel < room.controller.level
//   ) {
//     cpuUsedStart = Game.cpu.getUsed();
//     flagMemory.commonMemory.controllerLevel = room.controller.level;
//     cpuUsedEnd = roomPlanner.base(room);
//     smallModulesUsage["basePlanner"] = cpuUsedEnd - cpuUsedStart;
//   } else {
//     smallModulesUsage["basePlanner"] = 0;
//   }

//   // Run spawn creep each ... ticks //
//   if (Game.time % config.rooms.loops.spawnCreep === 0 || !flagMemory.isFilled) {
//     cpuUsedStart = Game.cpu.getUsed();
//     const lastRole = spawnCreep.execute(room, "owned", { roleCount: roleCountByRoomByRole[room.name] });
//     cpuUsedEnd = Game.cpu.getUsed();
//     smallModulesUsage["mainSpawner"] = cpuUsedEnd - cpuUsedStart;
//     cpuUsedStart = cpuUsedEnd;

//     // If role is remote, this means that nothing spawned
//     if (lastRole === "end") {
//       if (flagMemory.remotes.rooms.length > 0) {
//         let continueLoop = true;
//         flagMemory.remotes.rooms.forEach(remoteRoomName => {
//           const remoteRoom = Game.rooms[remoteRoomName];

//           // TODO doesn't do anything when remoteRoom is null
//           if (remoteRoom !== null && continueLoop) {
//             cpuUsedStart = Game.cpu.getUsed();
//             const remoteLastRole = spawnCreep.execute(
//               room,
//               "remote",
//               { target: remoteRoom.name },
//               roleCountByRoomByRole[remoteRoom.name]
//             );
//             cpuUsedEnd = Game.cpu.getUsed();
//             smallModulesUsage["remoteSpawner"] = cpuUsedEnd - cpuUsedStart;
//             cpuUsedStart = cpuUsedEnd;
//             if (remoteLastRole === "end") continueLoop = false;
//           }
//         });
//       }
//     } else {
//       smallModulesUsage["remoteSpawner"] = 0;
//     }
//   } else {
//     smallModulesUsage["mainSpawner"] = 0;
//     smallModulesUsage["remoteSpawner"] = 0;
//   }

//   // Get all structures that need's energy each ... ticks //
//   if (Game.time % config.rooms.loops.getSpawnerEnergy === 0 || !flagMemory.isFilled) {
//     flagMemory.commonMemory.spawnEnergyStructures = room
//       .find(FIND_MY_STRUCTURES, {
//         filter: s =>
//           [STRUCTURE_LAB, STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER].indexOf(s.structureType) !== -1 &&
//           s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
//       })
//       .map(s => ({
//         id: s.id,
//         needed: s.store.getFreeCapacity(RESOURCE_ENERGY)
//       }));
//   }

//   // Check all structures saved in memory if they still alive each ... ticks //
//   if (Game.time % config.rooms.loops.structureNullChecker === 0 || !flagMemory.isFilled) {
//     if (Game.getObjectById(flagMemory.commonMemory.headSpawnId) === null) {
//       flagMemory.commonMemory.headSpawnId = room.terminal
//         ? room.terminal.findInRange(room.spawns, 2)[0]
//           ? room.terminal.findInRange(room.spawns, 2)[0].id
//           : room.spawns[0].id
//         : room.spawns[0].id;
//     }
//     if (Game.getObjectById(flagMemory.commonMemory.controllerStorage.id) === null) {
//       if (flagMemory.roomPlanner.room.controller) {
//         const controllerPos = flagMemory.roomPlanner.room.controller.pos;
//         const foundStructures = room.lookForAt(LOOK_STRUCTURES, controllerPos.x, controllerPos.y);

//         let controllerStorage;
//         foundStructures.forEach(structure => {
//           if (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_LINK) {
//             controllerStorage = {
//               type: structure.structureType,
//               id: structure.id
//             };
//           }
//         });

//         if (controllerStorage) {
//           flagMemory.commonMemory.controllerStorage.id = controllerStorage.id;
//           flagMemory.commonMemory.controllerStorage.type = controllerStorage.type;
//         } else flagMemory.commonMemory.controllerStorage.usable = 0;
//       }
//     }

//     // Check all links to see if its still there //
//     // Check each source for a link
//     if (room.links.length >= 2) {
//       for (let i = 0; i < flagMemory.commonMemory.sources.length; i++) {
//         // Get the source
//         const source = Game.getObjectById(flagMemory.commonMemory.sources[i].id);

//         // Find a link
//         const sourceLink = source.pos.findInRange(FIND_MY_STRUCTURES, 2, {
//           filter: { structureType: STRUCTURE_LINK }
//         })[0];

//         // If a link is found, set it to the memory
//         if (sourceLink !== undefined) {
//           flagMemory.commonMemory.links[`source${i}`] = sourceLink.id;
//         }
//       }

//       // Check if there is a link at the headSpawn
//       const headSpawn = Game.getObjectById(flagMemory.commonMemory.headSpawnId);
//       if (headSpawn !== null) {
//         // Find a link
//         const spawnLink = headSpawn.pos.findInRange(FIND_MY_STRUCTURES, 2, {
//           filter: { structureType: STRUCTURE_LINK }
//         })[0];

//         // If a link is found, set it to the memory
//         if (spawnLink !== undefined) {
//           flagMemory.commonMemory.links["head"] = spawnLink.id;
//         }
//       }

//       // Check if there is a link at the controller
//       // Find a link
//       const controllerLink = room.controller.pos.findInRange(FIND_MY_STRUCTURES, 2, {
//         filter: { structureType: STRUCTURE_LINK }
//       })[0];

//       // If a link is found, set it to the memory
//       if (controllerLink !== undefined) {
//         flagMemory.commonMemory.links["controller"] = controllerLink.id;
//       }
//     }

//     // Set amount of mineral
//     flagMemory.commonMemory.mineral.amount = room.find(FIND_MINERALS)[0]
//       ? Math.round(room.find(FIND_MINERALS)[0].mineralAmount)
//       : undefined;
//   }

//   // Send energy from one link to the other each ... ticks //
//   if (Game.time % config.rooms.loops.sendEnergyInLinks === 0 || !flagMemory.isFilled) {
//     // Handle all the links in the room
//     linkHandler(room);
//   }
// };
