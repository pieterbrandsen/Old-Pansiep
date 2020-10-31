// #region require
const roomPlanner = require('./roomPlanner');
const spawnCreep = require('./spawnCreep');
const runRoles = require('./runRoles');

require('./config');
// #endregion

// #region Global variables
let roleCountByRoomByRole = {};
roleCountByRoomByRole = {1: 1};
// #endregion

// #region Functions
function getRandomFreePos(startPos, distance) {
  // Get the terrain of the Room //
  const terrain = Game.map.getRoomTerrain(startPos.roomName);
  let x;
  let y;

  // Loop until a random non-wall position is found
  do {
    x = startPos.x + Math.floor(Math.random() * (distance * 2 + 1)) - distance;
    y = startPos.y + Math.floor(Math.random() * (distance * 2 + 1)) - distance;
  } while (
    (x + y) % 2 !== (startPos.x + startPos.y) % 2 ||
    terrain.get(x, y) === TERRAIN_MASK_WALL
  );
  return new RoomPosition(x, y, startPos.roomName);
}
// #endregion

// #region Handlers

// #region Global handler
const globalHandler = () => {
  roleCountByRoomByRole = {};

  if (!Memory.isFilled) memoryHandler('global');
  else {
    // Creep handler //
    // Handles all creeps and runs their role
    creepHandler();

    // Rooms handler //
    // Handles ALL global room related code
    allRoomsHandler();

    // Timers handler //
    // Handles all game timers and runs their code
    timersHandler('global');
  }
};
// #endregion

// #region All rooms handler
const allRoomsHandler = () => {
  // Return if not enough space in the bucket to run rooms //
  if (Game.cpu.bucket <= config.rooms.minBucket) return;

  // Timers through all rooms with vision in them.
  _.forEach(Object.keys(Game.rooms), (roomName) => {
    const room = Game.rooms[roomName];
    if (!roleCountByRoomByRole[roomName]) roleCountByRoomByRole[roomName] = {};
    config.allRoles.forEach((role) => {
      if (!roleCountByRoomByRole[roomName][role]) {
        roleCountByRoomByRole[roomName][role] = 0;
      }
    });

    // Run room handlers //
    if (room.controller && room.controller.my) ownedRoomHandler(room);
    else if (
      room.controller &&
      room.controller.reservation &&
      room.controller.reservation.username === config.username
    ) {
      remoteRoomHandler(room);
    }
  });
};
// #endregion

// #region Owned room handler
const ownedRoomHandler = (room) => {
  // Acces the flag for the room //
  const flag = Game.flags[room.name];

  // If no flag, make a new one and init the memory //
  if (!flag) {
    room.createFlag(
      room.controller ?
        room.controller.pos :
        getRandomFreePos({x: 0, y: 0, roomName: room.name}),
      room.name,
      COLOR_RED,
      COLOR_WHITE,
    );
    Memory.flags[room.name] = {};
    memoryHandler('ownedRoom', {room: room});
  } else {
    // Run room visuals for ownedRooms  //
    roomVisualHandler(room);

    // Run all timers for ownedRooms //
    timersHandler('ownedRoom', {room: room});

    // Run all towers for ownedRooms //
    towerHandler(room);
  }
};
// #endregion

// #region Remote room handler
const remoteRoomHandler = (room) => {
  // Return if not enough space in the bucket to run remotes //
  if (Game.cpu.bucket <= config.rooms.remote.minBucket) return;

  // Acces the flag for the room //
  const flag = Game.flags[room.name];

  // If no flag, make a new one and init the memory //
  if (!flag) {
    room.createFlag(
      room.controller ?
        room.controller.pos :
        getRandomFreePos({x: 0, y: 0, roomName: room.name}),
      room.name,
      COLOR_RED,
      COLOR_WHITE,
    );
    Memory.flags[room.name] = {};
    memoryHandler('remoteRoom', {room: room});
  } else {
    // Run room visuals for remoteRoom  //
    roomVisualHandler(room);

    // Run all timers for remoteRoom //
    timersHandler('remoteRoom', {room: room});
  }
};
// #endregion

// #region Creep handler
const creepHandler = () => {
  _.forEach(Object.keys(Memory.creeps), (creepName) => {
    // Acces Creep object
    const creep = Game.creeps[creepName];

    // Check if creep is dead (undefined) //
    if (creep === undefined) {
      delete Memory.creeps[creepName];
    } else {
      // Else run the creep //
      const creepMemory = Memory.creeps[creepName];
      const flagMemory = Memory.flags[creep.memory.targetRoom];
      const creepRoleName = creepMemory.role.split('-')[0];

      // if no role is found, return
      if (!creepRoleName) return;

      // If flagMemory is not yet ready, return
      if (!flagMemory.isFilled) return;

      // Run the role for the creep
      roleHandler(creep, creepRoleName);

      // Role counter //
      if (!roleCountByRoomByRole[creep.room.name]) {
        roleCountByRoomByRole[creep.room.name] = {};
      }
      if (!roleCountByRoomByRole[creep.room.name][creepMemory.role]) {
        roleCountByRoomByRole[creep.room.name][creepMemory.role] = 0;
      }
      roleCountByRoomByRole[creep.room.name][creepMemory.role]++;
    }
  });
};
// #endregion

// #region Role handler
const roleHandler = (creep, roleName) => {
  const shortRoleName = roleName.replace('LD', '');

  runRoles[shortRoleName](creep, shortRoleName);
};
// #endregion

// #region Memory handler
const memoryHandler = (goal, data) => {
  // #region Global memory
  // Get a object back with all the universal memory for a owned and remote room //
  const globalMemory = () => {
    // Timers until the memory Length is the same as last time //
    let memoryLength = 0;
    let endLoop = false;
    while (!endLoop) {
      // Init undefined memory
      if (!Memory.creeps) Memory.creeps = {};
      if (!Memory.flags) Memory.flags = {};
      if (!Memory.stats) Memory.stats = {};

      // Check if current memory size is the same as last loop
      if (memoryLength === Object.keys(Memory).length) {
        Memory.isFilled = true;
        endLoop = true;
      } else memoryLength = Object.keys(Memory).length;
    }
  };
  // #endregion

  // #region Room memory
  // #region Global room memory
  const globalRoomMemory = (room) => {
    // Create a acces point to the flagMemory //
    const flagMemory = Memory.flags[room.name];

    // Needed memory //
    const sources = [];
    room.find(FIND_SOURCES).forEach((source) => {
      // Push the id and position to the memory //
      sources.push({id: source.id, pos: source.pos});
    });

    // Timers until the memory Length is the same as last time //
    let memoryLength = 0;
    let endLoop = false;
    while (!endLoop) {
      // Init undefined memory
      if (!flagMemory.commonMemory) {
        flagMemory.commonMemory = {
          sourceCount: room.find(FIND_SOURCES).length,
          mineral: {
            id: room.find(FIND_MINERALS)[0] ?
              room.find(FIND_MINERALS)[0].id :
              undefined,
            type: room.find(FIND_MINERALS)[0] ?
              room.find(FIND_MINERALS)[0].mineralType :
              undefined,
            amount: room.find(FIND_MINERALS)[0] ?
              room.find(FIND_MINERALS)[0].mineralAmount :
              undefined,
          },
          sources: sources,
          constructionSites: [],
          energyStructures: [],
        };
      }
      if (!flagMemory.roomPlanner) {
        flagMemory.roomPlanner = {room: {sources: []}};
      }
      if (!flagMemory.visuals) flagMemory.visuals = {string: '', objects: {}};
      if (!flagMemory.repair) {
        flagMemory.repair = {
          targets: [],
          hitsTarget: 250 * 1000,
        };
      }
      if (!flagMemory.enemies) {
        flagMemory.enemies = {
          parts: {ATTACK: 0, RANGED_ATTACK: 0, TOUGH: 0, HEAL: 0},
          creeps: [],
        };
      }
      if (!flagMemory.damagedCreeps) flagMemory.damagedCreeps = [];

      // Check if current memory size is the same as last loop
      if (memoryLength === Object.keys(flagMemory).length) {
        endLoop = true;
      } else memoryLength = Object.keys(flagMemory).length;
    }
  };
  // #endregion

  // #region Owned room memory
  const ownedRoomMemory = (room) => {
    // Create a acces point to the flagMemory //
    const flagMemory = Memory.flags[room.name];

    // Timers until the memory Length is the same as last time //
    let memoryLength = 0;
    let endLoop = false;
    while (!endLoop) {
      // Init undefined memory
      if (!flagMemory.commonMemory.controllerLevel) {
        flagMemory.commonMemory.controllerLevel = 1;
      }
      if (!flagMemory.roomPlanner.base) flagMemory.roomPlanner.base = {};
      if (!flagMemory.commonMemory.headSpawnId) {
        flagMemory.commonMemory.headSpawnId = room.terminal ?
          room.terminal.findInRange(room.spawns, 2)[0] ?
            room.terminal.findInRange(room.spawns, 2)[0].id :
            room.spawns[0].id :
          room.spawns[0] ?
            room.spawns[0].id :
            room.find(FIND_STRUCTURES, {
              filter: (s) => s.structureType === STRUCTURE_SPAWN,
            }).length > 0 ?
              room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_SPAWN,
              })[0].id :
              null;
      }
      if (!flagMemory.remotes) {
        flagMemory.remotes = {totalSourceCount: 0, rooms: []};
      }
      if (!flagMemory.commonMemory.spawnEnergyStructures) {
        flagMemory.commonMemory.spawnEnergyStructures = [];
      }
      if (!flagMemory.commonMemory.energyStorages) {
        flagMemory.commonMemory.energyStorages = {usable: 0, capacity: 0};
      }
      if (!flagMemory.commonMemory.controllerStorage) {
        flagMemory.commonMemory.controllerStorage = {
          usable: 0,
        };
      }
      if (!flagMemory.commonMemory.links) {
        flagMemory.commonMemory.links = {source0: '', source1: '', head: '', controller: ''};
      }

      timersHandler('ownedRoom', {room: room});

      // Check if current memory size is the same as last loop
      if (memoryLength === Object.keys(flagMemory).length) {
        flagMemory.isFilled = true;
        endLoop = true;
      } else memoryLength = Object.keys(flagMemory).length;
    }
  };
  // #endregion

  // #region Remote room memory
  const remoteRoomMemory = (room) => {
    // Create a acces point to the flagMemory //
    const flagMemory = Memory.flags[room.name];

    // Timers until the memory Length is the same as last time //
    let memoryLength = 0;
    let endLoop = false;
    while (!endLoop) {
      // Init undefined memory
      timersHandler('remoteRoom', {room: room});

      // Check if current memory size is the same as last loop
      if (memoryLength === Object.keys(flagMemory).length) {
        flagMemory.isFilled = true;
        endLoop = true;
      } else memoryLength = Object.keys(flagMemory).length;
    }
  };
  // #endregion
  // #endregion

  // Switch between te possible goals and get the memory for that goal //
  switch (goal) {
  case 'global':
    globalMemory();
    break;
  case 'ownedRoom':
    globalRoomMemory(data.room);
    ownedRoomMemory(data.room);
    break;
  case 'remoteRoom':
    globalRoomMemory(data.room);
    remoteRoomMemory(data.room);
    break;
  default:
    Game.notify(`Unknown goal: ${goal}, check MemoryHandler.`);
    break;
  }
};

// #endregion

// #region Timers handler
const timersHandler = (goal, data) => {
  // #region Global timers
  // Get a object back with all the universal timers for a owned and remote room //
  const globalTimers = () => {};
  // #endregion

  // #region Room timers
  // #region Global room timers
  const globalRoomTimers = (room) => {
    // Create a acces point to the flagMemory //
    const flagMemory = Memory.flags[room.name];

    // Run room layout planner each ... ticks //
    if (
      Game.time % config.rooms.loops.roomPlanner.room === 0 ||
      !flagMemory.isFilled
    ) {
      roomPlanner.room(room);
    }

    // Get total energy capacity and usage each ... ticks //
    if (
      Game.time % config.rooms.loops.getAllEnergyStructures === 0 ||
      !flagMemory.isFilled
    ) {
      // Reset energyStructures array
      flagMemory.commonMemory.energyStructures = [];

      // Find all structures where energy can be withdrawn from
      const energyStructures = room.find(FIND_STRUCTURES, {
        filter: (s) =>
          [
            STRUCTURE_TERMINAL,
            STRUCTURE_STORAGE,
            STRUCTURE_CONTAINER,
            STRUCTURE_LINK,
          ].indexOf(s.structureType) !== -1,
      });
      let energyUsable = 0;
      let energyCapacity = 0;

      // Loop through all structures that were found
      energyStructures.forEach((storageStructure) => {
        if (
          flagMemory.commonMemory.controllerStorage.id !== storageStructure.id
        ) {
          // Add the total energy available and capacity
          energyUsable += storageStructure.store.getUsedCapacity(
            RESOURCE_ENERGY,
          );
          energyCapacity += storageStructure.store.getCapacity(RESOURCE_ENERGY);

          // Push energy available and id to energyStructures array
          flagMemory.commonMemory.energyStructures.push({
            id: storageStructure.id,
            usable: storageStructure.store.getUsedCapacity(RESOURCE_ENERGY),
          });
        }
      });

      flagMemory.commonMemory.energyStorages.usable = energyUsable;
      flagMemory.commonMemory.energyStorages.capacity = energyCapacity;
      if (
        Game.getObjectById(flagMemory.commonMemory.controllerStorage.id) !==
        null
      ) {
        const controllerStorage = Game.getObjectById(
          flagMemory.commonMemory.controllerStorage.id,
        );
        flagMemory.commonMemory.controllerStorage.usable = controllerStorage.store.getUsedCapacity();
      }
    }

    // Get all construction sites each ... ticks //
    if (
      Game.time % config.rooms.loops.getConstructionStructures === 0 ||
      !flagMemory.isFilled
    ) {
      flagMemory.commonMemory.constructionSites = room
        .find(FIND_CONSTRUCTION_SITES)
        .map((c) => c.id);
    }

    // Get all damaged structures each ... ticks //
    if (
      Game.time % config.rooms.loops.getDamagedStructures === 0 ||
      !flagMemory.isFilled
    ) {
      // Get all structures that are not on max hits and under hitsTarget
      flagMemory.repair.targets = room
        .find(FIND_STRUCTURES, {
          filter: (s) =>
            s.hits < s.hitsMax &&
            s.hits <
              (flagMemory.repair.hitsTarget ?
                flagMemory.repair.hitsTarget :
                250 * 1000),
        })
        .map((c) => c.id);
    }

    // Get all damaged owned creeps each ... ticks //
    if (
      Game.time % config.rooms.loops.getDamagedCreeps === 0 ||
      !flagMemory.isFilled
    ) {
      // Find all creeps that are damaged and is mine
      flagMemory.damagedCreeps = room
        .find(FIND_MY_CREEPS, {
          filter: (c) => c.hits < c.hitsMax,
        })
        .map((c) => c.id);
    }

    // Get all hostile creeps each ... ticks //
    if (
      Game.time % config.rooms.loops.getHostileCreeps === 0 ||
      !flagMemory.isFilled
    ) {
      flagMemory.enemies = {
        parts: {WORK: 0, ATTACK: 0, RANGED_ATTACK: 0, TOUGH: 0, HEAL: 0},
        creeps: [],
      };

      const allHostileCreeps = room.find(FIND_HOSTILE_CREEPS);

      for (let i = 0; i < allHostileCreeps.length; i++) {
        const creep = allHostileCreeps[i];
        // Check if current owner is on whitelist. If so break
        if (config.whitelist.indexOf(creep) >= 0) break;

        // Create variables for creep
        let netToughCount = 0;
        let netAttackCount = 0;
        let netRangedAttackCount = 0;
        let netHealCount = 0;

        // Loop though all the parts in the body to check for boost.
        creep.body.forEach((part) => {
          if (part.boost !== undefined) {
            switch (part.boost) {
            case RESOURCE_UTRIUM_HYDRIDE:
              netAttackCount += 2;
              break;
            case RESOURCE_KEANIUM_OXIDE:
              netRangedAttackCount += 2;
              break;
            case RESOURCE_LEMERGIUM_OXIDE:
              netHealCount += 2;
              break;
              // case RESOURCE_GHODIUM_OXIDE:
              // netToughCount+=2;
              // break;
            case RESOURCE_UTRIUM_ACID:
              netAttackCount += 3;
              break;
            case RESOURCE_KEANIUM_ALKALIDE:
              netRangedAttackCount += 3;
              break;
            case RESOURCE_LEMERGIUM_ALKALIDE:
              netHealCount += 3;
              break;
              // case RESOURCE_GHODIUM_ALKALIDE:
              // netToughCount+=3;
              // break;
            case RESOURCE_CATALYZED_UTRIUM_ACID:
              netAttackCount += 4;
              break;
            case RESOURCE_CATALYZED_KEANIUM_ACID:
              netRangedAttackCount += 4;
              break;
            case RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE:
              netHealCount += 4;
              break;
            case RESOURCE_CATALYZED_GHODIUM_ALKALIDE:
              netToughCount += 4;
              break;
            default:
              break;
            }
          } else {
            switch (part.type) {
            case 'tough':
              netToughCount += 1;
              break;
            case 'attack':
              netAttackCount += 1;
              break;
            case 'ranged_attack':
              netRangedAttackCount += 1;
              break;
            case 'heal':
              netHealCount += 1;
              break;
            default:
              break;
            }
          }
        });

        // Add all found parts to total memory
        flagMemory.enemies.parts.ATTACK += netAttackCount;
        flagMemory.enemies.parts.RANGED_ATTACK += netRangedAttackCount;
        flagMemory.enemies.parts.HEAL += netHealCount;
        flagMemory.enemies.parts.TOUGH += netToughCount;

        // Add creep parts and id to array
        flagMemory.enemies.creeps.push({
          id: creep.id,
          parts: {
            ATTACK: netAttackCount,
            RANGED_ATTACK: netRangedAttackCount,
            TOUGH: netToughCount,
            HEAL: netHealCount,
          },
        });
      }
    }
  };
  // #endregion

  // #region Owned room timers
  const ownedRoomTimers = (room) => {
    // Create a acces point to the flagMemory //
    const flagMemory = Memory.flags[room.name];

    // Run base layout planner each ... ticks //
    if (
      Game.time % config.rooms.loops.roomPlanner.base === 0 ||
      !flagMemory.isFilled ||
      flagMemory.commonMemory.controllerLevel < room.controller.level
    ) {
      flagMemory.commonMemory.controllerLevel = room.controller.level;
      roomPlanner.base(room);
    }

    // Run spawn creep each ... ticks //
    if (
      Game.time % config.rooms.loops.spawnCreep === 0 ||
      !flagMemory.isFilled
    ) {
      const lastRole = spawnCreep.execute(
        room,
        'owned',
        {},
        roleCountByRoomByRole[room.name],
      );

      // If role is remote, this means that nothing spawned
      if (lastRole === 'end') {
        if (flagMemory.remotes.rooms.length > 0) {
          let continueLoop = true;
          flagMemory.remotes.rooms.forEach((remoteRoomName) => {
            const remoteRoom = Game.rooms[remoteRoomName];

            // TODO doesn't do anything when remoteRoom is null
            if (remoteRoom !== null && continueLoop) {
              const remoteLastRole = spawnCreep.execute(
                room,
                'remote',
                {target: remoteRoom.name},
                roleCountByRoomByRole[remoteRoom.name],
              );
              if (remoteLastRole === 'end') continueLoop = false;
            }
          });
        }
      }
    }

    // Get all structures that need's energy each ... ticks //
    if (
      Game.time % config.rooms.loops.getSpawnerEnergy === 0 ||
      !flagMemory.isFilled
    ) {
      flagMemory.commonMemory.spawnEnergyStructures = room
        .find(FIND_MY_STRUCTURES, {
          filter: (s) =>
            [
              STRUCTURE_LAB,
              STRUCTURE_SPAWN,
              STRUCTURE_EXTENSION,
              STRUCTURE_TOWER,
            ].indexOf(s.structureType) !== -1 &&
            s.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
        })
        .map((s) => ({
          id: s.id,
          needed: s.store.getFreeCapacity(RESOURCE_ENERGY),
        }));
    }

    // Check all structures saved in memory if they still alive each ... ticks //
    if (
      Game.time % config.rooms.loops.structureNullChecker === 0 ||
      !flagMemory.isFilled
    ) {
      if (Game.getObjectById(flagMemory.commonMemory.headSpawnId) === null) {
        flagMemory.commonMemory.headSpawnId = room.terminal ?
          room.terminal.findInRange(room.spawns, 2)[0] ?
            room.terminal.findInRange(room.spawns, 2)[0].id :
            room.spawns[0].id :
          room.spawns[0].id;
      }
      if (
        Game.getObjectById(flagMemory.commonMemory.controllerStorage.id) ===
        null
      ) {
        if (flagMemory.roomPlanner.room.controller) {
          const controllerPos = flagMemory.roomPlanner.room.controller.pos;
          const foundStructures = room.lookForAt(
            LOOK_STRUCTURES,
            controllerPos.x,
            controllerPos.y,
          );

          let controllerStorage;
          foundStructures.forEach((structure) => {
            if (
              structure.structureType === STRUCTURE_CONTAINER ||
              structure.structureType === STRUCTURE_LINK
            ) {
              controllerStorage = {
                type: structure.structureType,
                id: structure.id,
              };
            }
          });

          if (controllerStorage) {
            flagMemory.commonMemory.controllerStorage.id = controllerStorage.id;
            flagMemory.commonMemory.controllerStorage.type = controllerStorage.type;
          }
        }
      }

      // Check all links to see if its still there //
      // Check each source for a link
      for (let i = 0; i < flagMemory.commonMemory.sources.length; i++) {
        // Get the source
        const source = flagMemory.commonMemory.sources[i];

        // Find a link
        const sourceLink = source.pos.findInRange(FIND_MY_STRUCTURES, 2, {filter: {structureType: STRUCTURE_LINK}})[0];

        // If a link is found, set it to the memory
        if (sourceLink !== undefined) flagMemory.commonMemory.links[`source${i}`] = sourceLink.id;
      }

      // Check if there is a link at the headSpawn
      const headSpawn = Game.getObjectById(flagMemory.commonMemory.headSpawnId);
      if (headSpawn !== null) {
        // Find a link
        const spawnLink = headSpawn.pos.findInRange(FIND_MY_STRUCTURES, 2, {filter: {structureType: STRUCTURE_LINK}})[0];

        // If a link is found, set it to the memory
        if (spawnLink !== undefined) flagMemory.commonMemory.links['head'] = spawnLink.id;
      }

      // Check if there is a link at the controller
        // Find a link
        const controllerLink = room.controller.pos.findInRange(FIND_MY_STRUCTURES, 2, {filter: {structureType: STRUCTURE_LINK}})[0];

        // If a link is found, set it to the memory
        if (controllerLink !== undefined) flagMemory.commonMemory.links['controller'] = controllerLink.id;

    }

    // Send energy from one link to the other each ... ticks //
    if (Game.time % config.rooms.loops.sendEnergyInLinks === 0 || !flagMemory.isFilled) {
      // Handle all the links in the room
      linkHandler(room);
    }
  };
  // #endregion

  // #region Remote room timers
  const remoteRoomTimers = (room) => {};
  // #endregion
  // #endregion

  // Switch between te possible goals and get the timers for that goal //
  switch (goal) {
  case 'global':
    globalTimers();
    break;
  case 'ownedRoom':
    globalRoomTimers(data.room);
    ownedRoomTimers(data.room);
    break;
  case 'remoteRoom':
    globalRoomTimers(data.room);
    remoteRoomTimers(data.room);
    break;
  default:
    Game.notify(`Unknown goal: ${goal}, check TimersHandler.`);
    break;
  }
};
// #endregion

// #region Tower handler
const towerHandler = (room) => {
  // Get flag memory for room
  const flagMemory = Memory.flags[room.name];

  // Return if there are no towers yet to use
  if (room.towers.length === 0) return;

  if (flagMemory.enemies.creeps.length > 0) {
    // TODO JUST ATTACK THE FIRST CREEP IN LINE FOR THE TIME.
    // TODO UPDATE THIS

    const firstAttackTarget = Game.getObjectById(flagMemory.enemies.creeps[0].id);

    // Return if target is null or target hit points is equal to target
    if (firstAttackTarget === null) {
      flagMemory.enemies.creeps.shift();
      return;
    }

    // Let each tower heal the target
    room.towers.forEach((tower) => {
      tower.attack(firstAttackTarget);
    });
  } else if (flagMemory.damagedCreeps.length > 0) {
    const firstHealTarget = Game.getObjectById(flagMemory.repair.targets[0]);

    // Return if target is null or target hit points is equal to target
    if (firstHealTarget === null || firstHealTarget.hits === firstHealTarget.hitsMax) {
      flagMemory.damagedCreeps.shift();
      return;
    }

    // Let each tower heal the target
    room.towers.forEach((tower) => {
      tower.heal(firstHealTarget);
    });
  } else if (flagMemory.repair.targets.length > 0) {
    // Else if there is something to repair
    const hitsTarget = flagMemory.repair.hitsTarget;
    const firstRepairTarget = Game.getObjectById(flagMemory.repair.targets[0]);

    // Return if target is null or target hit points is higher or at max of target
    if (firstRepairTarget === null || firstRepairTarget.hits > hitsTarget || firstRepairTarget.hits === firstRepairTarget.hitsMax) {
      flagMemory.repair.targets.shift();
      return;
    }

    // Let each tower repair the target
    room.towers.forEach((tower) => {
      tower.repair(firstRepairTarget);
    });
  }
};
// #endregion

// #region Link handler
const linkHandler = (room) => {
  // Get flag memory for room
  const flagMemory = Memory.flags[room.name];

  // Return if there are no links yet to use
  if (room.links.length < 2) return;

  // Define all possible sources
  const source0 = Game.getObjectById(flagMemory.commonMemory.links.source0);
  const source1 = Game.getObjectById(flagMemory.commonMemory.links.source1);
  const head = Game.getObjectById(flagMemory.commonMemory.links.head);
  const controller = Game.getObjectById(flagMemory.commonMemory.links.controller);

  // Define function to check if there is space in target link
  const sendEnergy = (fromLink, toLink) => {
    // If there is low space in target
    if (toLink.store.getFreeCapacity(RESOURCE_ENERGY) < 5) return;

    // If there is enough energy in the sending link to send to target
    if (fromLink.store.getUsedCapacity(RESOURCE_ENERGY) < 100) return;

    // Send energy from fromLink to targetLink
    fromLink.transferEnergy(toLink);
  };


  if (source0 !== null && head !== null) {
    // Send energy from source0 link to head link
    sendEnergy(source0, head);
  }
  if (source1 !== null && head !== null) {
    // Send energy from source1 link to head link
    sendEnergy(source1, head);
  }
  if (head !== null && controller !== null) {
    // Send energy from head link to controller link
    sendEnergy(head, controller);
  }
};
// #endregion

// #region Room visuals handler
const roomVisualHandler = (room) => {
  const flagMemory = Memory.flags[room.name];
  if (flagMemory !== undefined && room.visuals !== undefined) {
    room.visual.import(flagMemory.visuals.string);
  }
};
// #endregion
// #endregion

module.exports = {
  // Global handler //
  // Handles every other handler //
  global: globalHandler,
};
