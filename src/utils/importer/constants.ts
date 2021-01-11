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
  'pioneer',
  'transferer',
  'harvester-0',
  'harvester-1',
  'builder',
  'repairer',
  'upgrader',
  'mineral'
];

export const ALL_REMOTE_CREEP_ROLES: string[] = [
  'claimerLD',
  'builderLD',
  'transfererLD',
  'reserverLD',
  'repairerLD',
  'harvesterLD-0',
  'harvesterLD-1'
];

export const ALL_SCORE_CONTAINER_CREEP_ROLES: string[] = ['scorePicker'];

export const EXTRA_ROLES: string[] = ['scout'];

export const ALL_CREEP_ROLES: string[] = ALL_OWNED_ROOM_CREEP_ROLES.concat(ALL_REMOTE_CREEP_ROLES)
  .concat(ALL_SCORE_CONTAINER_CREEP_ROLES)
  .concat(EXTRA_ROLES);

export const ALL_CREEP_MODULES: string[] = [
  'build',
  'claim',
  'harvest',
  'mineral',
  'repair',
  'reserve',
  'transfer',
  'transfer',
  'upgrade',
  'withdraw',
  'scout'
];

export const CREEP_ROLE_COUNT_MAX: { [key: string]: number } = {
  pioneer: 4,
  transferer: 3,
  harvester: 1,
  builder: 4,
  repairer: 1,
  upgrader: 4,
  reserver: 1,
  claimer: 1,
  mineral: 1,
  scorePicker: 1
};

export const CREEP_PART_COUNT_MAX: {
  [key: string]: { part: BodyPartConstant; amount: number };
} = {
  pioneer: { part: WORK, amount: 99 },
  transferer: { part: CARRY, amount: 100 },
  harvester: { part: WORK, amount: 7 },
  builder: { part: WORK, amount: 20 },
  repairer: { part: WORK, amount: 20 },
  upgrader: { part: WORK, amount: 20 },
  reserver: { part: CLAIM, amount: 5 },
  claimer: { part: CLAIM, amount: 99 },
  mineral: { part: CARRY, amount: 99 },
  scorePicker: { part: CARRY, amount: 99 }
};

export const ALL_RESOURCE_TYPES: string[] = [
  'energy',
  'power',

  'H',
  'O',
  'U',
  'L',
  'K',
  'Z',
  'X',
  'G',

  'silicon',
  'metal',
  'biomass',
  'mist',

  'OH',
  'ZK',
  'UL',

  'UH',
  'UO',
  'KH',
  'KO',
  'LH',
  'LO',
  'ZH',
  'ZO',
  'GH',
  'GO',

  'UH2O',
  'UHO2',
  'KH2O',
  'KHO2',
  'LH2O',
  'LHO2',
  'ZH2O',
  'ZHO2',
  'GH2O',
  'GHO2',

  'XUH2O',
  'XUHO2',
  'XKH2O',
  'XKHO2',
  'XLH2O',
  'XLHO2',
  'XZH2O',
  'XZHO2',
  'XGH2O',
  'XGHO2',

  'ops',

  'utrium_bar',
  'lemergium_bar',
  'zynthium_bar',
  'keanium_bar',
  'ghodium_melt',
  'oxidant',
  'reductant',
  'purifier',
  'battery',

  'composite',
  'crystal',
  'liquid',

  'wire',
  'switch',
  'transistor',
  'microchip',
  'circuit',
  'device',

  'cell',
  'phlegm',
  'tissue',
  'muscle',
  'organoid',
  'organism',

  'alloy',
  'tube',
  'fixtures',
  'frame',
  'hydraulics',

  'machine',
  'condensate',
  'concentrate',
  'extract',
  'spirit',
  'emanation',
  'essence'
];

// Jobs ticks
export const CONST_JOBS_CACHE_TTL = 100;
export const ENERGY_STORAGES_JOBS_CACHE_TTL = 50;
export const DAMAGED_STRUCTURES_JOBS_CACHE_TTL = 500;
export const DAMAGED_CREEPS_JOBS_CACHE_TTL = 250;
export const SPAWNER_ENERGY_STRUCTURES_JOBS_CACHE_TTL = 50;
export const HOSTILE_CREEPS_JOBS_CACHE_TTL = 50;
export const DROPPED_RESOURCE_JOBS_CACHE_TTL = 50;

// Cache ticks
export const CONST_CACHE_TTL = 1000;
export const CREEPS_CACHE_TTL = 9;
export const STRUCT_CACHE_TTL = 100;
export const DROPPED_RESOURCES_CACHE_TTL = 50;

// Timer ticks
export const UPDATE_LINKS_TIMER = 500;
export const RUN_LINKS_TIMER = 10;
export const UPDATE_SOURCE_STRUCTURES_TIMER = 500;
export const UPDATE_MINERAL_AMOUNT_TIMER = 5000;
export const SPAWN_CREEP_TIMER = 10;
export const ROOM_PLANNER_TIMER = 500;
export const BASE_PLANNER_TIMER = 500;
