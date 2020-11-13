interface MyRoom {
  spawns: Array;
  containers: Array;
  links: Array;
}

interface CreepMemory {
  role: string;
  targetRoom: string;
}

interface FlagMemory {
  commonMemory: {
    sourceCount: number;
    mineral: { id: string | undefined; type: string | undefined; amount: number | undefined };
    sources: { id: string; pos: RoomPosition } | emptyArray;
    constructionSites: [id: string] | emptyArray;
    energyStructures: [id: string] | emptyArray;
    repair: { targets: Array[string]; hitsTarget: number };
    controllerLevel?: number;
    headSpawnId?: string | undefined;
    spawnEnergyStructures?: Array[string] | emptyArray;
    energyStored: { usable: number; capacity: number };
    controllerStorage?: { usable: number, id?: string | undefined };
    links?: {
      source0: string | undefined;
      source1: string | undefined;
      controller: string | undefined;
      head: string | undefined;
    };
  };
  roomPlanner: { room: { sources: Object[] }; base?: Object };
  enemies: { parts: CREEP_PART; creeps: Array[string] };
  damagedCreeps: Array[string] | emptyArray;
  remotes: { totalSourceCount: number; rooms: Array[string] | EmptyArray };
  isFilled: boolean;
}

interface Memory {
  stats: stats;
  isFilled: boolean;
}

interface Stats {
  ticksAlive: number;
  gcl: object;
  rooms: {
    [key: string]: object;
    energyStored: object;
    commonMemory: object;
    performance: { expenses: object; income: object };
    energyStored: object;
    spawnerEnergy: object;
    controller: object;
  };
  common: object;
  cpu: { headModules: object; smallModules: object };
}

interface Config {
  username: string;
  whitelist: string[];
  tracking: boolean;
  rooms: {
    [key: string]: object[number];
    minBucket: number;
    remoteMinBucket: number;
    loops: {
      roomPlanner: { base: number; room: number };
      structureNullChecker: number;
      spawnCreep: number;
      getSpawnerEnergy: number;
      getAllEnergyStructures: number;
      getConstructionStructures: number;
      getDamagedStructures: number;
      getDamagedCreeps: number;
      getHostileCreeps: number;
      sendEnergyInLinks: number;
    };
  };
  allRoles: string[];
  allCreepModules: string[];
  creepsCountMax: object[number];
  roleCountByRoomByRole: { [key: string]: { [key: string]: number;} };
  cpuUsedByRoomByRole: { [key: string]: { [key: string]: number;} };
  creepModuleCpuCost: { [key: string]: { [key: string]: number;} };
  expenses: {
    spawnExpenses: { [key: string]: number };
    building: { [key: string]: number };
    repairing: { [key: string]: number };
    upgrading: { [key: string]: number };
  };
  income: { ownedHarvesting: { [key: string]: number }; remoteHarvesting: { [key: string]: number } };
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: object;
  }
}
