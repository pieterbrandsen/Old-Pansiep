const spawnCreep = require('mainModule.spawnCreep');
const manageLinks = require('mainModule.links');



function getTotalRoomEnergy(roomName) {
  const room = Game.rooms[roomName];
  const flagMemory = Memory.flags[roomName];

  // EnergyStorage Is Zero At Start //
  let energyStored = 0;

  // Loop Through All Containers And Count Energy In Container If Its Not The Controller Storage //
  room.containers.forEach((container, i) => {
    if (container.id !== flagMemory.controller.structure || !flagMemory.controller.structure) {
      energyStored += container.store.getUsedCapacity(RESOURCE_ENERGY);
    }
  });
  // Loop Through All Links And Count Energy In Link If Its Not The Controller Storage //
  room.links.forEach((link, i) => {
    if (flagMemory.links) {
      if (flagMemory.links.linkTo1) {
        if (link.id !== flagMemory.controller.structure || !flagMemory.controller.structure) {
          energyStored += link.store.getUsedCapacity(RESOURCE_ENERGY);
        }
      }
    }
  });

  // If There Is A Terminal In Room, Add EnergyCount
  if (room.terminal !== undefined)
  energyStored += room.terminal.store.getUsedCapacity(RESOURCE_ENERGY);

  // If There Is A Storage In Room, Add EnergyCount
  if (room.storage !== undefined)
  energyStored += room.storage.store.getUsedCapacity(RESOURCE_ENERGY);

  // Return EnergyCount
  return energyStored;
}

function getSpawningEnergy(roomName) {
  const room = Game.rooms[roomName];
  const flagMemory = Memory.flags[roomName];

  flagMemory.totalEnergyAvailable = room.energyAvailable;
  let spawnsLength = room.spawns.length;
  let extensionsLength = room.extensions.length;

  switch (room.controller.level) {
    case 1:
    if (spawnsLength > 1)
    spawnsLength = 1;
    if (extensionsLength > 0)
    extensionsLength = 0;
    break;
    case 2:
    if (spawnsLength > 1)
    spawnsLength = 1;
    if (extensionsLength > 5)
    extensionsLength = 5;
    break;
    case 3:
    if (spawnsLength > 1)
    spawnsLength = 1;
    if (extensionsLength > 10)
    extensionsLength = 10;
    break;
    case 4:
    if (spawnsLength > 1)
    spawnsLength = 1;
    if (extensionsLength > 20)
    extensionsLength = 20;
    break;
    case 5:
    if (spawnsLength > 1)
    spawnsLength = 1;
    if (extensionsLength > 30)
    extensionsLength = 30;
    break;
    case 6:
    if (spawnsLength > 1)
    spawnsLength = 1;
    if (extensionsLength > 40)
    extensionsLength = 40;
    break;
    case 7:
    if (spawnsLength > 2)
    spawnsLength = 2;
    if (extensionsLength > 50)
    extensionsLength = 50;
    break;
    default:
    break;
  }

  if (room.controller.level == 8)
  flagMemory.totalEnergyCapacity = (spawnsLength * 300) + (extensionsLength * 200);
  else if (room.controller.level == 7)
  flagMemory.totalEnergyCapacity = (spawnsLength * 300) + (extensionsLength * 100);
  else
  flagMemory.totalEnergyCapacity = (spawnsLength * 300) + (extensionsLength * 50);
}

function runPerformanceTracker(roomName) {
  const room = Game.rooms[roomName];
  const flagMemory = Memory.flags[roomName];

  if (Game.time % 50 == 0) {
    if (flagMemory.IsMemorySetup) {
      flagMemory.trackers.room.energyStored = getTotalRoomEnergy(roomName);

      let totalWallHitPoints = 0;
      let totalWallAmount = 0;
      if (room.walls) {
        room.walls.forEach((wall, i) => {
          if (wall) {
            totalWallHitPoints += wall.hits;
            totalWallAmount++;
          }
        });
      }

      let totalRampartHitPoints = 0;
      let totalRampartAmount = 0;
      if (room.ramparts) {
        room.ramparts.forEach((rampart, i) => {
          if (rampart) {
            totalRampartHitPoints += rampart.hits;
            totalRampartAmount++;
          }
        });
      }


      flagMemory.trackers.room.averageWallHP = totalWallHitPoints / totalWallAmount;
      flagMemory.trackers.room.averageRampartHP = totalRampartHitPoints / totalRampartAmount;
      flagMemory.trackers.room.rclLevel = room.controller.level;
      flagMemory.trackers.room.rclProgress = room.controller.progress;
      flagMemory.trackers.room.rclProgressTotal = room.controller.progressTotal;
    }
  }
}


module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    // Every 10 Ticks Run This //
    if (Game.time % 10 == 0 && flagMemory.IsMemorySetup) {
      // Run Spawning Code //
      spawnCreep.run(roomName);

      // Run The LinkManager //
      manageLinks.run(roomName);

      // Run Spawner Energy Getter //
      getSpawningEnergy(roomName);

      runPerformanceTracker(roomName);
    }


    // If Sources Is Defined //
    if (flagMemory.sources) {
      // Check Each 5000 ticks Or Memory Is Being Reset //
      if (Game.time % 5000 == 0 || (!flagMemory.roomManager.headSpawn && room.spawns.length > 0)) {
        console.log(`Memory in ${roomName} is being updated!`)

        // Get The Mineral Of The Room //
        const mineral = room.find(FIND_MINERALS)[0];
        if (mineral) {
          // Save The MineralAmount And Id //
          flagMemory.mineralAmount = mineral.mineralAmount;
        }
        else {
          // Set It At Undefined So Code Doesn't Break But Is Empty //
          flagMemory.mineralAmount = 0;
        }

        // Get The ConstructionSiteAmount //
        flagMemory.constructionSitesAmount = room.find(FIND_CONSTRUCTION_SITES).length;
      }
    }
  }
}
