module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    if (flagMemory.links) {
      if (flagMemory.links.linkTo1 && flagMemory.links.linkTo2) {
        let linkTo1 = Game.getObjectById(flagMemory.links.linkTo1);
        let linkTo2 = Game.getObjectById(flagMemory.links.linkTo2);
        linkTo1.transferEnergy(linkTo2)
      }

      if (flagMemory.links.linkFrom1 && flagMemory.links.linkTo1) {
        let linkFrom1 = Game.getObjectById(flagMemory.links.linkFrom1);
        let linkTo1 = Game.getObjectById(flagMemory.links.linkTo1);
        linkFrom1.transferEnergy(linkTo1)
      }

      if (flagMemory.links.linkFrom2 && flagMemory.links.linkTo1) {
        let linkFrom2 = Game.getObjectById(flagMemory.links.linkFrom2);
        let linkTo1 = Game.getObjectById(flagMemory.links.linkTo1);
        linkFrom2.transferEnergy(linkTo1)
      }
    }




    function findLinkInRange(object,range) {
      if (object !== null) {
        const link = object.pos.findClosestByRange(room.links, range)

        if (link !== null)
        return link;
      }
    }


    if (!flagMemory.links.linkTo1) {
      if (room.controller.level >= 6) {
        const headSpawn = Game.getObjectById(flagMemory.roomManager.headSpawn);
        if (headSpawn) {
          const link = findLinkInRange(headSpawn,3).id;
          if (link)
          flagMemory.links.linkTo1 = link;
        }
      }
    }
    if (!flagMemory.links.linkTo2) {
      if (room.controller.level >= 6) {
        const link = findLinkInRange(room.controller,3).id;
        if (link)
        flagMemory.links.linkTo2 = link;
      }
    }
    if (!flagMemory.links.linkFrom1) {
      if (room.controller.level >= 7) {
        let source = Game.getObjectById(flagMemory.sources[0].id);
        const link = findLinkInRange(source,3).id;
        if (link)
        flagMemory.links.linkFrom1 = link;
      }
    }
    if (!flagMemory.links.linkFrom2) {
      if (room.controller.level >= 7) {
        let source = Game.getObjectById(flagMemory.sources[1].id);
        const link = findLinkInRange(source,3).id;
        if (link)
        flagMemory.links.linkFrom2 = link;
      }
    }
  }
}
