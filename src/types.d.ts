// example declaration file - remove these and add your own custom typings

// memory extension samples
interface CreepMemory {
  role: string;
  room: string;
  working: boolean;
}

interface Memory {
  stats: stats;
  uuid: number;
  log: any;
}

interface stats {
  ticksAlive: number;
  uuid: number;
  log: any;
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: object;
  }
}
