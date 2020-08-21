module.exports = {
  run: function(creep) {
    const room = Game.rooms[creep.room.name];
    const flagMemory = Memory.flags[room.name];

    if (!creep.memory.partsAmount)
    creep.memory.partsAmount = creep.body.length;

    // This Function Gets All Open Spawns //
    function getOpenSpawns() {
      // For Each Spawn In Room.Spawns //
      room.spawns.forEach((spawn, i) => {
        // If Spawn Is Defined //
        if (spawn) {
          // If Spawn Is Open, Push Spawn Id //
          if (spawn.spawning == null)
          creep.memory.renewSpawn = spawn.id;
        }
      });
    }

    function getEnergyCost() {
      // Get The SpawnCost Of THe Creep By Calculating The EnergyCost By Looping Through Each Parts And Counting The Cost Of That Part //
      let energyCost = 0;

      creep.body.forEach((part, i) => {
        switch (part) {
          case "carry":
          case "move":
          energyCost += 50;
          break;
          case "work":
          energyCost += 100;
          break;
          case "attack":
          energyCost += 80;
          break;
          case "ranged_attack":
          energyCost += 150;
          break;
          case "heal":
          energyCost += 250;
          break;
          case "claim":
          energyCost += 600;
          break;
          case "tough":
          energyCost += 10;
          break;
          default:
          break;
        }
      });

      return energyCost;
    }

    if (!creep.memory.creepSpawnCost)
    creep.memory.creepSpawnCost = getEnergyCost();


    // Get All Open Spawns //
    if (!creep.memory.renewSpawn)
    getOpenSpawns();
    else {
      const spawn = Game.getObjectById(creep.memory.renewSpawn);
      creep.say(spawn.renewCreep(creep))
      switch (spawn.renewCreep(creep)) {
        case OK:
        creep.memory.canRenew = true;

        // Return Energy Cost To RoomTotal //
        Memory.flags[creep.room.name].trackers.performance.spawnerEnergy += Math.ceil(creep.memory.creepSpawnCost/2.5/creep.memory.partsAmount)
        // Return Energy Cost To RoleTotal //
        Memory.flags[creep.room.name].trackers.spawner[creep.memory.role] += Math.ceil(creep.memory.creepSpawnCost/2.5/creep.memory.partsAmount)
        creep.say(creep.ticksToLive);
        break;
        case ERR_NOT_ENOUGH_ENERGY:
        case ERR_FULL:
        creep.memory.canRenew = false;
        creep.memory.renewSpawn = "";
        break;
        case ERR_NOT_IN_RANGE:
        creep.travelTo(spawn);
        default:
        break;
      }
    }
  }
}
