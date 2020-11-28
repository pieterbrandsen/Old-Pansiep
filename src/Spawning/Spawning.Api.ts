//#region Require('./)
import _ from "lodash";
import { ALL_OWNED_ROOM_CREEP_ROLES, ALL_REMOTE_CREEP_ROLES, Config, MemoryApi_Room } from "Utils/importer/internals";
//#endregion

//#region Class
export class SpawningApi {
  /**
   * Try to get a spawn in the inputted room
   * If no spawn is found, return null
   * @param room Room to find spawn in
   */
  public static getAllOpenSpawn(room: Room): any {
    // Get all spawns and filter them on spawns not spawning
    const openSpawns: Structure[] = MemoryApi_Room.getStructuresOfType(
      room,
      STRUCTURE_SPAWN,
      (spawn: StructureSpawn) => !spawn.spawning
    );

    // If the openSpawns array is empty, return null
    if (openSpawns.length === 0) {
      return null;
    }

    // Return the first item out of the OpenSpawns array
    return openSpawns;
  }

  public static getCreepMemory(room: Room, role: string, targetRoom: string = room.name): CreepMemory {
    return {
      targetRoom,
      spawnRoom: room.name,
      role,
      job: ""
    };
  }

  public static getCreepParts(room: Room, role: string): { body: BodyPartConstant[]; bodyCost: number } {
    const roomMemory = room.memory;

    // Get current body cost
    const calcBodyCost = (body: BodyPartConstant[]): number => {
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
        if (typeof roomMemory.commonMemory!.sources[(role.split("-")[1] as unknown) as number] === "object") {
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
      case "scout":
        returnBody([], [CARRY, CARRY], 1);
        break;
      default:
        break;
    }

    // Return body and body cost
    return { body, bodyCost: calcBodyCost(body) };
  }

  public static getCreepName(role: string): string {
    return `${role}-${Math.floor(Math.random() * 10000)}`;
  }

  public static getCreepDirections(role: string, room: Room): DirectionConstant[] {
    if (room.terminal! && room.controller!.level >= 6) {
      if (role === "transfererLiTe") {
        return [TOP_RIGHT];
      } else {
        return [BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];
      }
    } else {
      return [TOP, TOP_RIGHT, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];
    }
  }

  public static getNextRoleName(room: Room, roomType: string, targetRoom: Room = room): [boolean, string] {
    if (roomType === "remote" && targetRoom === undefined) {
      return [true, "scout"];
    }

    let rolesNeededInRoom: string[] = [];
    switch (roomType) {
      case "owned":
        rolesNeededInRoom = ALL_OWNED_ROOM_CREEP_ROLES;
        break;
      case "remote":
        rolesNeededInRoom = ALL_REMOTE_CREEP_ROLES;
        break;
      default:
        break;
    }

    let result: [boolean, string] = [false, ""];

    _.forEach(rolesNeededInRoom, (role: string) => {
      const targetRoomMemory = targetRoom.memory;

      const creeps: Creep[] = MemoryApi_Room.getMyCreepsOfType(targetRoom, role);

      const shortRoleName: string = role.split("-")[0].replace("LD", "");

      switch (role) {
        // Owned room roles
        case "pioneer":
          // Check if input role is less then max creeps allowed //
          if (creeps.length >= Config.creepsCountMax[shortRoleName] * targetRoomMemory.commonMemory!.sources.length) {
            break;
          }

          // If energy capacity is more then 300
          if (room.energyAvailable > 300) {
            break;
          }

          if (room.energyAvailable === 300) {
            result = [true, role];
          }
          break;
        case "transferer":
        case "transfererLD":
          // Check if input role is less then max creeps allowed //
          if (role === "transfererLD") {
            if (Config.roleCountByRoomByRole[room.name][role] >= targetRoomMemory.commonMemory!.sources.length) {
              break;
            }
          } else {
            if ((room.controller && room.controller.level >= 6) || (room.controller && room.controller.level >= 7)) {
              if (Config.roleCountByRoomByRole[room.name][role] >= 1) {
                break;
              }
            } else {
              if (
                creeps.length >=
                Config.creepsCountMax[shortRoleName] * targetRoomMemory.commonMemory!.sources.length
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

          if (targetRoomMemory === undefined || targetRoomMemory.commonMemory!.energyStored.usable < 1000) {
            break;
          }

          result = [true, role];
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
              result = [true, role];
            }
          } else {
            if (
              targetRoomMemory.commonMemory!.energyStored.capacity > 10000 &&
              targetRoomMemory.commonMemory!.energyStored.capacity / 10 >
                targetRoomMemory.commonMemory!.energyStored.usable
            ) {
              break;
            }

            // Check if input role is less then max creeps allowed //
            if (
              creeps.length >= Config.creepsCountMax[shortRoleName] &&
              targetRoomMemory.constructionSites.data.length === 0
            ) {
              break;
            } else if (
              creeps.length >= Config.creepsCountMax[shortRoleName] / 2 &&
              targetRoomMemory.constructionSites.data.length > 0
            ) {
              break;
            }
          }

          if (targetRoom === undefined) {
            break;
          }

          result = [true, role];
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

          result = [true, role];
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

          if (targetRoomMemory === undefined || targetRoomMemory.commonMemory!.energyStored.usable < 1500) {
            break;
          }

          // Break if there is a tower to repair from
          if (room.controller!.level >= 3) {
            break;
          }

          // Break if there are no targets left
          if (targetRoomMemory.jobs.damagedStructures.data.length === 0) {
            break;
          }

          result = [true, role];
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

          if (
            !targetRoomMemory.roomPlanner.room.sources[0] ||
            Game.getObjectById(targetRoomMemory.roomPlanner.room.sources[0].id!) === null
          ) {
            break;
          }

          result = [true, role];
          break;
        case "harvester-1":
        case "harvesterLD-1":
          // If there is more then 1 source
          if (targetRoomMemory.commonMemory!.sources.length === 1) {
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

          if (
            !targetRoomMemory.roomPlanner.room.sources[1] ||
            Game.getObjectById(targetRoomMemory.roomPlanner.room.sources[1].id!) === null
          ) {
            break;
          }

          result = [true, role];
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

          result = [true, role];
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
          // TODO FIX THIS TO CLAIM ANOTHER ROOM
          // if (!Memory.rooms["claim"]) {
          //   // @ts-ignore
          //   Memory.rooms["claim"] = { spawnRoom: "", room: "" };
          //   break;
          // } else if (Memory.rooms["claim"].spawnRoom === room.name && Memory.rooms["claim"].room !== undefined) {
          //   memory.targetRoom = Memory.rooms["claim"].room;
          //   result = [true, role];
          // }
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
            targetRoomMemory.commonMemory!.mineral!.amount &&
            targetRoomMemory.commonMemory!.mineral!.amount > 0 &&
            room.controller &&
            room.controller.level >= 6 &&
            room.storage &&
            // @ts-ignore
            room.storage.store.getUsedCapacity(targetRoomMemory.commonMemory.mineral.type) < 200 * 1000
          ) {
            result = [true, role];
          }
          break;
        default:
          break;
      }

      return result;
    });
    return result;
  }
}
//#endregion
