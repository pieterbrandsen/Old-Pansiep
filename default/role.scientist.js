module.exports = {
  run: function (creep) {

    let start = Game.cpu.getUsed();
    let flag = Memory.flags[creep.room.name];

    let creepMemory = creep.memory;
    if (!creep.memory.labs) {
        creep.memory.labs = [];
    }
    if (!creep.memory.labsFinal) {
        creep.memory.labsFinal = [];
    }
    if (!creep.memory.currentReaction) {
        creep.memory.currentReaction = [];
    }

    if (!flag.reactionsNeeded) {
        flag.reactionsNeeded = [];
    }

    if (creep.ticksToLive < 50 && _.sum(creep.carry) === 0) {
        creep.suicide()
    }


    //VARIABLES //
    let room = creep.room.name;

    let resource;
    let resource2;
    let resource3;


    // let needed = 10000;
    let needed = 2500;

    let x;


    // POSSIBLE REACTIONS //
    let possbileReactions = [RESOURCE_HYDROXIDE,RESOURCE_ZYNTHIUM_KEANITE,RESOURCE_UTRIUM_LEMERGITE,RESOURCE_GHODIUM,
      RESOURCE_UTRIUM_HYDRIDE,RESOURCE_UTRIUM_OXIDE,RESOURCE_KEANIUM_HYDRIDE,RESOURCE_KEANIUM_OXIDE,RESOURCE_LEMERGIUM_HYDRIDE,RESOURCE_LEMERGIUM_OXIDE,RESOURCE_ZYNTHIUM_HYDRIDE,RESOURCE_ZYNTHIUM_OXIDE,RESOURCE_GHODIUM_HYDRIDE,RESOURCE_GHODIUM_OXIDE,
      RESOURCE_UTRIUM_ACID,RESOURCE_UTRIUM_ALKALIDE,RESOURCE_KEANIUM_ACID,RESOURCE_KEANIUM_ALKALIDE,RESOURCE_LEMERGIUM_ACID,RESOURCE_LEMERGIUM_ALKALIDE,RESOURCE_ZYNTHIUM_ACID,RESOURCE_ZYNTHIUM_ALKALIDE,RESOURCE_GHODIUM_ACID,RESOURCE_GHODIUM_ALKALIDE,
      RESOURCE_CATALYZED_UTRIUM_ACID,RESOURCE_CATALYZED_UTRIUM_ALKALIDE,RESOURCE_CATALYZED_KEANIUM_ACID,RESOURCE_CATALYZED_KEANIUM_ALKALIDE,RESOURCE_CATALYZED_LEMERGIUM_ACID,RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,RESOURCE_CATALYZED_ZYNTHIUM_ACID,RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,RESOURCE_CATALYZED_GHODIUM_ACID,RESOURCE_CATALYZED_GHODIUM_ALKALIDE];


    // FUNCTIONS //
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
      let mineralAmount = lab.store[lab.mineralType];

      if (mineralAmount == undefined) {
        return 0;
      }
      else {
        return mineralAmount;
      }
    }



    // MEMORY //
    if (_.size(flag.reactions) == 0) {
      const ingredientsForCompound = {};
      for (let ingredient1 in REACTIONS) {
        const map2 = REACTIONS[ingredient1];
        for (let ingredient2 in map2) {
            const compound = map2[ingredient2];
            const ingredients = [ingredient1, ingredient2];
            ingredientsForCompound[compound] = ingredients;
        }
      };
      flag.reactions = ingredientsForCompound;
    }


    if (Game.time % 1000 == 0 || (flag.reactionsNeeded.length == 0 && Game.time % 100 == 0)) {
      flag.reactionsNeeded = [];
      for (let i = 0;i < possbileReactions.length; i++) {
        if (resourceInStorage(possbileReactions[i]) < needed) {
          flag.reactionsNeeded.push(possbileReactions[i]);
        }
      }
    }


    let labs = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (s) => (s.structureType === STRUCTURE_LAB)
    });

    if (_.size(creepMemory.labs) < 10) {
      let array = [];
      labs.forEach(function(lab) {
        array.push(lab.id)
      });
      creepMemory.labs = array;
    }


    let inputLabs = [];
    let outputLabs = [];
    if (creepMemory.labsFinal.length < 10 && labs.length == 10)
    {
      for (let lab of labs)
      {
        if (lab.pos.findInRange(creep.room.labs, 2).length == 10 && inputLabs.length < 2)
        {
          inputLabs.push(lab.id);
        }
        // else if (lab.pos.findInRange(creep.room.labs, 2).length < 10 && outputLabs.length < 8) {
        //   outputLabs.push(lab.id)
        // }
        else {outputLabs.push(lab.id)}

        if (inputLabs.length == 2 && outputLabs.length == 8) {
          break;
        }
      }
    }

    if (creepMemory.labsFinal.length < 10) {
      let finalArray = inputLabs.concat(outputLabs)
      creepMemory.labsFinal = finalArray;
    }


    if (flag.reactionsNeeded.length > 0 && creepMemory.labsFinal.length == 10) {
      if (creepMemory.currentReaction.length == 0) {
        for (let i = 0; i< Object.keys(flag.reactions).length;i++) {
          if (Object.keys(flag.reactions)[i] == flag.reactionsNeeded[0]) {
            creepMemory.currentReaction[0] = Object.keys(flag.reactions)[i]
            creepMemory.currentReaction[1] = flag.reactions[flag.reactionsNeeded[0]][0]
            creepMemory.currentReaction[2] = flag.reactions[flag.reactionsNeeded[0]][1]
          }
        }
      }

      if (resourceInStorage(flag.reactionsNeeded[0]) > needed) {
        creepMemory.currentReaction = [];
        flag.reactionsNeeded.splice(0,1);
      }
      else {
        resource = creepMemory.currentReaction[1];
        resource2 = creepMemory.currentReaction[2];
        resource3 = creepMemory.currentReaction[0];

        let lab1 = Game.getObjectById(creepMemory.labsFinal[0]);
        let lab2 = Game.getObjectById(creepMemory.labsFinal[1]);
        let lab3 = Game.getObjectById(creepMemory.labsFinal[2]);
        let lab4 = Game.getObjectById(creepMemory.labsFinal[3]);
        let lab5 = Game.getObjectById(creepMemory.labsFinal[4]);
        let lab6 = Game.getObjectById(creepMemory.labsFinal[5]);
        let lab7 = Game.getObjectById(creepMemory.labsFinal[6]);
        let lab8 = Game.getObjectById(creepMemory.labsFinal[7]);
        let lab9 = Game.getObjectById(creepMemory.labsFinal[8]);
        let lab10 = Game.getObjectById(creepMemory.labsFinal[9]);

        if (Game.time % 5 == 0) {
          lab3.runReaction(lab1, lab2);
          lab4.runReaction(lab1, lab2);
          lab5.runReaction(lab1, lab2);
          lab6.runReaction(lab1, lab2);
          lab7.runReaction(lab1, lab2);
          lab8.runReaction(lab1, lab2);
          lab9.runReaction(lab1, lab2);
          lab10.runReaction(lab1, lab2);
        }


        // WRONG CREEP
        if (_.sum(creep.carry) > 0 && creep.carry[resource]  === 0 && creep.carry[resource2] === 0) {
          for (x of RESOURCES_ALL) {
            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.storage)
            }
            if (creep.transfer(creep.room.storage, x) === 0) {
              break;
            }
          }
        }

        else if (_.sum(creep.carry) > 0 && creep.carry[resource]  === creep.carryCapacity && resourcesInLabs(lab1.id) > 500) {
          for (x of RESOURCES_ALL) {
            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
                creep.travelTo(creep.room.storage)
            }
            if (creep.transfer(creep.room.storage, x) === 0) {
              break
            }
          }
        }

        else if (creep.carry[resource2] > 0 && creep.carry[resource2]  === creep.carryCapacity && resourcesInLabs(lab2.id) > 500) {
          for (x of RESOURCES_ALL) {
            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
              creep.travelTo(creep.room.storage)
            }
            if (creep.transfer(creep.room.storage, x) === 0) {
              break
            }
          }
        }

        else if (_.sum(creep.carry) > 0 && _.sum(creep.carry) < creep.carryCapacity) {
          for (x of RESOURCES_ALL) {
            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
              creep.travelTo(creep.room.storage)
            }
            if (creep.transfer(creep.room.storage, x) === 0) {
              break;
            }
          }
        }

        else if (creep.carry[resource2] > 0 && creep.carry[resource2]  < creep.carryCapacity) {
          for (x of RESOURCES_ALL) {
            if (creep.transfer(creep.room.storage, x) === ERR_NOT_IN_RANGE) {
              creep.travelTo(creep.room.storage)
            }
            if (creep.transfer(creep.room.storage, x) === 0) {
              break
            }
          }
        }

        //FILLING

        else if (lab1.mineralType === resource && resourcesInLabs(lab1.id) < 500) {
          if (creep.carry[resource] === 0 && _.sum(creep.carry) === 0) {
            if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
              creep.travelTo(creep.room.storage)
            }
          }

          if (creep.carry[resource] === creep.carryCapacity) {
            if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
              creep.travelTo(lab1)
            }
          }
        }

        else if (lab2.mineralType === resource2 && resourcesInLabs(lab2.id) < 500) {
          if (creep.carry[resource2] === 0 && _.sum(creep.carry) === 0) {
            if (creep.withdraw(creep.room.storage, resource2) === ERR_NOT_IN_RANGE) {
              creep.travelTo(creep.room.storage)
            }
          }

          if (creep.carry[resource2] === creep.carryCapacity) {
            if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
              creep.travelTo(lab2)
            }
          }
        }

        // WRONG LAB

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

        // REACTION LABS

        else if (lab3.mineralType === resource3 && resourcesInLabs(lab3.id) > creep.carryCapacity) {
          if (creep.withdraw(lab3, resource3) === ERR_NOT_IN_RANGE) {
            creep.travelTo(lab3)
          }
        }

        else if (lab4.mineralType === resource3 && resourcesInLabs(lab4.id) > creep.carryCapacity) {
          if (creep.withdraw(lab4, resource3) === ERR_NOT_IN_RANGE) {
            creep.travelTo(lab4)
          }
        }

        else if (lab5.mineralType === resource3 && resourcesInLabs(lab5.id) > creep.carryCapacity) {
          if (creep.withdraw(lab5, resource3) === ERR_NOT_IN_RANGE) {
            creep.travelTo(lab5)
          }
        }

        else if (lab6.mineralType === resource3 && resourcesInLabs(lab6.id) > creep.carryCapacity) {
          if (creep.withdraw(lab6, resource3) === ERR_NOT_IN_RANGE) {
            creep.travelTo(lab6)
          }
        }

        else if (lab7.mineralType === resource3 && resourcesInLabs(lab7.id) > creep.carryCapacity) {
          if (creep.withdraw(lab7, resource3) === ERR_NOT_IN_RANGE) {
            creep.travelTo(lab7)
          }
        }

        else if (lab8.mineralType === resource3 && resourcesInLabs(lab8.id) > creep.carryCapacity) {
          if (creep.withdraw(lab8, resource3) === ERR_NOT_IN_RANGE) {
            creep.travelTo(lab8)
          }
        }

        else if (lab9.mineralType === resource3 && resourcesInLabs(lab9.id) > creep.carryCapacity) {
          if (creep.withdraw(lab9, resource3) === ERR_NOT_IN_RANGE) {
            creep.travelTo(lab9)
          }
        }

        else if (lab10.mineralType === resource3 && resourcesInLabs(lab10.id) > creep.carryCapacity) {
          if (creep.withdraw(lab10, resource3) === ERR_NOT_IN_RANGE) {
            creep.travelTo(lab10)
          }
        }

        //EMPTY

        else if (creep.carry[resource] === 0 && _.sum(creep.carry) === 0 && lab1.mineralType === undefined && resourcesInLabs(lab1.id) < 250) {
          if (creep.withdraw(creep.room.storage, resource) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.storage)
          }
        }

        else if (creep.carry[resource] === creep.carryCapacity) {
          if (creep.transfer(lab1, resource) === ERR_NOT_IN_RANGE) {
            creep.travelTo(lab1)
          }
        }

        else if (creep.carry[resource2] === 0 && _.sum(creep.carry) === 0 && lab2.mineralType === undefined && resourcesInLabs(lab2.id) < 250) {
          if (creep.withdraw(creep.room.storage, resource2) === ERR_NOT_IN_RANGE) {
            creep.travelTo(creep.room.storage)
          }
        }

        else if (creep.carry[resource2] === creep.carryCapacity && lab2.mineralType === undefined) {
          if (creep.transfer(lab2, resource2) === ERR_NOT_IN_RANGE) {
            creep.travelTo(lab2)
          }
        }
        else {
          if (creep.pos.inRangeTo(creep.room.controller,2) == false) {
            creep.travelTo(creep.room.controller)
          }
        }
      }
    }

    flag.scientistCpu += Game.cpu.getUsed() - start

  }
};
