//#region Require('./)
import { Config } from "Utils/importer/internals";
//#endregion

//#region Class
export class SpawningHelper {
  public static spawnCreep(room: Room, roomType: string, spawn: StructureSpawn): void {
    // Get roomMemory from spawnRoom
    const roomMemory = Memory.rooms[room.name];

    // Get all spawns //
    const headSpawn: StructureSpawn | null = Game.getObjectById(roomMemory.commonMemory!.headSpawnId!);
    if (!spawn || headSpawn === null) {
      return;
    }

    let rolesNeededInRoom: string[] = [];
    switch (roomType) {
      case "owned":
        rolesNeededInRoom = [
          "pioneer",
          "transferer",
          "harvester-0",
          "harvester-1",
          "builder",
          "repairer",
          "upgrader",
          "mineral",
          "claimerLD",
          "builderLD",
          "end"
        ];
        break;
      case "remote":
        rolesNeededInRoom = ["transfererLD", "reserverLD", "repairerLD", "harvesterLD-0", "harvesterLD-1", "end"];
        break;
      case "external":
        // TODO For automatic claims, search a room manually and place a claim flag
        break;
      default:
        break;
    }

    const initCreepMemory = (room: Room, role: string) => {
      const newMemory: { [key: string]: any } = {};

      // Init all undefined memory variables
      if (!newMemory.targetRoom) {
        newMemory.targetRoom = room.name;
      }
      if (!newMemory.spawnRoom) {
        newMemory.spawnRoom = room.name;
      }
      if (!newMemory.role) {
        newMemory.role = role;
      }
      if (!newMemory.job) {
        newMemory.job = "";
      }
      if (!newMemory.targetId) {
        newMemory.targetId = "";
      }

      const roomMemory = Memory.rooms[newMemory.targetRoom];
      if (role.includes("harvester") && !newMemory.sourceId) {
        if (typeof roomMemory.commonMemory.sources[(role.split("-")[1] as unknown) as number] === "object") {
          newMemory.sourceId = roomMemory.commonMemory.sources[(role.split("-")[1] as unknown) as number].id;
        }
      }

      if (room.controller && room.controller.level >= 6 && room.terminal) {
        if (role === "transfererLiTe") {
          newMemory.directions = [TOP_RIGHT];
        } else {
          newMemory.directions = [TOP, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];
        }
      } else {
        newMemory.directions = [TOP, TOP_RIGHT, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];
      }

      return newMemory;
    };

    const checkIfRoleCanBeSpawned = (role: string, room: Room, memory: CreepMemory) => {
      const shortRoleName = role.split("-")[0].replace("LD", "");
      const targetRoom = Game.rooms[memory.targetRoom];
      const targetRoomMemory = Memory.rooms[memory.targetRoom];
      let result = false;

      switch (role) {
        // Owned room roles
        case "pioneer":
          // Check if input role is less then max creeps allowed //
          if (
            Config.roleCountByRoomByRole[room.name][role] >=
            Config.creepsCountMax[shortRoleName] * roomMemory.commonMemory.sources.length
          ) {
            break;
          }

          // If energy capacity is more then 300
          if (room.energyAvailable > 300) {
            break;
          }

          if (room.energyAvailable === 300) {
            result = true;
          }
          break;
        case "transferer":
        case "transfererLD":
          // Check if input role is less then max creeps allowed //
          if (role === "transfererLD") {
            if (Config.roleCountByRoomByRole[room.name][role] >= targetRoomMemory.commonMemory.sources.length) {
              break;
            }
          } else {
            if ((room.controller && room.controller.level >= 6) || (room.controller && room.controller.level >= 7)) {
              if (Config.roleCountByRoomByRole[room.name][role] >= 1) {
                break;
              }
            } else {
              if (
                Config.roleCountByRoomByRole[room.name][role] >=
                Config.creepsCountMax[shortRoleName] * targetRoomMemory.commonMemory.sources.length
              ) {
                break;
              }
            }
          }

          // If energy is less then 300
          if (room.energyAvailable <= 300) {
            break;
          }

          if (targetRoom === undefined) {
            break;
          }

          if (targetRoomMemory === undefined || targetRoomMemory.commonMemory.energyStored.usable < 1000) {
            break;
          }

          result = true;
          break;
        case "upgrader":
          // If energy is less then 300
          if (room.energyAvailable <= 300) {
            break;
          }

          if (room.controller && room.controller.ticksToDowngrade <= 1 * 1000) {
            // Check if input role is less then max creeps allowed //
            if (Config.roleCountByRoomByRole[room.name][role] >= 1) {
              break;
            } else {
              result = true;
            }
          } else {
            if (
              targetRoomMemory.commonMemory.energyStored.capacity > 10000 &&
              targetRoomMemory.commonMemory.energyStored.capacity / 10 >
                targetRoomMemory.commonMemory.energyStored.usable
            ) {
              break;
            }

            // Check if input role is less then max creeps allowed //
            if (
              Config.roleCountByRoomByRole[room.name][role] >= Config.creepsCountMax[shortRoleName] &&
              targetRoomMemory.constructionSites.data.length === 0
            ) {
              break;
            } else if (
              Config.roleCountByRoomByRole[room.name][role] >= Config.creepsCountMax[shortRoleName] / 2 &&
              targetRoomMemory.constructionSites.data.length > 0
            ) {
              break;
            }
          }

          if (targetRoom === undefined) {
            break;
          }

          result = true;
          break;
        case "builder":
        case "builderLD":
          // Check if input role is less then max creeps allowed //
          if (Config.roleCountByRoomByRole[room.name][role] >= Config.creepsCountMax[shortRoleName]) {
            break;
          }

          // If energy is less then 300
          if (room.energyAvailable <= 300) {
            break;
          }

          if (targetRoom === undefined) {
            break;
          }

          if (role.includes("LD") && !Game.flags[`builderLD${room.name}`]) {
            break;
          } else if (
            role.includes("LD") &&
            Memory.rooms[`builderLD${room.name}`] &&
            Memory.rooms[`builderLD${room.name}`].spawnRoom === room.name
          ) {
            // @ts-ignore
            if (Memory.rooms[`builderLD${room.name}`].room !== undefined) {
              // @ts-ignore
              memory.targetRoom = Memory.rooms[`builderLD${room.name}`].room;
            }
          }

          if (targetRoomMemory.constructionSites.data.length === 0) {
            break;
          }

          result = true;
          break;
        case "repairer":
        case "repairerLD":
          // Check if input role is less then max creeps allowed //
          if (Config.roleCountByRoomByRole[room.name][role] >= Config.creepsCountMax[shortRoleName]) {
            break;
          }

          // If energy is less then 300
          if (room.energyAvailable <= 300) {
            break;
          }

          if (targetRoom === undefined) {
            break;
          }

          if (targetRoomMemory === undefined || targetRoomMemory.commonMemory.energyStored.usable < 1500) {
            break;
          }

          // Break if there is a tower to repair from
          if (room.controller!.level >= 3) {
            break;
          }

          // Break if there are no targets left
          if (targetRoomMemory.commonMemory.repair.targets.length === 0) {
            break;
          }

          result = true;
          break;
        case "harvester-0":
        case "harvesterLD-0":
          // Check if input role is less then max creeps allowed //
          if (Config.roleCountByRoomByRole[room.name][role] >= Config.creepsCountMax[shortRoleName]) {
            break;
          }

          // If energy is less then 300
          if (room.energyAvailable <= 300) {
            break;
          }

          if (targetRoom === undefined) {
            break;
          }

          if (targetRoomMemory === undefined) {
            break;
          }

          if (Game.getObjectById(targetRoomMemory.roomPlanner.room.sources[0].id!) === null) {
            break;
          }

          result = true;
          break;
        case "harvester-1":
        case "harvesterLD-1":
          // If there is more then 1 source
          if (targetRoomMemory.commonMemory.sources.length === 1) {
            break;
          }

          // Check if input role is less then max creeps allowed //
          if (Config.roleCountByRoomByRole[room.name][role] >= Config.creepsCountMax[shortRoleName]) {
            break;
          }

          // If energy is less then 300
          if (room.energyAvailable <= 300) {
            break;
          }

          if (targetRoom === undefined) {
            break;
          }

          if (targetRoomMemory === undefined) {
            break;
          }

          if (Game.getObjectById(targetRoomMemory.roomPlanner.room.sources[1].id!) === null) {
            break;
          }

          result = true;
          break;
        case "reserverLD":
          // Check if input role is less then max creeps allowed //
          if (Config.roleCountByRoomByRole[room.name][role] >= Config.creepsCountMax[shortRoleName]) {
            break;
          }

          // If energy is less then 300
          if (room.energyAvailable <= 300) {
            break;
          }

          if (targetRoom === undefined) {
            break;
          }

          if (targetRoomMemory === undefined) {
            break;
          }

          // If reservation is defined, the username is mine and the ticksToEnd is higher then 2500 ticks
          if (
            (targetRoom.controller && typeof targetRoom.controller.reservation !== "object") ||
            (targetRoom.controller &&
              targetRoom.controller.reservation &&
              (targetRoom.controller.reservation.username !== Config.username ||
                targetRoom.controller.reservation.ticksToEnd > 2500))
          ) {
            break;
          }

          result = true;
          break;
        case "claimerLD":
          // Check if input role is less then max creeps allowed //
          if (Config.roleCountByRoomByRole[room.name][role] >= Config.creepsCountMax[shortRoleName]) {
            break;
          }

          // If flag is removed, delete the memory
          if (!Game.flags["claim"]) {
            delete Memory.rooms["claim"];
            break;
          }

          // If room is missing claim roomMemory, assign it
          if (!Memory.rooms["claim"]) {
            // @ts-ignore
            Memory.rooms["claim"] = { spawnRoom: "", room: "" };
            break;
          } else if (Memory.rooms["claim"].spawnRoom === room.name && Memory.rooms["claim"].room !== undefined) {
            memory.targetRoom = Memory.rooms["claim"].room;
            result = true;
          }
          break;
        case "mineral":
          // Check if input role is less then max creeps allowed //
          if (Config.roleCountByRoomByRole[room.name][role] >= Config.creepsCountMax[shortRoleName]) {
            break;
          }

          // If energy is less then 300
          if (room.energyAvailable <= 300) {
            break;
          }

          // @ts-ignore
          if (
            roomMemory.commonMemory.mineral.amount &&
            roomMemory.commonMemory.mineral.amount > 0 &&
            room.controller &&
            room.controller.level >= 6 &&
            room.storage &&
            // @ts-ignore
            room.storage.store.getUsedCapacity(roomMemory.commonMemory.mineral.type) < 200 * 1000
          ) {
            result = true;
          }
          break;
        default:
          break;
      }
      return result;
    };

    const getCreepParts = (role: string, room: Room) => {
      const roomMemory = Memory.rooms[room.name];

      // Get current body cost
      const calcBodyCost = (body: BodyPartConstant[]) => {
        // @ts-ignore
        return _.reduce(body, (sum, part) => sum + BODYPART_COST[part], 0);
      };
      let body: BodyPartConstant[] = [];
      const returnBody = (parts: BodyPartConstant[], bodyIteration: BodyPartConstant[], maxLoopCount = 50) => {
        body = parts;
        let i = 0;

        while (
          calcBodyCost(body) + calcBodyCost(bodyIteration) <= room.energyAvailable &&
          body.length + bodyIteration.length <= MAX_CREEP_SIZE &&
          i < maxLoopCount
        ) {
          body = body.concat(bodyIteration);
          i++;
        }

        // Reset if input body is not filled with the needed parts
        if (body.length === parts.length) {
          body = [];
        }
      };

      switch (role) {
        case "pioneer":
          returnBody([CARRY, MOVE, WORK], [CARRY, MOVE]);
          break;
        case "transferer":
        case "transfererLD":
          returnBody([CARRY, CARRY, MOVE], [CARRY, CARRY, MOVE]);
          break;
        case "harvester-0":
        case "harvester-1":
          if (typeof roomMemory.commonMemory.sources[(role.split("-")[1] as unknown) as number] === "object") {
            const sourceStructureType =
              roomMemory.roomPlanner.room.sources[(role.split("-")[1] as unknown) as number].structureType;
            switch (sourceStructureType) {
              case "container":
                returnBody([MOVE], [WORK], 7);
                break;
              case "link":
                returnBody([MOVE, CARRY], [WORK], 7);
                break;
              default:
                break;
            }
          }
          break;
        case "harvesterLD-0":
        case "harvesterLD-1":
          returnBody([], [WORK, MOVE], 7);
          break;
        case "builder":
        case "builderLD":
        case "repairer":
        case "repairerLD":
        case "mineral":
          returnBody([], [WORK, MOVE, CARRY]);
          break;
        case "upgrader":
          returnBody([CARRY, MOVE, CARRY, MOVE], [WORK]);
          break;
        case "reserverLD":
        case "claimerLD":
          returnBody([], [CLAIM, MOVE]);
          break;
        default:
          break;
      }

      // Return body and body cost
      return { body, bodyCost: calcBodyCost(body) };
    };

    const aCreepHasBeenSpawned = [false, "none"];
    rolesNeededInRoom.forEach(role => {
      aCreepHasBeenSpawned[1] = role;

      // If a creep is already spawned
      if (aCreepHasBeenSpawned[0]) {
        return;
      }

      const memory: any = initCreepMemory(room, role);
      // If role can't be spawned, return
      if (!checkIfRoleCanBeSpawned(role, room, memory)) {
        return;
      }

      // Get creep memory and name
      const name = `${role}-${Math.round(Math.random() * 1000)}`;
      const creepBody = getCreepParts(role, room);
      const directions = memory.directions;
      delete memory.directions;

      // Check if body is filled
      if (creepBody.body.length === 0) {
        aCreepHasBeenSpawned[0] = true;
      }

      if (role === "transfererLiTe") {
        spawn = headSpawn;
      }

      // Get return value on spawnCreep
      const spawnCreep = spawn.spawnCreep(creepBody.body, name, {
        memory,
        directions
      });

      if (spawnCreep === OK) {
        aCreepHasBeenSpawned[0] = true;
        Config.expenses.spawnExpenses[room.name][role] += creepBody.bodyCost;
      }
    });
  }
}
//#endregion
