//#region Functions()
const globalMemory = (): void => {
  // Set all memory paths to empty objects
  Memory.creeps = {};
  Memory.flags = {};
  Memory.stats = {
    ticksAlive: 0,
    gcl: {},
    rooms: {},
    common: {},
    cpu: { headModules: {}, smallModules: {} }
  };

  // If there are 4 keys (all paths), set the memory to filled
  if (Object.keys(Memory).length === 4) Memory.isFilled = true;
};

const globalRoomMemory = (room: Room): void => {
  // Acces the flagMemory of this room
  const flagMemory: FlagMemory = Memory.flags[room.name];

  // Set the sources array to a empty array
  const sources: FlagMemory["commonMemory"]["sources"][] = [];

  // Loop through each source and push the id and pos to the empty source array
  room.find(FIND_SOURCES).forEach(source => {
    sources.push({ id: source.id, pos: source.pos });
  });

  // Reset this room in the stats memory
  Memory.stats.rooms[room.name] = {
    energyStored: {},
    commonMemory: {},
    performance: { expenses: {}, income: {} },
    cpu: { headModules: { creeps: {} }, smallModules: {}, creepModules: {} }
  };

  // Set all commonMemory for a owned and remote room
  flagMemory.commonMemory = {
    // Set the source length
    sourceCount: sources.length,
    // Get the id, type and amount from the mineral in this room
    mineral: {
      id: room.find(FIND_MINERALS)[0] ? room.find(FIND_MINERALS)[0].id : undefined,
      type: room.find(FIND_MINERALS)[0] ? room.find(FIND_MINERALS)[0].mineralType : undefined,
      amount: room.find(FIND_MINERALS)[0] ? Math.round(room.find(FIND_MINERALS)[0].mineralAmount) : undefined
    },
    // Set the id and pos of all sources to the memory of the room
    sources: sources,
    // Create a empty array for storing constructionSites
    constructionSites: [],
    // Create a empty array for storing energyStructures
    energyStructures: [],
    // Set the repair object
    // Create a empty array for storing targets to repair
    // Set the hitsTarget to a default of 250K
    repair: {
      targets: [],
      hitsTarget: 250 * 1000
    },
    // Set the energyStored to a 0 for both of the keys
    energyStored: { usable: 0, capacity: 0 }
  };

  // Set the roomPlanner object to the template
  flagMemory.roomPlanner = { room: { sources: [] } };

  // Set the enemies object to the template
  flagMemory.enemies = {
    parts: { ATTACK: 0, RANGED_ATTACK: 0, TOUGH: 0, HEAL: 0 },
    creeps: []
  };

  // Sets the damagedCreeps object to a empty array
  flagMemory.damagedCreeps = [];
};

const ownedRoomMemory = (room: Room & MyRoom): void => {
  // Run all the memory getters from the globalRoom part
  globalRoomMemory(room);

  // Acces the flagMemory of this room
  const flagMemory: FlagMemory = Memory.flags[room.name];

  // Set the spawnerEnergy key to a empty object
  Memory.stats.rooms[room.name].spawnerEnergy = {};
  // Set the controller key to a empty object
  Memory.stats.rooms[room.name].controller = {};

  // Set the roomPlanner base key to a empty object
  flagMemory.roomPlanner.base = {};

  // Set the controller level to current controller level
  flagMemory.commonMemory.controllerLevel = room.controller ? room.controller.level : undefined;

  // Set and get the headSpawnId
  flagMemory.commonMemory.headSpawnId = room.terminal
    ? room.terminal.pos.findInRange(room.spawns, 2)[0]
      ? // @ts-ignore: Id DOES exist on the result
        room.terminal.pos.findInRange(room.spawns, 2)[0].id
      : room.spawns[0].id
    : room.spawns[0]
    ? room.spawns[0].id
    : room.find(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_SPAWN
      }).length > 0
    ? room.find(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_SPAWN
      })[0].id
    : undefined;
  // Create a empty array for storing spawnEnergyStructures
  flagMemory.commonMemory.spawnEnergyStructures = [];
  // Set the storage in the controller storage to 0
  flagMemory.commonMemory.controllerStorage = { usable: 0 };
  // Set all links to undefined
  flagMemory.commonMemory.links = {
    source0: undefined,
    source1: undefined,
    head: undefined,
    controller: undefined
  };
  // Set the remotes object to default template
  // flagMemory.remotes = { totalSourceCount: 0, rooms: [] };

  // Run all timers for this room
  // timersHandler("ownedRoom", { room: room });

  // Check if Game.time is dividable by 10, if so set the isFilled to true
  // By the time this is true it should be filled
  if (Game.time % 10 === 0) flagMemory.isFilled = true;
};

const remoteRoomMemory = (room: Room & MyRoom): void => {
  // Run all the memory getters from the globalRoom part
  globalRoomMemory(room);

  // Acces the flagMemory of this room
  const flagMemory: FlagMemory = Memory.flags[room.name];

  // Run all timers for this room
  // timersHandler("remoteRoom", { room: room });

  // Check if Game.time is dividable by 10, if so set the isFilled to true
  // By the time this is true it should be filled
  if (Game.time % 10 === 0) flagMemory.isFilled = true;
};
//#endregion

//#region Export functions
export { globalMemory as GlobalMemory, ownedRoomMemory as OwnedRoomMemory, remoteRoomMemory as RemoteRoomMemory };
//#endregion
