interface MyRoom {
  spawns: Array;
}

interface CreepMemory {
  role: string;
  room: string;
  working: boolean;
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
    controllerStorage?: { usable: number };
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

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: object;
  }
}
