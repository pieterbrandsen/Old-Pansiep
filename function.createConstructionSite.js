const getAccesPoints = require('function.getAccesPoints');

module.exports = {
  run: function(id,getRange,controllerLevel,roomName) {
    //  Variables //
    // Important Room Variables //
    const room = Game.rooms[roomName];
    const terrain = new Room.Terrain(roomName);
    const flagMemory = Memory.flags[roomName];
    // CheckPosition //
    const object = Game.getObjectById(id);
    const x = object.pos.x;
    const y = object.pos.y;
    // Make The Range It's Own Variable //
    let range = getRange++;

    // Define The Return Variables //
    let structureType;
    let constructionSiteCanBeBuild = false;
    let isThereStruture = false;
    let errorMessage = "";

    function getStructureType() {
      // If The Room Controller Level Is Higher Then Inputed, StructureType Is Link //
      if (room.controller.level >= controllerLevel || (flagMemory.sources.length == 1 && room.controller.level == 6))
      structureType = STRUCTURE_LINK;
      else {
        structureType = STRUCTURE_CONTAINER;
        // If Structure Is Container But Is Not Controller, Place It Next To Source //
        if (id !== room.controller.id)
        range = 1;
      }
    }

    function createConstruction(structureType,x,y) {
      // Build Structure, If No Error Return True, Else Return Error With False //
      const buildStructure = room.createConstructionSite(x,y,structureType);
      if (buildStructure == 0)
      return true;
      else {
        errorMessage = buildStructure;
        return false;
      }
    }

    function findContainer() {
      // Loop Through Each Container And Look For The Container In Range //
      let structureFound = [false,""];
      room.containers.forEach((structure, i) => {
        if (structure.pos.inRangeTo(object,range+1))
        structureFound = [true, structure.id];
      });
      return structureFound;
    }

    function findStructureInRange() {
      function findLink() {
        // Loop Through Each Link And Look For The Link In Range //
        let structureFound = false;
        room.links.forEach((structure, i) => {
          if (structure.pos.inRangeTo(object,range+1)) {
            structureFound = true;
          }
        });
        return structureFound;
      }
      function findConstructionSite() {
        let structureFound = false;
        room.find(FIND_CONSTRUCTION_SITES).forEach((constructionSite, i) => {
          // Loop Through Each ConstructionSite And Look For The ConstructionSite In Range, Check If Found For Container Or Link //
          if (constructionSite.pos.inRangeTo(object,range+1)) {
            if (constructionSite.structureType == "container" || constructionSite.structureType == "link") {
              structureFound = true;
            }
          }
        });
        return structureFound;
      }


      // Check If There Is Already A Structure Being Build //
      let structureFound = true;

      if (!findContainer()[0]) {
        if (!findLink()) {
          if (!findConstructionSite()) {
            structureFound = false;
          }
        }
      }

      return structureFound;
    }

    function checkIfCanBuildStructure() {
      // If Function Can't Find An Strucutre In Range, Continue //
      let isStructureFound = findStructureInRange();

      if ((findContainer()[0] == true && room.controller.level >= 6 && id == room.controller.id) || findContainer()[0] == true && room.controller.level >= 7 || (findContainer()[0] == true && room.controller.level >= 6 && flagMemory.sources.length == 1))
      isStructureFound = false;

      // Get StructureType //
      getStructureType();

      // If Structure Being Checked Is A Link, Check This //
      if (structureType == STRUCTURE_LINK) {
        // Get Possible Container In Range //
        const container = Game.getObjectById(findContainer()[1]);
        // If Container Is Found, Destroy It By Getting Object Of The Found Structure //
        if (container !== null) {
          container.destroy();
          flagMemory.controllerStructureId = "";
        }
      }


      if (isStructureFound == false) {
        // Start Variables For Best Positions //
        const possiblePositions = [];
        let optimalPositions = [0,[0,0], 50];

        // Get All Possible Possitions And Enter Them In A List //
        for (let i = 1; i < range+1; i++) {
          for (let j = 0; j < range+1; j++) {
            possiblePositions.push([x-j,y-i])
            possiblePositions.push([x+j,y-i])
            possiblePositions.push([x-j,y+i])
            possiblePositions.push([x+j,y+i])
          }
        }

        // Loop Through All Possible Possitons //
        for (var i = 0; i < possiblePositions.length; i++) {
          const posX = possiblePositions[i][0];
          const posY = possiblePositions[i][1];
          // Get All Open Spots At Position //
          const possiblePositionsOfPlacementPossible = getAccesPoints.run(posX, posY, roomName)[0];
          // Check If Terrain At Possition Is No Wall //
          if (terrain.get(posX,posY) !== 1) {
            // If This Positon Is Better Then Already Found Position //
            if (possiblePositionsOfPlacementPossible > optimalPositions[0]) {
              optimalPositions[0] = possiblePositionsOfPlacementPossible
              optimalPositions[1][0] = posX;
              optimalPositions[1][1] = posY;
            }
            // If This Positon Is Closer To Head Spawn Then Already Found Position //
            else if (Game.getObjectById(flagMemory.roomManager.headSpawn) !== null) {
              const getRangeToHeadSpawn = Game.getObjectById(flagMemory.roomManager.headSpawn).pos.getRangeTo(posX,posY)
              if (possiblePositionsOfPlacementPossible == optimalPositions[0] && getRangeToHeadSpawn < optimalPositions[2]) {
                optimalPositions[0] = possiblePositionsOfPlacementPossible
                optimalPositions[1][0] = posX;
                optimalPositions[1][1] = posY;
                optimalPositions[2] = getRangeToHeadSpawn;
              }
            }
          }
        }

        // Get If Structure Is Placed //
        constructionSiteCanBeBuild = createConstruction(structureType,optimalPositions[1][0],optimalPositions[1][1]);
      }
      else {
        // There Is Already A Structure //
        isThereStruture = true;
      }
    }


    // Run Head Function //
    checkIfCanBuildStructure();


    return [constructionSiteCanBeBuild, isThereStruture, errorMessage];
  }
};
