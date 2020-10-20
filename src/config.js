global.config = {
  username: 'PandaMaster',
  rooms: {
    minBucket: 1000,

    visuals: {
      debug: false,
      structures: true,
    },
    remote: {
      minBucket: 3000,
    },
    loops: {
      roomPlanner: {
        base: 5,
        room: 5,
      },
      structureChecker: 1000,
      spawnCreep: 10,
    },
  },
  allRoles: ['pioneer',
    'transferer',
    'harvester-0',
    'harvester-1',
    'builder',
    'repairer',
    'upgrader',
    'transfererLD',
    'reserverLD',
    'harvesterLD-0',
    'harvesterLD-1',
    'builderLD',
    'repairerLD',
  ],
  creepsCountMax: {
    'pioneer': 10,
    'transferer': 3,
    'harvester': 2,
    'builder': 3,
    'repairer': 2,
    'upgrader': 3,
    'reserver': 1,
    'claimer': 1,
  },
};
