module.exports = {
  getPath: function(roomName,pos1,pos2) {
    const room = Game.rooms[roomName];

    if (room)
    return room.findPath(pos1, pos2, {ignoreCreeps: true});
  },

  run: function(roomName,pos1,pos2, oldPath) {
    if (Game.time % 2500 == 0) {
      const room = Game.rooms[roomName];
      const newPath = this.getPath(roomName,pos1,pos2);


      if (oldPath) {
        oldPath.forEach((pos, i) => {
          let isFound = false;

          newPath.forEach((newPathPos, i) => {
            if (pos.x == newPathPos.x && pos.y == newPathPos.y)
            isFound = true;
          });

          if (!isFound) {
            const structures = room.lookForAt(LOOK_STRUCTURES,pos.x,pos.y);

            structures.forEach((structureMemory, i) => {
              const structure = Game.getObjectById(structureMemory.id);

              if (structure.structureType == STRUCTURE_ROAD)
              structure.destroy();
            });
          }
        });
      }



      let returnPath = [];
      const newPathLength = newPath.length;
      newPath.forEach((pos, i) => {
        returnPath[i] = {x:pos.x,y:pos.y};

        if (i !== newPathLength)
        room.createConstructionSite(pos.x,pos.y, STRUCTURE_ROAD);
      });

      return returnPath;
    }
  },
}
