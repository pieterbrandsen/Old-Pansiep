module.exports = {
  run: function() {

    if (!Memory.flags)
    Memory.flags = {};


    function runRoomPlanner(flagName) {
      if (!Memory.flags[flagName]) {
        Memory.flags[flagName] = {}
      }
      const flag = Game.flags[flagName];
      const flagMemory = Memory.flags[flagName];
      const room = flag.room;
      let controllerLevel;
      if (flag) {
        if (room) {
          controllerLevel = room.controller.level;

          const x = flag.pos.x;
          const y = flag.pos.y;


          if (controllerLevel >= 1) {
            room.createConstructionSite(x-1, y+1, STRUCTURE_SPAWN,room.name + "-1");
          }
          if (controllerLevel >= 2) {
            room.createConstructionSite(x+3, y-1, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+3, y-2, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+2, y-2, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+2, y-3, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+1, y-3, STRUCTURE_EXTENSION);
          }
          if (controllerLevel >= 3) {
            room.createConstructionSite(x, y+1, STRUCTURE_TOWER);


            room.createConstructionSite(x+4, y-2, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+3, y-3, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+4, y-3, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+1, y-4, STRUCTURE_EXTENSION);
            room.createConstructionSite(x, y-4, STRUCTURE_EXTENSION);
          }
          if (controllerLevel >= 4) {
            room.createConstructionSite(x-1, y, STRUCTURE_STORAGE);


            room.createConstructionSite(x, y-5, STRUCTURE_EXTENSION);
            room.createConstructionSite(x-1, y-5, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+1, y-5, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+2, y-5, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+2, y-4, STRUCTURE_EXTENSION);

            room.createConstructionSite(x+1, y+3, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+2, y+3, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+2, y+2, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+3, y-4, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+3, y+1, STRUCTURE_EXTENSION);
          }
          if (controllerLevel >= 5) {
            room.createConstructionSite(x, y-1, STRUCTURE_TOWER);


            room.createConstructionSite(x+2, y+4, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+3, y+4, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+3, y+3, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+4, y+3, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+4, y+2, STRUCTURE_EXTENSION);

            room.createConstructionSite(x+4, y+1, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+4, y, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+5, y-1, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+5, y+1, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+5, y+2, STRUCTURE_EXTENSION);
          }
          if (controllerLevel >= 6) {
            const mineral = room.find(FIND_MINERALS)[0];
            if (mineral)
            room.createConstructionSite(mineral,STRUCTURE_EXTRACTOR)


            room.createConstructionSite(x+1, y, STRUCTURE_TERMINAL);


            room.createConstructionSite(x+1, y+1, STRUCTURE_LINK);


            room.createConstructionSite(x, y-3, STRUCTURE_ROAD);
            room.createConstructionSite(x+1, y-2, STRUCTURE_ROAD);
            room.createConstructionSite(x+2, y-1, STRUCTURE_ROAD);
            room.createConstructionSite(x+3, y, STRUCTURE_ROAD);
            room.createConstructionSite(x+4, y-1, STRUCTURE_ROAD);

            room.createConstructionSite(x+5, y-2, STRUCTURE_ROAD);
            room.createConstructionSite(x+5, y-3, STRUCTURE_ROAD);
            room.createConstructionSite(x+4, y-4, STRUCTURE_ROAD);
            room.createConstructionSite(x+3, y-5, STRUCTURE_ROAD);
            room.createConstructionSite(x+2, y-6, STRUCTURE_ROAD);

            room.createConstructionSite(x+1, y-6, STRUCTURE_ROAD);
            room.createConstructionSite(x, y-6, STRUCTURE_ROAD);
            room.createConstructionSite(x-1, y-6, STRUCTURE_ROAD);
            room.createConstructionSite(x-2, y-6, STRUCTURE_ROAD);
            room.createConstructionSite(x-3, y-5, STRUCTURE_ROAD);

            room.createConstructionSite(x-4, y-4, STRUCTURE_ROAD);
            room.createConstructionSite(x-5, y-3, STRUCTURE_ROAD);
            room.createConstructionSite(x-6, y-2, STRUCTURE_ROAD);
            room.createConstructionSite(x-6, y-1, STRUCTURE_ROAD);
            room.createConstructionSite(x-6, y, STRUCTURE_ROAD);

            room.createConstructionSite(x-6, y+1, STRUCTURE_ROAD);
            room.createConstructionSite(x-6, y+2, STRUCTURE_ROAD);
            room.createConstructionSite(x-5, y+3, STRUCTURE_ROAD);
            room.createConstructionSite(x-4, y+4, STRUCTURE_ROAD);
            room.createConstructionSite(x-3, y+5, STRUCTURE_ROAD);

            room.createConstructionSite(x-2, y+6, STRUCTURE_ROAD);
            room.createConstructionSite(x-1, y+6, STRUCTURE_ROAD);
            room.createConstructionSite(x, y+6, STRUCTURE_ROAD);
            room.createConstructionSite(x+1, y+6, STRUCTURE_ROAD);
            room.createConstructionSite(x-1, y-2, STRUCTURE_ROAD);

            room.createConstructionSite(x+3, y+6, STRUCTURE_ROAD);
            room.createConstructionSite(x+4, y+4, STRUCTURE_ROAD);
            room.createConstructionSite(x+5, y+3, STRUCTURE_ROAD);
            room.createConstructionSite(x+6, y+2, STRUCTURE_ROAD);
            room.createConstructionSite(x+6, y+1, STRUCTURE_ROAD);

            //room.createConstructionSite(x+7, y+1, STRUCTURE_ROAD);
            room.createConstructionSite(x+6, y, STRUCTURE_ROAD);
            room.createConstructionSite(x+6, y-1, STRUCTURE_ROAD);
            room.createConstructionSite(x+6, y-2, STRUCTURE_ROAD);
            room.createConstructionSite(x-1, y-4, STRUCTURE_ROAD);

            room.createConstructionSite(x-2, y-5, STRUCTURE_ROAD);
            room.createConstructionSite(x-3, y, STRUCTURE_ROAD);
            room.createConstructionSite(x-2, y-1, STRUCTURE_ROAD);
            room.createConstructionSite(x-4, y+1, STRUCTURE_ROAD);
            room.createConstructionSite(x-5, y+2, STRUCTURE_ROAD);

            room.createConstructionSite(x+2, y+1, STRUCTURE_ROAD);
            room.createConstructionSite(x+1, y+2, STRUCTURE_ROAD);
            room.createConstructionSite(x, y+3, STRUCTURE_ROAD);
            room.createConstructionSite(x-1, y+2, STRUCTURE_ROAD);
            room.createConstructionSite(x-2, y+1, STRUCTURE_ROAD);

            room.createConstructionSite(x+1, y+4, STRUCTURE_ROAD);
            room.createConstructionSite(x+2, y+5, STRUCTURE_ROAD);
            room.createConstructionSite(x+3, y+5, STRUCTURE_ROAD);
            room.createConstructionSite(x+2, y+6, STRUCTURE_ROAD);


            room.createConstructionSite(x+3, y+2, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+1, y+5, STRUCTURE_EXTENSION);
            room.createConstructionSite(x, y+5, STRUCTURE_EXTENSION);
            room.createConstructionSite(x, y+4, STRUCTURE_EXTENSION);
            room.createConstructionSite(x-1, y+4, STRUCTURE_EXTENSION);

            room.createConstructionSite(x-1, y+3, STRUCTURE_EXTENSION);
            room.createConstructionSite(x-2, y+3, STRUCTURE_EXTENSION);
            room.createConstructionSite(x-2, y+2, STRUCTURE_EXTENSION);
            room.createConstructionSite(x-3, y+2, STRUCTURE_EXTENSION);
            room.createConstructionSite(x-3, y+1, STRUCTURE_EXTENSION);
          }
          if (controllerLevel >= 7) {
            room.createConstructionSite(x-1, y-1, STRUCTURE_FACTORY);


            room.createConstructionSite(x+5, y, STRUCTURE_SPAWN,room.name + "-2");


            room.createConstructionSite(x, y-2, STRUCTURE_TOWER);


            room.createConstructionSite(x-4, y+2, STRUCTURE_EXTENSION);
            room.createConstructionSite(x-4, y+3, STRUCTURE_EXTENSION);
            room.createConstructionSite(x-3, y+3, STRUCTURE_EXTENSION);
            room.createConstructionSite(x-3, y+4, STRUCTURE_EXTENSION);
            room.createConstructionSite(x-2, y+4, STRUCTURE_EXTENSION);

            room.createConstructionSite(x-2, y+5, STRUCTURE_EXTENSION);
            room.createConstructionSite(x-1, y+5, STRUCTURE_EXTENSION);
            room.createConstructionSite(x-4, y, STRUCTURE_EXTENSION);
            room.createConstructionSite(x-5, y-1, STRUCTURE_EXTENSION);
            room.createConstructionSite(x-4, y-1, STRUCTURE_EXTENSION);
          }
          if (controllerLevel >= 8) {
            room.createConstructionSite(x+1, y-1, STRUCTURE_POWER_SPAWN,room.name + "-1");


            room.createConstructionSite(x-5, y, STRUCTURE_SPAWN,room.name + "-3");


            room.createConstructionSite(x, y+2, STRUCTURE_TOWER);
            room.createConstructionSite(x-2, y, STRUCTURE_TOWER);
            room.createConstructionSite(x+2, y, STRUCTURE_TOWER);


            room.createConstructionSite(x-3, y-1, STRUCTURE_LAB);
            room.createConstructionSite(x-3, y-2, STRUCTURE_LAB);
            room.createConstructionSite(x-3, y-3, STRUCTURE_LAB);
            room.createConstructionSite(x-3, y-4, STRUCTURE_LAB);
            room.createConstructionSite(x-4, y-2, STRUCTURE_LAB);

            room.createConstructionSite(x-4, y-3, STRUCTURE_LAB);
            room.createConstructionSite(x-2, y-2, STRUCTURE_LAB);
            room.createConstructionSite(x-2, y-3, STRUCTURE_LAB);
            room.createConstructionSite(x-2, y-4, STRUCTURE_LAB);
            room.createConstructionSite(x-1, y-3, STRUCTURE_LAB);


            room.createConstructionSite(x-5, y-2, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+7, y+1, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+7, y+2, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+6, y+3, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+5, y+4, STRUCTURE_EXTENSION);

            room.createConstructionSite(x+4, y+5, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+3, y+6, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+2, y+7, STRUCTURE_EXTENSION);
            room.createConstructionSite(x+1, y+7, STRUCTURE_EXTENSION);
            room.createConstructionSite(x-5, y+1, STRUCTURE_EXTENSION);
          }
        }
      }
    }

    if (Game.flags["roomPlannerCheck1"] !== undefined || Memory.flags["roomPlannerCheck1"]) {
      if (!Game.flags["roomPlannerCheck1"] && Memory.flags["roomPlannerCheck1"]) {
        for (let i = 1; i <= 33; i++) {
          if (Game.flags[i])
          Game.flags[i].remove()
        }

        delete Memory.flags["roomPlannerCheck1"]
      }
      else {
        const flagName = "roomPlannerCheck1";
        if (!Memory.flags[flagName]) {
          Memory.flags[flagName] = {}
        }
        const flag = Game.flags[flagName];
        const flagMemory = Memory.flags[flagName];
        const room = flag.room;

        const x = flag.pos.x;
        const y = flag.pos.y;

        room.createFlag(x,y-6,1,COLOR_RED)
        room.createFlag(x+1,y-6,2,COLOR_RED)
        room.createFlag(x+2,y-6,3,COLOR_RED)
        room.createFlag(x+3,y-5,4,COLOR_RED)
        room.createFlag(x+4,y-4,5,COLOR_RED)
        room.createFlag(x+5,y-3,6,COLOR_RED)
        room.createFlag(x+6,y-2,7,COLOR_RED)
        room.createFlag(x+6,y-1,8,COLOR_RED)
        room.createFlag(x+6,y,9,COLOR_RED)
        room.createFlag(x+7,y+1,10,COLOR_RED)
        room.createFlag(x+7,y+2,11,COLOR_RED)
        room.createFlag(x+6,y+3,12,COLOR_RED)
        room.createFlag(x+5,y+4,13,COLOR_RED)
        room.createFlag(x+4,y+5,14,COLOR_RED)
        room.createFlag(x+3,y+6,15,COLOR_RED)
        room.createFlag(x+2,y+7,16,COLOR_RED)
        room.createFlag(x+1,y+7,17,COLOR_RED)
        room.createFlag(x,y+7,18,COLOR_RED)
        room.createFlag(x-1,y+7,19,COLOR_RED)
        room.createFlag(x-2,y+6,20,COLOR_RED)
        room.createFlag(x-3,y+5,21,COLOR_RED)
        room.createFlag(x-4,y+4,22,COLOR_RED)
        room.createFlag(x-5,y+3,23,COLOR_RED)
        room.createFlag(x-6,y+2,24,COLOR_RED)
        room.createFlag(x-6,y+1,25,COLOR_RED)
        room.createFlag(x-6,y,26,COLOR_RED)
        room.createFlag(x-6,y-1,27,COLOR_RED)
        room.createFlag(x-6,y-2,28,COLOR_RED)
        room.createFlag(x-5,y-3,29,COLOR_RED)
        room.createFlag(x-4,y-4,30,COLOR_RED)
        room.createFlag(x-3,y-5,31,COLOR_RED)
        room.createFlag(x-2,y-6,32,COLOR_RED)
        room.createFlag(x-1,y-6,33,COLOR_RED)
      }
    }


    for (let i  = 0; i < 25; i++) {
      if (Game.flags["roomPlanner1-"+i] || Memory.flags["roomPlanner1-"+i]) {

        const flagName = "roomPlanner1-"+i;

        if (!Game.flags[flagName] && Memory.flags[flagName]) {
          delete Memory.flags[flagName]
        }
        else {
          runRoomPlanner(flagName);
        }
      }
    }

  }
};
