module.exports = {
  run: function(creep) {
    const room = Game.rooms[creep.room.name];
    const flagMemory = Memory.flags[room.name];
    const labsFlagMemory = flagMemory.labs;


    function getReactionToMake(getFirstMissingReaction) {
      if (getFirstMissingReaction)
      creep.memory.currentReaction = Memory.reactions[getFirstMissingReaction];
    }

    function withdrawTarget(targetId, resourceType) {
      const target = Game.getObjectById(targetId);

      switch (creep.withdraw(target,resourceType)) {
        case OK:
        creep.memory.targetId = "";
        break;
        case ERR_NOT_IN_RANGE:
        creep.travelTo(target);
        break;
        default:
        break;
      }
    }

    function transferTarget(targetId, resourceType) {
      const target = Game.getObjectById(targetId);

      switch (creep.transfer(target,resourceType)) {
        case OK:
        creep.memory.targetId = "";
        break;
        case ERR_NOT_IN_RANGE:
        creep.travelTo(target);
        break;
        default:
        break;
      }
    }


    if (Object.keys(flagMemory.boosting).length == 0) {
      if (labsFlagMemory && labsFlagMemory.reactionsNeeded) {
        const getFirstMissingReaction = labsFlagMemory.reactionsNeeded[0];
        const minAmount = 999;


        if (creep.memory.currentReaction !== undefined) {
          if (Game.time % 100 == 0) {
            if (room.storage.store.getUsedCapacity(getFirstMissingReaction) > minAmount) {
              creep.memory.currentReaction = undefined;
              labsFlagMemory.reactionsNeeded.shift();
            }
          }
          else {
            if (!creep.memory.targetId) {
              labsFlagMemory.outputLabsIds.forEach((labId, i) => {
                const lab = Game.getObjectById(labId);
                if (lab) {
                  if ((lab.mineralAmount >= 200 || (lab.mineralType !== getFirstMissingReaction && lab.mineralType)) && creep.store.getUsedCapacity() == 0) {
                    creep.memory.targetId = labId;
                    creep.memory.working = "withdraw";
                  }
                }
              });

              if (!creep.memory.targetId) {
                labsFlagMemory.inputLabsIds.forEach((labId, i) => {
                  const lab = Game.getObjectById(labId);

                  if (lab) {
                    if (creep.store.getUsedCapacity(creep.memory.currentReaction[i]) > 0 && (lab.mineralAmount == 0 || (lab.mineralAmount < 500 && lab.mineralType == creep.memory.currentReaction[i]))) {
                      creep.memory.targetId = labId;
                      creep.memory.working = "transfer";
                      creep.memory.transferResource = creep.memory.currentReaction[i];
                    }
                    else if (creep.store.getUsedCapacity() == 0 && (lab.mineralAmount == 0 || (lab.mineralAmount < 500 && lab.mineralType == creep.memory.currentReaction[i])) && creep.room.storage.store.getUsedCapacity(creep.memory.currentReaction[i]) > 0) {
                      creep.memory.targetId = room.storage.id;
                      creep.memory.working = "withdraw";
                      creep.memory.withdrawResource = creep.memory.currentReaction[i];
                    }
                    else if (creep.store.getUsedCapacity() == 0 && lab.mineralType !== creep.memory.currentReaction[i] && lab.mineralAmount > 0) {
                      creep.memory.targetId = lab.id;
                      creep.memory.working = "withdraw";
                      creep.memory.withdrawResource = lab.mineralType;
                    }
                  }
                });

                if (creep.store.getUsedCapacity() > 0 && !creep.memory.targetId) {
                  creep.memory.targetId = room.storage.id;
                  creep.memory.working = "transfer";
                  creep.memory.withdrawResource = "";
                }
                else if (creep.pos.inRangeTo(creep.room.controller,5) == false && !creep.memory.targetId)
                creep.moveTo(creep.room.controller);
              }
            }
            else {
              const target = Game.getObjectById(creep.memory.targetId);
              if (target.structureType == "lab") {
                if (creep.memory.working == "withdraw")
                withdrawTarget(target.id,target.mineralType);
                else if (creep.memory.working == "transfer")
                transferTarget(target.id,creep.memory.transferResource);
              }
              else {
                if (creep.room.storage.store.getUsedCapacity(creep.memory.withdrawResource) > 0 && creep.store.getUsedCapacity() == 0)
                withdrawTarget(target.id, creep.memory.withdrawResource);
                else if (creep.store.getUsedCapacity() > 0)
                transferTarget(target.id, Object.keys(creep.store)[0]);
                else
                creep.memory.targetId = "";
              }
            }
          }
        }
        else
        getReactionToMake(getFirstMissingReaction);
      }
    }
    else {
      creep.memory.targetId = "";

      if (creep.memory.targetI >= 0) {
        const lab = Game.getObjectById(flagMemory.boosting[creep.memory.targetI].boostLabId);
        const boostResource = flagMemory.boosting[creep.memory.targetI].boostResource;

        if (lab.mineralType && lab.mineralType !== boostResource || !lab.mineralType || (lab.mineralType && lab.mineralType == boostResource && lab.mineralAmount < 500)) {
          if (creep.store.getUsedCapacity() == 0) {
            if (lab.mineralType && lab.mineralType !== boostResource)
            withdrawTarget(lab.id, lab.mineralType);
            else
            withdrawTarget(creep.room.storage.id, boostResource);
          }
          else {
            if (creep.room.storage.store.getFreeCapacity() > 5000 && creep.store.getUsedCapacity(boostResource) == 0)
            transferTarget(creep.room.storage.id, Object.keys(creep.store)[0]);
            else
            transferTarget(lab.id, boostResource);
          }
        }
        else
        creep.memory.targetI = -1;
      }
      else {
        Object.keys(flagMemory.boosting).forEach((item, i) => {
          const lab = Game.getObjectById(flagMemory.boosting[item].boostLabId);
          const boostResource = flagMemory.boosting[item].boostResource;

          if (lab.mineralType && lab.mineralType !== boostResource || !lab.mineralType)
          creep.memory.targetI = i;
        });

        creep.moveTo(creep.room.controller);
      }
    }
  }
}
