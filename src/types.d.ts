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
  // Cached objects
  structures: Cache;
  constructionSites: Cache;
  myCreeps?: Cache;

  // Jobs
  jobs: {
    constructionSites: JobTemplate[];
    energyStorages: JobTemplate[];
    damagedStructures: { data: JobTemplate[]; hitsTarget: number };
    damagedCreeps: JobTemplate[];
  };

  // Room memory
  commonMemory: {
    sourceCount: number;
    mineral: { id: string; type: any; amount: number };
    sources: Array<{ id: string; pos: RoomPos }>;
    controllerLevel?: number;
    headSpawnId?: string;
    spawnEnergyStructures?: Array<{ needed: number; id: string }>;
    energyStored: { usable: number; capacity: number };
    controllerStorage?: {
      usable: number;
      id: string | undefined;
      type: STRUCTURE_LINK | STRUCTURE_CONTAINER | undefined;
    };
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
  isSetup?: boolean;

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

interface Cache {
  /**
   * The data that the Cache object validates
   */
  data: any;
  /**
   * Cache Object - used for validation
   */
  cache: any;
}

interface StringMap {
  [key: string]: any;
}

interface JobTemplate {
  pos: RoomPos;
  id: string;
  usable?: number;
  needed?: number;
  structureType?: StructureConstant;
}
