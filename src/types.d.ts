interface CreepMemory {
  role: string;
  targetRoom: string;
  spawnRoom: string;
  parts?: { work: number; carry: number };
  job?: string;
  miniJob?: string;
  sourceNumber?: number;
  sourceId?: string;
  targetId?: string;
  onPosition?: boolean;
  resourceType?: ResourceConstant;
}

interface RoomMemory {
  roomName?: string;
  roomType?: string;

  // Cached objects
  structures: Cache;
  constructionSites: Cache;
  myCreeps: Cache;
  droppedResources: Cache;

  // Jobs
  jobs: {
    constructionSites: JobTemplate[];
    energyStorages: JobTemplate[];
    damagedStructures: { data: JobTemplate[]; hitsTarget: number };
    damagedCreeps: JobTemplate[];
    spawnerEnergyStructures?: JobTemplate[];
    enemies: { parts: { [key: string]: number }; creeps: JobTemplate[] };
    droppedResources: JobTemplate[];
  };

  // Room memory
  commonMemory?: {
    sourceCount: number;
    mineral?: { id: string; type: MineralConstant | undefined; amount: number };
    sources: { id: string; pos: RoomPos }[];
    controllerLevel?: number;
    headSpawnId?: string;
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
    reserve?: {
      TTL: number;
      username: string;
    };
  };
  roomPlanner?: {
    room: { sources: BestPosition[]; controller?: BestPosition };
    base?: { type: string | undefined; midPos: RoomPos };
  };
  isSetup?: boolean;

  remoteRooms?: string[];

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
  gcl: {
    level: number;
    progress: number;
    progressTotal: number;
  };
  rooms: {
    [key: string]: {
      commonMemory: {
        sourceCount: number;
        constructionSitesCount: number;
        creepCountByRole: { [key: string]: number };
        remote?: { sourceCount: number };
        owned?: { sourceCount: number };
      };
      performance: {
        expenses: {
          spawnExpenses: StringMap;
          building: number;
          repairing: number;
          upgrading: number;
        };
        income: { ownedHarvesting: number; remoteHarvesting: number };
      };
      energyStored: {
        capacity: number;
        total: number;
        storage: number;
        terminal: number;
      };
      spawnerEnergy: {
        available: number;
        capacityAvailable: number;
      };
      controller: {
        level: number;
        progress: number;
        progressTotal: number;
      };
      cpu: {
        used: number;
        headModules: { creeps: { [key: string]: number } };
        creepModules: StringMap;
        smallModules: {
          spawnCreep: number;
        };
      };
    };
  };
  common: {
    energyEachTickPerSource: number;
  };
  cpu: {
    bucket: number;
    limit: number;
    used: number;
    headModules: any;
    smallModules: any;
  };
}

interface Config {
  username: string;
  whitelist: string[];
  tracking: boolean;
  rooms: {
    [key: string]: number;
    minBucket: number;
    remoteMinBucket: number;
  };
  cpuUsedByRoomByRole: { [key: string]: { [key: string]: number } };
  creepModuleCpuCost: { [key: string]: { [key: string]: number } };
  expenses: {
    spawnExpenses: { [key: string]: { [key: string]: number } };
    building: { [key: string]: number };
    repairing: { [key: string]: number };
    upgrading: { [key: string]: number };
  };
  income: {
    ownedHarvesting: { [key: string]: number };
    remoteHarvesting: { [key: string]: number };
  };
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
  parts?: { [key: string]: number };
  resourceType?: ResourceConstant;
}

declare namespace NodeJS {
  interface Global {
    Memory: Memory;
    age?: number;
    addRemoteRoom(spawnRoom: string, remoteRoom: string): void;
    removeRemoteRoom(spawnRoom: string, remoteRoom: string): void;
    help(): void;
  }
}
