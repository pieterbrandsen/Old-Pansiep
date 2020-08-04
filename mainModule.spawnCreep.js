module.exports = {
  run: function(roomName) {
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    function getFirstOpenSpawn() {
      // Define Undefined Spawn //
      let spawnId = "";

      // Loop Through All Spawns In Room And Check For Idle Spawn //
      room.spawns.forEach((spawn, i) => {
        if (spawn.spawning == null) {
          // Set Spawn.Id To SpawnId //
          spawnId = spawn.id;
        }
      });

      return spawnId;
    }

    // Get Spawn //
    let spawn = Game.getObjectById(getFirstOpenSpawn());

    // If Spawn Is Defined //
    if (spawn) {
      function resetRoleAndPartCount(roomName) {
        const flagMemory = Memory.flags[roomName];
        // Check If FlagMemory Has RolesCount //
        if (flagMemory.rolesCount) {
          // For Every Item In RolesCount, Reset To Zero //
          Object.keys(flagMemory.rolesCount).forEach((item, i) => {
            flagMemory.rolesCount[item] = 0;
          });
        }

        // Check If FlagMemory Has PartsAmount //
        if (flagMemory.partsAmount) {
          // For Every Item In PartsAmount, Reset To Zero //
          Object.keys(flagMemory.partsAmount).forEach((item, i) => {
            flagMemory.partsAmount[item] = 0;
          });
        }
      }

      function roomNeedsTransferer() {
        // EnergyStorage Is Zero At Start //
        let energyStored = 0;

        // Loop Through All Containers And Count Energy In Container If Its Not The Controller Storage //
        room.containers.forEach((container, i) => {
          if (container.id !== flagMemory.controllerStorage || !flagMemory.controllerStorage) {
            energyStored += container.store.getUsedCapacity(RESOURCE_ENERGY);
          }
        });
        // Loop Through All Links And Count Energy In Link If Its Not The Controller Storage //
        room.links.forEach((link, i) => {
          if (flagMemory.links) {
            if (flagMemory.links.linkTo1) {
              if (link.id !== flagMemory.controllerStorage || !flagMemory.controllerStorage) {
                energyStored += link.store.getUsedCapacity(RESOURCE_ENERGY);
              }
            }
          }
        });

        // If There Is A Terminal In Room, Add EnergyCount
        if (room.terminal !== undefined)
        energyStored += room.terminal.store.getUsedCapacity(RESOURCE_ENERGY);

        // If There Is A Storage In Room, Add EnergyCount
        if (room.storage !== undefined)
        energyStored += room.storage.store.getUsedCapacity(RESOURCE_ENERGY);

        // If Energy In Storage Is High Enough For A Transferer To Work, Return True //
        if (energyStored > 1000)
        return true;
        else return false;
      }

      function spawnCreep(spawn,role,targetRoom = roomName,flagName = roomName) {
        let name = role + "-" + Math.round(Math.random() * 100);
        let directionsList = [TOP, TOP_RIGHT, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];

        // Check If Room Needs To Spawn In Special Direction //
        // This Is Because Of Top Right Of Spawn Is Reserved For Transferer
        if (room.terminal)
        if (room.controller.level >= 6 && spawn.id == flagMemory.roomManager.headSpawn) {
          if (role == "transfererLiTe")
          directionsList = [TOP_RIGHT];
          else
          directionsList = [BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];
        }


        return spawn.spawnCreep(
          getCreepSize(role),
          name,
          {
            memory: {
              role: role,
              working: "withdraw",
              spawnRoom: roomName,
              targetRoom: targetRoom,
              flagName: flagName
            }, directions: directionsList
          }
        )
      }

      function getCreepSize(role) {
        let energyAvailable = flagMemory.totalEnergyAvailable;
        let energyCapacity = flagMemory.totalEnergyCapacity;
        let parts = [];
        let energyCost;
        let partAmount;

        switch (role) {
          case "harvester-0":
          case "harvester-1":
          case "harvesterLD-0":
          case "harvesterLD-1":
          case "harvesterLD-2":
          case "harvesterLD-3":
            // Run CreepSize Code, Add The List Of Parts As Much As Possible //
            energyCost = 300;
            partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < partAmount && i < 4; i++)
            parts.push(WORK,WORK,CARRY,MOVE);
            break;
          case "transferer":
          case "transfererLD":
            // Run Role Code, Add Role To RoleCount //
            energyCost = 100;
            partAmount = Math.floor(energyAvailable/energyCost);
            // If Transferer Is A InRoom Transferer, Dont Make It To Large //
            if (role == "transfer") {
              if (partAmount > 10)
              partAmount = 10;
            }
            for (let i = 0; i < partAmount; i++)
            parts.push(CARRY,MOVE);
            break;
          case "transfererLiTe":
            // Run Role Code, Add Role To RoleCount //
            energyCost = 100;
            partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < partAmount; i++)
            parts.push(CARRY,MOVE);
            break;
          case "builder":
          case "builderLD":
            // Run Role Code, Add Role To RoleCount //
            energyCost = 200;
            partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < partAmount; i++)
            parts.push(WORK,CARRY,MOVE);
            break;
          case "upgrader":
            // Run Role Code, Add Role To RoleCount //
            energyCost = 300;
            partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < partAmount; i++)
            parts.push(WORK,WORK,CARRY,MOVE);
            break;
          case "repairer":
            // Run Role Code, Add Role To RoleCount //
            energyCost = 200;
            partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < partAmount; i++)
            parts.push(WORK,CARRY,MOVE);
            break;
          case "extractor":
            // Run Role Code, Add Role To RoleCount //
            energyCost = 300;
            partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < partAmount; i++)
            parts.push(WORK,WORK,CARRY,MOVE);
            break;
          case "claimer":
          case "reserverLD":
            // Run Role Code, Add Role To RoleCount //
            energyCost = 650;
            partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < partAmount; i++)
            parts.push(CLAIM,MOVE);
            break;
          case "attacker":
            // Run Role Code, Add Role To RoleCount //
            energyCost = 190;
            partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < partAmount; i++)
            parts.push(TOUGH,ATTACK,MOVE,MOVE);
            break;
          case "ruinWithdrawer":
            // Run Role Code, Add Role To RoleCount //
            energyCost = 150;
            partAmount = Math.floor(energyAvailable/energyCost);
            for (let i = 0; i < partAmount; i++)
            parts.push(CARRY,CARRY,MOVE);
            break;
          default:
            console.log(`room ${roomName} is missing a role. Please add role: ${role} to its list.`);
            break;
        }

        // Return Parts For The Creep //
        return parts;
      }


      function spawnManager() {
        if (canCreepSpawn("attacker"))
        spawnCreep(spawn,"attacker");
        else if (canCreepSpawn("transferer"))
        spawnCreep(spawn,"transferer");
        else if (canCreepSpawn("harvester-0"))
        spawnCreep(spawn,"harvester-0");
        else if (canCreepSpawn("harvester-1"))
        spawnCreep(spawn,"harvester-1");
        else if (canCreepSpawn("builder"))
        spawnCreep(spawn,"builder");
        else if (canCreepSpawn("transfererLiTe"))
        spawnCreep(Game.getObjectById(flagMemory.roomManager.headSpawn),"transfererLiTe");
        else if (canCreepSpawn("upgrader"))
        spawnCreep(spawn,"upgrader");
        else if (canCreepSpawn("repairer"))
        spawnCreep(spawn,"repairer",roomName);
        // else if (canCreepSpawn("extractor"))
        // spawnCreep(spawn,"extractor");
        else if (canCreepSpawn("claimer"))
        spawnCreep(spawn,"claimer",roomName);
        // else if (canCreepSpawn("ruinWithdrawer"))
        // spawnCreep(spawn,"ruinWithdrawer",roomName);
        else {
          getAttackRooms();
          if (room.controller.level >= 7) {
            getRemotes();
          }

          resetRoleAndPartCount(roomName);
        }
      }

      function canCreepSpawn(role) {
        let result = false;
        if (flagMemory.rolesCount && flagMemory.partsAmount) {
          switch(role) {
            case "transferer":
            if (((flagMemory.partsAmount["transferer-CARRY"] < 20 && room.containers.length == 0) || (flagMemory.partsAmount["transferer-CARRY"] < flagMemory.sources.length * 20 && room.containers.length > 0)) && roomNeedsTransferer()) {
              if (flagMemory.rolesCount["transferer"] < 6) {
                result = true;
              }
            }
            break;
            case "transfererLiTe":
            if (flagMemory.rolesCount["transfererLiTe"] < 1 && flagMemory.links.linkTo1 !== undefined && room.storage && room.terminal) {
              if (Game.getObjectById(flagMemory.roomManager.headSpawn) !== null) {
                if (flagMemory.links.linkTo2.length > 0) {
                  result = true;
                }
              }
            }
            break;
            case "harvester-0":
            if (flagMemory.partsAmount["harvester-0-WORK"] < 6) {
              if (flagMemory.sources[0] !== undefined) {
                if (flagMemory.sources[0].openSpots > flagMemory.partsAmount["harvester-0-WORK"]) {
                  result = true;
                }
              }
            }
            break;
            case "harvester-1":
            if (flagMemory.partsAmount["harvester-1-WORK"] < 6) {
              if (flagMemory.sources[1] !== undefined) {
                if (flagMemory.sources[1].openSpots > flagMemory.partsAmount["harvester-1-WORK"]) {
                  result = true;
                }
              }
            }
            break;
            case "builder":
            if (flagMemory.rolesCount["builder"] < 8 && flagMemory.constructionSitesAmount > 0 && roomNeedsTransferer()) {
              if (flagMemory.partsAmount["builder-WORK"] < (flagMemory.partsAmount["harvester-0-WORK"] * flagMemory.sources.length) / 2) {
                result = true;
              }
            }
            break;
            case "upgrader":
            if (flagMemory.partsAmount["upgrader-WORK"] < flagMemory.sources.length*4 && flagMemory.constructionSitesAmount == 0 && !Game.flags["builderLD"+roomName]) {
              if (flagMemory.rolesCount["upgrader"] < 4) {
                result = true;
              }
            }
            break;
            case "repairer":
            if (flagMemory.rolesCount["repairer"] < 2 && room.towers.length == 0) {
              result = true;
            }
            break;
            case "extractor":
            if (flagMemory.rolesCount["extractor"] < 1 && flagMemory.mineralAmount > 0 && room.controller.level >= 6) {
              result = true;
            }
            break;
            case "claimer":
            if (flagMemory.rolesCount["claimer"] < 3 && Game.flags["claim"]) {
              if (Memory.flags["claim"]) {
                if (roomName == Memory.flags["claim"].spawnRoom) {
                  result = true;
                }
              }
              else {
                Memory.flags["claim"] = {};
                Memory.flags["claim"].spawnRoom = "";
                Memory.flags["claim"].claimRoom = "";
                console.log("Claim flag is missing memory!")
              }
            }
            break;
            case "ruinWithdrawer":
            break;
            case "claimer":
            if (Memory.flags["claim"])
            if (roomName == Memory.flags["claim"].spawnRoom)
            result = true;
            break;
            default:
            result = false;
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
            if (flagMemory.partsAmount["transferer-CARRY"] < 30) {
              if (flagMemory.rolesCount["transferer"] < 6) {
                result = true;
              }
            }
            break;
            case "attacker":
            if (flagMemory.rolesCount["attacker"] < 1) {
              if (Memory.flags[roomName].totalEnergyAvailable > 1600) {
                result = true;
              }
            }
            break;
            case "reserverLD":
            if (flagMemory.rolesCount["reserverLD"] < 1) {
              if (!flagMemory.reserveTicksLeft || flagMemory.reserveTicksLeft < 2000) {
                result = true;
              }
            }
            break;
            case "harvesterLD-0":
            if (flagMemory.sourceAmount > 0) {
              if (flagMemory.rolesCount["harvestrerLD-0"] < 1) {
                result = true;
              }
            }
            break;
            case "harvesterLD-1":
            if (flagMemory.sourceAmount > 1) {
              if (flagMemory.rolesCount["harvesterLD-1"] < 1) {
                result = true;
              }
            }
            break;
            case "harvesterLD-2":
            if (flagMemory.sourceAmount > 2) {
              if (flagMemory.rolesCount["harvesterLD-2"] < 1) {
                result = true;
              }
            }
            break;
            case "harvesterLD-3":
            if (flagMemory.sourceAmount > 3) {
              if (flagMemory.rolesCount["harvesterLD-3"] < 1) {
                result = true;
              }
            }
            break;
            case "transfererLD":
            if (flagMemory.sourceAmount > 0) {
              if (flagMemory.rolesCount["transfererLD"] < flagMemory.sourceAmount) {
                result = true;
              }
            }
            break;
            case "builderLD":
            if (flagMemory.rolesCount["builderLD"] < 4 && Game.flags["builderLD" + roomName]) {
              result = true;
            }
            break;
            default:
            break;
          }

          return result;
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


              if (Game.rooms[flagMemory.targetRoom].controller.reservation)
              flagMemory.reserveTicksLeft = Game.rooms[flagMemory.targetRoom].controller.reservation.ticksToEnd;

              if (canRemoteCreepSpawn(flagMemory,"transferer"))
              spawnCreep(spawn,"transferer");
              else if (canRemoteCreepSpawn(flagMemory,"transfererLD"))
              spawnCreep(spawn,"transfererLD",flagMemory.targetRoom,flag.name);
              else if (canRemoteCreepSpawn(flagMemory,"reserverLD"))
              spawnCreep(spawn,"reserverLD",flagMemory.targetRoom,flag.name);
              else if (canRemoteCreepSpawn(flagMemory,"harvesterLD-0"))
              spawnCreep(spawn,"harvesterLD-0",flagMemory.targetRoom,flag.name);
              else if (canRemoteCreepSpawn(flagMemory,"harvesterLD-1"))
              spawnCreep(spawn,"harvesterLD-1",flagMemory.targetRoom,flag.name);
              else if (canRemoteCreepSpawn(flagMemory,"harvesterLD-2"))
              spawnCreep(spawn,"harvesterLD-2",flagMemory.targetRoom,flag.name);
              else if (canRemoteCreepSpawn(flagMemory,"harvesterLD-3"))
              spawnCreep(spawn,"harvesterLD-3",flagMemory.targetRoom,flag.name);
              else if (canRemoteCreepSpawn(flagMemory,"transfererLD"))
              spawnCreep(spawn,"transfererLD",flagMemory.targetRoom,flag.name);
              else if (canCreepSpawn("builderLD"))
              spawnCreep(spawn,"builderLD",roomName,flagMemory.targetRoom,flag.name);

              resetRoleAndPartCount(flag.name);
            }
          }
        }
      }

      function checkIfAttackMemoryIsSetup(flag) {
        if (!Memory.flags[flag.name])
        Memory.flags[flag.name] = {};
        else {
          const flagMemory = Memory.flags[flag.name];
          if (flagMemory.targetRoom)
          return true;
          else
          console.log(`The flag ${flag.name} is missing the targetRoom`)
        }
      }

      function getAttackRooms() {
        for (let i = 0;i < 10;i++) {
          const flag = Game.flags[`attack-${i}-${roomName}`];
          if (flag) {
            if (checkIfAttackMemoryIsSetup(flag)) {
              const flagMemory = Memory.flags[flag.name];


              if (canRemoteCreepSpawn(flagMemory,"attacker"))
              spawnCreep(spawn,"attacker",flagMemory.targetRoom);
            }
          }
        }
      }

      spawnManager();
    }
  }
};
