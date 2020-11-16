//#region Require('./)
import { Config } from "../../Utils/importer/internals";
//#endregion

//#region Functions()
const getHostileCreeps = (room: Room) => {
  // Create a acces point to the flagMemory //
  const flagMemory: FlagMemory = Memory.flags[room.name];

  // Reset the memory for enemies
  flagMemory.enemies = {
    parts: { WORK: 0, ATTACK: 0, RANGED_ATTACK: 0, TOUGH: 0, HEAL: 0 },
    creeps: []
  };

  const allHostileCreeps: Creep[] | any = room.find(FIND_HOSTILE_CREEPS);

  // Loop through each hostile creep found
  for (let i = 0; i < allHostileCreeps.length; i++) {
    const creep: Creep = allHostileCreeps[i];
    // Check if current owner is on whitelist. If so break
    if (Config.whitelist.indexOf(creep.owner.username) >= 0) break;

    // Create variables for creep part counts
    let netToughCount: number = 0;
    let netAttackCount: number = 0;
    let netRangedAttackCount: number = 0;
    let netHealCount: number = 0;

    // Loop though all the parts in the body to check for boost.
    creep.body.forEach(part => {
      // If the part is boosted
      if (part.boost !== undefined) {
        switch (part.boost) {
          case RESOURCE_UTRIUM_HYDRIDE:
            netAttackCount += 2;
            break;
          case RESOURCE_KEANIUM_OXIDE:
            netRangedAttackCount += 2;
            break;
          case RESOURCE_LEMERGIUM_OXIDE:
            netHealCount += 2;
            break;
          // case RESOURCE_GHODIUM_OXIDE:
          // netToughCount+=2;
          // break;
          case RESOURCE_UTRIUM_ACID:
            netAttackCount += 3;
            break;
          case RESOURCE_KEANIUM_ALKALIDE:
            netRangedAttackCount += 3;
            break;
          case RESOURCE_LEMERGIUM_ALKALIDE:
            netHealCount += 3;
            break;
          // case RESOURCE_GHODIUM_ALKALIDE:
          // netToughCount+=3;
          // break;
          case RESOURCE_CATALYZED_UTRIUM_ACID:
            netAttackCount += 4;
            break;
          case RESOURCE_CATALYZED_KEANIUM_ACID:
            netRangedAttackCount += 4;
            break;
          case RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE:
            netHealCount += 4;
            break;
          // case RESOURCE_CATALYZED_GHODIUM_ALKALIDE:
          //   netToughCount += 4;
          //   break;
          default:
            break;
        }
      } else {
        // Else switch between the parts that needs to be saved
        switch (part.type) {
          case "tough":
            netToughCount += 1;
            break;
          case "attack":
            netAttackCount += 1;
            break;
          case "ranged_attack":
            netRangedAttackCount += 1;
            break;
          case "heal":
            netHealCount += 1;
            break;
          default:
            break;
        }
      }
    });

    // Add all found parts to total memory
    flagMemory.enemies.parts.ATTACK += netAttackCount;
    flagMemory.enemies.parts.RANGED_ATTACK += netRangedAttackCount;
    flagMemory.enemies.parts.HEAL += netHealCount;
    flagMemory.enemies.parts.TOUGH += netToughCount;

    // Add creep parts and id to array
    flagMemory.enemies.creeps.push({
      id: creep.id,
      parts: {
        ATTACK: netAttackCount,
        RANGED_ATTACK: netRangedAttackCount,
        TOUGH: netToughCount,
        HEAL: netHealCount
      }
    });
  }
};
//#endregion

//#region Export functions
export { getHostileCreeps as GetHostileCreeps };
//#endregion
