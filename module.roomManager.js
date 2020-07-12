module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    if (flagMemory.roomManager.sources[0].HasStrcuture == false) {
      console.log(true)
    }
  }
}
