module.exports = {
  run: function(creep) {
    let flag = Memory.flags[creep.room.name];
    let start = Game.cpu.getUsed();

    let creepCarryCapacity = creep.store.getCapacity();
    let creepCarryUsedCapacity = creep.store.getUsedCapacity();
    if (creep.ticksToLive < 50 && creep.carry.energy === 0) {
        creep.suicide()
    }
    else if (creep.ticksToLive < 50 && creep.carry.energy !== 0) {
        if (creep.transfer(creep.room.terminal, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.terminal)}
    }
    else if (creep.memory.working === true && creepCarryUsedCapacity === 0) {
      creep.memory.working = false;
    }
    else if (creep.memory.working === false && creepCarryUsedCapacity == creepCarryCapacity) {
      creep.memory.working = true;
    }


    if (!flag) {
      creep.room.createFlag(25,25, creep.room.name)
      Memory.flags[creep.room.name] = {}
    }

    let room;
    function needsResource(resource, amount) {
      room = creep.room.name;
      let numberOfResourceTerminal = creep.room.terminal.store.getUsedCapacity([resource]);
      let numberOFResourceStorage = creep.room.storage.store.getUsedCapacity([resource]);
      return numberOfResourceTerminal < amount && numberOFResourceStorage > amount || numberOfResourceTerminal > amount && numberOfResourceTerminal > amount + 5000// && numberOFResourceStorage < amount
    }

    function needsResourceTerminal(resource, amount) {
      room = creep.room.name;
      let numberOfResourceTerminal = creep.room.terminal.store.getUsedCapacity([resource]);
      let numberOFResourceStorage = creep.room.storage.store.getUsedCapacity([resource]);
      return numberOfResourceTerminal < amount && numberOFResourceStorage > amount
    }
    function needsResourceStorage(resource, amount) {
      room = creep.room.name;
      let numberOfResourceTerminal = creep.room.terminal.store.getUsedCapacity([resource]);
      let numberOFResourceStorage = creep.room.storage.store.getUsedCapacity([resource])
      return numberOfResourceTerminal > amount// && numberOFResourceStorage < amount
    }

    let targetLink = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType === STRUCTURE_LINK);
      }
    });






    let possbileResourcesTierNormal = [RESOURCE_HYDROGEN,RESOURCE_OXYGEN,RESOURCE_UTRIUM,RESOURCE_KEANIUM,RESOURCE_LEMERGIUM,RESOURCE_ZYNTHIUM,RESOURCE_CATALYST];
    let possbileResourcesTier0 = [RESOURCE_HYDROXIDE,RESOURCE_ZYNTHIUM_KEANITE,RESOURCE_UTRIUM_LEMERGITE,RESOURCE_GHODIUM]

    let possbileResourcesTier1 = [RESOURCE_UTRIUM_HYDRIDE,RESOURCE_UTRIUM_OXIDE,RESOURCE_KEANIUM_HYDRIDE,RESOURCE_KEANIUM_OXIDE,RESOURCE_LEMERGIUM_HYDRIDE,RESOURCE_LEMERGIUM_OXIDE,RESOURCE_ZYNTHIUM_HYDRIDE,RESOURCE_ZYNTHIUM_OXIDE,RESOURCE_GHODIUM_HYDRIDE,RESOURCE_GHODIUM_OXIDE];

    let possbileResourcesTier2 = [RESOURCE_UTRIUM_ACID,RESOURCE_UTRIUM_ALKALIDE,RESOURCE_KEANIUM_ACID,RESOURCE_KEANIUM_ALKALIDE,RESOURCE_LEMERGIUM_ACID,RESOURCE_LEMERGIUM_ALKALIDE,RESOURCE_ZYNTHIUM_ACID,RESOURCE_ZYNTHIUM_ALKALIDE,RESOURCE_GHODIUM_ACID,RESOURCE_GHODIUM_ALKALIDE];

    let possbileResourcesTier3 = [RESOURCE_CATALYZED_UTRIUM_ACID,RESOURCE_CATALYZED_UTRIUM_ALKALIDE,RESOURCE_CATALYZED_KEANIUM_ACID,RESOURCE_CATALYZED_KEANIUM_ALKALIDE,RESOURCE_CATALYZED_LEMERGIUM_ACID,RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,RESOURCE_CATALYZED_ZYNTHIUM_ACID,RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_GHODIUM_ALKALIDE];


    const neededNormalSt = 7500; // 7
    const neededTier0St = 10 * 1000; // 4
    const neededTier1St = 2500; // 10
    const neededTier2St = 2500; // 10
    const neededTier3St = 15 * 1000; // 10

    const neededNormalTe = 5 * 1000; // 7
    const neededTier0Te = 5 * 1000; // 4
    const neededTier1Te = 2500; // 10
    const neededTier2Te = 2500; // 10
    const neededTier3Te = 10 * 1000; // 10

    function resourceInStorage(resource) {
      room = creep.room.name;
      return Game.rooms[room].storage.store.getUsedCapacity(resource);
    }

    function resourceInTerminal(resource) {
      room = creep.room.name;
      return Game.rooms[room].terminal.store.getUsedCapacity(resource);
    }


    if (!flag.resourcesNeededStorageTN) {
      flag.resourcesNeededStorageTN = [];
    }
    if (!flag.resourcesNeededStorageT0) {
      flag.resourcesNeededStorageT0 = [];
    }
    if (!flag.resourcesNeededStorageT1) {
      flag.resourcesNeededStorageT1 = [];
    }
    if (!flag.resourcesNeededStorageT2) {
      flag.resourcesNeededStorageT2 = [];
    }
    if (!flag.resourcesNeededStorageT3) {
      flag.resourcesNeededStorageT3 = [];
    }

    if (!flag.resourcesNeededTerminalTN) {
      flag.resourcesNeededTerminalTN = [];
    }
    if (!flag.resourcesNeededTerminalT0) {
      flag.resourcesNeededTerminalT0 = [];
    }
    if (!flag.resourcesNeededTerminalT1) {
      flag.resourcesNeededTerminalT1 = [];
    }
    if (!flag.resourcesNeededTerminalT2) {
      flag.resourcesNeededTerminalT2 = [];
    }
    if (!flag.resourcesNeededTerminalT3) {
      flag.resourcesNeededTerminalT3 = [];
    }


    if (Game.time % 500 == 0) {
      flag.resourcesNeededStorageTN = [];
      flag.resourcesNeededStorageT0 = [];
      flag.resourcesNeededStorageT1 = [];
      flag.resourcesNeededStorageT2 = [];
      flag.resourcesNeededStorageT3 = [];

      for (let i = 0;i < possbileResourcesTierNormal.length; i++) {
        if (resourceInStorage(possbileResourcesTierNormal[i]) < neededNormalSt && resourceInTerminal(possbileResourcesTierNormal[i]) > neededNormalTe) {
          flag.resourcesNeededStorageTN.push(possbileResourcesTierNormal[i]);
        }
      }
      for (let i = 0;i < possbileResourcesTier0.length; i++) {
        if (resourceInStorage(possbileResourcesTier0[i]) < neededTier0St && resourceInTerminal(possbileResourcesTier0[i]) > neededTier0Te) {
          flag.resourcesNeededStorageT0.push(possbileResourcesTier0[i]);
        }
      }
      for (let i = 0;i < possbileResourcesTier1.length; i++) {
        if (resourceInStorage(possbileResourcesTier1[i]) < neededTier1St && resourceInTerminal(possbileResourcesTier1[i]) > neededTier1Te) {
          flag.resourcesNeededStorageT1.push(possbileResourcesTier1[i]);
        }
      }
      for (let i = 0;i < possbileResourcesTier2.length; i++) {
        if (resourceInStorage(possbileResourcesTier2[i]) < neededTier2St && resourceInTerminal(possbileResourcesTier2[i]) > neededTier2Te) {
          flag.resourcesNeededStorageT2.push(possbileResourcesTier2[i]);
        }
      }
      for (let i = 0;i < possbileResourcesTier3.length; i++) {
        if (resourceInStorage(possbileResourcesTier3[i]) < neededTier3St && resourceInTerminal(possbileResourcesTier3[i]) > neededTier3Te) {
          flag.resourcesNeededStorageT3.push(possbileResourcesTier3[i]);
        }
      }




      flag.resourcesNeededTerminalTN = [];
      flag.resourcesNeededTerminalT0 = [];
      flag.resourcesNeededTerminalT1 = [];
      flag.resourcesNeededTerminalT2 = [];
      flag.resourcesNeededTerminalT3 = [];

      for (let i = 0;i < possbileResourcesTierNormal.length; i++) {
        if (resourceInTerminal(possbileResourcesTierNormal[i]) < neededNormalTe && resourceInStorage(possbileResourcesTier3[i]) > neededNormalSt) {
          flag.resourcesNeededTerminalTN.push(possbileResourcesTierNormal[i]);
        }
      }
      for (let i = 0;i < possbileResourcesTier0.length; i++) {
        if (resourceInTerminal(possbileResourcesTier0[i]) < neededTier0Te && resourceInStorage(possbileResourcesTier3[i]) > neededTier0St) {
          flag.resourcesNeededTerminalT0.push(possbileResourcesTier0[i]);
        }
      }
      for (let i = 0;i < possbileResourcesTier1.length; i++) {
        if (resourceInTerminal(possbileResourcesTier1[i]) < neededTier1Te && resourceInTerminal(possbileResourcesTier3[i]) > neededTier1St) {
          flag.resourcesNeededTerminalT1.push(possbileResourcesTier1[i]);
        }
      }
      for (let i = 0;i < possbileResourcesTier2.length; i++) {
        if (resourceInTerminal(possbileResourcesTier2[i]) < neededTier2Te && resourceInStorage(possbileResourcesTier3[i]) > neededTier2St) {
          flag.resourcesNeededTerminalT2.push(possbileResourcesTier2[i]);
        }
      }
      for (let i = 0;i < possbileResourcesTier3.length; i++) {
        if (resourceInTerminal(possbileResourcesTier3[i]) < neededTier3Te && resourceInStorage(possbileResourcesTier3[i]) > neededTier3St) {
          flag.resourcesNeededTerminalT3.push(possbileResourcesTier3[i]);
        }
      }
    }




    function goWork(storageType,resourceType) {
      if (storageType == "T") {
        if (creep.memory.working == false) {
          if (creep.carry[RESOURCE_ENERGY] > 0 || creep.carry[resourceType] == 0) {
            for (x of RESOURCES_ALL) {
              if (creep.withdraw(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.storage)
              }
              if (creep.withdraw(creep.room.storage, x) === 0) {
                break
              }
            }
          }
          else {
            creep.withdraw(creep.room.storage,resourceType)
          }
        }
        else if (creep.memory.working == true) {
          if (creep.carry[RESOURCE_ENERGY] > 0 || creep.carry[resourceType] == 0) {
            for (x of RESOURCES_ALL) {
              if (creep.withdraw(creep.room.terminal, x) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.terminal)
              }
              if (creep.withdraw(creep.room.terminal, x) === 0) {
                break
              }
            }
          }
          else {
            creep.transfer(creep.room.terminal,resourceType)
          }
        }
      }
      else if (storageType == "S") {
        if (creep.memory.working == false) {
          creep.withdraw(creep.room.terminal,resourceType)
        }
        else if (creep.memory.working == true) {
          if (creep.carry[RESOURCE_ENERGY] > 0 || creep.carry[resourceType] == 0) {
            for (x of RESOURCES_ALL) {
              if (creep.transfer(creep.room.storagez, x) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.storage)
              }
              if (creep.transfer(creep.room.storage, x) === 0) {
                break
              }
            }
          }
          else {
            creep.transfer(creep.room.storage,resourceType)
          }
        }
      }
    }


    if (flag.resourcesNeededTerminalTN.length > 0) {
      if (resourceInTerminal(flag.resourcesNeededTerminalTN[0]) > neededNormalTe) {
        flag.resourcesNeededTerminalTN.shift();
      }
      else {
        goWork("T",flag.resourcesNeededTerminalTN[0])
      }
    }
    else if (flag.resourcesNeededTerminalT0.length > 0) {
      if (resourceInTerminal(flag.resourcesNeededTerminalT0[0]) > neededTier0Te) {
        flag.resourcesNeededTerminalT0.shift();
      }
      else {
        goWork("T",flag.resourcesNeededTerminalT0[0])
      }
    }
    else if (flag.resourcesNeededTerminalT1.length > 0) {
      if (resourceInTerminal(flag.resourcesNeededTerminalT1[0]) > neededTier1Te) {
        flag.resourcesNeededTerminalT1.shift();
      }
      else {
        goWork("T",flag.resourcesNeededTerminalT1[0])
      }
    }
    else if (flag.resourcesNeededTerminalT2.length > 0) {
      if (resourceInTerminal(flag.resourcesNeededTerminalT2[0]) > neededTier2Te) {
        flag.resourcesNeededTerminalT2.shift();
      }
      else {
        goWork("T",flag.resourcesNeededTerminalT2[0])
      }
    }
    else if (flag.resourcesNeededTerminalT3.length > 0) {
      if (resourceInTerminal(flag.resourcesNeededStorageT3[0]) > neededTier3Te) {
        flag.resourcesNeededTerminalT3.shift();
      }
      else {
        goWork("T",flag.resourcesNeededTerminalT3[0])
      }
    }


    else if (flag.resourcesNeededStorageTN.length > 0) {
      if (resourceInStorage(flag.resourcesNeededStorageTN[0]) > neededNormalSt) {
        flag.resourcesNeededStorageTN.shift();
      }
      else {
        goWork("S",flag.resourcesNeededStorageTN[0])
      }
    }
    else if (flag.resourcesNeededStorageT0.length > 0) {
      if (resourceInStorage(flag.resourcesNeededStorageT0[0]) > neededTier0St) {
        flag.resourcesNeededStorageT0.shift();
      }
      else {
        goWork("S",flag.resourcesNeededStorageT0[0])
      }
    }
    else if (flag.resourcesNeededStorageT1.length > 0) {
      if (resourceInStorage(flag.resourcesNeededStorageT1[0]) > neededTier1St) {
        flag.resourcesNeededStorageT1.shift();
      }
      else {
        goWork("S",flag.resourcesNeededStorageT1[0])
      }
    }
    else if (flag.resourcesNeededStorageT2.length > 0) {
      if (resourceInStorage(flag.resourcesNeededStorageT2[0]) > neededTier2St) {
        flag.resourcesNeededStorageT2.shift();
      }
      else {
        goWork("S",flag.resourcesNeededStorageT2[0])
      }
    }
    else if (flag.resourcesNeededStorageT3.length > 0) {
      if (resourceInStorage(flag.resourcesNeededStorageT3[0]) > neededTier3St) {
        flag.resourcesNeededStorageT3.shift();
      }
      else {
        goWork("S",flag.resourcesNeededStorageT3[0])
      }
    }
    else {
      if (creep.carry[RESOURCE_ENERGY] == 0 && creepCarryUsedCapacity > 0) {
        for (x of RESOURCES_ALL) {
          if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.storage)
          }
          if (creep.transfer(creep.room.storage, x) === 0) {
            break;
          }
        }
      }
      else {
        if (creep.memory.working == true) {
          if (creep.carry[RESOURCE_ENERGY] > 0) {
            if (targetLink.energy < 200) {
              creep.transfer(targetLink, RESOURCE_ENERGY)
            }
            else if (creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) > 95000 && creep.room.storage.store.getFreeCapacity() > 50000  && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) < 500000) {
              creep.transfer(creep.room.storage, RESOURCE_ENERGY)
            }
            else if ((creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < 100000 && creep.room.terminal.store.getFreeCapacity() > 5000) || creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) == null) {
              creep.transfer(creep.room.terminal, RESOURCE_ENERGY)
            }
          }
          else {
            for (x of RESOURCES_ALL) {
              if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.storage)
              }
              if (creep.transfer(creep.room.storage, x) === 0) {
                break
              }
            }
          }
        }
        else if (creep.memory.working == false) {
          if (creep.room.terminal.store.getUsedCapacity(RESOURCE_ENERGY) < 95000 && creep.room.storage.store.getUsedCapacity(RESOURCE_ENERGY) > 1000 && targetLink.energy < 500) {
            creep.withdraw(creep.room.storage, RESOURCE_ENERGY)
          }
          else if (targetLink.energy > 500) {
            creep.withdraw(targetLink, RESOURCE_ENERGY)
          }
        }
      }
    }





    if (creep.room.name == creep.memory.room) {
      flag.transfererLiTeCpu += Game.cpu.getUsed() - start
    }
  }
};
