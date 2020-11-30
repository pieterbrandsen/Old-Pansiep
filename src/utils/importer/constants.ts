// List of all structure in the game
export const ALL_STRUCTURE_TYPES: StructureConstant[] = [
  STRUCTURE_EXTENSION,
  STRUCTURE_RAMPART,
  STRUCTURE_ROAD,
  STRUCTURE_SPAWN,
  STRUCTURE_LINK,
  STRUCTURE_WALL,
  STRUCTURE_STORAGE,
  STRUCTURE_TOWER,
  STRUCTURE_OBSERVER,
  STRUCTURE_POWER_SPAWN,
  STRUCTURE_EXTRACTOR,
  STRUCTURE_LAB,
  STRUCTURE_TERMINAL,
  STRUCTURE_CONTAINER,
  STRUCTURE_NUKER,
  STRUCTURE_KEEPER_LAIR,
  STRUCTURE_CONTROLLER,
  STRUCTURE_POWER_BANK,
  STRUCTURE_PORTAL,
  STRUCTURE_FACTORY,
  STRUCTURE_INVADER_CORE
];

export const ALL_OWNED_ROOM_CREEP_ROLES: string[] = [
  "pioneer",
  "transferer",
  "harvester-0",
  "harvester-1",
  "builder",
  "repairer",
  "upgrader",
  "mineral"
];

export const ALL_REMOTE_CREEP_ROLES: string[] = [
  "claimerLD",
  "builderLD",
  "transfererLD",
  "reserverLD",
  "repairerLD",
  "harvesterLD-0",
  "harvesterLD-1",
  "scout"
];

export const ALL_CREEP_ROLES: string[] = ALL_OWNED_ROOM_CREEP_ROLES.concat(ALL_REMOTE_CREEP_ROLES);

// Jobs ticks
export const CONST_JOBS_CACHE_TTL = 100;
export const ENERGY_STORAGES_JOBS_CACHE_TTL = 50;
export const DAMAGED_STRUCTURES_JOBS_CACHE_TTL = 500;
export const DAMAGED_CREEPS_JOBS_CACHE_TTL = 250;
export const SPAWNER_ENERGY_STRUCTURES_JOBS_CACHE_TTL = 50;
export const HOSTILE_CREEPS_JOBS_CACHE_TTL = 50;

// Cache ticks
export const CONST_CACHE_TTL = 1000;
export const CREEPS_CACHE_TTL = 9;
export const STRUCT_CACHE_TTL = 100;

// Timer ticks
export const UPDATE_LINKS_TIMER = 500;
export const RUN_LINKS_TIMER = 10;
export const UPDATE_SOURCE_STRUCTURES_TIMER = 500;
export const UPDATE_MINERAL_AMOUNT_TIMER = 5000;
export const SPAWN_CREEP_TIMER = 10;
export const ROOM_PLANNER_TIMER = 10;
export const BASE_PLANNER_TIMER = 10;
