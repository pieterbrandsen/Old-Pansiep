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
    // Switch to one of the roles that drains energy
    break;
  case 'empty':
    // Switch to one of the roles that gets energy
    break;
  default:
    break;
  }
};

const harvester = (creep, roleName) => {

};

const transferer = (creep, roleName) => {
};

const upgrader = (creep, roleName) => {
};

const repairer = (creep, roleName) => {
};

const builder = (creep, roleName) => {
};

const reserver = (creep, roleName) => {
};

const claimer = (creep, roleName) => {
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
