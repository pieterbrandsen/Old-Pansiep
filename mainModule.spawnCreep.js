module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    let spawn = getFirstOpenSpawn();

    function getFirstOpenSpawn() {
      let freeSpawns = room.find(FIND_MY_SPAWNS, {
        filter: (structure) => {
          return (structure.spawning == null);
        }
      });

      if (freeSpawns !== undefined) {
        if (freeSpawns.length > 0)
        return freeSpawns[0];
        else return null;
      }
      else return null;
    }

    function roomNeedsTransferer() {
      let containerAmount = room.containers.length;
      let linkAmount = room.links.length;
      let energyStored = 0;

      if (containerAmount > 0) {
        room.containers.forEach((item, i) => {
          if (item.id !== flagMemory.controllerStorage  ) {
            energyStored += item.store.getUsedCapacity(RESOURCE_ENERGY);
          }
        });
      }
      if (room.terminal !== undefined) {
        energyStored += room.terminal.store.getUsedCapacity(RESOURCE_ENERGY);
      }
      if (room.storage !== undefined) {
        energyStored += room.storage.store.getUsedCapacity(RESOURCE_ENERGY);
      }
      if (linkAmount > 0) {
        room.links.forEach((item, i) => {
          if (flagMemory.links) {
            if (flagMemory.links.linkTo1) {
              if (room.links[i].id == flagMemory.links.linkTo1 && room.terminal) {
                energyStored += room.links[i].store.getUsedCapacity(RESOURCE_ENERGY);
              }
            }
          }
        });
      }

      if (energyStored > 1500) {
        return true;
      }
      else return false;
    }

    function spawnCreep(spawn,role,targetRoom,flagName) {
      if (spawn !== null) {
        let name = role + "-" + Math.round(Math.random() * 100);
        if (!targetRoom)
        targetRoom = roomName;
        if (!flagName)
        flagName = roomName;

        let directionsList = [TOP, TOP_RIGHT, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];

        if (room.terminal)
        if (room.controller.level >= 6 && spawn.pos.inRangeTo(room.terminal,2)) {
          if (role.includes("LiTe")) {
            directionsList = [TOP_RIGHT];
          }
          else {
            directionsList = [BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];
          }
        }


        return spawn.spawnCreep(
          getCreepSize(role),
          name,
          {
            memory: {
              working: false,
              role: role,
              spawnRoom: roomName,
              targetRoom: targetRoom,
              flagName: flagName
            }, directions: directionsList
          }
        )
      }
    }

    function getCreepSize(role) {
      let energyAvailable = flagMemory.totalEnergyAvailable;
      let energyCapacity = flagMemory.totalEnergyCapacity;
      let parts = [];

      if (role == "harvester-0" || role == "harvester-1") {
        const energyCost = 300;
        let partAmount = Math.floor(energyAvailable/energyCost);
        if (energyAvailable <= 300) {
          parts.push(WORK);
          parts.push(WORK);
          parts.push(CARRY);
          parts.push(MOVE);
        }
        else {
          for (let i = 0; i < partAmount && i < 3; i++) {
            parts.push(WORK);
            parts.push(WORK);
            parts.push(CARRY);
            parts.push(MOVE);
          }
        }
      }
      else if (role == "transferer") {
        const energyCost = 100;
        let partAmount = Math.floor(energyAvailable/energyCost);
        if (energyAvailable <= 300) {
          parts.push(CARRY);
          parts.push(CARRY);
          parts.push(CARRY);
          parts.push(MOVE);
          parts.push(MOVE);
          parts.push(MOVE);
        }
        else {
          for (let i = 0; i < partAmount; i++) {
            parts.push(CARRY);
            parts.push(MOVE);
          }
        }
      }
      else if (role == "transfererLiTe") {
        const energyCost = 100;
        let partAmount = Math.floor(energyAvailable/energyCost);
        for (let i = 0; i < partAmount && i < 10; i++) {
          parts.push(CARRY);
          parts.push(MOVE);
        }
      }
      else if (role == "upgrader") {
        const energyCost = 300;
        let partAmount = Math.floor(energyAvailable/energyCost);
        for (let i = 0; i < partAmount && i < flagMemory.sources.length*4; i++) {
          parts.push(WORK);
          parts.push(CARRY);
          parts.push(MOVE);
        }
      }
      // else if (role == "extractor") {
      //   const energyCost = 300;
      //   let partAmount = Math.floor(energyAvailable/energyCost);
      //   if (energyAvailable <= 300) {
      //     parts.push(WORK);
      //     parts.push(WORK);
      //     parts.push(CARRY);
      //     parts.push(MOVE);
      //   }
      // }
      else if (role == "builder") {
        const energyCost = 300;
        let partAmount = Math.floor(energyAvailable/energyCost);
        for (let i = 0; i < partAmount && i < 10; i++) {
          parts.push(WORK);
          parts.push(CARRY);
          parts.push(CARRY);
          parts.push(MOVE);
          parts.push(MOVE);
        }
      }
      else if (role == "repairer") {
        const energyCost = 300;
        let partAmount = Math.floor(energyAvailable/energyCost);
        for (let i = 0; i < partAmount && i < 10; i++) {
          parts.push(WORK);
          parts.push(CARRY);
          parts.push(CARRY);
          parts.push(MOVE);
          parts.push(MOVE);
        }
      }
      else if (role == "builderLD") {
        const energyCost = 300;
        let partAmount = Math.floor(energyAvailable/energyCost);
        for (let i = 0; i < partAmount && i < 10; i++) {
          parts.push(WORK);
          parts.push(CARRY);
          parts.push(CARRY);
          parts.push(MOVE);
          parts.push(MOVE);
        }
      }
      else if (role == "pixelFarmer") {
        const energyCost = 50;
        parts.push(MOVE);
      }
      else if (role == "ruinWithdrawer") {
        const energyCost = 200;
        let partAmount = Math.floor(energyAvailable/energyCost);
        for (let i = 0; i < partAmount; i++) {
          parts.push(CARRY);
          parts.push(CARRY);
          parts.push(CARRY);
          parts.push(MOVE);
        }
      }
      else if (role == "reserverLD") {
        const energyCost = 750;
        let partAmount = Math.floor(energyAvailable/energyCost);
        for (let i = 0; i < 2 && partAmount > 1&& i < partAmount; i++) {
          parts.push(CLAIM);
          parts.push(MOVE);
          parts.push(MOVE);
          parts.push(MOVE);
        }
      }
      else if (role.includes("harvesterLD")) {
        const energyCost = 350;
        let partAmount = Math.floor(energyAvailable/energyCost);
        for (let i = 0; i < 4; i++) {
          parts.push(CARRY);
          parts.push(WORK);
          parts.push(WORK);
          parts.push(MOVE);
          parts.push(MOVE);
        }
      }
      else if (role == "transfererLD") {
        const energyCost = 100;
        let partAmount = Math.floor(energyAvailable/energyCost);
        for (let i = 0; i < partAmount && partAmount >= 18 && i < 24; i++) {
          parts.push(CARRY);
          parts.push(MOVE);
        }
      }
      else if (role == "claimer") {
        const energyCost = 650;
        let partAmount = Math.floor(energyAvailable/energyCost);
        for (let i = 0; i < partAmount; i++) {
          parts.push(CLAIM);
          parts.push(MOVE);
        }
        //parts = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,CLAIM];
      }
      else if (role == "attacker") {
        //parts = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK];
        //parts = [TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK];
        parts = [TOUGH,ATTACK,MOVE,MOVE];
        // const energyCost = 200;
        // let partAmount = Math.floor(energyAvailable/energyCost);
        // for (let i = 0; i < partAmount; i++) {
        //   parts.push(RANGED_ATTACK);
        //   parts.push(MOVE);
        // }
      }
      else if (role == "shardUp") { // claimer
        const energyCost = 650;
        let partAmount = Math.floor(energyAvailable/energyCost);
        parts.push(CLAIM);
        parts.push(MOVE);
        //parts = [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL,HEAL,HEAL,CLAIM];
      }
      // else if (role == "shardUp") { // builder
      //   const energyCost = 300;
      //   let partAmount = Math.floor(energyAvailable/energyCost);
      //   for (let i = 0; i < partAmount && i < 10; i++) {
      //     parts.push(WORK);
      //     parts.push(CARRY);
      //     parts.push(CARRY);
      //     parts.push(MOVE);
      //     parts.push(MOVE);
      //   }
      // }


      return parts;
    }

    function getCreepAmount() {
      for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        let role = creep.memory.role;
        const flagMemory = Memory.flags[creep.memory.spawnRoom];

        if (flagMemory) {
          if (!flagMemory.creepAmount) {
            flagMemory.creepAmount = {};
          }
          if (role !== undefined && creep.memory.targetRoom == creep.memory.spawnRoom && flagMemory.creepAmount && creep.memory.spawnRoom == roomName ) {
            if (creep.memory.role == "harvester-0") {
              flagMemory.creepAmount.harvester0Count++;
              flagMemory.creepAmount.harvester0WorkCount += creep.getActiveBodyparts(WORK);

            }
            if (creep.memory.role == "harvester-1") {
              flagMemory.creepAmount.harvester1Count++;
              flagMemory.creepAmount.harvester1WorkCount += creep.getActiveBodyparts(WORK);
            }
            if (creep.memory.role == "transferer") {
              flagMemory.creepAmount.transfererCount++;
              flagMemory.creepAmount.transfererCarryCount += creep.getActiveBodyparts(CARRY);
            }
            if (creep.memory.role == "transfererLiTe") {
              flagMemory.creepAmount.transfererLiTeCount++;
            }
            if (creep.memory.role == "builder") {
              flagMemory.creepAmount.builderCount++;
              flagMemory.creepAmount.builderWorkCount += creep.getActiveBodyparts(WORK);
            }
            if (creep.memory.role == "upgrader") {
              flagMemory.creepAmount.upgraderCount++;
              flagMemory.creepAmount.upgraderWorkCount += creep.getActiveBodyparts(WORK);
            }
            if (creep.memory.role == "extractor") {
              flagMemory.creepAmount.extractorCount++;
            }
            if (creep.memory.role == "repairer") {
              flagMemory.creepAmount.repairerCount++;
            }
            if (creep.memory.role == "claimer") {
              flagMemory.creepAmount.claimerCount++;
            }
            if (creep.memory.role == "attacker") {
              flagMemory.creepAmount.attackerCount++;
            }
            if (creep.memory.role == "builderLD") {
              flagMemory.creepAmount.builderLDCount++;
            }
            if (creep.memory.role == "pixelFarmer") {
              flagMemory.creepAmount.pixelFarmerCount++;
            }
            if (creep.memory.role == "ruinWithdrawer") {
              flagMemory.creepAmount.ruinWithdrawerCount++;
            }
          }
          else if (creep.memory.flagName && creep.memory.targetRoom !== creep.memory.spawnRoom) {
            const flag = Game.flags[creep.memory.flagName];
            const flagMemory = Memory.flags[flag.name];
            if (flagMemory.targetRoom) {
              if (role !== undefined && creep.memory.targetRoom == flagMemory.targetRoom) {
                if (!flagMemory.creepAmount) {
                  flagMemory.creepAmount = {};
                }
                else {
                  if (creep.memory.role == "reserverLD") {
                    flagMemory.creepAmount.reserverLDCount++;
                  }
                  else if (creep.memory.role == "attacker") {
                    flagMemory.creepAmount.attackerCount++;
                  }
                  else if (creep.memory.role == "harvesterLD-0") {
                    flagMemory.creepAmount.harvesterLD0Count++;
                  }
                  else if (creep.memory.role == "harvesterLD-1") {
                    flagMemory.creepAmount.harvesterLD1Count++;
                  }
                  else if (creep.memory.role == "harvesterLD-2") {
                    flagMemory.creepAmount.harvesterLD2Count++;
                  }
                  else if (creep.memory.role == "harvesterLD-3") {
                    flagMemory.creepAmount.harvesterLD3Count++;
                  }
                  else if (creep.memory.role == "transfererLD") {
                    flagMemory.creepAmount.transfererLDCount++;
                  }
                }
              }
            }
          }
        }
      }
    }

    function spawnManager() {
      getCreepAmount();

      // if (canCreepSpawn("attacker")) {
      //   spawnCreep(spawn,"attacker");
      // }
      if (canCreepSpawn("transferer")) {
        spawnCreep(spawn,"transferer");
      }
      else if (canCreepSpawn("harvester-0")) {
        spawnCreep(spawn,"harvester-0");
      }
      else if (canCreepSpawn("harvester-1")) {
        spawnCreep(spawn,"harvester-1");
      }
      else if (canCreepSpawn("builder")) {
        spawnCreep(spawn,"builder");
      }
      else if (canCreepSpawn("transfererLiTe")) {
        spawnCreep(Game.getObjectById(flagMemory.roomManager.headSpawn),"transfererLiTe");
      }
      else if (canCreepSpawn("upgrader")) {
        spawnCreep(spawn,"upgrader");
      }
      else if (canCreepSpawn("repairer")) {
        spawnCreep(spawn,"repairer",roomName);
      }
      // else if (canCreepSpawn("extractor")) {
      //   spawnCreep(spawn,"extractor");
      // }
      else if (canCreepSpawn("claimer")) {
        spawnCreep(spawn,"claimer",roomName);
      }
      else if (canCreepSpawn("builderLD")) {
        spawnCreep(spawn,"builderLD",roomName);
      }
      // else if (canCreepSpawn("pixelFarmer")) {
      //   spawnCreep(spawn,"pixelFarmer",roomName);
      // }
      // else if (canCreepSpawn("ruinWithdrawer")) {
      //   spawnCreep(spawn,"ruinWithdrawer",roomName);
      // }
      // else if (canCreepSpawn("claimer")) {
      //   spawnCreep(spawn,"shardUp",roomName);
      // }
      // else if (canCreepSpawn("shardUp")) {
      //   spawnCreep(spawn,"shardUp",roomName);
      // }
      else {
        getAttackRooms();
        // if (room.controller.level >= 7) {
        //   getRemotes();
        // }
      }

      if (flagMemory.creepAmount !== undefined) {
        flagMemory.creepAmount.harvester0Count = 0;
        flagMemory.creepAmount.harvester0WorkCount = 0;
        flagMemory.creepAmount.harvester1Count = 0;
        flagMemory.creepAmount.harvester1WorkCount = 0;
        flagMemory.creepAmount.transfererCount = 0;
        flagMemory.creepAmount.transfererCarryCount = 0;
        flagMemory.creepAmount.transfererLiTeCount = 0;
        flagMemory.creepAmount.builderCount = 0;
        flagMemory.creepAmount.builderWorkCount = 0;
        flagMemory.creepAmount.upgraderCount = 0;
        flagMemory.creepAmount.upgraderWorkCount = 0;
        flagMemory.creepAmount.repairerCount = 0;
        flagMemory.creepAmount.extractorCount = 0;
        flagMemory.creepAmount.claimerCount = 0;
        flagMemory.creepAmount.builderLDCount = 0;
        flagMemory.creepAmount.builderWorkCount = 0;
        flagMemory.creepAmount.pixelFarmerCount = 0;
        flagMemory.creepAmount.ruinWithdrawerCount = 0;
      }
    }

    function canCreepSpawn(role) {
      let result = false;
      //if (Game.shard.name == "shard0")
      //console.log(`${roomName} - ${role}`)
      if (flagMemory.creepAmount) {
        switch(role) {
          case "transferer":
          if (((flagMemory.creepAmount.transfererCarryCount < flagMemory.sources.length * 15 + 10 && room.containers.length == 0) || (flagMemory.creepAmount.transfererCarryCount < flagMemory.sources.length * 30 && room.containers.length > 0)) && roomNeedsTransferer()) {
            if (flagMemory.creepAmount.transfererCount < 6) {
              result = true;
            }
          }
          break;
          case "transfererLiTe":
          if (flagMemory.creepAmount.transfererLiTeCount < 1 && flagMemory.links.linkTo1 !== undefined && room.storage && room.terminal) {
            if (Game.getObjectById(flagMemory.roomManager.headSpawn) !== null) {
              if (flagMemory.links.linkTo2.length > 0) {
                result = true;
              }
            }
          }
          break;
          case "harvester-0":
          if (flagMemory.creepAmount.harvester0WorkCount < 6) {
            if (flagMemory.sources[0] !== undefined) {
              if (flagMemory.sources[0].openSpots > flagMemory.creepAmount.harvester0Count) {
                result = true;
              }
            }
          }
          break;
          case "harvester-1":
          if (flagMemory.creepAmount.harvester1WorkCount < 6) {
            if (flagMemory.sources[1] !== undefined) {
              if (flagMemory.sources[1].openSpots > flagMemory.creepAmount.harvester1Count) {
                result = true;
              }
            }
          }
          break;
          case "builder":
          if (flagMemory.creepAmount.builderCount < 5 && flagMemory.constructionSitesAmount > 0) {
            if (flagMemory.creepAmount.builderWorkCount < (flagMemory.creepAmount.harvester0WorkCount + flagMemory.creepAmount.harvester0WorkCount) /2) {
              result = true;
            }
          }
          break;
          case "upgrader":
          //console.log(`${flagMemory.creepAmount.upgraderWorkCount} - ${flagMemory.sources.length*4} - ${flagMemory.constructionSitesAmount == 0} - ${!Game.flags["builderLD"+roomName]} - ${roomName}`)
          if (flagMemory.creepAmount.upgraderWorkCount < flagMemory.sources.length*4 && flagMemory.constructionSitesAmount == 0 && !Game.flags["builderLD"+roomName]) {
            if (flagMemory.creepAmount.upgraderCount < 4) {
              result = true;
            }
          }
          break;
          case "repairer":
          if (flagMemory.creepAmount.repairerCount < 2 && room.towers.length == 0) {
            result = true;
          }
          break;
          case "extractor":
          if (flagMemory.creepAmount.extractorCount < 1 && flagMemory.mineralAmount > 0 && room.controller.level >= 6) {
            result = true;
          }
          break;
          case "claimer":
          if (flagMemory.creepAmount.claimerCount < 3 && Game.flags["claim"]) {
            if (roomName == Memory.flags["claim"].spawnRoom) {
              result = true;
            }
          }
          break;
          case "builderLD":
          if (flagMemory.creepAmount.builderLDCount < 4 && Game.flags["builderLD" + roomName]) {
            result = true;
          }
          break;
          case "pixelFarmer":
          if (Game.time % 200 == 0 && roomName == "E42N2") {
            result = true;
          }
          break;
          case "ruinWithdrawer":
          if (flagMemory.creepAmount.ruinWithdrawerCount < 1 && room.storage) {
            result = true;
          }
          break;
          case "claimer":
          if (Memory.flags["claim"])
          if (roomName == Memory.flags["claim"].spawnRoom)
          result = true;
          break;
          // case "shardUp":
          // if (roomName == "E42N2" && Game.flags["testtest"] !== undefined) {
          //   result = true;
          // }
          break;
        }
      }


      return result
    }

    function canRemoteCreepSpawn(flagMemory,role) {
      let result = false;
      if (flagMemory.creepAmount) {
        switch(role) {
          case "transferer":
          if (flagMemory.creepAmount.transfererCarryCount < 40 && roomNeedsTransferer()) {
            if (flagMemory.creepAmount.transfererCount < 6) {
              result = true;
            }
          }
          break;
          case "attacker":
          if (flagMemory.creepAmount.attackerCount < 1) {
            if (Memory.flags[roomName].totalEnergyAvailable > 1600) {
              result = true;
            }
          }
          break;
          case "reserverLD":
          if (flagMemory.creepAmount.reserverLDCount < 1) {
            if (!flagMemory.reserveTicksLeft || flagMemory.reserveTicksLeft < 2000) {
              result = true;
            }
          }
          break;
          case "harvesterLD-0":
          if (flagMemory.sourceAmount > 0) {
            if (flagMemory.creepAmount.harvesterLD0Count < 1) {
              result = true;
            }
          }
          break;
          case "harvesterLD-1":
          if (flagMemory.sourceAmount > 1) {
            if (flagMemory.creepAmount.harvesterLD1Count < 1) {
              result = true;
            }
          }
          break;
          case "harvesterLD-2":
          if (flagMemory.sourceAmount > 2) {
            if (flagMemory.creepAmount.harvesterLD2Count < 1) {
              result = true;
            }
          }
          break;
          case "harvesterLD-3":
          if (flagMemory.sourceAmount > 3) {
            if (flagMemory.creepAmount.harvesterLD3Count < 1) {
              result = true;
            }
          }
          break;
          case "transfererLD":
          if (flagMemory.sourceAmount > 0) {
            if (flagMemory.creepAmount.transfererLDCount < flagMemory.sourceAmount) {
              result = true;
            }
          }
          break;
          default:
          break;
        }
        return result;
      }
      else {
        if (!flagMemory.creepAmount)
        flagMemory.creepAmount = {};

        flagMemory.creepAmount.reserverLDCount = 0;
        flagMemory.creepAmount.harvesterLD0Count = 0;
        flagMemory.creepAmount.harvesterLD1Count = 0;
        flagMemory.creepAmount.harvesterLD2Count = 0;
        flagMemory.creepAmount.harvesterLD3Count = 0;
        flagMemory.creepAmount.attackerCount = 0;
        flagMemory.creepAmount.transfererLDCount = 0;
      }
    }

    function checkIfRemoteMemoryIsSetup(flag) {
      if (!Memory.flags[flag.name]) {
        Memory.flags[flag.name] = {};
      }
      else {
        const flagMemory = Memory.flags[flag.name];
        if (flagMemory.targetRoom) {
          if (flagMemory.sourceAmount) {
            return true;
          }
          else {
            console.log(`The flag in ${flagMemory.targetRoom} is missing the sourceAmount`)
          }
        }
        else {
          console.log(`The flag ${flag.name} is missing the targetRoom`)
        }
      }
    }

    function getRemotes() {
      for (let i = 0;i < 10;i++) {
        const flag = Game.flags["remote-"+ i+"-"+roomName];
        if (flag) {
          if (checkIfRemoteMemoryIsSetup(flag)) {
            const flagMemory = Memory.flags[flag.name];


            if (Game.time % 10 == 0) {
              if (Game.rooms[flagMemory.targetRoom].controller.reservation) {
                flagMemory.reserveTicksLeft = Game.rooms[flagMemory.targetRoom].controller.reservation.ticksToEnd;
              }
            }

            if (canRemoteCreepSpawn(flagMemory,"transferer")) {
              spawnCreep(spawn,"transferer");
            }
            else if (canRemoteCreepSpawn(flagMemory,"transfererLD")) {
              spawnCreep(spawn,"transfererLD",flagMemory.targetRoom,flag.name);
            }
            else if (canRemoteCreepSpawn(flagMemory,"reserverLD")) {
              spawnCreep(spawn,"reserverLD",flagMemory.targetRoom,flag.name);
            }
            else if (canRemoteCreepSpawn(flagMemory,"harvesterLD-0")) {
              spawnCreep(spawn,"harvesterLD-0",flagMemory.targetRoom,flag.name);
            }
            else if (canRemoteCreepSpawn(flagMemory,"harvesterLD-1")) {
              spawnCreep(spawn,"harvesterLD-1",flagMemory.targetRoom,flag.name);
            }
            else if (canRemoteCreepSpawn(flagMemory,"harvesterLD-2")) {
              spawnCreep(spawn,"harvesterLD-2",flagMemory.targetRoom,flag.name);
            }
            else if (canRemoteCreepSpawn(flagMemory,"harvesterLD-3")) {
              spawnCreep(spawn,"harvesterLD-3",flagMemory.targetRoom,flag.name);
            }
            else if (canRemoteCreepSpawn(flagMemory,"transfererLD")) {
              spawnCreep(spawn,"transfererLD",flagMemory.targetRoom,flag.name);
            }
            flagMemory.creepAmount.reserverLDCount = 0;
            flagMemory.creepAmount.harvesterLD0Count = 0;
            flagMemory.creepAmount.harvesterLD1Count = 0;
            flagMemory.creepAmount.harvesterLD2Count = 0;
            flagMemory.creepAmount.harvesterLD3Count = 0;
            flagMemory.creepAmount.transfererLDCount = 0;
          }
        }
      }
    }

    function checkIfAttackMemoryIsSetup(flag) {
      if (!Memory.flags[flag.name]) {
        Memory.flags[flag.name] = {};
      }
      else {
        const flagMemory = Memory.flags[flag.name];
        if (flagMemory.targetRoom) {
          return true;
        }
        else {
          console.log(`The flag ${flag.name} is missing the targetRoom`)
        }
      }
    }

    function getAttackRooms() {
      for (let i = 0;i < 10;i++) {
        const flag = Game.flags[`attack-${i}-${roomName}`];
        if (flag) {
          if (checkIfAttackMemoryIsSetup(flag)) {
            const flagMemory = Memory.flags[flag.name];


            if (canRemoteCreepSpawn(flagMemory,"attacker")) {
              spawnCreep(spawn,"attacker",flagMemory.targetRoom);
            }

            flagMemory.creepAmount.attackerCount = 0;
          }
        }
      }
    }

    spawnManager();
  }
};
