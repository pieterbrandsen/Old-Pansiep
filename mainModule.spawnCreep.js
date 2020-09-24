const getHostileCreepsInRoom = require('miniModule.getHostileCreepsInRoom');
const countCreepsAndParts = require('miniModule.countCreepsAndParts');

module.exports = {
  run: function(roomName) {
    // Get Room Object And FlagMemory //
    const room = Game.rooms[roomName];
    const flagMemory = Memory.flags[roomName];

    // Make A Empty FreeSpawn Array To Add Spawns To //
    let freeSpawnIds = [];

    // This Function Gets All Open Spawns //
    function getOpenSpawns() {
      // For Each Spawn In Room.Spawns //
      room.spawns.forEach((spawn, i) => {
        // If Spawn Is Defined //
        if (spawn) {
          // If Spawn Is Open, Push Spawn Id //
          if (spawn.spawning == null)
          freeSpawnIds.push(spawn.id)
        }
      });
    }

    // Get All Open Spawns //
    getOpenSpawns();


    // If There Is Atleast One Open Spawn //
    if (freeSpawnIds.length > 0) {
      // This Function Will Spawn All The Creeps Based On The Inputs //
      function spawnCreep(inputSpawn,role,targetRoom = roomName,flagName = roomName) {
        // Get The Name Of The Creep //
        const name = `${role}-${Math.round(Math.random() * 1000)}`;

        // Get The Parts Of The Creep //
        const parts = getCreepSize(role);

        // Make A ChangeAble Variable For The Spawn
        let spawn = inputSpawn;

        // Make A Standard DirectionsList //
        let directionsList = [TOP, TOP_RIGHT, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];

        // If Spawn Is Defined //
        if (spawn) {
          // If Room.Terminal Is Defined And Controller level Is Higher Then 5 //
          if (room.terminal && flagMemory.controllerLevel >= 5) {
            // If Role Is TransfererLiTe //
            if (role == "transfererLiTe") {
              // Set The DirectionsList To Only TopRight //
              directionsList = [TOP_RIGHT];
              // Change The Spawn To THe HeadSpawn //
              spawn = Game.getObjectById(flagMemory.roomManager.headSpawn);
            }
            // If Spawn Is The HeadSpawn, Change Directions To BottomLeft Ish //
            else if(spawn.id == flagMemory.roomManager.headSpawn)
            directionsList = [BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];
          }

          // Run The Creep Spawn With Its Memory And Inputs //
          const spawnCreep = spawn.spawnCreep(
            parts,
            name,
            {
              memory: {
                role: role,
                working: "withdraw",
                spawnRoom: roomName,
                targetRoom: targetRoom,
                flagName: flagName,
                canRenew: false,
                hasBeenBoosted: false,
              }, directions: directionsList
            }
          );


          // If Creep Spawn Is OK //
          if (spawnCreep == 0) {
            // Remove This Spawn From Its Memory //
            freeSpawnIds.shift();

            // Get The SpawnCost Of THe Creep By Calculating The EnergyCost By Looping Through Each Parts And Counting The Cost Of That Part //
            let energyCost = 0;
            parts.forEach((part, i) => {
              switch (part) {
                case "carry":
                case "move":
                energyCost += 50;
                break;
                case "work":
                energyCost += 100;
                break;
                case "attack":
                energyCost += 80;
                break;
                case "ranged_attack":
                energyCost += 150;
                break;
                case "heal":
                energyCost += 250;
                break;
                case "claim":
                energyCost += 600;
                break;
                case "tough":
                energyCost += 10;
                break;
                default:
                break;
              }
            });

            // Return Energy Cost To RoomTotal //
            flagMemory.trackers.performance.spawnerEnergy += energyCost;
            // Return Energy Cost To RoleTotal //
            flagMemory.trackers.spawner[role] += energyCost;
          }

          return spawnCreep;
        }
      }

      function roomNeedsTransferer() {
        // EnergyStorage Is Zero At Start //
        let energyStored = 0;

        // Loop Through All Containers And Count Energy In Container If Its Not The Controller Storage //
        room.containers.forEach((container, i) => {
          if (container) {
            if (container.id !== flagMemory.controllerStorage || !flagMemory.controllerStorage)
            energyStored += container.store.getUsedCapacity(RESOURCE_ENERGY);
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
        else
        return false;
      }


      // This Function Will Return Parts For The Creeps That's Being Spawned //
      function getCreepSize(role) {
        // Get The Energy Capacity And The Total Energy Available //
        const energyAvailable = flagMemory.totalEnergyAvailable;
        const energyCapacity = flagMemory.totalEnergyCapacity;

        // Max Parts For A Creep Is 50 //
        const maxPartsAmount = 50;

        // Make A Empty Part Array //
        let parts = [];

        // These Variables Are Being Used For In Each Case //
        // EnergyCost For Each Loop //
        let energyCost;
        // Amount Of Parts Being Pushed Each Loop //
        let partPushAmount;
        // Limit The Loop Count //
        let loopMaxCount;
        // Min Limit The Loop Count //
        let loopMinCount;


        switch (role) {
          case "harvester-0":
          case "harvester-1":
          // Add The List Of Parts As Much As Possible //
          // EnergyCost For Each Loop //
          energyCost = 300;
          // Amount Of Parts Being Pushed Each Loop //
          partPushAmount = 4;
          // Amount Of Time Its Possible To Loop With The Current Energy //
          loopAmount = Math.floor(energyAvailable/energyCost);
          // Limit The Loop Count //
          loopMaxCount = 4;
          // Min Limit The Loop Count //
          loopMinCount = 0;

          // Check If LoopCount Is Higher The LoopMinCount //
          if (loopAmount >= loopMinCount) {
            // Loop Until On Max Loop //
            for (let i = 0; i < loopAmount && i < loopMaxCount && parts.length + partPushAmount <= maxPartsAmount; i++)
            // Add All The Parts Needed //
            parts.push(WORK,WORK,CARRY,MOVE);
          }
          break;
          case "harvesterLD-0":
          case "harvesterLD-1":
          case "harvesterLD-2":
          case "harvesterLD-3":
          // Add The List Of Parts As Much As Possible //
          // EnergyCost For Each Loop //
          energyCost = 300;
          // Amount Of Parts Being Pushed Each Loop //
          partPushAmount = 4;
          // Amount Of Time Its Possible To Loop With The Current Energy //
          loopAmount = Math.floor(energyAvailable/energyCost);
          // Limit The Loop Count //
          loopMaxCount = 5;
          // Min Limit The Loop Count //
          loopMinCount = 3;

          // Check If LoopCount Is Higher The LoopMinCount //
          if (loopAmount >= loopMinCount) {
            // Loop Until On Max Loop //
            for (let i = 0; i < loopAmount && i < loopMaxCount && parts.length + partPushAmount <= maxPartsAmount; i++)
            // Add All The Parts Needed //
            parts.push(WORK,WORK,CARRY,MOVE);
          }
          break;
          case "transferer":
          if (room.links >= 3) {
            // EnergyCost For Each Loop //
            energyCost = 250;
            // Amount Of Parts Being Pushed Each Loop //
            partPushAmount = 5;
            // Amount Of Time Its Possible To Loop With The Current Energy //
            loopAmount = Math.floor(energyAvailable/energyCost);
            // Limit The Loop Count //
            loopMaxCount = 8;
            // Min Limit The Loop Count //
            loopMinCount = 0;

            // Check If LoopCount Is Higher The LoopMinCount //
            if (loopAmount >= loopMinCount) {
              // Loop Until On Max Loop //
              for (let i = 0; i < loopAmount && i < loopMaxCount && parts.length + partPushAmount <= maxPartsAmount; i++)
              // Add All The Parts Needed //
              parts.push(CARRY,CARRY,CARRY,CARRY,MOVE);
            }
          }
          else {
            // EnergyCost For Each Loop //
            energyCost = 100;
            // Amount Of Parts Being Pushed Each Loop //
            partPushAmount = 2;
            // Amount Of Time Its Possible To Loop With The Current Energy //
            loopAmount = Math.floor(energyAvailable/energyCost);
            // Limit The Loop Count //
            loopMaxCount = 25;
            // Min Limit The Loop Count //
            loopMinCount = 6;

            // Check If LoopCount Is Higher The LoopMinCount //
            if (loopAmount >= loopMinCount) {
              // Loop Until On Max Loop //
              for (let i = 0; i < loopAmount && i < loopMaxCount && parts.length + partPushAmount <= maxPartsAmount; i++)
              // Add All The Parts Needed //
              parts.push(CARRY,MOVE);
            }
          }
          break;
          case "transfererLD":
          case "ruinWithdrawer":
          // EnergyCost For Each Loop //
          energyCost = 150;
          // Amount Of Parts Being Pushed Each Loop //
          partPushAmount = 3;
          // Amount Of Time Its Possible To Loop With The Current Energy //
          loopAmount = Math.floor(energyAvailable/energyCost);
          // Limit The Loop Count //
          loopMaxCount = 99;
          // Min Limit The Loop Count //
          loopMinCount = 7;

          // Check If LoopCount Is Higher The LoopMinCount //
          if (loopAmount >= loopMinCount) {
            // Loop Until On Max Loop //
            for (let i = 0; i < loopAmount && i < loopMaxCount && parts.length + partPushAmount <= maxPartsAmount; i++)
            // Add All The Parts Needed //
            parts.push(CARRY,CARRY,MOVE);
          }
          break;
          case "transfererLiTe":
          // EnergyCost For Each Loop //
          energyCost = 50;
          // Amount Of Parts Being Pushed Each Loop //
          partPushAmount = 1;
          // Amount Of Time Its Possible To Loop With The Current Energy //
          loopAmount = Math.floor(energyAvailable/energyCost);
          // Limit The Loop Count //
          loopMaxCount = 10;
          // Min Limit The Loop Count //
          loopMinCount = 5;

          // Check If LoopCount Is Higher The LoopMinCount //
          if (loopAmount >= loopMinCount) {
            // Loop Until On Max Loop //
            for (let i = 0; i < loopAmount && i < loopMaxCount && parts.length + partPushAmount <= maxPartsAmount; i++)
            // Add All The Parts Needed //
            parts.push(CARRY);
          }
          break;
          case "builder":
          case "builderLD":
          case "repairer":
          // EnergyCost For Each Loop //
          energyCost = 250;
          // Amount Of Parts Being Pushed Each Loop //
          partPushAmount = 4;
          // Amount Of Time Its Possible To Loop With The Current Energy //
          loopAmount = Math.floor(energyAvailable/energyCost);
          // Limit The Loop Count //
          loopMaxCount = 99;
          // Min Limit The Loop Count //
          loopMinCount = 0;

          // Check If LoopCount Is Higher The LoopMinCount //
          if (loopAmount >= loopMinCount) {
            // Loop Until On Max Loop //
            for (let i = 0; i < loopAmount && i < loopMaxCount && parts.length + partPushAmount <= maxPartsAmount; i++)
            // Add All The Parts Needed //
            parts.push(WORK,CARRY,MOVE,MOVE);
          }
          break;
          case "extractor":
          // EnergyCost For Each Loop //
          energyCost = 250;
          // Amount Of Parts Being Pushed Each Loop //
          partPushAmount = 4;
          // Amount Of Time Its Possible To Loop With The Current Energy //
          loopAmount = Math.floor(energyAvailable/energyCost);
          // Limit The Loop Count //
          loopMaxCount = 99;
          // Min Limit The Loop Count //
          loopMinCount = 5  ;

          // Check If LoopCount Is Higher The LoopMinCount //
          if (loopAmount >= loopMinCount) {
            // Loop Until On Max Loop //
            for (let i = 0; i < loopAmount && i < loopMaxCount && parts.length + partPushAmount <= maxPartsAmount; i++)
            // Add All The Parts Needed //
            parts.push(WORK,CARRY,MOVE,MOVE);
          }
          break;
          case "upgrader":
          // EnergyCost For Each Loop //
          energyCost = 300;
          // Amount Of Parts Being Pushed Each Loop //
          partPushAmount = 4;
          // Amount Of Time Its Possible To Loop With The Current Energy //
          loopAmount = Math.floor(energyAvailable/energyCost);
          // Limit The Loop Count //
          loopMaxCount = 10;
          // Min Limit The Loop Count //
          loopMinCount = 0;

          // Check If LoopCount Is Higher The LoopMinCount //
          if (loopAmount >= loopMinCount) {
            // Loop Until On Max Loop //
            for (let i = 0; i < loopAmount && i < loopMaxCount && parts.length + partPushAmount <= maxPartsAmount; i++)
            // Add All The Parts Needed //
            parts.push(WORK,WORK,CARRY,MOVE);
          }
          break;
          case "claimer":
          case "reserverLD":
          // EnergyCost For Each Loop //
          energyCost = 700;
          // Amount Of Parts Being Pushed Each Loop //
          partPushAmount = 4;
          // Amount Of Time Its Possible To Loop With The Current Energy //
          loopAmount = Math.floor(energyAvailable/energyCost);
          // Limit The Loop Count //
          loopMaxCount = 5;
          // Min Limit The Loop Count //
          loopMinCount = 2;

          // Check If LoopCount Is Higher The LoopMinCount //
          if (loopAmount >= loopMinCount) {
            // Loop Until On Max Loop //
            for (let i = 0; i < loopAmount && i < loopMaxCount && parts.length + partPushAmount <= maxPartsAmount; i++)
            // Add All The Parts Needed //
            parts.push(CLAIM,MOVE);
          }
          break;
          case "attacker":
          // EnergyCost For Each Loop //
          energyCost = 190;
          // Amount Of Parts Being Pushed Each Loop //
          partPushAmount = 4;
          // Amount Of Time Its Possible To Loop With The Current Energy //
          loopAmount = Math.floor(energyAvailable/energyCost);
          // Limit The Loop Count //
          loopMaxCount = 99;
          // Min Limit The Loop Count //
          loopMinCount = 5;

          // Check If LoopCount Is Higher The LoopMinCount //
          if (loopAmount >= loopMinCount) {
            // Loop Until On Max Loop //
            for (let i = 0; i < loopAmount && i < loopMaxCount && parts.length + partPushAmount <= maxPartsAmount; i++)
            // Add All The Parts Needed //
            parts.push(TOUGH,ATTACK,MOVE,MOVE);
          }
          break;
          case "scout":
          // EnergyCost For Each Loop //
          energyCost = 190;
          // Amount Of Parts Being Pushed Each Loop //
          partPushAmount = 4;
          // Amount Of Time Its Possible To Loop With The Current Energy //
          loopAmount = Math.floor(energyAvailable/energyCost);
          // Limit The Loop Count //
          loopMaxCount = 1;
          // Min Limit The Loop Count //
          loopMinCount = 0;

          // Check If LoopCount Is Higher The LoopMinCount //
          if (loopAmount >= loopMinCount) {
            // Loop Until On Max Loop //
            for (let i = 0; i < loopAmount && i < loopMaxCount && parts.length + partPushAmount <= maxPartsAmount; i++)
            // Add All The Parts Needed //
            parts.push(MOVE);
          }
          break;
          case "scientist":
          // EnergyCost For Each Loop //
          energyCost = 100;
          // Amount Of Parts Being Pushed Each Loop //
          partPushAmount = 2;
          // Amount Of Time Its Possible To Loop With The Current Energy //
          loopAmount = Math.floor(energyAvailable/energyCost);
          // Limit The Loop Count //
          loopMaxCount = 10;
          // Min Limit The Loop Count //
          loopMinCount = 5;

          // Check If LoopCount Is Higher The LoopMinCount //
          if (loopAmount >= loopMinCount) {
            // Loop Until On Max Loop //
            for (let i = 0; i < loopAmount && i < loopMaxCount && parts.length + partPushAmount <= maxPartsAmount; i++)
            // Add All The Parts Needed //
            parts.push(CARRY,MOVE);
          }
          break;
          default:
          // Notify When Room Is Missing Role In Parts Calculater //
          Game.notfy(`Spawner Is Missing A Role. Please Add Role: ${role} To Parts Calculater.`);
          break;
        }

        // Return Parts For The Creep //
        return parts;
      }

      // This Function Will Check If The Input Creep Can Be Spawned //
      function canCreepSpawn(role) {
        let result = false;

        // Set The Result Default To False //
        switch(role) {
          // If Role Is Transferer //
          case "transferer":
          // Check If The Part Amount Is Enough For The Level The Room Is In //
          if (((flagMemory.partsAmount[`${role}-CARRY`] < 30 && room.containers.length == 0 && flagMemory.enemys.length <= 1) || (flagMemory.partsAmount[`${role}-CARRY`] < 60 && room.containers.length == 0 && flagMemory.enemys.length > 1)) || (flagMemory.partsAmount[`${role}-CARRY`] < flagMemory.sources.length * 30 && room.containers.length > 0)) {
            // Check If There Is Energy Enough For A Transferer To Withdraw From //
            if (roomNeedsTransferer()) {
              // Check If The Amount Of Transferers Is Less Then Six, Return True //
              if (flagMemory.rolesCount[role] < 4)
              result = true;
            }
          }
          break;
          // If Role Is TransfererLiTe //
          case "transfererLiTe":
          // If Room Has A HeadSpawn Defined And Controller Is Higher Then Level 5 //
          if (flagMemory.roomManager.headSpawn !== undefined && flagMemory.controllerLevel >= 6) {
            // If There Is Less THen One TransfererLiTe And There Is A Link For It Too, Return True //
            if (flagMemory.rolesCount[role] < 1 && flagMemory.links.linkTo1 !== undefined && room.storage && room.terminal)
            result = true;
          }
          break;
          // If Role Is Harvester-0 //
          case "harvester-0":
          // If Source 0 Is Not Undefined //
          if (flagMemory.sources[0] !== undefined) {
            // If There Are Less Then 6 Harvester Parts //
            if (flagMemory.partsAmount[`${role}-WORK`] < 6) {
              // If There Are Still Open Spots For The Source, Return True //
              if (flagMemory.sources[0].openSpots > flagMemory.rolesCount[role])
              result = true;
            }
          }
          break;
          // If Role Is Harvester-1 //
          case "harvester-1":
          // If Source 1 Is Not Undefined //
          if (flagMemory.sources[1] !== undefined) {
            // If There Are Less Then 6 Harvester Parts //
            if (flagMemory.partsAmount[`${role}-WORK`] < 6) {
              // If There Are Still Open Spots For The Source, Return True //
              if (flagMemory.sources[1].openSpots > flagMemory.rolesCount[role])
              result = true;
            }
          }
          break;
          // If Role Is Extractor //
          case "extractor":
          // If There Is Less Then One Extractor And The Controller Is High Enough That It Can Harvest Minerals //
          if (flagMemory.rolesCount[role] < 1 && room.controller.level >= 6) {
            // If There Is Less Then 200K Of The Rooms MineralType In The Storage Already //
            if (room.storage.store.getUsedCapacity(flagMemory.mineralType) < 200000) {
              // If There Is Still Mineral Left To Mine, Return True //
              if (flagMemory.mineralAmount > 0)
              result = true;
            }
          }
          break;
          // If Role Is Builder //
          case "builder":
          // Check If There Is CPU To Run The Builder //
          // A Builder Is In Most Cases Not Important, Thats Why Check //
          if (Game.cpu.bucket > 1000) {
            // If Builder Count Is Less Then Three And There Are Construction Sites To Be Build //
            if (flagMemory.rolesCount["builder"] < 3 && flagMemory.constructionSitesAmount > 0) {
              // If There Are Less Builder Parts Then Is Possible With 50% Energy Consumption, Return True //
              if (flagMemory.partsAmount[`${role}-WORK`] < (flagMemory.partsAmount["harvester-0-WORK"] + flagMemory.partsAmount["harvester-1-WORK"] / 2) * flagMemory.sources.length)
              result = true;
            }
          }
          break;
          // If Role Is Upgrader //
          case "upgrader":
          // If There Is Enough Energy To Upgrade With //
          if ((flagMemory.trackers.room.energyStored > 1500 && !room.storage) || flagMemory.trackers.room.energyStored > 100000 || (room.controller.level < 4 && room.storage)) {
            // If There Is Less Upgrader Parts Then There Are Sources * 5 And There Are No ConstructionSites To Be Build //
            if ((flagMemory.partsAmount[`${role}-WORK`] < flagMemory.sources.length * 5 || (flagMemory.partsAmount[`${role}-WORK`] < flagMemory.sources.length * 10 && flagMemory.trackers.room.energyStored > 200 * 1000)) && flagMemory.constructionSitesAmount == 0) {
              // If There Are Less Then 4 Upgraders, Return True //
              if (flagMemory.rolesCount[role] < 4)
              result = true;
            }
          }
          break;
          // If Role Is Repairer //
          case "repairer":
          // If There Are Less Then 2 Repairers And There Are No Towers Or There Are Towers And Ramparts To Repair, Return True //
          //if (flagMemory.rolesCount[role] < 2 && (room.towers.length == 0 || (room.towers.length > 0 && room.ramparts.length > 0 && flagMemory.trackers.room.energyStored > 50*1000 && flagMemory.totalEnergyAvailable * 1,25 > flagMemory.totalEnergyCapacity && ((flagMemory.trackers.room.averageWallHP < 5 * 1000 * 1000 && flagMemory.trackers.room.averageWallHP > 0) || (flagMemory.trackers.room.averageRampartHP < 5 * 1000 * 1000 && flagMemory.trackers.room.averageRampartHP > 0)))))
          if (flagMemory.rolesCount[role] < 2 && (room.towers.length == 0))
          result = true;
          break;
          // If Role Is Claimer //
          case "claimer":
          // If There Are Less Then One Claimer And The Claim Flag Is Defined //
          if (flagMemory.rolesCount[role] < 1 && Game.flags["claim"]) {
            // If Claim Flag Memory Is Defined //
            if (Memory.flags["claim"]) {
              // If Current RoomName Is The SpawnRoom, Return True //
              if (roomName == Memory.flags["claim"].spawnRoom)
              result = true;
            }
            // Else Get The Flag Memory Thats Needed //
            else {
              Memory.flags["claim"] = {};
              Memory.flags["claim"].spawnRoom = "";
              Memory.flags["claim"].claimRoom = "";
              console.log("Claim flag is missing memory!");
            }
          }
          break;
          // If Role Is BuilderLD //
          case "builderLD":
          // If There Are Less Then 5 Builders And There Is A BuilderLD Flag With This RoomName, Return True //
          if (flagMemory.rolesCount[role] < 5 && Game.flags[`${role}${roomName}`])
          result = true;
          break;
          // If Role Is Attacker //
          case "attacker":
          // If There Are More Then One EnemyCreep, Spawn Attackers Until They Are Dead! //
          if (flagMemory.enemyCreepCount > 1)
          result = true;
          break;
          // If Role Is Scientist //
          case "scientist":
          // If Lab Memory Is Defined //
          if (flagMemory.labs) {
            // If There Are Less Then One Scientist And The CPU Bucket Is Full Enough //
            if (flagMemory.rolesCount[role] < 1 && Game.cpu.bucket > 5000) {
              // Check If There At Least 3 Labs To Start The Reactions //
              if (room.labs.length >= 3) {
                // If There Is More Then Zero Reactions That Still Need To Be Made, Return True //
                if (flagMemory.labs.reactionsNeeded.length > 0 || Object.keys(flagMemory.boosting).length > 0 || Object.keys(flagMemory.unBoost).length > 0)
                result = true;
              }
            }
          }
          break;
          default:
          Game.notify(`The Spawner Is Missing A Case For Role: ${role}`);
          break;
        }

        // Return Result //
        return result
      }

      // This Function Will Check If The Input Creep Can Be Spawned //
      function canRemoteCreepSpawn(flagName, role, remoteFlagName) {
        // Get The FlagMemory Of The Target Room And The Remote Flag Name //
        const flagMemory = Memory.flags[flagName];
        const remoteFlagMemory = Memory.flags[remoteFlagName];

        // Set The Result Default To False //
        let result = false;

        // If The Target FlagMemory Is Defined, Else Spawn A Scout //
        if (flagMemory && flagMemory.rolesCount) {
          switch(role) {
            // If Role Is Attacker //
            case "attacker":
            // If There Are Less Then 4 Attackers In The Room, Return True //
            if (flagMemory.rolesCount[role] < 4)
            result = true;
            break;
            // If Role Is ReserverLD //
            case "reserverLD":
            // If There Are Less Then 1 Reservers In The Room //
            if (flagMemory.rolesCount[role] < 1) {
              // If Ticks Left On The Controller Is Less Then 2K, Return True //
              if (remoteFlagMemory.reserveTicksLeft < 2000)
              result = true;
            }
            break;
            // If Role Is HarvesterLD-0 //
            case "harvesterLD-0":
            // If Source Is Defined //
            if (flagMemory.sources[0]) {
              // If There Are Less Then 1 HarvesterLD-0 In The Room, Return True //
              if (flagMemory.rolesCount[role] < 1)
              result = true;
            }
            break;
            // If Role Is HarvesterLD-1 //
            case "harvesterLD-1":
            // If Source Is Defined //
            if (flagMemory.sources[1]) {
              // If There Are Less Then 1 HarvesterLD-1 In The Room, Return True //
              if (flagMemory.rolesCount[role] < 1)
              result = true;
            }
            break;
            // If Role Is HarvesterLD-2 //
            case "harvesterLD-2":
            // If Source Is Defined //
            if (flagMemory.sources[2]) {
              // If There Are Less Then 1 HarvesterLD-2 In The Room, Return True //
              if (flagMemory.rolesCount[role] < 1)
              result = true;
            }
            break;
            // If Role Is HarvesterLD-3 //
            case "harvesterLD-3":
            // If Source Is Defined //
            if (flagMemory.sources[3]) {
              // If There Are Less Then 1 HarvesterLD-3 In The Room, Return True //
              if (flagMemory.rolesCount[role] < 1)
              result = true;
            }
            break;
            // If Role Is TransfererLD //
            case "transfererLD":
            // If There Are More Then Zero Sources //
            if (flagMemory.sources.length >= 0) {
              // If There Are Less Transferers Then Sources, Return True;
              if (flagMemory.rolesCount[role] < flagMemory.sources.length || (flagMemory.partsAmount[`${role}-CARRY`] < 40 * flagMemory.sources.length))
              result = true;
            }
            break;
            default:
            Game.notify(`The RemoteSpawner Is Missing A Case For Role: ${role}`);
            break;
          }

          return result;
        }
        // If There Is No FlagMemory, Spawn A Scout To Fix That //
        else if (role == "scout" && Game.time % 20 == 0)
        return true;
      }

      function spawnManager() {
        // Get All Roles That Need To Be Checked If Spawnable //
        const roleArray = [
          "attacker",
          "transferer",
          "transfererLiTe",
          "harvester-0",
          "harvester-1",
          "upgrader",
          "builder",
          "repairer",
          "extractor",
          "claimer",
          "builderLD",
          "scientist",
        ];

        // Cap The Spawning At one So It Doesnt Spawns The Last Role First //
        let canSpawnMore = true;

        // Loop Through Each Role //
        roleArray.forEach((role, i) => {
          // If No Creeps Has Been Spawned //
          if (canSpawnMore) {
            // Check If Creep Can Be Spawned, If So CanSpawnMore Is False //
            if (canCreepSpawn(role) && freeSpawnIds.length > 0) {
              spawnCreep(Game.getObjectById(freeSpawnIds[0]), role);
              canSpawnMore = false;
            }
          }
        });


        // If There Are Still Empty Spawns And No Creep Has Been Spawned //
        if (freeSpawnIds.length > 0 && canSpawnMore) {
          // Check If This Room Has Attack Flags That Need Creeps //
          getAttackRooms();

          // If Room Does Fit All The Requirements For Remoting, Check If Room Has Remotes //
          if (freeSpawnIds.length > 0 && flagMemory.controllerLevel >= 4 && room.storage && Game.cpu.bucket > 2500 && canSpawnMore)
          getRemotes();
        };

        // Reset All Creeps And Parts In This Room Back To Zero /
        countCreepsAndParts.run("reset", roomName);
      }

      function getRemotes() {
        // Check For Up To 5 Flags For This Room If Its A Defined Attack Flag //
        for (let i = 0; i < 5; i++) {
          // Get The Input Flag With Its Memory Using The Number And RoomName //
          const flag = Game.flags[`remote-${i}-${roomName}`];
          const flagMemory = Memory.flags[`remote-${i}-${roomName}`];


          if (flag) {
            // If No FlagMemory, Define It In THe Memory //
            if (!flagMemory)
            Memory.flags[`remote-${i}-${roomName}`] = {};
            else {
              // If FlagMemory Is Not Ready Or There Is No Vision //
              if (!flagMemory.IsMemorySetup || !Game.rooms[flagMemory.targetRoom]) {
                // Spawn A Scout To Get Vision Or Memory //
                if (canRemoteCreepSpawn(``,"scout",flag.name))
                spawnCreep(Game.getObjectById(freeSpawnIds[0]),"scout",``,flag.name);
              }
              else {
                // Run Each 10 Ticks //
                if (Game.time % 10 == 0) {
                  // Reset Reserved Room Ticks //
                  flagMemory.reserveTicksLeft = 0;

                  // If There Is Vision In Target Room //
                  if (Game.rooms[flagMemory.targetRoom]) {
                    // Run Each 10 Ticks //
                    if (Game.time % 10 == 0) {
                      // Only Remove Enemys When It's Going To Be Checked //
                      flagMemory.enemys = {};
                      flagMemory.enemyCreepCount = 0;

                      // Get All Hostile Creep's In TargetRoom //
                      getHostileCreepsInRoom.run(flagMemory.targetRoom);

                    }
                    // If TargetRoom Is Reserved, Log The Ticks Left In The Memory //
                    if (Game.rooms[flagMemory.targetRoom].controller.reservation)
                    flagMemory.reserveTicksLeft = Game.rooms[flagMemory.targetRoom].controller.reservation.ticksToEnd;
                  }
                }

                // If TargetRoom Is Free Of Attackers //
                if (Memory.flags[flagMemory.targetRoom].enemyCreepCount == 0) {
                  if (flagMemory.reserveTicksLeft > 1000) {
                    // Get All Roles That Need To Be Checked If Spawnable //
                    const roleArray = [
                      "reserverLD",
                      "harvesterLD-0",
                      "transfererLD",
                      "harvesterLD-1",
                      "harvesterLD-2",
                      "harvesterLD-3",
                    ];

                    // Cap The Spawning At one So It Doesnt Spawns The Last Role First //
                    let canSpawnMore = true;

                    // Loop Through Each Role //
                    roleArray.forEach((role, i) => {
                      // If No Creeps Has Been Spawned //
                      if (canSpawnMore) {
                        // Check If Creep Can Be Spawned, If So CanSpawnMore Is False //
                        if (canRemoteCreepSpawn(flagMemory.targetRoom, role, flag.name) && freeSpawnIds.length > 0) {
                          spawnCreep(Game.getObjectById(freeSpawnIds[0]), role,flagMemory.targetRoom, flagMemory.targetRoom);
                          canSpawnMore = false;
                        }
                      }
                    });
                  }
                  // Spawn A Reserver To Reserver Room Back //
                  else {
                    if (canRemoteCreepSpawn(flagMemory.targetRoom,"reserverLD",flag.name))
                    spawnCreep(Game.getObjectById(freeSpawnIds[0]),"reserverLD",flagMemory.targetRoom,flagMemory.targetRoom);
                  }
                }
                // If There Is A Attacker In The Room, Go Kill That Creep! //
                else {
                  // Check If Attacker Can Be Spawned //
                  if (canRemoteCreepSpawn(flagMemory.targetRoom,"attacker",flag.name))
                  spawnCreep(Game.getObjectById(freeSpawnIds[0]),"attacker",flagMemory.targetRoom,flagMemory.targetRoom);
                }

                // Reset All Creeps And Parts In This Target Room Back To Zero /
                countCreepsAndParts.run("reset", flagMemory.targetRoom);
              }
            }
          }
        }
      }

      // This Function Get's All Rooms To Attack And Tries To Spawn Attackers If Found //
      function getAttackRooms() {
        // Check For Up To 3 Flags For This Room If Its A Defined Attack Flag //
        for (let i = 0; i < 3; i++) {
          // Get The Input Flag Using The Number And RoomName //
          const flag = Game.flags[`attack-${i}-${roomName}`];

          // If AttackFlag Is Defined //
          if (flag) {
            // Get The FlagMemory Of The Flag //
            const flagMemory = Memory.flags[flag.name];
            // If FlagMemory Is Missing For The Room //
            if (!flagMemory)
            // Define FlagMemory //
            Memory.flags[flag.name] = {};
            else {
              // If FlagMemory Is Not Ready //
              if (!flagMemory.IsMemorySetup) {
                // Check If Room Can Spawn Scout To Setup Room //
                if (canRemoteCreepSpawn(``,"scout",flag.name))
                spawnCreep(Game.getObjectById(freeSpawnIds[0]),"scout",``,flag.name);
              }
              else {
                // Get All Roles That Need To Be Checked If Spawnable //
                const roleArray = [
                  "attacker",
                ];

                // Cap The Spawning At one So It Doesnt Spawns The Last Role First //
                let canSpawnMore = true;

                // Loop Through Each Role //
                roleArray.forEach((role, i) => {
                  // If No Creeps Has Been Spawned //
                  if (canSpawnMore) {
                    // Check If Creep Can Be Spawned, If So CanSpawnMore Is False //
                    if (canRemoteCreepSpawn(flagMemory, role)) {
                      spawnCreep(Game.getObjectById(freeSpawnIds[0]), role, flagMemory.targetRoom);
                      canSpawnMore = false;
                    }
                  }
                });

                // Reset All Creeps And Parts In This Target Room Back To Zero /
                countCreepsAndParts.run("reset", flagMemory.targetRoom);
              }
            }
          }
        }
      }


      // Run SpawnManager, This Will Check If A Creep Can Be Spawned //
      spawnManager();

      // Save In The Memory Percentage Of How Busy The Spawns Are //
      flagMemory.trackers.performance.spawnAvailability = freeSpawnIds.length / room.spawns.length * 10;
    }
  }
};
