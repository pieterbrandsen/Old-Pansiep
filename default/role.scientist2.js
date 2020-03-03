module.exports = {
    run: function (creep) {

      let creepMemory = creep.memory;
      // let labs = creep.room.find(creep.room.labs, {
      //     filter: (structure) => {
      //         return (structure);
      //     }
      // });
      if (!creep.memory.labs2) {
          creep.memory.labs2 = [];
      }
      if (!creep.memory.labsFinal) {
          creep.memory.labsFinal = [];
      }

      let test = creep.room.labs

      if (_.size(creepMemory.labs2) < 10) {
        let array = [];
        creep.room.labs.forEach(function(lab) {
          array.push(lab.id)
        });
        creepMemory.labs2 = array;
      }

      let inputLabs = [];
      let outputLabs = [];
      let labs = creep.room.find(FIND_MY_STRUCTURES, {structureType: STRUCTURE_LAB});
      if (creepMemory.labsFinal.length <= 10)
      {
        for (lab of labs)
        {
          if (lab.pos.findInRange(creep.room.labs, 2, {structureType: STRUCTURE_LAB}).length == 10 && inputLabs.length < 2)
          {
            inputLabs.push(lab.id);
          }
          else if (lab.pos.findInRange(creep.room.labs, 2, {structureType: STRUCTURE_LAB}).length < 10 && outputLabs.length < 8) {
            outputLabs.push(lab.id)
          }
          if (inputLabs.length == 2 && outputLabs.length == 8)
          {
            break;
          }
        }
      }

      if (creepMemory.labsFinal.length == 0) {
        let finalArray = inputLabs.concat(outputLabs)
        creepMemory.labsFinal = finalArray
      }

      // let lab1 = Game.getObjectById(creep.memory.lab1);
      // let lab2 = Game.getObjectById(creep.memory.lab2);
      // let lab3 = Game.getObjectById(creep.memory.lab3);
      // let lab4 = Game.getObjectById(creep.memory.lab4);
      // let lab5 = Game.getObjectById(creep.memory.lab5);
      // let lab6 = Game.getObjectById(creep.memory.lab6);
      // let lab7 = Game.getObjectById(creep.memory.lab7);
      // let lab8 = Game.getObjectById(creep.memory.lab8);
      // let lab9 = Game.getObjectById(creep.memory.lab9);
      // let lab10 = Game.getObjectById(creep.memory.lab10);
      //
      // let lab1MineralAmount = lab1.mineralAmount;
      // let lab2MineralAmount = lab2.mineralAmount;
      // let lab3MineralAmount = lab3.mineralAmount;
      // let lab4MineralAmount = lab4.mineralAmount;
      // let lab5MineralAmount = lab1.mineralAmount;
      // let lab6MineralAmount = lab6.mineralAmount;
      // let lab7MineralAmount = lab7.mineralAmount;
      // let lab8MineralAmount = lab8.mineralAmount;
      // let lab9MineralAmount = lab9.mineralAmount;
      // let lab10MineralAmount = lab10.mineralAmount;
      //
      // lab3.runReaction(lab1, lab2);
      // lab4.runReaction(lab1, lab2);
      // lab5.runReaction(lab1, lab2);
      // lab6.runReaction(lab1, lab2);
      // lab7.runReaction(lab1, lab2);
      // lab8.runReaction(lab1, lab2);
      // lab9.runReaction(lab1, lab2);
      // lab10.runReaction(lab1, lab2);
      //
      // let labMin = Math.min(lab1MineralAmount,lab2MineralAmount,lab3MineralAmount,lab4MineralAmount,lab5MineralAmount,lab6MineralAmount,lab7MineralAmount,lab8MineralAmount,lab9MineralAmount,lab10MineralAmount);
      // if (creep.ticksToLive < 50 && _.sum(creep.carry) === 0) {
      //     creep.suicide()
      // }

      //LAB CODE
      let room = creep.room.name;

      //MINERALS
      let possbileReactions = [RESOURCE_HYDROXIDE,RESOURCE_ZYNTHIUM_KEANITE,RESOURCE_UTRIUM_LEMERGITE,RESOURCE_GHODIUM,
        RESOURCE_UTRIUM_HYDRIDE,RESOURCE_UTRIUM_OXIDE,RESOURCE_KEANIUM_HYDRIDE,RESOURCE_KEANIUM_OXIDE,RESOURCE_LEMERGIUM_HYDRIDE,RESOURCE_LEMERGIUM_OXIDE,RESOURCE_ZYNTHIUM_HYDRIDE,RESOURCE_ZYNTHIUM_OXIDE,RESOURCE_GHODIUM_HYDRIDE,RESOURCE_GHODIUM_OXIDE,
        RESOURCE_UTRIUM_ACID,RESOURCE_UTRIUM_ALKALIDE,RESOURCE_KEANIUM_ACID,RESOURCE_KEANIUM_ALKALIDE,RESOURCE_LEMERGIUM_ACID,RESOURCE_LEMERGIUM_ALKALIDE,RESOURCE_ZYNTHIUM_ACID,RESOURCE_ZYNTHIUM_ALKALIDE,RESOURCE_GHODIUM_ACID,RESOURCE_GHODIUM_ALKALIDE,
        RESOURCE_CATALYZED_UTRIUM_ACID,RESOURCE_CATALYZED_UTRIUM_ALKALIDE,RESOURCE_CATALYZED_KEANIUM_ACID,RESOURCE_CATALYZED_KEANIUM_ALKALIDE,RESOURCE_CATALYZED_LEMERGIUM_ACID,RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,RESOURCE_CATALYZED_ZYNTHIUM_ACID,RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_GHODIUM_ALKALIDE];

      //VARIABLES

      function resourceInStorage(resource) {
        room = creep.room.name;
        return Game.rooms[room].storage.store.getUsedCapacity(resource);
      }

      function resourceInTerminal(resource) {
        room = creep.room.name;
        return Game.rooms[room].terminal.store.getUsedCapacity(resource);
      }

      function resourcesInLabs(labId) {
        let lab = Game.getObjectById(labId);
        let mineralAmount = lab.mineralAmount;
        return mineralAmount
      }

      let resource;
      let resource2;
      let resource3;

      let flag = Memory.flags[room];

      let needed = 10000;
      let base = 5000;
      let flagNeededBase = 10000;

      let tier1 = 5000;
      let flagNeededTier1 = 10000;

      let tier2 = 5000;
      let flagNeededTier2 = 10000;

      let tier3 = 10000;
      let flagNeededTier3 = 25000;

      let x;

      if (Game.time % 2500 == 0) {
        flag.reactionsNeeded = [];

        for (let i = 0;i < possbileReactions.length; i++) {
          if (resourceInStorage(possbileReactions[i]) < needed) {
            flag.reactionsNeeded.push(possbileReactions[i]);
          }
        }
      }

      creep.memory.test = RESOURCES_ALL

      console.log(RESOURCES_ALL.length)


      if (flag.reactionsNeeded.length > 99999999 && creepMemory.labsFinal == 10) {

        if (resourceInStorage(flag.labs[0] > needed)) {
            flag.labs.splice(0,1);
        }
        else {
          resource = "";
          resource2 = "";
          resource3 = "";

          //WRONG CREEP
          if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0 && creep.carry[resource2] === 0) {
              for (x of RESOURCES_ALL) {
                  if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                      creep.travelTo(creep.room.storage)
                  }
                  if (creep.transfer(creep.room.storage, x) === 0) {break}
              }
          }

          else if (_.sum(creep.carry) > 0 && creep.carry[resource]  === creep.carryCapacity && labNeedsResource1(resource) === false) {
              for (x of RESOURCES_ALL) {
                  if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                      creep.travelTo(creep.room.storage)
                  }
                  if (creep.transfer(creep.room.storage, x) === 0) {break}
              }
          }

          else if (creep.carry[resource2] > 0 && creep.carry[resource2]  === creep.carryCapacity && labNeedsResource2(resource2) === false) {
              for (x of RESOURCES_ALL) {
                  if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                      creep.travelTo(creep.room.storage)
                  }
                  if (creep.transfer(creep.room.storage, x) === 0) {break}
              }
          }

          else if (_.sum(creep.carry) > 0 && _.sum(creep.carry) < creep.carryCapacity) {
              for (x of RESOURCES_ALL) {
                  if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                      creep.travelTo(creep.room.storage)
                  }
                  if (creep.transfer(creep.room.storage, x) === 0) {break}
              }
          }

          else if (creep.carry[resource2] > 0 && creep.carry[resource2]  < creep.carryCapacity) {
              for (x of RESOURCES_ALL) {
                  if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                      creep.travelTo(creep.room.storage)
                  }
                  if (creep.transfer(creep.room.storage, x) === 0) {break}
              }
          }

          //WRONG LAB

          else if (lab1.mineralType !== resource && lab1.mineralType !== undefined) {
              if (creep.withdraw(lab1, lab1.mineralType) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab1)
              }
          }

          else if (lab2.mineralType !== resource2 && lab2.mineralType !== undefined) {
              if (creep.withdraw(lab2, lab2.mineralType) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab2)
              }
          }

          else if (lab3.mineralType !== resource3 && lab3.mineralType !== undefined) {
              if (creep.withdraw(lab3, lab3.mineralType) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab3)
              }
          }

          else if (lab4.mineralType !== resource3 && lab4.mineralType !== undefined) {
              if (creep.withdraw(lab4, lab4.mineralType) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab4)
              }
          }

          else if (lab5.mineralType !== resource3 && lab5.mineralType !== undefined) {
              if (creep.withdraw(lab5, lab5.mineralType) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab5)
              }
          }

          else if (lab6.mineralType !== resource3 && lab6.mineralType !== undefined) {
              if (creep.withdraw(lab6, lab6.mineralType) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab6)
              }
          }

          else if (lab7.mineralType !== resource3 && lab7.mineralType !== undefined) {
              if (creep.withdraw(lab7, lab7.mineralType) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab7)
              }
          }

          else if (lab8.mineralType !== resource3 && lab8.mineralType !== undefined) {
              if (creep.withdraw(lab8, lab8.mineralType) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab8)
              }
          }

          else if (lab9.mineralType !== resource3 && lab9.mineralType !== undefined) {
              if (creep.withdraw(lab9, lab9.mineralType) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab9)
              }
          }

          else if (lab10.mineralType !== resource3 && lab10.mineralType !== undefined) {
              if (creep.withdraw(lab10, lab10.mineralType) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab10)
              }
          }

          //REACTION LABS

          else if (lab3.mineralType === resource3 && lab3MineralAmount > creep.carryCapacity) {
              if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab3)
              }
          }

          else if (lab4.mineralType === resource3 && lab4MineralAmount > creep.carryCapacity) {
              if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab4)
              }
          }

          else if (lab5.mineralType === resource3 && lab5MineralAmount > creep.carryCapacity) {
              if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab5)
              }
          }

          else if (lab6.mineralType === resource3 && lab6MineralAmount > creep.carryCapacity) {
              if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab6)
              }
          }

          else if (lab7.mineralType === resource3 && lab7MineralAmount > creep.carryCapacity) {
              if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab7)
              }
          }

          else if (lab8.mineralType === resource3 && lab8MineralAmount > creep.carryCapacity) {
              if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab8)
              }
          }

          else if (lab9.mineralType === resource3 && lab9MineralAmount > creep.carryCapacity) {
              if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab9)
              }
          }

          else if (lab10.mineralType === resource3 && lab10MineralAmount > creep.carryCapacity) {
              if (creep.withdraw(lab10, resource3) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab10)
              }
          }

          //EMPTY

          else if (creep.carry[resource] === 0 && _.sum(creep.carry) === 0 && lab1.mineralType === undefined && lab1MineralAmount < 50) {
              if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(creep.room.storage)
              }
          }

          else if (creep.carry[resource] === creep.carryCapacity) {
              if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab1)
              }
          }

          else if (creep.carry[resource2] === 0 && _.sum(creep.carry) === 0 && lab2.mineralType === undefined && lab2MineralAmount < 50) {
              if (creep.withdraw(creep.room.storage, resource2) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(creep.room.storage)
              }
          }

          else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === undefined) {
              if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                  creep.travelTo(lab2)
              }
          }

          //FILLING

          else if (lab1.mineralType === resource && labNeedsResource1(resource)) {
              if (labNeedsResource1(resource) && creep.carry[resource] === 0 && _.sum(creep.carry) === 0) {
                  if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
                      creep.travelTo(creep.room.storage)
                  }
              }

              if (labNeedsResource1(resource) && creep.carry[resource] === creep.carryCapacity) {
                  if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
                      creep.travelTo(lab1)
                  }
              }
          }

          else if (lab2.mineralType === resource2 && labNeedsResource2(resource2)) {
              if (labNeedsResource2(resource2) && creep.carry[resource2] === 0 && _.sum(creep.carry) === 0) {
                  if (creep.withdraw(creep.room.storage, resource2) === ERR_NOT_IN_RANGE) {
                      creep.travelTo(creep.room.storage)
                  }
              }

              if (labNeedsResource2(resource2) && creep.carry[resource2] === creep.carryCapacity) {
                  if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
                      creep.travelTo(lab2)
                      }
                  }
              }
          }
      }
  }
};
