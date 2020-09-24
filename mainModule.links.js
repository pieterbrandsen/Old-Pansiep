module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];


    function findLinkInRange(objectId,range) {
      // Check If Input Object Is Defined
      const object = Game.getObjectById(objectId);

      let linkId;
      if (object !== null) {
        // Check If Every Link In Memory Is Defined, Else Return Undefined //
        room.links.forEach((link, i) => {
          if (link) {
            if (link.pos.inRangeTo(object,range))
            linkId = link.id;
          }
        });
      }

      return linkId;
    };

    function transferLinkEnergy(fromLinkId,toLinkId) {
      const fromLink = Game.getObjectById(fromLinkId);
      const toLink = Game.getObjectById(toLinkId);
      let transferEnergyAmount = 0;


      if (toLink && fromLink) {
        if (toLink.store.getFreeCapacity(RESOURCE_ENERGY) <= fromLink.store.getUsedCapacity(RESOURCE_ENERGY))
        transferEnergyAmount = toLink.store.getFreeCapacity(RESOURCE_ENERGY);
        else
        transferEnergyAmount = fromLink.store.getUsedCapacity(RESOURCE_ENERGY);


        if (transferEnergyAmount > 10)
        fromLink.transferEnergy(toLink, transferEnergyAmount);
      }
    };

    function resetLinks() {
      if (!Game.getObjectById(flagMemory.links.linkFrom1))
      flagMemory.links.linkFrom1 = "";
      if (!Game.getObjectById(flagMemory.links.linkFrom2))
      flagMemory.links.linkFrom2 = "";
      if (!Game.getObjectById(flagMemory.links.linkTo1))
      flagMemory.links.linkTo1 = "";
      if (!Game.getObjectById(flagMemory.links.linkTo2))
      flagMemory.links.linkTo2 = "";
    };

    function getAllLinks() {
      // If Room Is Missing This Link //
      if (!flagMemory.links.linkFrom1) {
        if (room.controller.level >= 6) {
          const link = findLinkInRange(flagMemory.sources[0].id,3);
          // If Link Is Found, Save The Link //
          if (link)
          flagMemory.links.linkFrom1 = link;
        }
      }
      // If Room Is Missing This Link //
      if (!flagMemory.links.linkFrom2) {
        if (room.controller.level >= 7 && flagMemory.sources.length > 1) {
          // Search Link //
          const link = findLinkInRange(flagMemory.sources[1].id,3);

          // If Link Is Found, Save The Link //
          if (link)
          flagMemory.links.linkFrom2 = link;
        }
      }
      // If Room Is Missing This Link //
      if (!flagMemory.links.linkTo1) {
        const link = findLinkInRange(flagMemory.roomManager.headSpawn,3);

        // If Link Is Found, Save The Link //
        if (link)
        flagMemory.links.linkTo1 = link;
      }
      // If Room Is Missing This Link //
      if (!flagMemory.links.linkTo2) {
        const link = findLinkInRange(room.controller.id,3);

        // If Link Is Found, Save The Link //
        if (link)
        flagMemory.links.linkTo2 = link;
      }
    };

    // If Link Has Its Memory //
    if (flagMemory.links && flagMemory.controllerLevel) {
      if (Game.time % 100 == 0) {
        resetLinks();
        getAllLinks();
      }

      transferLinkEnergy(flagMemory.links.linkTo1, flagMemory.links.linkTo2);
      transferLinkEnergy(flagMemory.links.linkFrom1, flagMemory.links.linkTo1);
      transferLinkEnergy(flagMemory.links.linkFrom2, flagMemory.links.linkTo1);
    }
  }
}
