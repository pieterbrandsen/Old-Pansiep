// #region Require
require('./config');
// #endregion

// #region functions
const initCreepMemory = (room, role, data) => {
  const newMemory = {};
  for (const key in data) {
    if (data[key]) {
      const element = data[key];
      newMemory[element] = data[element];
    }
  }

  // Init all undefined memory variables
  if (!newMemory.targetRoom) newMemory.targetRoom = room.name;
  if (!newMemory.spawnRoom) newMemory.spawnRoom = room.name;
  if (!newMemory.role) newMemory.role = role;
  if (!newMemory.job) newMemory.job = undefined;
  if (!newMemory.targetId) newMemory.targetId = undefined;

  const flagMemory = Memory.flags[newMemory.targetRoom];
  if (role.includes('harvester') && !newMemory.sourceId) {
    if (typeof flagMemory.commonMemory.sources[role.split('-')[1]] === 'object') {
      newMemory.sourceId = flagMemory.commonMemory.sources[role.split('-')[1]].id;
    }
  }

  if (room.controller.level >= 6 && room.terminal) {
    if (role === 'transfererLiTe') newMemory.directions = [TOP_RIGHT];
    else {
      newMemory.directions = [
        TOP,
        RIGHT,
        BOTTOM_RIGHT,
        BOTTOM,
        BOTTOM_LEFT,
        LEFT,
        TOP_LEFT,
      ];
    }
  } else {
    newMemory.directions = [
      TOP,
      TOP_RIGHT,
      RIGHT,
      BOTTOM_RIGHT,
      BOTTOM,
      BOTTOM_LEFT,
      LEFT,
      TOP_LEFT,
    ];
  }

  return newMemory;
};
// #endregion

// #region
const spawnCreep = (room, roomType, data, roleCount) => {
  // Get flagMemory from spawnRoom
  const flagMemory = Memory.flags[room.name];

  // Get all spawns //
  const headSpawn = Game.getObjectById(flagMemory.commonMemory.headSpawnId);
  let spawn = room.spawns.find((spawn) => spawn.spawning === null);
  if (spawn === undefined || headSpawn === null) return;

  let rolesNeededInRoom = [];
  switch (roomType) {
  case 'owned':
    rolesNeededInRoom = [
      'pioneer',
      'transferer',
      'harvester-0',
      'harvester-1',
      'builder',
      'repairer',
      'upgrader',
      'end',
    ];
    break;
  case 'remote':
    rolesNeededInRoom = [
      'transfererLD',
      'reserverLD',
      'harvesterLD-0',
      'harvesterLD-1',
      'builderLD',
      'repairerLD',
      'end',
    ];
    break;
  case 'external':
    // TODO For automatic claims, search a room manually and place a claim flag
    break;
  default:
    break;
  }

  const checkIfRoleCanBeSpawned = (role, room, memory) => {
    const shortRoleName = role.split('-')[0].replace('LD', '');
    const targetRoom = Game.rooms[memory.targetRoom];
    const targetFlagMemory = Memory.flags[memory.targetRoom];
    let result = false;

    switch (role) {
    // Owned room roles
    case 'pioneer':
      // Check if input role is less then max creeps allowed //
      if (roleCount[role] >= config.creepsCountMax[shortRoleName]) break;

      // If energy capacity is more then 1200 (6 work harvester && rcl 4)
      if (room.energyCapacityAvailable > 300 || room.energyAvailable > 300) break;

      if (room.energyAvailable === 300) {
        result = true;
      }
      break;
    case 'transferer':
    case 'transfererLD':
      // Check if input role is less then max creeps allowed //
      if (roleCount[role] >= config.creepsCountMax[shortRoleName]) break;

      // If energy capacity is less then 1200 (6 work harvester && rcl 4)
      if (room.energyCapacityAvailable <= 300) break;

      if (targetRoom === undefined) break;

      if (targetFlagMemory === undefined || targetFlagMemory.commonMemory.energyStorages.usable < 1000) break;

      result = true;
      break;
    case 'upgrader':
      if (room.controller.ticksToDowngrade <= 5*1000) {
        // Check if input role is less then max creeps allowed //
        if (roleCount[role] >= 1) break;
      } else {
        // Check if input role is less then max creeps allowed //
        if (roleCount[role] >= config.creepsCountMax[shortRoleName]) break;
      }

      if (targetRoom === undefined) break;

      if (targetFlagMemory === undefined && targetFlagMemory.commonMemory.energyStorages.usable < 2000) break;

      result = true;
      break;
    case 'builder':
    case 'repairer':
    case 'reserverLD':
    case 'builderLD':
    case 'repairerLD':
      // Check if input role is less then max creeps allowed //
      if (roleCount[role] >= config.creepsCountMax[shortRoleName]) break;

      // If energy capacity is less then 1200 (6 work harvester && rcl 4)
      if (room.energyCapacityAvailable <= 300) break;

      if (targetRoom === undefined) break;

      if (targetFlagMemory === undefined && targetFlagMemory.commonMemory.energyStorages.usable < 1500) break;

      result = true;
      break;
    case 'harvester-0':
    case 'harvester-1':
    case 'harvesterLD-0':
    case 'harvesterLD-1':
      // Check if input role is less then max creeps allowed //
      if (roleCount[role] >= config.creepsCountMax[shortRoleName]) break;

      // If energy capacity is less then 1200 (6 work harvester && rcl 4)
      if (room.energyCapacityAvailable <= 300) break;

      if (targetRoom === undefined) break;

      if (targetFlagMemory === undefined) break;

      result = true;
      break;
    default:
      break;
    }
    return result;
  };

  const getCreepParts = (role, room) => {
    const flagMemory = Memory.flags[room.name];

    // Get current body cost
    const calcBodyCost = (body) => {
      return _.reduce(body, (sum, part) => sum + BODYPART_COST[part], 0);
    };
    let body = [];
    const returnBody = (parts, bodyIteration, maxLoopCount = 50) => {
      body = parts;
      let i = 0;

      while (
        calcBodyCost(body) + calcBodyCost(bodyIteration) <=
          room.energyAvailable &&
        body.length + bodyIteration.length <= MAX_CREEP_SIZE &&
        i < maxLoopCount
      ) {
        body = body.concat(bodyIteration);
        i++;
      }

      // Reset if input body is not filled with the needed parts
      if (body.length === parts.length) body = [];
    };

    switch (role) {
    case 'pioneer':
      returnBody([CARRY, MOVE], [WORK]);
      break;
    case 'transferer':
    case 'transfererLD':
      returnBody([CARRY, CARRY, MOVE], [CARRY, CARRY, MOVE]);
      break;
    case 'harvester-0':
    case 'harvester-1':
      if (typeof flagMemory.commonMemory.sources[role.split('-')[1]] === 'object') {
        const sourceStructureType = flagMemory.roomPlanner.room.sources[role.split('-')[1]].structureType;
        switch (sourceStructureType) {
        case 'container':
          returnBody([MOVE], [WORK], 7);
          break;
        case 'link':
          returnBody([MOVE, CARRY], [WORK], 7);
          break;
        default:
          break;
        }
      }
      break;
    case 'harvesterLD-0':
    case 'harvesterLD-1':
      returnBody([], [WORK, MOVE], 7);
      break;
    case 'builder':
    case 'builderLD':
    case 'repairer':
    case 'repairerLD':
      returnBody([], [WORK, MOVE, CARRY]);
      break;
    case 'upgrader':
      returnBody([CARRY, MOVE, CARRY, MOVE], [WORK]);
      break;
    case 'reserverLD':
      returnBody([], [CLAIM, MOVE]);
      break;
    default:
      break;
    }

    // Return body
    return body;
  };

  const aCreepHasBeenSpawned = [false, 'none'];
  rolesNeededInRoom.forEach((role) => {
    aCreepHasBeenSpawned[1] = role;

    // If a creep is already spawned
    if (aCreepHasBeenSpawned[0]) return;

    const memory = initCreepMemory(room, role, data);
    // If role can't be spawned, return
    if (!checkIfRoleCanBeSpawned(role, room, memory)) return;

    // Get creep memory and name
    const name = `${role}-${Math.round(Math.random() * 1000)}`;
    const body = getCreepParts(role, room, memory);
    const directions = memory.directions;
    delete memory.directions;

    // Check if body is filled
    if (body.length === 0) aCreepHasBeenSpawned[0] = true;

    if (role === 'transfererLiTe') spawn = headSpawn;

    // Get return value on spawnCreep
    const spawnCreep = spawn.spawnCreep(body, name, {
      memory: memory,
      directions: directions,
    });

    if (spawnCreep === OK) aCreepHasBeenSpawned[0] = true;
  });

  return aCreepHasBeenSpawned[1];
};

module.exports = {
  // Run creep spawner //
  execute: (room, roomType, data, roleCount) => {
    spawnCreep(room, roomType, data, roleCount);
  },
};
