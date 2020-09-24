module.exports = {
  run: function(roomName) {
    // Get Variables Needed For MiniModule //
    // Define The Input Room And FlagMemory //
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
    // If Room Has Vision, Continue //
    if (room && flagMemory) {
      // Get All HostileCreeps In Room //
      const hostileCreeps = room.find(FIND_HOSTILE_CREEPS);
      const hostileStructure = room.find(FIND_HOSTILE_STRUCTURES);
      // Get All Owners That Are Whitelisted From HostileCreeps //
      const hostileCreepOwnerWhiteList = ["Rivaryn", "Emil8250", "Fiskmans"];
      // Reset Enemy Memory //
      flagMemory.enemys = [];
      flagMemory.enemyCreepCount = 0;
      // If There Are Hostile Creep's Being Found //
      if (hostileCreeps.length > 0) {
        // For Each Hostile Creep //
        hostileCreeps.forEach((creep, i) => {
          // Check If The Creep Owner Is On The WhiteList Array //
          // If So, Push The Creep To The Enemy FlagMemory And Do ++ To The EnemyCount //
          if (hostileCreepOwnerWhiteList.indexOf(creep.owner.username) == -1) {
            flagMemory.enemys.push(creep);
            flagMemory.enemyCreepCount++;
          }
          // Else Notify Me That There Is A Ally In My Room //
          else
          Game.notify(`There is a ally in room: ${roomName} and the name is: ${creep.owner.username}`);
        });
      }
      // If There Are Hostile Structures Being Found //
      if (hostileStructure.length > 0) {
        // For Each Hostile Structures //
        hostileStructure.forEach((structure, i) => {
          if (structure.structureType == "invaderCore") {
            // If So, Push The Creep To The Enemy FlagMemory And Do ++ To The EnemyCount //
            flagMemory.enemys.push(structure);
            flagMemory.enemyCreepCount++;
          }
        });
      }
    }
  }
}
