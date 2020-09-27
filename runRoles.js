const getWorkingState = require('function.getCreepState');
const creepBooster = require('module.creepBooster');


function getCreepWorkState(creep) {
  // Get Creep State, What The Creep Should Be Doing //
  if (Game.time % 2 == 0) {
    const workState = getWorkingState.run(creep.room.name, creep.store.getCapacity(), creep.store.getUsedCapacity(), creep.memory.working, creep.memory.role);
    if (workState !== undefined)
    creep.memory.working = workState;
  }
}

function runHealCreep(creep) {
  // Check If Memory Is Defined That Says If A Creep Can Heal //
  if (!creep.memory.canHeal) {
    // If Creep Has Active Heal Parts //
    if (creep.getActiveBodyparts(HEAL) > 0)
    creep.memory.canHeal = true;
    else
    creep.memory.canHeal = false;
  }

  // Check If CanHeal Is Defined //
  if (creep.memory.canHeal)
  // Check If CanHeal Is True //
  if (creep.memory.canHeal == true)
  // Check If Creep Is Not Full Health //
  if (creep.hits < creep.hitsMax)
  // Heal Creep //
  creep.heal(creep);
}

// This Function Is Being Called To See If Creep Has Vision In The TargetRoom //
function creepHasVisionInTargetRoom(creep) {
  // Define The Flag And Memory Of The TargetRoom //
  const targetFlag = Game.flags[creep.memory.flagName];
  const targetFlagMemory = Memory.flags[creep.memory.flagName];

  // Define TargetRoom And The Room Where The Creep Currently Is In //
  const currentRoomName = creep.room.name;
  const targetRoomName = targetFlagMemory.targetRoom;
  const targetRoom = Game.rooms[targetRoomName];


  // Define ReturnValue Variable That Returns If Creep Is In The TargetRoom //
  let returnValue = false;

  // This Function Is Being Callled When Creep Has A TargetFlag Defined In Its Memory //
  function travelUsingTargetFlag() {
    // If There Is No Vision, Travel To Flag Until There Is Vision //
    creep.travelTo(targetFlag);
  }

  // If TargetRoom Is Defined And Has Vision In It, Return True //
  if (targetFlag && targetFlag.room) {
    // If There Is Vision, Update The TargetRoomName Memory With The RoomName Of The Target Room //
    targetFlagMemory.targetRoom = targetFlag.room.name;

    // Return True //
    returnValue = true;
  }
  // Travel To TargetRoom Using The TargetFlag If Its Defined //
  else if (targetFlag)
  travelUsingTargetFlag();
  // If No Flag, Suicide Creep //
  else
  creep.suicide();

  // Return Output Of Function //
  return returnValue;
}

function runCreep(creep, moduleName) {
  // Get The Role File Of The Creep By Getting The Right Name //
  // A Harvester-0 File Doesn't Exist So That The Reason For The Split //
  const creepModule = require(`creepModule.${moduleName}`);


  // If Module File Is Defined, Run Creep //
  if (creepModule)
  creepModule.run(creep);
  // Else Send Me An Email With The CurrentRoom And Role So I Fix The Problem //
  else
  Game.notify(`Creep in room ${creep.room.name} is missing a role or has no run function. The role is ${moduleName}.`);
}

function boostCreep(creep) {
  if ((creep.memory.canBoost !== undefined && creep.memory.canBoost == false && creep.ticksToLive > 300) || (creep.memory.canBoost !== undefined && creep.memory.hasBeenBoosted == false && creep.memory.canBoost == false)) {
    return true;
  }
  else {
    if ((creep.ticksToLive > 300 && creep.memory.hasBeenBoosted == false) || (!creep.memory.canBoost && creep.memory.hasBeenBoosted == false)) {
      if (!creep.memory.canBoost)
      creepBooster.check(creep,["work", "carry", "move"],[0,0,0]);
      else
      creepBooster.boost(creep);
    }
    else if (creep.memory.hasBeenBoosted == true)
    creepBooster.unBoost(creep);
  }
}


module.exports = {
  // Run Roles From Here //

  attacker: function(creep) {
    if (boostCreep(creep)) {
      if (creepHasVisionInTargetRoom(creep)) {
        runHealCreep(creep);
        runCreep(creep, "attack");
      }
    }
  },

  builder: function(creep) {
    if (boostCreep(creep)) {
      if (creepHasVisionInTargetRoom(creep)) {
        getCreepWorkState(creep);

        // If Creep Needs To Harvest //
        if (creep.memory.working == "withdraw")
        runCreep(creep, "withdraw");
        // If Creep Needs To Transfer //
        else if (creep.memory.working == "transfer")
        runCreep(creep, "build");
      }
    }
  },

  builderLD: function(creep) {
    if (boostCreep(creep)) {
      if (creepHasVisionInTargetRoom(creep)) {
        getCreepWorkState(creep);

        // If Creep Needs To Harvest //
        if (creep.memory.working == "withdraw")
        runCreep(creep, "withdraw");
        // If Creep Needs To Transfer //
        else if (creep.memory.working == "transfer")
        runCreep(creep, "build");
      }
    }
  },

  claimer: function(creep) {
    if (!Game.flags["claim"])
    creep.suicide();

    if (Game.time % 25 == 0)
    console.log(`Claimer: ${creep.name} is in ${Game.shard.name}-${creep.room.name}.`)

    // If Memory Of Flag Is Not Defined, Define Memory //
    if (!Memory.flags["claim"]) {
      Memory.flags["claim"] = {};
      Memory.flags["claim"].spawnRoom = "";
    }


    if (boostCreep(creep)) {
      runHealCreep(creep);

      if (creepHasVisionInTargetRoom(creep))
      runCreep(creep, "claim");
    }
  },

  extractor: function(creep) {
    if (boostCreep(creep)) {
      if (creepHasVisionInTargetRoom(creep)) {
        getCreepWorkState(creep);

        // If Creep Needs To Harvest //
        if (creep.memory.working == "withdraw")
        runCreep(creep, "harvest");
        // If Creep Needs To Transfer //
        else if (creep.memory.working == "transfer")
        runCreep(creep, "transfer");
      }
    }
  },

  harvester: function(creep) {
    if (boostCreep(creep)) {
      if (creepHasVisionInTargetRoom(creep)) {
        getCreepWorkState(creep);

        // If Creep Needs To Harvest //
        if (creep.memory.working == "withdraw")
        runCreep(creep, "harvest");
        // If Creep Needs To Transfer //
        else if (creep.memory.working == "transfer")
        runCreep(creep, "transfer");
      }
    }
  },

  harvesterLD: function(creep) {
    if (boostCreep(creep)) {
      if (creepHasVisionInTargetRoom(creep)) {
        getCreepWorkState(creep);

        // If Creep Needs To Harvest //
        if (creep.memory.working == "withdraw")
        runCreep(creep, "harvest");
        // If Creep Needs To Transfer //
        else if (creep.memory.working == "transfer")
        runCreep(creep, "transfer");
      }
    }
  },

  repairer: function(creep) {
    if (boostCreep(creep)) {
      if (creepHasVisionInTargetRoom(creep)) {
        getCreepWorkState(creep);

        // If Creep Needs To Harvest //
        if (creep.memory.working == "withdraw")
        runCreep(creep, "withdraw");
        // If Creep Needs To Transfer //
        else if (creep.memory.working == "transfer")
        runCreep(creep, "repair");
      }
    }
  },

  reserverLD: function(creep) {
    if (boostCreep(creep)) {
      runHealCreep(creep);

      if (creepHasVisionInTargetRoom(creep)) {
        getCreepWorkState(creep);

        runCreep(creep, "reserve");
      }
    }
  },

  scientist: function(creep) {
    if (boostCreep(creep)) {
      if (creepHasVisionInTargetRoom(creep)) {
        getCreepWorkState(creep);

        runCreep(creep, "scientist");
      }
    }
  },

  scout: function(creep) {
    if (boostCreep(creep)) {
      if (creepHasVisionInTargetRoom(creep)) {
        getCreepWorkState(creep);

        runCreep(creep, "scout");
      }
    }
  },

  transferer: function(creep) {
    if (boostCreep(creep)) {
      if (creepHasVisionInTargetRoom(creep)) {
        getCreepWorkState(creep);

        // If Creep Needs To Harvest //
        if (creep.memory.working == "withdraw")
        runCreep(creep, "withdraw");
        // If Creep Needs To Transfer //
        else if (creep.memory.working == "transfer")
        runCreep(creep, "transfer");
      }
    }
  },

  transfererLD: function(creep) {
    if (boostCreep(creep)) {
      const flag = Game.flags[creep.memory.flagName];
      const flagMemory = Memory.flags[creep.memory.flagName];

      runHealCreep(creep);
      getCreepWorkState(creep);

      // If Creep Needs To Withdraw //
      if (creep.memory.working == "withdraw") {
        // If Creep Is In The Target Room //
        if (creep.room.name == creep.memory.targetRoom) {
          const containerAmount = Game.rooms[creep.memory.targetRoom].containers.length;
          if (containerAmount > 0)
          runCreep(creep, "withdraw");
          else if (creep.pos.getRangeTo(creep.room.controller) > 5)
          creep.travelTo(creep.room.controller);
        }
        // Else Travel To Room //
        else
        creep.travelTo(flag)
      }

      // If Creep Needs To Transfer //
      else if (creep.memory.working == "transfer") {
        // If Creep Is In The Target Room //
        if (creep.room.name == creep.memory.spawnRoom)
        runCreep(creep, "transfer");
        // Else Travel To Room //
        else
        creep.travelTo(Game.flags[creep.memory.spawnRoom]);
      }
    }
  },

  transfererLiTe: function(creep) {
    if (boostCreep(creep)) {
      runHealCreep(creep);

      if (creepHasVisionInTargetRoom(creep)) {
        getCreepWorkState(creep);

        // If Creep Needs To Harvest //
        if (creep.memory.working == "withdraw")
        runCreep(creep, "transfererLiTe");
        // If Creep Needs To Transfer //
        else if (creep.memory.working == "transfer")
        runCreep(creep, "transfererLiTe");
      }
    }
  },

  upgrader: function(creep) {
    if (boostCreep(creep)) {
      runHealCreep(creep);

      if (creepHasVisionInTargetRoom(creep)) {
        getCreepWorkState(creep);

        // If Creep Needs To Harvest //
        if (creep.memory.working == "withdraw")
        runCreep(creep, "withdraw");
        // If Creep Needs To Transfer //
        else if (creep.memory.working == "transfer")
        runCreep(creep, "upgrade");
      }
    }
  },
}
