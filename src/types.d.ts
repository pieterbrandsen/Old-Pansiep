interface MyRoom {
  spawns: Array;
  containers: Array;
  links: Array;
  towers: Array;
}

interface MyCreep {
  travelTo?: travelTo;
}

interface CreepMemory {
  role: string;
  targetRoom: string;
  spawnRoom: string;
  parts: { work: number; carry: number };
  job: string;
  miniJob?:string;
  sourceNumber?: number;
  sourceId?: string;
  targetId?: string;
  onPosition?:boolean;
}

interface FlagMemory {
  commonMemory: {
    sourceCount: number;
    mineral: { id: string; type: string; amount: number };
    sources: { id: string; pos: RoomPosition } | emptyArray;
    constructionSites: [id: string] | emptyArray;
    energyStructures: [id: string] | emptyArray;
    repair: { targets: Array[string]; hitsTarget: number };
    controllerLevel?: number;
    headSpawnId?: string | any;
    spawnEnergyStructures?: Array[Structure_Lab | STRUCTURE_SPAWN | STRUCTURE_EXTENSION | STRUCTURE_TOWER] | emptyArray;
    energyStored: { usable: number; capacity: number };
    controllerStorage?: { usable: number; id: string; type: string | undefined };
    links?: {
      [key: string]: string;
      source0: string;
      source1: string;
      controller: string;
      head: string;
    };
  };
  roomPlanner: {
    room: { sources: Array[BestPosition]; controller?: Object<BestPosition> };
    base?: { type: string; midPos: { x: x; y: y; roomName: room.name } } | EmptyObject;
  };
  enemies: { parts: CREEP_PART; creeps: Array[string] };
  damagedCreeps: Array[string] | emptyArray;
  remotes: { totalSourceCount: number; rooms: Array[string] | EmptyArray };
  isFilled: boolean;

  // BuilderLD
  spawnRoom?: string;
  room?: string;
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
      getSpawnEnergyStructures: number;
      getAllEnergyStructures: number;
      getConstructionSites: number;
      getDamagedStructures: number;
      getDamagedCreeps: number;
      getHostileCreeps: number;
      linkHandler: number;
    };
  };
  allRoles: string[];
  allCreepModules: string[];
  creepsCountMax: object[number];
  roleCountByRoomByRole: { [key: string]: { [key: string]: number } };
  cpuUsedByRoomByRole: { [key: string]: { [key: string]: number } };
  creepModuleCpuCost: { [key: string]: { [key: string]: number } };
  expenses: {
    spawnExpenses: { [key: string]: Object[string] };
    building: { [key: string]: number };
    repairing: { [key: string]: number };
    upgrading: { [key: string]: number };
  };
  income: { ownedHarvesting: { [key: string]: number }; remoteHarvesting: { [key: string]: number } };
}

interface BestPosition {
  id?: string | undefined;
  structureType?: string;
  pos?: { x: number; y: number; roomName: string };
  spotsAround?: number;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: object;
  }
}
