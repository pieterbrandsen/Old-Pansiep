module.exports = {
  check: function(creep, boostParts, boostTiers) {
    const room = Game.rooms[creep.room.name];
    const flagMemory = Memory.flags[creep.room.name];

    //console.log(creep.ticksToLive, creep.name)
    if (room.storage && flagMemory.controllerLevel >= 4) {
      let resourceTypes = [];

      boostParts.forEach((item, i) => {
        const runGetResource = getResourceType(creep.memory.role, boostParts[i], boostTiers[i]);
        if (runGetResource !== undefined && boostTiers[i] > 0)
        resourceTypes[resourceTypes.length] = runGetResource;
      });

      function getResourceType(role, boostPart, boostTier) {
        let resource;
        switch (boostPart) {
          case "work":
          if (role.includes("harvester")) {
            switch (boostTier) {
              case 1:
              resource = "UO";
              break;
              case 2:
              resource = "UHO2";
              break;
              case 3:
              resource = "XUHO2";
              break;
              default:
              resource = "UO";
              break;
            }
          }
          else if (role == "repairer" || role == "builder") {
            switch (boostTier) {
              case 1:
              resource = "LO";
              break;
              case 2:
              resource = "LH2O";
              break;
              case 3:
              resource = "XLH2O";
              break;
              default:
              resource = "LO";
              break;
            }
          }
          else if (role == "upgrader") {
            switch (boostTier) {
              case 1:
              resource = "GH";
              break;
              case 2:
              resource = "GH2O";
              break;
              case 3:
              resource = "XGH2O";
              break;
              default:
              resource = "GH";
              break;
            }
          }
          break;
          case "attack":
          switch (boostTier) {
            case 1:
            resource = "UH";
            break;
            case 2:
            resource = "UH2O";
            break;
            case 3:
            resource = "XUH2O";
            break;
            default:
            resource = "UH";
            break;
          }
          break;
          case "ranged_attack":
          switch (boostTier) {
            case 1:
            resource = "KO";
            break;
            case 2:
            resource = "KHO2";
            break;
            case 3:
            resource = "XKHO2";
            break;
            default:
            resource = "KO";
            break;
          }
          break;
          case "heal":
          switch (boostTier) {
            case 1:
            resource = "LO";
            break;
            case 2:
            resource = "LHO2";
            break;
            case 3:
            resource = "XLHO2";
            break;
            default:
            resource = "LO";
            break;
          }
          break;
          case "tough":
          switch (boostTier) {
            case 1:
            resource = "GO";
            break;
            case 2:
            resource = "GHO2";
            break;
            case 3:
            resource = "XGHO2";
            break;
            default:
            resource = "GO";
            break;
          }
          break;
          case "move":
          switch (boostTier) {
            case 1:
            resource = "ZO";
            break;
            case 2:
            resource = "ZHO2";
            break;
            case 3:
            resource = "XZHO2";
            break;
            default:
            resource = "ZO";
            break;
          }
          break;
          case "carry":
          switch (boostTier) {
            case 1:
            resource = "KH";
            break;
            case 2:
            resource = "KH2O";
            break;
            case 3:
            resource = "XKH2O";
            break;
            default:
            resource = "KH";
            break;
          }
          break;
          default:
          break;
        }

        const resourceStoredAmount = room.storage.store.getUsedCapacity(resource);
        if (resourceStoredAmount > creep.getActiveBodyparts(boostPart) * 30)
        return resource;
      }


      flagMemory.boosting = {};
      resourceTypes.forEach((resource, i) => {
        if (flagMemory.rolesCount["scientist"] > 0) {
          creep.memory.canBoost = true;
          flagMemory.boosting[i] = {};
          flagMemory.boosting[i].boostResource = resource;
          flagMemory.boosting[i].boostLabId = room.labs[i].id;
        }
        else
        creep.memory.canBoost = false;
      });


      if (resourceTypes.length == 0)
      creep.memory.canBoost = false;
    }
    else
    creep.memory.canBoost = false;
  },

  boost: function(creep) {
    const flagMemory = Memory.flags[creep.room.name];

    if (creep.memory.targetI >= 0) {
      if (flagMemory.boosting[creep.memory.targetI]) {
        const lab = Game.getObjectById(flagMemory.boosting[creep.memory.targetI].boostLabId);
        const boostResource = flagMemory.boosting[creep.memory.targetI].boostResource;

        if (!creep.pos.inRangeTo(lab,1))
        creep.travelTo(lab);
        else {
          if (lab.boostCreep(creep) == 0) {
            if (creep.memory.targetI + 1 == Object.keys(flagMemory.boosting).length) {
              creep.memory.canBoost = false;
              flagMemory.boosting = {};
            }
            else
            creep.memory.targetI = -1;
          }
        }
      }
    }
    else {
      Object.keys(flagMemory.boosting).forEach((item, i) => {
        if (item) {
          const lab = Game.getObjectById(flagMemory.boosting[item].boostLabId);
          const boostResource = flagMemory.boosting[item].boostResource;

          if (boostResource !== "boosted")
          creep.memory.targetI = i;
          else if (Object.keys(flagMemory.boosting).length == i) {
            creep.memory.canBoost = false;
            flagMemory.boosting = {};
          }
        }

        if (Object.keys(flagMemory.boosting).length == i) {
          creep.memory.canBoost = false;
          flagMemory.boosting = {};
        }
      });
    }
  }
}
