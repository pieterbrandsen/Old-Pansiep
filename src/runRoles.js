// #region Functions
const isInTargetRoom = (creep, currentRoom, targetRoom) => {
  // Check if current room is target room, return true if not false
  if (currentRoom === targetRoom) return true;
  else moveToRoom(creep, targetRoom);
};

const moveToRoom = (creep, targetRoom) => {
  // Define the way how the creep is going to this room
  let travelWay = 'travelTo';
  const targetRoomFlag = Game.flags[targetRoom];

  if (targetRoomFlag) travelWay = 'flag';
  switch (travelWay) {
  case 'flag':
    creep.travelTo(targetRoomFlag);
    break;
  default:
    creep.travelTo(new RoomPosition(25, 25, targetRoom));
    break;
  }
};
// #endregion

const pioneer = (creep, roleName) => {
  // Acces flagMemory
  const flagMemory = Memory.flags[creep.memory.spawnRoom];

  // Check if creep needs to move to another room
  if (!isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) return;

  // Get creep module
  let creepModule;
  try {
    // eslint-disable-next-line global-require
    creepModule = require(`./creepModule.${creep.memory.job}`);
  } catch (error) {
    creep.memory.job = 'withdraw';
    return;
  }

  const result = creepModule.execute(creep);
  switch (result) {
  case 'full':
    // Delete targetId
    delete creep.memory.targetId;

    // Switch to one of the jobs that drains energy
    if (flagMemory.commonMemory.spawnEnergyStructures.length > 0) {
      creep.memory.job = 'transfer';
    } else if (
      flagMemory.commonMemory.energyStorages.capacity > 10000 &&
        flagMemory.commonMemory.energyStorages.capacity / 10 >
          flagMemory.commonMemory.energyStorages.usable
    ) {
      creep.memory.job = 'transfer';
    } else if (
      flagMemory.commonMemory.controllerStorage.usable < 1500 &&
        flagMemory.commonMemory.controllerStorage.structureType ===
          STRUCTURE_CONTAINER
    ) {
      creep.memory.job = 'transfer';
    } else if (flagMemory.commonMemory.constructionSites.length > 0) {
      creep.memory.job = 'build';
    } else if (flagMemory.repair.targets.length > 0) {
      creep.memory.job = 'repair';
    } else {
      creep.memory.job = 'upgrade';
    }
    break;
  case 'empty':
    // Delete targetId
    delete creep.memory.targetId;
    // Switch to one of the roles that gets energy
    if (flagMemory.commonMemory.usable > 1500) {
      creep.memory.job = 'withdraw';
    } else {
      creep.memory.job = 'harvest';
    }
    break;
  default:
    break;
  }
};

const harvester = (creep, roleName) => {
  // Check if creep needs to move to another room
  if (!isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) return;

  // Get creep module
  let creepModule;
  try {
    // eslint-disable-next-line global-require
    creepModule = require(`./creepModule.${creep.memory.job}`);
  } catch (error) {
    creep.memory.job = 'harvest';
    return;
  }

  const result = creepModule.execute(creep);
  switch (result) {
  case 'full':
    // Switch to one of the jobs that drains energy
    creep.memory.job = 'transfer';
    break;
  case 'empty':
    // Switch to one of the roles that gets energy
    creep.memory.job = 'harvest';
    break;
  default:
    break;
  }
};

const transferer = (creep, roleName) => {
  // Get creep module
  let creepModule;
  try {
    // eslint-disable-next-line global-require
    creepModule = require(`./creepModule.${creep.memory.job}`);
  } catch (error) {
    creep.memory.job = 'withdraw';
    return;
  }

  const result = creepModule.execute(creep);
  switch (result) {
  case 'full':
    // Check if creep needs to move to another room
    if (!isInTargetRoom(creep, creep.room.name, creep.memory.spawnRoom)) {
      return;
    }

    // Switch to one of the jobs that drains energy
    creep.memory.job = 'transfer';
    break;
  case 'empty':
    // Check if creep needs to move to another room
    if (!isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) {
      return;
    }

    // Switch to one of the roles that gets energy
    creep.memory.job = 'withdraw';
    break;
  default:
    break;
  }
};

const upgrader = (creep, roleName) => {
  // Check if creep needs to move to another room
  if (!isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) return;

  // Acces flagMemory
  const flagMemory = Memory.flags[creep.memory.spawnRoom];

  // Get creep module
  let creepModule;
  try {
    // eslint-disable-next-line global-require
    creepModule = require(`./creepModule.${creep.memory.job}`);
  } catch (error) {
    creep.memory.job = 'withdraw';
    return;
  }

  const result = creepModule.execute(creep);
  switch (result) {
  case 'full':
    // Switch to one of the jobs that drains energy
    creep.memory.job = 'upgrade';
    break;
  case 'empty':
    // Switch to one of the roles that gets energy
    if (
      flagMemory.commonMemory.usable >= 10 * 1000 ||
        flagMemory.commonMemory.controllerStorage.usable >= 1500
    ) {
      creep.memory.job = 'withdraw';
    } else {
      creep.memory.job = 'harvest';
    }
    break;
  default:
    break;
  }
};

const repairer = (creep, roleName) => {
  // Check if creep needs to move to another room
  if (!isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) return;

  // Acces flagMemory
  const flagMemory = Memory.flags[creep.memory.spawnRoom];

  // Get creep module
  let creepModule;
  try {
    // eslint-disable-next-line global-require
    creepModule = require(`./creepModule.${creep.memory.job}`);
  } catch (error) {
    creep.memory.job = 'withdraw';
    return;
  }

  const result = creepModule.execute(creep);
  switch (result) {
  case 'full':
    // Switch to one of the jobs that drains energy
    creep.memory.job = 'repair';
    break;
  case 'empty':
    // Switch to one of the roles that gets energy
    if (flagMemory.commonMemory.usable >= 2000) {
      creep.memory.job = 'withdraw';
    } else {
      creep.memory.job = 'harvest';
    }
    break;
  default:
    break;
  }
};

const builder = (creep, roleName) => {
  // Check if creep needs to move to another room
  if (!isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) return;

  // Acces flagMemory
  const flagMemory = Memory.flags[creep.memory.spawnRoom];

  // Get creep module
  let creepModule;
  try {
    // eslint-disable-next-line global-require
    creepModule = require(`./creepModule.${creep.memory.job}`);
  } catch (error) {
    creep.memory.job = 'withdraw';
    return;
  }

  const result = creepModule.execute(creep);
  switch (result) {
  case 'full':
    // Switch to one of the jobs that drains energy
    creep.memory.job = 'build';
    break;
  case 'empty':
    // Switch to one of the roles that gets energy
    if (flagMemory.commonMemory.usable >= 2000) {
      creep.memory.job = 'withdraw';
    } else {
      creep.memory.job = 'harvest';
    }
    break;
  default:
    break;
  }
};

const reserver = (creep, roleName) => {
  // Check if creep needs to move to another room
  if (!isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) return;

  // Get creep module
  let creepModule;
  try {
    // eslint-disable-next-line global-require
    creepModule = require(`./creepModule.${creep.memory.job}`);
  } catch (error) {
    creep.memory.job = 'reserve';
    return;
  }

  creepModule.execute(creep);
};

const claimer = (creep, roleName) => {
  // Check if creep needs to move to another room
  if (!isInTargetRoom(creep, creep.room.name, creep.memory.targetRoom)) return;

  // Get creep module
  let creepModule;
  try {
    // eslint-disable-next-line global-require
    creepModule = require(`./creepModule.${creep.memory.job}`);
  } catch (error) {
    creep.memory.job = 'claim';
    return;
  }

  const result = creepModule.execute(creep);
  // TODO LOGIC FOR CLAIMER
  switch (result) {
  case OK:
    // Switch to one of the jobs that drains energy
    creep.memory.job = 'claim';
    break;
  case ERR_GCL_NOT_ENOUGH:
    creep.memory.job = 'claim';
    break;
  default:
    break;
  }
};

module.exports = {
  // Run the harvester's //
  pioneer: (creep, shortRoleName) => {
    pioneer(creep, shortRoleName);
  },

  // Run the harvester's //
  harvester: (creep, shortRoleName) => {
    harvester(creep, shortRoleName);
  },

  // Run the transferer's //
  transferer: (creep, shortRoleName) => {
    transferer(creep, shortRoleName);
  },

  // Run the upgrader's //
  upgrader: (creep, shortRoleName) => {
    upgrader(creep, shortRoleName);
  },

  // Run the repairer's //
  repairer: (creep, shortRoleName) => {
    repairer(creep, shortRoleName);
  },

  // Run the builder's //
  builder: (creep, shortRoleName) => {
    builder(creep, shortRoleName);
  },

  // Run the resever's //
  reserver: (creep, shortRoleName) => {
    reserver(creep, shortRoleName);
  },

  // Run the claimer's //
  claimer: (creep, shortRoleName) => {
    claimer(creep, shortRoleName);
  },
};
