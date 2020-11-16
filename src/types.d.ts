interface RoomMemory {
  enemies: { parts: BodyPartConstant[], creeps: Creep[] };
}

interface CreepMemory {
}


interface Memory {
}

interface Stats {
}

interface Config {
  username: string;
  whitelist: string[];
  tracking: boolean;
  rooms: {
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
  creepsCountMax: object;
  roleCountByRoomByRole: { [key: string]: { [key: string]: number } };
  cpuUsedByRoomByRole: { [key: string]: { [key: string]: number } };
  creepModuleCpuCost: { [key: string]: { [key: string]: number } };
  expenses: {
    spawnExpenses: { [key: string]: Object };
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
