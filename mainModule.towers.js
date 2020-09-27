const getHostileCreepsInRoom = require('function.getHostileCreepsInRoom');

module.exports = {
  run: function(roomName) {
    // Get Variables Needed For MainModule //
    // Define The Input Room And FlagMemory //
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    // Define The Towers In The Input Room //
    const towers = room.towers;


    // Run Each 10 Ticks This Function //
    if (Game.time % 10 == 0)
    // This Function Gets All The Hostile Creeps In The Room, Excluded The Whitlisted Creeps //
    getHostileCreepsInRoom.run(roomName);

    // If There Is More Then One Enemy Found In The Room //
    if (flagMemory.enemyCreepCount > 0) {
      // This Function Will Get A Enemy Target For The Towers //
      function getEnemyTarget() {
        // Define An Undefined Target //
        let targetId;

        // For Each Enemy In FlagMemory.Enemys //
        flagMemory.enemys.forEach((enemy, i) => {
          const enemyObject = Game.getObjectById(enemy.id);
          // If Enemy Is Defined //
          if (enemyObject) {
            // If Enemy Has More Then One Active RANGED_ATTACK BodyPart //
            // If So Enemy.Id Is TargetId //
            if (enemyObject.getActiveBodyparts(RANGED_ATTACK) > 0)
            targetId = enemy.id;
            // If Enemy Has More Then One Active ATTACK BodyPart //
            // If So Enemy.Id Is TargetId //
            else if (enemyObject.getActiveBodyparts(ATTACK) > 0)
            targetId = enemy.id;
          }
        });

        // If TargetId Is Found //
        // If So TowerTarget Is TargetId //
        if (targetId !== undefined)
        flagMemory.towerTarget = targetId;
        // Else If The First Enemy Is Defined, Get The First Id //
        else if (flagMemory.enemys[0]) {
          // If Enemy Is Defined //
          const enemyObject = Game.getObjectById(flagMemory.enemys[0].id);

          // If Enemy Is Defined //
          if (enemyObject && flagMemory.enemys[0])
          flagMemory.towerTarget = flagMemory.enemys[0].id;
          // Else Remove Enemy From Array //
          else
          flagMemory.enemys.shift();
        }
      }

      // If TowerTarget Is Defined //
      if (Game.getObjectById(flagMemory.towerTarget) !== null) {
        // Let Each Tower Attack The TowerTarget //
        for (let tower of towers)
        tower.defend(flagMemory.towerTarget);
      }
      // Else Get A New Target To Attack //
      else
      getEnemyTarget();
    }
  }
}
