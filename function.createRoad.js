module.exports = {
  getPath: function(roomName,pos1,pos2) {
    const room = Game.rooms[roomName];

    if (room)
    return room.room.findPath(pos1, pos2, {ignoreCreeps: true});
  },

  run: function(inputPath) {
    inputPath.forEach((pos, i) => {
      console.log(pos);
    });
  },
}
