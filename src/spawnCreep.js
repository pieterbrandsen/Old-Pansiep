// #region Require
require('./config');
// #endregion


// #region functions
const initCreepMemory = (room, role, data) => {
  // Init all undefined memory variables
  if (!data.targetRoom) data.targetRoom = room.name;
  if (!data.spawnRoom) data.spawnRoom = room.name;
  if (!data.role) data.role = role;
  if (!data.job) data.job = 'none';
  if (!data.targetId) data.targetId = 'none';

  const flagMemory = Memory.flags[data.targetRoom];
  if (role.includes('harvester') && !data.sourceId) data.sourceId = flagMemory.commonMemory.sources[role.split('-')[1]].id;
  if (role.includes('LD') && !data.flagName) data.flagName = room.name;

  if (room.controller.level >= 6 && room.terminal) {
    if (role === 'transfererLiTe') data.directions = [TOP_RIGHT];
    else data.directions = [TOP, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];
  } else data.directions = [TOP, TOP_RIGHT, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];

  return data;
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
    rolesNeededInRoom = ['pioneer',
      'transferer',
      'harvester-0',
      'harvester-1',
      'builder',
      'repairer',
      'upgrader',
      'end'];
    break;
  case 'remote':
    rolesNeededInRoom = ['transfererLD',
      'reserverLD',
      'harvesterLD-0',
      'harvesterLD-1',
      'builderLD',
      'repairerLD',
      'end'];
    break;
  case 'external':
    // TODO For automatic claims, search a room manually and place a claim flag
    break;
  default:
    break;
  }

  const checkIfRoleCanBeSpawned = (role) => {
    const shortRoleName = role.split('-')[0].replace('LD', '');
    let result = false;

    switch (role) {
    // Owned room roles
    case 'pioneer':
      // Check if input role is less then max creeps allowed //
      if (roleCount[role] >= config.creepsCountMax[shortRoleName]) break;

      // If energy capacity is more then 1200 (6 work harvester && rcl 4)
      if (room.energyCapacityAvailable >= 1200) break;

      result = true;
      break;
    case 'transferer':
    case 'harvester-0':
    case 'harvester-1':
    case 'builder':
    case 'repairer':
    case 'upgrader':
    case 'transfererLD':
    case 'reserverLD':
    case 'builderLD':
    case 'repairerLD':
    case 'harvesterLD-0':
    case 'harvesterLD-1': // Check if input role is less then max creeps allowed //
      if (roleCount[role] >= config.creepsCountMax[shortRoleName]) break;

      // If energy capacity is less then 1200 (6 work harvester && rcl 4)
      if (room.energyCapacityAvailable < 1200) break;

      result = true;
      break;

    default: break;
    }
    return result;
  };

  const getCreepParts = (role) => {
    // Get current body cost
    const calcBodyCost = (body) => {
      return _.reduce(body, (sum, part) => sum + BODYPART_COST[part], 0);
    };

    let body = [];
    let i = 0;
    const returnBody = (bodyIteration, maxLoopCount = 50) => {
      while (calcBodyCost(body) + calcBodyCost(bodyIteration) <= room.energyAvailable &&
    body.length + bodyIteration.length <= MAX_CREEP_SIZE && i < maxLoopCount) {
        body = body.concat(bodyIteration);
        i++;
      }
    };


    switch (role) {
    case 'pioneer':
      returnBody([WORK, CARRY, CARRY, MOVE, MOVE]);
      break;
    case 'transferer':
    case 'transfererLD':
      returnBody([CARRY, CARRY, MOVE]);
      break;
    case 'harvester-0':
    case 'harvester-1':
    case 'harvesterLD-0':
    case 'harvesterLD-1':
      returnBody([WORK, CARRY, MOVE]);
      break;
    case 'builder':
    case 'builderLD':
    case 'repairer':
    case 'repairerLD':
      returnBody([WORK, MOVE, MOVE, CARRY]);
      break;
    case 'upgrader':
      returnBody([WORK, WORK, CARRY, MOVE]);
      break;
    case 'reserverLD':
      returnBody([CLAIM, MOVE]);
      break;
    default: break;
    }

    // Return body
    return body;
  };

  const aCreepHasBeenSpawned = [false, 'none'];
  rolesNeededInRoom.forEach((role) => {
    aCreepHasBeenSpawned[1] = role;

    // If a creep is already spawned
    if (aCreepHasBeenSpawned[0]) return;

    // If role can't be spawned, return
    if (!checkIfRoleCanBeSpawned(role)) return;

    // Get creep memory and name
    const memory = initCreepMemory(room, role, data);
    const name = `${role}-${Math.round(Math.random() * 1000)}`;
    const body = getCreepParts(role);
    const directions = memory.directions;
    delete memory.directions;

    // Check if body is filled
    if (body.length === 0) aCreepHasBeenSpawned[0] = true;

    if (role === 'transfererLiTe') spawn = headSpawn;

    // Get return value on spawnCreep
    const spawnCreep = spawn.spawnCreep(
      body,
      name,
      {
        memory: memory,
        directions: directions,
      },
    );

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
