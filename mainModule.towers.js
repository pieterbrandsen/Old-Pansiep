module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];
    const towers = room.towers;

    if (flagMemory.enemyCount > 0) {
      for (let tower of room.towers) {
        tower.defend();
      }
    }
  }
}
