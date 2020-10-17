require('./config');

// #region functions
function getRandomFreePos(startPos, distance) {
  let x;
  let y;
  do {
    x = startPos.x + Math.floor(Math.random()*(distance*2+1)) - distance;
    y = startPos.y + Math.floor(Math.random()*(distance*2+1)) - distance;
  }
  while ((x+y)%2 !== (startPos.x+startPos.y)%2 || Game.map.getTerrainAt(x, y, startPos.roomName) === TERRAIN_MASK_WALL);
  return new RoomPosition(x, y, startPos.roomName);
}
// #endregion


// #region Handlers

// #region Global handler
const globalHandler = () => {
  if (!Memory.isFilled) memoryHandler('global');
  else {
    // Rooms handler //
    // Handles ALL global room related code
    allRoomsHandler();

    // Creep handler //
    // Handles all creeps and runs their role
    creepHandler();

    // Timers handler //
    // Handles all game timers and runs their code
    timersHandler();
  }
};
// #endregion


// #region All rooms handler
const allRoomsHandler = () => {
  if (Game.cpu.bucket <= config.rooms.minBucket) return;


  // Timers through all rooms with vision in them.
  _.forEach(Object.keys(Game.rooms), (roomName) => {
    const room = Game.rooms[roomName];
    const flag = Game.flags[roomName];

    if (!flag) {
      room.createFlag((room.controller ? room.controller.pos : getRandomFreePos({x: 0, y: 0, roomName: roomName})), roomName, COLOR_RED, COLOR_WHITE);
      Memory.flags[roomName] = {};
      memoryHandler('ownedRoom', {room: room});
    } else {
      if (room.controller && room.controller.my) ownedRoomHandler(room);
      else if (room.controller && room.controller.reservation && room.controller.reservation.username === config.username) remoteRoomHandler(room);
    }
  });
};
// #endregion


// #region Owned room handler
const ownedRoomHandler = (room) => {

};
// #endregion


// #region Remote room handler
const remoteRoomHandler = (room) => {

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
      const creepRoleName = creepMemory.role.split('-')[0];
      if (!creepRoleName) return;

      roleHandler(creep, creepRoleName);
    }
  });
};
// #endregion


// #region Role handler
const roleHandler = (creep, roleName) => {
};
// #endregion


// #region Memory handler
const memoryHandler = (goal, data) => {
  // #region Global memory
  // Get a object back with all the universal memory for a owned and remote room //
  const globalMemory = () => {
    // Timers until the memory Length is the same as last time //
    let memoryLength = 0;
    let endTimers = false;
    while (!endTimers) {
      // Init undefined memory
      if (!Memory.creeps) Memory.creeps = {};
      if (!Memory.flags) Memory.flags = {};
      if (!Memory.stats) Memory.stats = {};

      // Check if current memory size is the same as last loop
      if (memoryLength === Object.keys(Memory).length) {
        Memory.isFilled = true;
        endTimers = true;
      } else memoryLength = Object.keys(Memory).length;
    }
  };
  // #endregion

  // #region Room memory
  // #region Global room memory
  const globalRoomMemory = (room) => {
    // Create a acces point to the flagMemory //
    const flagMemory = Memory.flags[room.name];

    // Timers until the memory Length is the same as last time //
    let memoryLength = 0;
    let endTimers = false;
    while (!endTimers) {
      // Init undefined memory
      // None

      // Check if current memory size is the same as last loop
      if (memoryLength === Object.keys(flagMemory).length) {
        flagMemory.isFilled = true;
        endTimers = true;
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
    let endTimers = false;
    while (!endTimers) {
      // Init undefined memory
      // None

      // Check if current memory size is the same as last loop
      if (memoryLength === Object.keys(flagMemory).length) {
        flagMemory.isFilled = true;
        endTimers = true;
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
    let endTimers = false;
    while (!endTimers) {
      // Init undefined memory
      // None

      // Check if current memory size is the same as last loop
      if (memoryLength === Object.keys(flagMemory).length) {
        flagMemory.isFilled = true;
        endTimers = true;
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
  const globalTimers = () => {
  };
  // #endregion

  // #region Room timers
  // #region Global room timers
  const globalRoomTimers = (room) => {

  };
  // #endregion

  // #region Owned room timers
  const ownedRoomTimers = (room) => {

  };
  // #endregion

  // #region Remote room timers
  const remoteRoomTimers = (room) => {

  };
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
// #endregion


module.exports = {
  // Global handler //
  // Handles every other handler + main code //
  global: globalHandler,
};
