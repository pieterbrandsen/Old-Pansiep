global.config = {
  username: 'PandaMaster',
  whitelist: ['Rivaryn', 'Fiskmans'],
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
        base: 2500,
        room: 500,
      },
      structureNullChecker: 1000,
      spawnCreep: 10,
      getSpawnerEnergy: 50,
      getAllEnergyStructures: 50,
      getConstructionStructures: 100,
      getDamagedStructures: 50,
      getDamagedCreeps: 10,
      getHostileCreeps: 10,
    },
  },
  allRoles: [
    'pioneer',
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
    pioneer: 4,
    transferer: 5,
    harvester: 1,
    builder: 3,
    repairer: 2,
    upgrader: 3,
    reserver: 1,
    claimer: 1,
  },
};
