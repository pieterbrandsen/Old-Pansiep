// #region require
const roomPlanner = require('./roomPlanner');
const spawnCreep = require('./spawnCreep');
const runRoles = require('./runRoles');

require('./config');
// #endregion

// #region global variables
let roleCountByRoomByRole = {};
roleCountByRoomByRole = {1: 1};
// #endregion

// #region functions
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
      if (!roleCountByRoomByRole[roomName][role]) roleCountByRoomByRole[roomName][role] = 0;
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
      if (!roleCountByRoomByRole[creep.room.name]) roleCountByRoomByRole[creep.room.name] = {};
      if (!roleCountByRoomByRole[creep.room.name][creepMemory.role]) roleCountByRoomByRole[creep.room.name][creepMemory.role] = 0;
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
          hitTarget: 250*1000,
        };
      }

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
      if (!flagMemory.roomPlanner.base) flagMemory.roomPlanner.base = {};
      if (!flagMemory.commonMemory.headSpawnId) {
        flagMemory.commonMemory.headSpawnId = room.terminal ?
          room.terminal.findInRange(room.spawns, 2)[0] ?
            room.terminal.findInRange(room.spawns, 2)[0].id :
            room.spawns[0].id :
          room.spawns[0].id;
      }
      if (!flagMemory.remotes) flagMemory.remotes = {totalSourceCount: 0, rooms: []};
      if (!flagMemory.commonMemory.spawnEnergyStructures) flagMemory.commonMemory.spawnEnergyStructures = [];
      if (!flagMemory.commonMemory.energyStorages) flagMemory.commonMemory.energyStorages = {usable: 0, capacity: 0};
      if (!flagMemory.commonMemory.controllerStorage) flagMemory.commonMemory.controllerStorage = {type: undefined, id: undefined};

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
    if (Game.time % config.rooms.loops.roomPlanner.room === 0 || !flagMemory.isFilled) {
      roomPlanner.room(room);
    }

    // Get total energy capacity and usage each ... ticks //
    if (Game.time % config.rooms.loops.getAllEnergyStructures === 0 || !flagMemory.isFilled) {
      // Reset energyStructures array
      flagMemory.commonMemory.energyStructures = [];

      // Find all structures where energy can be withdrawn from
      const energyStructures = room.find(FIND_STRUCTURES, {filter: (s) => [STRUCTURE_TERMINAL, STRUCTURE_STORAGE, STRUCTURE_CONTAINER, STRUCTURE_LINK].indexOf(s.structureType) !== -1});
      let energyUsable = 0;
      let energyCapacity = 0;

      // Loop through all structures that were found
      energyStructures.forEach((storageStructure) => {
        // Add the total energy available and capacity
        energyUsable += storageStructure.store.getUsedCapacity(RESOURCE_ENERGY);
        energyCapacity += storageStructure.store.getCapacity(RESOURCE_ENERGY);

        // Push energy available and id to energyStructures array
        flagMemory.commonMemory.energyStructures.push({id: storageStructure.id, usable: storageStructure.store.getUsedCapacity(RESOURCE_ENERGY)});
      });

      flagMemory.commonMemory.energyStorages.usable = energyUsable;
      flagMemory.commonMemory.energyStorages.capacity = energyCapacity;
      if (Game.getObjectById(flagMemory.commonMemory.controllerStorage.id) !== null) {
        flagMemory.commonMemory.controllerStorage.usable = Game.getObjectById(flagMemory.commonMemory.controllerStorage.id).store.getUsedCapacity();
      }
    }

    // Get all construction sites each ... ticks //
    if (Game.time % config.rooms.loops.getConstructionStructures === 0 || !flagMemory.isFilled) {
      flagMemory.commonMemory.constructionSites = room
        .find(FIND_CONSTRUCTION_SITES)
        .map((c) => c.id);
    }

    // Get all damaged structures each ... ticks //
    if (Game.time % config.rooms.loops.getDamagedStructures === 0 || !flagMemory.isFilled) {
      flagMemory.repair.targets = room
        .find(FIND_STRUCTURES, {
          filter: (s) => s.hits < s.hitsMax && s.hits < ((flagMemory.repair.hitTarget) ? (flagMemory.repair.hitTarget) : 250*1000),
        })
        .map((c) => c.id);
    }
  };
  // #endregion

  // #region Owned room timers
  const ownedRoomTimers = (room) => {
    // Create a acces point to the flagMemory //
    const flagMemory = Memory.flags[room.name];

    // Run base layout planner each ... ticks //
    if (Game.time % config.rooms.loops.roomPlanner.base === 0 || !flagMemory.isFilled) {
      roomPlanner.base(room);
    }

    // Run spawn creep each ... ticks //
    if (Game.time % config.rooms.loops.spawnCreep === 0 || !flagMemory.isFilled) {
      const lastRole = spawnCreep.execute(room, 'owned', {}, roleCountByRoomByRole[room.name]);

      // If role is remote, this means that nothing spawned
      if (lastRole === 'end') {
        if (flagMemory.remotes.rooms.length > 0) {
          let continueLoop = true;
          flagMemory.remotes.rooms.forEach((remoteRoomName) => {
            const remoteRoom = Game.rooms[remoteRoomName];

            // TODO doesn't do anything when remoteRoom is null
            if (remoteRoom !== null && continueLoop) {
              const remoteLastRole = spawnCreep.execute(room, 'remote', {target: remoteRoom.name}, roleCountByRoomByRole[remoteRoom.name]);
              if (remoteLastRole === 'end') continueLoop = false;
            }
          });
        }
      }
    }


    // Get all structures that need's energy each ... ticks //
    if (Game.time % config.rooms.loops.getSpawnerEnergy === 0 || !flagMemory.isFilled) {
      flagMemory.commonMemory.spawnEnergyStructures = room.find(FIND_MY_STRUCTURES, {filter: (s) => [STRUCTURE_LAB, STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER].indexOf(s.structureType) !== -1}).map((s) => s.id);
    }

    // Check all structures saved in memory if they still alive each ... ticks //
    if (Game.time % config.rooms.loops.structureNullChecker === 0 || !flagMemory.isFilled) {
      if (Game.getObjectById(flagMemory.commonMemory.headSpawnId) === null) {
        flagMemory.commonMemory.headSpawnId = room.terminal ?
          room.terminal.findInRange(room.spawns, 2)[0] ?
            room.terminal.findInRange(room.spawns, 2)[0].id :
            room.spawns[0].id :
          room.spawns[0].id;
      }
      if (Game.getObjectById(flagMemory.commonMemory.controllerStorage.id) === null) {
        if (flagMemory.roomPlanner.room.controller) {
          const controllerPos = flagMemory.roomPlanner.room.controller.pos;
          const foundStructures = room.lookForAt(LOOK_STRUCTURES, controllerPos.x, controllerPos.y);

          let controllerStorage;
          foundStructures.forEach((structure) => {
            if (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_LINK) {
              controllerStorage = {type: structure.structureType, id: structure.id};
            }
          });

          if (controllerStorage) flagMemory.commonMemory.controllerStorage = controllerStorage.id;
        }
      }
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
