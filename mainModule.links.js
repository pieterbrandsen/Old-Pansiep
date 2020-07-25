module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    function findLinkInRange(objectId,range) {
      // Check If Input Object Is Defined
      const object = Game.getObjectById(objectId);
      if (object !== null) {
        // Check If Every Link In Memory Is Defined, Else Return Undefined //
        room.links.forEach((link, i) => {
          if (!link)
          return undefined
        });

        const link = object.pos.findClosestByRange(room.links, range)

        // If Link Is Found, Return The Id //
        if (link !== null)
        return link.id;
      }
    }

    function transferLinkEnergy(fromLink,toLink) {
      Game.getObjectById(fromLink).transferEnergy(Game.getObjectById(toLink))
    }

    // If Link Has Its Memory //
    if (flagMemory.links) {
      // If Both Links Has Memory //
      if (flagMemory.links.linkTo1 && flagMemory.links.linkTo2) {
        // Try To Transfer Energy From One To The Other //
        transferLinkEnergy(flagMemory.links.linkTo1, flagMemory.links.linkTo2);
      }

      // If Both Links Has Memory //
      if (flagMemory.links.linkFrom1 && flagMemory.links.linkTo1) {
        // Try To Transfer Energy From One To The Other //
        transferLinkEnergy(flagMemory.links.linkFrom1, flagMemory.links.linkTo1);
      }

      // If Both Links Has Memory //
      if (flagMemory.links.linkFrom2 && flagMemory.links.linkTo1) {
        // Try To Transfer Energy From One To The Other //
        transferLinkEnergy(flagMemory.links.linkFrom2, flagMemory.links.linkTo1);
      }


      // If Room Is Missing This Link //
      if (!flagMemory.links.linkTo1) {
        if (room.controller.level >= 6) {
          const headSpawn = Game.getObjectById(flagMemory.roomManager.headSpawn);
          if (headSpawn) {
            const link = findLinkInRange(headSpawn.id,3);

            // If Link Is Found, Save The Link //
            if (link)
            flagMemory.links.linkTo1 = link;
          }
        }
      }

      // If Room Is Missing This Link //
      if (!flagMemory.links.linkTo2) {
        if (room.controller.level >= 6) {
          const link = findLinkInRange(room.controller.id,3);

          // If Link Is Found, Save The Link //
          if (link)
          flagMemory.links.linkTo2 = link;
        }
      }

      // If Room Is Missing This Link //
      if (!flagMemory.links.linkFrom1) {
        if (room.controller.level >= 7) {
          const link = findLinkInRange(flagMemory.sources[0],3);

          // If Link Is Found, Save The Link //
          if (link)
          flagMemory.links.linkFrom1 = link;
        }
      }

      // If Room Is Missing This Link //
      if (!flagMemory.links.linkFrom2) {
        if (room.controller.level >= 7) {
          // Search Link //
          const link = findLinkInRange(flagMemory.sources[1].id,3);

          // If Link Is Found, Save The Link //
          if (link)
          flagMemory.links.linkFrom2 = link;
        }
      }
    }
  }
}
