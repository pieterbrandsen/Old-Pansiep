module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
    const towers = room.towers;

    // If FlagMemory Has Data Of More Then One Enemy //
    if (flagMemory.enemyCount > 0) {
      // Run Defend (Attack) For Each Tower //
      for (let tower of room.towers) {
        tower.defend();
      }
    }
  }
}
