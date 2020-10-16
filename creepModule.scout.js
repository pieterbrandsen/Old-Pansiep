// Require Modules
const checkMissingMemory = require('module.checkMissingMemory');
const remoteRoomManager = require('module.remoteRoomManager');

module.exports = {
  run: function(creep) {
    // Get Variables Needed For Creep //
    // Define ScoutGoal Memory Path //
    let scoutGoal = creep.memory.scoutGoal;


    // if (creeps.ticksToLive < 1000)
    // creep.suicide();


    // Define The Flag And Memory Of The TargetRoom //
    const targetFlag = Game.flags[creep.memory.flagName];
    const targetFlagMemory = Memory.flags[creep.memory.flagName];

    // Define TargetRoom And The Room Where The Creep Currently Is In //
    const currentRoomName = creep.room.name;


    // Check If Creep Is In TargetRoom, Run The Code //
    const targetRoomName = targetFlag.room.name;

    // If Room Is Missing The Standard FlagName Each Of My Rooms Should Have, Create One //
    if (!Game.flags[targetRoomName] || !Memory.flags[targetRoomName]) {
      targetFlag.room.createFlag(targetFlag.pos,targetRoomName)
      Memory.flags[targetRoomName] = {};
    }

    if (!creep.pos.inRangeTo(targetFlag, 5))
    creep.moveTo(targetFlag);

    // Switch Through ScoutGoals And Check What Code Should Be Runned //
    switch (scoutGoal) {
      // If ScoutGoal Is Remote, Get All The Remote Memory That's Needed //
      case "remote":
      targetFlagMemory.IsMemorySetup = true;
      if (Memory.flags[creep.room.name] && !Memory.flags[creep.room.name].IsMemorySetup) {
        checkMissingMemory.setup(creep.room.name);
        remoteRoomManager.setup(creep.name);
        targetFlagMemory.IsMemorySetup = true;
      }

      break;
      default:
      // If Creep Has No ScoutGoal, Get The Default Goal In Its Memory //
      creep.memory.scoutGoal = "remote";
      break;
    }
  }
};
