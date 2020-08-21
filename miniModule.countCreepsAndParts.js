module.exports = {
  run: function(actionRequired = "count", roomName) {
    // Get Variables Needed For MiniModule //
    // None


    // Run This Code Each 10 Ticks //
    if (Game.time % 10 == 0) {
      // If Action Is Count //
      if (actionRequired == "count") {
        // This Function Is Being Called When A Role/Part Needs to be stored In The Room Memory //
        function addRoleAndPartToMemory(roomName, role, part, partAmount, ticksToLive, bodyCount) {
          // This Function Adds The InputRole To The Room Memory //
          addRoleToMemory(roomName,role, ticksToLive, bodyCount);
          // This Function Adds The InputPart To The Room Memory If A Part Is Defined //
          if (part)
          addPartsToMemory(roomName, role, part, partAmount, ticksToLive, bodyCount);
        }

        // This Function Is Being Called Each Time A Role Needs To Be Added To The Room's Memory //
        function addRoleToMemory(roomName, role, ticksToLive, bodyCount) {
          // Run Function Each 10 Ticks //
          if (Game.time % 10 == 0) {
            // Define Variables For Function //
            const flagMemory = Memory.flags[roomName];
            const rolesCount = flagMemory.rolesCount;

            // If FlagMemory Has RolesCount Defined //
            if (rolesCount) {
              // If The RoleCount Of The InputRole Is Defined, Add 1 //
              if (rolesCount[role] !== undefined && (ticksToLive > bodyCount * 3 + 100 || !ticksToLive))
              rolesCount[role]++;
            }
          }
        }

        // This Function Is Being Called Each Time A PartAmount Needs To Be Added To The Room's Memory //
        function addPartsToMemory(roomName, role, part, inputPartAmount, ticksToLive, bodyCount) {
          // Run Function Each 10 Ticks //
          if (Game.time % 10 == 0) {
            // Define Variables For Function //
            const flagMemory = Memory.flags[roomName];
            const partsAmount = flagMemory.partsAmount;

            // If FlagMemory Has PartsAmount Defined //
            if (partsAmount) {
              // If The PartAmount Of The InputPart Is Defined, Add The InputPartAmount //
              if (partsAmount[`${role}-${part}`] !== undefined && (ticksToLive > bodyCount * 3 + 100 || !ticksToLive))
              partsAmount[`${role}-${part}`] += inputPartAmount;
            }
          }
        }


        // Loop Through All Alive Creeps //
        for (let name in Game.creeps) {
          // Define Variables //
          const creep = Game.creeps[name];
          const role = creep.memory.role;
          const currentRoom = creep.room.name;
          const targetRoom = creep.memory.targetRoom;

          // Check If The FlagMemory Of The TargetRoom Is Defined //
          // The TargetRoom Can Be The Same As The SpawnRoom //
          if (Memory.flags[targetRoom]) {
            // Check If The MemoryIsSetup Of The TargetRoom //
            if (Memory.flags[targetRoom].IsMemorySetup) {
              // Switch Between All Options Using Creep's Role Name //
              switch (role) {
                // All Role Names That Has Work Parts As Their Main Parts //
                // Add It To The FlagMemory Of The TargetRoom //
                case "harvester-0":
                case "harvester-1":
                case "builder":
                case "upgrader":
                case "repairer":
                case "extractor":
                case "builderLD":
                case "harvesterLD-0":
                case "harvesterLD-1":
                case "harvesterLD-2":
                case "harvesterLD-3":
                addRoleAndPartToMemory(targetRoom, role, "WORK", creep.getActiveBodyparts(WORK), creep.ticksToLive, creep.body.length);
                break;

                // All Role Names That Has Carry Parts As Their Main Parts //
                // Add It To The FlagMemory Of The TargetRoom //
                case "transferer":
                case "transfererLiTe":
                case "transfererLD":
                addRoleAndPartToMemory(targetRoom, role, "CARRY", creep.getActiveBodyparts(CARRY), creep.ticksToLive, creep.body.length);
                break;

                // All Role Names That Has CLAIM Parts As Their Main Parts //
                // Add It To The FlagMemory Of The TargetRoom //
                case "claimer":
                addRoleAndPartToMemory(targetRoom, role, "CLAIM", creep.getActiveBodyparts(CLAIM), creep.ticksToLive, creep.body.length);
                break;

                // All Role Names That Has RANGED_ATTACK Parts As Their Main Parts //
                // Add It To The FlagMemory Of The TargetRoom //
                case "attacker":
                addRoleAndPartToMemory(targetRoom, role, "RANGED_ATTACK", creep.getActiveBodyparts(RANGED_ATTACK), creep.ticksToLive, creep.body.length);
                break;

                // If Role Name Has No Main Part //
                // Add Only The Role To The FlagMemory Of The TargetRoom //
                default:
                addRoleAndPartToMemory(targetRoom, role, ``,``, creep.ticksToLive, creep.body.length);
                break;
              }
            }
          }
        }
      }
      // Else If ActionRequired Is Not Count //
      else {
        // Get The FlagMemory Of The Room //
        const flagMemory = Memory.flags[roomName];
        // Check If FlagMemory Has RolesCount //
        if (flagMemory.rolesCount) {
          // For Every Item In RolesCount, Reset To Zero //
          Object.keys(flagMemory.rolesCount).forEach((item, i) => {
            if (flagMemory.rolesCount[item] > 0)
            flagMemory.rolesCount[item] = 0;
          });
        }

        // Check If FlagMemory Has PartsAmount //
        if (flagMemory.partsAmount) {
          // For Every Item In PartsAmount, Reset To Zero //
          Object.keys(flagMemory.partsAmount).forEach((item, i) => {
            if (flagMemory.partsAmount[item] > 0)
            flagMemory.partsAmount[item] = 0;
          });
        }
      }
    }
  }
}
