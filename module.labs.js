const possbileReactions = [RESOURCE_HYDROXIDE,RESOURCE_ZYNTHIUM_KEANITE,RESOURCE_UTRIUM_LEMERGITE,RESOURCE_GHODIUM,
  RESOURCE_UTRIUM_HYDRIDE,RESOURCE_UTRIUM_OXIDE,RESOURCE_KEANIUM_HYDRIDE,RESOURCE_KEANIUM_OXIDE,RESOURCE_LEMERGIUM_HYDRIDE,RESOURCE_LEMERGIUM_OXIDE,RESOURCE_ZYNTHIUM_HYDRIDE,RESOURCE_ZYNTHIUM_OXIDE,RESOURCE_GHODIUM_HYDRIDE,RESOURCE_GHODIUM_OXIDE,
  RESOURCE_UTRIUM_ACID,RESOURCE_UTRIUM_ALKALIDE,RESOURCE_KEANIUM_ACID,RESOURCE_KEANIUM_ALKALIDE,RESOURCE_LEMERGIUM_ACID,RESOURCE_LEMERGIUM_ALKALIDE,RESOURCE_ZYNTHIUM_ACID,RESOURCE_ZYNTHIUM_ALKALIDE,RESOURCE_GHODIUM_ACID,RESOURCE_GHODIUM_ALKALIDE,
  RESOURCE_CATALYZED_UTRIUM_ACID,RESOURCE_CATALYZED_UTRIUM_ALKALIDE,RESOURCE_CATALYZED_KEANIUM_ACID,RESOURCE_CATALYZED_KEANIUM_ALKALIDE,RESOURCE_CATALYZED_LEMERGIUM_ACID,RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,RESOURCE_CATALYZED_ZYNTHIUM_ACID,RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_GHODIUM_ALKALIDE];

    // should be 5K
  const minAmount = 999;


  module.exports = {
    run: function(roomName) {
      const room = Game.rooms[roomName];
      const flagMemory = Memory.flags[roomName];

      if (flagMemory.labs && Game.cpu.bucket > 5000) {
        const inputLab0 = Game.getObjectById(flagMemory.labs.inputLabsIds[0]);
        const inputLab1 = Game.getObjectById(flagMemory.labs.inputLabsIds[1]);

        if (flagMemory.labs.outputLabsIds.length > 0 && Object.keys(flagMemory.boosting).length == 0) {
          flagMemory.labs.outputLabsIds.forEach((labId, i) => {
            const lab = Game.getObjectById(labId);
            if (lab.cooldown == 0)
            lab.runReaction(inputLab0, inputLab1)
          });
        }
      }
    },

    update: function(roomName) {
      const room = Game.rooms[roomName];
      const flagMemory = Memory.flags[roomName];

      if (Game.time % 1000 == 0) {
        if (flagMemory.labs) {
          flagMemory.labs.reactionsNeeded = [];
          possbileReactions.forEach((reaction, i) => {
            if(room.storage.store.getUsedCapacity(reaction) < minAmount)
            flagMemory.labs.reactionsNeeded.push(reaction);
          });
        }
      }
    },

    setup: function(roomName) {
      const room = Game.rooms[roomName];
      const flagMemory = Memory.flags[roomName];

      if (Memory.reactions) {
        const ingredientsForCompound = {};

        for (let ingredient1 in REACTIONS) {
          const map2 = REACTIONS[ingredient1];
          for (let ingredient2 in map2) {
            const compound = map2[ingredient2];
            const ingredients = [ingredient1, ingredient2];
            ingredientsForCompound[compound] = ingredients
          }
        };

        Memory.reactions = ingredientsForCompound;
      };

      if (room.labs.length > 3) {
        const labs = room.labs;
        flagMemory.labs = {};

        flagMemory.labs.reactionsNeeded = [];
        Object.keys(Memory.reactions).forEach((reaction, i) => {
          if(room.storage.store.getUsedCapacity(reaction) < minAmount)
          flagMemory.labs.reactionsNeeded.push(reaction);
        });

        flagMemory.labs.inputLabsIds = [];
        const labLength = room.labs.length;
        labs.forEach((lab, i) => {
          if (lab) {
            let labsInRange = 0;
            labs.forEach((lab2, i) => {
              if (lab2 && lab.pos.inRangeTo(lab2, 2))
              labsInRange++;
            });

            if (labsInRange == labLength && flagMemory.labs.inputLabsIds.length < 2)
            flagMemory.labs.inputLabsIds.push(lab.id)
          }
        });

        flagMemory.labs.outputLabsIds = [];
        labs.forEach((lab, i) => {
          if (lab) {
            if (flagMemory.labs.inputLabsIds.indexOf(lab.id) == -1)
            flagMemory.labs.outputLabsIds.push(lab.id)
          }
        });
      }
    }
  }
