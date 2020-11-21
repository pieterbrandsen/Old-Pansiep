interface CreepMemory {
  role: string;
  targetRoom: string;
  spawnRoom: string;
  parts: { work: number; carry: number };
  job: string;
  miniJob?: string;
  sourceNumber?: number;
  sourceId?: string;
  targetId?: string;
  onPosition?: boolean;
}

interface RoomMemory {
  commonMemory: {
    sourceCount: number;
    mineral: { id: string; type: any; amount: number };
    sources: Array<{ id: string; pos: RoomPos }>;
    constructionSites: string[];
    energyStructures: Array<{ id: string; usable: number }>;
    repair: { targets: string[]; hitsTarget: number };
    controllerLevel?: number;
    headSpawnId?: string;
    spawnEnergyStructures?: Array<{ needed: number; id: string }>;
    energyStored: { usable: number; capacity: number };
    controllerStorage?: { usable: number; id: string; type: string };
    links?: {
      [key: string]: string;
      source0: string;
      source1: string;
      controller: string;
      head: string;
    };
  };
  roomPlanner: {
    room: { sources: BestPosition[]; controller?: BestPosition };
    base?: { type: string | undefined; midPos: RoomPos };
  };
  enemies: { parts: { [key: string]: number }; creeps: Array<{ id: string; parts: { [key: string]: number } }> };
  damagedCreeps: string[];
  remotes: { totalSourceCount: number; rooms: string[] };

  // BuilderLD
  spawnRoom?: string;
  room?: string;
}

interface Memory {
  stats: Stats;
  isFilled: boolean;
}

interface Stats {
  ticksAlive: number;
  gcl: any;
  rooms: {
    [key: string]: {
      commonMemory: any;
      performance: { expenses: any; income: any };
      energyStored: any;
      spawnerEnergy: any;
      controller: any;
      cpu: { headModules: { creeps: any }; smallModules: { [key: string]: number }; creepModules: any };
    };
  };
  common: any;
  cpu: { bucket: number; limit: number; used: number; headModules: any; smallModules: any };
}

interface Config {
  username: string;
  whitelist: string[];
  tracking: boolean;
  rooms: {
    [key: string]: number | object;
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
  creepsCountMax: { [key: string]: number };
  roleCountByRoomByRole: { [key: string]: { [key: string]: number } };
  cpuUsedByRoomByRole: { [key: string]: { [key: string]: number } };
  creepModuleCpuCost: { [key: string]: { [key: string]: number } };
  expenses: {
    spawnExpenses: { [key: string]: { [key: string]: number } };
    building: { [key: string]: number };
    repairing: { [key: string]: number };
    upgrading: { [key: string]: number };
  };
  income: { ownedHarvesting: { [key: string]: number }; remoteHarvesting: { [key: string]: number } };
}

interface BestPosition {
  id?: string;
  structureType?: string;
  pos?: RoomPos;
  spotsAround?: number;
}

interface RoomPos {
  x: number;
  y: number;
  roomName: string;
}
