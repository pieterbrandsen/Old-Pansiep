// Require Modules
const checkMissingMemory = require('module.checkMissingMemory');

module.exports = {
  run: function(creep) {
    // Get Variables Needed For Creep //
    // Define ScoutGoal Memory Path //
    let scoutGoal = creep.memory.scoutGoal;


    // Define The Flag And Memory Of The TargetRoom //
    const targetFlag = Game.flags[creep.memory.flagName];
    const targetFlagMemory = Memory.flags[creep.memory.flagName];

    // Define TargetRoom And The Room Where The Creep Currently Is In //
    const currentRoomName = creep.room.name;
    const targetRoomName = targetFlagMemory.targetRoom;
    const targetRoom = Game.rooms[targetRoomName];


    // This Function Is Being Called To See If Creep Has Vision In The TargetRoom //
    function creepHasVisionInTargetRoom() {
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

    // Check If Creep Is In TargetRoom, Run The Code //
    if (creepHasVisionInTargetRoom()) {
      // If Room Is Missing The Standard FlagName Each Of My Rooms Should Have, Create One //
      if (!Game.flags[targetRoomName]) {
        targetRoom.createFlag(targetFlag.pos,targetRoomName)
        Memory.flags[targetRoomName] = {};
      }
      // If Room Has The Standard Flag And Creep Is In The TargetRoom, Travel To It So Creep Doesn't Stay On The Exit's //
      else if (creep.pos.inRangeTo(Game.flags[targetRoomName],5) == false)
      creep.moveTo(Game.flags[targetRoomName]);

      // Switch Through ScoutGoals And Check What Code Should Be Runned //
      switch (scoutGoal) {
        // If ScoutGoal Is Remote, Get All The Remote Memory That's Needed //
        case "remote":
        // If TargetFlagMemory Is Missing The TargetRoom, Define It Using The TargetRoomName //
        if (!targetFlagMemory.targetRoom)
        targetFlagMemory.targetRoom = targetRoomName;
        // If TargetFlagMemory Is Missing The SourceAmount, Define It By Counting The Source's That Are In The Target Room //
        if (!targetFlagMemory.sourceAmount)
        targetFlagMemory.sourceAmount = targetRoom.find(FIND_SOURCES).length;
        // If TargetFlagMemory Has Not Listed Yet In The Memory That It Finished The Work, Return True //
        // Reset Also The Room Flag Memory To Be Sure All The Memory Is In The Room //
        if (!targetFlagMemory.IsMemorySetup) {
          targetFlagMemory.IsMemorySetup = true;
          Memory.flags[targetRoomName] = {};
        }
        if (Memory.flags[targetRoomName]) {
          // If Room's FlagMemory Has Not Listed Yet In The Memory That It Finished The Work, Return True //
          if (!Memory.flags[targetRoomName].IsMemorySetup)
          checkMissingMemory.run(targetRoomName);
        }
        else
        Memory.flags[targetRoomName] = {};
        break;
        default:
        // If Creep Has No ScoutGoal, Get The Default Goal In Its Memory //
        creep.memory.scoutGoal = "remote";
        break;
      }
    }
  }
};
