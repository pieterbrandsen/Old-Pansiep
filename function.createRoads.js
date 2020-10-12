module.exports = {
  getPath: function(roomName,pos1,pos2) {
    const room = Game.rooms[roomName];

    if (room)
    return room.findPath(pos1, pos2, {ignoreCreeps: true});
  },

  run: function(roomName,pos1,pos2, oldPath) {
    if (Game.time % 1000 == 0) {
      const room = Game.rooms[roomName];
      const newPath = this.getPath(roomName,pos1,pos2);


      if (oldPath && newPath) {
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


        let returnPath = [];
        const terrain = new Room.Terrain(roomName);
        newPath.forEach((pos, i) => {
          const tile = terrain.get(pos.x, pos.y);
          returnPath[i] = {x:pos.x,y:pos.y};

          if (tile !== TERRAIN_MASK_WALL)
          room.createConstructionSite(pos.x,pos.y, STRUCTURE_ROAD);
        });

        return returnPath;
      }
    }
  },
}
